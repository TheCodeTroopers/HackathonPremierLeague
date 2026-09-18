create table if not exists public.team_drive_links (
    team_id uuid primary key references public.round2_ps_selections(id) on delete cascade,
    drive_link text not null
);

alter table public.team_drive_links enable row level security;

-- The current team login uses a client-side localStorage session rather than
-- Supabase Auth, so auth.uid() cannot identify a team for ownership policies.
-- These policies preserve the existing anonymous Supabase access model.
create policy "Allow existing team portal reads"
    on public.team_drive_links
    for select
    to anon, authenticated
    using (true);

create policy "Allow existing team portal inserts"
    on public.team_drive_links
    for insert
    to anon, authenticated
    with check (true);

create policy "Allow existing team portal updates"
    on public.team_drive_links
    for update
    to anon, authenticated
    using (true)
    with check (true);
