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

export interface QualifiedTeamRecord {
    rank: number;
    squadId: string;
    teamName: string;
    leaderEmail: string;
    initialPassword: string;
}

export const OFFICIAL_QUALIFIED_TEAMS: QualifiedTeamRecord[] = [
    { rank: 1, squadId: 'HPL-R2-01', teamName: 'Apex Coders', leaderEmail: 'sridevi.25ad043@sode-edu.in', initialPassword: 'HPL01-APEX!' },
    { rank: 2, squadId: 'HPL-R2-02', teamName: 'Blue Streak', leaderEmail: 'sakshi.24ad040@sode-edu.in', initialPassword: 'HPL02-BLUE!' },
    { rank: 3, squadId: 'HPL-R2-03', teamName: 'Neuro Nexus', leaderEmail: 'pragna.25cs038@sode-edu.in', initialPassword: 'HPL03-NEUR!' },
    { rank: 4, squadId: 'HPL-R2-04', teamName: 'HackOrbit', leaderEmail: 'shashank.24cs137@sode-edu.in', initialPassword: 'HPL04-HACK!' },
    { rank: 5, squadId: 'HPL-R2-05', teamName: 'Pentacode', leaderEmail: 'ankitha.24ad002@sode-edu.in', initialPassword: 'HPL05-PENT!' },
    { rank: 6, squadId: 'HPL-R2-06', teamName: 'Arise', leaderEmail: 'preetham.25cs039@sode-edu.in', initialPassword: 'HPL06-ARIS!' },
    { rank: 7, squadId: 'HPL-R2-07', teamName: 'Rookie Coders', leaderEmail: 'gurukiran.25cs022@sode-edu.in', initialPassword: 'HPL07-ROOK!' },
    { rank: 8, squadId: 'HPL-R2-08', teamName: 'Team Ace', leaderEmail: 'chethan.23ai016@sode-edu.in', initialPassword: 'HPL08-TEAM!' },
    { rank: 9, squadId: 'HPL-R2-09', teamName: 'nyx', leaderEmail: 'anarghya.25cs011@sode-edu.in', initialPassword: 'HPL09-NYX!' },
    { rank: 10, squadId: 'HPL-R2-10', teamName: 'Vajra Yield', leaderEmail: 'vineeth.24cs181@sode-edu.in', initialPassword: 'HPL10-VAJR!' },
    { rank: 11, squadId: 'HPL-R2-11', teamName: 'So Called Engineer', leaderEmail: 'aditya.25cs001@sode-edu.in', initialPassword: 'HPL11-SOCA!' },
    { rank: 12, squadId: 'HPL-R2-12', teamName: 'wakanda forever', leaderEmail: 'anjan.23ad003@sode-edu.in', initialPassword: 'HPL12-WAKA!' },
    { rank: 13, squadId: 'HPL-R2-13', teamName: 'Bits and Bytes', leaderEmail: 'shivani.23cs144@sode-edu.in', initialPassword: 'HPL13-BITS!' },
    { rank: 14, squadId: 'HPL-R2-14', teamName: 'kisan mitra', leaderEmail: 'samhita.24cs126@sode-edu.in', initialPassword: 'HPL14-KISA!' },
    { rank: 15, squadId: 'HPL-R2-15', teamName: 'Kiawreckers', leaderEmail: 'shreyas.23cs155@sode-edu.in', initialPassword: 'HPL15-KIAW!' },
    { rank: 16, squadId: 'HPL-R2-16', teamName: 'Code Catalyst', leaderEmail: 'pratham.25cs078@sode-edu.in', initialPassword: 'HPL16-CODE!' },
    { rank: 17, squadId: 'HPL-R2-17', teamName: 'Code Raiders', leaderEmail: 'akash.23cs008@sode-edu.in', initialPassword: 'HPL17-CODE!' },
    { rank: 18, squadId: 'HPL-R2-18', teamName: 'Hackblaze', leaderEmail: 'suhas.24cs037@sode-edu.in', initialPassword: 'HPL18-HACK!' },
    { rank: 19, squadId: 'HPL-R2-19', teamName: 'NoobScripterS', leaderEmail: 'sathyendra.23cs140@sode-edu.in', initialPassword: 'HPL19-NOOB!' },
    { rank: 20, squadId: 'HPL-R2-20', teamName: 'Code Worrior', leaderEmail: 'niha.23cs081@sode-edu.in', initialPassword: 'HPL20-CODE!' },
    { rank: 21, squadId: 'HPL-R2-21', teamName: 'Tech Hive', leaderEmail: 'samanvitha.23cs132@sode-edu.in', initialPassword: 'HPL21-TECH!' },
    { rank: 22, squadId: 'HPL-R2-22', teamName: 'Innovators', leaderEmail: 'swati.25ai047@sode-edu.in', initialPassword: 'HPL22-INNO!' },
    { rank: 23, squadId: 'HPL-R2-23', teamName: 'tech avenue', leaderEmail: 'sujal.23ad053@sode-edu.in', initialPassword: 'HPL23-TECHA!' },
    { rank: 24, squadId: 'HPL-R2-24', teamName: 'Team Alpha', leaderEmail: 'bmvijetha705@gmail.com', initialPassword: 'HPL24-TEAM!' },
    { rank: 25, squadId: 'HPL-R2-25', teamName: 'Innovexa', leaderEmail: 'vihaan.24ai059@sode-edu.in', initialPassword: 'HPL25-INNO!' },
    { rank: 26, squadId: 'HPL-R2-26', teamName: 'abyss emarald', leaderEmail: 'kamath.23cs054@sode-edu.in', initialPassword: 'HPL26-ABYS!' },
    { rank: 27, squadId: 'HPL-R2-27', teamName: 'mind mesh', leaderEmail: 'rajiya.24cs113@sode-edu.in', initialPassword: 'HPL27-MIND!' },
    { rank: 28, squadId: 'HPL-R2-28', teamName: 'algo angels', leaderEmail: 'anushree.24cs017@sode-edu.in', initialPassword: 'HPL28-ALGO!' },
    { rank: 29, squadId: 'HPL-R2-29', teamName: 'team apex', leaderEmail: 'pramod.24ai033@sode-edu.in', initialPassword: 'HPL29-TEAM!' },
    { rank: 30, squadId: 'HPL-R2-30', teamName: 'AgroNex', leaderEmail: 'rohan.24cs117@sode-edu.in', initialPassword: 'HPL30-AGRO!' },
    { rank: 31, squadId: 'HPL-R2-31', teamName: 'agri innovators', leaderEmail: 'ankitha.25cs015@sode-edu.in', initialPassword: 'HPL31-AGRI!' },
    { rank: 32, squadId: 'HPL-R2-32', teamName: 'tattva tech', leaderEmail: 'seetharama.23cs177@sode-edu.in', initialPassword: 'HPL32-TATT!' },
    { rank: 33, squadId: 'HPL-R2-33', teamName: 'error404:not found', leaderEmail: 'milanraj.23cs071@sode-edu.in', initialPassword: 'HPL33-ERRO!' },
    { rank: 34, squadId: 'HPL-R2-34', teamName: 'team diffusion', leaderEmail: 'prathik.24ad030@sode-edu.in', initialPassword: 'HPL34-TEAM!' },
    { rank: 35, squadId: 'HPL-R2-35', teamName: 'event horizon hackers', leaderEmail: '19803chirag@gmail.com', initialPassword: 'HPL35-EVEN!' },
    { rank: 36, squadId: 'HPL-R2-36', teamName: 'Team Aaramb', leaderEmail: 'shriramakrishnabhat@gmail.com', initialPassword: 'HPL36-TEAM!' },
    { rank: 37, squadId: 'HPL-R2-37', teamName: 'phoenix', leaderEmail: 'sanjana.25cs095@sode-edu.in', initialPassword: 'HPL37-PHOE!' },
    { rank: 38, squadId: 'HPL-R2-38', teamName: 'hacksphere', leaderEmail: 'bhavana.23cs023@sode-edu.in', initialPassword: 'HPL38-HACK!' },
    { rank: 39, squadId: 'HPL-R2-39', teamName: 'pixel pioneers', leaderEmail: 'navaneeth.25cs060@sode-edu.in', initialPassword: 'HPL39-PIXE!' },
    { rank: 40, squadId: 'HPL-R2-40', teamName: 'gramltel ai', leaderEmail: 'monisha.24ad022@sode-edu.in', initialPassword: 'HPL40-GRAM!' },
    { rank: 41, squadId: 'HPL-R2-41', teamName: 'Dummy Test Team', leaderEmail: 'test@dummy.com', initialPassword: 'HPL41-DUMM!' }
];

export function findQualifiedTeamByEmail(email: string): QualifiedTeamRecord | null {
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();
    return OFFICIAL_QUALIFIED_TEAMS.find(t => t.leaderEmail.toLowerCase() === cleanEmail) || null;
}

export function findQualifiedTeamBySquadId(squadId: string): QualifiedTeamRecord | null {
    if (!squadId) return null;
    const cleanId = squadId.trim().toLowerCase();
    return OFFICIAL_QUALIFIED_TEAMS.find(t => 
        t.squadId.toLowerCase() === cleanId || 
        `squad-${t.rank}` === cleanId || 
        `hpl-r2-${String(t.rank).padStart(2, '0')}`.toLowerCase() === cleanId
    ) || null;
}

export function findQualifiedTeamByName(name: string): QualifiedTeamRecord | null {
    if (!name) return null;
    const cleanName = name.trim().toLowerCase();
    return OFFICIAL_QUALIFIED_TEAMS.find(t => t.teamName.toLowerCase() === cleanName) || null;
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

export async function findTeamRegistrationByEmail(email: string): Promise<TeamRegistration | null> {
    const { data, error } = await supabase
        .from('registrations')
        .select('id, team_name, team_leader_name, leader_email, leader_phone, college, team_size, member2_name, member2_email, member3_name, member3_email, member4_name, member4_email, member5_name, member5_email, project_idea, github_org')
        .ilike('leader_email', email)
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

export function getTeamPassword(squadIdOrEmail: string, teamName?: string): string {
    const credentials = readCredentials();
    const cleanKey = (squadIdOrEmail || '').trim().toLowerCase();

    // 1. Check if user changed password in settings (lookup by email, squadId, or teamName)
    if (credentials[squadIdOrEmail]) return credentials[squadIdOrEmail];
    if (credentials[cleanKey]) return credentials[cleanKey];

    // Find official qualified record by email, squadId, or name
    const record = findQualifiedTeamByEmail(cleanKey) || 
                   findQualifiedTeamBySquadId(squadIdOrEmail) || 
                   (teamName ? findQualifiedTeamByName(teamName) : null);

    if (record) {
        // Check if changed password exists for any record alias
        if (credentials[record.leaderEmail.toLowerCase()]) return credentials[record.leaderEmail.toLowerCase()];
        if (credentials[record.squadId]) return credentials[record.squadId];
        if (credentials[`squad-${record.rank}`]) return credentials[`squad-${record.rank}`];
        if (credentials[record.teamName]) return credentials[record.teamName];
        if (credentials[record.teamName.toLowerCase()]) return credentials[record.teamName.toLowerCase()];
        
        // Return official initial password
        return record.initialPassword;
    }

    // 3. Fallback
    const rank = squadIdOrEmail.split('-').pop() || '00';
    const teamCode = (teamName || 'TEAM').replace(/[^a-z0-9]/gi, '').slice(0, 4).toUpperCase();
    return `HPL${rank}-${teamCode}!`;
}

export function changeTeamPassword(squadId: string, newPassword: string) {
    const credentials = readCredentials();
    credentials[squadId] = newPassword;
    // Also save by alternate keys (e.g. normalized squadId and teamName) for robust lookup
    const record = findQualifiedTeamBySquadId(squadId);
    if (record) {
        credentials[record.squadId] = newPassword;
        credentials[record.teamName] = newPassword;
        credentials[record.leaderEmail.toLowerCase()] = newPassword;
    }
    writeCredentials(credentials);
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVE TEAM SESSION PERSISTENCE (Keeps team logged in)
// ─────────────────────────────────────────────────────────────────────────────
const SESSION_KEY = 'hpl-active-team-session';

export interface TeamSession {
    squadId: string;
    teamName: string;
    leaderEmail: string;
    rank: number;
}

export function saveActiveTeamSession(session: TeamSession) {
    try {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        window.dispatchEvent(new Event('hpl-team-session-update'));
    } catch (e) {
        console.error('Failed to save team session:', e);
    }
}

export function getActiveTeamSession(): TeamSession | null {
    try {
        const val = window.localStorage.getItem(SESSION_KEY);
        return val ? JSON.parse(val) as TeamSession : null;
    } catch {
        return null;
    }
}

export function clearActiveTeamSession() {
    try {
        window.localStorage.removeItem(SESSION_KEY);
        window.dispatchEvent(new Event('hpl-team-session-update'));
    } catch (e) {
        console.error('Failed to clear team session:', e);
    }
}
