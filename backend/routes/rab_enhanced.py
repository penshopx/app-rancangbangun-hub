from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import RABCalculation, RABCalculationCreate, Project, ProjectCreate
from database import db
from rab_database import HARGA_SATUAN_DATABASE, RAB_TEMPLATES

router = APIRouter(prefix="/rab-enhanced", tags=["RAB Enhanced"])

@router.get("/harga-satuan")
async def get_all_harga_satuan():
    """Get all harga satuan database (100 items)"""
    return {
        "total_items": len(HARGA_SATUAN_DATABASE),
        "data": HARGA_SATUAN_DATABASE
    }

@router.get("/harga-satuan/{kode}")
async def get_harga_satuan_by_kode(kode: str):
    """Get specific harga satuan by kode"""
    if kode in HARGA_SATUAN_DATABASE:
        return HARGA_SATUAN_DATABASE[kode]
    raise HTTPException(status_code=404, detail="Kode not found")

@router.get("/harga-satuan/kategori/{kategori}")
async def get_harga_satuan_by_kategori(kategori: str):
    """Get harga satuan by kategori"""
    items = {k: v for k, v in HARGA_SATUAN_DATABASE.items() if v["kategori"] == kategori}
    return {
        "kategori": kategori,
        "total_items": len(items),
        "data": items
    }

@router.get("/templates")
async def get_rab_templates():
    """Get all RAB templates"""
    return {
        "templates": RAB_TEMPLATES,
        "available_lpjk": list(RAB_TEMPLATES.keys())
    }

@router.get("/templates/{lpjk_code}")
async def get_rab_template_by_lpjk(lpjk_code: str):
    """Get RAB template by LPJK code"""
    if lpjk_code not in RAB_TEMPLATES:
        raise HTTPException(status_code=404, detail="LPJK template not found")
    
    template = RAB_TEMPLATES[lpjk_code]
    
    # Expand template dengan harga satuan
    expanded_items = []
    for kategori_group in template["items"]:
        for kode in kategori_group["kode"]:
            if kode in HARGA_SATUAN_DATABASE:
                item = HARGA_SATUAN_DATABASE[kode].copy()
                item["volume"] = 0  # User akan isi
                item["jumlah"] = 0  # Auto calculate
                expanded_items.append(item)
    
    return {
        "lpjk_code": lpjk_code,
        "nama": template["nama"],
        "items": expanded_items,
        "total_items": len(expanded_items)
    }

@router.post("/calculate")
async def calculate_rab_from_template(data: Dict[str, Any]):
    """
    Calculate RAB from template with user volumes
    Input: {
        "lpjk_code": "BG002",
        "project_name": "Gedung Kantor XYZ",
        "items": [
            {"kode": "A.001", "volume": 500},
            {"kode": "B.001", "volume": 150},
            ...
        ]
    }
    """
    lpjk_code = data.get("lpjk_code")
    project_name = data.get("project_name")
    items_input = data.get("items", [])
    
    if not lpjk_code or lpjk_code not in RAB_TEMPLATES:
        raise HTTPException(status_code=400, detail="Invalid LPJK code")
    
    # Calculate each item
    calculated_items = []
    grand_total = 0
    total_material = 0
    total_upah = 0
    total_alat = 0
    
    for item_input in items_input:
        kode = item_input.get("kode")
        volume = float(item_input.get("volume", 0))
        
        if kode in HARGA_SATUAN_DATABASE:
            harga = HARGA_SATUAN_DATABASE[kode]
            
            jumlah_material = harga["material"] * volume
            jumlah_upah = harga["upah"] * volume
            jumlah_alat = harga["alat"] * volume
            jumlah_total = harga["total"] * volume
            
            calculated_items.append({
                "kode": kode,
                "uraian": harga["uraian"],
                "satuan": harga["satuan"],
                "volume": volume,
                "harga_satuan": {
                    "material": harga["material"],
                    "upah": harga["upah"],
                    "alat": harga["alat"],
                    "total": harga["total"]
                },
                "jumlah": {
                    "material": jumlah_material,
                    "upah": jumlah_upah,
                    "alat": jumlah_alat,
                    "total": jumlah_total
                },
                "kategori": harga["kategori"]
            })
            
            total_material += jumlah_material
            total_upah += jumlah_upah
            total_alat += jumlah_alat
            grand_total += jumlah_total
    
    # Save to database
    rab_document = {
        "id": str(datetime.now().timestamp()),
        "lpjk_code": lpjk_code,
        "project_name": project_name,
        "items": calculated_items,
        "summary": {
            "total_material": total_material,
            "total_upah": total_upah,
            "total_alat": total_alat,
            "grand_total": grand_total
        },
        "timestamp": datetime.now(datetime.timezone.utc).isoformat()
    }
    
    await db.rab_enhanced.insert_one(rab_document)
    
    return rab_document

@router.get("/list")
async def get_all_rab_enhanced():
    """Get all RAB enhanced calculations"""
    rabs = await db.rab_enhanced.find({}, {"_id": 0}).to_list(1000)
    return rabs
