from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import FATChecklist, FATChecklistCreate
from database import db

router = APIRouter(prefix="/fat", tags=["FAT Checklist"])

@router.post("/", response_model=FATChecklist)
async def create_checklist(checklist_data: FATChecklistCreate):
    """Create new FAT checklist"""
    checklist_dict = checklist_data.model_dump()
    checklist_obj = FATChecklist(**checklist_dict)
    
    doc = checklist_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    # Serialize nested items
    doc['items'] = [item.model_dump() if hasattr(item, 'model_dump') else item for item in doc['items']]
    
    await db.fat_checklists.insert_one(doc)
    return checklist_obj

@router.get("/", response_model=List[FATChecklist])
async def get_all_checklists(project_id: Optional[str] = None):
    """Get all FAT checklists"""
    query = {"project_id": project_id} if project_id else {}
    checklists = await db.fat_checklists.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for checklist in checklists:
        if isinstance(checklist.get('created_at'), str):
            checklist['created_at'] = datetime.fromisoformat(checklist['created_at'])
    
    return checklists

@router.get("/{checklist_id}", response_model=FATChecklist)
async def get_checklist(checklist_id: str):
    """Get specific checklist"""
    checklist = await db.fat_checklists.find_one({"id": checklist_id}, {"_id": 0})
    
    if not checklist:
        raise HTTPException(status_code=404, detail="Checklist not found")
    
    if isinstance(checklist.get('created_at'), str):
        checklist['created_at'] = datetime.fromisoformat(checklist['created_at'])
    
    return checklist

@router.patch("/{checklist_id}/items/{item_id}")
async def update_item_status(checklist_id: str, item_id: str, status: str, notes: Optional[str] = ""):
    """Update status of a checklist item"""
    checklist = await db.fat_checklists.find_one({"id": checklist_id}, {"_id": 0})
    
    if not checklist:
        raise HTTPException(status_code=404, detail="Checklist not found")
    
    # Update specific item
    for item in checklist['items']:
        if item['item_id'] == item_id:
            item['status'] = status
            if notes:
                item['notes'] = notes
            break
    
    # Update overall status if all items are completed
    all_passed = all(item['status'] == 'pass' for item in checklist['items'])
    any_failed = any(item['status'] == 'fail' for item in checklist['items'])
    
    if all_passed:
        checklist['overall_status'] = 'approved'
    elif any_failed:
        checklist['overall_status'] = 'rejected'
    
    await db.fat_checklists.update_one(
        {"id": checklist_id},
        {"$set": {"items": checklist['items'], "overall_status": checklist['overall_status']}}
    )
    
    return {"message": "Item updated successfully", "overall_status": checklist['overall_status']}

@router.delete("/{checklist_id}")
async def delete_checklist(checklist_id: str):
    """Delete a checklist"""
    result = await db.fat_checklists.delete_one({"id": checklist_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Checklist not found")
    
    return {"message": "Checklist deleted successfully"}
