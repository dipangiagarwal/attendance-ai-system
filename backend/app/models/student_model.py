from sqlalchemy import Column, Integer, String, DateTime, Date, Boolean
from datetime import datetime
from app.database.db import Base


class Student(Base):

    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True)

    student_phone = Column(String, nullable=False)

    parent_phone = Column(String, nullable=False)

    class_name = Column(String, nullable=False)

    joining_date = Column(Date, nullable=False)

    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    photo_url = Column(String, nullable = True)
    