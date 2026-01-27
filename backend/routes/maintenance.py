from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import MaintenanceSchedule, MaintenanceScheduleCreate
from database import db

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])

@router.post("/", response_model=MaintenanceSchedule)
async def create_schedule(schedule_data: MaintenanceScheduleCreate):
    """Create maintenance schedule"""
    schedule_dict = schedule_data.model_dump()
    schedule_obj = MaintenanceSchedule(**schedule_dict)
    
    doc = schedule_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.maintenance_schedules.insert_one(doc)
    return schedule_obj

@router.get("/", response_model=List[MaintenanceSchedule])
async def get_all_schedules(status: Optional[str] = None):
    """Get all maintenance schedules"""
    query = {"status": status} if status else {}
    schedules = await db.maintenance_schedules.find(query, {"_id": 0}).sort("next_due", 1).to_list(1000)
    
    for schedule in schedules:
        if isinstance(schedule.get('created_at'), str):
            schedule['created_at'] = datetime.fromisoformat(schedule['created_at'])
    
    return schedules

@router.get("/{schedule_id}", response_model=MaintenanceSchedule)
async def get_schedule(schedule_id: str):
    """Get specific schedule"""
    schedule = await db.maintenance_schedules.find_one({"id": schedule_id}, {"_id": 0})
    
    if not schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")
    
    if isinstance(schedule.get('created_at'), str):
        schedule['created_at'] = datetime.fromisoformat(schedule['created_at'])
    
    return schedule

@router.patch("/{schedule_id}/complete")
async def mark_completed(schedule_id: str, completion_date: str, next_due: str):
    """Mark maintenance as completed and set next due date"""
    await db.maintenance_schedules.update_one(
        {"id": schedule_id},
        {"$set": {
            "last_maintenance": completion_date,
            "next_due": next_due,
            "status": "scheduled"
        }}
    )
    
    return {"message": "Maintenance marked as completed"}

@router.delete("/{schedule_id}")
async def delete_schedule(schedule_id: str):
    """Delete a schedule"""
    result = await db.maintenance_schedules.delete_one({"id": schedule_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Schedule not found")
    
    return {"message": "Schedule deleted successfully"}

@router.post("/seed-data")
async def seed_maintenance_data():
    """Seed sample maintenance data"""
    from datetime import date, timedelta
    
    sample_schedules = [
        {
            "equipment_name": "Excavator CAT 320D",
            "equipment_type": "Heavy Equipment",
            "frequency": "monthly",
            "last_maintenance": (date.today() - timedelta(days=15)).isoformat(),
            "next_due": (date.today() + timedelta(days=15)).isoformat(),
            "status": "scheduled",
            "assigned_to": "Tim Maintenance A",
            "notes": "Ganti oli dan filter"
        },
        {
            "equipment_name": "Tower Crane Liebherr",
            "equipment_type": "Crane",
            "frequency": "weekly",
            "last_maintenance": (date.today() - timedelta(days=5)).isoformat(),
            "next_due": (date.today() + timedelta(days=2)).isoformat(),
            "status": "scheduled",
            "assigned_to": "Engineer Safety",
            "notes": "Inspeksi kabel dan sistem hidrolik"
        },
        {
            "equipment_name": "Generator 500 KVA",
            "equipment_type": "Generator",
            "frequency": "daily",
            "last_maintenance": date.today().isoformat(),
            "next_due": (date.today() + timedelta(days=1)).isoformat(),
            "status": "scheduled",
            "assigned_to": "Operator Genset",
            "notes": "Cek BBM dan suhu operasi"
        },
        {
            "equipment_name": "Concrete Mixer 3m³",
            "equipment_type": "Mixer",
            "frequency": "monthly",
            "last_maintenance": (date.today() - timedelta(days=40)).isoformat(),
            "next_due": (date.today() - timedelta(days=10)).isoformat(),
            "status": "overdue",
            "assigned_to": "Tim Maintenance B",
            "notes": "URGENT: Service motor dan drum"
        }
    ]
    
    await db.maintenance_schedules.delete_many({})
    
    for schedule_data in sample_schedules:
        schedule_obj = MaintenanceSchedule(**schedule_data)
        doc = schedule_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.maintenance_schedules.insert_one(doc)
    
    return {"message": f"{len(sample_schedules)} maintenance schedules seeded successfully"}
