from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import GanttTask, GanttTaskCreate, GanttTaskUpdate
from database import db

router = APIRouter(prefix="/gantt", tags=["Gantt Chart"])

@router.post("/tasks", response_model=GanttTask)
async def create_task(task_data: GanttTaskCreate):
    """Create a new Gantt task"""
    task_dict = task_data.model_dump()
    task_obj = GanttTask(**task_dict)
    
    doc = task_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.gantt_tasks.insert_one(doc)
    return task_obj

@router.get("/tasks", response_model=List[GanttTask])
async def get_all_tasks(project_id: Optional[str] = None):
    """Get all Gantt tasks, optionally filtered by project"""
    query = {"project_id": project_id} if project_id else {}
    tasks = await db.gantt_tasks.find(query, {"_id": 0}).to_list(1000)
    
    for task in tasks:
        if isinstance(task.get('created_at'), str):
            task['created_at'] = datetime.fromisoformat(task['created_at'])
    
    return tasks

@router.get("/tasks/{task_id}", response_model=GanttTask)
async def get_task(task_id: str):
    """Get specific task by ID"""
    task = await db.gantt_tasks.find_one({"id": task_id}, {"_id": 0})
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if isinstance(task.get('created_at'), str):
        task['created_at'] = datetime.fromisoformat(task['created_at'])
    
    return task

@router.patch("/tasks/{task_id}", response_model=GanttTask)
async def update_task(task_id: str, updates: GanttTaskUpdate):
    """Update task fields"""
    task = await db.gantt_tasks.find_one({"id": task_id}, {"_id": 0})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Apply updates
    update_dict = {k: v for k, v in updates.model_dump().items() if v is not None}
    
    if update_dict:
        await db.gantt_tasks.update_one(
            {"id": task_id},
            {"$set": update_dict}
        )
    
    # Fetch updated task
    updated_task = await db.gantt_tasks.find_one({"id": task_id}, {"_id": 0})
    if isinstance(updated_task.get('created_at'), str):
        updated_task['created_at'] = datetime.fromisoformat(updated_task['created_at'])
    
    return updated_task

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    """Delete a task"""
    result = await db.gantt_tasks.delete_one({"id": task_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"message": "Task deleted successfully"}
