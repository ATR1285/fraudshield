import random
import uuid


def make_transaction() -> dict:
    """Generate a random transaction with transaction_id."""

    return {
        "transaction_id": uuid.uuid4().hex[:8],
        "amount": round(random.uniform(10, 3000), 2),
        "merchant": random.choice(["Amazon", "Flipkart", "Myntra", "Crypto Exchange"]),
        "country": random.choice(["IN", "US", "UK", "SG"]),
        "features_json": {
            "velocity_spike": random.choice([True, False]),
            "new_device": random.choice([True, False]),
        }
    }
