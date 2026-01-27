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

# Tender Models
class Tender(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    budget: float
    location: str
    deadline: str  # ISO date
    status: str = "open"  # open, closed, awarded
    description: str
    owner: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TenderCreate(BaseModel):
    title: str
    category: str
    budget: float
    location: str
    deadline: str
    status: str = "open"
    description: str
    owner: str

# FAT (Factory Acceptance Test) Models
class FATChecklistItem(BaseModel):
    item_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    description: str
    category: str  # equipment, documentation, performance
    status: str = "pending"  # pending, pass, fail
    notes: Optional[str] = ""

class FATChecklist(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: Optional[str] = None
    test_date: str
    equipment_name: str
    items: List[FATChecklistItem]
    signed_by: Optional[str] = ""
    overall_status: str = "in_progress"  # in_progress, approved, rejected
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class FATChecklistCreate(BaseModel):
    project_id: Optional[str] = None
    test_date: str
    equipment_name: str
    items: List[FATChecklistItem]
    signed_by: Optional[str] = ""
    overall_status: str = "in_progress"

# Maintenance Models
class MaintenanceSchedule(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    equipment_name: str
    equipment_type: str
    frequency: str  # daily, weekly, monthly, yearly
    last_maintenance: Optional[str] = None
    next_due: str
    status: str = "scheduled"  # scheduled, overdue, completed
    assigned_to: Optional[str] = ""
    notes: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MaintenanceScheduleCreate(BaseModel):
    equipment_name: str
    equipment_type: str
    frequency: str
    last_maintenance: Optional[str] = None
    next_due: str
    status: str = "scheduled"
    assigned_to: Optional[str] = ""
    notes: Optional[str] = ""

# Contractor Registry Models
class ContractorProfile(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company_name: str
    license_number: str
    license_expiry: str
    specialization: List[str]  # ["Sipil", "Arsitektur", "MEP", etc]
    established_year: int
    address: str
    phone: str
    email: str
    website: Optional[str] = ""
    
    # Verification Status
    is_verified: bool = False
    verification_date: Optional[str] = None
    
    # Financial & Legal
    has_insurance: bool = False
    insurance_value: float = 0
    tax_id: str = ""
    
    # Performance Metrics
    completed_projects: int = 0
    ongoing_projects: int = 0
    total_value_completed: float = 0
    average_rating: float = 0.0
    rating_count: int = 0
    
    # Compliance
    k3_certified: bool = False
    iso_certified: bool = False
    
    # Portfolio
    portfolio_images: List[str] = []
    
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContractorProfileCreate(BaseModel):
    company_name: str
    license_number: str
    license_expiry: str
    specialization: List[str]
    established_year: int
    address: str
    phone: str
    email: str
    website: Optional[str] = ""
    has_insurance: bool = False
    insurance_value: float = 0
    tax_id: str = ""
    k3_certified: bool = False
    iso_certified: bool = False
    portfolio_images: List[str] = []

# Review System Models
class ContractorReview(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    contractor_id: str
    project_id: str  # Link to actual project for verification
    reviewer_name: str
    reviewer_company: str
    
    # Multi-criteria Rating (1-5 stars)
    quality_rating: float
    timeliness_rating: float
    budget_rating: float
    communication_rating: float
    overall_rating: float  # Average
    
    review_text: str
    proof_images: List[str] = []  # Evidence photos
    
    is_verified: bool = False  # Admin verified
    contractor_response: Optional[str] = None
    
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContractorReviewCreate(BaseModel):
    contractor_id: str
    project_id: str
    reviewer_name: str
    reviewer_company: str
    quality_rating: float
    timeliness_rating: float
    budget_rating: float
    communication_rating: float
    review_text: str
    proof_images: List[str] = []

# Bidding System Models
class ProjectBid(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: str
    contractor_id: str
    contractor_name: str
    
    bid_amount: float
    estimated_duration: int  # days
    methodology: str
    team_size: int
    proposed_start_date: str
    
    attachments: List[str] = []  # Proposal documents
    
    status: str = "pending"  # pending, accepted, rejected
    
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProjectBidCreate(BaseModel):
    project_id: str
    contractor_id: str
    contractor_name: str
    bid_amount: float
    estimated_duration: int
    methodology: str
    team_size: int
    proposed_start_date: str
    attachments: List[str] = []

# Transparency & Evidence Models
class ProjectEvidence(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: str
    evidence_type: str  # "progress_photo", "material_receipt", "inspection_report", "safety_audit"
    
    title: str
    description: str
    images: List[str]
    
    # Geo-tagging
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    location_name: Optional[str] = ""
    
    uploaded_by: str
    upload_date: str
    
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProjectEvidenceCreate(BaseModel):
    project_id: str
    evidence_type: str
    title: str
    description: str
    images: List[str]
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    location_name: Optional[str] = ""
    uploaded_by: str
    upload_date: str
