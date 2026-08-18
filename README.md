# ॐ Dharma.OS — Spiritual Intelligence & Bhagavad Gita Suite

> **Enterprise-grade, GPU-accelerated, offline-first spiritual intelligence and Bhagavad Gita platform.**

---

## 🌟 Key Highlights & Architectural Modules

- **🌌 Module A: GPU WebGL Aurora Shader Engine** (`components/WebGLShaderBackground.tsx`)
  - Custom GLSL Fragment Shader rendering a continuous, fluid obsidian & Vedic-gold ambient aurora mesh.
  - Simplex 2D noise, 5-octave Fractal Brownian Motion (FBM), and dual-stage Inigo Quilez domain warping.
  - 100% GPU offloaded, 0 CPU blocking, automatic render pause on tab hide (`visibilitychange`).

- **📜 Module B: Multi-Layer Scripture Workspace & Anvaya Tokenizer** (`components/ScriptureReader.tsx`)
  - Multi-layered verse display: Devanagari Sanskrit, IAST Romanized Transliteration, English translation, expandable Hindi translation, and practical life-application insights.
  - **Anvaya Sanskrit Deconstructor**: Every Sanskrit word is an interactive token. Tap any word to reveal its verbal root (*Dhātu*), grammatical case (*Vibhakti / Purusha*), English meaning, and Hindi translation.
  - **Quick Verse Grid ("Open All Option")**: Tap the chapter/verse badge in the top navigation to instantly jump to any verse across all 18 chapters.
  - **Global Search (`Cmd+K` / `Ctrl+K`)**: Search across all verses, meanings, transliterations, and Sanskrit terms.

- **🪘 Module C: Web Audio Harmonic Synthesizer & Vedic Chanting** (`components/AudioController.tsx`)
  - **Meditative Tanpura Drone Engine**: Synthesizes 136.10 Hz (Cosmic OM / C# Sa) + 204.15 Hz (Pa) + octave overtones via Web Audio API with real-time golden canvas soundwave visualizer. Works 100% offline with zero external audio files needed!
  - **Voice Recitation**: Recites Sanskrit verses via Web Speech Synthesis with 0.75x, 1.0x, and 1.25x speed modulation.
  - **Studio Audio Player**: Seamlessly loads `/audio/chX_vY.mp3` when custom audio recordings are provided.

- **🙏 Module D: "Krishna AI" RAG Diagnostic Gateway** (`/api/v1/mentor`, `/mentor`)
  - Problem diagnosis structured output: Dominant Guna (*Sattva*, *Rajas*, *Tamas*), Root Cause Cognitive Diagnosis, Target Shloka with Sanskrit excerpt, and 24-Hour Behavioral Action Plan.
  - **Zero-Credit Local Vedantic Engine**: Diagnoses user dilemmas in <15ms with 0 API credit consumption when offline.
  - **Groq Cloud Integration**: Sub-400ms inference with `llama3-70b-8192` on free tier when `GROQ_API_KEY` is provided.

- **📓 Offline Contemplation Journal & Bookmark Drawer** (`components/SavedVersesDrawer.tsx`)
  - Bookmark favorite verses with 1 click.
  - Take personal contemplative notes per verse stored securely in `localStorage`.
  - Export reflections as a formatted Markdown journal.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 15 (App Router, Server Components), React 19, TypeScript, Tailwind CSS v4, Three.js, Framer Motion, Lucide Icons, Serwist PWA |
| **Backend** | FastAPI (Python 3.12), Pydantic v2, HTTPX Async Connection Pool, Groq Python SDK, Supabase Python Client |
| **Database & Auth** | Supabase (PostgreSQL with Row Level Security, pgvector, HNSW indexing) |
| **Inference Engine** | Groq Cloud API (`llama3-70b-8192`) + Zero-Credit Local Vedantic Engine |
| **Hosting ($0 Free Tier)** | Vercel (Frontend) + Render / Fly.io (Backend) + Supabase (Database) + Groq (Free Tier) |

---

## 🚀 Quick Start

### 1. Run the Frontend (Next.js 15)
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Run the Backend (FastAPI Python - Optional)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Interactive API documentation is available at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env.local` - Optional)
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=llama3-70b-8192
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (`backend/.env` - Optional)
```env
ENVIRONMENT=development
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=llama3-70b-8192
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

---

## 📜 Database & pgvector Setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** and execute the migration file:
   `supabase/migrations/001_initial_schema.sql`
3. This creates:
   - `vector` extension & `verse_embeddings` table with `vector(1536)`
   - Fast HNSW cosine similarity index
   - `match_verses` RPC search function
   - `mentor_sessions` conversation history table
   - Row Level Security (RLS) policies

---

## 📦 Production Deployment ($0.00 Free Tier)

- **Frontend (Vercel)**:
  1. Push repository to GitHub.
  2. Import `frontend/` directory into Vercel.
  3. Deploy.
- **Backend (Render / Fly.io)**:
  - **Render**: Connect repository using included `backend/render.yaml`.
  - **Fly.io**: Run `fly launch` using included `backend/fly.toml` and `backend/Dockerfile`.

---

## 📄 License

MIT © Dharma.OS

