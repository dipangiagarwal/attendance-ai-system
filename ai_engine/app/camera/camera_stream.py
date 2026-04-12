import cv2
import time
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
    if CAMERA_TYPE.lower() == 'ip':
        rtsp_url = f"rtsp://{CAMERA_USERNAME}:{CAMERA_PASSWORD}@{CAMERA_IP}:{CAMERA_PORT}{CAMERA_STREAM_PATH}"
        print(f"[INFO] Using IP Camera: {CAMERA_IP}")
        print(f"[INFO] RTSP URL: {rtsp_url}")
        return rtsp_url
    elif CAMERA_TYPE.lower() == 'usb':
        print(f"[INFO] Using USB Camera: Index {CAMERA_INDEX}")
        return int(CAMERA_INDEX)
    else:
        print(f"[WARNING] Unknown CAMERA_TYPE '{CAMERA_TYPE}', defaulting to USB")
        return int(CAMERA_INDEX)


def open_camera(source):
    cap = cv2.VideoCapture(source)
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
    cap.set(cv2.CAP_PROP_OPEN_TIMEOUT_MSEC, 5000)
    cap.set(cv2.CAP_PROP_READ_TIMEOUT_MSEC, 5000)
    return cap


def start_camera_stream(source=None):
    if source is None:
        source = get_camera_source()

    cap = open_camera(source)

    if not cap.isOpened():
        print("[ERROR] Unable to open camera")
        print(f"[ERROR] Source: {source}")
        return

    print("[INFO] Camera stream started")

    frame_count = 0
    SKIP_FRAMES = 3
    retry_count = 0
    MAX_RETRIES = 10

    while True:
        ret, frame = cap.read()

        if not ret or frame is None:
            retry_count += 1
            print(f"[WARNING] Frame not received, retrying... ({retry_count}/{MAX_RETRIES})")
            cap.release()
            time.sleep(2)

            if retry_count >= MAX_RETRIES:
                print("[ERROR] Max retries reached. Restarting stream in 10s...")
                time.sleep(10)
                retry_count = 0

            cap = open_camera(source)
            continue

        retry_count = 0
        frame_count += 1

        # ✅ Har 30 frames pe batao ki frames aa rahi hain
        if frame_count % 30 == 0:
            print(f"[DEBUG] ✅ Frames chal rahi hain — total: {frame_count}")

        if frame_count % SKIP_FRAMES != 0:
            continue

        # ✅ Process frame aur result log karo
        try:
            processed_frame, faces = process_frame(frame)

            # ✅ Har 30 processed frames pe face result dikhao
            if (frame_count // SKIP_FRAMES) % 10 == 0:
                if len(faces) == 0:
                    print(f"[DEBUG] 👤 Koi face detect nahi hua (frame {frame_count})")
                else:
                    for face in faces:
                        sid = face.get("student_id", "unknown")
                        dist = face.get("distance", None)
                        print(f"[DEBUG] 🎯 Face mila — student_id: {sid}, score: {dist}")

        except Exception as e:
            print(f"[ERROR] Frame process karte waqt error: {e}")


if __name__ == "__main__":
    start_camera_stream()