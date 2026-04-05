# mark_present()
# prevent_duplicate()
# store_attendance()
# trigger_notification()

from sqlalchemy.orm import Session
from datetime import datetime, date
from app.models.attendance_model import Attendance
from app.models.student_model import Student
from app.models.batch_model import Batch
from app.notifications.producer import send_present_event

def attendance_already_marked(db: Session, student_id: int, batch_id: int):

    today = date.today()

    attendance = db.query(Attendance).filter(
        Attendance.student_id == student_id,
        Attendance.batch_id == batch_id,
        Attendance.date == today
    ).first()

    return attendance

def mark_student_present(db: Session, student_id: int, batch_id: int, camera_id: int):

    # check duplicate
    existing = attendance_already_marked(db, student_id, batch_id)

    if existing:
        return {"message": "Attendance already marked"}

    new_attendance = Attendance(
        student_id=student_id,
        batch_id=batch_id,
        camera_id=camera_id,
        date=date.today(),
        time_marked=datetime.now(),
        status="present"
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    # fetch student info for notification
    student = db.query(Student).filter(Student.id == student_id).first()
    batch = db.query(Batch).filter(Batch.id == batch_id).first()

    if student and student.parent_phone:

        send_present_event(
            student_id=student.id,
            student_name=student.name,
            parent_phone=student.parent_phone,
            batch_name=batch.name
        )

    return new_attendance