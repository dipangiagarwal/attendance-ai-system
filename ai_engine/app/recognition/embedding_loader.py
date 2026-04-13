from app.services.backend_api import fetch_embeddings_from_backend
from app.utils.logger import get_logger
import numpy as np
import time
import threading

logger = get_logger(__name__)

# ✅ Global variables — bahar rakhne hain taaki reload ho sake
_student_ids = []
_embeddings = []


def load_embeddings():
    """
    Backend se connect hone tak try karta rahega — rukega nahi
    """
    global _student_ids, _embeddings

    attempt = 0

    while True:
        attempt += 1
        try:
            logger.info(f"Backend se embeddings maang raha hoon... (attempt {attempt})")

            student_ids, embeddings = fetch_embeddings_from_backend()

            if not student_ids or len(embeddings) == 0:
                logger.warning("Backend connected lekin koi embedding nahi aayi, 5 sec baad retry...")
                time.sleep(5)
                continue

            embeddings_np = np.array(embeddings).astype("float32")

            _student_ids = student_ids
            _embeddings = embeddings_np

            logger.info(f"✅ {len(student_ids)} embeddings load ho gayi!")
            return student_ids, embeddings_np

        except Exception as e:
            logger.error(f"❌ Backend se connect nahi hua: {e}")
            logger.info("⏳ 5 sec baad dobara try karega...")
            time.sleep(5)


def start_background_sync():
    """
    Har 1 minute mein backend se embeddings reload karta rahega
    Naye students add hone par automatically update hoga
    """
    def sync_loop():
        while True:
            time.sleep(60)
            try:
                logger.info("🔄 Background sync — embeddings reload ho rahi hain...")

                student_ids, embeddings = fetch_embeddings_from_backend()

                if not student_ids or len(embeddings) == 0:
                    logger.warning("Background sync — koi embedding nahi aayi")
                    continue

                embeddings_np = np.array(embeddings).astype("float32")

                # ✅ Globals update karo
                global _student_ids, _embeddings
                _student_ids = student_ids
                _embeddings = embeddings_np

                # ✅ FAISS index bhi update karo naye data se
                from app.services.faiss_service import build_faiss_index
                build_faiss_index()

                logger.info(f"✅ Background sync complete — {len(student_ids)} embeddings")

            except Exception as e:
                logger.error(f"❌ Background sync failed: {e}")

    # ✅ Daemon thread — main program band hone par ye bhi band ho jaayega
    thread = threading.Thread(target=sync_loop, daemon=True)
    thread.start()
    logger.info("🔄 Background sync thread start ho gayi — har 1 min mein reload hoga")
