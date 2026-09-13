-- Supabase Schema Dump (Generated from provided table structures)

-- Table: registrations
CREATE TABLE IF NOT EXISTS public.registrations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    team_name text,
    track text,
    team_leader_name text,
    leader_email text,
    leader_phone text,
    college text,
    team_size integer,
    member2_name text,
    member2_email text,
    member3_name text,
    member3_email text,
    member4_name text,
    member4_email text,
    project_idea text,
    github_org text,
    accept_rules boolean,
    member5_name text,
    member5_email text
);

-- Table: round2_ps_selections
CREATE TABLE IF NOT EXISTS public.round2_ps_selections (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    squad_id text,
    team_name text,
    leader_name text,
    leader_email text UNIQUE,
    leader_phone text,
    college text,
    team_size integer,
    member2_name text,
    member2_email text,
    member3_name text,
    member3_email text,
    member4_name text,
    member4_email text,
    member5_name text,
    member5_email text,
    ps_id text,
    ps_title text,
    ps_code text,
    locked_at timestamp with time zone,
    rank integer,
    team_password text
);

-- Table: evaluations (Week-by-week team evaluation marks and feedback)
CREATE TABLE IF NOT EXISTS public.evaluations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    squad_id text NOT NULL,
    team_name text NOT NULL,
    ps_id text NOT NULL,
    week text NOT NULL DEFAULT 'week1',
    marks numeric DEFAULT 0,
    feedback text DEFAULT '',
    graded_by text DEFAULT 'admin',
    CONSTRAINT unique_squad_week UNIQUE (squad_id, week)
);

-- Index for high performance queries on leaderboard and admin pages
CREATE INDEX IF NOT EXISTS idx_evaluations_ps_week ON public.evaluations(ps_id, week);
CREATE INDEX IF NOT EXISTS idx_evaluations_squad_week ON public.evaluations(squad_id, week);

-- Enable RLS
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read evaluations for the live public leaderboard
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'evaluations' AND policyname = 'Allow public read access for evaluations'
    ) THEN
        CREATE POLICY "Allow public read access for evaluations" ON public.evaluations FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'evaluations' AND policyname = 'Allow public insert and update for evaluations'
    ) THEN
        CREATE POLICY "Allow public insert and update for evaluations" ON public.evaluations FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;
