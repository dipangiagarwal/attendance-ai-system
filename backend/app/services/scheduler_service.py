from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta

scheduler = BackgroundScheduler()

from app.database.db import SessionLocal
from app.models.batch_model import Batch
from app.models.camera_model import Camera
from app.services.absent_service import process_batch_absentees


def send_absent_notifications(batch_id: int):
    """Triggered at exact batch end time"""
    db = SessionLocal()
    try:
        batch = db.query(Batch).filter(Batch.id == batch_id).first()
        if not batch:
            return

        if batch.absent_marked_today:
            print(f"[SCHEDULER] Batch {batch_id} already processed today, skipping.")
            return

        print(f"[SCHEDULER] Class ended for batch {batch_id}, processing absentees...")
        process_batch_absentees(db, batch_id)

        batch.absent_marked_today = True
        db.commit()
        print(f"[SCHEDULER] Absent notifications queued for batch {batch_id}")

    except Exception as e:
        print(f"[ERROR] send_absent_notifications batch {batch_id}: {e}")
        db.rollback()
    finally:
        db.close()


def check_camera_health():
    """Check if cameras are online - runs every 2 minutes"""
    db = SessionLocal()
    try:
        now = datetime.utcnow()
        cameras = db.query(Camera).all()

        for camera in cameras:
            if camera.last_seen:
                diff = now - camera.last_seen
                if diff > timedelta(minutes=2):
                    camera.is_online = False
                    print(f"[CAMERA] Camera {camera.id} is offline")

        db.commit()

    except Exception as e:
        print(f"[ERROR] check_camera_health: {e}")
        db.rollback()
    finally:
        db.close()


def reset_absent_flags():
    """Reset flags daily at midnight so next day works fresh"""
    db = SessionLocal()
    try:
        batches = db.query(Batch).all()
        for batch in batches:
            batch.absent_marked_today = False
        db.commit()
        print("[SCHEDULER] Reset all absent_marked_today flags for new day")

        # Reschedule batch jobs for the new day
        schedule_all_batch_jobs()

    except Exception as e:
        print(f"[ERROR] reset_absent_flags: {e}")
        db.rollback()
    finally:
        db.close()


def schedule_all_batch_jobs():
    """Schedule a job for each batch at its exact end time"""
    db = SessionLocal()
    try:
        batches = db.query(Batch).all()

        for batch in batches:
            job_id = f"batch_end_{batch.id}"

            # Remove existing job if already scheduled
            if scheduler.get_job(job_id):
                scheduler.remove_job(job_id)

            # ✅ Safely convert end_time to time object
            if isinstance(batch.end_time, str):
                end_time = datetime.strptime(batch.end_time, "%H:%M:%S").time()
            else:
                end_time = batch.end_time  # already a time object

            scheduler.add_job(
                send_absent_notifications,
                trigger='cron',
                hour=end_time.hour,
                minute=end_time.minute,
                args=[batch.id],
                id=job_id,
                replace_existing=True,
                misfire_grace_time=300
            )
            print(f"[SCHEDULER] Batch {batch.id} notifications scheduled at {end_time.hour}:{end_time.minute:02d}")

    except Exception as e:
        print(f"[ERROR] schedule_all_batch_jobs: {e}")
    finally:
        db.close()


def start_scheduler():
    # Camera health check every 2 minutes
    scheduler.add_job(
        check_camera_health,
        trigger="interval",
        minutes=2,
        misfire_grace_time=60,
        id="camera_health"
    )

    # Reset flags and reschedule batch jobs daily at midnight
    scheduler.add_job(
        reset_absent_flags,
        trigger="cron",
        hour=0,
        minute=0,
        id="reset_flags"
    )

    scheduler.start()

    # Schedule batch jobs immediately on startup
    schedule_all_batch_jobs()
    print("[SCHEDULER] Scheduler started successfully")