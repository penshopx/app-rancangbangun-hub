from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone

# RAB Calculator Models
class RABInput(BaseModel):
    field_id: str
    label: str
    value: float

class RABCalculation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str  # 'umum', 'pondasi', 'jalan-aspal'
    inputs: List[RABInput]
    volume: float
    unit: str
    price_per_unit: float
    total_cost: float
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RABCalculationCreate(BaseModel):
    category: str
    inputs: List[RABInput]
    volume: float
    unit: str
    price_per_unit: float
    total_cost: float

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str] = ""
    rab_id: str
    status: str = "draft"  # draft, active, completed
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = ""
    rab_id: str

# BOM Models
class BOMMaterial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    price: float
    unit: str
    supplier: str
    stock: int
    description: Optional[str] = ""

class BOMMaterialCreate(BaseModel):
    name: str
    category: str
    price: float
    unit: str
    supplier: str
    stock: int
    description: Optional[str] = ""

# Site Control Models
class SiteReport(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: Optional[str] = None
    report_date: str
    weather: str
    progress_percentage: float
    workers_count: int
    notes: str
    photos: List[str] = []  # URLs or base64
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SiteReportCreate(BaseModel):
    project_id: Optional[str] = None
    report_date: str
    weather: str
    progress_percentage: float
    workers_count: int
    notes: str
    photos: List[str] = []

# Chat Models
class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_query: str
    bot_response: str
    detected_category: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatMessageCreate(BaseModel):
    user_query: str

# Gantt Chart Models
class GanttTask(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: Optional[str] = None
    task_name: str
    start_date: str  # ISO format date
    end_date: str
    progress: float = 0.0  # 0-100
    assignee: Optional[str] = ""
    priority: str = "medium"  # low, medium, high
    status: str = "not_started"  # not_started, in_progress, completed
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GanttTaskCreate(BaseModel):
    project_id: Optional[str] = None
    task_name: str
    start_date: str
    end_date: str
    progress: float = 0.0
    assignee: Optional[str] = ""
    priority: str = "medium"
    status: str = "not_started"

class GanttTaskUpdate(BaseModel):
    task_name: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    progress: Optional[float] = None
    assignee: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None

# Blueprint Models
class Blueprint(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: Optional[str] = None
    title: str
    category: str  # structural, architectural, electrical, plumbing
    image_url: str
    version: str = "1.0"
    notes: Optional[str] = ""
    uploaded_by: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlueprintCreate(BaseModel):
    project_id: Optional[str] = None
    title: str
    category: str
    image_url: str
    version: str = "1.0"
    notes: Optional[str] = ""
    uploaded_by: Optional[str] = ""
