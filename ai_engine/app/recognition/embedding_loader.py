from app.services.backend_api import fetch_embeddings_from_backend
from app.utils.logger import get_logger
import numpy as np

logger = get_logger(__name__)

def load_embeddings():
    """
    Load embeddings from backend API
    """

    try:
        student_ids, embeddings = fetch_embeddings_from_backend()

        embeddings = np.array(embeddings).astype("float32")

        logger.info(f"Loaded {len(student_ids)} embeddings from backend")

        return student_ids, embeddings

    except Exception as e:
        logger.error(f"Error loading embeddings: {e}")
        return [], []