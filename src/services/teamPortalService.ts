import { supabase } from '../client_config';

export interface TeamRegistration {
    id: string;
    team_name: string;
    team_leader_name: string;
    leader_email: string;
    leader_phone: string;
    college: string;
    team_size: number;
    member2_name?: string | null;
    member2_email?: string | null;
    member3_name?: string | null;
    member3_email?: string | null;
    member4_name?: string | null;
    member4_email?: string | null;
    member5_name?: string | null;
    member5_email?: string | null;
    project_idea?: string | null;
    github_org?: string | null;
}

const CREDENTIALS_KEY = 'hpl-round2-team-credentials';
type CredentialMap = Record<string, string>;

export async function findTeamRegistration(teamName: string): Promise<TeamRegistration | null> {
    const { data, error } = await supabase
        .from('registrations')
        .select('id, team_name, team_leader_name, leader_email, leader_phone, college, team_size, member2_name, member2_email, member3_name, member3_email, member4_name, member4_email, member5_name, member5_email, project_idea, github_org')
        .ilike('team_name', teamName)
        .maybeSingle();

    if (error) throw error;
    return data as TeamRegistration | null;
}

function readCredentials(): CredentialMap {
    try {
        const value = window.localStorage.getItem(CREDENTIALS_KEY);
        return value ? JSON.parse(value) as CredentialMap : {};
    } catch {
        return {};
    }
}

function writeCredentials(credentials: CredentialMap) {
    window.localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
}

export function getTeamPassword(squadId: string, teamName: string): string {
    const credentials = readCredentials();
    if (!credentials[squadId]) {
        const rank = squadId.split('-').pop() || '00';
        const teamCode = teamName.replace(/[^a-z0-9]/gi, '').slice(0, 4).toUpperCase() || 'TEAM';
        credentials[squadId] = `HPL${rank}-${teamCode}!`;
        writeCredentials(credentials);
    }
    return credentials[squadId];
}

export function changeTeamPassword(squadId: string, newPassword: string) {
    const credentials = readCredentials();
    credentials[squadId] = newPassword;
    writeCredentials(credentials);
}
