# test_camera.py
import cv2
import os
import time
from dotenv import load_dotenv

load_dotenv()

# ── Load from .env ─────────────────────────────────────────
CAMERA_TYPE     = os.getenv("CAMERA_TYPE", "ip")
CAMERA_USERNAME = os.getenv("CAMERA_USERNAME", "")
CAMERA_PASSWORD = os.getenv("CAMERA_PASSWORD", "")
CAMERA_IP       = os.getenv("CAMERA_IP", "")
CAMERA_PORT     = os.getenv("CAMERA_PORT", "554")
CAMERA_INDEX    = int(os.getenv("CAMERA_INDEX", "0"))
CAMERA_STREAM_PATH = os.getenv("CAMERA_STREAM_PATH", "")

# ── Build RTSP URL ─────────────────────────────────────────
def build_rtsp_url():
    if CAMERA_TYPE == "ip":
        # with credentials
        if CAMERA_USERNAME and CAMERA_PASSWORD:
            url = f"rtsp://{CAMERA_USERNAME}:{CAMERA_PASSWORD}@{CAMERA_IP}:{CAMERA_PORT}{CAMERA_STREAM_PATH}"
        else:
            url = f"rtsp://{CAMERA_IP}:{CAMERA_PORT}{CAMERA_STREAM_PATH}"
        return url
    else:
        return int(CAMERA_INDEX)  # local webcam

# ── Test All Possible URLs ─────────────────────────────────
def test_url(url, label=""):
    print(f"\n[TEST] {label}")
    print(f"       URL: {url}")
    
    cap = cv2.VideoCapture(url)
    cap.set(cv2.CAP_PROP_OPEN_TIMEOUT_MSEC, 5000)   # 5 second timeout
    cap.set(cv2.CAP_PROP_READ_TIMEOUT_MSEC, 5000)

    if not cap.isOpened():
        print(f"[FAIL] ❌ Cannot open stream")
        cap.release()
        return False

    print(f"[INFO] ✅ Stream opened — reading frame...")
    ret, frame = cap.read()

    if not ret or frame is None:
        print(f"[FAIL] ❌ Stream opened but no frame received")
        cap.release()
        return False

    print(f"[SUCCESS] ✅ Frame received!")
    print(f"          Shape : {frame.shape}")
    print(f"          Width : {frame.shape[1]}px")
    print(f"          Height: {frame.shape[0]}px")

    # save test frame as image
    cv2.imwrite("test_frame.jpg", frame)
    print(f"          Saved : test_frame.jpg ✅")

    cap.release()
    return True


# ── Main ───────────────────────────────────────────────────
if __name__ == "__main__":

    print("=" * 55)
    print("      CAMERA CONNECTION DIAGNOSTIC TEST")
    print("=" * 55)
    print(f"  TYPE     : {CAMERA_TYPE}")
    print(f"  IP       : {CAMERA_IP}")
    print(f"  PORT     : {CAMERA_PORT}")
    print(f"  USERNAME : {CAMERA_USERNAME}")
    print(f"  PASSWORD : {'*' * len(CAMERA_PASSWORD)}")
    print(f"  PATH     : {CAMERA_STREAM_PATH}")
    print("=" * 55)

    primary_url = build_rtsp_url()

    # ── Try 1: Your exact .env config ─────────────────────
    success = test_url(primary_url, "Your .env config (primary)")

    if not success:
        print("\n[INFO] Primary failed. Trying fallback URLs...\n")

        fallback_urls = [
            (
                f"rtsp://{CAMERA_USERNAME}:{CAMERA_PASSWORD}@{CAMERA_IP}:{CAMERA_PORT}/cam/realmonitor?channel=1&subtype=0",
                "Channel 1, Subtype 0 (main stream)"
            ),
            (
                f"rtsp://{CAMERA_USERNAME}:{CAMERA_PASSWORD}@{CAMERA_IP}:{CAMERA_PORT}/cam/realmonitor?channel=1&subtype=1",
                "Channel 1, Subtype 1 (sub stream)"
            ),
            (
                f"rtsp://{CAMERA_USERNAME}:{CAMERA_PASSWORD}@{CAMERA_IP}:{CAMERA_PORT}/cam/realmonitor?channel=3&subtype=0",
                "Channel 3, Subtype 0"
            ),
            (
                f"rtsp://{CAMERA_USERNAME}:{CAMERA_PASSWORD}@{CAMERA_IP}:554/h264/ch1/main/av_stream",
                "Hikvision style URL"
            ),
            (
                f"rtsp://{CAMERA_USERNAME}:{CAMERA_PASSWORD}@{CAMERA_IP}:554/Streaming/Channels/101",
                "Hikvision channel 101"
            ),
            (
                f"http://{CAMERA_IP}:80/video",
                "HTTP stream (no auth)"
            ),
        ]

        for url, label in fallback_urls:
            if test_url(url, label):
                print(f"\n✅ Working URL found!")
                print(f"   Update your .env CAMERA_STREAM_PATH accordingly")
                break
        else:
            print("\n" + "=" * 55)
            print("❌ ALL URLs FAILED — Possible reasons:")
            print("=" * 55)
            print("  1. Camera is offline or unreachable")
            print("     → ping 192.168.1.240")
            print()
            print("  2. Docker bridge network can't reach LAN camera")
            print("     → Add 'network_mode: host' to ai_engine in docker-compose")
            print()
            print("  3. Wrong credentials")
            print("     → Double-check CAMERA_USERNAME and CAMERA_PASSWORD")
            print()
            print("  4. Wrong stream path for your camera brand")
            print("     → Check your camera manual for RTSP URL format")
            print()
            print("  5. RTSP port blocked by firewall")
            print("     → Run: nmap -p 554,8554,80,8080 192.168.1.240")

    print("\n[DONE] Test complete.")