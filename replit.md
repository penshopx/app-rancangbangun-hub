# RancangBangun - Integrated Construction Management Platform

## Overview
A comprehensive construction management platform with 20+ mini-apps covering the entire construction lifecycle — from planning and procurement to execution and quality control.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn UI, running on port 5000 via CRACO (Create React App Configuration Override)
- **Backend**: FastAPI (Python) + MongoDB, running on port 8000 via uvicorn
- **Database**: MongoDB (Motor async driver) — optional, app runs without it

## Project Structure
```
frontend/         React app (CRACO + Tailwind)
  src/
    components/apps/   Mini-app components (RAB, BOM, Gantt, etc.)
    components/ui/     Shadcn UI components
    pages/             Dashboard orchestrator
  craco.config.js      Dev server config (port 5000, proxy /api → 8000)
  .env                 REACT_APP_BACKEND_URL (empty = use proxy)

backend/          FastAPI app
  server.py        Entry point, routes registration
  database.py      MongoDB connection (graceful if MONGO_URL missing)
  routes/          Feature routers (rab, bom, gantt, bidding, etc.)
  models.py        Pydantic schemas
```

## Workflows
- **Start application** — Frontend dev server (`cd frontend && yarn start`) on port 5000
- **Backend** — FastAPI server (`cd backend && uvicorn server:app --host localhost --port 8000 --reload`) on port 8000

## Environment Variables
- `MONGO_URL` (secret) — MongoDB connection string. App starts without it but DB features disabled.
- `DB_NAME` — Database name (default: `rancangbangun`)
- `PORT` — Frontend port (set to 5000)
- `CORS_ORIGINS` — Allowed CORS origins (default: `*`)

## Features / Mini-Apps
1. **Procurement**: RAB Calculator, Search, Bidding
2. **Planning**: Blueprints, Smart BOM, Gantt Chart, Budget Tracker
3. **Execution**: Site Control, Team, Equipment, Safety
4. **Quality & Compliance**: FAT Checklist, Quality, Maintenance
5. **Finance**: Invoice, Documents
6. **Intelligence**: Contractor Registry, Portal, Analytics, Chatbot

## Setup Notes
- Frontend proxies `/api/*` calls to backend at `http://localhost:8000`
- The `emergentintegrations` package is not on PyPI — it's excluded from requirements
- MongoDB URL is optional for development; connect MongoDB Atlas for full functionality
