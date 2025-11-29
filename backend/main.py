"""
FraudShield Backend API
Handles:
- Health check
- Transaction processing
- Full ML + RAG analysis (engine.run_analysis)
- Latest transaction storage
"""

import os
import sys
from typing import Dict, Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import uvicorn

# -------------------------------------------------------------------------
# FIX: Add project root to Python path so "rag" and "ml" modules import OK
# -------------------------------------------------------------------------
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(ROOT_DIR)
print("PYTHONPATH added:", ROOT_DIR)

# Import engine module AFTER fixing sys.path
from rag import engine as engine_module  # noqa: E402

app = FastAPI()

# -------------------------------------------------------------------------
# CORS (allow frontend to access backend)
# -------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React, Streamlit, etc.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static folder (optional, for HTML dashboards)
STATIC_PATH = os.path.join(os.path.dirname(__file__), "static")
if os.path.isdir(STATIC_PATH):
    app.mount("/static", StaticFiles(directory=STATIC_PATH), name="static")

# store latest transaction
LATEST_TRANSACTION: Dict[str, Any] | None = None


# -------------------------------------------------------------------------
# HEALTH CHECK
# -------------------------------------------------------------------------
@app.get("/")
def health():
    """Simple health check."""
    return {"status": "Backend running"}


# -------------------------------------------------------------------------
# OLD ENDPOINT (still supported)
# -------------------------------------------------------------------------
@app.post("/process-transaction")
def process_transaction(payload: Dict[str, Any]):
    """Store transaction without ML/RAG."""
    global LATEST_TRANSACTION
    LATEST_TRANSACTION = payload
    return {"status": "stored"}


# -------------------------------------------------------------------------
# FULL ANALYSIS ENDPOINT
# ML + RAG + Rule Engine
# -------------------------------------------------------------------------
@app.post("/analyze")
def analyze(payload: Dict[str, Any]):
    """Perform full transaction analysis."""
    global LATEST_TRANSACTION

    try:
        enriched = engine_module.run_analysis(payload)
    except Exception as exc:
        return JSONResponse(
            {
                "status": "error",
                "reason": "rag.engine missing or failed to import",
                "detail": str(exc),
            },
            status_code=500,
        )

    LATEST_TRANSACTION = enriched
    return {"status": "analyzed", "transaction": enriched}


# -------------------------------------------------------------------------
# LATEST TRANSACTION FOR UI
# -------------------------------------------------------------------------
@app.get("/get-latest")
def get_latest():
    """Return the most recent analyzed transaction."""
    if LATEST_TRANSACTION is None:
        return {"status": "empty"}
    return {"transaction": LATEST_TRANSACTION}


# -------------------------------------------------------------------------
# RUNBACKEND
# -------------------------------------------------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
