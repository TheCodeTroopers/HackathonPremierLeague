import React, { useState, useEffect, useMemo } from 'react';
import { PageRoute } from '../../types';
import { 
  Phone, 
  MapPin, 
  ArrowRight, 
  Shield, 
  Users, 
  GraduationCap,
  Trophy, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Filter, 
  Layers, 
  Award, 
  Flame, 
  Zap, 
  Check 
} from 'lucide-react';
import { SHORTLISTED_TEAMS_DATA } from '../../data/hplData';
import { ShortlistTrophyIllustration, PartyPopperDoodle } from '../illustrations/AboutIllustration';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
}

const FACULTY_COORDINATORS = [
  {
    name: 'Dr. Rajesh Nayak',
    phone: '9164510062',
    role: 'Faculty Coordinator',
    dept: 'Department of CSE',
    emoji: '🎓',
  },
  {
    name: 'Mr. Raghvendra G S',
    phone: '9738405453',
    role: 'Faculty Coordinator',
    dept: 'Department of ISE',
    emoji: '🎓',
  },
];

const CORE_TEAM = [
  {
    name: 'Yashwanth',
    phone: '8217561286',
    role: 'Core Team Member',
    emoji: '⚡',
  },
  {
    name: 'Abhishek Kini',
    phone: '9844101520',
    role: 'Core Team Lead',
    emoji: '⚡',
  },
  {
    name: 'Bhushan Poojary',
    phone: '7381709385',
    role: 'Core Team Member',
    emoji: '⚡',
  },
  {
    name: 'Tejas Nayak',
    phone: '8296151023',
    role: 'Core Team Member',
    emoji: '⚡',
  },
  {
    name: 'Pradyumna Upadhyaya',
    phone: '9980441036',
    role: 'Core Team Member',
    emoji: '⚡',
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1E1B4B]">

      {/* ------------------------------------------------------------------ */}
      {/* HERO HEADER                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-[#1E1B4B] pt-16 pb-20 px-4 sm:px-6 lg:px-10">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* Glowing spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] bg-indigo-600/20 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          {/* Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[11px] font-black tracking-widest text-amber-300 uppercase">
              HPL 2026 — Contact Us
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
            GET IN{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              TOUCH
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-indigo-200/90 font-medium max-w-xl mx-auto">
            Have questions about HPL 2026? Reach out to our faculty coordinators or core team directly.
          </p>

          {/* Venue chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-semibold text-indigo-200 tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>SMVITM Campus, Bantakal, Udupi — Karnataka, India</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-14 space-y-14">

        {/* ---- FACULTY COORDINATORS ---- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <GraduationCap className="w-4.5 h-4.5 text-amber-700" />
            </div>
            <div>
              <div className="font-mono text-[10px] font-black tracking-widest text-amber-600 uppercase">
                Hierarchy Level 1
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] uppercase tracking-tight">
                Faculty Coordinators
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FACULTY_COORDINATORS.map((person) => (
              <div
                key={person.phone}
                className="group relative bg-white border-2 border-[#1E1B4B] rounded-2xl p-6 shadow-[4px_4px_0px_#F59E0B] hover:shadow-[6px_6px_0px_#F59E0B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Amber accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-t-xl" />

                <div className="flex items-start gap-4 pt-2">
                  {/* Avatar circle */}
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-2xl flex-shrink-0">
                    {person.emoji}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="font-display font-black text-lg text-[#1E1B4B] leading-tight">
                      {person.name}
                    </div>
                    <div className="font-mono text-[10px] font-bold text-amber-700 uppercase tracking-widest">
                      {person.role}
                    </div>
                    <div className="font-sans text-xs text-[#1E1B4B]/60 font-medium">
                      {person.dept} • SMVITM
                    </div>
                  </div>
                </div>

                {/* Phone link */}
                <a
                  href={`tel:+91${person.phone}`}
                  className="mt-5 flex items-center justify-between w-full px-4 py-3 rounded-xl bg-amber-50 border-2 border-amber-300 hover:bg-amber-100 hover:border-amber-500 transition-all group/phone"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-700 group-hover/phone:animate-bounce" />
                    <span className="font-mono font-black text-sm text-[#1E1B4B] tracking-wide">
                      +91 {person.phone}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover/phone:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#1E1B4B]/10" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1B4B]/5 border border-[#1E1B4B]/10">
            <Shield className="w-3 h-3 text-[#1E1B4B]/40" />
            <span className="font-mono text-[10px] font-black text-[#1E1B4B]/40 uppercase tracking-widest">HPL Core</span>
          </div>
          <div className="flex-1 h-px bg-[#1E1B4B]/10" />
        </div>

        {/* ---- CORE TEAM ---- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 border-2 border-indigo-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Users className="w-4.5 h-4.5 text-indigo-700" />
            </div>
            <div>
              <div className="font-mono text-[10px] font-black tracking-widest text-indigo-600 uppercase">
                Hierarchy Level 2
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] uppercase tracking-tight">
                Core Team Members
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {CORE_TEAM.map((person, idx) => (
              <div
                key={person.phone}
                className="group relative bg-white border-2 border-[#1E1B4B] rounded-2xl p-5 shadow-[4px_4px_0px_#4F46E5] hover:shadow-[6px_6px_0px_#4F46E5] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Indigo accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-xl" />

                <div className="flex items-center gap-4 pt-2">
                  {/* Number badge */}
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border-2 border-indigo-300 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono font-black text-sm text-indigo-700">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="font-display font-black text-base text-[#1E1B4B] leading-tight">
                      {person.name}
                    </div>
                    <div className="font-mono text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                      {person.role}
                    </div>
                  </div>
                </div>

                {/* Phone link */}
                <a
                  href={`tel:+91${person.phone}`}
                  className="mt-4 flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-indigo-50 border-2 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 transition-all group/phone"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-600 group-hover/phone:animate-bounce" />
                    <span className="font-mono font-black text-sm text-[#1E1B4B] tracking-wide">
                      +91 {person.phone}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500 group-hover/phone:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </section>


        {/* ---- Back to Home ---- */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1E1B4B] bg-white hover:bg-amber-50 font-display font-black text-sm uppercase tracking-wider shadow-[3px_3px_0px_#1E1B4B] hover:shadow-[4px_4px_0px_#1E1B4B] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;

// ═══════════════════════════════════════════════════════════════════════════════
// HPL 2026 ROUND 2 SHORTLISTED SQUADS PAGE (WITH SEARCH & POPPER CELEBRATIONS)
// ═══════════════════════════════════════════════════════════════════════════════

interface ShortlistedPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ShortlistedPage: React.FC<ShortlistedPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'first20' | 'second20'>('all');
  const [hasPopped, setHasPopped] = useState(true);

  // Trigger celebration on mount
  useEffect(() => {
    setHasPopped(true);
  }, []);

  const filteredTeams = useMemo(() => {
    return SHORTLISTED_TEAMS_DATA.map((teamName, index) => {
      const rank = index + 1;
      const squadId = `HPL-R2-${String(rank).padStart(2, '0')}`;
      return {
        rank,
        name: teamName,
        squadId,
        status: 'Qualified for Round 2',
        tier: rank <= 20 ? 'Tier 1 Qualifier' : 'Tier 2 Qualifier',
      };
    }).filter((team) => {
      const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            team.squadId.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;
      if (activeFilter === 'first20') return team.rank <= 20;
      if (activeFilter === 'second20') return team.rank > 20;
      return true;
    });
  }, [searchTerm, activeFilter]);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1E1B4B] relative overflow-hidden pb-24 selection:bg-amber-300 selection:text-[#1E1B4B]">
      {/* Halftone subtle dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1E1B4B 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. TOP ANNOUNCEMENT BAR                                             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#1E1B4B] text-white border-b-2 border-amber-400 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 relative flex-shrink-0">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full transform group-hover:scale-105 transition-transform">
                <polygon points="50,6 90,24 90,74 50,94 10,74 10,24" fill="#FBBF24" stroke="#D97706" strokeWidth="4" />
                <path d="M 30 38 L 40 54 L 50 34 L 60 54 L 70 38 L 68 62 H 32 Z" fill="#1E1B4B" stroke="#1E1B4B" strokeWidth="1.5" />
                <rect x="36" y="64" width="28" height="5" rx="1.5" fill="#1E1B4B" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-black text-sm tracking-tight text-white leading-none">
                HACKATHON PREMIER LEAGUE
              </span>
              <span className="font-mono text-[9px] font-bold text-amber-300 tracking-wider uppercase leading-tight mt-0.5">
                ROUND 2 QUALIFIED SQUADS
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('problem-statements')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#1E1B4B] font-display font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_2px_10px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ROUND 2 CHALLENGES</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-amber-400 text-white/90 hover:text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Arena Home</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FESTIVE PARTY POPPERS & CELEBRATION HERO                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-10 px-4 sm:px-6 lg:px-8">
        
        {/* Animated Celebration Confetti Poppers (Top & Bottom Left/Right) */}
        {hasPopped && (
          <>
            {/* Top Left Popper */}
            <div className="absolute left-1 sm:left-6 top-4 sm:top-12 z-20 pointer-events-none animate-bounce">
              <PartyPopperDoodle className="w-12 h-12 xs:w-16 xs:h-16 sm:w-28 sm:h-28 text-amber-500 drop-shadow-lg opacity-85 sm:opacity-100" />
            </div>

            {/* Top Right Popper */}
            <div className="absolute right-1 sm:right-6 top-4 sm:top-12 z-20 pointer-events-none animate-bounce">
              <PartyPopperDoodle className="w-12 h-12 xs:w-16 xs:h-16 sm:w-28 sm:h-28 text-amber-500 drop-shadow-lg opacity-85 sm:opacity-100" flipped />
            </div>

            {/* Bottom Left Popper (Birthday Party Style Burst) */}
            <div className="fixed bottom-6 left-6 z-30 pointer-events-none animate-pulse hidden md:block">
              <PartyPopperDoodle className="w-24 h-24 text-purple-600 drop-shadow-xl -rotate-12" />
            </div>

            {/* Bottom Right Popper (Birthday Party Style Burst) */}
            <div className="fixed bottom-6 right-6 z-30 pointer-events-none animate-pulse hidden md:block">
              <PartyPopperDoodle className="w-24 h-24 text-rose-500 drop-shadow-xl rotate-12" flipped />
            </div>
          </>
        )}

        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Comic Hero Card */}
          <div className="relative bg-[#FFFDF7] rounded-3xl border-2 border-[#1E1B4B] p-4 xs:p-6 sm:p-10 shadow-[6px_6px_0px_#1E1B4B] overflow-hidden text-center">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 border-2 border-[#1E1B4B] shadow-[2px_2px_0px_#1E1B4B] mb-4 sm:mb-5">
              <Sparkles className="w-4 h-4 text-[#1E1B4B]" />
              <span className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#1E1B4B]">
                OFFICIAL SHORTLIST ANNOUNCEMENT
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#1E1B4B] italic leading-[1.08] max-w-3xl mx-auto break-words">
              CONGRATULATIONS TO THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-amber-500 to-rose-600 underline decoration-amber-400 decoration-wavy">
                40 SHORTLISTED
              </span>{' '}
              SQUADS!
            </h1>

            <p className="mt-3 sm:mt-4 text-xs xs:text-sm sm:text-base md:text-lg text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
              After an intense round of evaluation from evaluation panels, these 40 stellar teams have officially qualified for <strong>Round 2: Stakeholder Challenge Sprint</strong> of Hackathon Premier League 2026.
            </p>

            {/* Beautiful Custom Illustration */}
            <div className="mt-4 mb-2 max-w-lg mx-auto">
              <ShortlistTrophyIllustration className="w-full max-w-md mx-auto" />
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto pt-4 border-t-2 border-[#1E1B4B]/10">
              <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-2.5 sm:p-3 text-center">
                <div className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B]">40</div>
                <div className="font-mono text-[9px] sm:text-[10px] font-bold text-amber-800 uppercase tracking-wider">Squads Qualified</div>
              </div>
              <div className="bg-purple-50/80 border border-purple-300 rounded-2xl p-2.5 sm:p-3 text-center">
                <div className="font-display font-black text-xl sm:text-2xl text-purple-900">4</div>
                <div className="font-mono text-[9px] sm:text-[10px] font-bold text-purple-800 uppercase tracking-wider">Live PS Tracks</div>
              </div>
              <div className="bg-emerald-50/80 border border-emerald-300 rounded-2xl p-2.5 sm:p-3 text-center">
                <div className="font-display font-black text-xl sm:text-2xl text-emerald-900">₹30,000+</div>
                <div className="font-mono text-[9px] sm:text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Prize Pool</div>
              </div>
              <div className="bg-blue-50/80 border border-blue-300 rounded-2xl p-2.5 sm:p-3 text-center">
                <div className="font-display font-black text-xl sm:text-2xl text-blue-900">12 SEP</div>
                <div className="font-mono text-[9px] sm:text-[10px] font-bold text-blue-800 uppercase tracking-wider">Part 1 Evaluation</div>
              </div>
            </div>

            {/* Next Steps Quick Action */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('problem-statements')}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#1E1B4B] hover:bg-amber-400 hover:text-[#1E1B4B] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[3.5px_3.5px_0px_#F59E0B] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Choose Problem Statement</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('rulebook')}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white border-2 border-[#1E1B4B] hover:bg-slate-50 font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] transition-all cursor-pointer text-center"
              >
                <span>Read Round 2 Guidelines</span>
              </button>
            </div>

          </div>

          {/* 4-Step Mandatory Guidelines Card for Shortlisted Squads */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl border-2 border-[#1E1B4B] p-5 sm:p-7 shadow-[4px_4px_0px_#1E1B4B]">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-8 h-8 rounded-xl bg-amber-400 border border-[#1E1B4B] flex items-center justify-center shadow-xs text-sm font-black">
                📋
              </span>
              <div>
                <h3 className="font-display font-black text-base sm:text-lg text-[#1E1B4B] uppercase tracking-tight">
                  What Shortlisted Squads Must Do Next
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 font-mono">
                  Crucial Round 2 kickoff instructions for all 40 qualified squads
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/90 rounded-2xl border border-amber-200/80 p-3.5 sm:p-4 flex items-start gap-3 shadow-2xs">
                <span className="w-7 h-7 rounded-lg bg-[#1E1B4B] text-amber-300 font-display font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Check your squad name in the official <strong>Shortlisted Squads Directory</strong> below.
                </div>
              </div>

              <div className="bg-white/90 rounded-2xl border border-amber-200/80 p-3.5 sm:p-4 flex items-start gap-3 shadow-2xs">
                <span className="w-7 h-7 rounded-lg bg-[#1E1B4B] text-amber-300 font-display font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>Read the problem statements thoroughly</strong> and make sure which problem statement you will work on.
                </div>
              </div>

              <div className="bg-white/90 rounded-2xl border border-amber-200/80 p-3.5 sm:p-4 flex items-start gap-3 shadow-2xs">
                <span className="w-7 h-7 rounded-lg bg-[#1E1B4B] text-amber-300 font-display font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>Only the Team Leader needs to register</strong> on the website at <strong>8:00 PM</strong> — in that, make sure you choose your Problem Statement (PS) correctly and fast!
                </div>
              </div>

              <div className="bg-white/90 rounded-2xl border border-amber-200/80 p-3.5 sm:p-4 flex items-start gap-3 shadow-2xs">
                <span className="w-7 h-7 rounded-lg bg-[#1E1B4B] text-amber-300 font-display font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </span>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>Join the official WhatsApp group</strong> for all instant match-day updates, coordination, and urgent announcements.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. SEARCH & SHORTLISTED TEAMS DIRECTORY TABLE                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Search and Filter Controls */}
        <div className="bg-[#FFFDF7] rounded-3xl border-2 border-[#1E1B4B] p-5 sm:p-7 shadow-[4px_4px_0px_#1E1B4B] mb-8 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] uppercase tracking-tight flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Shortlisted Squads Directory</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Search your squad name or browse the complete roster of 40 qualified teams.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{filteredTeams.length} of 40 Teams Displayed</span>
            </div>
          </div>

          {/* Search Input Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by squad name (e.g., Apex Coders, AgroNex, Neuro Nexus)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border-2 border-[#1E1B4B] font-medium text-sm text-[#1E1B4B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Filter:</span>
            </span>

            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#1E1B4B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All 40 Squads
            </button>
            <button
              onClick={() => setActiveFilter('first20')}
              className={`px-3.5 py-1.5 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'first20'
                  ? 'bg-[#1E1B4B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Squads 1 – 20
            </button>
            <button
              onClick={() => setActiveFilter('second20')}
              className={`px-3.5 py-1.5 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'second20'
                  ? 'bg-[#1E1B4B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Squads 21 – 40
            </button>
          </div>

        </div>

        {/* Shortlisted Squads Table / Cards */}
        {filteredTeams.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-[#1E1B4B]/30 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center font-bold text-xl">
              🔍
            </div>
            <h3 className="font-display font-black text-lg text-[#1E1B4B]">No matching squad found</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              We couldn't find any shortlisted squad matching "{searchTerm}". Please check spelling.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-display font-bold text-xs uppercase text-[#1E1B4B]"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="bg-[#FFFDF7] rounded-3xl border-2 border-[#1E1B4B] overflow-hidden shadow-[5px_5px_0px_#1E1B4B]">
            
            {/* Desktop Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-100/90 border-b-2 border-[#1E1B4B] font-display font-black text-xs uppercase text-slate-700 tracking-wider">
              <div className="col-span-2">Slot #</div>
              <div className="col-span-5">Shortlisted Squad Name</div>
              <div className="col-span-3 text-center">Status</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            {/* List Rows */}
            <div className="divide-y-2 divide-[#1E1B4B]/10">
              {filteredTeams.map((team) => (
                <div
                  key={team.rank}
                  className="p-3.5 sm:px-6 sm:py-4 hover:bg-amber-50/40 transition-colors flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center justify-between gap-2.5"
                >
                  {/* Slot & Squad Number */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#1E1B4B] text-amber-300 font-display font-black text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                        {String(team.rank).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-slate-500 uppercase">
                        {team.squadId}
                      </span>
                    </div>

                    {/* Mobile Status Badge on Header Right */}
                    <div className="sm:hidden">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        <span>Round 2 Live</span>
                      </span>
                    </div>
                  </div>

                  {/* Team Name */}
                  <div className="sm:col-span-5 text-left w-full">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-black text-base sm:text-lg text-[#1E1B4B] tracking-tight break-words">
                        {team.name}
                      </span>
                      {team.rank <= 5 && (
                        <span className="text-amber-500 text-sm" title="Top 5 Roster">
                          ⭐
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-purple-700 font-semibold sm:hidden inline-block mt-0.5">
                      {team.tier}
                    </span>
                  </div>

                  {/* Status Badge (Desktop) */}
                  <div className="hidden sm:block sm:col-span-3 sm:text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Round 2 Live</span>
                    </span>
                  </div>

                  {/* Action Link */}
                  <div className="sm:col-span-2 sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto flex sm:justify-end">
                    <button
                      onClick={() => onNavigate('problem-statements')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-1.5 rounded-xl border border-[#1E1B4B] bg-white hover:bg-amber-400 font-display font-black text-xs uppercase text-[#1E1B4B] transition-colors shadow-2xs cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                    >
                      <span>Pick PS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer Summary */}
            <div className="p-4 bg-slate-50 border-t-2 border-[#1E1B4B] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600">
              <span>All 40 squads must finalize problem statement selection before evaluation begins.</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-bold text-[#1E1B4B] hover:underline"
              >
                ↑ Back to Top
              </button>
            </div>

          </div>
        )}

      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. BOTTOM CELEBRATION FLOATER                                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 hidden sm:block">
        <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-2xl p-3 sm:p-4 shadow-[4px_4px_0px_#1E1B4B] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300 max-w-xs sm:max-w-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-400 border border-[#1E1B4B] flex items-center justify-center text-lg flex-shrink-0">
            🎉
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="font-display font-black text-xs uppercase text-[#1E1B4B] leading-tight">
              Shortlisting Live!
            </div>
            <div className="text-[11px] text-slate-600 line-clamp-1">
              40 squads advancing to Round 2.
            </div>
          </div>
          <button
            onClick={() => onNavigate('problem-statements')}
            className="px-2.5 py-1.5 rounded-xl bg-[#1E1B4B] text-white font-display font-black text-[10px] uppercase hover:bg-amber-500 hover:text-[#1E1B4B] transition-colors cursor-pointer"
          >
            View PS
          </button>
        </div>
      </div>

    </div>
  );
};


