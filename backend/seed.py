from app.db.session import SessionLocal
from app.models.models import User

def create_initial_user():
    db = SessionLocal()
    try:
        # Check if user exists
        existing_user = db.query(User).filter(User.id == 1).first()
        if existing_user:
            print("User #1 already exists.")
            return

        # Create new user
        user = User(
            id=1,
            email="test@greenledger.com",
            hashed_password="dummy_hashed_password", # We aren't logging in yet
            company_name="Test Company Ltd"
        )
        db.add(user)
        db.commit()
        print("✅ Success: Created User #1")

    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_initial_user()
