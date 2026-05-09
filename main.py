# # from fastapi.middleware.cors import CORSMiddleware
# # from fastapi import FastAPI, Depends
# # from sqlalchemy.orm import Session
# # from database import SessionLocal, engine, Base
# # from database import SessionLocal, engine
# # from models import Base, Land
# # # from database_old import SessionLocal, engine
# # from database_old import insert_land, get_approved_lands, get_pending_lands, update_status, get_price_history
# # import models, schemas

# # models.Base.metadata.create_all(bind=engine)

# # app = FastAPI()
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],  # allow frontend
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )
# # # DB Dependency
# # def get_db():
# #     db = SessionLocal()
# #     try:
# #         yield db
# #     finally:
# #         db.close()

# # # 🧠 AI Anomaly Detection
# # def detect_anomaly(price, area):
# #     price_per_sqyd = price / area

# #     if price_per_sqyd > 100000:
# #         return "high"
# #     elif price_per_sqyd < 500:
# #         return "low"
# #     return "normal"

# # # 🚀 Submit API
# # @app.post("/submit")
# # def submit(data: schemas.LandCreate, db: Session = Depends(get_db)):
# #     flag = detect_anomaly(data.price, data.area)

# #     new_land = models.Land(
# #         location=data.location,
# #         price=data.price,
# #         area=data.area,
# #         type=data.land_type,
# #         lat=data.lat,
# #         lng=data.lng,
# #         status="pending",
# #         flag=flag
# #     )

# #     db.add(new_land)
# #     db.commit()

# #     return {"message": "Submitted", "flag": flag}

# # # 📍 Get Approved Data (MAP)
# # @app.get("/submissions")
# # def get_data(db: Session = Depends(get_db)):
# #     data = db.query(models.Land).filter(models.Land.status == "approved").all()

# #     return [
# #         [
# #             d.id, d.location, d.price, d.area,
# #             d.type, d.lat, d.lng,
# #             d.date, d.status, d.flag
# #         ]
# #         for d in data
# #     ]

# # # 🛡 Moderation
# # @app.get("/pending")
# # def pending(db: Session = Depends(get_db)):
# #     return db.query(models.Land).filter(models.Land.status == "pending").all()

# # @app.post("/approve/{id}")
# # def approve(id: int, db: Session = Depends(get_db)):
# #     land = db.query(models.Land).get(id)
# #     land.status = "approved"
# #     db.commit()
# #     return {"message": "Approved"}

# # @app.post("/reject/{id}")
# # def reject(id: int, db: Session = Depends(get_db)):
# #     land = db.query(models.Land).get(id)
# #     land.status = "rejected"
# #     db.commit()
# #     return {"message": "Rejected"}

# # @app.get("/admin/pending")
# # def get_pending():
# #     cursor.execute("SELECT * FROM land_prices WHERE status='pending'")
# #     return cursor.fetchall()

# # @app.post("/admin/update-status")
# # def update_status(id: int, status: str):
# #     cursor.execute("UPDATE land_prices SET status=? WHERE id=?", (status, id))
# #     conn.commit()
# #     return {"message": "updated"}

# # @app.get("/lands")
# # def get_lands():
# #     db = SessionLocal()
# #     data = db.execute("SELECT * FROM lands WHERE status='approved'").fetchall()

# #     return [
# #         {
# #             "id": d[0],
# #             "location_name": d[1],
# #             "price_per_sqyd": d[2],
# #             "area": d[3],
# #             "property_type": d[4],
# #             "latitude": d[5],
# #             "longitude": d[6],
# #             "created_at": d[7],
# #             "status": d[8],
# #             "is_anomaly": d[9]
# #         }
# #         for d in data
# #     ]

# # @app.post("/admin/update-status")
# # def update_status(id: int, status: str):
# #     execute_query("""
# #         UPDATE land_prices 
# #         SET status=%s 
# #         WHERE id=%s
# #     """, (status, id))

# #     return {"message": "Updated"}

# # @app.post("/submit-land")
# # def submit_land(data: dict):
# #     # anomaly check
# #     avg_price = get_avg_price(data["latitude"], data["longitude"])

# #     is_anomaly = False
# #     if avg_price and data["price_per_sqyd"] > 2 * avg_price:
# #         is_anomaly = True

# #     query = """
# #     INSERT INTO land_prices 
# #     (latitude, longitude, location_name, price_per_sqyd, area, property_type, is_anomaly)
# #     VALUES (%s, %s, %s, %s, %s, %s, %s)
# #     RETURNING id;
# #     """

# #     land_id = execute_query(query, (
# #         data["latitude"],
# #         data["longitude"],
# #         data["location"],
# #         data["price_per_sqyd"],
# #         data["area"],
# #         data["property_type"],
# #         is_anomaly
# #     ))

# #     # store history
# #     execute_query("""
# #         INSERT INTO price_history (land_id, price)
# #         VALUES (%s, %s)
# #     """, (land_id, data["price_per_sqyd"]))

# #     return {"message": "Submitted successfully", "status": "pending"}


# # from fastapi import FastAPI, Depends
# # from fastapi.middleware.cors import CORSMiddleware
# # from sqlalchemy.orm import Session

# # from database import SessionLocal, engine
# # import models
# # import schemas

# # # CREATE TABLES
# # models.Base.metadata.create_all(bind=engine)

# # app = FastAPI()

# # # CORS
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # # DB SESSION
# # def get_db():
# #     db = SessionLocal()
# #     try:
# #         yield db
# #     finally:
# #         db.close()


# # # =========================================
# # # AI ANOMALY DETECTION
# # # =========================================

# # def detect_anomaly(price, area):
# #     try:
# #         price_per_sqyd = price / area

# #         if price_per_sqyd > 100000:
# #             return "high"

# #         elif price_per_sqyd < 500:
# #             return "low"

# #         return "normal"

# #     except:
# #         return "normal"


# # # =========================================
# # # SUBMIT LAND
# # # =========================================

# # @app.post("/submit")
# # def submit_land(
# #     data: schemas.LandCreate,
# #     db: Session = Depends(get_db)
# # ):

# #     # VALIDATION
# #     if data.area < 10:
# #         return {"error": "Area too small"}

# #     if data.price <= 0:
# #         return {"error": "Invalid price"}

# #     # AI FLAG
# #     flag = detect_anomaly(data.price, data.area)

# #     new_land = models.Land(
# #         location=data.location,
# #         price=data.price,
# #         area=data.area,
# #         date=data.date,
# #         currency=data.currency,
# #         type=data.land_type,
# #         lat=data.lat,
# #         lng=data.lng,
# #         status="pending",
# #         flag=flag
# #     )

# #     db.add(new_land)
# #     db.commit()
# #     db.refresh(new_land)

# #     return {
# #         "message": "Land submitted successfully",
# #         "flag": flag,
# #         "status": "pending"
# #     }


# # # =========================================
# # # APPROVED SUBMISSIONS (MAP)
# # # =========================================

# # @app.get("/submissions")
# # def get_submissions(db: Session = Depends(get_db)):

# #     lands = (
# #         db.query(models.Land)
# #         .filter(models.Land.status == "approved")
# #         .all()
# #     )

# #     return lands


# # # =========================================
# # # PENDING SUBMISSIONS
# # # =========================================

# # @app.get("/pending")
# # def get_pending(db: Session = Depends(get_db)):

# #     lands = (
# #         db.query(models.Land)
# #         .filter(models.Land.status == "pending")
# #         .all()
# #     )

# #     return lands


# # # =========================================
# # # APPROVE LAND
# # # =========================================

# # @app.post("/approve/{land_id}")
# # def approve_land(
# #     land_id: int,
# #     db: Session = Depends(get_db)
# # ):

# #     land = db.query(models.Land).filter(
# #         models.Land.id == land_id
# #     ).first()

# #     if not land:
# #         return {"error": "Land not found"}

# #     land.status = "approved"

# #     db.commit()

# #     return {"message": "Approved successfully"}


# # # =========================================
# # # REJECT LAND
# # # =========================================

# # @app.post("/reject/{land_id}")
# # def reject_land(
# #     land_id: int,
# #     db: Session = Depends(get_db)
# # ):

# #     land = db.query(models.Land).filter(
# #         models.Land.id == land_id
# #     ).first()

# #     if not land:
# #         return {"error": "Land not found"}

# #     land.status = "rejected"

# #     db.commit()

# #     return {"message": "Rejected successfully"}

# from fastapi import FastAPI, Depends
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session

# from database import SessionLocal, engine
# import models
# import schemas

# models.Base.metadata.create_all(bind=engine)

# app = FastAPI()

# # CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # DATABASE SESSION
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# # -----------------------------------------
# # ANOMALY DETECTION
# # -----------------------------------------
# def detect_flag(price, area):
#     price_per_sqyd = price / area

#     if price_per_sqyd > 100000:
#         return "high"

#     elif price_per_sqyd < 500:
#         return "low"

#     return "normal"


# # -----------------------------------------
# # SUBMIT LAND
# # -----------------------------------------
# @app.post("/submit")
# def submit_land(data: schemas.LandCreate, db: Session = Depends(get_db)):

#     # validation
#     if data.area < 10:
#         return {"error": "Invalid area"}

#     if data.price < 100:
#         return {"error": "Invalid price"}

#     # currency conversion
#     converted_price = data.price

#     if data.currency == "USD":
#         converted_price = data.price * 83

#     flag = detect_flag(converted_price, data.area)

#     land = models.Land(
#         location=data.location,
#         price=converted_price,
#         area=data.area,
#         currency=data.currency,
#         type=data.land_type,
#         lat=data.lat,
#         lng=data.lng,
#         date=data.date,
#         status="pending",
#         flag=flag
#     )

#     db.add(land)
#     db.commit()

#     return {
#         "message": "Land submitted successfully",
#         "flag": flag
#     }


# # -----------------------------------------
# # APPROVED LANDS
# # -----------------------------------------
# @app.get("/lands")
# def get_lands(db: Session = Depends(get_db)):

#     lands = db.query(models.Land).filter(
#         models.Land.status == "approved"
#     ).all()

#     return lands


# # -----------------------------------------
# # PENDING LANDS
# # -----------------------------------------
# @app.get("/pending")
# def get_pending(db: Session = Depends(get_db)):

#     return db.query(models.Land).filter(
#         models.Land.status == "pending"
#     ).all()


# # -----------------------------------------
# # APPROVE
# # -----------------------------------------
# @app.post("/approve/{id}")
# def approve_land(id: int, db: Session = Depends(get_db)):

#     land = db.query(models.Land).filter(
#         models.Land.id == id
#     ).first()

#     land.status = "approved"

#     db.commit()

#     return {"message": "Approved"}


# # -----------------------------------------
# # REJECT
# # -----------------------------------------
# @app.post("/reject/{id}")
# def reject_land(id: int, db: Session = Depends(get_db)):

#     land = db.query(models.Land).filter(
#         models.Land.id == id
#     ).first()

#     land.status = "rejected"

#     db.commit()

#     return {"message": "Rejected"}


# from fastapi import FastAPI, Depends
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session

# from database import SessionLocal, engine, Base
# import models
# from schemas import LandCreate
# from models import Base, Land
# models.Base.metadata.create_all(bind=engine)

# app = FastAPI()

# # CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # DB SESSION
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # -----------------------------
# # AI ANOMALY DETECTION
# # -----------------------------
# def detect_flag(price, area):
#     price_per_sqyd = price / area

#     if price_per_sqyd > 100000:
#         return "high"

#     elif price_per_sqyd < 500:
#         return "low"

#     return "normal"

# # -----------------------------
# # SUBMIT LAND
# # -----------------------------
# @app.post("/submit")
# def submit_land(data: LandCreate, db: Session = Depends(get_db)):

#     # VALIDATIONS
#     if data.area < 10:
#         return {"error": "Area too small"}

#     if data.price < 100:
#         return {"error": "Invalid price"}

#     # CURRENCY CONVERSION
#     converted_price = data.price

#     if data.currency == "USD":
#         converted_price = data.price * 83

#     # FLAG
#     flag = detect_flag(converted_price, data.area)

#     # SAVE
#     new_land = Land(
#         location=data.location,
#         price=converted_price,
#         area=data.area,
#         date=data.date,
#         currency=data.currency,
#         type=data.land_type,
#         lat=data.lat,
#         lng=data.lng,
#         status="pending",
#         flag=flag
#     )

#     db.add(new_land)
#     db.commit()

#     return {
#         "message": "Land submitted successfully",
#         "flag": flag
#     }

# # -----------------------------
# # APPROVED LANDS FOR MAP
# # -----------------------------
# # @app.get("/submissions")
# # def get_submissions(db: Session = Depends(get_db)):

# #     data = db.query(models.Land).filter(
# #         models.Land.status == "approved"
# #     ).all()

# #     return [
# #         {
# #             "id": d.id,
# #             "location": d.location,
# #             "price": d.price,
# #             "area": d.area,
# #             "type": d.type,
# #             "lat": d.lat,
# #             "lng": d.lng,
# #             "date": d.date,
# #             "status": d.status,
# #             "flag": d.flag
# #         }
# #         for d in data
# #     ]

# @app.get("/submissions")
# def get_submissions(db: Session = Depends(get_db)):

#     try:

#         data = db.query(models.Land).filter(
#             models.Land.status == "approved"
#         ).all()

#         result = []

#         for d in data:

#             result.append({
#                 "id": d.id,
#                 "location": d.location or "",
#                 "price": d.price or 0,
#                 "area": d.area or 0,
#                 "type": d.type or "",
#                 "lat": float(d.lat) if d.lat else 0,
#                 "lng": float(d.lng) if d.lng else 0,
#                 "date": d.date or "",
#                 "status": d.status or "",
#                 "flag": d.flag or "normal"
#             })

#         return result

#     except Exception as e:

#         return {
#             "error": str(e)
#         }
# # -----------------------------
# # PENDING LIST
# # -----------------------------
# @app.get("/pending")
# def get_pending(db: Session = Depends(get_db)):

#     lands = db.query(Land).filter(
#         Land.status == "pending"
#     ).all()

#     return lands

# # -----------------------------
# # APPROVE
# # -----------------------------
# @app.post("/approve/{id}")
# def approve_land(id: int, db: Session = Depends(get_db)):

#     land = db.query(Land).filter(Land.id == id).first()

#     land.status = "approved"

#     db.commit()

#     return {"message": "Approved"}

# # -----------------------------
# # REJECT
# # -----------------------------
# @app.post("/reject/{id}")
# def reject_land(id: int, db: Session = Depends(get_db)):
#     land = db.query(Land).filter(Land.id == id).first()

#     land.status = "rejected"

#     db.commit()

#     return {"message": "Rejected"}





# main.py

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine
import models
import schemas

# CREATE TABLES
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DATABASE SESSION
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =========================================
# STEP 1 — ANOMALY DETECTION
# =========================================

# def detect_flag(price_inr, area):

#     if area <= 0:
#         return "normal"

#     price_per_sqyd = price_inr / area

#     # OVERPRICED
#     if price_per_sqyd > 100000:
#         return "high"

#     # UNDERVALUED
#     elif price_per_sqyd < 1000:
#         return "low"

#     # NORMAL
#     return "normal"


# =========================================
# PRICE ANALYSIS
# =========================================

def detect_flag(price_inr, area):

    # PREVENT DIVIDE ERROR
    if area <= 0:
        return "invalid"

    # PRICE PER SQYD
    price_per_sqyd = price_inr / area

    print("PRICE PER SQYD:", price_per_sqyd)

    # OVERPRICED
    if price_per_sqyd > 70000:
        return "high"

    # UNDERVALUED
    elif price_per_sqyd < 15000:
        return "low"

    # NORMAL
    else:
        return "normal"

@app.get("/submissions")
def get_submissions(db: Session = Depends(get_db)):

    lands = db.query(models.Land).filter(
        models.Land.status == "approved"
    ).all()

    result = []

    for land in lands:

        result.append({

            "id": land.id,

            "location": land.location,

            "price": land.price,

            "area": land.area,

            "type": land.type,

            "lat": land.lat,

            "lng": land.lng,

            "date": land.date,

            "status": land.status,

            "flag": land.flag,

            # heatmap intensity
            "heat_intensity": land.price / 100000
        })

    return result

# =========================================
# STEP 2 — SUBMIT LAND
# =========================================

@app.post("/submit")
def submit_land(
    data: schemas.LandCreate,
    db: Session = Depends(get_db)
):

    # VALIDATION
    if data.area < 10:
        return {
            "message": "Rejected: Area too small"
        }

    # ====================================
    # CURRENCY NORMALIZATION
    # ====================================

    original_price = data.price

    price_inr = data.price

    if data.currency == "USD":
        price_inr = data.price * 83

    # ====================================
    # PRICE PER UNIT
    # ====================================

    price_per_sqyd = price_inr / data.area

    # ====================================
    # FLAG DETECTION
    # ====================================
    
    flag = detect_flag(price_inr, data.area)

    # ====================================
    # SAVE TO DATABASE
    # ====================================

    new_land = models.Land(
        location=data.location,

        # STORE INR PRICE
        price=price_inr,

        area=data.area,

        date=data.date,

        currency=data.currency,

        type=data.type,

        lat=data.lat,

        lng=data.lng,

        status="pending",

        flag=flag
    )

    db.add(new_land)

    db.commit()

    db.refresh(new_land)

    return {
        "message": "Land submitted successfully",
        "price_original": original_price,
        "currency": data.currency,
        "price_inr": price_inr,
        "price_per_sqyd": price_per_sqyd,
        "flag": flag,
        "status": "pending"
    }

# =========================================
# STEP 3 — MODERATION TABLE
# =========================================

@app.get("/pending")
def get_pending(
    db: Session = Depends(get_db)
):

    data = db.query(models.Land).filter(
        models.Land.status == "pending"
    ).all()

    return [
        {
            "id": d.id,
            "location": d.location,
            "price": d.price,
            "area": d.area,
            "date": d.date,
            "currency": d.currency,
            "type": d.type,
            "lat": d.lat,
            "lng": d.lng,
            "status": d.status,
            "flag": d.flag
        }
        for d in data
    ]

# =========================================
# STEP 4 — APPROVE
# =========================================

@app.post("/approve/{id}")
def approve_land(
    id: int,
    db: Session = Depends(get_db)
):

    land = db.query(models.Land).filter(
        models.Land.id == id
    ).first()

    if not land:
        return {"message": "Land not found"}

    land.status = "approved"

    db.commit()

    return {
        "message": "Approved successfully"
    }

# =========================================
# STEP 5 — REJECT
# =========================================

@app.post("/reject/{id}")
def reject_land(
    id: int,
    db: Session = Depends(get_db)
):

    land = db.query(models.Land).filter(
        models.Land.id == id
    ).first()

    if not land:
        return {"message": "Land not found"}

    land.status = "rejected"

    db.commit()

    return {
        "message": "Rejected successfully"
    }

# =========================================
# STEP 6 — APPROVED MARKERS FOR MAP
# =========================================

@app.get("/submissions")
def get_submissions(
    db: Session = Depends(get_db)
):

    data = db.query(models.Land).filter(
        models.Land.status == "approved"
    ).all()

    return [
        {
            "id": d.id,

            "location": d.location,

            "price": d.price,

            "area": d.area,

           
            "type": d.type,

            "lat": d.lat,

            "lng": d.lng,

            "date": d.date,

            "status": d.status,

            "flag": d.flag,

            # HEATMAP INTENSITY
            "heat_intensity": d.price / 100000
        }
        for d in data
    ]

# =========================================
# ROOT
# =========================================

@app.get("/")
def root():
    return {
        "message": "Smart Land Pricing API Running"
    }