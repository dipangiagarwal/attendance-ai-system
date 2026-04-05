from dotenv import load_dotenv
import os

load_dotenv()

WAHA_URL = os.getenv("WAHA_URL")
WAHA_API_KEY = os.getenv("WAHA_API_KEY")
SESSION_NAME = os.getenv("WAHA_SESSION", "default")

print("WAHA_URL:", WAHA_URL)
print("WAHA_API_KEY:", WAHA_API_KEY)
print("SESSION_NAME:", SESSION_NAME)