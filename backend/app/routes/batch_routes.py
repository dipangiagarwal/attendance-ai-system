# from fastapi import APIRouter, Depends, Request
# from sqlalchemy.orm import Session

# from app.database.db import get_db
# from app.schemas.batch_schema import BatchCreate, BatchResponse

# from app.controllers.batch_controller import (
#     create_batch,
#     get_batches,
#     get_batch_by_id,
#     delete_batch
# )

# # ✅ Import limiter
# from app.main import limiter


# router = APIRouter(prefix="/batches")


# # Create Batch
# @router.post("/", response_model=BatchResponse)
# @limiter.limit("20/minute")   # ✅ Added limiter
# def create_new_batch(
#     request: Request,   # ✅ REQUIRED
#     batch: BatchCreate,
#     db: Session = Depends(get_db)
# ):

#     return create_batch(db, batch)


# # Get All Batches
# @router.get("/", response_model=list[BatchResponse])
# def get_all_batches(db: Session = Depends(get_db)):

#     return get_batches(db)


# # Get Batch by ID
# @router.get("/{batch_id}", response_model=BatchResponse)
# def get_single_batch(batch_id: int, db: Session = Depends(get_db)):

#     return get_batch_by_id(db, batch_id)


# # Delete Batch
# @router.delete("/{batch_id}")
# @limiter.limit("20/minute")   # ✅ Added limiter
# def delete_single_batch(
#     request: Request,   # ✅ REQUIRED
#     batch_id: int,
#     db: Session = Depends(get_db)
# ):

#     return delete_batch(db, batch_id)

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.batch_schema import BatchCreate, BatchResponse

from app.controllers.batch_controller import (
    create_batch,
    get_batches,
    get_batch_by_id,
    delete_batch
)

# ✅ IMPORT FROM UTILS (NOT MAIN)
from app.utils.limiter import limiter


router = APIRouter(prefix="/batches")


# Create Batch
@router.post("/", response_model=BatchResponse)
@limiter.limit("20/minute")
def create_new_batch(
    request: Request,   # required for limiter
    batch: BatchCreate,
    db: Session = Depends(get_db)
):

    return create_batch(db, batch)


# Get All Batches
@router.get("/", response_model=list[BatchResponse])
def get_all_batches(
    db: Session = Depends(get_db)
):

    return get_batches(db)


# Get Batch by ID
@router.get("/{batch_id}", response_model=BatchResponse)
def get_single_batch(
    batch_id: int,
    db: Session = Depends(get_db)
):

    return get_batch_by_id(db, batch_id)


# Delete Batch
@router.delete("/{batch_id}")
@limiter.limit("20/minute")
def delete_single_batch(
    request: Request,   # required
    batch_id: int,
    db: Session = Depends(get_db)
):

    return delete_batch(db, batch_id)