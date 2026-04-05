from pydantic import BaseModel


class StudentBatchCreate(BaseModel):
    student_id: int
    batch_id: int


class StudentBatchResponse(BaseModel):
    id: int
    student_id: int
    batch_id: int

    class Config:
        from_attributes = True