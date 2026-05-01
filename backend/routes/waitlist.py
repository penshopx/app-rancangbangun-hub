from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import sys
from pathlib import Path
import uuid

sys.path.append(str(Path(__file__).parent.parent))
from database import db

router = APIRouter(prefix="/waitlist", tags=["Waitlist"])

class WaitlistEntry(BaseModel):
    name: str
    email: str
    role: Optional[str] = "owner"
    submitted_at: str = Field(default_factory=lambda: datetime.now().isoformat())

@router.post("")
async def join_waitlist(entry: WaitlistEntry):
    """Add email to waitlist"""
    doc = entry.model_dump()
    doc["id"] = str(uuid.uuid4())
    await db.waitlist.insert_one(doc)
    return {"message": "Successfully joined waitlist", "name": entry.name}

@router.get("")
async def get_waitlist_count():
    """Get waitlist stats"""
    count = await db.waitlist.count_documents({})
    return {"count": count}
