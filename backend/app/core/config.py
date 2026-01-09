import os

from dotenv import load_dotenv

# load .env file
load_dotenv()


class Settings:
    PROJECT_NAME: str = "GreenLedger"
    PROJECT_VERSION: str = "1.0.0"

    _db_url = os.getenv("DATABASE_URI")
    _clerk_issuer_url = os.getenv("CLERK_ISSUER_URL")

    if _db_url is None:
        raise ValueError("DATABASE_URI is not set in .env file")
    if _clerk_issuer_url is None:
        raise ValueError("CLERK_ISSUER_URL is not set in .env file")

    # Database
    DATABASE_URI: str = _db_url

    # JWT
    CLERK_ISSUER_URL: str = _clerk_issuer_url


settings = Settings()
