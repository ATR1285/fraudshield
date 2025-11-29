"""
ml.model - Lightweight fraud scoring logic used by the stream pipeline and RAG engine.

Exports:
- FraudModel: class with .score(transaction) -> dict
- score_transaction: convenience function that returns a simple enriched transaction dict
"""

from typing import Dict, Any
import random
import time


class FraudModel:
    """Minimal rule-based fraud model (mock)."""

    def __init__(self) -> None:
        # Example thresholds
        self.high_amount_threshold = 1000.0
        self.velocity_threshold = 5  # e.g., transactions in short span (mocked)
        # seed random for reproducible behavior in demo
        random.seed(42)

    def score(self, transaction: Dict[str, Any]) -> Dict[str, Any]:
        """
        Score a transaction and return enriched fields:
        { risk_score, explanation, features_json }
        """
        amount = float(transaction.get("amount", 0) or 0)
        country = (transaction.get("country") or "").upper()
        merchant = (transaction.get("merchant") or "").lower()

        # Simple rule-based scoring
        score = 10.0  # base
        reasons = []

        # High amount
        if amount >= self.high_amount_threshold:
            score += 60
            reasons.append("Amount above high-amount threshold")

        # Merchant-based heuristics
        if "crypto" in merchant or "exchange" in merchant:
            score += 15
            reasons.append("Merchant in high-risk category (crypto)")

        # Country mismatch (very small heuristic)
        if country and country not in ("US", "IN", "GB", "CA"):
            score += 10
            reasons.append("Cross-border / unusual country")

        # Random noise to avoid identical values in demo
        score += random.uniform(-5, 5)

        # Cap and normalize to 0-100
        score = max(0.0, min(100.0, round(score, 2)))

        # Build features_json (small set)
        features = {
            "high_amount": amount >= self.high_amount_threshold,
            "likely_crypto_merchant": "crypto" in merchant or "exchange" in merchant,
            "cross_border": country and country not in ("US", "IN", "GB", "CA"),
        }

        explanation = "; ".join(reasons) if reasons else "No immediate simple rule triggered"

        enriched = {
            "risk_score": score,
            "explanation": explanation,
            "features_json": features,
            "scored_at": int(time.time()),
        }
        return enriched


def score_transaction(transaction: Dict[str, Any]) -> Dict[str, Any]:
    """Convenience wrapper used by stream pipeline / engine."""
    model = FraudModel()
    return model.score(transaction)


if __name__ == "__main__":
    # quick local test
    sample = {"transaction_id": "T1", "amount": 1500, "merchant": "Crypto Exchange", "country": "US"}
    print(score_transaction(sample))