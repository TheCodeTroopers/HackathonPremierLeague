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
