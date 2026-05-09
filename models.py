# from sqlalchemy import Column, Integer, String, Float
# from database_old import Base

# class Land(Base):
#     __tablename__ = "lands"

#     id = Column(Integer, primary_key=True, index=True)
#     location = Column(String)
#     price = Column(Float)
#     area = Column(Float)
#     date = Column(String)
#     currency = Column(String)
#     type = Column(String)
#     lat = Column(Float)
#     lng = Column(Float)
#     status = Column(String, default="pending")
#     flag = Column(String, default="normal")


from sqlalchemy import Column, Integer, String, Float
from database import Base

class Land(Base):
    __tablename__ = "lands"

    id = Column(Integer, primary_key=True, index=True)

    location = Column(String)
    price = Column(Float)
    area = Column(Float)

    date = Column(String)
    currency = Column(String)

    type = Column(String)

    lat = Column(Float)
    lng = Column(Float)

    status = Column(String, default="pending")

    flag = Column(String, default="normal")