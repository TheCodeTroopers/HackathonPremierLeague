import React, { useState, useEffect, useRef } from 'react';
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
  Sparkles
} from 'lucide-react';

interface LeaderboardPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectSquad?: (squadId: string) => void;
}

interface TeamStanding {
  rank: number;
  name: string;
  subtitle: string;
  avatarBg: string;
  avatarIcon: string;
  matches: number;
  wins: number;
  ties: number;
  losses: number;
  points: number;
  trend: 'up' | 'down' | 'same';
  trendValue: number;
}

const STANDINGS: TeamStanding[] = [
  {
    rank: 1,
    name: 'CodeTroopers',
    subtitle: 'Building the future',
    avatarBg: '#582A9C',
    avatarIcon: 'ninja',
    matches: 6,
    wins: 5,
    ties: 0,
    losses: 1,
    points: 10,
    trend: 'up',
    trendValue: 2,
  },
  {
    rank: 2,
    name: 'Debuggers',
    subtitle: 'We debug reality',
    avatarBg: '#0D9488',
    avatarIcon: 'bug',
    matches: 6,
    wins: 4,
    ties: 1,
    losses: 1,
    points: 9,
    trend: 'up',
    trendValue: 1,
  },
  {
    rank: 3,
    name: 'Ctrl Alt Elite',
    subtitle: 'Control. Alt. Innovate',
    avatarBg: '#EA580C',
    avatarIcon: 'keyboard',
    matches: 6,
    wins: 3,
    ties: 1,
    losses: 2,
    points: 7,
    trend: 'up',
    trendValue: 3,
  },
  {
    rank: 4,
    name: 'Syntax Squad',
    subtitle: 'Code. Commit. Conquer.',
    avatarBg: '#E11D48',
    avatarIcon: 'code',
    matches: 6,
    wins: 3,
    ties: 0,
    losses: 3,
    points: 6,
    trend: 'down',
    trendValue: 2,
  },
  {
    rank: 5,
    name: 'Binary Brains',
    subtitle: 'Brains behind bytes',
    avatarBg: '#059669',
    avatarIcon: 'brain',
    matches: 6,
    wins: 2,
    ties: 1,
    losses: 3,
    points: 5,
    trend: 'up',
    trendValue: 1,
  },
  {
    rank: 6,
    name: '404 Founders',
    subtitle: 'Building. Failing. Learning.',
    avatarBg: '#7C3AED',
    avatarIcon: '404',
    matches: 6,
    wins: 1,
    ties: 1,
    losses: 4,
    points: 3,
    trend: 'down',
    trendValue: 2,
  },
  {
    rank: 7,
    name: 'Null Pointers',
    subtitle: "We don't crash, we learn.",
    avatarBg: '#1E1B4B',
    avatarIcon: 'skull',
    matches: 6,
    wins: 1,
    ties: 0,
    losses: 5,
    points: 2,
    trend: 'same',
    trendValue: 0,
  },
  {
    rank: 8,
    name: 'Bit Busters',
    subtitle: 'Busting bugs, building dreams.',
    avatarBg: '#2563EB',
    avatarIcon: 'shield',
    matches: 6,
    wins: 0,
    ties: 1,
    losses: 5,
    points: 1,
    trend: 'same',
    trendValue: 0,
  },
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
  const [activeTab, setActiveTab] = useState<'overall' | 'week1' | 'week2' | 'playoffs'>('overall');
  const [isComingSoon, setIsComingSoon] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  // ── GSAP ENTRANCE & SCROLLTRIGGER REVEAL ANIMATIONS ──
  useEffect(() => {
    const gsapObj = (window as any).gsap || gsap;
    const ScrollTriggerObj = (window as any).ScrollTrigger;

    if (gsapObj) {
      if (ScrollTriggerObj) {
        gsapObj.registerPlugin(ScrollTriggerObj);
      }

      // ── MASTER PAGE ENTRANCE TIMELINE ──
      const entranceTl = gsapObj.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Trophy Spring Pop
      entranceTl.fromTo('.anim-trophy-crest',
        { scale: 0, rotate: -40, opacity: 0 },
        { scale: 1, rotate: -6, opacity: 1, duration: 0.75, ease: 'back.out(2.2)' }
      );

      // 2. Title Typography Reveal ("LIVE" & "LEADERBOARD")
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

      // 3. Subtitle Fade & Slide
      entranceTl.fromTo('.anim-subtext',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        '-=0.3'
      );

      // 4. Hand-drawn brush underline stroke draw-in
      if (underlineRef.current) {
        const length = underlineRef.current.getTotalLength() || 60;
        gsapObj.set(underlineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        entranceTl.to(underlineRef.current, {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: 'power2.out'
        }, '-=0.2');
      }

      // 5. Standings Tabs Pop-In
      entranceTl.fromTo('.anim-tabs-bar',
        { scale: 0.88, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' },
        '-=0.3'
      );

      // 6. Paper Airplane Fly-In with Floating Hover
      gsapObj.fromTo('.anim-paper-plane',
        { x: 50, y: -30, opacity: 0, rotate: -35 },
        { 
          x: 0, 
          y: 0, 
          opacity: 0.65, 
          rotate: -12, 
          duration: 1.1, 
          ease: 'power3.out',
          onComplete: () => {
            gsapObj.to('.anim-paper-plane', {
              y: -6,
              duration: 2.2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }
        }
      );

      // ── CONTINUOUS KINETIC TEXT ANIMATIONS ──
      // 1. Continuous gentle pulse on "LIVE" title
      gsapObj.to('.anim-title-live', {
        scale: 1.045,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.0,
      });

      // 2. Continuous subtle comic bounce on "LEADERBOARD" title
      gsapObj.to('.anim-title-board', {
        scale: 1.025,
        rotate: -0.75,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2,
      });

      // 3. Continuous gentle floating shimmer on "Be the champion."
      gsapObj.to('.anim-champion-motto', {
        y: -2,
        color: '#7C3AED',
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ── SCROLL-TRIGGERED REVEALS (https://gsap.com/scroll/) ──
      if (ScrollTriggerObj) {
        // Table container scroll reveal
        gsapObj.fromTo('.scroll-leaderboard-table',
          { y: 45, opacity: 0, scale: 0.98 },
          {
            scrollTrigger: {
              trigger: '.scroll-leaderboard-table',
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
          }
        );

        // Stagger table rows
        gsapObj.fromTo('.scroll-table-row',
          { x: -20, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.scroll-leaderboard-table',
              start: 'top 82%',
            },
            x: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.45,
            ease: 'power2.out',
          }
        );

        // Feature cards on the right
        gsapObj.utils.toArray('.scroll-feature-card').forEach((card: any, idx: number) => {
          gsapObj.fromTo(card,
            { y: 35, opacity: 0, scale: 0.96 },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.65,
              delay: idx * 0.08,
              ease: 'back.out(1.4)',
            }
          );
        });

        // Parallax scrub on championship illustration
        gsapObj.fromTo('.scroll-championship-img',
          { scale: 1.14 },
          {
            scrollTrigger: {
              trigger: '.scroll-championship-card',
              start: 'top 90%',
              end: 'bottom 30%',
              scrub: 1,
            },
            scale: 1.02,
            ease: 'none',
          }
        );

        // Bottom ribbon
        gsapObj.fromTo('.scroll-bottom-ribbon',
          { y: 30, opacity: 0, scale: 0.96 },
          {
            scrollTrigger: {
              trigger: '.scroll-bottom-ribbon',
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: 'power2.out',
          }
        );
      }
    }

    return () => {
      if (ScrollTriggerObj) {
        ScrollTriggerObj.getAll().forEach((t: any) => t.kill());
      }
    };
  }, []);

  return (
    // ── MAIN CANVAS: WARM PARCHMENT CREAM (#F6F3EB) MATCHING THE ORIGINAL ARTWORK TONE ──
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#F6F3EB] text-[#1E1B4B] py-6 sm:py-10 px-3.5 xs:px-5 sm:px-6 lg:px-10 relative overflow-hidden selection:bg-[#FBBF24] selection:text-[#1E1B4B]"
    >
      
      {/* ── TOP RIGHT BACKGROUND DOODLES ── */}
      <div className="absolute top-8 right-6 sm:right-24 pointer-events-none select-none opacity-80 flex items-center gap-6 sm:gap-10 hidden md:flex">
        {/* Code Doodle <$>- */}
        <div className="font-mono font-bold text-base sm:text-lg text-indigo-500/70 tracking-widest transform -rotate-12">
          &lt; $ &gt; -
        </div>
        {/* Animated Hand-drawn folded paper plane */}
        <div className="anim-paper-plane transform -rotate-12 opacity-60">
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
            <path d="M 6 22 L 42 6 L 26 42 L 20 28 Z" fill="#431D74" fillOpacity="0.12" stroke="#1E1B4B" strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M 42 6 L 20 28" stroke="#1E1B4B" strokeWidth="1.75" />
            <path d="M 6 36 Q 14 38 20 28" stroke="#1E1B4B" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10 relative z-10">
        
        {/* ── 1. CINEMATIC HEADER TITLE & FILTER TABS ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 pb-2 border-b border-[#1E1B4B]/10">
          
          {/* Left: Trophy + Animated Title + Subtitle */}
          <div className="flex items-start gap-3 sm:gap-4 max-w-2xl">
            {/* Hand-drawn Golden Trophy Illustration with Pop Entrance */}
            <div className="anim-trophy-crest flex-shrink-0 pt-0.5 sm:pt-1">
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none" className="w-10 h-10 sm:w-13 sm:h-13 filter drop-shadow-sm">
                <path d="M16 12 H48 V28 C48 38 38 44 32 44 C26 44 16 38 16 28 V12 Z" fill="#FBBF24" stroke="#1E1B4B" strokeWidth="2.5" />
                <path d="M16 18 C8 18 8 32 18 34" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M48 18 C56 18 56 32 46 34" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M28 44 V52 H36 V44" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2.5" />
                <rect x="20" y="52" width="24" height="6" rx="2" fill="#D97706" stroke="#1E1B4B" strokeWidth="2.5" />
                {/* Sparkles */}
                <path d="M8 8 L10 13 L15 15 L10 17 L8 22 L6 17 L1 15 L6 13 Z" fill="#F59E0B" />
                <circle cx="56" cy="12" r="2.5" fill="#EA580C" />
                <circle cx="52" cy="8" r="1.5" fill="#FBBF24" />
              </svg>
            </div>

            <div>
              {/* Revealed Heading */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none overflow-hidden">
                <span className="anim-title-live inline-block font-display text-[#1E1B4B]">LIVE </span>{' '}
                <span className="anim-title-board inline-block font-marker text-[#582A9C] tracking-wide">LEADERBOARD</span>
              </h1>

              {/* Revealed Subtitle */}
              <div className="anim-subtext mt-1.5 sm:mt-2 text-xs xs:text-sm sm:text-base font-sans text-[#1E1B4B]/80 font-medium leading-snug">
                <p>
                  The race to the <span className="font-bold text-[#EA580C]">championship</span> is on.
                </p>
                <p className="flex items-center gap-1.5 flex-wrap mt-0.5">
                  <span>Every match. Every point. Every improvement</span>
                  <span className="relative font-bold text-[#1E1B4B]">
                    counts.
                    {/* Animated Hand-drawn orange underline */}
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

          {/* Right: Round Tabs & Responsive Switcher (Seamless Tone) */}
          <div className="flex flex-col items-start lg:items-end gap-2 sm:gap-2.5 flex-shrink-0 w-full lg:w-auto">
            {/* Horizontally scrollable on small mobile to prevent squishing */}
            <div className="anim-tabs-bar w-full lg:w-auto overflow-x-auto no-scrollbar py-0.5">
              <div className="inline-flex p-1 bg-[#ECE7DC]/90 rounded-2xl border border-[#1E1B4B]/15 shadow-2xs min-w-max">
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
                <button
                  onClick={() => setActiveTab('week1')}
                  className={`px-2.5 xs:px-3 sm:px-3.5 py-1.5 rounded-xl font-mono text-[11px] xs:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'week1'
                      ? 'bg-[#3B1A6B] text-white shadow-xs'
                      : 'text-[#1E1B4B]/70 hover:text-[#1E1B4B]'
                  }`}
                >
                  WEEK 1 - PART 1
                </button>
                <button
                  onClick={() => setActiveTab('week2')}
                  className={`px-2.5 xs:px-3 sm:px-3.5 py-1.5 rounded-xl font-mono text-[11px] xs:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'week2'
                      ? 'bg-[#3B1A6B] text-white shadow-xs'
                      : 'text-[#1E1B4B]/70 hover:text-[#1E1B4B]'
                  }`}
                >
                  WEEK 2 - PART 2
                </button>
                <button
                  onClick={() => setActiveTab('playoffs')}
                  className={`px-2.5 xs:px-3 sm:px-3.5 py-1.5 rounded-xl font-mono text-[11px] xs:text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'playoffs'
                      ? 'bg-[#3B1A6B] text-white shadow-xs'
                      : 'text-[#1E1B4B]/70 hover:text-[#1E1B4B]'
                  }`}
                >
                  PLAYOFFS - PART 3
                </button>
              </div>
            </div>

            {/* Live / Coming Soon Indicator */}
            <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1E1B4B]/70">
              <span className={`w-2.5 h-2.5 rounded-full ${isComingSoon ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'} inline-block`} />
              <span>
                {isComingSoon 
                  ? 'Standings officially unlock on September 12 at 5:30 PM.' 
                  : 'Standings update in real-time after each evaluation.'}
              </span>
            </div>
          </div>

        </div>

        {/* ── 2. MAIN 2-COLUMN GRID (Table on Left, 3 Cards on Right - Aligned with Canvas Tone) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* ════ LEFT COLUMN: LEADERBOARD TABLE (7 Cols) ════ */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Table Container - Tone Aligned Seamlessly with Background, NOT Stark White */}
            <div className="scroll-leaderboard-table rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#F6F3EB] shadow-xs overflow-hidden relative">
              
              {/* Optional Preview Status Bar when unlocked */}
              {!isComingSoon && (
                <div className="bg-[#EFE8DA] px-3.5 sm:px-4 py-1.5 border-b border-[#1E1B4B]/10 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono font-bold text-amber-950">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>PREVIEW MODE: SIMULATED STANDINGS</span>
                  </div>
                  <button
                    onClick={() => setIsComingSoon(true)}
                    className="hover:underline flex items-center gap-1 text-amber-950 cursor-pointer ml-auto"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Re-lock Table</span>
                  </button>
                </div>
              )}

              {/* Mobile Swipe Hint */}
              <div className="sm:hidden px-3 py-1 bg-[#ECE7DC] border-b border-[#1E1B4B]/10 text-[10px] font-mono text-gray-600 flex items-center justify-center gap-1">
                <span>👈 Swipe table horizontally to see all columns 👉</span>
              </div>

              <div className="overflow-x-auto scroll-smooth">
                <table className="w-full text-left border-collapse min-w-[540px]">
                  {/* Table Header with Deep Navy/Purple Background */}
                  <thead>
                    <tr className="bg-[#20154B] text-white font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase">
                      <th className="py-3.5 px-3 sm:px-4 text-center w-14 sm:w-16">RANK</th>
                      <th className="py-3.5 px-3 sm:px-4">SQUAD</th>
                      <th className="py-3.5 px-2 sm:px-3 text-center">MATCHES</th>
                      <th className="py-3.5 px-2 sm:px-3 text-center">WINS</th>
                      <th className="py-3.5 px-2 sm:px-3 text-center">TIES</th>
                      <th className="py-3.5 px-2 sm:px-3 text-center">LOSSES</th>
                      <th className="py-3.5 px-2 sm:px-3 text-center">POINTS</th>
                      <th className="py-3.5 px-3 sm:px-4 text-center">TREND</th>
                    </tr>
                  </thead>

                  {/* Table Body - Tone Aligned with Canvas */}
                  <tbody className={`divide-y divide-[#E6DFCE] font-sans text-xs sm:text-sm transition-all duration-300 ${
                    isComingSoon ? 'filter blur-[3px] opacity-35 select-none pointer-events-none' : ''
                  }`}>
                    {STANDINGS.map((row) => {
                      return (
                        <tr 
                          key={row.name}
                          onClick={() => onSelectSquad && onSelectSquad(row.name.toLowerCase().replace(/\s+/g, '-'))}
                          className="scroll-table-row hover:bg-[#EFE8DA]/80 transition-colors cursor-pointer group"
                        >
                          {/* Rank Badge */}
                          <td className="py-3 px-3 sm:px-4 text-center font-bold">
                            {row.rank === 1 && (
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400 border border-amber-600 text-amber-950 font-black flex items-center justify-center mx-auto shadow-2xs text-xs sm:text-sm">
                                1
                              </div>
                            )}
                            {row.rank === 2 && (
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-300 border border-slate-400 text-slate-800 font-black flex items-center justify-center mx-auto shadow-2xs text-xs sm:text-sm">
                                2
                              </div>
                            )}
                            {row.rank === 3 && (
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-700/25 border border-amber-700 text-amber-900 font-black flex items-center justify-center mx-auto shadow-2xs text-xs sm:text-sm">
                                3
                              </div>
                            )}
                            {row.rank > 3 && (
                              <span className="font-mono font-bold text-gray-500 text-sm sm:text-base">
                                {row.rank}
                              </span>
                            )}
                          </td>

                          {/* Squad with Avatar & Subtitle */}
                          <td className="py-3 px-3 sm:px-4">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                              <SquadAvatar icon={row.avatarIcon} bg={row.avatarBg} />
                              <div className="min-w-0">
                                <div className="font-display font-black text-xs sm:text-sm text-[#1E1B4B] group-hover:text-[#582A9C] transition-colors leading-snug truncate">
                                  {row.name}
                                </div>
                                <div className="text-[10px] sm:text-xs text-gray-500 font-medium truncate max-w-[140px] sm:max-w-none">
                                  {row.subtitle}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Matches */}
                          <td className="py-3 px-2 sm:px-3 text-center font-mono text-gray-600 font-semibold text-xs sm:text-sm">
                            {row.matches}
                          </td>

                          {/* Wins */}
                          <td className="py-3 px-2 sm:px-3 text-center font-mono text-gray-600 font-semibold text-xs sm:text-sm">
                            {row.wins}
                          </td>

                          {/* Ties */}
                          <td className="py-3 px-2 sm:px-3 text-center font-mono text-gray-600 font-semibold text-xs sm:text-sm">
                            {row.ties}
                          </td>

                          {/* Losses */}
                          <td className="py-3 px-2 sm:px-3 text-center font-mono text-gray-600 font-semibold text-xs sm:text-sm">
                            {row.losses}
                          </td>

                          {/* Points (Prominent Purple) */}
                          <td className="py-3 px-2 sm:px-3 text-center font-mono font-black text-sm sm:text-base text-[#431D74]">
                            {row.points}
                          </td>

                          {/* Trend */}
                          <td className="py-3 px-3 sm:px-4 text-center font-mono font-bold text-xs">
                            {row.trend === 'up' && (
                              <span className="inline-flex items-center gap-1 text-emerald-600">
                                <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                                <span>{row.trendValue}</span>
                              </span>
                            )}
                            {row.trend === 'down' && (
                              <span className="inline-flex items-center gap-1 text-rose-600">
                                <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                                <span>{row.trendValue}</span>
                              </span>
                            )}
                            {row.trend === 'same' && (
                              <span className="inline-flex items-center text-gray-400">
                                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ── COMING SOON OVERLAY FOR STANDINGS TABLE (Toned to Parchment) ── */}
              {isComingSoon && (
                <div className="absolute inset-0 z-20 flex items-center justify-center p-3.5 xs:p-5 sm:p-6 bg-[#F6F3EB]/75 backdrop-blur-xs">
                  <div className="max-w-md w-full p-4 xs:p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#ECE7DC] border-2 sm:border-3 border-[#1E1B4B] shadow-sketch-lg text-center space-y-2.5 sm:space-y-3.5 transform hover:scale-[1.01] transition-transform">
                    
                    {/* Golden Shield Lock Icon */}
                    <div className="w-11 h-11 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 border-2 border-[#1E1B4B] shadow-sketch-sm flex items-center justify-center mx-auto text-[#1E1B4B]">
                      <Lock className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />
                    </div>

                    {/* Status Chip */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[9.5px] xs:text-[10.5px] font-mono font-bold text-amber-900 uppercase tracking-wider">
                      <Clock className="w-3 h-3 text-amber-700 flex-shrink-0" />
                      <span>UNLOCKS MATCH DAY 1 • SEPT 12</span>
                    </div>

                    {/* Heading */}
                    <h3 className="font-display font-black text-xl xs:text-2xl sm:text-3xl uppercase tracking-tight text-[#1E1B4B] leading-none">
                      STANDINGS COMING SOON
                    </h3>

                    {/* Subtitle description */}
                    <p className="text-[11px] xs:text-xs sm:text-sm font-sans font-medium text-[#1E1B4B]/80 leading-relaxed max-w-sm mx-auto">
                      Official squad points, ladder ranks, and match day scores unlock right after the 
                      <span className="font-bold text-[#EA580C]"> Part 1 Evaluation on September 12 at 5:30 PM</span>.
                    </p>

                    {/* Telemetry Chips */}
                    <div className="grid grid-cols-3 gap-1.5 xs:gap-2 pt-1 font-mono text-[9px] xs:text-[10px] font-bold text-[#1E1B4B]/70">
                      <div className="p-1 xs:p-1.5 bg-[#F6F3EB] rounded-lg border border-[#1E1B4B]/10">
                        16 SQUADS
                      </div>
                      <div className="p-1 xs:p-1.5 bg-[#F6F3EB] rounded-lg border border-[#1E1B4B]/10">
                        8 MATCHES
                      </div>
                      <div className="p-1 xs:p-1.5 bg-[#F6F3EB] rounded-lg border border-[#1E1B4B]/10">
                        ₹30K PRIZE
                      </div>
                    </div>

                    {/* Interactive Preview Button */}
                    <div className="pt-1.5 sm:pt-2">
                      <button
                        onClick={() => setIsComingSoon(false)}
                        className="inline-flex items-center gap-1.5 px-3.5 xs:px-4 py-1.5 sm:py-2 rounded-xl bg-[#F6F3EB] border-2 border-[#582A9C] text-[#582A9C] font-mono text-[11px] xs:text-xs font-black uppercase tracking-wider hover:bg-white shadow-sketch-xs transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview Simulated Standings</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Table Footer: Legend & View Standings CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-1 px-1 sm:px-2">
              {/* Trend Legend */}
              <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono font-bold text-[#1E1B4B]/70">
                <span className="flex items-center gap-1 text-emerald-600">
                  <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Moved Up</span>
                </span>
                <span className="flex items-center gap-1 text-rose-600">
                  <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Moved Down</span>
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>No Change</span>
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onNavigate('squads')}
                className="w-full sm:w-auto justify-center px-4 sm:px-5 py-2 rounded-xl bg-[#ECE7DC] border-2 border-[#582A9C] text-[#582A9C] font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>VIEW DETAILED STANDINGS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* ════ RIGHT COLUMN: 3 FEATURE CARDS (5 Cols) ════ */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* ── CARD 1: HPL POINT SYSTEM (Warm Tone Aligned with Background) ── */}
            <div className="scroll-feature-card rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#F6F3EB] p-4 sm:p-6 shadow-xs relative overflow-hidden">
              {/* Header with Mini Chart Doodle */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-marker text-base sm:text-lg text-[#582A9C] tracking-wide">
                  HPL POINT SYSTEM
                </h3>
                {/* Mini bar chart with green arrow doodle */}
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

              {/* Responsive 4 Items Grid */}
              <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 text-center py-2.5 border-y border-[#E6DFCE]">
                {/* Win */}
                <div className="flex flex-col items-center p-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400/20 flex items-center justify-center mb-1 text-amber-600">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-sans font-bold text-gray-700">Win</span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-900 mt-0.5">2 Points</span>
                </div>

                {/* Tie */}
                <div className="flex flex-col items-center p-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center mb-1 text-indigo-700">
                    <Handshake className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-sans font-bold text-gray-700">Tie</span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-900 mt-0.5">1 Point</span>
                </div>

                {/* Loss */}
                <div className="flex flex-col items-center p-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/15 flex items-center justify-center mb-1 text-rose-600">
                    <Swords className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-sans font-bold text-gray-700">Loss</span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-900 mt-0.5">0 Points</span>
                </div>

                {/* Bonus */}
                <div className="flex flex-col items-center p-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center mb-1 text-yellow-600">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-sans font-bold text-gray-700">Bonus</span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-900 mt-0.5 leading-tight">Up to 1 Pt</span>
                </div>
              </div>

              {/* Subtext */}
              <div className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-sans text-gray-600 leading-relaxed">
                <p>Points are awarded after each head-to-head evaluation.</p>
                <p className="mt-0.5">
                  Climb the leaderboard and make your way to the{' '}
                  <span className="font-bold text-[#582A9C]">top!</span>
                </p>
              </div>
            </div>

            {/* ── CARD 2: TOP PERFORMERS (Warm Tone Aligned with Background) ── */}
            <div className="scroll-feature-card rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#F6F3EB] p-4 sm:p-6 shadow-xs relative overflow-hidden">
              {/* Header with Underline & Dropdown */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="relative">
                  <h3 className="font-display font-black italic text-base sm:text-lg text-[#1E1B4B] tracking-tight">
                    TOP PERFORMERS
                  </h3>
                  {/* Hand-drawn yellow-orange brush underline */}
                  <svg className="absolute left-0 -bottom-1 w-full h-1.5" viewBox="0 0 100 8" fill="none" preserveAspectRatio="none">
                    <path d="M2 5 C30 2 70 7 98 4" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 bg-[#ECE7DC] rounded-lg border border-[#1E1B4B]/10 text-[11px] sm:text-xs font-sans font-medium text-gray-700 cursor-pointer hover:bg-white transition-colors">
                  <span>This Season</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </div>
              </div>

              {/* 3 Metric Cards (Blurred when locked) */}
              <div className={`grid grid-cols-3 gap-2 sm:gap-3 text-center transition-all duration-300 ${
                isComingSoon ? 'filter blur-[2.5px] opacity-30 select-none pointer-events-none' : ''
              }`}>
                {/* Most Wins */}
                <div className="p-2 sm:p-3 bg-[#EDE8DC] rounded-xl sm:rounded-2xl border border-[#1E1B4B]/10 flex flex-col items-center justify-center">
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium text-gray-600 mb-0.5 sm:mb-1">
                    Most Wins
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-amber-500 mb-0.5">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] leading-none mb-1">
                    5
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans font-bold text-[#1E1B4B] truncate w-full">
                    CodeTroopers
                  </span>
                </div>

                {/* Highest Points */}
                <div className="p-2 sm:p-3 bg-[#EDE8DC] rounded-xl sm:rounded-2xl border border-[#1E1B4B]/10 flex flex-col items-center justify-center">
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium text-gray-600 mb-0.5 sm:mb-1">
                    Highest Points
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-amber-500 mb-0.5">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] leading-none mb-1">
                    10
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans font-bold text-[#1E1B4B] truncate w-full">
                    CodeTroopers
                  </span>
                </div>

                {/* Best Improvement */}
                <div className="p-2 sm:p-3 bg-[#EDE8DC] rounded-xl sm:rounded-2xl border border-[#1E1B4B]/10 flex flex-col items-center justify-center">
                  <span className="text-[10px] sm:text-[11px] font-sans font-medium text-gray-600 mb-0.5 sm:mb-1">
                    Best Improvement
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-blue-600 mb-0.5">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-display font-black text-xl sm:text-2xl text-blue-600 leading-none mb-1">
                    +3
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans font-bold text-[#1E1B4B] truncate w-full">
                    Ctrl Alt Elite
                  </span>
                </div>
              </div>

              {/* ── COMING SOON OVERLAY FOR TOP PERFORMERS ── */}
              {isComingSoon && (
                <div className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-4 bg-[#F6F3EB]/70 backdrop-blur-xs">
                  <div className="p-3 xs:p-4 rounded-2xl bg-[#ECE7DC] border-2 border-[#1E1B4B] shadow-sketch-sm text-center space-y-1 max-w-[260px]">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400 border border-[#1E1B4B] flex items-center justify-center mx-auto text-[#1E1B4B]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <h4 className="font-display font-black text-xs xs:text-sm uppercase text-[#1E1B4B] tracking-tight">
                      TOP PERFORMERS LOCKED
                    </h4>
                    <p className="text-[10px] xs:text-[11px] font-sans font-medium text-gray-600 leading-snug">
                      MVP awards, most wins, and point leaders will be crowned after Match Day 1!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ── CARD 3: THE CHAMPIONSHIP AWAITS! (Aligned with Background) ── */}
            <div className="scroll-feature-card scroll-championship-card rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#F6F3EB] overflow-hidden shadow-xs relative">
              <div className="flex flex-col sm:grid sm:grid-cols-12 items-stretch">
                {/* Left Text */}
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

                {/* Right Illustration: Crisp Artwork with GSAP Parallax & Clean Edge Blend (Zero Blur on Trophy) */}
                <div className="sm:col-span-7 relative h-52 xs:h-60 sm:h-full min-h-[190px] sm:min-h-[210px] flex items-center justify-end overflow-hidden">
                  <img
                    src={HPL_IMAGES.championshipAwaits}
                    alt="The Championship Awaits - Golden Trophy and Udupi Temple"
                    className="scroll-championship-img w-full h-full object-cover object-center transform scale-105"
                  />

                  {/* Soft left edge fade to ease cleanly into the card text without covering the trophy */}
                  <div 
                    className="hidden sm:block absolute inset-y-0 left-0 w-10 sm:w-14 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to right, #F6F3EB 20%, transparent 100%)'
                    }}
                  />
                  <div 
                    className="sm:hidden absolute inset-x-0 top-0 h-6 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, #F6F3EB 20%, transparent 100%)'
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ── 3. BOTTOM 4-FEATURE UNIFIED RIBBON STRIP (Matching Original Layout Exactly) ── */}
        <div className="scroll-bottom-ribbon rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#F6F3EB] shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6DFCE]">
            
            {/* Feature 1: Multiple Match Days */}
            <div className="p-4 sm:p-5 flex items-center gap-3.5 hover:bg-[#EDE8DC]/50 transition-colors">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-700 flex-shrink-0">
                <Users className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#1E1B4B] truncate">
                  MULTIPLE MATCH DAYS
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-gray-600 mt-0.5 leading-snug">
                  Teams face off, present, and earn points.
                </p>
              </div>
            </div>

            {/* Feature 2: Improve & Adapt */}
            <div className="p-4 sm:p-5 flex items-center gap-3.5 hover:bg-[#EDE8DC]/50 transition-colors">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-700 flex-shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#1E1B4B] truncate">
                  IMPROVE & ADAPT
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-gray-600 mt-0.5 leading-snug">
                  Use feedback to build smarter and stronger.
                </p>
              </div>
            </div>

            {/* Feature 3: Climb the Standings */}
            <div className="p-4 sm:p-5 flex items-center gap-3.5 hover:bg-[#EDE8DC]/50 transition-colors">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 flex-shrink-0">
                <Award className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#1E1B4B] truncate">
                  CLIMB THE STANDINGS
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-gray-600 mt-0.5 leading-snug">
                  League points decide your fate.
                </p>
              </div>
            </div>

            {/* Feature 4: Only The Best */}
            <div className="p-4 sm:p-5 flex items-center gap-3.5 hover:bg-[#EDE8DC]/50 transition-colors">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-700 flex-shrink-0">
                <Trophy className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#1E1B4B] truncate">
                  ONLY THE BEST
                </h4>
                <p className="text-[11px] sm:text-xs font-sans text-gray-600 mt-0.5 leading-snug">
                  Top teams battle for the ultimate glory.
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
