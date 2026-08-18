from fastapi import APIRouter
from app.api.v1.endpoints import health, mentor

v1_router = APIRouter(prefix="/v1")
v1_router.include_router(health.router)
v1_router.include_router(mentor.router)
