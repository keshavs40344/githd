from typing import Optional
from fastapi import Request, Depends
from groq import AsyncGroq
from app.services.groq_service import GroqMentorService

def get_groq_client(request: Request) -> Optional[AsyncGroq]:
    return getattr(request.app.state, "groq_client", None)

def get_mentor_service(client: Optional[AsyncGroq] = Depends(get_groq_client)) -> GroqMentorService:
    return GroqMentorService(client=client)

