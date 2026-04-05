import uvicorn
import threading
from app.camera.camera_stream import start_camera_stream
from api.update_embeddings_api import app
from app.services.faiss_service import build_faiss_index


def start_api_server():
    """
    Start FastAPI server
    """
    uvicorn.run(app, host="0.0.0.0", port=9000)


if __name__ == "__main__":

    print("[SYSTEM] Starting AI Attendance Engine")

    # Step 1: Load embeddings
    print("[SYSTEM] Loading embeddings...")
    build_faiss_index()

    # Step 2: Start API server in background
    print("[SYSTEM] Starting API server...")
    api_thread = threading.Thread(target=start_api_server)
    api_thread.daemon = True
    api_thread.start()

    # Step 3: Start camera stream (reads from config)
    print("[SYSTEM] Starting camera stream...")
    start_camera_stream()  # No source passed - will use config settings