import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PageRoute } from '../../types';
import { 
  Trophy, 
  Search, 
  RefreshCw, 
  Download, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Send, 
  CheckCheck, 
  Award, 
  Users, 
  Sparkles, 
  AlertTriangle, 
  X, 
  LogOut, 
  LayoutDashboard, 
  Lightbulb, 
  FileSpreadsheet, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  Menu,
  Calendar
} from 'lucide-react';
import { 
  fetchRound2AggregatedEvaluations,
  publishPsMarksToLeaderboard,
  TeamAggregatedEvaluation,
  RubricDefinition,
  DEFAULT_ROUND2_RUBRICS,
  Round2ReviewRound,
  getPsPublishStatus
} from '../../services/round2EvaluationService';
import { AdminLoginGate } from '../auth/AdminLoginGate';
import { isCurrentAdminAuthenticated, logoutAdminSession, getActiveAdminSession } from '../../services/adminAuthService';
import { ROUND2_PROBLEM_STATEMENTS } from './ProblemStatementsPage';
import { AdminTeamEvalIllustration } from '../illustrations/AdminIllustration';

interface Round2EvaluationDayPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const Round2EvaluationDayPage: React.FC<Round2EvaluationDayPageProps> = ({ onNavigate }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isCurrentAdminAuthenticated());
  const [adminSession, setAdminSession] = useState(() => getActiveAdminSession());

  // Selected Review Round: 'review1' (Wednesday) vs 'review2' (Saturday)
  const [selectedReview, setSelectedReview] = useState<Round2ReviewRound>('review1');

  // Evaluation Data State
  const [round2Evals, setRound2Evals] = useState<TeamAggregatedEvaluation[]>([]);
  const [round2Rubrics, setRound2Rubrics] = useState<RubricDefinition[]>(DEFAULT_ROUND2_RUBRICS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalLiveMentorEvals, setTotalLiveMentorEvals] = useState<number>(0);
  const [lastRefetchTime, setLastRefetchTime] = useState<Date | null>(null);

  // Filters and UI State
  const [selectedPsFilter, setSelectedPsFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [evalDetailModalTeam, setEvalDetailModalTeam] = useState<TeamAggregatedEvaluation | null>(null);
  const [publishModalPsId, setPublishModalPsId] = useState<string | null>(null);
  const [isPublishingPs, setIsPublishingPs] = useState<boolean>(false);
  const [publishSuccessMsg, setPublishSuccessMsg] = useState<string>('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Load evaluations from Supabase
  const loadData = useCallback(async (isManualRefetch = false, reviewOverride?: Round2ReviewRound) => {
    setIsLoading(true);
    const targetReview = reviewOverride || selectedReview;
    try {
      const res = await fetchRound2AggregatedEvaluations(targetReview);
      setRound2Evals(res.teams);
      setRound2Rubrics(res.rubrics);
      setTotalLiveMentorEvals(res.totalEvaluations);
      setLastRefetchTime(new Date());
      if (isManualRefetch) {
        setPublishSuccessMsg(`Refetched ${res.totalEvaluations} live mentor reviews for ${targetReview === 'review2' ? 'Review 2 (Saturday)' : 'Review 1 (Wednesday)'} from Supabase!`);
        setTimeout(() => setPublishSuccessMsg(''), 4000);
      }
    } catch (err) {
      console.error('[HPL] Failed to load Round 2 evaluations:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedReview]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData(false, selectedReview);
    }
  }, [isAuthenticated, selectedReview]);

  // PS Counts & Averages for Filter Buttons
  const psCounts = useMemo(() => {
    const counts: Record<string, { total: number; graded: number; avgSum: number; avg: number }> = {
      all: { total: round2Evals.length, graded: 0, avgSum: 0, avg: 0 },
      'ps-01': { total: 0, graded: 0, avgSum: 0, avg: 0 },
      'ps-02': { total: 0, graded: 0, avgSum: 0, avg: 0 },
      'ps-03': { total: 0, graded: 0, avgSum: 0, avg: 0 },
      'ps-04': { total: 0, graded: 0, avgSum: 0, avg: 0 },
    };

    round2Evals.forEach(t => {
      if (t.evaluationsCount > 0) {
        counts.all.graded++;
        counts.all.avgSum += t.averageMarks;
      }
      if (counts[t.psId]) {
        counts[t.psId].total++;
        if (t.evaluationsCount > 0) {
          counts[t.psId].graded++;
          counts[t.psId].avgSum += t.averageMarks;
        }
      }
    });

    Object.keys(counts).forEach(k => {
      if (counts[k].graded > 0) {
        counts[k].avg = parseFloat((counts[k].avgSum / counts[k].graded).toFixed(1));
      }
    });

    return counts;
  }, [round2Evals]);

  // Filtered teams list based on PS and Search query
  const filteredTeams = useMemo(() => {
    let list = [...round2Evals];
    if (selectedPsFilter !== 'all') {
      list = list.filter(t => t.psId === selectedPsFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(t => 
        t.teamName.toLowerCase().includes(q) ||
        t.squadId.toLowerCase().includes(q) ||
        t.teamCode.toLowerCase().includes(q) ||
        t.leaderName.toLowerCase().includes(q) ||
        t.mentorEvaluations.some(m => m.mentorName.toLowerCase().includes(q))
      );
    }
    // Sort primarily by average marks descending, then rank ascending
    return list.sort((a, b) => {
      if (b.averageMarks !== a.averageMarks) {
        return b.averageMarks - a.averageMarks;
      }
      return a.rank - b.rank;
    });
  }, [round2Evals, selectedPsFilter, searchQuery]);

  // Track Metrics
  const trackStats = useMemo(() => {
    const totalTeams = filteredTeams.length;
    let gradedTeams = 0;
    let fullyGradedCount = 0;
    let sumAvg = 0;
    let highestAvg = 0;
    let highestTotal = 0;

    filteredTeams.forEach(t => {
      if (t.evaluationsCount > 0) {
        gradedTeams++;
        sumAvg += t.averageMarks;
        if (t.averageMarks > highestAvg) highestAvg = t.averageMarks;
        if (t.totalMarks > highestTotal) highestTotal = t.totalMarks;
      }
      if (t.evaluationsCount >= 3) {
        fullyGradedCount++;
      }
    });

    const avg = gradedTeams > 0 ? (sumAvg / gradedTeams).toFixed(1) : '0';
    const isPublished = selectedPsFilter === 'all'
      ? ['ps-01', 'ps-02', 'ps-03', 'ps-04'].every(id => getPsPublishStatus(id, selectedReview).isPublished)
      : getPsPublishStatus(selectedPsFilter, selectedReview).isPublished;

    return { totalTeams, gradedTeams, fullyGradedCount, avg, highestAvg, highestTotal, isPublished };
  }, [filteredTeams, selectedPsFilter, selectedReview]);

  // Handle Leaderboard Publish Confirmation
  const handleConfirmPublish = async () => {
    if (!publishModalPsId) return;
    setIsPublishingPs(true);
    try {
      const res = await publishPsMarksToLeaderboard(
        publishModalPsId,
        round2Evals,
        adminSession?.email || 'admin@hpl',
        selectedReview
      );
      if (res.success) {
        setPublishSuccessMsg(`Successfully published ${selectedReview === 'review2' ? 'Review 2 (Saturday)' : 'Review 1 (Wednesday)'} average marks for ${res.publishedCount} teams to the live Leaderboard!`);
        await loadData(false, selectedReview);
        setTimeout(() => setPublishSuccessMsg(''), 6000);
      } else {
        alert(res.error || 'Failed to publish marks to leaderboard.');
      }
    } catch (e: any) {
      alert(e?.message || 'Error publishing marks.');
    } finally {
      setIsPublishingPs(false);
      setPublishModalPsId(null);
    }
  };

  const handleLogout = () => {
    logoutAdminSession();
    setIsAuthenticated(false);
  };

  // Login Gate if unauthenticated
  if (!isAuthenticated) {
    return (
      <AdminLoginGate
        onAuthenticated={() => {
          setIsAuthenticated(true);
          setAdminSession(getActiveAdminSession());
        }}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1E1B4B] flex flex-col lg:flex-row font-sans selection:bg-amber-400 selection:text-[#1E1B4B]">
      
      {/* ── MOBILE SIDEBAR BACKDROP ── */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── 1. DEDICATED ADMIN SIDEBAR ── */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#F2EDE4] border-r border-[#1E1B4B]/15 flex flex-col justify-between p-4 transition-transform duration-300 lg:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      }`}>
        <div className="space-y-6">
          {/* Logo & Portal Header */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#1E1B4B] text-white flex items-center justify-center font-display font-black text-lg shadow-sm">
                HPL
              </div>
              <div>
                <span className="font-display font-black text-sm tracking-tight text-[#1E1B4B] block leading-tight">
                  HACKATHON PREMIER LEAGUE
                </span>
                <span className="font-mono text-[10px] text-[#4F46E5] font-bold block uppercase tracking-wider">
                  Admin Portal
                </span>
              </div>
            </div>
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-mono font-bold">
            {/* Round 2 Evaluation Day (Active Page) */}
            <div className="p-3 rounded-xl bg-[#4F46E5] text-white shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-4 h-4 text-amber-300" />
                <span className="font-display font-black text-xs uppercase tracking-wide">Evaluation Day</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500 text-white font-mono text-[9px] font-black uppercase">
                LIVE
              </span>
            </div>

            {/* Back to Idea Submissions */}
            <button
              onClick={() => onNavigate('admin')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Idea Submissions</span>
            </button>

            {/* Live Leaderboard */}
            <button
              onClick={() => onNavigate('leaderboard')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left cursor-pointer"
            >
              <Award className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Public Leaderboard</span>
            </button>

            {/* Problem Statements */}
            <button
              onClick={() => onNavigate('problem-statements')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Problem Statements</span>
            </button>

            {/* Rulebook */}
            <button
              onClick={() => onNavigate('rulebook')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Rulebook</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer mt-4"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Illustration */}
        <div className="pt-3 border-t border-[#1E1B4B]/10 flex flex-col items-center select-none pointer-events-none">
          <AdminTeamEvalIllustration className="w-48 h-40" />
        </div>
      </aside>

      {/* ── 2. MAIN CONTENT AREA ── */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-7 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1B4B]/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-[#1E1B4B]/20 bg-white hover:bg-slate-100"
            >
              <Menu className="w-5 h-5 text-[#1E1B4B]" />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1E1B4B] uppercase tracking-tight">
                  Round 2 Evaluation Day
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-[#4F46E5] font-mono text-xs font-black uppercase border border-indigo-200">
                  {selectedReview === 'review2' ? 'Saturday Sprint · Review 2' : 'Wednesday Sprint · Review 1'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold border border-emerald-300">
                  {totalLiveMentorEvals} Live Submissions
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Dedicated evaluation portal. Switch review checkpoints, inspect rubric scores, and publish verified marks to the public Leaderboard.
              </p>
            </div>
          </div>

          {/* Top Actions: Refetch Button & Admin Pill */}
          <div className="flex flex-wrap items-center gap-3">
            {/* ── EXPLICIT REFETCH BUTTON ── */}
            <button
              type="button"
              onClick={() => loadData(true, selectedReview)}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#1E1B4B]/20 hover:bg-slate-50 text-[#1E1B4B] font-mono text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              title="Manually refetch latest evaluations from database"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#4F46E5] ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Fetching...' : 'Refetch Data'}</span>
            </button>

            {/* Admin Info Pill */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center font-display font-black text-xs">
                AD
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-display font-bold text-xs text-[#1E1B4B] leading-tight">Admin</div>
                <div className="font-mono text-[10px] text-slate-500">{adminSession?.email || 'admin@hpl'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Alert Banner */}
        {publishSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 flex items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="font-display font-bold text-sm">{publishSuccessMsg}</span>
            </div>
            <button 
              onClick={() => setPublishSuccessMsg('')}
              className="text-emerald-700 hover:text-emerald-950 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── 2.5 EVALUATION REVIEW CHECKPOINT SELECTOR ── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 uppercase">
            <Calendar className="w-4 h-4 text-[#4F46E5]" />
            <span>Select Evaluation Checkpoint:</span>
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setSelectedReview('review1');
                loadData(false, 'review1');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedReview === 'review1'
                  ? 'bg-[#1E1B4B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Review 1 · Wednesday</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-bold">
                Review 1
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedReview('review2');
                loadData(false, 'review2');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedReview === 'review2'
                  ? 'bg-[#1E1B4B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Review 2 · Saturday</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold">
                Review 2
              </span>
            </button>
          </div>
        </div>

        {/* ── 3. PROBLEM STATEMENT TABS FILTER (SEPARATE VIEW FOR EACH PS) ── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-2xs space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-mono font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#4F46E5]" />
              <span>Select Problem Statement Track:</span>
            </div>
            <div className="text-xs font-mono text-slate-500">
              Active: <strong className="text-[#4F46E5] uppercase">{selectedPsFilter === 'all' ? 'All Tracks' : ROUND2_PROBLEM_STATEMENTS.find(p => p.id === selectedPsFilter)?.psCode}</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            {/* ALL TRACKS */}
            <button
              type="button"
              onClick={() => setSelectedPsFilter('all')}
              className={`p-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-between border ${
                selectedPsFilter === 'all'
                  ? 'bg-[#1E1B4B] text-white border-[#1E1B4B] shadow-sm ring-2 ring-purple-400'
                  : 'bg-slate-50 hover:bg-slate-100 text-[#1E1B4B] border-slate-200'
              }`}
            >
              <span>ALL TRACKS</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                selectedPsFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {psCounts.all.total} Teams
              </span>
            </button>

            {/* 4 PS TABS */}
            {ROUND2_PROBLEM_STATEMENTS.map(ps => {
              const stats = psCounts[ps.id] || { total: 10, graded: 0, avg: 0 };
              const isSelected = selectedPsFilter === ps.id;
              const isPublished = getPsPublishStatus(ps.id, selectedReview).isPublished;

              return (
                <button
                  key={ps.id}
                  type="button"
                  onClick={() => setSelectedPsFilter(ps.id)}
                  className={`p-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-between border min-w-0 ${
                    isSelected
                      ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-sm ring-2 ring-purple-400'
                      : 'bg-slate-50 hover:bg-slate-100 text-[#1E1B4B] border-slate-200'
                  }`}
                >
                  <div className="truncate text-left mr-1">
                    <span className="block font-black">{ps.psCode}</span>
                    <span className="block text-[10px] font-sans truncate opacity-90">{ps.title}</span>
                  </div>
                  <div className="flex flex-col items-end shrink-0 gap-0.5">
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#4F46E5]'
                    }`}>
                      {stats.total}
                    </span>
                    {isPublished && (
                      <span className={`text-[9px] font-bold ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`}>
                        ● Live
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 4. TRACK SUMMARY METRICS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block">
              Teams in Track
            </span>
            <span className="font-display font-black text-2xl text-[#1E1B4B]">
              {trackStats.totalTeams}
            </span>
            <span className="text-[10px] text-slate-400 font-sans block">Shortlisted squads</span>
          </div>

          <div className="bg-white rounded-xl border border-emerald-200 p-4 shadow-2xs">
            <span className="font-mono text-[10px] uppercase font-bold text-emerald-700 block">
              Evaluated Teams
            </span>
            <span className="font-display font-black text-2xl text-emerald-700">
              {trackStats.gradedTeams}
            </span>
            <span className="text-[10px] text-slate-400 font-sans block">{trackStats.fullyGradedCount} with 3+ reviews</span>
          </div>

          <div className="bg-white rounded-xl border border-purple-200 p-4 shadow-2xs">
            <span className="font-mono text-[10px] uppercase font-bold text-purple-700 block">
              Track Average Score
            </span>
            <span className="font-display font-black text-2xl text-purple-700">
              {trackStats.avg}
            </span>
            <span className="text-[10px] text-slate-400 font-sans block">Out of 50 Avg Marks</span>
          </div>

          <div className="bg-white rounded-xl border border-blue-200 p-4 shadow-2xs">
            <span className="font-mono text-[10px] uppercase font-bold text-blue-700 block">
              Highest Score
            </span>
            <span className="font-display font-black text-2xl text-blue-700">
              {trackStats.highestAvg}
            </span>
            <span className="text-[10px] text-slate-400 font-sans block">Total: {trackStats.highestTotal}/150</span>
          </div>

          <div className={`rounded-xl border p-4 shadow-2xs ${
            trackStats.isPublished ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
          }`}>
            <span className={`font-mono text-[10px] uppercase font-bold block ${
              trackStats.isPublished ? 'text-emerald-800' : 'text-amber-800'
            }`}>
              Leaderboard Status
            </span>
            <span className={`font-display font-black text-lg block leading-tight ${
              trackStats.isPublished ? 'text-emerald-700' : 'text-amber-700'
            }`}>
              {trackStats.isPublished ? 'PUBLISHED' : 'DRAFT'}
            </span>
            <span className={`text-[10px] font-sans block ${
              trackStats.isPublished ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {trackStats.isPublished ? 'Scores active on leaderboard' : 'Pending leaderboard publish'}
            </span>
          </div>
        </div>

        {/* ── 5. RUBRICS CRITERIA RIBBON ── */}
        <div className="bg-[#FAF6EE] rounded-2xl border border-[#1E1B4B]/15 p-4 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E1B4B]/10 pb-2 mb-2">
            <div className="font-display font-black text-xs uppercase text-[#1E1B4B] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
              <span>Evaluation Rubrics Reference (5 Criteria &bull; 10 Marks Each &bull; Max 50/Mentor)</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-bold">
              Average Marks = (Total Marks / Reviewing Mentors)
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-sans">
            {round2Rubrics.map((r) => (
              <div key={r.key} className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between font-mono font-bold text-xs mb-0.5">
                  <span className="px-1.5 py-0.2 rounded bg-purple-100 text-[#4F46E5] font-black">{r.code}</span>
                  <span className="text-slate-500">Max {r.maxMarks}</span>
                </div>
                <div className="font-display font-bold text-slate-800 truncate" title={r.label}>
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 6. TOOLBAR: SEARCH, CSV, DYNAMIC PS PUBLISH BUTTON ── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team, squad, leader, or mentor..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-[#1E1B4B]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Export CSV Button */}
            <button
              type="button"
              onClick={() => {
                if (filteredTeams.length === 0) return;
                const headers = [
                  'Rank',
                  'Squad ID',
                  'Team Name',
                  'Team Code',
                  'Leader Name',
                  'Problem Statement',
                  'Mentors Evaluated',
                  'Average Marks (Out of 50)',
                  'Wednesday Total Marks (Out of 150)',
                  'Publish Status'
                ];
                const rows = filteredTeams.map((t, idx) => [
                  idx + 1,
                  t.squadId,
                  `"${t.teamName.replace(/"/g, '""')}"`,
                  t.teamCode,
                  `"${t.leaderName.replace(/"/g, '""')}"`,
                  `"${t.psCode}: ${t.psTitle}"`,
                  `"${t.mentorEvaluations.map(m => m.mentorName).join(', ')}"`,
                  t.averageMarks,
                  t.totalMarks,
                  t.isPublished ? 'Published' : 'Pending'
                ]);
                const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', `HPL_Evaluation_Day_${selectedPsFilter}_${new Date().toISOString().slice(0,10)}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Export CSV</span>
            </button>

            {/* ── DYNAMIC SEPARATE PS-WISE PUBLISH BUTTON ── */}
            <button
              type="button"
              onClick={() => setPublishModalPsId(selectedPsFilter)}
              className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-purple-900 text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-98 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {selectedPsFilter === 'all'
                  ? `Publish All (${selectedReview === 'review2' ? 'Review 2' : 'Review 1'}) to Leaderboard`
                  : `Publish ${ROUND2_PROBLEM_STATEMENTS.find(p => p.id === selectedPsFilter)?.psCode || 'PS'} (${selectedReview === 'review2' ? 'Review 2' : 'Review 1'}) to Leaderboard`}
              </span>
            </button>
          </div>
        </div>

        {/* ── 7. EVALUATIONS TABLE ── */}
        <div className="bg-white rounded-2xl border border-[#1E1B4B]/15 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-[#1E1B4B] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-3 text-center w-12">#</th>
                  <th className="py-3.5 px-4">Squad / Team</th>
                  <th className="py-3.5 px-3">Track</th>
                  <th className="py-3.5 px-3">Reviewing Mentors</th>
                  <th className="py-3.5 px-3 text-center">Rubrics (R1–R5)</th>
                  <th className="py-3.5 px-4 text-center min-w-[140px]">
                    {selectedReview === 'review2' ? 'Saturday Review 2 Marks' : 'Wednesday Review 1 Marks'}
                    <span className="block text-[9px] text-indigo-200 normal-case font-mono font-normal">
                      (Avg / 50 &bull; Total / 150)
                    </span>
                  </th>
                  <th className="py-3.5 px-3 text-center">Leaderboard</th>
                  <th className="py-3.5 px-4 text-center w-28">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#1E1B4B]/10 text-xs font-sans">
                {filteredTeams.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500 font-mono">
                      {isLoading ? (
                        <div className="flex flex-col items-center gap-2">
                          <RefreshCw className="w-6 h-6 animate-spin text-[#4F46E5]" />
                          <span>Loading live evaluations from Supabase...</span>
                        </div>
                      ) : (
                        <span>No evaluation entries found matching the filter criteria.</span>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredTeams.map((team, index) => (
                    <tr key={team.squadId} className="hover:bg-purple-50/30 transition-colors">
                      {/* Rank */}
                      <td className="py-3.5 px-3 font-mono font-bold text-center text-slate-600">
                        #{index + 1}
                      </td>

                      {/* Squad details */}
                      <td className="py-3.5 px-4">
                        <div className="font-display font-black text-sm text-[#1E1B4B]">
                          {team.teamName}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-[11px] text-[#4F46E5] font-bold">
                            {team.squadId}
                          </span>
                          {team.teamCode && (
                            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
                              {team.teamCode}
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 truncate max-w-[180px]">
                          Leader: {team.leaderName}
                        </div>
                      </td>

                      {/* PS badge */}
                      <td className="py-3.5 px-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded font-mono text-[10px] font-bold ${
                          team.psId === 'ps-01' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                          team.psId === 'ps-02' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                          team.psId === 'ps-03' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          'bg-sky-100 text-sky-800 border border-sky-200'
                        }`}>
                          {team.psCode}
                        </span>
                        <span className="block text-[11px] text-slate-600 font-medium truncate max-w-[150px] mt-0.5">
                          {team.psTitle}
                        </span>
                      </td>

                      {/* Reviewing Mentors */}
                      <td className="py-3.5 px-3">
                        <div className="flex flex-wrap gap-1 max-w-[210px]">
                          {team.mentorEvaluations.length === 0 ? (
                            <span className="text-[11px] text-slate-400 italic">No reviews yet</span>
                          ) : (
                            team.mentorEvaluations.map((m, mIdx) => (
                              <span 
                                key={mIdx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700"
                                title={`${m.mentorName}: ${m.total}/50 marks`}
                              >
                                <span className="font-bold truncate max-w-[110px]">
                                  {m.mentorName.replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.)\s*/, '')}
                                </span>
                                <span className="text-[#4F46E5] font-black">{m.total}</span>
                              </span>
                            ))
                          )}
                        </div>
                      </td>

                      {/* Rubrics (R1 - R5) */}
                      <td className="py-3.5 px-3 text-center">
                        <div className="inline-flex items-center gap-1 font-mono text-[11px]">
                          <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-bold" title="R1 (Architecture & System Design)">
                            {team.rubricTotals.mark1}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold" title="R2 (Implementation & Code Quality)">
                            {team.rubricTotals.mark2}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold" title="R3 (Problem & Domain Logic)">
                            {team.rubricTotals.mark3}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold" title="R4 (Security & Scalability)">
                            {team.rubricTotals.mark4}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold" title="R5 (Innovation & UI/UX)">
                            {team.rubricTotals.mark5}
                          </span>
                        </div>
                      </td>

                      {/* Wednesday Marks (Average / 50 & Total / 150) */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="flex items-baseline gap-1">
                            <span className="font-mono font-black text-lg text-[#4F46E5]">
                              {team.averageMarks}
                            </span>
                            <span className="font-mono text-[10px] text-slate-400 font-bold">/ 50 Avg</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                            Total: <strong className="text-slate-700">{team.totalMarks}</strong> / 150
                          </div>
                          <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
                              style={{ width: `${Math.min(100, Math.round((team.totalMarks / 150) * 100))}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Leaderboard Status */}
                      <td className="py-3.5 px-3 text-center">
                        {team.isPublished ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Live</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-500 border border-slate-300">
                            <Clock className="w-3 h-3" />
                            <span>Draft</span>
                          </span>
                        )}
                      </td>

                      {/* Actions: View Details Modal */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setEvalDetailModalTeam(team)}
                          className="px-3 py-1.5 rounded-lg border border-[#4F46E5]/40 hover:bg-[#4F46E5] hover:text-white text-[#4F46E5] text-xs font-mono font-bold transition-all flex items-center gap-1 mx-auto cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* ── 8. ROUND 2 WEDNESDAY EVALUATION DETAIL MODAL ── */}
      {evalDetailModalTeam && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 font-mono text-xs font-black text-[#4F46E5]">
                    {evalDetailModalTeam.squadId}
                  </span>
                  {evalDetailModalTeam.teamCode && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs text-slate-600 font-bold">
                      {evalDetailModalTeam.teamCode}
                    </span>
                  )}
                  <span className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold ${
                    evalDetailModalTeam.psId === 'ps-01' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                    evalDetailModalTeam.psId === 'ps-02' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    evalDetailModalTeam.psId === 'ps-03' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    'bg-sky-100 text-sky-800 border border-sky-200'
                  }`}>
                    {evalDetailModalTeam.psCode}: {evalDetailModalTeam.psTitle}
                  </span>
                </div>
                <h2 className="text-2xl font-display font-black text-[#1E1B4B]">
                  {evalDetailModalTeam.teamName}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
                  {evalDetailModalTeam.leaderName && (
                    <span>Leader: <strong className="text-slate-800">{evalDetailModalTeam.leaderName}</strong></span>
                  )}
                  {evalDetailModalTeam.leaderEmail && (
                    <span>Email: <strong className="text-slate-800">{evalDetailModalTeam.leaderEmail}</strong></span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setEvalDetailModalTeam(null)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100">
                <span className="text-[11px] font-mono font-bold text-[#4F46E5] uppercase tracking-wider block">
                  Average Score (Leaderboard)
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-display font-black text-[#1E1B4B]">
                    {evalDetailModalTeam.averageMarks}
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-bold">
                    / 50 Avg
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">
                  Cumulative Total: <strong>{evalDetailModalTeam.totalMarks}</strong> / 150
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  Mentors Evaluated
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-display font-black text-[#1E1B4B]">
                    {evalDetailModalTeam.evaluationsCount}
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-bold">
                    / 3 mentors
                  </span>
                </div>
                <div className="mt-2 text-xs font-medium text-slate-600">
                  {evalDetailModalTeam.evaluationsCount >= 3 ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Complete Evaluation (3/3)
                    </span>
                  ) : evalDetailModalTeam.evaluationsCount > 0 ? (
                    <span className="text-amber-700 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Partial ({evalDetailModalTeam.evaluationsCount}/3 completed)
                    </span>
                  ) : (
                    <span className="text-slate-400">No mentor review yet</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  Leaderboard Sync
                </span>
                <div className="mt-2">
                  {evalDetailModalTeam.isPublished ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCheck className="w-4 h-4 text-emerald-600" />
                      Published Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      <Clock className="w-4 h-4 text-amber-600" />
                      Pending Publish
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[11px] text-slate-500 leading-tight">
                  {evalDetailModalTeam.isPublished 
                    ? 'Average marks active on the public Leaderboard'
                    : 'Click "Publish Marks to Leaderboard" to make live'}
                </p>
              </div>
            </div>

            {/* Rubric Totals Breakdown (R1 - R5) */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-black text-sm text-[#1E1B4B] uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#4F46E5]" />
                  Cumulative Rubrics Breakdown
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  Total points earned across all reviewing mentors
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {round2Rubrics.map(rubric => {
                  const val = evalDetailModalTeam.rubricTotals[rubric.key] || 0;
                  const maxForRubric = evalDetailModalTeam.evaluationsCount * 10;
                  const pct = maxForRubric > 0 ? Math.round((val / maxForRubric) * 100) : 0;
                  return (
                    <div key={rubric.key} className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-black text-[#4F46E5]">
                          {rubric.code}
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-700">
                          {val} <span className="text-[10px] text-slate-400 font-normal">/{maxForRubric || 30}</span>
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-600 block line-clamp-1 mt-0.5">
                        {rubric.label}
                      </span>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Mentor Submissions */}
            <div className="space-y-4">
              <h3 className="font-display font-black text-base text-[#1E1B4B] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#4F46E5]" />
                Individual Mentor Evaluations ({evalDetailModalTeam.mentorEvaluations.length})
              </h3>

              {evalDetailModalTeam.mentorEvaluations.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-sm font-medium text-slate-500">
                    No mentor evaluations have been logged for this team yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {evalDetailModalTeam.mentorEvaluations.map((m, idx) => (
                    <div key={m.id || idx} className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-black text-sm text-[#1E1B4B]">
                              {m.mentorName}
                            </span>
                            <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-indigo-50 border border-indigo-200 text-[#4F46E5] font-bold">
                              Mentor #{idx + 1}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                            {m.evaluation || 'Wednesday Evaluation'} · {m.createdAt ? new Date(m.createdAt).toLocaleString() : 'Round 2'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                          <span className="text-xs font-mono text-slate-500 font-bold uppercase">Mentor Total:</span>
                          <span className="font-mono text-lg font-black text-[#4F46E5]">
                            {m.total}
                          </span>
                          <span className="font-mono text-xs text-slate-400 font-bold">/ 50</span>
                        </div>
                      </div>

                      {/* Marks per Rubric */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {round2Rubrics.map(rubric => {
                          const val = (m as any)[rubric.key] || 0;
                          return (
                            <div key={rubric.key} className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                              <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block">
                                {rubric.code}: {rubric.label.split('&')[0].trim()}
                              </span>
                              <span className="font-mono text-base font-black text-[#1E1B4B] block mt-0.5">
                                {val} <span className="text-[10px] text-slate-400 font-normal">/10</span>
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Feedback Comment */}
                      {m.feedback ? (
                        <div className="bg-amber-50/70 border-l-4 border-amber-500 p-3.5 rounded-r-xl">
                          <span className="font-mono text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                            Mentor Feedback & Remarks
                          </span>
                          <p className="text-xs text-slate-700 italic leading-relaxed">
                            "{m.feedback}"
                          </p>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 italic">
                          No written feedback comments provided for this submission.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setEvalDetailModalTeam(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 9. PUBLISH TO LEADERBOARD CONFIRMATION MODAL ── */}
      {publishModalPsId && (() => {
        const teamsToPublish = publishModalPsId === 'all'
          ? round2Evals
          : round2Evals.filter(t => t.psId === publishModalPsId);
        const gradedCount = teamsToPublish.filter(t => t.evaluationsCount > 0).length;
        const psLabel = publishModalPsId === 'all'
          ? 'All 4 Problem Statements'
          : publishModalPsId === 'ps-01' ? 'PS 01: AyurEssence' :
            publishModalPsId === 'ps-02' ? 'PS 02: SMARTBUS' :
            publishModalPsId === 'ps-03' ? 'PS 03: Sahayak' :
            publishModalPsId === 'ps-04' ? 'PS 04: SWMS' : publishModalPsId;

        return (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 my-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-[#4F46E5] flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-black text-[#1E1B4B]">
                    Confirm Leaderboard Publishing
                  </h3>
                  <p className="text-xs font-mono text-slate-500 mt-1">
                    Track: <strong className="text-[#4F46E5]">{psLabel}</strong> &bull; Round: <strong className="text-[#4F46E5]">{selectedReview === 'review2' ? 'Review 2 (Saturday)' : 'Review 1 (Wednesday)'}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setPublishModalPsId(null)}
                  disabled={isPublishingPs}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Total Teams in Track</span>
                  <span className="text-2xl font-display font-black text-[#1E1B4B]">{teamsToPublish.length}</span>
                </div>
                <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase block">Graded Teams with Marks</span>
                  <span className="text-2xl font-display font-black text-emerald-800">{gradedCount}</span>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 space-y-1">
                  <p className="font-bold">
                    Are you sure you want to publish these marks live?
                  </p>
                  <p className="text-amber-800 leading-relaxed">
                    This will synchronize the mentor-evaluated <strong>average marks</strong> directly to the public Leaderboard page for <strong>{selectedReview === 'review2' ? 'Review 2 (Saturday)' : 'Review 1 (Wednesday)'}</strong> for all teams in <strong>{psLabel}</strong>. Participants and visitors will immediately see the updated rankings based on their average score.
                  </p>
                </div>
              </div>

              {/* Mini Preview of Top Teams */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase block">
                  Preview of Teams & Average Scores to Publish ({teamsToPublish.length})
                </span>
                <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100">
                  {teamsToPublish.map((team, tIdx) => (
                    <div key={team.squadId} className="flex items-center justify-between p-2.5 text-xs hover:bg-slate-50">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 font-bold w-5">#{tIdx + 1}</span>
                        <span className="font-display font-bold text-[#1E1B4B]">{team.teamName}</span>
                        <span className="font-mono text-[10px] text-slate-400">({team.squadId})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-[#4F46E5] text-sm">{team.averageMarks} Pts</span>
                        <span className="font-mono text-[10px] text-slate-400">({team.totalMarks}/150)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPublishModalPsId(null)}
                  disabled={isPublishingPs}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPublish}
                  disabled={isPublishingPs}
                  className="px-6 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-indigo-700 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isPublishingPs ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Publishing to Live...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm & Publish Live</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
};

export default Round2EvaluationDayPage;
