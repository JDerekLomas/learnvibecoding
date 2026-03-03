-- Teams: group of learners with a shared invite link
create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  creator_name text not null,
  created_at timestamptz default now()
);

-- Team members: people who joined a team
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references teams(id) on delete cascade,
  name text not null,
  created_at timestamptz default now(),
  unique (team_id, name)
);

-- Progress events: append-only log of step completions
create table if not exists progress_events (
  id uuid primary key default gen_random_uuid(),
  team_member_id uuid not null references team_members(id) on delete cascade,
  step text not null check (step in ('discover', 'assess', 'learn', 'practice', 'share')),
  status text not null check (status in ('started', 'completed')),
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- Indexes for common queries
create index if not exists idx_team_members_team_id on team_members(team_id);
create index if not exists idx_progress_events_member on progress_events(team_member_id);
create index if not exists idx_teams_slug on teams(slug);

-- RLS: open read/write for v1 (anon key access)
alter table teams enable row level security;
alter table team_members enable row level security;
alter table progress_events enable row level security;

create policy "teams_public_read" on teams for select using (true);
create policy "teams_public_insert" on teams for insert with check (true);

create policy "team_members_public_read" on team_members for select using (true);
create policy "team_members_public_insert" on team_members for insert with check (true);

create policy "progress_events_public_read" on progress_events for select using (true);
create policy "progress_events_public_insert" on progress_events for insert with check (true);
