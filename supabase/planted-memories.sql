-- Run this once in the Supabase SQL editor for your project.

create table if not exists public.planted_memories (
  id text primary key,
  song_id text not null,
  message text not null,
  date text not null,
  flower integer not null check (flower between 1 and 5),
  x double precision not null,
  y double precision not null,
  size integer not null,
  created_at timestamptz not null default now()
);

create index if not exists planted_memories_created_at_idx
  on public.planted_memories (created_at);

alter table public.planted_memories enable row level security;

-- The Next.js API uses the service role key, which bypasses RLS.
-- These policies are here if you later read/write with the anon key.
create policy "Anyone can read planted memories"
  on public.planted_memories
  for select
  using (true);

create policy "Anyone can plant a memory"
  on public.planted_memories
  for insert
  with check (true);
