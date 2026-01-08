import os
from multiprocessing import process

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tomllib import load

from app.api.fetch import router as bill_router
from app.api.upload import router as upload_router

app = FastAPI(
    title="GreenLedger API",
    description="Backend for SME Carbon Testing",
    version="0.1.0",
)
load_dotenv()

# CORS (Cross-Origin Resouce Sharii)
env_origins = os.getenv("ALLOWED_ORIGINS")

if env_origins:
    # Render provides: "https://myapp.vercel.app,http://localhost:3000"
    origins = env_origins.split(",")
else:
    # Fallback defaults
    origins = [
        "http://localhost:3000",
        "https://greenledger-puce.vercel.app",
        "https://greenledger.vercel.app",
    ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router, prefix="/api/v1")
app.include_router(bill_router, prefix="/api/v1")


@app.get("/")
def health_check():
    """
    Simple health check to ensure the server is running.
    """
    return {
        "status": "active",
        "project": "GreenLedger",
        "version": "0.1.0",
        "message": "System is ready for Uk Carbon Compliance",
    }


@app.get("/api/v1/test")
def test_endpint():
    return {"message": "API connection successful"}
