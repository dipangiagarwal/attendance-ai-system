from sqlalchemy.orm import Session
from app.models.batch_model import Batch
from app.schemas.batch_schema import BatchCreate


# Create Batch
def create_batch(db: Session, batch: BatchCreate):

    new_batch = Batch(
        batch_name=batch.batch_name,
        class_name=batch.class_name,
        start_time=batch.start_time,
        end_time=batch.end_time
    )

    db.add(new_batch)
    db.commit()
    db.refresh(new_batch)

    return new_batch


# Get All Batches
def get_batches(db: Session):

    return db.query(Batch).all()


# Get Batch by ID
def get_batch_by_id(db: Session, batch_id: int):

    return db.query(Batch).filter(Batch.id == batch_id).first()


# Delete Batch
def delete_batch(db: Session, batch_id: int):

    batch = db.query(Batch).filter(Batch.id == batch_id).first()

    if batch:
        db.delete(batch)
        db.commit()

    return batch