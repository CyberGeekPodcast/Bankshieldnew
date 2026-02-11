import hashlib
import json

def generate_hash(event: dict) -> str:
    # Canonical JSON (sorted keys ensures deterministic hash)
    event_string = json.dumps(event, sort_keys=True)
    return hashlib.sha256(event_string.encode()).hexdigest()
