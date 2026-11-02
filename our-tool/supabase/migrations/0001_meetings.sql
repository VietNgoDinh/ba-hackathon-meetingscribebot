-- Saved minutes: one row per saved MoM. Paste this into the Supabase SQL Editor and run it once.
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null default '',
  mode text not null check (mode in ('live', 'sample')),
  prompt_version text not null default '',
  model text not null default '',
  generated_at text not null default '',
  dropped_count integer not null default 0,
  replaced_count integer not null default 0,
  items jsonb not null
);

-- Row Level Security on, and no policy for the public keys: the browser and anonymous
-- visitors cannot read or write this table. Only the server, using the secret key, can.
alter table public.meetings enable row level security;
revoke all on public.meetings from anon, authenticated;
