import requests
import os
from dotenv import load_dotenv

load_dotenv()

WAHA_URL = os.getenv("WAHA_URL")
WAHA_API_KEY = os.getenv("WAHA_API_KEY")
SESSION_NAME = os.getenv("WAHA_SESSION", "default")

def send_whatsapp(phone, message):

    payload = {
        "session": SESSION_NAME,
        "chatId": f"{phone}@c.us",
        "text": message
    }

    headers = {
        "X-Api-Key": WAHA_API_KEY  # ← add this
    }

    try:
        response = requests.post(WAHA_URL, json=payload, headers=headers)

        if response.status_code == 200 or response.status_code == 201:
            print(f"WhatsApp sent successfully to {phone}")
        else:
            print("Failed to send WhatsApp:", response.text)

    except Exception as e:
        print("WhatsApp error:", e)