import json
from .hashing import generate_hash
from .fabric_adapter import submit_hash
from .models import AuditEvent

def anchor_event(db_session, event_data: dict):
    # Generate hash
    hash_value = generate_hash(event_data)

    # Send hash to Fabric
    tx_id = submit_hash(hash_value)

    # Store in DB
    db_event = AuditEvent(
        event_data=json.dumps(event_data),
        hash_value=hash_value,
        fabric_tx_id=tx_id
    )

    db_session.add(db_event)
    db_session.commit()
    db_session.refresh(db_event)

    return db_event
