import { supabase } from '../client_config';

export interface TeamEvaluationRecord {
  id?: string;
  squad_id: string;
  team_name: string;
  ps_id: string;
  week: string; // 'week1' | 'week2' | 'week3'
  marks: number;
  feedback?: string;
  graded_by?: string;
  created_at?: string;
  updated_at?: string;
}

const EVALUATIONS_CACHE_PREFIX = 'hpl_evaluations_cache_';

/**
 * Get cached evaluations from localStorage for offline or fallback support.
 */
function getCachedEvaluations(week: string): Record<string, TeamEvaluationRecord> {
  try {
    const raw = localStorage.getItem(`${EVALUATIONS_CACHE_PREFIX}${week}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Persist evaluations to localStorage cache.
 */
function setCachedEvaluations(week: string, data: Record<string, TeamEvaluationRecord>) {
  try {
    localStorage.setItem(`${EVALUATIONS_CACHE_PREFIX}${week}`, JSON.stringify(data));
  } catch {
    // ignore local storage err
  }
}

/**
 * Fetch all evaluations for a specific week ('week1', 'week2', 'week3').
 * Returns a dictionary mapping `squad_id` -> TeamEvaluationRecord.
 */
export async function fetchEvaluationsByWeek(week: string = 'week1'): Promise<Record<string, TeamEvaluationRecord>> {
  const cached = getCachedEvaluations(week);

  try {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .eq('week', week);

    if (error) {
      // Table evaluations is deprecated/not in schema cache, fallback silently to cache
      return cached;
    }

    if (data && Array.isArray(data)) {
      const map: Record<string, TeamEvaluationRecord> = { ...cached };
      for (const row of data) {
        if (row.squad_id) {
          const rec: TeamEvaluationRecord = {
            id: row.id,
            squad_id: row.squad_id,
            team_name: row.team_name,
            ps_id: row.ps_id,
            week: row.week || week,
            marks: Number(row.marks) || 0,
            feedback: row.feedback || '',
            graded_by: row.graded_by || 'admin',
            created_at: row.created_at,
            updated_at: row.updated_at
          };
          map[row.squad_id] = rec;
          map[row.squad_id.toLowerCase()] = rec;
          map[row.squad_id.toUpperCase()] = rec;
          if (row.team_name) {
            map[row.team_name] = rec;
            map[row.team_name.toLowerCase().trim()] = rec;
            const norm = row.team_name.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (norm) map[norm] = rec;
          }
        }
      }
      setCachedEvaluations(week, map);
      return map;
    }

    return cached;
  } catch (err) {
    console.warn('[HPL] fetchEvaluationsByWeek exception, returning cache:', err);
    return cached;
  }
}

/**
 * Save or update evaluation marks for a single team.
 * Saves to both Supabase and localStorage, then dispatches an update event for live UI reactivity.
 */
export async function saveTeamEvaluation(record: TeamEvaluationRecord): Promise<{ success: boolean; error?: string }> {
  const week = record.week || 'week1';
  const squadId = record.squad_id;

  // 1. Update localStorage cache immediately for instant UI feedback
  const cached = getCachedEvaluations(week);
  cached[squadId] = {
    ...cached[squadId],
    ...record,
    updated_at: new Date().toISOString()
  };
  setCachedEvaluations(week, cached);

  // Broadcast event across components in this tab
  window.dispatchEvent(new CustomEvent('hpl-evaluations-update', { detail: { week, squadId } }));

  // 2. Persist to Supabase `evaluations` table
  try {
    const payload = {
      squad_id: record.squad_id,
      team_name: record.team_name,
      ps_id: record.ps_id,
      week: week,
      marks: Number(record.marks) || 0,
      feedback: record.feedback || '',
      graded_by: record.graded_by || 'admin',
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('evaluations')
      .upsert(payload, { onConflict: 'squad_id,week' });

    if (error) {
      console.warn('[HPL] saveTeamEvaluation Supabase upsert note:', error.message);
      // Even if DB table is missing, local storage successfully stored it
      return { success: true, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('[HPL] saveTeamEvaluation exception:', err);
    return { success: true, error: err.message };
  }
}

/**
 * Bulk save multiple team evaluations (e.g., when clicking "Save All").
 */
export async function batchSaveEvaluations(records: TeamEvaluationRecord[]): Promise<{ success: boolean; error?: string }> {
  if (!records.length) return { success: true };
  const week = records[0].week || 'week1';

  // 1. Update cache
  const cached = getCachedEvaluations(week);
  records.forEach(rec => {
    cached[rec.squad_id] = {
      ...cached[rec.squad_id],
      ...rec,
      updated_at: new Date().toISOString()
    };
  });
  setCachedEvaluations(week, cached);
  window.dispatchEvent(new CustomEvent('hpl-evaluations-update', { detail: { week } }));

  // 2. Upsert to Supabase
  try {
    const payloads = records.map(r => ({
      squad_id: r.squad_id,
      team_name: r.team_name,
      ps_id: r.ps_id,
      week: r.week || week,
      marks: Number(r.marks) || 0,
      feedback: r.feedback || '',
      graded_by: r.graded_by || 'admin',
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from('evaluations')
      .upsert(payloads, { onConflict: 'squad_id,week' });

    if (error) {
      console.warn('[HPL] batchSaveEvaluations Supabase upsert note:', error.message);
      return { success: true, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('[HPL] batchSaveEvaluations exception:', err);
    return { success: true, error: err.message };
  }
}

/**
 * Subscribe to evaluations updates in real-time.
 */
export function subscribeToEvaluations(week: string, onUpdate: () => void): () => void {
  // 1. Supabase Realtime channel
  const channel = supabase
    .channel(`evaluations_realtime_${week}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'evaluations' },
      () => {
        onUpdate();
      }
    )
    .subscribe();

  // 2. Custom window event listener
  const handleLocalUpdate = (e: any) => {
    if (!e.detail || e.detail.week === week) {
      onUpdate();
    }
  };

  // 3. Storage event listener (multi-tab sync)
  const handleStorage = (e: StorageEvent) => {
    if (e.key === `${EVALUATIONS_CACHE_PREFIX}${week}`) {
      onUpdate();
    }
  };

  window.addEventListener('hpl-evaluations-update', handleLocalUpdate);
  window.addEventListener('storage', handleStorage);

  return () => {
    supabase.removeChannel(channel);
    window.removeEventListener('hpl-evaluations-update', handleLocalUpdate);
    window.removeEventListener('storage', handleStorage);
  };
}
