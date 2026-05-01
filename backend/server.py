from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path

# Import routes
from routes import rab, bom, chat, gantt, site_reports, blueprints, tenders, fat, maintenance, contractors, bidding, evidence, lpjk, rab_enhanced, marketplace, chatbot_agentic
from database import client

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="RancangBangun API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "RancangBangun API - Construction Management Platform"}

# Include feature routers
api_router.include_router(rab.router)
api_router.include_router(bom.router)
api_router.include_router(chat.router)
api_router.include_router(gantt.router)
api_router.include_router(site_reports.router)
api_router.include_router(blueprints.router)
api_router.include_router(tenders.router)
api_router.include_router(fat.router)
api_router.include_router(maintenance.router)
api_router.include_router(contractors.router)
api_router.include_router(bidding.router)
api_router.include_router(evidence.router)
api_router.include_router(lpjk.router)
api_router.include_router(rab_enhanced.router)
api_router.include_router(marketplace.router)
api_router.include_router(chatbot_agentic.router)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve React static files in production
STATIC_DIR = ROOT_DIR.parent / "frontend" / "build"
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR / "static")), name="static")

    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        index = STATIC_DIR / "index.html"
        return FileResponse(str(index))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()
