from dotenv import load_dotenv
load_dotenv()

from app.database.db import Base, engine
from app.models import student_model, admin_model, attendance_model, batch_model, camera_model, student_batch_model, embedding_model

Base.metadata.create_all(bind=engine)
print("All tables created successfully!")