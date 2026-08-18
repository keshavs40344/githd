-- Dharma.OS Initial Schema
-- Run in Supabase SQL Editor

-- Enable pgvector
create extension if not exists vector;

-- Mentor conversation history
create table if not exists public.mentor_sessions (
    id uuid primary key default gen_random_uuid(),
    problem_description text not null,
    dominant_guna text not null check (dominant_guna in ('Sattva', 'Rajas', 'Tamas')),
    root_cause_analysis text not null,
    target_shloka text not null,
    sanskrit_excerpt text not null,
    strategic_action_plan text not null,
    model text not null,
    execution_time_ms float not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Verse embeddings for future RAG
create table if not exists public.verse_embeddings (
    id uuid primary key default gen_random_uuid(),
    chapter integer not null,
    verse integer not null,
    content text not null,
    embedding vector(1536),
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(chapter, verse)
);

-- HNSW index for fast similarity search
create index if not exists verse_embeddings_hnsw_idx
on public.verse_embeddings
using hnsw (embedding vector_cosine_ops)
with (m = 16, ef_construction = 64);

-- RPC for similarity search
create or replace function match_verses(
    query_embedding vector(1536),
    match_threshold float default 0.6,
    match_count int default 5
)
returns table (
    id uuid,
    chapter integer,
    verse integer,
    content text,
    metadata jsonb,
    similarity float
)
language sql stable
as $$
    select
        ve.id,
        ve.chapter,
        ve.verse,
        ve.content,
        ve.metadata,
        1 - (ve.embedding <=> query_embedding) as similarity
    from public.verse_embeddings ve
    where 1 - (ve.embedding <=> query_embedding) > match_threshold
    order by similarity desc
    limit match_count;
$$;

-- Row Level Security (open read, insert for all — no auth gating)
alter table public.mentor_sessions enable row level security;
alter table public.verse_embeddings enable row level security;

create policy "Anyone can read mentor sessions" on public.mentor_sessions for select using (true);
create policy "Anyone can insert mentor sessions" on public.mentor_sessions for insert with check (true);
create policy "Anyone can read verse embeddings" on public.verse_embeddings for select using (true);
