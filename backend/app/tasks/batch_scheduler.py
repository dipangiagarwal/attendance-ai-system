from datetime import datetime
import time
from app.database.db import SessionLocal
from app.models.batch_model import Batch
from app.services.absent_service import process_batch_absentees

def run_batch_scheduler():

    print("Batch scheduler started...")

    while True:
        try:
            db = SessionLocal()
            now = datetime.now().time()

            batches = db.query(Batch).all()

            for batch in batches:

                if (
                    batch.end_time is not None
                    and now >= batch.end_time
                    and not batch.absent_marked_today
                ):
                    print(f"[SCHEDULER] Processing batch {batch.id}")

                    process_batch_absentees(db, batch.id)

                    batch.absent_marked_today = True
                    db.commit()

            db.close()

        except Exception as e:
            print("[SCHEDULER ERROR]", e)

        time.sleep(60)