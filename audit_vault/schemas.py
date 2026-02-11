from pydantic import BaseModel
from typing import Dict, Any

class AuditEventRequest(BaseModel):
    event: Dict[str, Any]

class AuditEventResponse(BaseModel):
    event_id: int
    hash: str
    fabric_tx_id: str
    anchored: bool
