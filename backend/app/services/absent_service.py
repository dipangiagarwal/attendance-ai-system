from sqlalchemy.orm import Session
from datetime import date, datetime

from app.models.student_model import Student
from app.models.batch_model import Batch
from app.models.attendance_model import Attendance
from app.models.student_batch_model import StudentBatch

from app.notifications.producer import send_absent_event

def get_absent_students(db: Session, batch_id: int):

    today = date.today()

    # students in batch
    students = db.query(StudentBatch).filter(
        StudentBatch.batch_id == batch_id
    ).all()

    absent_students = []

    for record in students:

        attendance = db.query(Attendance).filter(
            Attendance.student_id == record.student_id,
            Attendance.batch_id == batch_id,
            Attendance.date == today
        ).first()

        if not attendance:
            absent_students.append(record.student_id)

    return absent_students


def mark_student_absent(db: Session, student_id: int, batch_id: int):

    new_attendance = Attendance(
        student_id=student_id,
        batch_id=batch_id,
        date=date.today(),
        time=datetime.now().time(),
        status="absent"
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    student = db.query(Student).filter(Student.id == student_id).first()
    batch = db.query(Batch).filter(Batch.id == batch_id).first()

    if student and student.parent_phone:

        send_absent_event(
            student_id=student.id,
            student_name=student.name,
            parent_phone=student.parent_phone,
            batch_name=batch.batch_name
        )


def process_batch_absentees(db: Session, batch_id: int):

    absent_students = get_absent_students(db, batch_id)

    for student_id in absent_students:

        mark_student_absent(db, student_id, batch_id)