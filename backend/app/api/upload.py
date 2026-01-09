from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.models import Bill, User
from app.services.ocr_service import extract_kwh_from_image
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/upload")
async def upload_bill(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user),
):
    """
    Receives a bill image, extracts kWh, and saves the record.
    """
    # 1. Validation: Reject non-images
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=400, detail="Only .jpg or .png files are allowed"
        )

    # 2. Check if User exists in OUR DB, if not, create them on the fly
    # This acts as a "Sync" between Clerk and Postgres
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        # We don't have the email in the simplified token sometimes,
        # so we use a placeholder or extract it if available.
        # For MVP, ID is sufficient.
        new_user = User(id=user_id, email=f"{user_id}@clerk.user")
        db.add(new_user)
        db.commit()
        # db.refresh(user)
    # 3. Read the file into memory
    file_content = await file.read()

    # 4. Call the Service (Business Logic)
    detected_kwh = extract_kwh_from_image(file_content)

    # 5. Handle "AI" Failue Gracefully
    # If OCR fails, we default to 0.0 and let the user edit it later.
    final_kwh = detected_kwh if detected_kwh else 0.0

    # 6. Save to Database
    new_bill = Bill(
        file_name=file.filename,
        extracted_kwh=final_kwh,
        user_id=user_id,  # Will be updated later after authentication
    )

    try:
        db.add(new_bill)
        db.commit()
        db.refresh(new_bill)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "status": "success",
        "filename": file.filename,
        "detected_kwh": final_kwh,
        "id": new_bill.id,
    }
