from sqlalchemy import Column, Integer, String, DateTime, JSON
from datetime import datetime
from app.database.db import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True)
    action = Column(String)        # CREATE, UPDATE, DELETE
    table_name = Column(String)    # students, batches, etc
    record_id = Column(Integer)    # which record changed
    changed_by = Column(String)    # admin email
    changes = Column(JSON)         # what changed
    created_at = Column(DateTime, default=datetime.utcnow)