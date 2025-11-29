"""
ml.stream_pipeline - Simple generator that posts transactions to backend /analyze.

Run as:
python -m ml.stream_pipeline
"""

import time
import random
import requests
from typing import Dict, Any

BACKEND_BASE = "http://127.0.0.1:8000"
ANALYZE_ENDPOINT = f"{BACKEND_BASE}/analyze"

MERCHANTS = [
    "Crypto Exchange", "Amazon", "Starbucks", "Uber", "Local Grocery", "Netflix", "Apple Store"
]
COUNTRIES = ["US", "IN", "GB", "CA", "NG", "BR", "DE"]

def make_transaction(i: int) -> Dict[str, Any]:
    txn = {
        "transaction_id": f"TXN{i:05d}",
        "amount": round(random.choice([5, 20, 50, 120, 500, 1500, 2500]) * random.uniform(0.9, 1.1), 2),
        "merchant": random.choice(MERCHANTS),
        "country": random.choice(COUNTRIES),
        "timestamp": int(time.time()),
    }
    return txn

def send_tx(tx: Dict[str, Any]) -> None:
    try:
        resp = requests.post(ANALYZE_ENDPOINT, json=tx, timeout=3)
        if resp.status_code == 200:
            print(f"Sent {tx['transaction_id']} -> analyzed (risk {resp.json().get('transaction',{}).get('risk_score')})")
        else:
            print(f"Sent {tx['transaction_id']} -> server responded {resp.status_code}: {resp.text}")
    except Exception as exc:
        print(f"Failed to send: {exc}")

def run_loop(total: int = 1000, interval: float = 2.0) -> None:
    i = 1
    try:
        while i <= total:
            tx = make_transaction(i)
            send_tx(tx)
            i += 1
            time.sleep(interval)
    except KeyboardInterrupt:
        print("Stream pipeline stopped by user.")

if __name__ == "__main__":
    # Run quick demo: 100 transactions every 2s (adjust interval as needed)
    run_loop(total=1000, interval=2.0)
