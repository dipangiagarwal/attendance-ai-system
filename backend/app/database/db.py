import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base


# Force load from exact path
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


# ✅ CHANGE 1 — Added connect_args for Neon SSL requirement
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,  # max connections
    max_overflow=20, #extra connections if needed
    connect_args={"sslmode": "require"}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ CHANGE 2 — Test connection on startup
def test_connection():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
            print("✅ Connected to Neon PostgreSQL successfully!")
    except Exception as e:
        print(f"❌ Connection failed: {e}")

test_connection()