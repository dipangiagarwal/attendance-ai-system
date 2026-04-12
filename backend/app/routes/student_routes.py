from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Request
from sqlalchemy.orm import Session
from typing import Optional

from app.database.db import get_db
from app.schemas.student_schema import StudentCreate, StudentUpdate, StudentResponse

from app.controllers.student_controller import (
    create_student as create_student_controller,
    get_all_students,
    get_student_by_id,
    update_student as update_student_controller,
    delete_student as delete_student_controller
)

from app.utils.dependencies import get_current_admin

# ✅ FIXED: Import limiter from utils (NOT main)
from app.utils.limiter import limiter


router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


# CREATE STUDENT
@router.post("/create-student", response_model=StudentResponse)
@limiter.limit("30/minute")
async def add_student(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    student_phone: str = Form(...),
    parent_phone: str = Form(...),
    class_name: str = Form(...),
    joining_date: str = Form(...),
    photo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    student_data = StudentCreate(
        name=name,
        email=email,
        student_phone=student_phone,
        parent_phone=parent_phone,
        class_name=class_name,
        joining_date=joining_date
    )

    photo_file = photo.file if photo else None

    return create_student_controller(
        db,
        student_data,
        photo=photo_file
    )


# GET ALL STUDENTS
@router.get("/get-all-student", response_model=list[StudentResponse])
@limiter.limit("60/minute")
def get_students(
    request: Request,
    db: Session = Depends(get_db)
):

    return get_all_students(db)


# GET SINGLE STUDENT
@router.get("/single_student/{student_id}", response_model=StudentResponse)
@limiter.limit("60/minute")
def get_student(
    request: Request,
    student_id: int,
    db: Session = Depends(get_db)
):

    student = get_student_by_id(
        db,
        student_id
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student


# PATCH STUDENT (PARTIAL UPDATE)
@router.patch("/update_student/{student_id}", response_model=StudentResponse)
@limiter.limit("30/minute")
def patch_student(
    request: Request,
    student_id: int,
    student: StudentUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    updated = update_student_controller(
        db,
        student_id,
        student
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return updated


# DELETE STUDENT
@router.delete("/delete_student/{student_id}")
@limiter.limit("30/minute")
def remove_student(
    request: Request,
    student_id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    deleted = delete_student_controller(
        db,
        student_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return {
        "message": "Student deleted successfully"
    }