from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from models import (
    RABCalculation, RABCalculationCreate,
    Project, ProjectCreate
)
from database import db

router = APIRouter(prefix="/rab", tags=["RAB Calculator"])

@router.post("/calculate", response_model=RABCalculation)
async def create_rab_calculation(rab_data: RABCalculationCreate):
    """Create a new RAB calculation"""
    rab_dict = rab_data.model_dump()
    rab_obj = RABCalculation(**rab_dict)
    
    # Convert to dict and serialize datetime
    doc = rab_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    # Serialize nested inputs
    doc['inputs'] = [inp.model_dump() if hasattr(inp, 'model_dump') else inp for inp in doc['inputs']]
    
    await db.rab_calculations.insert_one(doc)
    return rab_obj

@router.get("/calculations", response_model=List[RABCalculation])
async def get_all_calculations():
    """Get all RAB calculations"""
    calculations = await db.rab_calculations.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime
    for calc in calculations:
        if isinstance(calc['timestamp'], str):
            calc['timestamp'] = datetime.fromisoformat(calc['timestamp'])
    
    return calculations

@router.get("/calculations/{rab_id}", response_model=RABCalculation)
async def get_calculation_by_id(rab_id: str):
    """Get specific RAB calculation"""
    calc = await db.rab_calculations.find_one({"id": rab_id}, {"_id": 0})
    
    if not calc:
        raise HTTPException(status_code=404, detail="RAB calculation not found")
    
    if isinstance(calc['timestamp'], str):
        calc['timestamp'] = datetime.fromisoformat(calc['timestamp'])
    
    return calc

@router.post("/projects", response_model=Project)
async def create_project_from_rab(project_data: ProjectCreate):
    """Create a project from RAB calculation"""
    # Verify RAB exists
    rab = await db.rab_calculations.find_one({"id": project_data.rab_id}, {"_id": 0})
    if not rab:
        raise HTTPException(status_code=404, detail="RAB calculation not found")
    
    project_dict = project_data.model_dump()
    project_obj = Project(**project_dict)
    
    doc = project_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.projects.insert_one(doc)
    return project_obj

@router.get("/projects", response_model=List[Project])
async def get_all_projects():
    """Get all projects"""
    projects = await db.projects.find({}, {"_id": 0}).to_list(1000)
    
    for project in projects:
        if isinstance(project['created_at'], str):
            project['created_at'] = datetime.fromisoformat(project['created_at'])
        if isinstance(project['updated_at'], str):
            project['updated_at'] = datetime.fromisoformat(project['updated_at'])
    
    return projects
