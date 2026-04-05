from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.student_batch_schema import StudentBatchCreate, StudentBatchResponse
from app.controllers.student_batch_controller import (
    assign_student_to_batch,
    remove_student_from_batch,
    get_students_in_batch,
    get_batches_of_student
)

router = APIRouter(prefix="/student-batches", tags=["Student Batches"])


# Assign student to batch
@router.post("/assign_batch", response_model=StudentBatchResponse)
def add_student_to_batch(data: StudentBatchCreate, db: Session = Depends(get_db)):

    return assign_student_to_batch(db, data)


# Get all students in a batch
@router.get("/batch/{batch_id}")
def get_students(batch_id: int, db: Session = Depends(get_db)):

    return get_students_in_batch(db, batch_id)


# Get all batches of a student
@router.get("/student/{student_id}")
def get_batches(student_id: int, db: Session = Depends(get_db)):

    return get_batches_of_student(db, student_id)


# Remove student from batch
@router.delete("/remove_student/{relation_id}")
def remove_student(relation_id: int, db: Session = Depends(get_db)):

    return remove_student_from_batch(db, relation_id)