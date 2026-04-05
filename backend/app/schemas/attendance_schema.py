# app/schemas/attendance_schema.py

from pydantic import BaseModel
from datetime import date, time, datetime
from typing import Optional

class AttendanceCreate(BaseModel):
    student_id: int
    batch_id: int
    status: str  # "present" or "absent"
    confidence_score: Optional[float] = None
    camera_id: Optional[str] = "camera_default"

class AttendanceResponse(BaseModel):
    id: int
    student_id: int
    batch_id: int
    date: date
    time: time
    status: str
    confidence_score: Optional[float] = None
    camera_id: Optional[str] = "camera_default"
    created_at: datetime

    class Config:
        from_attributes = True