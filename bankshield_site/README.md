# BankShield (Website + Auth + Cases)

A Vite + React frontend with Convex backend/database, Convex Auth (password + optional anonymous), and a Cases module.

## What’s included
- Convex Auth (Password; optional Anonymous)
- Resend OTP integration (verify + reset flows)
- Role-based access (`user / reviewer / admin`)
- Cases + Case Notes (queue, detail view, notes, assignment, status)
- Vercel + Netlify SPA configs
- Dockerfile for container deployment
- GitHub Actions CI (typecheck + lint + build)

## Local setup (Windows)
1) Install Node.js (LTS)  
2) Install dependencies:
```bash
npm install
```

3) Create your local env file:
```bash
copy .env.example .env.local
```

Edit `.env.local` and set:
- `VITE_CONVEX_URL` (from your Convex dashboard)
- `VITE_ALLOW_ANONYMOUS_LOGIN=false` (recommended)

4) Run:
```bash
npm run dev
```

## Production deployment (Vercel + Convex)

### A) Deploy Convex backend
From the repo root:
```bash
npx convex deploy
```

Set Convex env vars (Convex dashboard or CLI):
```bash
npx convex env set AUTH_RESEND_KEY your_resend_api_key
npx convex env set AUTH_EMAIL_FROM "BankShield <onboarding@resend.dev>"   # optional
npx convex env set BANKSHIELD_ADMIN_EMAILS "you@domain.com,other@domain.com"  # optional
npx convex env set ALLOW_ANONYMOUS_LOGIN false
```

### B) Deploy frontend on Vercel
- Import this repo into Vercel
- Set Vercel env vars:
  - `VITE_CONVEX_URL`
  - `VITE_ALLOW_ANONYMOUS_LOGIN=false`

Build command: `npm run build`  
Output directory: `dist`

## GitHub upload (no CLI)
Recommended: GitHub Desktop
1) Clone your repo with GitHub Desktop
2) Copy the contents of this project into the cloned folder (don’t delete `.git`)
3) Commit + Push

## Security
- `.env.local` is intentionally NOT included.
- Never commit secrets (Convex deploy keys, Resend API keys, etc).
