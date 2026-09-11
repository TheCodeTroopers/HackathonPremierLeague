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
    { rank: 20, squadId: 'HPL-R2-20', teamName: 'Code Warriors', leaderEmail: 'niha.23cs081@sode-edu.in', initialPassword: 'HPL20-CODE!' },
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
    const normName = cleanName.replace(/[^a-zA-Z0-9]/g, '');
    return OFFICIAL_QUALIFIED_TEAMS.find(t => {
        const tClean = t.teamName.toLowerCase();
        const tNorm = tClean.replace(/[^a-zA-Z0-9]/g, '');
        return tClean === cleanName || tNorm === normName;
    }) || null;
}

const CREDENTIALS_KEY = 'hpl-round2-team-credentials';
type CredentialMap = Record<string, string>;

export async function findTeamRegistration(teamName: string, leaderEmail?: string): Promise<TeamRegistration | null> {
    if (leaderEmail) {
        try {
            const byEmail = await findTeamRegistrationByEmail(leaderEmail);
            if (byEmail) return byEmail;
        } catch {
            // continue to name lookup
        }
    }

    if (!teamName) return null;

    try {
        const { data, error } = await supabase
            .from('registrations')
            .select('id, team_name, team_leader_name, leader_email, leader_phone, college, team_size, member2_name, member2_email, member3_name, member3_email, member4_name, member4_email, member5_name, member5_email, project_idea, github_org')
            .ilike('team_name', teamName.trim())
            .maybeSingle();

        if (!error && data) return data as TeamRegistration;
    } catch {
        // continue to normalized search
    }

    // Normalized lookup (handles missing spaces or slight typos like Vajra Yield vs VajraYield)
    try {
        const norm = teamName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const { data: allTeams } = await supabase
            .from('registrations')
            .select('id, team_name, team_leader_name, leader_email, leader_phone, college, team_size, member2_name, member2_email, member3_name, member3_email, member4_name, member4_email, member5_name, member5_email, project_idea, github_org');
        
        if (allTeams && allTeams.length > 0) {
            const matched = allTeams.find((r: any) => {
                const rNorm = (r.team_name || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                return rNorm === norm || (leaderEmail && (r.leader_email || '').toLowerCase() === leaderEmail.toLowerCase());
            });
            if (matched) return matched as TeamRegistration;
        }
    } catch (e) {
        console.warn('Normalized team lookup error:', e);
    }

    return null;
}

export async function findTeamRegistrationByEmail(email: string): Promise<TeamRegistration | null> {
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabase
        .from('registrations')
        .select('id, team_name, team_leader_name, leader_email, leader_phone, college, team_size, member2_name, member2_email, member3_name, member3_email, member4_name, member4_email, member5_name, member5_email, project_idea, github_org')
        .ilike('leader_email', cleanEmail)
        .maybeSingle();

    if (error) {
        // In case multiple rows exist (e.g. duplicates), return the latest one
        const { data: list } = await supabase
            .from('registrations')
            .select('id, team_name, team_leader_name, leader_email, leader_phone, college, team_size, member2_name, member2_email, member3_name, member3_email, member4_name, member4_email, member5_name, member5_email, project_idea, github_org')
            .ilike('leader_email', cleanEmail)
            .order('created_at', { ascending: false });
        if (list && list.length > 0) return list[0] as TeamRegistration;
        return null;
    }
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

/**
 * Hashes a plaintext password using SHA-256 via Web Crypto API.
 */
export async function hashPassword(password: string): Promise<string> {
    const clean = (password || '').trim();
    if (!clean) return '';
    const msgBuffer = new TextEncoder().encode(clean);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Returns true if the string appears to be a 64-character SHA-256 hex string.
 */
export function isSha256Hash(val: string): boolean {
    return /^[a-f0-9]{64}$/i.test((val || '').trim());
}

/**
 * Verifies an entered password against a stored password (which may be a SHA-256 hash or plaintext legacy/default).
 */
export async function verifyTeamPassword(
    inputPassword: string,
    storedOrExpectedPassword: string
): Promise<boolean> {
    const cleanInput = (inputPassword || '').trim();
    const cleanStored = (storedOrExpectedPassword || '').trim();
    if (!cleanInput || !cleanStored) return false;

    // 1. Direct plaintext match (for official default passwords e.g. HPL01-APEX! or legacy unhashed)
    if (cleanInput === cleanStored) {
        return true;
    }

    // 2. Cryptographic SHA-256 hash match
    try {
        const inputHash = await hashPassword(cleanInput);
        if (inputHash.toLowerCase() === cleanStored.toLowerCase()) {
            return true;
        }
    } catch (e) {
        console.warn('Hash computation failed:', e);
    }

    return false;
}

export function getCustomStoredPassword(squadId: string): string | null {
    const credentials = readCredentials();
    const cleanKey = (squadId || '').trim().toLowerCase();
    if (credentials[squadId]) return credentials[squadId];
    if (credentials[cleanKey]) return credentials[cleanKey];
    const record = findQualifiedTeamBySquadId(squadId);
    if (record) {
        if (credentials[record.leaderEmail.toLowerCase()]) return credentials[record.leaderEmail.toLowerCase()];
        if (credentials[record.squadId]) return credentials[record.squadId];
        if (credentials[record.teamName]) return credentials[record.teamName];
    }
    return null;
}

export async function changeTeamPassword(squadId: string, newPassword: string): Promise<boolean> {
    const cleanPassword = newPassword.trim();
    const hashedPassword = await hashPassword(cleanPassword);
    const credentials = readCredentials();
    credentials[squadId] = hashedPassword;
    
    // Also save by alternate keys (e.g. normalized squadId, teamName, email) for robust lookup
    const record = findQualifiedTeamBySquadId(squadId);
    if (record) {
        credentials[record.squadId] = hashedPassword;
        credentials[record.teamName] = hashedPassword;
        credentials[record.leaderEmail.toLowerCase()] = hashedPassword;
    }
    writeCredentials(credentials);

    // Persist to Supabase backend table `round2_ps_selections` (HASHED!)
    try {
        const cleanEmail = record ? record.leaderEmail.toLowerCase().trim() : '';
        const filter = cleanEmail 
            ? `squad_id.eq.${squadId},leader_email.eq.${cleanEmail}` 
            : `squad_id.eq.${squadId}`;

        // 1. Check if a row already exists in round2_ps_selections
        const { data: existingRows } = await supabase
            .from('round2_ps_selections')
            .select('id')
            .or(filter)
            .limit(1);

        if (existingRows && existingRows.length > 0) {
            // Update existing row with HASHED password
            await supabase
                .from('round2_ps_selections')
                .update({ team_password: hashedPassword })
                .eq('id', existingRows[0].id);
        } else {
            // No row exists yet (e.g. changed password before selecting PS) -> insert new row with HASH
            const newRow: any = {
                squad_id: squadId,
                team_password: hashedPassword
            };
            if (record) {
                newRow.team_name = record.teamName;
                newRow.leader_email = cleanEmail;
                newRow.rank = record.rank;
            }
            const { error: insertErr } = await supabase
                .from('round2_ps_selections')
                .insert([newRow]);

            if (insertErr) {
                // If conflict or constraint, fallback to update
                await supabase
                    .from('round2_ps_selections')
                    .update({ team_password: hashedPassword })
                    .or(filter);
            }
        }

        console.log(`[HPL] ✅ Hashed password updated in Supabase round2_ps_selections for squad ${squadId}`);
        return true;
    } catch (err) {
        console.warn('[HPL] Could not sync changed password to Supabase:', err);
        return false;
    }
}

/**
 * Fetch changed team password from Supabase if it was updated in the backend.
 * Caches it locally so that subsequent lookups are instant.
 */
export async function fetchTeamPasswordFromDB(squadId: string, email?: string): Promise<string | null> {
    try {
        const cleanEmail = (email || '').trim().toLowerCase();
        const filter = cleanEmail 
            ? `squad_id.eq.${squadId},leader_email.eq.${cleanEmail}` 
            : `squad_id.eq.${squadId}`;

        const { data, error } = await supabase
            .from('round2_ps_selections')
            .select('team_password')
            .or(filter)
            .not('team_password', 'is', null)
            .limit(1);

        if (!error && data && data.length > 0 && data[0].team_password) {
            const pwd = data[0].team_password;
            const credentials = readCredentials();
            credentials[squadId] = pwd;
            if (cleanEmail) credentials[cleanEmail] = pwd;
            const record = findQualifiedTeamBySquadId(squadId);
            if (record) {
                credentials[record.teamName] = pwd;
                credentials[record.squadId] = pwd;
            }
            writeCredentials(credentials);
            return pwd;
        }
    } catch (e) {
        // Safe fallback if column does not exist or network unavailable
    }
    return null;
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
