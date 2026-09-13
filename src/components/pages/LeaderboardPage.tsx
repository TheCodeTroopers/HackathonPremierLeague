import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { PageRoute } from '../../types';
import { HPL_IMAGES } from '../../assets/images';
import { gsap } from 'gsap';
import { 
  Trophy, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  ArrowRight, 
  ChevronDown, 
  TrendingUp, 
  Handshake, 
  Swords, 
  Star, 
  Users, 
  Award, 
  Lock, 
  Eye, 
  Clock, 
  Sparkles,
  Filter,
  Search,
  CheckCircle2,
  RefreshCw,
  Zap,
  Info,
  X
} from 'lucide-react';
import { ROUND2_PROBLEM_STATEMENTS } from './ProblemStatementsPage';
import { 
  fetchRound2PsSelectionsFromDB, 
  calculateStrictAllocations, 
  Round2PsSelectionRow 
} from '../../services/round2AllocationService';
import { 
  OFFICIAL_QUALIFIED_TEAMS, 
  findQualifiedTeamBySquadId, 
  findQualifiedTeamByEmail,
  findQualifiedTeamByName
} from '../../services/teamPortalService';
import { 
  fetchEvaluationsByWeek, 
  subscribeToEvaluations, 
  TeamEvaluationRecord 
} from '../../services/evaluationService';

interface LeaderboardPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectSquad?: (squadId: string) => void;
}

export interface LeaderboardTeamItem {
  squadId: string;
  teamName: string;
  leaderEmail: string;
  college?: string;
  psId: string;
  psCode: string;
  psTitle: string;
  qualificationRank: number;
  marks: number;
  feedback?: string;
  isGraded: boolean;
  avatarBg: string;
  avatarIcon: string;
  trend: 'up' | 'down' | 'same';
  trendValue: number;
}

// Color and icon palettes for team mascots
const AVATAR_PALETTES = [
  { icon: 'ninja', bg: '#582A9C' },
  { icon: 'bug', bg: '#0D9488' },
  { icon: 'keyboard', bg: '#EA580C' },
  { icon: 'code', bg: '#E11D48' },
  { icon: 'brain', bg: '#059669' },
  { icon: '404', bg: '#7C3AED' },
  { icon: 'skull', bg: '#1E1B4B' },
  { icon: 'shield', bg: '#2563EB' }
];

// Helper to render squad mascot avatars
const SquadAvatar: React.FC<{ icon: string; bg: string }> = ({ icon, bg }) => {
  return (
    <div
      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-2xs border-2 border-white/80"
      style={{ backgroundColor: bg }}
    >
      {icon === 'ninja' && (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10a10 10 0 0 0-10-10zm0 3c2.76 0 5 1.79 5 4s-2.24 4-5 4-5-1.79-5-4 2.24-4 5-4zm-4 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-8 4.5c.67 1.5 2.18 2.5 4 2.5s3.33-1 4-2.5H8z" />
        </svg>
      )}
      {icon === 'bug' && (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="8" y="9" width="8" height="11" rx="4" fill="currentColor" fillOpacity="0.2" />
          <line x1="12" y1="4" x2="12" y2="9" />
          <path d="M6 7l3 2" />
          <path d="M18 7l-3 2" />
          <path d="M4 14h4" />
          <path d="M16 14h4" />
          <path d="M5 20l3-2" />
          <path d="M19 20l-3-2" />
        </svg>
      )}
      {icon === 'keyboard' && (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" fillOpacity="0.2" />
          <line x1="7" y1="9" x2="7.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="9" x2="12.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="17" y1="9" x2="17.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="7" y1="13" x2="7.01" y2="13" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="17" y1="13" x2="17.01" y2="13" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="10" y1="15" x2="14" y2="15" strokeLinecap="round" />
        </svg>
      )}
      {icon === 'code' && (
        <span className="font-mono font-black text-[11px] sm:text-xs tracking-tighter">&lt;/&gt;</span>
      )}
      {icon === 'brain' && (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
        </svg>
      )}
      {icon === '404' && (
        <span className="font-mono font-black text-[10px] sm:text-[11px] tracking-tight">404</span>
      )}
      {icon === 'skull' && (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="11" r="1.5" fill="currentColor" />
          <circle cx="15" cy="11" r="1.5" fill="currentColor" />
          <path d="M12 2a9 9 0 0 0-9 9c0 3.3 1.8 6.2 4.5 7.7V21a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-2.3c2.7-1.5 4.5-4.4 4.5-7.7a9 9 0 0 0-9-9z" />
          <line x1="10" y1="18" x2="10" y2="21" />
          <line x1="14" y1="18" x2="14" y2="21" />
        </svg>
      )}
      {icon === 'shield' && (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm3 10.5H9v-1.2c0-1 1-1.8 2-2h2c1 .2 2 1 2 2v1.2z" />
        </svg>
      )}
    </div>
  );
};

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onNavigate, onSelectSquad }) => {
  // Tabs: 'week1' (active), 'week2' (coming soon), 'week3' (coming soon), 'overall'
  const [activeTab, setActiveTab] = useState<'week1' | 'week2' | 'playoffs' | 'overall'>('week1');
  
  // PS Filter: 'ps-01', 'ps-02', 'ps-03', 'ps-04' (defaults to PS 01)
  const [selectedPsFilter, setSelectedPsFilter] = useState<string>('ps-01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Live Data State
  const [round2DbRows, setRound2DbRows] = useState<Round2PsSelectionRow[]>([]);
  const [evaluationsMap, setEvaluationsMap] = useState<Record<string, TeamEvaluationRecord>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  // Load Problem Statement selections and evaluations from backend
  const loadLeaderboardData = useCallback(async (manual = false) => {
    if (manual) setIsRefreshing(true);
    try {
      const [dbRows, evals] = await Promise.all([
        fetchRound2PsSelectionsFromDB(),
        fetchEvaluationsByWeek('week1')
      ]);
      setRound2DbRows(dbRows);
      setEvaluationsMap(evals);
      setLastSyncTime(new Date());
    } catch (err) {
      console.warn('[HPL] loadLeaderboardData error:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial load and Realtime Subscriptions
  useEffect(() => {
    loadLeaderboardData();

    // Subscribe to live evaluation marks updates
    const unsubscribeEvals = subscribeToEvaluations('week1', () => {
      loadLeaderboardData();
    });

    // Listen to selection updates
    const handleUpdate = () => loadLeaderboardData();
    window.addEventListener('hpl-selection-update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      unsubscribeEvals();
      window.removeEventListener('hpl-selection-update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [loadLeaderboardData]);

  // Compute locked allocation state from DB rows
  const allocationState = useMemo(() => {
    return calculateStrictAllocations(round2DbRows, {});
  }, [round2DbRows]);

  // Build the complete list of teams who selected a Problem Statement
  const rawLeaderboardTeams: LeaderboardTeamItem[] = useMemo(() => {
    const lockedMap = allocationState.lockedMap;
    const items: LeaderboardTeamItem[] = [];

    // 1. First include all teams who locked via DB
    const lockedSquadIds = new Set<string>();

    Object.values(lockedMap).forEach((lock, idx) => {
      lockedSquadIds.add(lock.squadId);
      const evalRecord = evaluationsMap[lock.squadId];
      const marks = evalRecord ? Number(evalRecord.marks) : 0;
      const palette = AVATAR_PALETTES[idx % AVATAR_PALETTES.length];

      items.push({
        squadId: lock.squadId,
        teamName: lock.teamName,
        leaderEmail: lock.leaderEmail,
        psId: lock.psId,
        psCode: lock.psCode || 'PS',
        psTitle: lock.psTitle || 'Problem Statement',
        qualificationRank: lock.rank || idx + 1,
        marks: marks,
        feedback: evalRecord?.feedback || '',
        isGraded: evalRecord !== undefined && evalRecord.marks !== undefined,
        avatarBg: palette.bg,
        avatarIcon: palette.icon,
        trend: marks > 70 ? 'up' : marks > 40 ? 'same' : 'down',
        trendValue: Math.max(1, (idx % 3) + 1)
      });
    });

    // 2. Fallback: If DB is empty, map OFFICIAL_QUALIFIED_TEAMS to default 4 PS tracks
    // (10 teams per track: 1-10 -> ps-01, 11-20 -> ps-02, 21-30 -> ps-03, 31-40 -> ps-04)
    if (items.length === 0) {
      OFFICIAL_QUALIFIED_TEAMS.slice(0, 40).forEach((t, idx) => {
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

        const evalRecord = evaluationsMap[t.squadId];
        const marks = evalRecord ? Number(evalRecord.marks) : 0;
        const palette = AVATAR_PALETTES[idx % AVATAR_PALETTES.length];

        items.push({
          squadId: t.squadId,
          teamName: t.teamName,
          leaderEmail: t.leaderEmail,
          psId,
          psCode,
          psTitle,
          qualificationRank: t.rank,
          marks,
          feedback: evalRecord?.feedback || '',
          isGraded: evalRecord !== undefined,
          avatarBg: palette.bg,
          avatarIcon: palette.icon,
          trend: 'same',
          trendValue: 0
        });
      });
    }

    return items;
  }, [allocationState.lockedMap, evaluationsMap]);

  // Filter and rank teams dynamically
  const rankedTeams = useMemo(() => {
    let list = [...rawLeaderboardTeams];

    // 1. Filter by Problem Statement
    if (selectedPsFilter !== 'all') {
      list = list.filter(item => item.psId === selectedPsFilter);
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(item => 
        item.teamName.toLowerCase().includes(q) ||
        item.squadId.toLowerCase().includes(q) ||
        item.leaderEmail.toLowerCase().includes(q) ||
        item.psTitle.toLowerCase().includes(q)
      );
    }

    // 3. Sort primarily by marks descending, then qualification rank
    list.sort((a, b) => {
      if (b.marks !== a.marks) {
        return b.marks - a.marks;
      }
      return a.qualificationRank - b.qualificationRank;
    });

    return list;
  }, [rawLeaderboardTeams, selectedPsFilter, searchQuery]);

  // Top performers metrics (only teams with marks > 0)
  const topPerformers = useMemo(() => {
    const scoredTeams = rankedTeams.filter(t => t.marks > 0);
    const highest = scoredTeams[0] || null;
    const second = scoredTeams[1] || null;
    const third = scoredTeams[2] || null;
    return { highest, second, third, hasAnyMarks: scoredTeams.length > 0 };
  }, [rankedTeams]);

  // PS counts for filter badges
  const psTeamCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: rawLeaderboardTeams.length,
      'ps-01': 0,
      'ps-02': 0,
      'ps-03': 0,
      'ps-04': 0
    };
    rawLeaderboardTeams.forEach(t => {
      if (counts[t.psId] !== undefined) {
        counts[t.psId]++;
      }
    });
    return counts;
  }, [rawLeaderboardTeams]);

  // ── GSAP ENTRANCE & SCROLL ANIMATIONS ──
  useEffect(() => {
    const gsapObj = (window as any).gsap || gsap;
    const ScrollTriggerObj = (window as any).ScrollTrigger;

    if (gsapObj) {
      if (ScrollTriggerObj) {
        gsapObj.registerPlugin(ScrollTriggerObj);
      }

      const entranceTl = gsapObj.timeline({ defaults: { ease: 'power3.out' } });

      entranceTl.fromTo('.anim-trophy-crest',
        { scale: 0, rotate: -40, opacity: 0 },
        { scale: 1, rotate: -6, opacity: 1, duration: 0.75, ease: 'back.out(2.2)' }
      );

      entranceTl.fromTo('.anim-title-live',
        { y: 35, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)' },
        '-=0.5'
      );

      entranceTl.fromTo('.anim-title-board',
        { y: 40, opacity: 0, scale: 0.85, letterSpacing: '0.08em' },
        { y: 0, opacity: 1, scale: 1, letterSpacing: '0.02em', duration: 0.65, ease: 'back.out(1.8)' },
        '-=0.4'
      );

      entranceTl.fromTo('.anim-subtext',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        '-=0.3'
      );

      if (underlineRef.current) {
        const length = underlineRef.current.getTotalLength() || 60;
        gsapObj.set(underlineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        entranceTl.to(underlineRef.current, {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: 'power2.out'
        }, '-=0.2');
      }

      entranceTl.fromTo('.anim-tabs-bar',
        { scale: 0.88, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' },
        '-=0.3'
      );
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#F6F3EB] text-[#1E1B4B] py-6 sm:py-10 px-3.5 xs:px-5 sm:px-6 lg:px-10 relative overflow-hidden selection:bg-[#FBBF24] selection:text-[#1E1B4B]"
    >
      
      {/* ── TOP RIGHT BACKGROUND DOODLES ── */}
      <div className="absolute top-8 right-6 sm:right-24 pointer-events-none select-none opacity-80 flex items-center gap-6 sm:gap-10 hidden md:flex">
        <div className="font-mono font-bold text-base sm:text-lg text-indigo-500/70 tracking-widest transform -rotate-12">
          &lt; $ &gt; -
        </div>
        <div className="anim-paper-plane transform -rotate-12 opacity-60">
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
            <path d="M 6 22 L 42 6 L 26 42 L 20 28 Z" fill="#431D74" fillOpacity="0.12" stroke="#1E1B4B" strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M 42 6 L 20 28" stroke="#1E1B4B" strokeWidth="1.75" />
            <path d="M 6 36 Q 14 38 20 28" stroke="#1E1B4B" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        
        {/* ── 1. CINEMATIC HEADER TITLE & ROUND TABS ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 pb-2 border-b border-[#1E1B4B]/10">
          
          {/* Left: Trophy + Animated Title + Subtitle */}
          <div className="flex items-start gap-3 sm:gap-4 max-w-2xl">
            <div className="anim-trophy-crest flex-shrink-0 pt-0.5 sm:pt-1">
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none" className="w-10 h-10 sm:w-13 sm:h-13 filter drop-shadow-sm">
                <path d="M16 12 H48 V28 C48 38 38 44 32 44 C26 44 16 38 16 28 V12 Z" fill="#FBBF24" stroke="#1E1B4B" strokeWidth="2.5" />
                <path d="M16 18 C8 18 8 32 18 34" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M48 18 C56 18 56 32 46 34" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M28 44 V52 H36 V44" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2.5" />
                <rect x="20" y="52" width="24" height="6" rx="2" fill="#D97706" stroke="#1E1B4B" strokeWidth="2.5" />
                <path d="M8 8 L10 13 L15 15 L10 17 L8 22 L6 17 L1 15 L6 13 Z" fill="#F59E0B" />
                <circle cx="56" cy="12" r="2.5" fill="#EA580C" />
                <circle cx="52" cy="8" r="1.5" fill="#FBBF24" />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none overflow-hidden">
                <span className="anim-title-live inline-block font-display text-[#1E1B4B]">LIVE </span>{' '}
                <span className="anim-title-board inline-block font-marker text-[#582A9C] tracking-wide">LEADERBOARD</span>
              </h1>

              <div className="anim-subtext mt-1.5 sm:mt-2 text-xs xs:text-sm sm:text-base font-sans text-[#1E1B4B]/80 font-medium leading-snug">
                <p>
                  The race to the <span className="font-bold text-[#EA580C]">championship</span> is on.
                </p>
                <p className="flex items-center gap-1.5 flex-wrap mt-0.5">
                  <span>Every evaluation. Every point. Every milestone</span>
                  <span className="relative font-bold text-[#1E1B4B]">
                    counts.
                    <svg className="absolute left-0 -bottom-1 w-full h-1.5" viewBox="0 0 60 8" fill="none" preserveAspectRatio="none">
                      <path 
                        ref={underlineRef}
                        d="M2 5 C18 2 40 7 58 4" 
                        stroke="#EA580C" 
                        strokeWidth="3.2" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Round Tabs with Week 1 (Active) and Week 2/3 (Coming Soon) */}
          <div className="flex flex-col items-start lg:items-end gap-2 sm:gap-2.5 flex-shrink-0 w-full lg:w-auto">
            <div className="anim-tabs-bar w-full lg:w-auto overflow-x-auto no-scrollbar py-0.5">
              <div className="inline-flex p-1 bg-[#ECE7DC]/90 rounded-2xl border border-[#1E1B4B]/15 shadow-2xs min-w-max">
                
                {/* Week 1: Active Tab */}
                <button
                  onClick={() => setActiveTab('week1')}
                  className={`px-3 xs:px-3.5 sm:px-4 py-1.5 rounded-xl font-mono text-[11px] xs:text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'week1'
                      ? 'bg-[#3B1A6B] text-white shadow-xs'
                      : 'text-[#1E1B4B]/70 hover:text-[#1E1B4B]'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>WEEK 1 - PART 1</span>
                </button>

                {/* Overall Tab */}
                <button
                  onClick={() => setActiveTab('overall')}
                  className={`px-3 xs:px-3.5 sm:px-4 py-1.5 rounded-xl font-mono text-[11px] xs:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'overall'
                      ? 'bg-[#3B1A6B] text-white shadow-xs'
                      : 'text-[#1E1B4B]/70 hover:text-[#1E1B4B]'
                  }`}
                >
                  OVERALL STANDINGS
                </button>

                {/* Week 2: Coming Soon */}
                <button
                  onClick={() => setActiveTab('week2')}
                  className={`px-2.5 xs:px-3 sm:px-3.5 py-1.5 rounded-xl font-mono text-[11px] xs:text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'week2'
                      ? 'bg-[#3B1A6B] text-white shadow-xs'
                      : 'text-[#1E1B4B]/50 hover:text-[#1E1B4B]'
                  }`}
                >
                  <Lock className="w-3 h-3 text-amber-600" />
                  <span>WEEK 2</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-200/60 text-amber-900 font-bold">SOON</span>
                </button>

                {/* Week 3 / Playoffs: Coming Soon */}
                <button
                  onClick={() => setActiveTab('playoffs')}
                  className={`px-2.5 xs:px-3 sm:px-3.5 py-1.5 rounded-xl font-mono text-[11px] xs:text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'playoffs'
                      ? 'bg-[#3B1A6B] text-white shadow-xs'
                      : 'text-[#1E1B4B]/50 hover:text-[#1E1B4B]'
                  }`}
                >
                  <Lock className="w-3 h-3 text-amber-600" />
                  <span>WEEK 3</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-200/60 text-amber-900 font-bold">SOON</span>
                </button>

              </div>
            </div>

            {/* Live Synchronized Status Indicator */}
            <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1E1B4B]/70">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span>
                Connected to live backend &bull; Week 1 Evaluation Active
              </span>
              <button
                onClick={() => loadLeaderboardData(true)}
                disabled={isRefreshing}
                title="Refresh leaderboard"
                className="p-1 rounded-md hover:bg-[#ECE7DC] text-[#582A9C] cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

        </div>

        {/* ── 2. PROBLEM STATEMENT (4 PS) FILTER BAR ── */}
        <div className="bg-[#EDE8DC] rounded-2xl p-3 sm:p-4 border border-[#1E1B4B]/15 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1E1B4B]">
              <Filter className="w-4 h-4 text-[#582A9C]" />
              <span>Filter By Problem Statement:</span>
            </div>

            {/* Search Team Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team or squad..."
                className="w-full pl-8 pr-8 py-2 text-xs bg-[#F6F3EB] border border-[#1E1B4B]/20 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-[#582A9C] text-[#1E1B4B] placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* The 4 Problem Statements Pill Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
            {/* PS 01: AyurEssence */}
            <button
              onClick={() => setSelectedPsFilter('ps-01')}
              className={`p-2.5 sm:px-3 sm:py-2.5 rounded-xl text-xs font-mono font-bold transition-all text-left flex flex-col justify-between border cursor-pointer min-w-0 ${
                selectedPsFilter === 'ps-01'
                  ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-sm ring-2 ring-purple-400'
                  : 'bg-[#F6F3EB] hover:bg-white text-[#1E1B4B] border-[#1E1B4B]/15'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-black text-xs sm:text-sm">PS 01</span>
                <span className={`text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 ${
                  selectedPsFilter === 'ps-01' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800 font-mono'
                }`}>
                  {psTeamCounts['ps-01']} Teams
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-sans font-bold truncate mt-1 block" title="AyurEssence - Ayurvedic Assessment Platform">
                AyurEssence
              </span>
            </button>

            {/* PS 02: SMARTBUS */}
            <button
              onClick={() => setSelectedPsFilter('ps-02')}
              className={`p-2.5 sm:px-3 sm:py-2.5 rounded-xl text-xs font-mono font-bold transition-all text-left flex flex-col justify-between border cursor-pointer min-w-0 ${
                selectedPsFilter === 'ps-02'
                  ? 'bg-[#D97706] text-white border-[#D97706] shadow-sm ring-2 ring-amber-400'
                  : 'bg-[#F6F3EB] hover:bg-white text-[#1E1B4B] border-[#1E1B4B]/15'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-black text-xs sm:text-sm">PS 02</span>
                <span className={`text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 ${
                  selectedPsFilter === 'ps-02' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800 font-mono'
                }`}>
                  {psTeamCounts['ps-02']} Teams
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-sans font-bold truncate mt-1 block" title="SMARTBUS - Intelligent Campus Transit">
                SMARTBUS
              </span>
            </button>

            {/* PS 03: Sahayak */}
            <button
              onClick={() => setSelectedPsFilter('ps-03')}
              className={`p-2.5 sm:px-3 sm:py-2.5 rounded-xl text-xs font-mono font-bold transition-all text-left flex flex-col justify-between border cursor-pointer min-w-0 ${
                selectedPsFilter === 'ps-03'
                  ? 'bg-[#059669] text-white border-[#059669] shadow-sm ring-2 ring-emerald-400'
                  : 'bg-[#F6F3EB] hover:bg-white text-[#1E1B4B] border-[#1E1B4B]/15'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-black text-xs sm:text-sm">PS 03</span>
                <span className={`text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 ${
                  selectedPsFilter === 'ps-03' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800 font-mono'
                }`}>
                  {psTeamCounts['ps-03']} Teams
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-sans font-bold truncate mt-1 block" title="Sahayak - Rural Support & Resource Platform">
                Sahayak
              </span>
            </button>

            {/* PS 04: SWMS */}
            <button
              onClick={() => setSelectedPsFilter('ps-04')}
              className={`p-2.5 sm:px-3 sm:py-2.5 rounded-xl text-xs font-mono font-bold transition-all text-left flex flex-col justify-between border cursor-pointer min-w-0 ${
                selectedPsFilter === 'ps-04'
                  ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-sm ring-2 ring-sky-400'
                  : 'bg-[#F6F3EB] hover:bg-white text-[#1E1B4B] border-[#1E1B4B]/15'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-black text-xs sm:text-sm">PS 04</span>
                <span className={`text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full shrink-0 ${
                  selectedPsFilter === 'ps-04' ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-800 font-mono'
                }`}>
                  {psTeamCounts['ps-04']} Teams
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-sans font-bold truncate mt-1 block" title="SWMS - Smart Solid Waste Management">
                SWMS
              </span>
            </button>

          </div>
        </div>

        {/* ── 3. MAIN 2-COLUMN GRID (Leaderboard Table on Left, 3 Cards on Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* ════ LEFT COLUMN: LEADERBOARD TABLE (7 Cols) ════ */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* If Week 2 or Week 3 is clicked, show Coming Soon banner */}
            {(activeTab === 'week2' || activeTab === 'playoffs') ? (
              <div className="rounded-2xl sm:rounded-3xl border-2 border-[#1E1B4B] bg-[#ECE7DC] p-8 sm:p-12 text-center space-y-4 shadow-sketch-lg">
                <div className="w-16 h-16 rounded-2xl bg-amber-400 border-2 border-[#1E1B4B] shadow-sketch-sm flex items-center justify-center mx-auto text-[#1E1B4B]">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#1E1B4B]">
                  {activeTab === 'week2' ? 'WEEK 2 EVALUATION COMING SOON' : 'PLAYOFFS EVALUATION COMING SOON'}
                </h3>
                <p className="text-sm font-sans text-gray-700 max-w-md mx-auto leading-relaxed">
                  {activeTab === 'week2' 
                    ? 'Week 2 marks and challenge criteria unlock right after the Match Day 2 sprint. Teams are currently competing in Week 1.'
                    : 'The championship playoff ladder unlocks for the top qualifying squads following Round 2 evaluations.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('week1')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B1A6B] hover:bg-[#582A9C] text-white font-mono text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>View Week 1 Live Standings</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="scroll-leaderboard-table rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#F6F3EB] shadow-xs overflow-hidden relative">
                
                {/* Active Round Info Bar */}
                <div className="bg-[#EFE8DA] px-3.5 sm:px-4 py-2 border-b border-[#1E1B4B]/10 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono font-bold text-[#1E1B4B]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-black">
                      STANDINGS: {selectedPsFilter.toUpperCase()} ({ROUND2_PROBLEM_STATEMENTS.find(p => p.id === selectedPsFilter)?.title})
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-600 font-medium">
                    Showing {rankedTeams.length} {rankedTeams.length === 1 ? 'team' : 'teams'}
                  </div>
                </div>

                {/* ── MOBILE VIEW: DEDICATED RESPONSIVE CARD LIST (sm:hidden) ── */}
                <div className="sm:hidden divide-y divide-[#E6DFCE]">
                  {rankedTeams.length === 0 ? (
                    <div className="py-12 px-4 text-center text-gray-500 font-mono">
                      <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <span>No teams found for the selected problem statement filter.</span>
                    </div>
                  ) : (
                    rankedTeams.map((team, index) => {
                      const displayRank = index + 1;
                      const hasMarks = team.marks > 0;

                      return (
                        <div
                          key={team.squadId}
                          onClick={() => onSelectSquad && onSelectSquad(team.squadId)}
                          className="p-3.5 hover:bg-[#EFE8DA] active:bg-[#ECE7DC] transition-colors cursor-pointer flex items-center justify-between gap-3"
                        >
                          {/* Left: Rank + Avatar + Name & Squad Details */}
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            {/* Rank Indicator */}
                            <div className="flex-shrink-0 w-7 text-center font-bold">
                              {hasMarks ? (
                                displayRank === 1 ? (
                                  <div className="w-7 h-7 rounded-lg bg-amber-400 border border-amber-600 text-amber-950 font-black flex items-center justify-center mx-auto shadow-2xs text-xs">
                                    🥇
                                  </div>
                                ) : displayRank === 2 ? (
                                  <div className="w-7 h-7 rounded-lg bg-slate-300 border border-slate-400 text-slate-800 font-black flex items-center justify-center mx-auto shadow-2xs text-xs">
                                    🥈
                                  </div>
                                ) : displayRank === 3 ? (
                                  <div className="w-7 h-7 rounded-lg bg-amber-700/25 border border-amber-700 text-amber-900 font-black flex items-center justify-center mx-auto shadow-2xs text-xs">
                                    🥉
                                  </div>
                                ) : (
                                  <span className="font-mono font-bold text-gray-500 text-xs">
                                    #{displayRank}
                                  </span>
                                )
                              ) : (
                                <span className="font-mono font-bold text-gray-400 text-sm">
                                  —
                                </span>
                              )}
                            </div>

                            {/* Avatar */}
                            <div className="flex-shrink-0">
                              <SquadAvatar icon={team.avatarIcon} bg={team.avatarBg} />
                            </div>

                            {/* Team Info */}
                            <div className="min-w-0 flex-1">
                              <div className="font-display font-black text-xs xs:text-sm text-[#1E1B4B] leading-tight truncate">
                                {team.teamName}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                <span className="font-mono text-[10px] font-bold text-[#582A9C]">
                                  {team.squadId}
                                </span>
                                <span className="text-gray-300 text-[10px]">&bull;</span>
                                <span className={`px-1.5 py-0.2 rounded font-mono text-[9px] font-bold ${
                                  team.psId === 'ps-01' ? 'bg-purple-100 text-purple-800' :
                                  team.psId === 'ps-02' ? 'bg-amber-100 text-amber-800' :
                                  team.psId === 'ps-03' ? 'bg-emerald-100 text-emerald-800' :
                                  'bg-sky-100 text-sky-800'
                                }`}>
                                  {team.psCode}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Marks & Status */}
                          <div className="flex flex-col items-end justify-center flex-shrink-0 pl-1">
                            <div className="flex items-baseline gap-1">
                              <span className={`font-mono font-black text-base ${
                                team.marks > 0 ? 'text-[#3B1A6B]' : 'text-gray-400'
                              }`}>
                                {team.marks}
                              </span>
                              <span className="text-[9px] font-mono font-bold text-gray-400 uppercase">
                                Pts
                              </span>
                            </div>
                            <div className="mt-0.5">
                              {hasMarks ? (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  <CheckCircle2 className="w-2 h-2" />
                                  <span>Graded</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-300">
                                  <Clock className="w-2 h-2" />
                                  <span>Pending</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* ── DESKTOP & TABLET VIEW: FULL DATA TABLE (hidden sm:block) ── */}
                <div className="hidden sm:block overflow-x-auto scroll-smooth">
                  <table className="w-full text-left border-collapse min-w-[560px]">
                    <thead>
                      <tr className="bg-[#20154B] text-white font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase">
                        <th className="py-3.5 px-3 sm:px-4 text-center w-14 sm:w-16">RANK</th>
                        <th className="py-3.5 px-3 sm:px-4">TEAM / SQUAD</th>
                        <th className="py-3.5 px-2 sm:px-3 text-center">PROBLEM STATEMENT</th>
                        <th className="py-3.5 px-2 sm:px-3 text-center">EVALUATION</th>
                        <th className="py-3.5 px-3 sm:px-4 text-center">WEEK 1 MARKS</th>
                        <th className="py-3.5 px-2 sm:px-3 text-center">STATUS</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#E6DFCE] font-sans text-xs sm:text-sm">
                      {rankedTeams.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-gray-500 font-mono">
                            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <span>No teams found for the selected problem statement filter.</span>
                          </td>
                        </tr>
                      ) : (
                        rankedTeams.map((team, index) => {
                          const displayRank = index + 1;
                          const hasMarks = team.marks > 0;

                          return (
                            <tr 
                              key={team.squadId}
                              onClick={() => onSelectSquad && onSelectSquad(team.squadId)}
                              className="scroll-table-row hover:bg-[#EFE8DA]/90 transition-colors cursor-pointer group"
                            >
                              {/* 1. Rank Badge: only show medals when marks > 0 */}
                              <td className="py-3 px-3 sm:px-4 text-center font-bold">
                                {hasMarks ? (
                                  <>
                                    {displayRank === 1 && (
                                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400 border border-amber-600 text-amber-950 font-black flex items-center justify-center mx-auto shadow-2xs text-xs sm:text-sm">
                                        🥇
                                      </div>
                                    )}
                                    {displayRank === 2 && (
                                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-300 border border-slate-400 text-slate-800 font-black flex items-center justify-center mx-auto shadow-2xs text-xs sm:text-sm">
                                        🥈
                                      </div>
                                    )}
                                    {displayRank === 3 && (
                                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-700/25 border border-amber-700 text-amber-900 font-black flex items-center justify-center mx-auto shadow-2xs text-xs sm:text-sm">
                                        🥉
                                      </div>
                                    )}
                                    {displayRank > 3 && (
                                      <span className="font-mono font-bold text-gray-500 text-xs sm:text-sm">
                                        #{displayRank}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className="font-mono font-bold text-gray-400 text-xs sm:text-sm">
                                    —
                                  </span>
                                )}
                              </td>

                              {/* 2. Squad Name & Mascot */}
                              <td className="py-3 px-3 sm:px-4">
                                <div className="flex items-center gap-2.5 sm:gap-3">
                                  <SquadAvatar icon={team.avatarIcon} bg={team.avatarBg} />
                                  <div className="min-w-0">
                                    <div className="font-display font-black text-xs sm:text-sm text-[#1E1B4B] group-hover:text-[#582A9C] transition-colors leading-snug truncate">
                                      {team.teamName}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-gray-500 font-mono truncate max-w-[140px] sm:max-w-none flex items-center gap-1.5">
                                      <span className="font-bold text-[#582A9C]">{team.squadId}</span>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* 3. Problem Statement Badge */}
                              <td className="py-3 px-2 sm:px-3 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                                  team.psId === 'ps-01' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                                  team.psId === 'ps-02' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                  team.psId === 'ps-03' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                                  'bg-sky-100 text-sky-800 border border-sky-200'
                                }`}>
                                  {team.psCode}
                                </span>
                                <span className="block text-[10px] text-gray-500 font-medium truncate max-w-[110px] mx-auto mt-0.5">
                                  {team.psTitle}
                                </span>
                              </td>

                              {/* 4. Evaluation Round */}
                              <td className="py-3 px-2 sm:px-3 text-center font-mono text-gray-600 text-[11px] font-bold">
                                Week 1
                              </td>

                              {/* 5. Week 1 Marks */}
                              <td className="py-3 px-3 sm:px-4 text-center">
                                <div className="inline-flex flex-col items-center">
                                  <span className={`font-mono font-black text-base sm:text-lg ${
                                    team.marks > 0 ? 'text-[#3B1A6B]' : 'text-gray-400'
                                  }`}>
                                    {team.marks}
                                  </span>
                                  <span className="text-[9px] font-mono text-gray-400 uppercase -mt-0.5">
                                    Pts
                                  </span>
                                </div>
                              </td>

                              {/* 6. Graded / Pending Status */}
                              <td className="py-3 px-2 sm:px-3 text-center">
                                {hasMarks ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                    <CheckCircle2 className="w-2.5 h-2.5" />
                                    <span>Graded</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-300">
                                    <Clock className="w-2.5 h-2.5" />
                                    <span>Pending</span>
                                  </span>
                                )}
                              </td>

                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* Table Footer: Legend & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-1 px-1 sm:px-2">
              <div className="flex items-center gap-3 text-[11px] sm:text-xs font-mono text-[#1E1B4B]/70">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#3B1A6B]" />
                  <span>Marks managed via Admin Portal</span>
                </span>
                <span>&bull;</span>
                <span>Week 1 Active</span>
              </div>

              <button
                onClick={() => onNavigate('squads')}
                className="w-full sm:w-auto justify-center px-4 sm:px-5 py-2 rounded-xl bg-[#ECE7DC] border-2 border-[#582A9C] text-[#582A9C] font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>VIEW ALL SQUADS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* ════ RIGHT COLUMN: 3 FEATURE CARDS (5 Cols) ════ */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* ── CARD 1: TOP PERFORMERS (Connected to Real Backend Marks) ── */}
            <div className="scroll-feature-card rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#F6F3EB] p-4 sm:p-6 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="relative">
                  <h3 className="font-display font-black italic text-base sm:text-lg text-[#1E1B4B] tracking-tight">
                    TOP PERFORMERS
                  </h3>
                  <svg className="absolute left-0 -bottom-1 w-full h-1.5" viewBox="0 0 100 8" fill="none" preserveAspectRatio="none">
                    <path d="M2 5 C30 2 70 7 98 4" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="px-2.5 py-1 bg-[#ECE7DC] rounded-lg border border-[#1E1B4B]/10 text-[11px] font-mono font-bold text-[#582A9C]">
                  Week 1 Leaders
                </div>
              </div>

              {/* 3 Metric Cards or Pending Placeholder */}
              {!topPerformers.hasAnyMarks ? (
                <div className="py-6 px-4 bg-[#EDE8DC] rounded-xl sm:rounded-2xl border border-[#1E1B4B]/10 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-full bg-[#EFE8DA] border border-[#1E1B4B]/15 flex items-center justify-center text-[#582A9C] mb-2.5 shadow-2xs">
                    <Clock className="w-5 h-5 text-[#582A9C]" />
                  </div>
                  <span className="font-display font-black text-sm uppercase tracking-tight text-[#1E1B4B]">
                    Awaiting Evaluation Marks
                  </span>
                  <p className="text-[11px] font-sans text-gray-600 mt-1 max-w-xs leading-relaxed">
                    Week 1 marks for {selectedPsFilter.toUpperCase()} are currently pending jury review. Top performers will appear here once scores are submitted by the admin.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  {/* 1st Place */}
                  <div className="p-2 sm:p-3 bg-[#EDE8DC] rounded-xl sm:rounded-2xl border border-amber-300 flex flex-col items-center justify-center min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-sans font-bold text-amber-700 mb-0.5 sm:mb-1 truncate w-full">
                      🥇 1st Place
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-amber-500 mb-0.5">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-display font-black text-lg sm:text-2xl text-[#1E1B4B] leading-none mb-1">
                      {topPerformers.highest?.marks || 0}
                    </span>
                    <span className="text-[10px] sm:text-xs font-sans font-bold text-[#1E1B4B] truncate w-full" title={topPerformers.highest?.teamName}>
                      {topPerformers.highest?.teamName || '—'}
                    </span>
                  </div>

                  {/* 2nd Place */}
                  <div className="p-2 sm:p-3 bg-[#EDE8DC] rounded-xl sm:rounded-2xl border border-slate-300 flex flex-col items-center justify-center min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-sans font-bold text-slate-700 mb-0.5 sm:mb-1 truncate w-full">
                      🥈 2nd Place
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-slate-500 mb-0.5">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-display font-black text-lg sm:text-2xl text-[#1E1B4B] leading-none mb-1">
                      {topPerformers.second ? topPerformers.second.marks : '—'}
                    </span>
                    <span className="text-[10px] sm:text-xs font-sans font-bold text-[#1E1B4B] truncate w-full" title={topPerformers.second?.teamName}>
                      {topPerformers.second ? topPerformers.second.teamName : '—'}
                    </span>
                  </div>

                  {/* 3rd Place */}
                  <div className="p-2 sm:p-3 bg-[#EDE8DC] rounded-xl sm:rounded-2xl border border-amber-600/30 flex flex-col items-center justify-center min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-sans font-bold text-amber-900 mb-0.5 sm:mb-1 truncate w-full">
                      🥉 3rd Place
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-amber-700 mb-0.5">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-700/30" />
                    </div>
                    <span className="font-display font-black text-lg sm:text-2xl text-[#1E1B4B] leading-none mb-1">
                      {topPerformers.third ? topPerformers.third.marks : '—'}
                    </span>
                    <span className="text-[10px] sm:text-xs font-sans font-bold text-[#1E1B4B] truncate w-full" title={topPerformers.third?.teamName}>
                      {topPerformers.third ? topPerformers.third.teamName : '—'}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-3 text-[11px] font-sans text-gray-600 leading-relaxed text-center">
                Scores updated live from jury evaluations.
              </div>
            </div>

            {/* ── CARD 2: HPL POINT SYSTEM ── */}
            <div className="scroll-feature-card rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#F6F3EB] p-4 sm:p-6 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-marker text-base sm:text-lg text-[#582A9C] tracking-wide">
                  HPL POINT SYSTEM
                </h3>
                <div className="opacity-80">
                  <svg width="34" height="26" viewBox="0 0 44 32" fill="none">
                    <rect x="4" y="16" width="6" height="14" rx="1.5" fill="#3B82F6" opacity="0.6" />
                    <rect x="14" y="10" width="6" height="20" rx="1.5" fill="#3B82F6" opacity="0.8" />
                    <rect x="24" y="4" width="6" height="26" rx="1.5" fill="#3B82F6" />
                    <path d="M4 14 Q 16 6 34 2" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M28 2 H34 V8" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 text-center py-2.5 border-y border-[#E6DFCE]">
                <div className="flex flex-col items-center p-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400/20 flex items-center justify-center mb-1 text-amber-600">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-sans font-bold text-gray-700">Sprint 1</span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-900 mt-0.5">Week 1</span>
                </div>

                <div className="flex flex-col items-center p-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center mb-1 text-indigo-700">
                    <Handshake className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-sans font-bold text-gray-700">Sprint 2</span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-900 mt-0.5">Week 2</span>
                </div>

                <div className="flex flex-col items-center p-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/15 flex items-center justify-center mb-1 text-rose-600">
                    <Swords className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-sans font-bold text-gray-700">Playoffs</span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-900 mt-0.5">Part 3</span>
                </div>

                <div className="flex flex-col items-center p-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center mb-1 text-yellow-600">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-sans font-bold text-gray-700">Grand Prize</span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-900 mt-0.5 leading-tight">₹40,000</span>
                </div>
              </div>

              <div className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-sans text-gray-600 leading-relaxed">
                <p>Marks are submitted by the mentors and jury panel after each match day.</p>
                <p className="mt-0.5">
                  Climb the leaderboard and make your way to the{' '}
                  <span className="font-bold text-[#582A9C]">top!</span>
                </p>
              </div>
            </div>

            {/* ── CARD 3: THE CHAMPIONSHIP AWAITS! ── */}
            <div className="scroll-feature-card scroll-championship-card rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#F6F3EB] overflow-hidden shadow-xs relative">
              <div className="flex flex-col sm:grid sm:grid-cols-12 items-stretch">
                <div className="sm:col-span-5 p-4 sm:p-6 z-10 flex flex-col justify-center">
                  <h3 className="font-display font-black text-base sm:text-lg lg:text-xl text-[#1E1B4B] uppercase tracking-tight leading-tight mb-1.5 sm:mb-2">
                    THE CHAMPIONSHIP AWAITS!
                  </h3>
                  <div className="text-xs sm:text-sm font-sans text-gray-600 font-medium space-y-0.5">
                    <p>Stay consistent.</p>
                    <p>Keep improving.</p>
                    <p className="anim-champion-motto font-bold text-[#582A9C] mt-1 inline-block">Be the champion.</p>
                  </div>
                </div>

                <div className="sm:col-span-7 relative h-52 xs:h-60 sm:h-full min-h-[190px] sm:min-h-[210px] flex items-center justify-end overflow-hidden">
                  <img
                    src={HPL_IMAGES.championshipAwaits}
                    alt="The Championship Awaits - Golden Trophy"
                    className="scroll-championship-img w-full h-full object-cover object-center transform scale-105"
                  />
                  <div 
                    className="hidden sm:block absolute inset-y-0 left-0 w-10 sm:w-14 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to right, #F6F3EB 20%, transparent 100%)'
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ── 4. BOTTOM 4-FEATURE UNIFIED RIBBON STRIP ── */}
        <div className="scroll-bottom-ribbon rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#F6F3EB] shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6DFCE]">
            
            <div className="p-4 sm:p-5 flex items-center gap-3.5 hover:bg-[#EDE8DC]/50 transition-colors">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-700 flex-shrink-0">
                <Users className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#1E1B4B] truncate">
                  4 PROBLEM STATEMENTS
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-gray-600 mt-0.5 leading-snug">
                  10 teams per track locked for Round 2.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3.5 hover:bg-[#EDE8DC]/50 transition-colors">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-700 flex-shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#1E1B4B] truncate">
                  WEEK 1 SPRINT
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-gray-600 mt-0.5 leading-snug">
                  Mentorship, prototype builds, and jury marks.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3.5 hover:bg-[#EDE8DC]/50 transition-colors">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 flex-shrink-0">
                <Award className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#1E1B4B] truncate">
                  LIVE SCORES & SYNC
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-gray-600 mt-0.5 leading-snug">
                  Directly synchronized with the Admin portal.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-3.5 hover:bg-[#EDE8DC]/50 transition-colors">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-700 flex-shrink-0">
                <Trophy className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#1E1B4B] truncate">
                  TOP 16 PLAYOFFS
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-gray-600 mt-0.5 leading-snug">
                  Top performing squads advance to the finals.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── BOTTOM RIGHT PURPLE WATERCOLOR BRUSHSTROKE ACCENT ── */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none -z-0 opacity-35 sm:opacity-40 translate-x-12 translate-y-12">
        <svg width="320" height="320" viewBox="0 0 300 300" fill="none">
          <path
            d="M 50 250 C 120 180 180 220 280 160 C 290 200 270 260 220 280 Z"
            fill="#582A9C"
            fillOpacity="0.45"
          />
          <circle cx="210" cy="180" r="8" fill="#582A9C" fillOpacity="0.3" />
          <circle cx="160" cy="220" r="5" fill="#582A9C" fillOpacity="0.3" />
          <circle cx="260" cy="140" r="6" fill="#582A9C" fillOpacity="0.3" />
        </svg>
      </div>

    </div>
  );
};

export default LeaderboardPage;
