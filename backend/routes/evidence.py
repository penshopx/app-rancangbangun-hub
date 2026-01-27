from fastapi import APIRouter
from typing import List, Optional
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import ProjectEvidence, ProjectEvidenceCreate
from database import db

router = APIRouter(prefix="/evidence", tags=["Project Evidence"])

@router.post("/", response_model=ProjectEvidence)
async def upload_evidence(evidence: ProjectEvidenceCreate):
    """Upload project evidence (photos, documents)"""
    evidence_dict = evidence.model_dump()
    evidence_obj = ProjectEvidence(**evidence_dict)
    
    doc = evidence_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.project_evidence.insert_one(doc)
    return evidence_obj

@router.get("/project/{project_id}", response_model=List[ProjectEvidence])
async def get_project_evidence(project_id: str, evidence_type: Optional[str] = None):
    """Get all evidence for a project"""
    query = {"project_id": project_id}
    if evidence_type:
        query['evidence_type'] = evidence_type
    
    evidence_list = await db.project_evidence.find(query, {"_id": 0}).sort("upload_date", -1).to_list(1000)
    
    for evidence in evidence_list:
        if isinstance(evidence.get('created_at'), str):
            evidence['created_at'] = datetime.fromisoformat(evidence['created_at'])
    
    return evidence_list
