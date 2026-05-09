# from pydantic import BaseModel

# class LandCreate(BaseModel):
#     location: str
#     price: float
#     area: float
#     land_type: str
#     lat: float
#     lng: float
#     date: str
#     currency: str

from pydantic import BaseModel

class LandCreate(BaseModel):
    location: str
    price: float
    area: float
    type: str
    lat: float
    lng: float
    date: str
    currency: str