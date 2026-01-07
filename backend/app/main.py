from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="GreenLedger API",
    description="Backend for SME Carbon Testing",
    version="0.1.0",
)

# CORS (Cross-Origin Resouce Sharii)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
