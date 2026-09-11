import { supabase } from '../client_config';
import { ROUND2_PROBLEM_STATEMENTS, Round2ProblemStatement } from '../components/pages/ProblemStatementsPage';
import { 
  findQualifiedTeamByName, 
  findQualifiedTeamByEmail,
  findQualifiedTeamBySquadId,
  QualifiedTeamRecord
} from './teamPortalService';

export const STRICT_CAP_PER_TRACK = 10;
export const SELECTIONS_KEY = 'hpl-round2-ps-selections';
export const OVERFLOW_KEY = 'hpl-round2-overflow-teams';

// Row shape for the dedicated `round2_ps_selections` Supabase table
export interface Round2PsSelectionRow {
  id?: string;
  squad_id: string;
  team_name: string;
  leader_name?: string;
  leader_email: string;
  leader_phone?: string;
  college?: string;
  team_size?: number;
  member2_name?: string;
  member2_email?: string;
  member3_name?: string;
  member3_email?: string;
  member4_name?: string;
  member4_email?: string;
  member5_name?: string;
  member5_email?: string;
  ps_id?: string;
  ps_title?: string;
  ps_code?: string;
  locked_at?: string;
  rank?: number;
}

export interface LockedTeamRecord {
  squadId: string;
  teamName: string;
  leaderEmail: string;
  rank: number;
  psId: string;
  psTitle: string;
  psCode: string;
  lockedAt?: string;
  isReSelected?: boolean;
}

export interface OverflowTeamRecord {
  squadId: string;
  teamName: string;
  leaderEmail: string;
  rank: number;
  originalPsId: string;
  originalPsTitle: string;
  originalPsCode: string;
  hasOneTimeReSelection: boolean;
  reSelectionUsed: boolean;
  newPsId?: string;
}

export interface AllocationState {
  lockedMap: Record<string, LockedTeamRecord>; // keyed by squadId
  trackCounts: Record<string, number>; // ps-01..ps-04, each strictly <= 10
  overflowMap: Record<string, OverflowTeamRecord>; // keyed by squadId
  overflowList: OverflowTeamRecord[];
  totalLocked: number;
  totalPendingReSelection: number;
}


// ─────────────────────────────────────────────────────────────────────────────
// Supabase: Fetch Round 2 PS selections from the dedicated table
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch ALL Round 2 PS selections from `round2_ps_selections`.
 * This is the ONLY source of truth — completely separate from `registrations`.
 */
export async function fetchRound2PsSelectionsFromDB(): Promise<Round2PsSelectionRow[]> {
  try {
    const { data, error } = await supabase
      .from('round2_ps_selections')
      .select('squad_id, team_name, leader_email, ps_id, ps_title, ps_code, locked_at, rank')
      .order('locked_at', { ascending: true });
    if (error) {
      console.error('[HPL] fetch round2_ps_selections error:', error.message);
      return [];
    }
    return (data as Round2PsSelectionRow[]) || [];
  } catch (err) {
    console.error('[HPL] fetch round2_ps_selections exception:', err);
    return [];
  }
}

/**
 * Fetch the Round 2 PS selection for ONE team (by leader email).
 */
export async function fetchMyRound2PsSelection(leaderEmail: string): Promise<Round2PsSelectionRow | null> {
  try {
    const { data, error } = await supabase
      .from('round2_ps_selections')
      .select('*')
      .ilike('leader_email', leaderEmail.trim())
      .maybeSingle();
    if (error) {
      console.error('[HPL] fetchMyRound2PsSelection error:', error.message);
      return null;
    }
    return data as Round2PsSelectionRow | null;
  } catch (err) {
    console.error('[HPL] fetchMyRound2PsSelection exception:', err);
    return null;
  }
}

/**
 * Upsert team roster and details directly to `round2_ps_selections`.
 * Invoked when team clicks "Save Team Details" / "Next".
 */
export async function saveRound2TeamRoster(
  roster: Partial<Round2PsSelectionRow> & { leader_email: string; squad_id: string; team_name: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const cleanEmail = roster.leader_email.trim().toLowerCase();
    const payload = {
      ...roster,
      leader_email: cleanEmail,
    };

    const { error } = await supabase
      .from('round2_ps_selections')
      .upsert(payload, { onConflict: 'leader_email' });

    if (error) {
      console.error('[HPL] saveRound2TeamRoster error:', error.message);
      return { success: false, error: error.message };
    }

    console.log(`[HPL] ✅ Saved team roster to round2_ps_selections for ${roster.team_name}`);
    return { success: true };
  } catch (err: any) {
    console.error('[HPL] saveRound2TeamRoster exception:', err);
    return { success: false, error: err?.message || 'Server error' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// localStorage helpers (fast-path backup for UI)
// ─────────────────────────────────────────────────────────────────────────────

export function readRawSelections(): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(SELECTIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function readOverflowRecords(): Record<string, OverflowTeamRecord> {
  try {
    const raw = window.localStorage.getItem(OVERFLOW_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveOverflowRecords(records: Record<string, OverflowTeamRecord>) {
  try {
    window.localStorage.setItem(OVERFLOW_KEY, JSON.stringify(records));
  } catch (e) {
    console.warn('Failed to save overflow records:', e);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Allocation calculation — uses ONLY round2_ps_selections DB rows
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate strictly capped Round 2 allocations from `round2_ps_selections` rows.
 * FIFO by locked_at. Max 10 per PS. Overflow teams get one-time re-selection.
 *
 * NOTE: dbRows should come from fetchRound2PsSelectionsFromDB().
 *       The second param is kept for API compatibility but ignored.
 */
export function calculateStrictAllocations(
  dbRows: Round2PsSelectionRow[] = [],
  _unused: Record<string, string> = {}
): AllocationState {
  const existingOverflow = readOverflowRecords();

  const candidatesByPs: Record<string, Array<{
    team: QualifiedTeamRecord;
    ps: Round2ProblemStatement;
    lockedAt: number;
  }>> = {
    'ps-01': [],
    'ps-02': [],
    'ps-03': [],
    'ps-04': [],
  };

  const processedSquads = new Set<string>();

  // Build candidates from the dedicated round2_ps_selections rows
  dbRows.forEach(row => {
    const ps = ROUND2_PROBLEM_STATEMENTS.find(p => p.id === row.ps_id);
    if (!ps || !candidatesByPs[ps.id]) return;

    const team = findQualifiedTeamBySquadId(row.squad_id) ||
                 findQualifiedTeamByEmail(row.leader_email) ||
                 findQualifiedTeamByName(row.team_name);
    if (!team || processedSquads.has(team.squadId)) return;

    const lockedAt = row.locked_at ? new Date(row.locked_at).getTime() : Date.now();
    candidatesByPs[ps.id].push({ team, ps, lockedAt });
    processedSquads.add(team.squadId);
  });

  // Fallback: If localStorage selections are provided, also incorporate them
  if (_unused && typeof _unused === 'object') {
    Object.entries(_unused).forEach(([key, psId]) => {
      const team = findQualifiedTeamBySquadId(key) || findQualifiedTeamByName(key);
      if (!team || processedSquads.has(team.squadId)) return;

      const normalizedPsId = psId.replace('track-', 'ps-');
      const ps = ROUND2_PROBLEM_STATEMENTS.find(p => p.id === normalizedPsId);
      if (ps && candidatesByPs[ps.id]) {
        candidatesByPs[ps.id].push({ team, ps, lockedAt: Date.now() });
        processedSquads.add(team.squadId);
      }
    });
  }

  const lockedMap: Record<string, LockedTeamRecord> = {};
  const overflowMap: Record<string, OverflowTeamRecord> = { ...existingOverflow };
  const trackCounts: Record<string, number> = {
    'ps-01': 0,
    'ps-02': 0,
    'ps-03': 0,
    'ps-04': 0,
  };

  // For each PS: sort by locked_at (FIFO) then team rank, keep max 10
  Object.keys(candidatesByPs).forEach(psId => {
    const list = candidatesByPs[psId];

    list.sort((a, b) => {
      if (a.lockedAt !== b.lockedAt) return a.lockedAt - b.lockedAt;
      return a.team.rank - b.team.rank;
    });

    list.forEach(({ team, ps, lockedAt }, idx) => {
      if (idx < STRICT_CAP_PER_TRACK) {
        lockedMap[team.squadId] = {
          squadId: team.squadId,
          teamName: team.teamName,
          leaderEmail: team.leaderEmail,
          rank: team.rank,
          psId: ps.id,
          psTitle: ps.title,
          psCode: ps.psCode,
          lockedAt: lockedAt ? new Date(lockedAt).toISOString() : undefined,
        };
        trackCounts[ps.id]++;

        if (overflowMap[team.squadId] && overflowMap[team.squadId].originalPsId !== ps.id) {
          overflowMap[team.squadId].reSelectionUsed = true;
          overflowMap[team.squadId].newPsId = ps.id;
        }
      } else {
        // Over the 10-team cap → overflow
        const prev = overflowMap[team.squadId];
        overflowMap[team.squadId] = {
          squadId: team.squadId,
          teamName: team.teamName,
          leaderEmail: team.leaderEmail,
          rank: team.rank,
          originalPsId: ps.id,
          originalPsTitle: ps.title,
          originalPsCode: ps.psCode,
          hasOneTimeReSelection: true,
          reSelectionUsed: prev?.reSelectionUsed || false,
          newPsId: prev?.newPsId,
        };
      }
    });
  });

  const overflowList = Object.values(overflowMap).filter(o => !o.reSelectionUsed);
  const totalLocked = Object.keys(lockedMap).length;

  return { lockedMap, trackCounts, overflowMap, overflowList, totalLocked, totalPendingReSelection: overflowList.length };
}

/**
 * Filter problem statements to ONLY show those that have available capacity (< 10).
 * Once a problem statement reaches 10 teams, it is completely REMOVED from the list!
 */
export function getPendingProblemStatements(trackCounts: Record<string, number>): Round2ProblemStatement[] {
  return ROUND2_PROBLEM_STATEMENTS.filter(ps => {
    const count = trackCounts[ps.id] || 0;
    return count < STRICT_CAP_PER_TRACK;
  });
}

/**
 * Validate whether a team can lock into a problem statement.
 */
export function validateLockEligibility(
  psId: string,
  trackCounts: Record<string, number>,
  squadId: string,
  currentLockedMap: Record<string, LockedTeamRecord>
): { allowed: boolean; error?: string } {
  // If the team is already locked to THIS exact PS, allow
  if (currentLockedMap[squadId]?.psId === psId) {
    return { allowed: true };
  }

  const currentCount = trackCounts[psId] || 0;
  if (currentCount >= STRICT_CAP_PER_TRACK) {
    return {
      allowed: false,
      error: `This problem statement has reached its maximum limit of ${STRICT_CAP_PER_TRACK} teams. It is now closed. Please select an available track.`
    };
  }

  return { allowed: true };
}

/**
 * Lock a problem statement for a team.
 * Saves to localStorage, updates overflow tracking, and syncs to Supabase live.
 */
export async function lockProblemStatementSelection(
  team: QualifiedTeamRecord,
  psId: string,
  trackCounts: Record<string, number>,
  currentLockedMap: Record<string, LockedTeamRecord>
): Promise<{ success: boolean; error?: string }> {
  const validation = validateLockEligibility(psId, trackCounts, team.squadId, currentLockedMap);
  if (!validation.allowed) {
    return { success: false, error: validation.error };
  }

  const ps = ROUND2_PROBLEM_STATEMENTS.find(p => p.id === psId);
  if (!ps) {
    return { success: false, error: 'Invalid problem statement selected.' };
  }

  // 1. Update localStorage selections
  const currentSelections = readRawSelections();
  const nextSelections = {
    ...currentSelections,
    [team.squadId]: ps.id,
    [team.teamName]: ps.id,
    [`squad-${team.rank}`]: ps.id
  };
  window.localStorage.setItem(SELECTIONS_KEY, JSON.stringify(nextSelections));

  // 2. If this team was an overflow team, mark their one-time re-selection as USED!
  const overflowRecords = readOverflowRecords();
  if (overflowRecords[team.squadId]) {
    overflowRecords[team.squadId].reSelectionUsed = true;
    overflowRecords[team.squadId].newPsId = ps.id;
    saveOverflowRecords(overflowRecords);
  }

  // 3. Dispatch global sync event
  window.dispatchEvent(new Event('hpl-selection-update'));

  // 4. Upsert into `round2_ps_selections` — the dedicated Round 2 table
  const row: Round2PsSelectionRow = {
    squad_id: team.squadId,
    team_name: team.teamName,
    leader_email: team.leaderEmail.toLowerCase().trim(),
    ps_id: ps.id,
    ps_title: ps.title,
    ps_code: ps.psCode,
    locked_at: new Date().toISOString(),
    rank: team.rank,
  };

  try {
    const { error: upsertError } = await supabase
      .from('round2_ps_selections')
      .upsert(row, { onConflict: 'leader_email' });

    if (upsertError) {
      console.error('[HPL] round2_ps_selections upsert failed:', upsertError.message, upsertError.code);
      // Still return success — localStorage has it saved
    } else {
      console.log(`[HPL] ✅ Round 2 PS locked in DB: ${team.teamName} → ${ps.title}`);
    }
  } catch (err) {
    console.error('[HPL] round2_ps_selections upsert exception:', err);
  }

  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin: Sync cap enforcement — remove overflow teams from round2_ps_selections
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Remove overflow teams from round2_ps_selections so they can re-select.
 */
export async function syncCapEnforcementToSupabase(overflowList: OverflowTeamRecord[]) {
  const pendingOverflow = overflowList.filter(o => !o.reSelectionUsed);
  if (pendingOverflow.length === 0) return;

  try {
    for (const overflow of pendingOverflow) {
      await supabase
        .from('round2_ps_selections')
        .delete()
        .eq('squad_id', overflow.squadId);
    }
    console.log(`[HPL] Cleared ${pendingOverflow.length} overflow teams from round2_ps_selections`);
  } catch (err) {
    console.error('[HPL] syncCapEnforcement failed:', err);
  }
}

/**
 * Admin: Reset ALL Round 2 PS selections from the DB.
 */
export async function resetAllRound2Selections(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('round2_ps_selections')
      .delete()
      .neq('squad_id', '');  // matches all rows
    if (error) {
      console.error('[HPL] resetAllRound2Selections failed:', error.message);
      return false;
    }
    console.log('[HPL] All Round 2 PS selections cleared from DB.');
    return true;
  } catch (err) {
    console.error('[HPL] resetAllRound2Selections exception:', err);
    return false;
  }
}
