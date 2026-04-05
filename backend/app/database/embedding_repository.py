import numpy as np
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.models.embedding_model import StudentEmbedding
from app.services.embedding_service import notify_ai_engine_reload


def save_embedding(student_id: int, image_url: str, embedding):
    db: Session = SessionLocal()
    try:
        embedding_list = embedding.tolist() if hasattr(embedding, 'tolist') else embedding

        # ← Check if embedding already exists
        existing = db.query(StudentEmbedding).filter(
            StudentEmbedding.student_id == student_id
        ).first()

        if existing:
            # Update existing embedding
            existing.embedding = embedding_list
            existing.image_url = image_url
            db.commit()
            print(f"[INFO] Embedding updated for student {student_id}")
        else:
            # Create new embedding
            new_embedding = StudentEmbedding(
                student_id=student_id,
                image_url=image_url,
                embedding=embedding_list
            )
            db.add(new_embedding)
            db.commit()
            db.refresh(new_embedding)
            print(f"[INFO] Embedding created for student {student_id}")

        notify_ai_engine_reload()

    finally:
        db.close()


def load_all_embeddings():
    db: Session = SessionLocal()
    try:
        rows = db.query(StudentEmbedding).all()

        known_face_ids = []
        known_face_encodings = []

        for row in rows:
            known_face_ids.append(row.student_id)
            encoding = np.array(row.embedding, dtype=np.float32)
            known_face_encodings.append(encoding)

        return known_face_ids, known_face_encodings

    finally:
        db.close()