import cv2
from app.camera.camera_face_detection import process_frame
from app.utils.config import (
    CAMERA_TYPE, 
    CAMERA_INDEX,
    CAMERA_USERNAME,
    CAMERA_PASSWORD,
    CAMERA_IP,
    CAMERA_PORT,
    CAMERA_STREAM_PATH
)

def get_camera_source():
    """
    Get camera source based on configuration.
    Returns the appropriate source for cv2.VideoCapture()
    """
    if CAMERA_TYPE.lower() == 'ip':
        # Build RTSP URL for IP camera
        rtsp_url = f"rtsp://{CAMERA_USERNAME}:{CAMERA_PASSWORD}@{CAMERA_IP}:{CAMERA_PORT}{CAMERA_STREAM_PATH}"
        print(f"[INFO] Using IP Camera: {CAMERA_IP}")
        return rtsp_url
    elif CAMERA_TYPE.lower() == 'usb':
        # Use USB webcam
        print(f"[INFO] Using USB Camera: Index {CAMERA_INDEX}")
        return CAMERA_INDEX
    else:
        print(f"[WARNING] Unknown CAMERA_TYPE '{CAMERA_TYPE}', defaulting to USB")
        return CAMERA_INDEX

def start_camera_stream(source=None):
    """
    Start camera or video stream.
    
    Args:
        source: Override source (optional)
            - None: Use config settings (CAMERA_TYPE)
            - 0, 1, 2...: USB webcam index
            - str: Video file path or RTSP URL
    """
    
    # If no source provided, get from config
    if source is None:
        source = get_camera_source()
    
    # cap = cv2.VideoCapture(source, cv2.CAP_FFMPEG)
    if isinstance(source, str) and source.startswith('rtsp'):
        cap = cv2.VideoCapture(source, cv2.CAP_FFMPEG)
    else:
        cap = cv2.VideoCapture(source)
    
    # Set buffer size to reduce latency for IP cameras
    if isinstance(source, str) and source.startswith('rtsp'):
        cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
    
    if not cap.isOpened():
        print("[ERROR] Unable to open camera")
        print(f"[ERROR] Source: {source}")
        print("[TIP] Check your .env settings and network connection")
        return

    print("[INFO] Camera stream started")

    while True:
        ret, frame = cap.read()

        if not ret:
            print("[WARNING] Frame not received, retrying...")
            cap.release()
            import time
            time.sleep(2)
            cap = cv2.VideoCapture(source, cv2.CAP_FFMPEG)
            continue

        processed_frame, faces = process_frame(frame)
        # Running headless - no imshow

    cap.release()
    print("[INFO] Camera stream stopped")

if __name__ == "__main__":
    # For testing
    start_camera_stream()