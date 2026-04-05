from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from typing import Optional


class StudentCreate(BaseModel):

    name: str
    email: EmailStr
    student_phone: str
    parent_phone: str
    class_name: str
    joining_date: date


class StudentUpdate(BaseModel):

    name: Optional[str] = None
    email: Optional[EmailStr] = None
    student_phone: Optional[str] = None
    parent_phone: Optional[str] = None
    class_name: Optional[str] = None
    joining_date: Optional[date] = None


class StudentResponse(BaseModel):

    id: int
    name: str
    email: str
    student_phone: str
    parent_phone: str
    class_name: str
    joining_date: date
    created_at: datetime
    photo_url: Optional[str] = None

    class Config:
        from_attributes = True