from datetime import datetime
from typing import List

from app.api.deps import get_current_user
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
async def fetch_bills(
    db: Session = Depends(get_db), user_id: str = Depends(get_current_user)
):
    """
    Fetch the last 5 uploaded bills for the dashboard.
    """
    # FILTER BY USER ID (Privacy Enforced!)
    # Only return bills belonging to this specific Clerk User ID
    bills = (
        db.query(Bill)
        .filter(Bill.user_id == user_id)
        .order_by(Bill.upload_date.desc())
        .limit(20)
        .all()
    )
    return bills
