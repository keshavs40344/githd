from contextlib import asynccontextmanager
from fastapi import FastAPI
import httpx
from groq import AsyncGroq
from app.core.config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize connection pool
    limits = httpx.Limits(max_keepalive_connections=20, max_connections=100, keepalive_expiry=30.0)
    timeout = httpx.Timeout(connect=5.0, read=30.0, write=5.0, pool=5.0)
    
    http_client = httpx.AsyncClient(limits=limits, timeout=timeout)
    
    groq_client = None
    if settings.GROQ_API_KEY:
        groq_client = AsyncGroq(
            api_key=settings.GROQ_API_KEY,
            http_client=http_client
        )
    
    app.state.http_client = http_client
    app.state.groq_client = groq_client
    
    yield
    
    await http_client.aclose()
