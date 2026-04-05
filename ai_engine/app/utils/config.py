import os
from dotenv import load_dotenv

load_dotenv()

# -----------------------------
# APP SETTINGS
# -----------------------------

APP_NAME = os.getenv("APP_NAME", "AI ATTENDANCE ENGINE")


# -----------------------------
# CAMERA SETTINGS
# -----------------------------

CAMERA_TYPE = os.getenv("CAMERA_TYPE", "usb")

CAMERA_INDEX = int(os.getenv("CAMERA_INDEX", 0))

# IP Camera Settings (used when CAMERA_TYPE=ip)
CAMERA_USERNAME = os.getenv("CAMERA_USERNAME", "admin")
CAMERA_PASSWORD = os.getenv("CAMERA_PASSWORD", "password")
CAMERA_IP = os.getenv("CAMERA_IP", "192.168.1.128")
CAMERA_PORT = os.getenv("CAMERA_PORT", "554")
CAMERA_STREAM_PATH = os.getenv("CAMERA_STREAM_PATH", "/Streaming/Channels/101")


# -----------------------------
# FACE RECOGNITION SETTINGS
# -----------------------------

MATCH_THRESHOLD = float(os.getenv("MATCH_THRESHOLD", 0.5))

MULTI_FRAME_CONFIRMATION = int(os.getenv("MULTI_FRAME_CONFIRMATION", 3))


# -----------------------------
# ATTENDANCE SETTINGS
# -----------------------------

ATTENDANCE_COOLDOWN = int(os.getenv("ATTENDANCE_COOLDOWN", 300))


# -----------------------------
# BACKEND SETTINGS
# -----------------------------

BACKEND_URL = os.getenv("BACKEND_URL")