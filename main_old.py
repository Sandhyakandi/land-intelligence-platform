from fastapi import FastAPI
from pydantic import BaseModel
import psycopg2
from datetime import date

app = FastAPI()

# DB Connection
conn = psycopg2.connect(
    dbname="land_pricing",
    user="postgres",
    password="admin123",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

# ---------------- MODEL ----------------
class Submission(BaseModel):
    location: str
    price: float
    currency: str
    area: float
    land_type: str
    lat: float
    lng: float

# ---------------- UTILS ----------------
def convert_to_inr(price, currency):
    rates = {"INR":1, "USD":83, "EUR":90}
    return price * rates.get(currency, 1)

def detect_anomaly(price):
    return price < 1000 or price > 10000000

# ---------------- APIs ----------------

@app.post("/submit")
def submit(data: Submission):
    final_price = convert_to_inr(data.price, data.currency)

    status = "flagged" if detect_anomaly(final_price) else "pending"

    cursor.execute("""
        INSERT INTO submissions (location, price, area, land_type, lat, lng, status, date)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    """, (
        data.location,
        final_price,
        data.area,
        data.land_type,
        data.lat,
        data.lng,
        status,
        date.today()
    ))
    conn.commit()
    return {"message": "Submitted successfully"}
@app.get("/submissions")
def get_data():
    cursor.execute("SELECT * FROM submissions WHERE status='approved'")
    return cursor.fetchall()

@app.get("/pending")
def pending():
    cursor.execute("SELECT * FROM submissions WHERE status='pending'")
    return cursor.fetchall()

@app.post("/moderate/{id}")
def moderate(id: int, status: str):
    cursor.execute("UPDATE submissions SET status=%s WHERE id=%s", (status, id))
    conn.commit()
    return {"message": "Updated"}

@app.get("/history")
def history():
    cursor.execute("""
        SELECT date, AVG(price)
        FROM submissions
        WHERE status='approved'
        GROUP BY date
        ORDER BY date
    """)
    return cursor.fetchall()