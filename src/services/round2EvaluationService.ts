import { supabase } from '../client_config';

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

/**
 * Check if a Problem Statement's marks have been published to the leaderboard.
 */
export function getPsPublishStatus(psId: string): { isPublished: boolean; publishedAt?: string } {
  try {
    const raw = localStorage.getItem(`${PUBLISHED_KEY_PREFIX}${psId}`);
    if (!raw) return { isPublished: false };
    const parsed = JSON.parse(raw);
    return { isPublished: true, publishedAt: parsed.publishedAt };
  } catch {
    return { isPublished: false };
  }
}

/**
 * Record publication status in localStorage.
 */
export function setPsPublishStatus(psId: string, isPublished: boolean) {
  try {
    if (isPublished) {
      localStorage.setItem(
        `${PUBLISHED_KEY_PREFIX}${psId}`,
        JSON.stringify({ isPublished: true, publishedAt: new Date().toISOString() })
      );
    } else {
      localStorage.removeItem(`${PUBLISHED_KEY_PREFIX}${psId}`);
    }
  } catch (e) {
    console.warn('Could not save publish status:', e);
  }
}

/**
 * Normalize string for comparison.
 */
function norm(str: string): string {
  return (str || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');
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
    // 1. Fetch round2_ps_selections to get authoritative squad assignments and PS mappings
    const { data: psSelections, error: psError } = await supabase
      .from('round2_ps_selections')
      .select('*');

    if (psError) {
      console.warn('[HPL] round2_ps_selections fetch error:', psError.message);
    }

    const selectionsList = psSelections || [];

    // Map selection by id, squad_id, and team_name for ultra-robust lookups
    const selectionById = new Map<string, any>();
    const selectionBySquadId = new Map<string, any>();
    const selectionByName = new Map<string, any>();
    const selectionByCode = new Map<string, any>();

    selectionsList.forEach(row => {
      if (row.id) selectionById.set(row.id, row);
      if (row.squad_id) selectionBySquadId.set(row.squad_id.toUpperCase().trim(), row);
      if (row.team_name) selectionByName.set(norm(row.team_name), row);
      // Map team codes like HPL-018 to rank 18
      const rankNum = row.rank || (row.squad_id ? parseInt(row.squad_id.replace(/\D/g, ''), 10) : null);
      if (rankNum) {
        const code = `HPL-${String(rankNum).padStart(3, '0')}`;
        selectionByCode.set(code.toUpperCase(), row);
      }
    });

    // 2. Fetch all mentor evaluations from round2_evaluations
    const { data: evalRows, error: evalError } = await supabase
      .from('round2_evaluations')
      .select('*');

    if (evalError) {
      console.error('[HPL] round2_evaluations fetch error:', evalError.message);
    }

    const rawEvals = evalRows || [];

    // 3. Deduplicate mentor evaluations for each team:
    // When mentors submitted, the system recorded dual entries (e.g. "Review 1 · Wed" & "Week 1 · Wed")
    // for the same mentor on the same team. We deduplicate by (team_identifier, mentor_id) taking the latest.
    const dedupedMentorMap = new Map<string, MentorEvaluationEntry>();

    rawEvals.forEach(row => {
      const teamKey = row.selection_id || row.team_code || norm(row.team_name) || row.team_id;
      const mentorKey = row.mentor_id || row.mentor_name || 'unknown';
      const uniqueKey = `${teamKey}:::${mentorKey}`;

      const entry: MentorEvaluationEntry = {
        id: row.id,
        mentorId: row.mentor_id || '',
        mentorName: row.mentor_name || 'Mentor',
        teamId: row.team_id || row.selection_id || '',
        teamName: row.team_name || '',
        teamCode: row.team_code || '',
        squadId: row.squad_id || '',
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

    // 4. Group deduplicated mentor evaluations by team
    const evalsByTeamKey = new Map<string, MentorEvaluationEntry[]>();

    dedupedMentorMap.forEach((entry, key) => {
      const [teamKey] = key.split(':::');
      if (!evalsByTeamKey.has(teamKey)) {
        evalsByTeamKey.set(teamKey, []);
      }
      evalsByTeamKey.get(teamKey)!.push(entry);
    });

    // 5. Build final aggregated team evaluation list
    const aggregatedTeams: TeamAggregatedEvaluation[] = [];
    const processedTeamKeys = new Set<string>();

    // Process from selections list first (ensures every team in the round is present)
    selectionsList.forEach(sel => {
      const rankNum = sel.rank || (sel.squad_id ? parseInt(sel.squad_id.replace(/\D/g, ''), 10) : 1);
      const teamCode = `HPL-${String(rankNum).padStart(3, '0')}`;

      // Find evaluations by selection_id, teamCode, or normalized team name
      const teamEvals = 
        evalsByTeamKey.get(sel.id) ||
        evalsByTeamKey.get(teamCode) ||
        evalsByTeamKey.get(norm(sel.team_name)) ||
        [];

      processedTeamKeys.add(sel.id);
      processedTeamKeys.add(teamCode);
      processedTeamKeys.add(norm(sel.team_name));

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

      // Prefer calculated total from mentor evaluations; fallback to sel.total_marks if evaluations table had no rows
      const finalTotal = teamEvals.length > 0 ? calculatedTotalMarks : (Number(sel.total_marks) || 0);

      const mCount = teamEvals.length || 1;
      const rubricAverages = {
        mark1: parseFloat((rubricTotals.mark1 / mCount).toFixed(1)),
        mark2: parseFloat((rubricTotals.mark2 / mCount).toFixed(1)),
        mark3: parseFloat((rubricTotals.mark3 / mCount).toFixed(1)),
        mark4: parseFloat((rubricTotals.mark4 / mCount).toFixed(1)),
        mark5: parseFloat((rubricTotals.mark5 / mCount).toFixed(1)),
      };

      // Check if DB row has average marks directly, otherwise calculate average across reviewing mentors
      const dbAvg = Number(
        (sel as any).average_marks ?? 
        (sel as any).avg_marks ?? 
        (sel as any).average_score ?? 
        (sel as any).average ?? 
        (sel as any).avg
      );
      const calculatedAvg = teamEvals.length > 0
        ? parseFloat((calculatedTotalMarks / teamEvals.length).toFixed(1))
        : (Number(sel.total_marks) || 0);

      const averageMarks = (!isNaN(dbAvg) && dbAvg > 0) ? dbAvg : calculatedAvg;

      const pubStatus = getPsPublishStatus(sel.ps_id || 'ps-01');

      aggregatedTeams.push({
        id: sel.id,
        squadId: sel.squad_id || `HPL-R2-${String(rankNum).padStart(2, '0')}`,
        teamName: sel.team_name || 'Team',
        teamCode: teamCode,
        selectionId: sel.id,
        psId: sel.ps_id || 'ps-01',
        psTitle: sel.ps_title || 'AyurEssence',
        psCode: sel.ps_code || 'PS 01',
        leaderName: sel.leader_name || 'Leader',
        leaderEmail: sel.leader_email || '',
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

    // Also include any evaluations in round2_evaluations that weren't in round2_ps_selections
    evalsByTeamKey.forEach((teamEvals, teamKey) => {
      if (processedTeamKeys.has(teamKey)) return;

      const first = teamEvals[0];
      const rubricTotals = { mark1: 0, mark2: 0, mark3: 0, mark4: 0, mark5: 0 };
      const feedbacks: Array<{ mentorName: string; text: string }> = [];
      let totalMarks = 0;

      teamEvals.forEach(me => {
        rubricTotals.mark1 += me.mark1;
        rubricTotals.mark2 += me.mark2;
        rubricTotals.mark3 += me.mark3;
        rubricTotals.mark4 += me.mark4;
        rubricTotals.mark5 += me.mark5;
        totalMarks += me.total;
        if (me.feedback) {
          feedbacks.push({ mentorName: me.mentorName, text: me.feedback });
        }
      });

      const mCount = teamEvals.length || 1;
      const rubricAverages = {
        mark1: parseFloat((rubricTotals.mark1 / mCount).toFixed(1)),
        mark2: parseFloat((rubricTotals.mark2 / mCount).toFixed(1)),
        mark3: parseFloat((rubricTotals.mark3 / mCount).toFixed(1)),
        mark4: parseFloat((rubricTotals.mark4 / mCount).toFixed(1)),
        mark5: parseFloat((rubricTotals.mark5 / mCount).toFixed(1)),
      };

      aggregatedTeams.push({
        id: first.id,
        squadId: first.squadId || (first.teamName ? `HPL-${first.teamName.toUpperCase().replace(/\s+/g, '').slice(0, 4)}` : 'HPL-TEAM'),
        teamName: first.teamName || 'Team',
        teamCode: first.teamCode || first.evaluation || 'HPL-000',
        selectionId: first.teamId || first.id,
        psId: 'ps-01',
        psTitle: 'AyurEssence',
        psCode: 'PS 01',
        leaderName: 'Team Leader',
        leaderEmail: '',
        rank: 99,
        mentorEvaluations: teamEvals,
        evaluationsCount: teamEvals.length,
        totalMarks,
        averageMarks: teamEvals.length > 0 ? parseFloat((totalMarks / teamEvals.length).toFixed(1)) : totalMarks,
        maxPossibleMarks: 150,
        rubricTotals,
        rubricAverages,
        feedbacks,
        isPublished: false,
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
 * 2. Supabase `round2_ps_selections` table (total_marks & total_score)
 * 3. LocalStorage cache for immediate UI sync and offline persistence
 * 4. Broadcasts custom event for multi-tab real-time sync
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

    // 1. Prepare evaluations table payload with average marks as requested
    const evalPayloads = teamsToPublish.map(t => {
      // Concatenate mentor feedback comments for this team
      const combinedFeedback = t.feedbacks.map(f => `[${f.mentorName}]: ${f.text}`).join('\n\n');
      return {
        squad_id: t.squadId,
        team_name: t.teamName,
        ps_id: t.psId,
        week: 'week1',
        marks: t.averageMarks, // Publish average marks (e.g. 41.3)
        feedback: combinedFeedback,
        graded_by: `admin-published (${adminEmail})`,
        updated_at: now
      };
    });

    // 2. Upsert to `evaluations` table
    const { error: evalUpsertError } = await supabase
      .from('evaluations')
      .upsert(evalPayloads, { onConflict: 'squad_id,week' });

    if (evalUpsertError) {
      console.warn('[HPL] Notice on evaluations upsert:', evalUpsertError.message);
    }

    // 3. Update `round2_ps_selections` table for each team
    for (const t of teamsToPublish) {
      try {
        await supabase
          .from('round2_ps_selections')
          .update({
            total_marks: t.averageMarks,
            average_marks: t.averageMarks,
            total_score: t.totalMarks
          })
          .eq('squad_id', t.squadId);
      } catch (e) {
        console.warn(`Could not update round2_ps_selections for ${t.squadId}:`, e);
      }
    }

    // 4. Update localStorage evaluations cache for immediate zero-latency Leaderboard sync
    try {
      const cacheKey = 'hpl_evaluations_cache_week1';
      const existingRaw = localStorage.getItem(cacheKey);
      const cacheMap = existingRaw ? JSON.parse(existingRaw) : {};
      evalPayloads.forEach(p => {
        cacheMap[p.squad_id] = {
          ...p,
          created_at: now,
          updated_at: now
        };
      });
      localStorage.setItem(cacheKey, JSON.stringify(cacheMap));
    } catch (e) {
      console.warn('Could not update localStorage cache:', e);
    }

    // 5. Mark PS as published
    if (psId === 'all') {
      ['ps-01', 'ps-02', 'ps-03', 'ps-04'].forEach(id => setPsPublishStatus(id, true));
    } else {
      setPsPublishStatus(psId, true);
    }

    // 6. Broadcast events for real-time reactivity across all browser tabs
    window.dispatchEvent(new CustomEvent('hpl-evaluations-update', { detail: { week: 'week1', psId } }));
    window.dispatchEvent(new Event('hpl-selection-update'));

    console.log(`[HPL] ✅ Published ${teamsToPublish.length} teams for ${psId} to Leaderboard!`);
    return { success: true, publishedCount: teamsToPublish.length };
  } catch (err: any) {
    console.error('[HPL] publishPsMarksToLeaderboard exception:', err);
    return { success: false, publishedCount: 0, error: err?.message || 'Server error publishing marks.' };
  }
}
