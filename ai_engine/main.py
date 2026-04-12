import uvicorn
import threading
from app.camera.camera_stream import start_camera_stream
from api.update_embeddings_api import app
from app.services.faiss_service import build_faiss_index
from app.recognition.embedding_loader import load_embeddings, start_background_sync


def start_api_server():
    """
    Start FastAPI server
    """
    uvicorn.run(app, host="0.0.0.0", port=9000)


if __name__ == "__main__":

    print("[SYSTEM] Starting AI Attendance Engine")

    # Step 1: Load embeddings — backend connect hone tak retry karta rahega
    print("[SYSTEM] Loading embeddings...")
    build_faiss_index()

    # Step 2: Har 1 min mein auto reload — background mein chalega
    start_background_sync()

    # Step 3: Start API server in background
    print("[SYSTEM] Starting API server...")
    api_thread = threading.Thread(target=start_api_server)
    api_thread.daemon = True
    api_thread.start()

    # Step 4: Start camera stream (reads from config)
    print("[SYSTEM] Starting camera stream...")
    start_camera_stream()