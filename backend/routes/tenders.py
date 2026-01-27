from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import Tender, TenderCreate
from database import db

router = APIRouter(prefix="/tenders", tags=["Tenders"])

@router.post("/", response_model=Tender)
async def create_tender(tender_data: TenderCreate):
    """Create a new tender"""
    tender_dict = tender_data.model_dump()
    tender_obj = Tender(**tender_dict)
    
    doc = tender_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.tenders.insert_one(doc)
    return tender_obj

@router.get("/", response_model=List[Tender])
async def search_tenders(
    search: Optional[str] = Query(None, description="Search in title or description"),
    category: Optional[str] = None,
    status: Optional[str] = None,
    min_budget: Optional[float] = None,
    max_budget: Optional[float] = None
):
    """Search and filter tenders"""
    query = {}
    
    if search:
        query['$or'] = [
            {'title': {'$regex': search, '$options': 'i'}},
            {'description': {'$regex': search, '$options': 'i'}}
        ]
    
    if category:
        query['category'] = category
    
    if status:
        query['status'] = status
    
    if min_budget is not None or max_budget is not None:
        query['budget'] = {}
        if min_budget is not None:
            query['budget']['$gte'] = min_budget
        if max_budget is not None:
            query['budget']['$lte'] = max_budget
    
    tenders = await db.tenders.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for tender in tenders:
        if isinstance(tender.get('created_at'), str):
            tender['created_at'] = datetime.fromisoformat(tender['created_at'])
    
    return tenders

@router.get("/{tender_id}", response_model=Tender)
async def get_tender(tender_id: str):
    """Get specific tender"""
    tender = await db.tenders.find_one({"id": tender_id}, {"_id": 0})
    
    if not tender:
        raise HTTPException(status_code=404, detail="Tender not found")
    
    if isinstance(tender.get('created_at'), str):
        tender['created_at'] = datetime.fromisoformat(tender['created_at'])
    
    return tender

@router.post("/seed-data")
async def seed_tender_data():
    """Seed sample tender data"""
    from datetime import date, timedelta
    
    sample_tenders = [
        {
            "title": "Pembangunan Jalan Tol Ruas Jakarta-Bandung",
            "category": "Infrastruktur",
            "budget": 150000000000,
            "location": "Jakarta - Bandung",
            "deadline": (date.today() + timedelta(days=30)).isoformat(),
            "status": "open",
            "description": "Proyek pembangunan jalan tol sepanjang 142 km menghubungkan Jakarta dan Bandung",
            "owner": "Kementerian PUPR"
        },
        {
            "title": "Renovasi Gedung Perkantoran 5 Lantai",
            "category": "Bangunan",
            "budget": 5000000000,
            "location": "Surabaya",
            "deadline": (date.today() + timedelta(days=45)).isoformat(),
            "status": "open",
            "description": "Renovasi total gedung perkantoran termasuk struktur, MEP, dan interior",
            "owner": "PT Properti Jaya"
        },
        {
            "title": "Pembangunan Jembatan Gantung",
            "category": "Infrastruktur",
            "budget": 25000000000,
            "location": "Kalimantan Timur",
            "deadline": (date.today() + timedelta(days=60)).isoformat(),
            "status": "open",
            "description": "Pembangunan jembatan gantung panjang 500m untuk konektivitas antar desa",
            "owner": "Pemda Kaltim"
        },
        {
            "title": "Pengadaan Material Konstruksi Bulk",
            "category": "Pengadaan",
            "budget": 8000000000,
            "location": "Nationwide",
            "deadline": (date.today() + timedelta(days=20)).isoformat(),
            "status": "open",
            "description": "Pengadaan semen, besi, dan agregat untuk proyek pemerintah",
            "owner": "Lembaga Kebijakan Pengadaan"
        }
    ]
    
    await db.tenders.delete_many({})
    
    for tender_data in sample_tenders:
        tender_obj = Tender(**tender_data)
        doc = tender_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.tenders.insert_one(doc)
    
    return {"message": f"{len(sample_tenders)} tenders seeded successfully"}
