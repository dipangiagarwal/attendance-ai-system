from app.database.db import engine
from app.models.admin_model import Admin
from app.database.db import Base
from app.models.student_model import Student   # ✅ Add this

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")