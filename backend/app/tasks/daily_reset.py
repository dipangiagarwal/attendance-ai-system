from app.database.db import SessionLocal
from app.models.batch_model import Batch

def reset_batches():
    db = SessionLocal()

    try:
        db.query(Batch).update(
            {"absent_marked_today": False}
        )
        db.commit()

    finally:
        db.close()