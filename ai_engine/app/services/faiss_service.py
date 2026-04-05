import faiss
import numpy as np
from app.recognition.embedding_loader import load_embeddings
from app.utils.logger import get_logger

logger = get_logger(__name__)

faiss_index = None
student_ids = []



def normalize_embeddings(embeddings):
    """
    Normalize embeddings for cosine similarity
    """
    embeddings = np.array(embeddings).astype("float32")
    norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
    return embeddings / norms


def build_faiss_index():
    """
    Build FAISS index using cosine similarity
    """

    global faiss_index
    global student_ids

    student_ids, embeddings = load_embeddings()

    if len(embeddings) == 0:
        logger.warning("No embeddings found")
        return

    embeddings = normalize_embeddings(embeddings)

    dimension = embeddings.shape[1]

    # Using Inner Product for cosine similarity
    faiss_index = faiss.IndexFlatIP(dimension)

    faiss_index.add(embeddings)

    logger.info(f"FAISS index built with {len(student_ids)} embeddings")



def is_index_initialized():
    """
    Check if FAISS index is built and ready
    """
    return faiss_index is not None and len(student_ids) > 0



def search_face(query_embedding, threshold=0.5):
    """
    Search face in FAISS index
    """

    global faiss_index
    global student_ids

    if faiss_index is None:
        logger.warning("FAISS index not initialized")
        return None, None

    query_embedding = np.array([query_embedding]).astype("float32")

    # normalize query embedding
    query_embedding = query_embedding / np.linalg.norm(query_embedding)

    distances, indices = faiss_index.search(query_embedding, 1)

    best_score = distances[0][0]
    best_index = indices[0][0]

    if best_score > threshold:

        student_id = student_ids[best_index]

        return student_id, best_score

    return None, None


def reload_embeddings():
    """
    Reload embeddings when new student added
    """

    logger.info("Reloading embeddings...")

    build_faiss_index()