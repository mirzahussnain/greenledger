import os

from dotenv import load_dotenv

# load .env file
load_dotenv()


class Settings:
    PROJECT_NAME: str = "GreenLedger"
    PROJECT_VERSION: str = "1.0.0"

    _db_url = os.getenv("DATABASE_URI")
    _secret_key = os.getenv("SECRET_KEY")
    _algorithm = os.getenv("ALGORITHM")

    if _db_url is None:
        raise ValueError("DATABASE_URI is not set in .env file")
    if _secret_key is None:
        raise ValueError("SECRET_KEY is not set in .env file")
    if _algorithm is None:
        raise ValueError("ALGORITHM is not set in .env file")

    # Database
    DATABASE_URI: str = _db_url

    # JWT
    SECRET_KEY: str = _secret_key
    ALGORITHM: str = _algorithm


settings = Settings()
