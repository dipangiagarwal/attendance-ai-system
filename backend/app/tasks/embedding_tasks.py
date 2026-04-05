from app.celery_worker import celery
from app.services.embedding_generator import generate_embedding_from_image


@celery.task
def generate_embedding_task(student_id, image_url):

    generate_embedding_from_image(student_id, image_url)