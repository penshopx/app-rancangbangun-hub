from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from models import ContractorProfile, ContractorProfileCreate, ContractorReview, ContractorReviewCreate
from database import db

router = APIRouter(prefix="/contractors", tags=["Contractors"])

@router.post("/", response_model=ContractorProfile)
async def create_contractor(contractor: ContractorProfileCreate):
    """Register new contractor"""
    contractor_dict = contractor.model_dump()
    contractor_obj = ContractorProfile(**contractor_dict)
    
    doc = contractor_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contractors.insert_one(doc)
    return contractor_obj

@router.get("/", response_model=List[ContractorProfile])
async def search_contractors(
    specialization: Optional[str] = None,
    min_rating: Optional[float] = None,
    verified_only: bool = False,
    has_insurance: Optional[bool] = None
):
    """Search contractors with filters"""
    query = {}
    
    if specialization:
        query['specialization'] = {'$in': [specialization]}
    
    if min_rating:
        query['average_rating'] = {'$gte': min_rating}
    
    if verified_only:
        query['is_verified'] = True
    
    if has_insurance is not None:
        query['has_insurance'] = has_insurance
    
    contractors = await db.contractors.find(query, {"_id": 0}).sort("average_rating", -1).to_list(1000)
    
    for contractor in contractors:
        if isinstance(contractor.get('created_at'), str):
            contractor['created_at'] = datetime.fromisoformat(contractor['created_at'])
    
    return contractors

@router.get("/{contractor_id}", response_model=ContractorProfile)
async def get_contractor(contractor_id: str):
    """Get contractor profile"""
    contractor = await db.contractors.find_one({"id": contractor_id}, {"_id": 0})
    
    if not contractor:
        raise HTTPException(status_code=404, detail="Contractor not found")
    
    if isinstance(contractor.get('created_at'), str):
        contractor['created_at'] = datetime.fromisoformat(contractor['created_at'])
    
    return contractor

@router.post("/reviews", response_model=ContractorReview)
async def create_review(review: ContractorReviewCreate):
    """Submit contractor review"""
    review_dict = review.model_dump()
    
    # Calculate overall rating
    overall = (review_dict['quality_rating'] + review_dict['timeliness_rating'] + 
               review_dict['budget_rating'] + review_dict['communication_rating']) / 4
    review_dict['overall_rating'] = round(overall, 2)
    
    review_obj = ContractorReview(**review_dict)
    
    doc = review_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contractor_reviews.insert_one(doc)
    
    # Update contractor average rating
    contractor_id = review_dict['contractor_id']
    contractor = await db.contractors.find_one({"id": contractor_id}, {"_id": 0})
    
    if contractor:
        new_count = contractor['rating_count'] + 1
        new_avg = ((contractor['average_rating'] * contractor['rating_count']) + overall) / new_count
        
        await db.contractors.update_one(
            {"id": contractor_id},
            {"$set": {"average_rating": round(new_avg, 2), "rating_count": new_count}}
        )
    
    return review_obj

@router.get("/reviews/{contractor_id}", response_model=List[ContractorReview])
async def get_contractor_reviews(contractor_id: str):
    """Get all reviews for a contractor"""
    reviews = await db.contractor_reviews.find({"contractor_id": contractor_id}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for review in reviews:
        if isinstance(review.get('created_at'), str):
            review['created_at'] = datetime.fromisoformat(review['created_at'])
    
    return reviews

@router.post("/seed-data")
async def seed_contractor_data():
    """Seed sample contractor data"""
    sample_contractors = [
        {
            "company_name": "PT Cipta Karya Konstruksi",
            "license_number": "LPJK-001234-2025",
            "license_expiry": "2027-12-31",
            "specialization": ["Sipil", "Infrastruktur"],
            "established_year": 2010,
            "address": "Jl. Sudirman No. 123, Jakarta",
            "phone": "021-5551234",
            "email": "info@ciptakarya.co.id",
            "website": "www.ciptakarya.co.id",
            "is_verified": True,
            "verification_date": "2025-01-15",
            "has_insurance": True,
            "insurance_value": 5000000000,
            "tax_id": "01.234.567.8-901.000",
            "completed_projects": 45,
            "ongoing_projects": 8,
            "total_value_completed": 150000000000,
            "average_rating": 4.7,
            "rating_count": 32,
            "k3_certified": True,
            "iso_certified": True,
            "portfolio_images": ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400"]
        },
        {
            "company_name": "CV Bangunan Jaya Abadi",
            "license_number": "LPJK-005678-2024",
            "license_expiry": "2026-06-30",
            "specialization": ["Bangunan", "Arsitektur"],
            "established_year": 2015,
            "address": "Jl. Gatot Subroto 456, Surabaya",
            "phone": "031-7778899",
            "email": "contact@bangunanjaya.id",
            "is_verified": True,
            "verification_date": "2024-11-20",
            "has_insurance": True,
            "insurance_value": 2000000000,
            "tax_id": "02.345.678.9-012.000",
            "completed_projects": 28,
            "ongoing_projects": 5,
            "total_value_completed": 75000000000,
            "average_rating": 4.5,
            "rating_count": 19,
            "k3_certified": True,
            "iso_certified": False,
            "portfolio_images": ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400"]
        },
        {
            "company_name": "UD Konstruksi Mandiri (Unverified)",
            "license_number": "LPJK-009999-2023",
            "license_expiry": "2025-03-15",
            "specialization": ["Sipil"],
            "established_year": 2020,
            "address": "Jl. Pahlawan 789, Bandung",
            "phone": "022-4445566",
            "email": "konstruksimandiri@gmail.com",
            "is_verified": False,
            "has_insurance": False,
            "insurance_value": 0,
            "tax_id": "",
            "completed_projects": 5,
            "ongoing_projects": 2,
            "total_value_completed": 8000000000,
            "average_rating": 3.8,
            "rating_count": 4,
            "k3_certified": False,
            "iso_certified": False,
            "portfolio_images": []
        }
    ]
    
    await db.contractors.delete_many({})
    
    for contractor_data in sample_contractors:
        contractor_obj = ContractorProfile(**contractor_data)
        doc = contractor_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.contractors.insert_one(doc)
    
    return {"message": f"{len(sample_contractors)} contractors seeded successfully"}
