from fastapi import APIRouter, HTTPException
from typing import List
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import BOMMaterial, BOMMaterialCreate
from database import db

router = APIRouter(prefix="/bom", tags=["BOM"])

@router.post("/materials", response_model=BOMMaterial)
async def create_material(material: BOMMaterialCreate):
    """Add new material to BOM"""
    material_dict = material.model_dump()
    material_obj = BOMMaterial(**material_dict)
    
    doc = material_obj.model_dump()
    await db.bom_materials.insert_one(doc)
    return material_obj

@router.get("/materials", response_model=List[BOMMaterial])
async def get_all_materials():
    """Get all BOM materials"""
    materials = await db.bom_materials.find({}, {"_id": 0}).to_list(1000)
    return materials

@router.get("/materials/category/{category}", response_model=List[BOMMaterial])
async def get_materials_by_category(category: str):
    """Get materials by category"""
    materials = await db.bom_materials.find({"category": category}, {"_id": 0}).to_list(1000)
    return materials

@router.post("/seed-data")
async def seed_bom_data():
    """Seed initial BOM data"""
    sample_materials = [
        {
            "name": "Semen Portland",
            "category": "Semen",
            "price": 65000,
            "unit": "sak",
            "supplier": "PT Semen Indonesia",
            "stock": 500,
            "description": "Semen tipe I untuk konstruksi umum"
        },
        {
            "name": "Pasir Beton",
            "category": "Agregat",
            "price": 350000,
            "unit": "m3",
            "supplier": "CV Bangunan Jaya",
            "stock": 100,
            "description": "Pasir beton kualitas premium"
        },
        {
            "name": "Besi Beton 10mm",
            "category": "Besi",
            "price": 15000,
            "unit": "batang",
            "supplier": "UD Logam Kuat",
            "stock": 1000,
            "description": "Besi beton polos diameter 10mm panjang 12m"
        },
        {
            "name": "Batu Split 1/2",
            "category": "Agregat",
            "price": 400000,
            "unit": "m3",
            "supplier": "CV Bangunan Jaya",
            "stock": 80,
            "description": "Batu pecah ukuran 1/2 untuk beton"
        },
        {
            "name": "Cat Tembok Exterior",
            "category": "Cat",
            "price": 285000,
            "unit": "pail",
            "supplier": "Toko Bangunan Sejahtera",
            "stock": 50,
            "description": "Cat tembok luar tahan cuaca 20kg"
        }
    ]
    
    # Clear existing
    await db.bom_materials.delete_many({})
    
    # Insert sample data
    for mat in sample_materials:
        material_obj = BOMMaterial(**mat)
        doc = material_obj.model_dump()
        await db.bom_materials.insert_one(doc)
    
    return {"message": f"{len(sample_materials)} materials seeded successfully"}
