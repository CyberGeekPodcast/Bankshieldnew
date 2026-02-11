from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from .database import SessionLocal, engine, Base
from .models import AuditEvent
from .schemas import AuditEventRequest, AuditEventResponse
from .service import anchor_event

app = FastAPI(title="BankShield Audit Vault")

Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def health_check():
    return {"status": "Audit Vault Running"}

@app.post("/audit-event", response_model=AuditEventResponse)
def create_audit_event(request: AuditEventRequest, db: Session = Depends(get_db)):
    db_event = anchor_event(db, request.event)

    return AuditEventResponse(
        event_id=db_event.id,
        hash=db_event.hash_value,
        fabric_tx_id=db_event.fabric_tx_id,
        anchored=True
    )
