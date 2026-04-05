from app.services.embedding_generator import generate_embedding_from_image
from app.services.cloudinary_service import upload_student_image
from fastapi import APIRouter, UploadFile
from app.tasks.embedding_tasks import generate_embedding_task

router = APIRouter()

@router.post("/students")
async def add_student(student_id: str, files: list[UploadFile]):

    image_urls = []

    for file in files:

        image_url = upload_student_image(file.file, student_id)

        image_urls.append(image_url)

        # push embedding job to queue
        generate_embedding_task.delay(student_id, image_url)

    return {
        "message": "Student added successfully",
        "images": image_urls
    }