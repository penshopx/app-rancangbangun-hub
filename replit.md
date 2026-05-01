# RancangBangun - Integrated Construction Marketplace & Management Platform

## Overview
A comprehensive construction marketplace platform connecting Owners, Contractors, Workers, Material Suppliers, and Consultants. Includes 20+ mini-apps covering the full construction lifecycle — marketplace matching, project management, planning, procurement, execution, quality control, and analytics.

## Routes
- `/` — Public landing page (marketing + waitlist)
- `/app` — Dashboard with all 20+ mini-apps

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn UI, running on port 5000 via CRACO
- **Backend**: FastAPI (Python) + MongoDB, running on port 8000 via uvicorn
- **Database**: MongoDB (Motor async driver) — optional, app runs with NullDB without it

## Project Structure
```
frontend/         React app (CRACO + Tailwind)
  src/
    pages/                 LandingPage.js, Dashboard.js
    components/apps/       Mini-app components:
      Marketplace.js         Owner ↔ Contractor matching (Phase 2)
      ProjectManager.js      Milestones, termin, progress (Phase 3)
      RABEnhanced.js         RAB Calculator
      SmartBOM.js            Bill of Materials
      GanttChart.js          Gantt scheduling
      SiteControl.js         Field reporting
      Blueprints.js          Document viewer
      ContractorRegistryEnhanced.js  Contractor directory
      FATChecklist.js        FAT testing
      Maintenance.js         Maintenance tracker
      PlaceholderApp.js      Placeholder for future apps
    components/ui/         Shadcn UI components
    components/Sidebar.js  Navigation (links back to landing page)
    components/ChatbotAgentic.js  AI assistant
  craco.config.js          Dev server (port 5000, proxy /api → 8000)
  .env                     REACT_APP_BACKEND_URL (empty = use proxy)

backend/          FastAPI app
  server.py        Entry point, routes registration
  database.py      MongoDB connection (graceful NullDB if MONGO_URL missing)
  routes/
    marketplace.py   Project listings + bids API
    waitlist.py      Waitlist signup API
    contractors.py   Contractor registry API
    rab.py, bom.py, gantt.py, site_reports.py, blueprints.py
    tenders.py, fat.py, maintenance.py, bidding.py, evidence.py
    lpjk.py, rab_enhanced.py, chatbot_agentic.py
```

## Workflows
- **Start application** — Frontend dev server (`cd frontend && yarn start`) on port 5000
- **Backend** — FastAPI server (`cd backend && uvicorn server:app --host localhost --port 8000 --reload`) on port 8000

## Environment Variables
- `MONGO_URL` (secret) — MongoDB connection string. App works without it using NullDB.
- `DB_NAME` — Database name (default: `rancangbangun`)
- `PORT` — Frontend port (set to 5000)
- `CORS_ORIGINS` — Allowed CORS origins (default: `*`)

## Phase Plan
1. **Phase 1 (Done)**: Landing page + waitlist — `/` route with hero, features, testimonials, waitlist form
2. **Phase 2 (Done)**: Marketplace Owner ↔ Kontraktor — project listings, search/filter, bid submission
3. **Phase 3 (Done)**: Manajemen Proyek — milestones, termin payments, progress tracking, daily reports
4. **Phase 4 (Planned)**: Enhanced Contractor Profiles — SBU/LPJK verification, portfolio, ratings

## Key Features
- **Marketplace**: Post projects, filter by category/location, submit competitive bids
- **Project Manager**: Milestone tracking, termin payment disbursement, daily field reports
- **RAB Calculator**: Professional cost estimation with material/labor database
- **Contractor Registry**: Verified contractors with LPJK/SBU certification display
- **AI Chatbot**: Agentic construction assistant
- **20+ Mini-apps**: Full construction lifecycle coverage

## Setup Notes
- Frontend proxies `/api/*` calls to backend at `http://localhost:8000`
- MongoDB is optional; connect MongoDB Atlas at `MONGO_URL` for persistence
- Production: `build.sh` builds React, `start.sh` serves both from FastAPI (port 5000)
