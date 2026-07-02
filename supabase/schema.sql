-- AppTech Hub — Supabase schema
-- Run this in the Supabase SQL editor (or `supabase db push`) before running seed.ts.

create extension if not exists "pgcrypto";

-- Master catalog of app-tech (reward) apps.
create table if not exists public.apps (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  icon_url text not null,
  reward_method text not null,
  reward_summary text not null,
  daily_max_reward integer not null default 0,
  monthly_max_reward integer not null default 0,
  description text not null default '',
  pros text[] not null default '{}',
  cons text[] not null default '{}',
  -- Ordered steps a user follows to actually earn the reward. Difficulty is
  -- not stored separately — it's derived from step count (see src/lib/difficulty.ts)
  -- so the two can never drift out of sync.
  earn_steps text[] not null default '{}',
  play_store_url text,
  app_store_url text,
  rating numeric(2, 1) not null default 4.5,
  download_count_label text not null default '',
  created_at timestamptz not null default now()
);

-- Per-user selection of which apps they use, synced across devices.
create table if not exists public.user_selected_apps (
  user_id uuid not null references auth.users (id) on delete cascade,
  app_id uuid not null references public.apps (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, app_id)
);

alter table public.apps enable row level security;
alter table public.user_selected_apps enable row level security;

-- Anyone signed in can read the app catalog.
create policy "apps are readable by authenticated users"
  on public.apps for select
  to authenticated
  using (true);

-- Users can only see/manage their own selections.
create policy "users can read their own selections"
  on public.user_selected_apps for select
  to authenticated
  using (auth.uid() = user_id);

create policy "users can insert their own selections"
  on public.user_selected_apps for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "users can delete their own selections"
  on public.user_selected_apps for delete
  to authenticated
  using (auth.uid() = user_id);
