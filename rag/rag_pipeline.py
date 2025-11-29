"""
rag.rag_pipeline - Very small RAG-like pipeline (keyword matching).
Provides create_rag_pipeline() which returns an object with retrieve_evidence(transaction).
"""

from typing import List, Dict, Any
import os
import json


class SimpleRAG:
    """Simple in-memory document store with keyword matching."""

    def __init__(self, dataset_path: str | None = None) -> None:
        self.dataset_path = dataset_path or os.path.join(os.path.dirname(__file__), "dataset")
        self.documents: List[Dict[str, Any]] = []
        self._load_or_mock_documents()

    def _load_or_mock_documents(self) -> None:
        """Try to load docs from dataset; if not found, use built-in mock docs."""
        rules_file = os.path.join(self.dataset_path, "rules.md")
        examples_file = os.path.join(self.dataset_path, "examples.csv")
        if os.path.isdir(self.dataset_path):
            # try to load any text files if present
            if os.path.isfile(rules_file):
                try:
                    with open(rules_file, "r", encoding="utf-8") as fh:
                        content = fh.read()
                    self.documents.append({"doc_type": "rules_md", "full_text": content})
                except Exception:
                    pass
        # If no real docs, add a few mock docs
        if not self.documents:
            self.documents = [
                {
                    "doc_type": "rule",
                    "rule_id": "R001",
                    "full_text": "High amount transactions (>= 1000) should be flagged for review. Red flags: large amount, new merchant."
                },
                {
                    "doc_type": "rule",
                    "rule_id": "R002",
                    "full_text": "Crypto exchanges are high-risk merchants. Red flags: merchant contains 'crypto' or 'exchange'."
                },
                {
                    "doc_type": "pattern",
                    "pattern_name": "velocity_spike",
                    "full_text": "Multiple transactions in short time frame from same account indicate velocity spike."
                },
            ]

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        """Keyword-based retrieval: returns top_k docs containing query tokens."""
        qtokens = set(w.strip().lower() for w in query.split() if w.strip())
        scored: List[Dict[str, Any]] = []
        for doc in self.documents:
            text = doc.get("full_text", "").lower()
            score = sum(1 for t in qtokens if t in text)
            if score > 0:
                scored.append({"score": score, "doc": doc})
        scored.sort(key=lambda x: x["score"], reverse=True)
        results: List[Dict[str, Any]] = []
        for item in scored[:top_k]:
            d = item["doc"].copy()
            d["relevance_score"] = float(item["score"])
            results.append(d)
        return results


def create_rag_pipeline(dataset_path: str | None = None) -> SimpleRAG:
    return SimpleRAG(dataset_path)
