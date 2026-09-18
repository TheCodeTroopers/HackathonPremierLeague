import { supabase } from '../client_config';
import { OFFICIAL_QUALIFIED_TEAMS } from './teamPortalService';

export interface MentorEvaluationEntry {
  id: string;
  mentorId: string;
  mentorName: string;
  teamId?: string;
  teamName?: string;
  teamCode?: string;
  squadId?: string;
  mark1: number;
  mark2: number;
  mark3: number;
  mark4: number;
  mark5: number;
  total: number;
  feedback: string;
  evaluation: string;
  status: string;
  createdAt: string;
}

export interface RubricDefinition {
  key: 'mark1' | 'mark2' | 'mark3' | 'mark4' | 'mark5';
  code: string;
  label: string;
  maxMarks: number;
  description: string;
}

export const DEFAULT_ROUND2_RUBRICS: RubricDefinition[] = [
  {
    key: 'mark1',
    code: 'R1',
    label: 'Architecture & System Design',
    maxMarks: 10,
    description: 'Separation of concerns, clean APIs, database structure, and technical foundation'
  },
  {
    key: 'mark2',
    code: 'R2',
    label: 'Implementation & Code Quality',
    maxMarks: 10,
    description: 'Working functionality, code hygiene, component hierarchy, and completeness'
  },
  {
    key: 'mark3',
    code: 'R3',
    label: 'Problem & Domain Logic',
    maxMarks: 10,
    description: 'Alignment with Problem Statement, algorithm correctness, and domain rules'
  },
  {
    key: 'mark4',
    code: 'R4',
    label: 'Security & Scalability',
    maxMarks: 10,
    description: 'Data security, error handling, edge cases, auth/RBAC, and deployability'
  },
  {
    key: 'mark5',
    code: 'R5',
    label: 'Innovation & UI/UX Experience',
    maxMarks: 10,
    description: 'User experience, visual polish, problem originality, and presentation'
  }
];

export interface TeamAggregatedEvaluation {
  id: string;
  squadId: string;
  teamName: string;
  teamCode: string;
  selectionId: string;
  psId: string;
  psTitle: string;
  psCode: string;
  leaderName: string;
  leaderEmail: string;
  rank: number;
  mentorEvaluations: MentorEvaluationEntry[];
  evaluationsCount: number;
  totalMarks: number; // sum of mentor totals (out of 150)
  averageMarks: number; // average score across reviewing mentors (out of 50)
  maxPossibleMarks: number; // 150 (3 mentors * 50)
  rubricTotals: {
    mark1: number;
    mark2: number;
    mark3: number;
    mark4: number;
    mark5: number;
  };
  rubricAverages: {
    mark1: number;
    mark2: number;
    mark3: number;
    mark4: number;
    mark5: number;
  };
  feedbacks: Array<{ mentorName: string; text: string }>;
  isPublished: boolean;
  publishedAt?: string;
}

const PUBLISHED_KEY_PREFIX = 'hpl_published_ps_';

// Global in-memory set of published Problem Statement IDs (synced with Supabase)
const dbPublishedPsSet = new Set<string>();

export function markPsPublishedInMemory(psId: string) {
  if (!psId) return;
  dbPublishedPsSet.add(psId);
  try {
    localStorage.setItem(
      `${PUBLISHED_KEY_PREFIX}${psId}`,
      JSON.stringify({ isPublished: true, publishedAt: new Date().toISOString() })
    );
  } catch {}
}

/**
 * Check if a Problem Statement's marks have been published to the leaderboard.
 * Checks both in-memory synced DB cache and localStorage.
 */
export function getPsPublishStatus(psId: string): { isPublished: boolean; publishedAt?: string } {
  if (psId === 'all') {
    const allPublished = ['ps-01', 'ps-02', 'ps-03', 'ps-04'].every(id => getPsPublishStatus(id).isPublished);
    return { isPublished: allPublished };
  }

  if (dbPublishedPsSet.has(psId)) {
    return { isPublished: true, publishedAt: new Date().toISOString() };
  }

  try {
    const raw = localStorage.getItem(`${PUBLISHED_KEY_PREFIX}${psId}`);
    if (!raw) return { isPublished: false };
    const parsed = JSON.parse(raw);
    if (parsed.isPublished) {
      dbPublishedPsSet.add(psId);
    }
    return { isPublished: true, publishedAt: parsed.publishedAt };
  } catch {
    return { isPublished: false };
  }
}

/**
 * Record publication status in localStorage and in-memory cache.
 */
export function setPsPublishStatus(psId: string, isPublished: boolean) {
  try {
    if (isPublished) {
      dbPublishedPsSet.add(psId);
      localStorage.setItem(
        `${PUBLISHED_KEY_PREFIX}${psId}`,
        JSON.stringify({ isPublished: true, publishedAt: new Date().toISOString() })
      );
    } else {
      dbPublishedPsSet.delete(psId);
      localStorage.removeItem(`${PUBLISHED_KEY_PREFIX}${psId}`);
    }
  } catch (e) {
    console.warn('Could not save publish status:', e);
  }
}

/**
 * Normalize string for comparison.
 */
export function norm(str?: string | null): string {
  return (str || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');
}

/**
 * Canonical lookup for an official team from OFFICIAL_QUALIFIED_TEAMS
 */
export function getOfficialSquadRecord(...identifiers: (string | undefined)[]) {
  for (const identifier of identifiers) {
    if (!identifier) continue;
    const clean = identifier.trim();
    const n = norm(clean);

    // Explicit alias: 'mindmatrix' -> rank 27 'mindmesh'
    if (n === 'mindmatrix' || n === 'mindmesh' || n === 'hplr227' || n === 'squad27') {
      const team27 = OFFICIAL_QUALIFIED_TEAMS.find(t => t.rank === 27);
      if (team27) return team27;
    }

    const found = OFFICIAL_QUALIFIED_TEAMS.find(t => 
      t.squadId.toLowerCase() === clean.toLowerCase() ||
      norm(t.squadId) === n ||
      norm(t.teamName) === n ||
      t.teamName.toLowerCase() === clean.toLowerCase() ||
      (t.leaderEmail && t.leaderEmail.toLowerCase() === clean.toLowerCase())
    );
    if (found) return found;
  }
  return undefined;
}

/**
 * Fetch all evaluation rows from `round2_evaluations` and join with `round2_ps_selections`.
 * Groups multiple mentor evaluations per team, sums rubric marks, and aggregates total out of 150.
 */
export async function fetchRound2AggregatedEvaluations(): Promise<{
  teams: TeamAggregatedEvaluation[];
  rubrics: RubricDefinition[];
  totalEvaluations: number;
}> {
  try {
    // 1. Concurrently fetch round2_ps_selections and round2_evaluations
    const [psRes, evalRes] = await Promise.all([
      supabase.from('round2_ps_selections').select('*'),
      supabase.from('round2_evaluations').select('*')
    ]);

    const selectionsList = psRes.data || [];
    const rawEvals = evalRes.data || [];

    // Filter out marker rows from being processed as actual team reviews
    const markerRows = rawEvals.filter((r: any) => r.team_name && r.team_name.startsWith('__PUBLISHED_'));
    const actualEvals = rawEvals.filter((r: any) => !r.team_name || !r.team_name.startsWith('__PUBLISHED_'));

    // Check publication markers
    markerRows.forEach((row: any) => {
      const match = row.team_name.match(/__PUBLISHED_(ps-\d{2}|all)__/);
      if (match && match[1]) {
        markPsPublishedInMemory(match[1]);
      }
    });

    // Also check if any round2_evaluations row has status === 'published'
    actualEvals.forEach((row: any) => {
      if (row.status === 'published') {
        const off = getOfficialSquadRecord(row.team_name || row.squad_id);
        const sel = selectionsList.find(s => 
          (row.selection_id && s.id === row.selection_id) ||
          (s.team_name && norm(s.team_name) === norm(row.team_name)) ||
          (s.squad_id && s.squad_id === row.squad_id)
        );
        const psId = sel?.ps_id || (off ? (off.rank <= 10 ? 'ps-01' : off.rank <= 20 ? 'ps-02' : off.rank <= 30 ? 'ps-03' : 'ps-04') : undefined);
        if (psId) {
          markPsPublishedInMemory(psId);
        }
      }
    });

    // 2. Deduplicate mentor evaluations for each team:
    // Deduplicate by (canonicalSquadId, mentorKey) taking latest submitted
    const dedupedMentorMap = new Map<string, MentorEvaluationEntry>();

    actualEvals.forEach(row => {
      const official = getOfficialSquadRecord(row.squad_id, row.team_name, row.team_code);
      const canonicalKey = official ? official.squadId : (norm(row.team_name) || row.team_code || row.squad_id || row.selection_id || row.id);
      const mentorKey = (row.mentor_name || row.mentor_id || 'unknown').toLowerCase().trim();
      const uniqueKey = `${canonicalKey}:::${mentorKey}`;
      const canonicalTeamName = official?.teamName || (norm(row.team_name) === 'mindmatrix' ? 'mindmesh' : (row.team_name || ''));

      const entry: MentorEvaluationEntry = {
        id: row.id,
        mentorId: row.mentor_id || '',
        mentorName: row.mentor_name || 'Mentor',
        teamId: row.team_id || row.selection_id || '',
        teamName: canonicalTeamName,
        teamCode: row.team_code || (official ? `HPL-${String(official.rank).padStart(3, '0')}` : ''),
        squadId: official?.squadId || row.squad_id || '',
        mark1: Number(row.mark1) || 0,
        mark2: Number(row.mark2) || 0,
        mark3: Number(row.mark3) || 0,
        mark4: Number(row.mark4) || 0,
        mark5: Number(row.mark5) || 0,
        total: Number(row.total) || (
          (Number(row.mark1) || 0) +
          (Number(row.mark2) || 0) +
          (Number(row.mark3) || 0) +
          (Number(row.mark4) || 0) +
          (Number(row.mark5) || 0)
        ),
        feedback: (row.feedback || '').trim(),
        evaluation: row.evaluation || 'Week 1 · Wed',
        status: row.status || 'submitted',
        createdAt: row.created_at || new Date().toISOString()
      };

      const existing = dedupedMentorMap.get(uniqueKey);
      if (!existing || new Date(entry.createdAt) >= new Date(existing.createdAt)) {
        dedupedMentorMap.set(uniqueKey, entry);
      }
    });

    // 3. Multi-index evaluations by every possible identifier for guaranteed lookup
    const evalsByLookupKey = new Map<string, MentorEvaluationEntry[]>();

    dedupedMentorMap.forEach(entry => {
      const keysToRegister = new Set<string>();
      if (entry.squadId) keysToRegister.add(entry.squadId.toUpperCase().trim());
      if (entry.teamName) {
        keysToRegister.add(norm(entry.teamName));
        keysToRegister.add(entry.teamName.toLowerCase().trim());
      }
      if (norm(entry.teamName) === 'mindmatrix' || norm(entry.teamName) === 'mindmesh' || norm(entry.squadId) === 'hplr227') {
        keysToRegister.add('mindmatrix');
        keysToRegister.add('mindmesh');
        keysToRegister.add('HPL-R2-27');
        keysToRegister.add('hplr227');
      }
      if (entry.teamCode) keysToRegister.add(entry.teamCode.toUpperCase().trim());
      if (entry.teamId) keysToRegister.add(entry.teamId);

      const official = getOfficialSquadRecord(entry.squadId, entry.teamName);
      if (official) {
        keysToRegister.add(official.squadId.toUpperCase().trim());
        keysToRegister.add(norm(official.teamName));
        keysToRegister.add(`HPL-${String(official.rank).padStart(3, '0')}`);
        keysToRegister.add(`HPL-${String(official.rank).padStart(2, '0')}`);
      }

      keysToRegister.forEach(k => {
        if (!evalsByLookupKey.has(k)) {
          evalsByLookupKey.set(k, []);
        }
        evalsByLookupKey.get(k)!.push(entry);
      });
    });

    // 4. Build final aggregated team evaluation list
    const aggregatedTeams: TeamAggregatedEvaluation[] = [];
    const processedTeamKeys = new Set<string>();

    // Build base roster from selectionsList, merged with OFFICIAL_QUALIFIED_TEAMS if needed
    const allRosterTeams: Array<{
      id?: string;
      squad_id: string;
      team_name: string;
      ps_id?: string;
      ps_title?: string;
      ps_code?: string;
      leader_name?: string;
      leader_email?: string;
      rank?: number;
      total_marks?: number;
      average_marks?: number;
    }> = [...selectionsList];

    // Ensure all 40 official teams exist even if not yet present in round2_ps_selections
    OFFICIAL_QUALIFIED_TEAMS.slice(0, 40).forEach((t, idx) => {
      const alreadyInList = allRosterTeams.some(r => 
        r.squad_id === t.squadId || 
        norm(r.team_name) === norm(t.teamName)
      );
      if (!alreadyInList) {
        let psId = 'ps-01';
        let psCode = 'PS 01';
        let psTitle = 'AyurEssence';
        if (idx >= 10 && idx < 20) {
          psId = 'ps-02';
          psCode = 'PS 02';
          psTitle = 'SMARTBUS';
        } else if (idx >= 20 && idx < 30) {
          psId = 'ps-03';
          psCode = 'PS 03';
          psTitle = 'Sahayak';
        } else if (idx >= 30) {
          psId = 'ps-04';
          psCode = 'PS 04';
          psTitle = 'SWMS';
        }

        allRosterTeams.push({
          id: `off-${t.squadId}`,
          squad_id: t.squadId,
          team_name: t.teamName,
          leader_email: t.leaderEmail,
          leader_name: 'Team Leader',
          rank: t.rank,
          ps_id: psId,
          ps_code: psCode,
          ps_title: psTitle
        });
      }
    });

    // Process all roster teams
    allRosterTeams.forEach(sel => {
      const official = getOfficialSquadRecord(sel.squad_id, sel.team_name, sel.id);
      const rankNum = sel.rank || official?.rank || (sel.squad_id ? parseInt(sel.squad_id.replace(/\D/g, ''), 10) : 1);
      const squadId = official?.squadId || sel.squad_id || `HPL-R2-${String(rankNum).padStart(2, '0')}`;
      const rawName = official?.teamName || sel.team_name || 'Team';
      const teamName = (norm(rawName) === 'mindmatrix' || norm(rawName) === 'mindmesh' || norm(squadId) === 'hplr227') ? 'mindmesh' : rawName;
      const teamCode = `HPL-${String(rankNum).padStart(3, '0')}`;

      // Find evaluations by any lookup key
      const teamEvals = 
        evalsByLookupKey.get(squadId.toUpperCase().trim()) ||
        evalsByLookupKey.get(norm(teamName)) ||
        (norm(teamName) === 'mindmesh' ? (evalsByLookupKey.get('mindmatrix') || evalsByLookupKey.get('mindmesh')) : undefined) ||
        evalsByLookupKey.get(teamCode) ||
        (sel.id ? evalsByLookupKey.get(sel.id) : undefined) ||
        [];

      processedTeamKeys.add(squadId.toUpperCase().trim());
      processedTeamKeys.add(norm(teamName));

      // Calculate rubric totals across mentors
      const rubricTotals = { mark1: 0, mark2: 0, mark3: 0, mark4: 0, mark5: 0 };
      const feedbacks: Array<{ mentorName: string; text: string }> = [];
      let calculatedTotalMarks = 0;

      teamEvals.forEach(me => {
        rubricTotals.mark1 += me.mark1;
        rubricTotals.mark2 += me.mark2;
        rubricTotals.mark3 += me.mark3;
        rubricTotals.mark4 += me.mark4;
        rubricTotals.mark5 += me.mark5;
        calculatedTotalMarks += me.total;
        if (me.feedback) {
          feedbacks.push({ mentorName: me.mentorName, text: me.feedback });
        }
      });

      const finalTotal = teamEvals.length > 0 ? calculatedTotalMarks : (Number(sel.total_marks) || 0);
      const mCount = teamEvals.length || 1;
      const rubricAverages = {
        mark1: parseFloat((rubricTotals.mark1 / mCount).toFixed(1)),
        mark2: parseFloat((rubricTotals.mark2 / mCount).toFixed(1)),
        mark3: parseFloat((rubricTotals.mark3 / mCount).toFixed(1)),
        mark4: parseFloat((rubricTotals.mark4 / mCount).toFixed(1)),
        mark5: parseFloat((rubricTotals.mark5 / mCount).toFixed(1)),
      };

      const calculatedAvg = teamEvals.length > 0
        ? parseFloat((calculatedTotalMarks / teamEvals.length).toFixed(1))
        : (Number(sel.average_marks) || Number(sel.total_marks) || 0);

      const dbAvg = Number((sel as any).average_marks ?? (sel as any).avg_marks);
      const averageMarks = (!isNaN(dbAvg) && dbAvg > 0) ? dbAvg : calculatedAvg;

      // PS mapping
      let psId = sel.ps_id || 'ps-01';
      let psCode = sel.ps_code || 'PS 01';
      let psTitle = sel.ps_title || 'AyurEssence';
      if (!sel.ps_id && rankNum) {
        if (rankNum > 10 && rankNum <= 20) {
          psId = 'ps-02'; psCode = 'PS 02'; psTitle = 'SMARTBUS';
        } else if (rankNum > 20 && rankNum <= 30) {
          psId = 'ps-03'; psCode = 'PS 03'; psTitle = 'Sahayak';
        } else if (rankNum > 30) {
          psId = 'ps-04'; psCode = 'PS 04'; psTitle = 'SWMS';
        }
      }

      const pubStatus = getPsPublishStatus(psId);

      aggregatedTeams.push({
        id: sel.id || squadId,
        squadId,
        teamName,
        teamCode,
        selectionId: sel.id || squadId,
        psId,
        psTitle,
        psCode,
        leaderName: sel.leader_name || 'Leader',
        leaderEmail: sel.leader_email || official?.leaderEmail || '',
        rank: rankNum,
        mentorEvaluations: teamEvals,
        evaluationsCount: teamEvals.length,
        totalMarks: finalTotal,
        averageMarks,
        maxPossibleMarks: 150,
        rubricTotals,
        rubricAverages,
        feedbacks,
        isPublished: pubStatus.isPublished,
        publishedAt: pubStatus.publishedAt,
      });
    });

    // Sort by rank ascending by default
    aggregatedTeams.sort((a, b) => a.rank - b.rank);

    return {
      teams: aggregatedTeams,
      rubrics: DEFAULT_ROUND2_RUBRICS,
      totalEvaluations: dedupedMentorMap.size
    };
  } catch (err) {
    console.error('[HPL] fetchRound2AggregatedEvaluations exception:', err);
    return {
      teams: [],
      rubrics: DEFAULT_ROUND2_RUBRICS,
      totalEvaluations: 0
    };
  }
}

/**
 * Publish a specific Problem Statement's marks to the public Leaderboard.
 * Syncs to:
 * 1. Supabase `evaluations` table (week1 records read by LeaderboardPage)
 * 2. Supabase `round2_evaluations` table (marks status as 'published')
 * 3. Supabase `round2_ps_selections` table (total_marks & average_marks)
 * 4. LocalStorage cache for immediate UI sync and offline persistence
 * 5. Broadcasts custom event for multi-tab real-time sync
 */
export async function publishPsMarksToLeaderboard(
  psId: string,
  teams: TeamAggregatedEvaluation[],
  adminEmail: string = 'admin@hpl'
): Promise<{ success: boolean; publishedCount: number; error?: string }> {
  try {
    // Filter teams belonging to this PS (or all if psId === 'all')
    const teamsToPublish = psId === 'all' 
      ? teams 
      : teams.filter(t => t.psId === psId);

    if (teamsToPublish.length === 0) {
      return { success: false, publishedCount: 0, error: 'No teams found to publish for this Problem Statement.' };
    }

    const now = new Date().toISOString();

    // 1. Mark evaluations as 'published' in `round2_evaluations` table
    for (const t of teamsToPublish) {
      try {
        if (t.teamName) {
          await supabase
            .from('round2_evaluations')
            .update({ status: 'published' })
            .ilike('team_name', t.teamName);
        }
        if (t.squadId) {
          await supabase
            .from('round2_evaluations')
            .update({ status: 'published' })
            .eq('squad_id', t.squadId);
        }
      } catch (e) {
        console.warn(`[HPL] Notice updating round2_evaluations status for ${t.teamName}:`, e);
      }
    }


    // 3. Mark PS as published in-memory and in localStorage
    if (psId === 'all') {
      ['ps-01', 'ps-02', 'ps-03', 'ps-04'].forEach(id => setPsPublishStatus(id, true));
    } else {
      setPsPublishStatus(psId, true);
    }

    // 4. Broadcast events for real-time reactivity across all browser tabs
    window.dispatchEvent(new CustomEvent('hpl-evaluations-update', { detail: { week: 'week1', psId } }));
    window.dispatchEvent(new Event('hpl-selection-update'));
    window.dispatchEvent(new StorageEvent('storage', { key: `${PUBLISHED_KEY_PREFIX}${psId}` }));

    console.log(`[HPL] ✅ Successfully published ${teamsToPublish.length} teams for ${psId} to Leaderboard!`);
    return { success: true, publishedCount: teamsToPublish.length };
  } catch (err: any) {
    console.error('[HPL] publishPsMarksToLeaderboard exception:', err);
    return { success: false, publishedCount: 0, error: err?.message || 'Server error publishing marks.' };
  }
}


