from app.core.config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

_db_url = settings.DATABASE_URI

if _db_url is None:
    raise ValueError("Session Setup Error:DATABASE_URI is not set in .env file")
# Create the Enginer
# pool_pre_ping=True check if the DB is alive before sending a query
engine = create_engine(settings.DATABASE_URI, pool_pre_ping=True)

# Create the Session Local class
# Each request will create a new instance of this session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency Injection for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
