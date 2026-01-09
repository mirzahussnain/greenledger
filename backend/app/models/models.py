import enum
from datetime import datetime

from app.db.base import Base
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.orm import relationship


# Define Enums for stricter data control
class BillStatus(str, enum.Enum):
    PROCESSING = "PROCESSING"
    CONFIRMED = "CONFIRMED"
    FLAGGED = "FLAGGED"


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)
    company_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    bills = relationship("Bill", back_populates="owner")


class Bill(Base):
    __tablename__ = "bills"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    file_name = Column(String)
    extracted_kwh = Column(Float, nullable=True)  # Nullable because OCR might fail
    carbon_footprint_kg = Column(Float, nullable=True)
    status = Column(SqlEnum(BillStatus), default=BillStatus.PROCESSING)
    upload_date = Column(DateTime, default=datetime.utcnow)

    # Relationships
    owner = relationship("User", back_populates="bills")
