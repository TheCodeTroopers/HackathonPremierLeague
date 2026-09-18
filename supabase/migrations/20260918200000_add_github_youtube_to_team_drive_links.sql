-- Add github_link and youtube_link columns to team_drive_links and allow flexible submission
alter table public.team_drive_links
alter column drive_link drop not null,
add column if not exists github_link text,
add column if not exists youtube_link text;
