from sqlalchemy.orm import Session
from app.models.camera_model import Camera


def create_camera(db: Session, camera):
    new_camera = Camera(
        camera_name=camera.camera_name,
        camera_ip=camera.camera_ip,
        location=camera.location
    )

    db.add(new_camera)
    db.commit()
    db.refresh(new_camera)


    return new_camera


def get_all_cameras(db: Session):
    return db.query(Camera).all()


def get_camera_by_id(db: Session, camera_id: int):
    return db.query(Camera).filter(Camera.id == camera_id).first()


def update_camera(db: Session, camera_id: int, camera_data):
    camera = db.query(Camera).filter(Camera.id == camera_id).first()

    if camera:
        camera.camera_name = camera_data.camera_name
        camera.camera_ip = camera_data.camera_ip
        camera.location = camera_data.location

        db.commit()
        db.refresh(camera)

    return camera


def delete_camera(db: Session, camera_id: int):
    camera = db.query(Camera).filter(Camera.id == camera_id).first()

    if camera:
        db.delete(camera)
        db.commit()

    return camera