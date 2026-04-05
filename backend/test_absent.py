from dotenv import load_dotenv
load_dotenv()

from app.database.db import SessionLocal
from app.services.absent_service import process_batch_absentees

db = SessionLocal()
process_batch_absentees(db, batch_id=1)
print("Absent marking done!")
db.close()