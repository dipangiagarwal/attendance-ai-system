from pydantic import BaseModel
from datetime import time, datetime


class BatchCreate(BaseModel):

    batch_name: str
    class_name: str
    start_time: time
    end_time: time


class BatchResponse(BaseModel):

    id: int
    batch_name: str
    class_name: str
    start_time: time
    end_time: time
    created_at: datetime

    class Config:
        from_attributes = True # Ye SQLAlchemy model ko Pydantic response me convert karne ke liye hota hai.
