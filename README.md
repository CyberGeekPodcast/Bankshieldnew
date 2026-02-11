# BankShield Audit Vault

Decentralized-ready audit anchoring service built with FastAPI.

## Features
- Accepts audit events
- Hashes events (SHA-256)
- Stores event locally
- Anchors hash to distributed ledger (Fabric-ready)

## Run Locally

uvicorn audit_vault.main:app --reload

## Deployment

Configured for Railway deployment via Procfile.
