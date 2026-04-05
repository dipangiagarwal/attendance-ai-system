# app/routes/attendance_routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date
from app.schemas.attendance_schema import AttendanceCreate, AttendanceResponse
from app.controllers.attendance_controller import mark_attendance, get_attendance_by_batch, get_attendance_by_student
from app.utils.dependencies import get_db, get_current_admin  # for JWT protection


router = APIRouter(
    prefix="/attendance", tags=["attendance"]
)


# Mark attendance for a student
@router.post("/mark", response_model=AttendanceResponse)
def mark_student_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    """
    Mark attendance for a student.
    Protected route: only admin can mark.
    """
    result = mark_attendance(db, attendance)
    
    if isinstance(result, dict) and "error" in result:
        if result["error"] == "Attendance already marked for today":
            raise HTTPException(status_code=200, detail="Already marked")  # ← not an error
        raise HTTPException(status_code=404, detail=result["error"])
    
    return result


# Get attendance of all students in a batch for a specific date.
@router.get("/batch/{batch_id}/{for_date}", response_model=list[AttendanceResponse])
def get_batch_attendance(batch_id: int, for_date: date, db: Session = Depends(get_db)):
    """
    Get attendance of all students in a batch for a specific date.
    """
    records = get_attendance_by_batch(db, batch_id, for_date)
    return records


#  Get all attendance records for a student.
@router.get("/student/{student_id}", response_model=list[AttendanceResponse])
def get_student_attendance(student_id: int, db: Session = Depends(get_db)):
    """
    Get all attendance records for a student.
    """
    records = get_attendance_by_student(db, student_id)
    return records