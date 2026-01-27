from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import ProjectBid, ProjectBidCreate
from database import db

router = APIRouter(prefix="/bidding", tags=["Bidding"])

@router.post("/", response_model=ProjectBid)
async def create_bid(bid: ProjectBidCreate):
    """Submit project bid"""
    bid_dict = bid.model_dump()
    bid_obj = ProjectBid(**bid_dict)
    
    doc = bid_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.project_bids.insert_one(doc)
    return bid_obj

@router.get("/project/{project_id}", response_model=List[ProjectBid])
async def get_project_bids(project_id: str):
    """Get all bids for a project"""
    bids = await db.project_bids.find({"project_id": project_id}, {"_id": 0}).sort("bid_amount", 1).to_list(1000)
    
    for bid in bids:
        if isinstance(bid.get('created_at'), str):
            bid['created_at'] = datetime.fromisoformat(bid['created_at'])
    
    return bids

@router.patch("/{bid_id}/accept")
async def accept_bid(bid_id: str):
    """Accept a bid"""
    await db.project_bids.update_one({"id": bid_id}, {"$set": {"status": "accepted"}})
    return {"message": "Bid accepted"}

@router.patch("/{bid_id}/reject")
async def reject_bid(bid_id: str):
    """Reject a bid"""
    await db.project_bids.update_one({"id": bid_id}, {"$set": {"status": "rejected"}})
    return {"message": "Bid rejected"}
