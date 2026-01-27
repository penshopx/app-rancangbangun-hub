from fastapi import APIRouter
from lpjk_data import LPJK_CLASSIFICATIONS, PROJECT_WORKFLOWS, METODE_PELAKSANAAN_TEMPLATES

router = APIRouter(prefix="/lpjk", tags=["LPJK Data"])

@router.get("/classifications")
async def get_lpjk_classifications():
    """Get all LPJK classifications"""
    return LPJK_CLASSIFICATIONS

@router.get("/classifications/{classification_code}")
async def get_classification_detail(classification_code: str):
    """Get specific LPJK classification detail"""
    if classification_code in LPJK_CLASSIFICATIONS:
        return LPJK_CLASSIFICATIONS[classification_code]
    return {"error": "Classification not found"}

@router.get("/workflows")
async def get_project_workflows():
    """Get standard project workflow phases"""
    return PROJECT_WORKFLOWS

@router.get("/metode-pelaksanaan")
async def get_metode_pelaksanaan_templates():
    """Get metode pelaksanaan templates"""
    return METODE_PELAKSANAAN_TEMPLATES
