from celery import Celery

celery = Celery(
    "attendance_tasks",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

celery.conf.task_routes = {
    "app.tasks.embedding_tasks.*": {"queue": "embedding_queue"}
}