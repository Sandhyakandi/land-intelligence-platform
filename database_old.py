import sqlite3

conn = sqlite3.connect("land.db", check_same_thread=False)
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

def create_tables():
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS land_prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude REAL,
        longitude REAL,
        location_name TEXT,
        price_per_sqyd REAL,
        area REAL,
        property_type TEXT,
        status TEXT DEFAULT 'pending',
        is_anomaly INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS price_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        land_id INTEGER,
        price REAL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()

create_tables()

def execute(query, params=()):
    cursor.execute(query, params)
    conn.commit()
    return cursor.lastrowid

def fetch(query, params=()):
    cursor.execute(query, params)
    return [dict(row) for row in cursor.fetchall()]

def get_avg_price(lat, lng):
    cursor.execute("""
        SELECT AVG(price_per_sqyd) as avg_price
        FROM land_prices
        WHERE latitude BETWEEN ? AND ?
        AND longitude BETWEEN ? AND ?
        AND status='approved'
    """, (lat-0.01, lat+0.01, lng-0.01, lng+0.01))

    res = cursor.fetchone()
    return res["avg_price"] if res and res["avg_price"] else None

def insert_land(data):
    avg = get_avg_price(data["latitude"], data["longitude"])
    is_anomaly = 1 if avg and data["price_per_sqyd"] > 2*avg else 0

    land_id = execute("""
        INSERT INTO land_prices 
        (latitude, longitude, location_name, price_per_sqyd, area, property_type, is_anomaly)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        data["latitude"],
        data["longitude"],
        data["location_name"],
        data["price_per_sqyd"],
        data["area"],
        data["property_type"],
        is_anomaly
    ))

    execute("INSERT INTO price_history (land_id, price) VALUES (?, ?)",
            (land_id, data["price_per_sqyd"]))

    return land_id