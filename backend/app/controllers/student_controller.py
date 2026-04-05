from sqlalchemy.orm import Session
from app.models.student_model import Student
from app.models.attendance_model import Attendance
from app.models.student_batch_model import StudentBatch
from app.schemas.student_schema import StudentCreate, StudentUpdate
from app.services.cloudinary_service import upload_student_image
from app.utils.sanitizer import sanitize_input


# CREATE STUDENT
def create_student(db: Session, student: StudentCreate, photo= None):
    new_student = Student(
        name=sanitize_input(student.name),
        email=student.email,
        student_phone=sanitize_input(student.student_phone),
        parent_phone=sanitize_input(student.parent_phone),
        class_name=student.class_name,
        joining_date=student.joining_date,
        photo_url = None   # save the returned Cloudinary URL
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    # Upload to Cloudinary if a photo was provided
    if photo:
        photo_url = upload_student_image(file=photo, student_id=f"{new_student.id}_{new_student.email}")
    # using email as unique public_id

# 3️⃣ Save URL
        new_student.photo_url = photo_url
        db.commit()
        db.refresh(new_student)
        
    return new_student


# GET ALL STUDENTS
def get_all_students(db: Session):
    students = db.query(Student).all()
    return students


# GET SINGLE STUDENT
def get_student_by_id(db: Session, student_id: int):
    student = db.query(Student).filter(Student.id == student_id).first()
    return student


# UPDATE STUDENT
def update_student(db: Session, student_id: int, student: StudentUpdate):
    db_student = db.query(Student).filter(Student.id == student_id).first()

    if not db_student:
        return None

    update_data = student.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_student, key, value)

    db.commit()
    db.refresh(db_student)

    return db_student

# DELETE STUDENT
def delete_student(db: Session, student_id: int):
    # Step 1: Delete from student_batches first
    db.query(StudentBatch).filter(StudentBatch.student_id == student_id).delete()
    
    # Step 2: Delete attendance records if any
    db.query(Attendance).filter(Attendance.student_id == student_id).delete()
    
    # Step 3: Now delete the student
    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        return None

    db.delete(student)
    db.commit()

    return student