from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import Blueprint, BlueprintCreate
from database import db

router = APIRouter(prefix="/blueprints", tags=["Blueprints"])

@router.post("/", response_model=Blueprint)
async def create_blueprint(blueprint_data: BlueprintCreate):
    """Upload a new blueprint"""
    blueprint_dict = blueprint_data.model_dump()
    blueprint_obj = Blueprint(**blueprint_dict)
    
    doc = blueprint_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.blueprints.insert_one(doc)
    return blueprint_obj

@router.get("/", response_model=List[Blueprint])
async def get_all_blueprints(project_id: Optional[str] = None, category: Optional[str] = None):
    """Get all blueprints with optional filters"""
    query = {}
    if project_id:
        query['project_id'] = project_id
    if category:
        query['category'] = category
    
    blueprints = await db.blueprints.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for bp in blueprints:
        if isinstance(bp.get('created_at'), str):
            bp['created_at'] = datetime.fromisoformat(bp['created_at'])
    
    return blueprints

@router.get("/{blueprint_id}", response_model=Blueprint)
async def get_blueprint(blueprint_id: str):
    """Get specific blueprint by ID"""
    blueprint = await db.blueprints.find_one({"id": blueprint_id}, {"_id": 0})
    
    if not blueprint:
        raise HTTPException(status_code=404, detail="Blueprint not found")
    
    if isinstance(blueprint.get('created_at'), str):
        blueprint['created_at'] = datetime.fromisoformat(blueprint['created_at'])
    
    return blueprint

@router.delete("/{blueprint_id}")
async def delete_blueprint(blueprint_id: str):
    """Delete a blueprint"""
    result = await db.blueprints.delete_one({"id": blueprint_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blueprint not found")
    
    return {"message": "Blueprint deleted successfully"}

@router.post("/seed-data")
async def seed_blueprint_data():
    """Seed sample blueprint data"""
    sample_blueprints = [
        {
            "title": "Denah Lantai 1",
            "category": "architectural",
            "image_url": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
            "version": "1.0",
            "notes": "Layout ruangan lantai dasar",
            "uploaded_by": "Arsitek Tim"
        },
        {
            "title": "Struktur Pondasi",
            "category": "structural",
            "image_url": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
            "version": "2.1",
            "notes": "Detail penulangan pondasi",
            "uploaded_by": "Engineer Sipil"
        },
        {
            "title": "Instalasi Listrik",
            "category": "electrical",
            "image_url": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800",
            "version": "1.5",
            "notes": "Skema kabel dan panel listrik",
            "uploaded_by": "Electrical Team"
        }
    ]
    
    await db.blueprints.delete_many({})
    
    for bp_data in sample_blueprints:
        bp_obj = Blueprint(**bp_data)
        doc = bp_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.blueprints.insert_one(doc)
    
    return {"message": f"{len(sample_blueprints)} blueprints seeded successfully"}
