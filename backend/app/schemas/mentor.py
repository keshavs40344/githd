from typing import Literal
from pydantic import BaseModel, Field, ConfigDict

class MentorRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    problem_description: str = Field(..., min_length=10, max_length=2000, description="Describe your life challenge or dilemma")

class MentorDiagnosis(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    dominant_guna: Literal["Sattva", "Rajas", "Tamas"]
    root_cause_analysis: str = Field(..., max_length=250)
    target_shloka: str = Field(..., description="e.g. Chapter 2, Verse 47")
    sanskrit_excerpt: str = Field(..., description="Sanskrit verse in Devanagari")
    strategic_action_plan: str = Field(..., max_length=500, description="Concrete 24-hour behavioral commitment")

class MentorResponse(BaseModel):
    success: bool = True
    diagnosis: MentorDiagnosis
    model: str
    execution_time_ms: float
