from datetime import datetime
from typing import List

from app.db.session import get_db
from app.models.models import Bill
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

router = APIRouter()


# Define what the API returns (Pydantic Schema)
class BillResponse(BaseModel):
    id: int
    file_name: str
    extracted_kwh: float
    upload_date: datetime

    class Config:
        orm_mode = True


@router.get("/bills", response_model=List[BillResponse])
async def fetch_bills(db: Session = Depends(get_db)):
    """
    Fetch the last 5 uploaded bills for the dashboard.
    """
    # In real app, we would filter the current user,
    # For MVP, we just get the latest 5 bills
    bills = db.query(Bill).order_by(Bill.upload_date.desc()).limit(5).all()
    return bills
