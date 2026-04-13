import cv2
import threading
import time
import logging
import os
from datetime import datetime
from sqlalchemy.orm import Session

logger = logging.getLogger(__name__)

RTSP_URL = os.getenv("RTSP_URL")

class RTSPCameraService:
    def __init__(self, rtsp_url: str):
        self.rtsp_url = rtsp_url
        self.cap = None
        self.lock = threading.Lock()
        self.latest_frame = None
        self.is_running = False
        self._connect()
        self._start_reader_thread()

    def _connect(self):
        logger.info("Connecting to RTSP camera...")
        self.cap = cv2.VideoCapture(self.rtsp_url)
        self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)  # minimize latency
        if self.cap.isOpened():
            logger.info("✅ RTSP Camera connected")
        else:
            logger.error("❌ Failed to connect to RTSP Camera")

    def _reader_thread(self):
        """Background thread — continuously reads latest frame"""
        self.is_running = True
        while self.is_running:
            if self.cap and self.cap.isOpened():
                ret, frame = self.cap.read()
                if ret:
                    with self.lock:
                        self.latest_frame = frame
                else:
                    logger.warning("Frame read failed — reconnecting...")
                    self._reconnect()
            else:
                self._reconnect()
            time.sleep(0.03)  # ~30fps

    def _reconnect(self):
        logger.info("Reconnecting to RTSP camera...")
        if self.cap:
            self.cap.release()
        time.sleep(2)
        self._connect()

    def _start_reader_thread(self):
        thread = threading.Thread(target=self._reader_thread, daemon=True)
        thread.start()

    def get_latest_frame(self):
        with self.lock:
            return self.latest_frame.copy() if self.latest_frame is not None else None

    def generate_frames(self):
        """MJPEG stream generator for FastAPI"""
        while True:
            frame = self.get_latest_frame()
            if frame is None:
                time.sleep(0.1)
                continue

            _, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
            frame_bytes = buffer.tobytes()

            yield (
                b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' +
                frame_bytes +
                b'\r\n'
            )
            time.sleep(0.033)  # ~30fps to client

    def get_snapshot(self):
        """Single frame as JPEG bytes"""
        frame = self.get_latest_frame()
        if frame is None:
            return None
        _, buffer = cv2.imencode('.jpg', frame)
        return buffer.tobytes()

    def is_online(self) -> bool:
        return self.cap is not None and self.cap.isOpened() and self.latest_frame is not None

    def stop(self):
        self.is_running = False
        if self.cap:
            self.cap.release()


def update_camera_heartbeat(db: Session, camera_id: int):
    from app.models.camera_model import Camera
    camera = db.query(Camera).filter(Camera.id == camera_id).first()
    if camera:
        camera.last_seen = datetime.utcnow()
        camera.is_online = True
        db.commit()

## uncomment this tomorrow and commen the lower one
# # Singleton instance
camera_service = RTSPCameraService(RTSP_URL)


# camera_service = RTSPCameraService(RTSP_URL) if RTSP_URL else None