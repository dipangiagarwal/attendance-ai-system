# app/models/attendance_model.py

from sqlalchemy import Column, Integer, String, Date, Time, Float, DateTime, ForeignKey
from datetime import datetime
from app.database.db import Base

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    batch_id = Column(Integer, ForeignKey("batches.id"), nullable=False)

    date = Column(Date, nullable=False)
    time = Column(Time, default=datetime.utcnow().time)

    status = Column(String, nullable=False)  # 'present' or 'absent'
    confidence_score = Column(Float, nullable=True)  # optional for AI recognition

    camera_id = Column(String, nullable=True, default="camera_default")  # placeholder for now
    created_at = Column(DateTime, default=datetime.utcnow)