from pydantic import BaseModel
from datetime import datetime


class CameraCreate(BaseModel):
    camera_name: str
    camera_ip: str
    location: str


class CameraResponse(BaseModel):
    id: int
    camera_name: str
    camera_ip: str
    location: str
    created_at: datetime

    class Config:
        from_attributes = True