from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.mentor import MentorRequest, MentorResponse
from app.services.groq_service import GroqMentorService
from app.core.dependencies import get_mentor_service

router = APIRouter(prefix="/mentor", tags=["Krishna AI Mentor"])

@router.post(
    "/resolve",
    response_model=MentorResponse,
    summary="Resolve a life challenge through Bhagavad Gita wisdom",
    description="Analyzes the problem through the lens of Vedantic philosophy, identifies the dominant Guna, and provides a targeted shloka with actionable guidance."
)
async def resolve_problem(
    payload: MentorRequest,
    mentor: GroqMentorService = Depends(get_mentor_service)
) -> MentorResponse:
    try:
        return await mentor.resolve(payload.problem_description)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI inference failed: {str(e)}"
        )
