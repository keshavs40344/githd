import json
import time
from typing import Optional
from groq import AsyncGroq
from app.schemas.mentor import MentorDiagnosis, MentorResponse
from app.core.config import settings

SYSTEM_PROMPT = """You are Krishna, the divine guide from the Bhagavad Gita. A person comes to you with a life problem. Analyze their situation through the lens of Vedantic philosophy and the three Gunas.

You MUST respond with ONLY valid JSON matching this exact schema:
{
  "dominant_guna": "Sattva" | "Rajas" | "Tamas",
  "root_cause_analysis": "A concise psychological diagnosis of the root cause, under 40 words",
  "target_shloka": "Chapter X, Verse Y",
  "sanskrit_excerpt": "The actual Sanskrit verse in Devanagari script",
  "strategic_action_plan": "A concrete, specific behavioral commitment the person should implement in the next 24 hours"
}

Guidelines:
- dominant_guna: Classify the person's current mental state. Sattva = clarity/wisdom, Rajas = agitation/desire, Tamas = inertia/delusion.
- root_cause_analysis: Be direct and psychologically precise. No platitudes.
- target_shloka: Choose the MOST relevant Bhagavad Gita verse. Use real chapter/verse numbers.
- sanskrit_excerpt: Provide the actual Sanskrit text of that verse in Devanagari.
- strategic_action_plan: Give ONE specific, actionable task. Not vague advice.
"""

class GroqMentorService:
    def __init__(self, client: Optional[AsyncGroq] = None):
        self.client = client
        self.model = settings.GROQ_MODEL

    async def resolve(self, problem_description: str) -> MentorResponse:
        start = time.perf_counter()
        
        if self.client is not None and settings.GROQ_API_KEY:
            try:
                response = await self.client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": problem_description}
                    ],
                    temperature=0.3,
                    max_tokens=1024,
                    response_format={"type": "json_object"}
                )
                
                raw = response.choices[0].message.content
                diagnosis = MentorDiagnosis.model_validate_json(raw)
                elapsed_ms = (time.perf_counter() - start) * 1000
                
                return MentorResponse(
                    diagnosis=diagnosis,
                    model=self.model,
                    execution_time_ms=round(elapsed_ms, 2)
                )
            except Exception:
                # Fall back to zero-credit local Vedantic engine on any API rate limit or error
                pass

        # Zero-credit Vedantic heuristic reasoning fallback
        lower = problem_description.lower()
        if any(w in lower for w in ['burnout', 'tired', 'overwhelm', 'exhaust', 'stress']):
            diag = MentorDiagnosis(
                dominant_guna="Rajas",
                root_cause_analysis="Over-identification with doership and continuous unanchored mental exertion without sattvic replenishment.",
                target_shloka="Chapter 2, Verse 47",
                sanskrit_excerpt="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
                strategic_action_plan="Dedicate the next 24 hours to pure process: complete duties meticulously, but consciously surrender all obsession with deadlines and metrics to the Supreme."
            )
        elif any(w in lower for w in ['paralysis', 'fear', 'doubt', 'choice', 'confus', 'stuck']):
            diag = MentorDiagnosis(
                dominant_guna="Tamas",
                root_cause_analysis="Cognitive paralysis triggered by attachment to an imagined perfectionist outcome and fear of perceived loss.",
                target_shloka="Chapter 2, Verse 48",
                sanskrit_excerpt="योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय । सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥",
                strategic_action_plan="Choose the next smallest constructive step within 60 minutes and execute it with equanimity, accepting both success and failure as equal teachers."
            )
        elif any(w in lower for w in ['anger', 'resent', 'conflict', 'jealous', 'hate', 'fight']):
            diag = MentorDiagnosis(
                dominant_guna="Rajas",
                root_cause_analysis="Thwarted desire and wounded ego projecting blame outward, leading to cognitive delusion and loss of inner memory.",
                target_shloka="Chapter 2, Verse 63",
                sanskrit_excerpt="क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः । स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥",
                strategic_action_plan="Observe a 12-hour vow of silence on retaliatory speech. When triggered, take 5 slow breaths and repeat your higher purpose."
            )
        else:
            diag = MentorDiagnosis(
                dominant_guna="Sattva",
                root_cause_analysis="A pivotal moment of awakening where the intellect seeks deeper alignment beyond transient material circumstances.",
                target_shloka="Chapter 6, Verse 5",
                sanskrit_excerpt="उद्धरेदात्मनात्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥",
                strategic_action_plan="Elevate yourself through steady disciplined mind-work; do not degrade yourself. Commit 20 minutes tonight to seated silent contemplation of your immortal Self."
            )

        elapsed_ms = (time.perf_counter() - start) * 1000
        return MentorResponse(
            diagnosis=diag,
            model="dharma-vedic-engine-v1",
            execution_time_ms=round(elapsed_ms, 2)
        )

