from fastapi import APIRouter, Depends, Response
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.services.camera_service import camera_service, update_camera_heartbeat
from app.utils.dependencies import get_current_admin

router = APIRouter(
    prefix="/camera",
    tags=["Camera"]
)


# ─── Live MJPEG Stream ───────────────────────────────────────────
@router.get("/stream")
def live_stream():
    """
    Real-time MJPEG stream from RTSP camera.
    Use in frontend: <img src="http://localhost:8000/api/camera/stream" />
    """
    return StreamingResponse(
        camera_service.generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )


# ─── Single Snapshot ─────────────────────────────────────────────
@router.get("/snapshot")
def snapshot():
    """Returns latest frame as a single JPEG image"""
    frame_bytes = camera_service.get_snapshot()
    if frame_bytes is None:
        return Response(
            content="Camera not available",
            status_code=503
        )
    return Response(
        content=frame_bytes,
        media_type="image/jpeg"
    )


# ─── Camera Status ───────────────────────────────────────────────
@router.get("/status")
def camera_status(current_admin: str = Depends(get_current_admin)):
    """Returns camera online/offline status"""
    return {
        "is_online": camera_service.is_online(),
        "message": "Camera is online" if camera_service.is_online() else "Camera is offline"
    }


# ─── Heartbeat ───────────────────────────────────────────────────
@router.post("/heartbeat/{camera_id}")
def heartbeat(
    camera_id: int,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    """Update camera last seen timestamp"""
    update_camera_heartbeat(db, camera_id)
    return {"message": "Heartbeat updated"}