from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from pydantic import BaseModel, Field
from database import db
import uuid

router = APIRouter(prefix="/marketplace", tags=["Marketplace"])

# Models
class ProjectPosting(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    lpjk_classification: List[str]  # ["BG002", "BS001"]
    description: str
    location: str
    budget_range: str  # "< 1M", "1-5M", "5-10M", "> 10M"
    budget_estimate: Optional[float] = 0
    duration_days: int
    requirements: List[str]  # ["K3 Certified", "ISO Certified", "Min 5 years exp"]
    
    posted_by: str  # Company name
    contact_name: str
    contact_phone: str
    contact_email: str
    
    status: str = "open"  # open, in_bidding, awarded, closed
    deadline: str  # ISO date
    
    posted_date: str = Field(default_factory=lambda: datetime.now().date().isoformat())
    view_count: int = 0
    bid_count: int = 0

class ProjectPostingCreate(BaseModel):
    title: str
    lpjk_classification: List[str]
    description: str
    location: str
    budget_range: str
    budget_estimate: Optional[float] = 0
    duration_days: int
    requirements: List[str]
    posted_by: str
    contact_name: str
    contact_phone: str
    contact_email: str
    deadline: str

@router.post("/projects", response_model=ProjectPosting)
async def post_project(project: ProjectPostingCreate):
    """Post new project to marketplace"""
    project_dict = project.model_dump()
    project_obj = ProjectPosting(**project_dict)
    
    doc = project_obj.model_dump()
    await db.marketplace_projects.insert_one(doc)
    
    return project_obj

@router.get("/projects", response_model=List[ProjectPosting])
async def get_all_projects(
    lpjk_code: Optional[str] = None,
    location: Optional[str] = None,
    budget_range: Optional[str] = None,
    status: Optional[str] = "open",
    limit: int = 50
):
    """Get all project postings with filters"""
    query = {}
    
    if status:
        query['status'] = status
    
    if lpjk_code:
        query['lpjk_classification'] = {'$in': [lpjk_code]}
    
    if location:
        query['location'] = {'$regex': location, '$options': 'i'}
    
    if budget_range:
        query['budget_range'] = budget_range
    
    projects = await db.marketplace_projects.find(query, {"_id": 0}).sort("posted_date", -1).to_list(limit)
    
    return projects

@router.get("/projects/{project_id}", response_model=ProjectPosting)
async def get_project_detail(project_id: str):
    """Get project detail and increment view count"""
    project = await db.marketplace_projects.find_one({"id": project_id}, {"_id": 0})
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Increment view count
    await db.marketplace_projects.update_one(
        {"id": project_id},
        {"$inc": {"view_count": 1}}
    )
    project['view_count'] += 1
    
    return project

@router.post("/seed-projects")
async def seed_marketplace_projects():
    """Seed sample project postings"""
    from datetime import date, timedelta
    
    sample_projects = [
        {
            "title": "Pembangunan Gedung Kantor 5 Lantai - Jakarta Pusat",
            "lpjk_classification": ["BG002", "IN001"],
            "description": "Pembangunan gedung perkantoran modern 5 lantai dengan luas total 5.000 m². Termasuk struktur beton, finishing interior premium, dan sistem MEP lengkap.",
            "location": "Jakarta Pusat, DKI Jakarta",
            "budget_range": "> 10M",
            "budget_estimate": 15000000000,
            "duration_days": 365,
            "requirements": ["K3 Certified", "ISO 9001", "Pengalaman min 10 proyek gedung", "Modal kerja min 3M"],
            "posted_by": "PT Properti Prima",
            "contact_name": "Budi Santoso",
            "contact_phone": "021-5551234",
            "contact_email": "tender@propertipri.co.id",
            "status": "open",
            "deadline": (date.today() + timedelta(days=30)).isoformat(),
            "view_count": 245,
            "bid_count": 12
        },
        {
            "title": "Renovasi Total Rumah Sakit 200 Bed - Surabaya",
            "lpjk_classification": ["BG005", "IN001", "IN006"],
            "description": "Renovasi total RS meliputi struktur, arsitektur, MEP, sistem medis gas, dan instalasi elektronik medis. Target selesai 8 bulan.",
            "location": "Surabaya, Jawa Timur",
            "budget_range": "5-10M",
            "budget_estimate": 8500000000,
            "duration_days": 240,
            "requirements": ["Pengalaman RS min 3 proyek", "K3 Rumah Sakit", "ISO 9001", "Sertifikat MEP"],
            "posted_by": "RS Sehat Sejahtera",
            "contact_name": "Dr. Andi Wijaya",
            "contact_phone": "031-7778899",
            "contact_email": "pengadaan@rssehat.id",
            "status": "open",
            "deadline": (date.today() + timedelta(days=21)).isoformat(),
            "view_count": 189,
            "bid_count": 8
        },
        {
            "title": "Pembangunan Jalan Aspal Hotmix 5 KM - Bandung",
            "lpjk_classification": ["BS001", "KK008"],
            "description": "Pembangunan jalan aspal hotmix lebar 7 meter sepanjang 5 km termasuk drainase, marka, dan rambu. Spesifikasi AC-WC thickness 5cm.",
            "location": "Bandung, Jawa Barat",
            "budget_range": "1-5M",
            "budget_estimate": 3500000000,
            "duration_days": 180,
            "requirements": ["Pengalaman jalan min 20 km", "Alat asphalt finisher", "K3 Konstruksi", "LPJK BS001"],
            "posted_by": "Dinas PU Kota Bandung",
            "contact_name": "Ir. Joko Susilo",
            "contact_phone": "022-6667788",
            "contact_email": "tender@pu.bandung.go.id",
            "status": "open",
            "deadline": (date.today() + timedelta(days=45)).isoformat(),
            "view_count": 312,
            "bid_count": 15
        },
        {
            "title": "Pembangunan Sekolah Dasar 12 Ruang Kelas - Yogyakarta",
            "lpjk_classification": ["BG006"],
            "description": "Pembangunan SD negeri baru dengan 12 ruang kelas, aula, perpustakaan, dan fasilitas pendukung. Luas bangunan 2.500 m².",
            "location": "Sleman, Yogyakarta",
            "budget_range": "1-5M",
            "budget_estimate": 4200000000,
            "duration_days": 270,
            "requirements": ["Pengalaman gedung pendidikan", "K3 Certified", "LPJK BG006", "Modal kerja 1M"],
            "posted_by": "Dinas Pendidikan DIY",
            "contact_name": "Drs. Sutrisno, M.Pd",
            "contact_phone": "0274-556677",
            "contact_email": "pengadaan@disdik.jogjaprov.go.id",
            "status": "open",
            "deadline": (date.today() + timedelta(days=14)).isoformat(),
            "view_count": 156,
            "bid_count": 6
        },
        {
            "title": "Pembangunan Komplek Perumahan 50 Unit - Tangerang",
            "lpjk_classification": ["BG001"],
            "description": "Pembangunan 50 unit rumah tipe 45/90 dengan infrastruktur lengkap (jalan, drainase, listrik, air). Ready stock developer.",
            "location": "Tangerang, Banten",
            "budget_range": "5-10M",
            "budget_estimate": 7500000000,
            "duration_days": 365,
            "requirements": ["Pengalaman perumahan min 100 unit", "K3", "ISO 9001", "Track record developer"],
            "posted_by": "PT Griya Sejahtera",
            "contact_name": "Bambang Hermawan",
            "contact_phone": "021-5559988",
            "contact_email": "project@griyasejahtera.com",
            "status": "open",
            "deadline": (date.today() + timedelta(days=60)).isoformat(),
            "view_count": 428,
            "bid_count": 22
        }
    ]
    
    await db.marketplace_projects.delete_many({})
    
    for project_data in sample_projects:
        project_obj = ProjectPosting(**project_data)
        doc = project_obj.model_dump()
        await db.marketplace_projects.insert_one(doc)
    
    return {"message": f"{len(sample_projects)} project postings seeded successfully"}

@router.get("/stats")
async def get_marketplace_stats():
    """Get marketplace statistics"""
    total_projects = await db.marketplace_projects.count_documents({})
    open_projects = await db.marketplace_projects.count_documents({"status": "open"})
    total_contractors = await db.contractors.count_documents({})
    verified_contractors = await db.contractors.count_documents({"is_verified": True})
    
    return {
        "total_projects": total_projects,
        "open_projects": open_projects,
        "total_contractors": total_contractors,
        "verified_contractors": verified_contractors
    }
