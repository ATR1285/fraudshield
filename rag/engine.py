"""
rag.engine - Runs fraud model scoring and returns enriched transaction
Exports run_analysis(payload) which backend calls.
"""

from typing import Dict, Any
from ml.model import score_transaction  # top-level import
from rag.rag_pipeline import create_rag_pipeline

# create a single pipeline instance to reuse (cheap)
_RAG_PIPELINE = create_rag_pipeline()


def _build_query_from_tx(tx: Dict[str, Any]) -> str:
    parts = []
    if "amount" in tx:
        parts.append(f"amount {tx.get('amount')}")
    if "merchant" in tx:
        parts.append(f"merchant {tx.get('merchant')}")
    if "country" in tx:
        parts.append(f"country {tx.get('country')}")
    # include feature keys if present
    features = tx.get("features_json") or tx.get("features") or {}
    if isinstance(features, dict):
        parts.extend(list(features.keys()))
    return " ".join(str(p) for p in parts)


def run_analysis(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Main entrypoint used by backend.main:app.
    Accepts a transaction payload (dict), runs the fraud scorer,
    attaches RAG evidence and returns the enriched transaction dict.
    """
    # Score with ML model
    scored = score_transaction(payload)

    # Merge back (do not override original top-level transaction_id if present)
    enriched = dict(payload)
    enriched.update(scored)

    # Create a RAG query and retrieve evidence
    query = _build_query_from_tx(enriched)
    evidence = _RAG_PIPELINE.retrieve(query, top_k=3)

    enriched["evidence"] = evidence
    return enriched


if __name__ == "__main__":
    # quick smoke test
    sample = {"transaction_id": "TST1", "amount": 1500, "merchant": "Crypto Exchange", "country": "US"}
    print(run_analysis(sample))
