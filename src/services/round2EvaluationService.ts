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

export type Round2ReviewRound = 'review1' | 'review2';

export function isReview2(evalStr?: string, createdAt?: string): boolean {
  if (evalStr) {
    const clean = evalStr.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 1. Explicit Wednesday / Review 1 check - MUST NEVER be treated as Review 2!
    if (
      clean.includes('wed') ||
      clean.includes('wednesday') ||
      clean.includes('review1') ||
      clean.includes('rev1') ||
      clean.includes('eval1') ||
      clean.includes('checkpoint1') ||
      clean.includes('cp1') ||
      clean.includes('week1wed') ||
      clean.includes('week2wed')
    ) {
      return false;
    }

    // 2. Explicit Saturday / Review 2 check
    if (
      clean.includes('sat') ||
      clean.includes('saturday') ||
      clean.includes('review2') ||
      clean.includes('rev2') ||
      clean.includes('eval2') ||
      clean.includes('checkpoint2') ||
      clean.includes('cp2') ||
      clean.includes('week1sat') ||
      clean.includes('week2sat')
    ) {
      return true;
    }
  }

  // 3. Fallback to timestamp only if evaluation label had no day keyword
  if (createdAt) {
    try {
      const d = new Date(createdAt);
      if (!isNaN(d.getTime())) {
        if (d >= new Date('2026-09-19T00:00:00Z')) {
          return true;
        }
      }
    } catch {}
  }
  return false;
}

export function isReview1(evalStr?: string, createdAt?: string): boolean {
  return !isReview2(evalStr, createdAt);
}

const PUBLISHED_KEY_PREFIX = 'hpl_published_ps_';

// Global in-memory set of published Problem Statement IDs (synced with Supabase)
const dbPublishedPsSet = new Set<string>();

export function markPsPublishedInMemory(psId: string, reviewType: Round2ReviewRound = 'review1') {
  if (!psId) return;
  const key = `${psId}_${reviewType}`;
  dbPublishedPsSet.add(key);
  try {
    localStorage.setItem(
      `${PUBLISHED_KEY_PREFIX}${key}`,
      JSON.stringify({ isPublished: true, publishedAt: new Date().toISOString() })
    );
  } catch {}
}

/**
 * Check if a Problem Statement's marks have been published to the leaderboard.
 * Review 1 (Wednesday) is permanently published and live.
 * Review 2 (Saturday) is published via Supabase sentinel rows or admin publish.
 */
export function getPsPublishStatus(psId: string, reviewType: Round2ReviewRound = 'review1'): { isPublished: boolean; publishedAt?: string } {
  // Review 1 (Wednesday sprint) is officially published and live
  if (reviewType === 'review1') {
    return { isPublished: true, publishedAt: '2026-09-17T00:00:00.000Z' };
  }

  // Global publish for review2
  if (dbPublishedPsSet.has('all_review2') || dbPublishedPsSet.has('all')) {
    return { isPublished: true, publishedAt: new Date().toISOString() };
  }

  if (psId === 'all') {
    const allPublished = ['ps-01', 'ps-02', 'ps-03', 'ps-04'].every(id => getPsPublishStatus(id, reviewType).isPublished);
    return { isPublished: allPublished };
  }

  const key = `${psId}_${reviewType}`;
  if (dbPublishedPsSet.has(key)) {
    return { isPublished: true, publishedAt: new Date().toISOString() };
  }

  try {
    const rawKey = localStorage.getItem(`${PUBLISHED_KEY_PREFIX}${key}`);
    if (rawKey) {
      const parsed = JSON.parse(rawKey);
      if (parsed.isPublished) {
        dbPublishedPsSet.add(key);
        return { isPublished: true, publishedAt: parsed.publishedAt };
      }
    }
    const rawAll = localStorage.getItem(`${PUBLISHED_KEY_PREFIX}all_${reviewType}`);
    if (rawAll) {
      const parsed = JSON.parse(rawAll);
      if (parsed.isPublished) {
        return { isPublished: true, publishedAt: parsed.publishedAt };
      }
    }
    return { isPublished: false };
  } catch {
    return { isPublished: false };
  }
}

/**
 * Record publication status in localStorage and in-memory cache.
 */
export function setPsPublishStatus(psId: string, isPublished: boolean, reviewType: Round2ReviewRound = 'review1') {
  try {
    const key = `${psId}_${reviewType}`;
    if (isPublished) {
      dbPublishedPsSet.add(key);
      localStorage.setItem(
        `${PUBLISHED_KEY_PREFIX}${key}`,
        JSON.stringify({ isPublished: true, publishedAt: new Date().toISOString() })
      );
    } else {
      dbPublishedPsSet.delete(key);
      localStorage.removeItem(`${PUBLISHED_KEY_PREFIX}${key}`);
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
 * Canonical lookup for an official team from OFFICIAL_QUALIFIED_TEAMS.
 * Supports exact match, normalized match, squad numeric ranks, and fuzzy team names.
 */
export function getOfficialSquadRecord(...identifiers: (string | undefined)[]) {
  for (const identifier of identifiers) {
    if (!identifier) continue;
    const clean = identifier.trim();
    const n = norm(clean);
    if (!n) continue;

    // Explicit alias: 'mindmatrix' -> rank 27 'mindmesh'
    if (n === 'mindmatrix' || n === 'mindmesh' || n === 'hplr227' || n === 'squad27') {
      const team27 = OFFICIAL_QUALIFIED_TEAMS.find(t => t.rank === 27);
      if (team27) return team27;
    }

    // Direct match by squadId, teamName, email
    const found = OFFICIAL_QUALIFIED_TEAMS.find(t => 
      t.squadId.toLowerCase() === clean.toLowerCase() ||
      norm(t.squadId) === n ||
      norm(t.teamName) === n ||
      t.teamName.toLowerCase() === clean.toLowerCase() ||
      (t.leaderEmail && t.leaderEmail.toLowerCase() === clean.toLowerCase())
    );
    if (found) return found;

    // Numeric rank match: e.g. "HPL-12", "HPL12", "12", "squad 12" -> rank 12
    const numOnly = parseInt(clean.replace(/\D/g, ''), 10);
    if (!isNaN(numOnly) && numOnly >= 1 && numOnly <= 40) {
      const matchByRank = OFFICIAL_QUALIFIED_TEAMS.find(t => t.rank === numOnly);
      if (matchByRank) return matchByRank;
    }

    // Fuzzy/substring match for team name (e.g. "wakanda" -> "wakanda forever", "hackblaze" -> "Hackblaze")
    const fuzzy = OFFICIAL_QUALIFIED_TEAMS.find(t => {
      const tNorm = norm(t.teamName);
      return (n.length >= 4 && tNorm.includes(n)) || (tNorm.length >= 4 && n.includes(tNorm));
    });
    if (fuzzy) return fuzzy;
  }
  return undefined;
}

/**
 * Fetch evaluation rows from `round2_evaluations` filtered specifically for Review 1 (Wed) or Review 2 (Sat).
 * Groups mentor evaluations per team for that review round, and computes average marks out of 50.
 */
export async function fetchRound2AggregatedEvaluations(
  reviewType: Round2ReviewRound = 'review1'
): Promise<{
  teams: TeamAggregatedEvaluation[];
  rubrics: RubricDefinition[];
  totalEvaluations: number;
}> {
  try {
    // 1. Concurrently fetch round2_ps_selections and round2_evaluations
    const [psRes, evalRes] = await Promise.all([
      supabase.from('round2_ps_selections').select('*').limit(5000),
      supabase.from('round2_evaluations').select('*').limit(5000)
    ]);

    const selectionsList = psRes.data || [];
    const rawEvals = evalRes.data || [];

    // Filter to ONLY reviews matching the selected review round (Wed Review 1 vs Sat Review 2)
    const actualEvals = rawEvals.filter((r: any) => {
      if (!r || !r.id) return false;
      if (r.team_name && r.team_name.startsWith('__PUBLISHED_')) return false;
      return reviewType === 'review2' 
        ? isReview2(r.evaluation, r.created_at) 
        : isReview1(r.evaluation, r.created_at);
    });

    // 1.5. Detect persistent published sentinel rows across all devices
    rawEvals.forEach((r: any) => {
      if (r.team_name && r.team_name.startsWith('__PUBLISHED_')) {
        const keyPart = r.team_name.replace('__PUBLISHED_', '');
        const parts = keyPart.split('_');
        const pubPsId = parts[0];
        const pubReview = (parts[1] as Round2ReviewRound) || 'review1';
        markPsPublishedInMemory(pubPsId, pubReview);
      }
    });

    // Check if any round2_evaluations row for this review has status === 'published'
    let anyPublishedForThisReview = false;
    actualEvals.forEach((row: any) => {
      if (row.status === 'published') {
        anyPublishedForThisReview = true;
        const off = getOfficialSquadRecord(row.team_name);
        const sel = selectionsList.find(s => 
          (row.selection_id && s.id === row.selection_id) ||
          (row.team_id && s.id === row.team_id) ||
          (s.team_name && norm(s.team_name) === norm(row.team_name))
        );
        const psId = sel?.ps_id || (off ? (off.rank <= 10 ? 'ps-01' : off.rank <= 20 ? 'ps-02' : off.rank <= 30 ? 'ps-03' : 'ps-04') : undefined);
        if (psId) {
          markPsPublishedInMemory(psId, reviewType);
        }
      }
    });

    if (anyPublishedForThisReview) {
      markPsPublishedInMemory('all', reviewType);
      ['ps-01', 'ps-02', 'ps-03', 'ps-04'].forEach(id => markPsPublishedInMemory(id, reviewType));
    }

    // 2. Deduplicate mentor evaluations for each team for this specific review
    const dedupedMentorMap = new Map<string, MentorEvaluationEntry>();

    actualEvals.forEach(row => {
      const official = getOfficialSquadRecord(row.squad_id, row.team_name, row.team_code);
      const canonicalKey = official ? official.squadId : (norm(row.team_name) || row.team_code || row.squad_id || row.selection_id || row.id);
      const mentorKey = (row.mentor_name || row.mentor_id || 'unknown').toLowerCase().trim();
      const uniqueKey = `${canonicalKey}:::${mentorKey}:::${reviewType}`;
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
      if (entry.squadId) {
        keysToRegister.add(entry.squadId.toUpperCase().trim());
        keysToRegister.add(norm(entry.squadId));
        const num = entry.squadId.replace(/\D/g, '');
        if (num) {
          keysToRegister.add(`HPL-R2-${num.padStart(2, '0')}`);
          keysToRegister.add(`HPL-${num.padStart(3, '0')}`);
          keysToRegister.add(`HPL-${num.padStart(2, '0')}`);
          keysToRegister.add(`HPL${num}`);
          keysToRegister.add(num);
        }
      }
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
        keysToRegister.add(norm(official.squadId));
        keysToRegister.add(norm(official.teamName));
        keysToRegister.add(official.teamName.toLowerCase().trim());
        keysToRegister.add(`HPL-${String(official.rank).padStart(3, '0')}`);
        keysToRegister.add(`HPL-${String(official.rank).padStart(2, '0')}`);
        keysToRegister.add(`HPL-R2-${String(official.rank).padStart(2, '0')}`);
        keysToRegister.add(`HPL${official.rank}`);
        keysToRegister.add(String(official.rank));
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

      // Collect candidate keys across all formats for this team
      const candidateKeys = new Set<string>();
      if (squadId) {
        candidateKeys.add(squadId.toUpperCase().trim());
        candidateKeys.add(norm(squadId));
        const numPart = squadId.replace(/\D/g, '');
        if (numPart) {
          candidateKeys.add(`HPL-R2-${numPart.padStart(2, '0')}`);
          candidateKeys.add(`HPL-${numPart.padStart(3, '0')}`);
          candidateKeys.add(`HPL-${numPart.padStart(2, '0')}`);
          candidateKeys.add(`HPL${numPart}`);
          candidateKeys.add(numPart);
        }
      }
      if (teamName) {
        candidateKeys.add(norm(teamName));
        candidateKeys.add(teamName.toLowerCase().trim());
      }
      if (rawName) {
        candidateKeys.add(norm(rawName));
        candidateKeys.add(rawName.toLowerCase().trim());
      }
      if (teamCode) {
        candidateKeys.add(teamCode.toUpperCase().trim());
      }
      if (sel.id) {
        candidateKeys.add(sel.id);
      }
      if (official) {
        candidateKeys.add(official.squadId.toUpperCase().trim());
        candidateKeys.add(norm(official.squadId));
        candidateKeys.add(norm(official.teamName));
        candidateKeys.add(official.teamName.toLowerCase().trim());
        candidateKeys.add(`HPL-${String(official.rank).padStart(3, '0')}`);
        candidateKeys.add(`HPL-${String(official.rank).padStart(2, '0')}`);
        candidateKeys.add(`HPL-R2-${String(official.rank).padStart(2, '0')}`);
        candidateKeys.add(`HPL${official.rank}`);
        candidateKeys.add(String(official.rank));
      }
      if (norm(teamName) === 'mindmesh' || norm(teamName) === 'mindmatrix' || norm(squadId) === 'hplr227') {
        candidateKeys.add('mindmesh');
        candidateKeys.add('mindmatrix');
        candidateKeys.add('HPL-R2-27');
        candidateKeys.add('hplr227');
      }

      // Merge and deduplicate all mentor evaluations across candidate keys
      const teamMentorMap = new Map<string, MentorEvaluationEntry>();
      candidateKeys.forEach(k => {
        const found = evalsByLookupKey.get(k);
        if (found) {
          found.forEach(e => {
            const mKey = (e.mentorId || e.mentorName || 'm').toLowerCase().trim();
            const existing = teamMentorMap.get(mKey);
            if (!existing || new Date(e.createdAt) >= new Date(existing.createdAt)) {
              teamMentorMap.set(mKey, e);
            }
          });
        }
      });
      const teamEvals = Array.from(teamMentorMap.values());

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

      const finalTotal = teamEvals.length > 0
        ? calculatedTotalMarks
        : (reviewType === 'review1' ? (Number(sel.total_marks) || 0) : 0);
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
        : (reviewType === 'review1' ? (Number(sel.average_marks) || Number(sel.total_marks) || 0) : 0);

      // LIVE DYNAMIC SOURCE OF TRUTH:
      // If live mentor evaluations exist in round2_evaluations, ALWAYS use calculatedAvg!
      // NEVER overwrite live evaluations with static/stale dbAvg.
      const dbAvg = reviewType === 'review1' ? Number((sel as any).average_marks ?? (sel as any).avg_marks) : NaN;
      const averageMarks = teamEvals.length > 0 
        ? calculatedAvg 
        : (reviewType === 'review1' && !isNaN(dbAvg) && dbAvg > 0 ? dbAvg : 0);

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

      const pubStatus = getPsPublishStatus(psId, reviewType);
      const isReviewPublished = reviewType === 'review1' ? true : pubStatus.isPublished;

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
        isPublished: isReviewPublished,
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
  adminEmail: string = 'admin@hpl',
  reviewType: Round2ReviewRound = 'review1'
): Promise<{ success: boolean; publishedCount: number; error?: string }> {
  try {
    // Filter teams belonging to this PS (or all if psId === 'all')
    const teamsToPublish = psId === 'all' 
      ? teams 
      : teams.filter(t => t.psId === psId);

    if (teamsToPublish.length === 0) {
      return { success: false, publishedCount: 0, error: 'No teams found to publish for this Problem Statement.' };
    }

    // 1. Mark evaluations as 'published' in `round2_evaluations` table for the specific review round
    for (const t of teamsToPublish) {
      try {
        const candidateIds = t.mentorEvaluations.map(m => m.id).filter(Boolean);
        if (candidateIds.length > 0) {
          await supabase
            .from('round2_evaluations')
            .update({ status: 'published' })
            .in('id', candidateIds);
        }
        if (t.teamName) {
          await supabase
            .from('round2_evaluations')
            .update({ status: 'published' })
            .ilike('team_name', t.teamName);
        }
      } catch (e) {
        console.warn(`[HPL] Notice updating round2_evaluations status for ${t.teamName}:`, e);
      }
    }

    // 1.5. Insert persistent sentinel row in Supabase so publication state persists globally
    try {
      const psListToMark = psId === 'all' ? ['ps-01', 'ps-02', 'ps-03', 'ps-04'] : [psId];
      for (const pid of psListToMark) {
        await supabase.from('round2_evaluations').insert({
          team_name: `__PUBLISHED_${pid}_${reviewType}`,
          mentor_name: adminEmail,
          evaluation: reviewType === 'review2' ? 'Review 2 · Sat' : 'Review 1 · Wed',
          mark1: 0,
          mark2: 0,
          mark3: 0,
          mark4: 0,
          mark5: 0,
          total: 0,
          status: 'published'
        });
      }
    } catch (e) {
      console.warn('[HPL] Notice writing published sentinel to Supabase:', e);
    }

    // 2. Mark PS as published in-memory and in localStorage for this reviewType
    if (psId === 'all') {
      ['ps-01', 'ps-02', 'ps-03', 'ps-04'].forEach(id => setPsPublishStatus(id, true, reviewType));
    } else {
      setPsPublishStatus(psId, true, reviewType);
    }

    // 3. Broadcast events for real-time reactivity across all browser tabs
    window.dispatchEvent(new CustomEvent('hpl-evaluations-update', { detail: { week: 'week1', psId, reviewType } }));
    window.dispatchEvent(new Event('hpl-selection-update'));
    window.dispatchEvent(new StorageEvent('storage', { key: `${PUBLISHED_KEY_PREFIX}${psId}_${reviewType}` }));

    console.log(`[HPL] ✅ Successfully published ${teamsToPublish.length} teams for ${psId} (${reviewType}) to Leaderboard!`);
    return { success: true, publishedCount: teamsToPublish.length };
  } catch (err: any) {
    console.error('[HPL] publishPsMarksToLeaderboard exception:', err);
    return { success: false, publishedCount: 0, error: err?.message || 'Server error publishing marks.' };
  }
}


