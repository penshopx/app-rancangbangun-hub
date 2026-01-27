from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import SiteReport, SiteReportCreate
from database import db

router = APIRouter(prefix="/site-reports", tags=["Site Control"])

@router.post("/", response_model=SiteReport)
async def create_report(report_data: SiteReportCreate):
    """Create a new site report"""
    report_dict = report_data.model_dump()
    report_obj = SiteReport(**report_dict)
    
    doc = report_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.site_reports.insert_one(doc)
    return report_obj

@router.get("/", response_model=List[SiteReport])
async def get_all_reports(project_id: Optional[str] = None):
    """Get all site reports, optionally filtered by project"""
    query = {"project_id": project_id} if project_id else {}
    reports = await db.site_reports.find(query, {"_id": 0}).sort("report_date", -1).to_list(1000)
    
    for report in reports:
        if isinstance(report.get('created_at'), str):
            report['created_at'] = datetime.fromisoformat(report['created_at'])
    
    return reports

@router.get("/{report_id}", response_model=SiteReport)
async def get_report(report_id: str):
    """Get specific report by ID"""
    report = await db.site_reports.find_one({"id": report_id}, {"_id": 0})
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    if isinstance(report.get('created_at'), str):
        report['created_at'] = datetime.fromisoformat(report['created_at'])
    
    return report

@router.delete("/{report_id}")
async def delete_report(report_id: str):
    """Delete a site report"""
    result = await db.site_reports.delete_one({"id": report_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Report not found")
    
    return {"message": "Report deleted successfully"}
