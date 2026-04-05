from sqlalchemy.orm import Session
from app.models.student_batch_model import StudentBatch
from app.schemas.student_batch_schema import StudentBatchCreate
from fastapi import HTTPException

# Assign student to batch
def assign_student_to_batch(db: Session, data: StudentBatchCreate):

    # Check if already assigned
    existing = db.query(StudentBatch).filter(
        StudentBatch.student_id == data.student_id,
        StudentBatch.batch_id == data.batch_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Student already assigned to this batch"
        )

    new_relation = StudentBatch(
        student_id=data.student_id,
        batch_id=data.batch_id
    )

    db.add(new_relation)
    db.commit()
    db.refresh(new_relation)

    return new_relation


# Remove student from batch
def remove_student_from_batch(db: Session, relation_id: int):

    relation = db.query(StudentBatch).filter(StudentBatch.id == relation_id).first()

    if relation:
        db.delete(relation)
        db.commit()

    return relation


# Get students in a batch
def get_students_in_batch(db: Session, batch_id: int):

    return db.query(StudentBatch).filter(StudentBatch.batch_id == batch_id).all()


# Get batches of a student
def get_batches_of_student(db: Session, student_id: int):

    return db.query(StudentBatch).filter(StudentBatch.student_id == student_id).all()