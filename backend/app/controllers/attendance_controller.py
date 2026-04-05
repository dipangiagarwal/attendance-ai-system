from sqlalchemy.orm import Session
from datetime import datetime, date
from app.models.attendance_model import Attendance
from app.models.student_model import Student
from app.models.batch_model import Batch
from app.models.student_batch_model import StudentBatch
from app.schemas.attendance_schema import AttendanceCreate
from app.notifications.producer import send_present_event


def mark_attendance(db: Session, attendance: AttendanceCreate):
    student = db.query(Student).filter(Student.id == attendance.student_id).first()
    if not student:
        return {"error": "Student not found"}

    batch_link = db.query(StudentBatch).filter(
        StudentBatch.student_id == attendance.student_id,
        StudentBatch.batch_id == attendance.batch_id
    ).first()
    if not batch_link:
        return {"error": "Student not assigned to this batch"}

    existing = db.query(Attendance).filter(
        Attendance.student_id == attendance.student_id,
        Attendance.batch_id == attendance.batch_id,
        Attendance.date == date.today()
    ).first()
    if existing:
        return {"error": "Attendance already marked for today"}

    new_attendance = Attendance(
        student_id=attendance.student_id,
        batch_id=attendance.batch_id,
        status=attendance.status,
        camera_id=attendance.camera_id,
        confidence_score=attendance.confidence_score,
        date=date.today(),
        time=datetime.now().time()
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    # ← Send WhatsApp notification automatically
    try:
        batch = db.query(Batch).filter(Batch.id == attendance.batch_id).first()
        send_present_event(
            student_id=student.id,
            student_name=student.name,
            parent_phone=student.parent_phone,
            batch_name=batch.batch_name if batch else "Unknown"
        )
    except Exception as e:
        print(f"[WARNING] Notification failed: {e}")

    return new_attendance


def get_attendance_by_batch(db: Session, batch_id: int, for_date: date):
    records = db.query(Attendance).filter(
        Attendance.batch_id == batch_id,
        Attendance.date == for_date
    ).all()
    return records


def get_attendance_by_student(db: Session, student_id: int):
    records = db.query(Attendance).filter(
        Attendance.student_id == student_id
    ).all()
    return records