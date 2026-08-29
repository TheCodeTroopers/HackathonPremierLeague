import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Trophy, 
  Swords, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  ArrowRight, 
  Flame, 
  Cpu, 
  Terminal, 
  Users, 
  Calendar, 
  Code2
} from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * Stages of the HPL Match Protocol Ignition
 */
const PROTOCOL_STAGES = [
  {
    step: 1,
    minPct: 0,
    maxPct: 22,
    code: 'INIT_SQUADS',
    phase: 'PHASE 01 // SQUAD REGISTRATION',
    title: 'REGISTERING 16 FRANCHISE SQUADS',
    description: 'Collegiate rosters locked • Git workspaces allocated • Build For Udupi tracks assigned.',
    subtext: 'Franchise Protocol • 16 Teams • Hybrid Bantakal Arena',
    badge: '16 SQUADS',
    icon: Cpu,
    color: '#3B82F6',
  },
  {
    step: 2,
    minPct: 23,
    maxPct: 48,
    code: 'DRAFT_FIXTURES',
    phase: 'PHASE 02 // DRAFT & FIXTURES',
    title: 'SCHEDULING 8+ MATCH FIXTURES',
    description: 'Drafting head-to-head battle brackets • Pairing senior industry tech leads with squads.',
    subtext: 'Scoring Matrix: Win (+3) • Tie (+1) • Loss (0)',
    badge: 'FIXTURES LOCKED',
    icon: Swords,
    color: '#8B5CF6',
  },
  {
    step: 3,
    minPct: 49,
    maxPct: 74,
    code: 'CALIBRATE_TERMINAL',
    phase: 'PHASE 03 // MATCH TERMINAL ENGINE',
    title: 'COMPILING LIVE ARENA TELEMETRY',
    description: 'Deploying real-time automated scoring pipeline • Peer review telemetry & leaderboard live.',
    subtext: 'Live Telemetry: Node Udupi-01 • Zero-Latency Stream',
    badge: 'LEADERBOARD READY',
    icon: Flame,
    color: '#EA580C',
  },
  {
    step: 4,
    minPct: 75,
    maxPct: 94,
    code: 'ILLUMINATE_ARENA',
    phase: 'PHASE 04 // UDUPI GRAND FINALE',
    title: 'ILLUMINATING FINALE STAGE',
    description: 'Configuring coastal Udupi championship arena • ₹30,000 cash purse & golden trophy polished.',
    subtext: 'Top 4 Squads per Domain Advance to Grand Finale (12 Finalists)',
    badge: 'GRAND FINALE READY',
    icon: Trophy,
    color: '#F59E0B',
  },
  {
    step: 5,
    minPct: 95,
    maxPct: 100,
    code: 'GATES_OPEN',
    phase: 'PHASE 05 // ARENA UNLOCKED',
    title: 'STADIUM GATES OPEN — HPL 2026',
    description: 'All 16 squads loaded. Live broadcast online. Code. Collaborate. Conquer!',
    subtext: 'Season 2026 Initiated • Let the Games Begin',
    badge: 'ARENA LIVE',
    icon: Sparkles,
    color: '#10B981',
  },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Active stage based on current percentage
  const currentStage = PROTOCOL_STAGES.find(
    (s) => progress >= s.minPct && progress <= s.maxPct
  ) || PROTOCOL_STAGES[PROTOCOL_STAGES.length - 1];

  // ── Smooth High-Precision Progress Engine ────────────────────────────────
  useEffect(() => {
    let animFrame: number;
    let startTimestamp: number | null = null;
    const TOTAL_DURATION = 2400; // ~2.4 seconds of premium pacing

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const t = Math.min(1, elapsed / TOTAL_DURATION);

      // Custom ease-out cubic curve with micro-pauses at milestones
      let curvedProgress = 0;
      if (t < 0.3) {
        curvedProgress = (t / 0.3) * 35;
      } else if (t < 0.65) {
        curvedProgress = 35 + ((t - 0.3) / 0.35) * 37;
      } else if (t < 0.9) {
        curvedProgress = 72 + ((t - 0.65) / 0.25) * 24;
      } else {
        curvedProgress = 96 + ((t - 0.9) / 0.1) * 4;
      }

      curvedProgress = Math.min(100, Math.max(0, curvedProgress));
      setProgress(curvedProgress);

      if (t < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setProgress(100);
        setIsReady(true);
      }
    };

    animFrame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // ── Smooth Exit Animation Trigger ────────────────────────────────────────
  const handleEnterArena = () => {
    if (isExiting) return;
    setIsExiting(true);

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power4.inOut',
        onComplete: () => {
          onComplete();
        },
      });
    } else {
      onComplete();
    }
  };

  // Auto-advance 1100ms after reaching 100%
  useEffect(() => {
    if (!isReady || isExiting) return;

    const timer = setTimeout(() => {
      handleEnterArena();
    }, 1100);

    return () => clearTimeout(timer);
  }, [isReady, isExiting]);

  const StageIcon = currentStage.icon;

  return (
    // ── FIXED VIEWPORT OVERLAY (NO SCROLL, FIXED TO ENTIRE DEVICE) ──
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-hidden bg-[#FAF6EE] text-[#1E1B4B] flex flex-col justify-between select-none"
      style={{ willChange: 'transform' }}
    >
      {/* ── Background: Halftone Dot Grid & Ambient Stadium Floodlights ── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(30, 27, 75, 0.055) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Atmospheric Warm Amber Spotlight (Top-Left) */}
      <div 
        className="absolute -top-32 -left-32 w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] rounded-full pointer-events-none opacity-40 blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(251, 191, 36, 0.15) 50%, transparent 80%)'
        }}
      />

      {/* Atmospheric Electric Violet Spotlight (Top-Right) */}
      <div 
        className="absolute -top-32 -right-32 w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] rounded-full pointer-events-none opacity-30 blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.35) 0%, rgba(99, 102, 241, 0.12) 50%, transparent 80%)'
        }}
      />

      {/* Floating Micro-Doodle: Paper Plane on Top Right */}
      <div className="absolute top-12 right-6 sm:right-16 pointer-events-none opacity-20 hidden sm:block animate-[float_4.5s_ease-in-out_infinite]">
        <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
          <path d="M 6 22 L 42 6 L 26 42 L 20 28 Z" fill="#F59E0B" fillOpacity="0.3" stroke="#1E1B4B" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 42 6 L 20 28" stroke="#1E1B4B" strokeWidth="2" />
          <path d="M 6 36 Q 14 38 20 28" stroke="#1E1B4B" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Floating Micro-Doodle: Code Tags on Left */}
      <div className="absolute bottom-12 left-4 sm:left-12 pointer-events-none opacity-20 hidden md:block animate-[float_5s_1s_ease-in-out_infinite]">
        <div className="font-mono font-black text-lg text-[#1E1B4B]/40 bg-[#FFFDF7] px-2.5 py-1 rounded-xl border-2 border-[#1E1B4B]/20 shadow-2xs">
          &lt;HPL: 2026 /&gt;
        </div>
      </div>

      {/* ── TOP HEADER HUD BAR (COMPACT & CLEAN) ────────────────────────── */}
      <header className="relative z-20 w-full px-3.5 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-2.5 flex items-center justify-between border-b-2 border-[#1E1B4B]/10 bg-[#FAF6EE]/90 backdrop-blur-sm flex-shrink-0">
        {/* Left: Broadcast Status */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="relative flex items-center justify-center flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 relative" />
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-mono text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#1E1B4B] truncate">
              HPL PROTOCOL
            </span>
            <span className="hidden xs:inline-block px-1.5 py-0.2 text-[8px] sm:text-[9px] font-mono font-bold bg-amber-200 text-amber-900 rounded border border-[#1E1B4B]/20 flex-shrink-0">
              v2.6
            </span>
          </div>
        </div>

        {/* Center: Equalizer Bars */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 bg-white/70 rounded-full border border-[#1E1B4B]/15 shadow-2xs">
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#1E1B4B]/70 mr-1">
            TELEMETRY:
          </span>
          <div className="flex items-end gap-1 h-3 w-10 justify-center">
            <div className="w-0.5 bg-[#EA580C] rounded-full h-full anim-sound-bar-1" />
            <div className="w-0.5 bg-[#F59E0B] rounded-full h-full anim-sound-bar-2" />
            <div className="w-0.5 bg-[#10B981] rounded-full h-full anim-sound-bar-3" />
            <div className="w-0.5 bg-[#3B82F6] rounded-full h-full anim-sound-bar-4" />
            <div className="w-0.5 bg-[#8B5CF6] rounded-full h-full anim-sound-bar-5" />
          </div>
        </div>

        {/* Right: Skip Button */}
        <button
          onClick={handleEnterArena}
          className="group flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2px_2px_0px_#1E1B4B] hover:bg-amber-100 hover:shadow-[3px_3px_0px_#1E1B4B] active:translate-x-0.5 active:translate-y-0.5 transition-all text-[10px] sm:text-[11px] font-mono font-black text-[#1E1B4B] cursor-pointer flex-shrink-0"
        >
          <span className="hidden sm:inline">SKIP TO </span>
          <span>ARENA</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </header>

      {/* ── MAIN CONTENT CONTAINER (PERFECTLY FITS VIEWPORT, ZERO SCROLL) ───── */}
      <div 
        ref={contentRef}
        className="relative z-10 flex-1 flex flex-col items-center justify-between px-3 sm:px-6 py-2 sm:py-3 max-w-2xl mx-auto w-full min-h-0 overflow-hidden"
      >
        
        {/* ── 1. CENTERPIECE: CHAMPIONSHIP CREST + TITLES (COMPACT PROPORTIONS) ── */}
        <div className="flex flex-col items-center text-center flex-shrink-0">
          
          {/* Crest Rings */}
          <div className="relative w-16 h-16 xs:w-18 xs:h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 flex items-center justify-center">
            
            {/* Outer Orbit Ring with Dashed Line */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/40 anim-radar-spin pointer-events-none" />
            
            {/* Counter-rotating Thin Accent Ring */}
            <div className="absolute inset-1.5 rounded-full border border-indigo-500/30 anim-radar-spin-reverse pointer-events-none" />

            {/* Central 3D Comic Crest Shield */}
            <div className="relative w-12 h-14 xs:w-14 xs:h-16 sm:w-16 sm:h-20 flex items-center justify-center">
              <svg viewBox="0 0 100 120" fill="none" className="w-full h-full filter drop-shadow-[2px_2px_0px_#1E1B4B]">
                <polygon 
                  points="50,4 92,24 92,84 50,116 8,84 8,24" 
                  fill="#1E1B4B" 
                  stroke="#F59E0B" 
                  strokeWidth="4" 
                  strokeLinejoin="round" 
                />
                <polygon 
                  points="50,12 84,28 84,80 50,108 16,80 16,28" 
                  fill="#2A2566" 
                  stroke="#FBBF24" 
                  strokeWidth="2" 
                  strokeLinejoin="round" 
                />
                {/* Golden Trophy Cup */}
                <g transform="translate(24, 28) scale(0.52)">
                  <path 
                    d="M 12 10 L 88 10 L 80 58 C 76 74 62 82 50 82 C 38 82 24 74 20 58 Z" 
                    fill="#FBBF24" 
                    stroke="#1E1B4B" 
                    strokeWidth="4" 
                  />
                  <path 
                    d="M 14 20 C 0 20 0 44 18 48" 
                    stroke="#F59E0B" 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                    fill="none" 
                  />
                  <path 
                    d="M 86 20 C 100 20 100 44 82 48" 
                    stroke="#F59E0B" 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                    fill="none" 
                  />
                  <rect x="44" y="82" width="12" height="18" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="3" />
                  <rect x="30" y="98" width="40" height="10" rx="3" fill="#FBBF24" stroke="#1E1B4B" strokeWidth="3" />
                  <polygon 
                    points="50,30 53,38 62,39 55,45 57,54 50,49 43,54 45,45 38,39 47,38" 
                    fill="#FFFDF8" 
                    stroke="#1E1B4B" 
                    strokeWidth="1.5" 
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Pill Banner */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 border-2 border-[#1E1B4B] shadow-2xs mt-1 sm:mt-1.5 transform -rotate-1">
            <Sparkles className="w-3 h-3 text-[#1E1B4B]" />
            <span className="font-marker text-[9.5px] xs:text-[10.5px] sm:text-xs text-[#1E1B4B] tracking-wider uppercase">
              HACKATHON PREMIER LEAGUE 2026
            </span>
          </div>

          {/* Punchy Comic Tagline */}
          <h1 className="font-display font-black text-lg xs:text-xl sm:text-2xl md:text-3xl tracking-tight text-[#1E1B4B] leading-none mt-1 sm:mt-1.5 flex items-center justify-center gap-1.5">
            <span>CODE.</span>
            <span className="text-[#EA580C]">COLLABORATE.</span>
            <span className="text-[#2563EB]">CONQUER.</span>
          </h1>

          <p className="font-sans text-[10px] xs:text-[11px] sm:text-xs font-semibold text-[#1E1B4B]/70 max-w-sm mt-0.5 leading-tight">
            Where Premier League Intensity Meets World-Class Engineering
          </p>
        </div>

        {/* ── 2. DYNAMIC PROTOCOL TERMINAL HUD (COMPACT HEIGHT) ────────── */}
        <div className="w-full bg-white/95 rounded-xl border-2 border-[#1E1B4B] shadow-sketch-sm p-2 sm:p-3 my-1 sm:my-1.5 relative overflow-hidden backdrop-blur-md flex-shrink-0">
          {/* Top Window Chrome */}
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-[#1E1B4B]/10">
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
              <div className="w-2 h-2 rounded-full bg-red-400 border border-[#1E1B4B] flex-shrink-0" />
              <div className="w-2 h-2 rounded-full bg-amber-400 border border-[#1E1B4B] flex-shrink-0" />
              <div className="w-2 h-2 rounded-full bg-emerald-400 border border-[#1E1B4B] flex-shrink-0" />
              <span className="ml-1 font-mono text-[9px] sm:text-[10px] font-bold text-[#1E1B4B]/60 tracking-wider truncate">
                hpl_engine::season_init.sh
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[8.5px] sm:text-[9.5px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300 flex-shrink-0">
              <Terminal className="w-2.5 h-2.5" />
              <span>STEP {currentStage.step}/5</span>
            </div>
          </div>

          {/* Active Phase & Dynamic Content */}
          <div className="flex items-start gap-2 sm:gap-2.5">
            <div 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border-2 border-[#1E1B4B] shadow-2xs flex-shrink-0"
              style={{ backgroundColor: `${currentStage.color}18` }}
            >
              <StageIcon className="w-4 h-4" style={{ color: currentStage.color }} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono text-[8px] xs:text-[8.5px] sm:text-[9px] font-black tracking-wider text-[#1E1B4B]/50 uppercase truncate">
                  {currentStage.phase}
                </span>
                <span 
                  className="font-mono text-[7.5px] xs:text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full border border-[#1E1B4B]/20 text-white flex-shrink-0"
                  style={{ backgroundColor: currentStage.color }}
                >
                  {currentStage.badge}
                </span>
              </div>

              <h2 className="font-display font-black text-[11px] xs:text-xs sm:text-sm text-[#1E1B4B] uppercase tracking-tight mt-0.5 leading-snug truncate">
                {currentStage.title}
              </h2>

              <p className="font-sans text-[9.5px] xs:text-[10.5px] text-[#1E1B4B]/80 font-medium leading-snug line-clamp-1 mt-0.5">
                {currentStage.description}
              </p>

              <div className="mt-1 pt-1 border-t border-dashed border-[#1E1B4B]/15 flex items-center justify-between text-[8.5px] sm:text-[9px] font-mono text-[#1E1B4B]/60">
                <span className="truncate">&gt; {currentStage.subtext}</span>
                <span className="text-emerald-700 font-bold ml-1.5 flex-shrink-0">ONLINE ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. STRIPED HAZARD PROGRESS GAUGE & COUNTER (COMPACT) ─────── */}
        <div className="w-full my-1 sm:my-1.5 flex-shrink-0">
          <div className="flex items-center justify-between mb-0.5 font-mono text-[9.5px] sm:text-[10.5px] font-black">
            <div className="flex items-center gap-1 text-[#1E1B4B]">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-400" />
              <span className="tracking-wider">ARENA SEQUENCE</span>
            </div>
            <div className="flex items-center gap-1 bg-[#1E1B4B] text-amber-300 px-1.5 py-0.2 rounded border border-[#1E1B4B]">
              <span className="tracking-widest">{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="relative h-3 sm:h-3.5 bg-[#EFE9D8] rounded-lg border-2 border-[#1E1B4B] shadow-2xs overflow-hidden p-0.5">
            <div
              className="h-full rounded-sm transition-all duration-75 relative anim-hazard-flow"
              style={{
                width: `${progress}%`,
                background: 'repeating-linear-gradient(45deg, #1E1B4B, #1E1B4B 10px, #3730A3 10px, #3730A3 20px)',
              }}
            >
              {progress > 0 && progress < 100 && (
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-amber-400 shadow-[0_0_8px_#F59E0B] rounded-r" />
              )}
            </div>
          </div>
        </div>

        {/* ── 4. FOUR STAMPED MILESTONE FEATURE BADGES ─────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 w-full my-1 sm:my-1.5 flex-shrink-0">
          {[
            { label: '3 WEEKS', sub: 'League Season', icon: Calendar, thresh: 25 },
            { label: '16 SQUADS', sub: 'Franchise Teams', icon: Users, thresh: 50 },
            { label: '8+ MATCHES', sub: 'Head-to-Head', icon: Swords, thresh: 75 },
            { label: '₹30,000', sub: 'Cash & Trophy', icon: Trophy, thresh: 100 },
          ].map((item) => {
            const isUnlocked = progress >= item.thresh;
            const ItemIcon = item.icon;
            return (
              <div
                key={item.label}
                className={`p-1.5 rounded-lg border-2 transition-all duration-300 flex items-center gap-1.5 ${
                  isUnlocked
                    ? 'bg-amber-50/90 border-[#1E1B4B] shadow-2xs'
                    : 'bg-white/50 border-[#1E1B4B]/25 opacity-60'
                }`}
              >
                <div 
                  className={`w-5 h-5 rounded flex items-center justify-center border flex-shrink-0 ${
                    isUnlocked ? 'border-[#1E1B4B] bg-white shadow-2xs' : 'border-transparent bg-gray-100'
                  }`}
                >
                  {isUnlocked ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 font-bold" />
                  ) : (
                    <ItemIcon className="w-2.5 h-2.5 text-[#1E1B4B]/40" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`font-mono text-[9.5px] xs:text-[10px] font-black leading-none truncate ${
                    isUnlocked ? 'text-[#1E1B4B]' : 'text-[#1E1B4B]/50'
                  }`}>
                    {item.label}
                  </span>
                  <span className="text-[7.5px] xs:text-[8px] font-sans font-medium text-[#1E1B4B]/60 truncate mt-0.5">
                    {item.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 5. INTERACTIVE ENTER BUTTON (ALWAYS PROPERLY VISIBLE, ZERO SCROLL) ── */}
        <div className="my-1 sm:my-1.5 h-9 sm:h-10 flex items-center justify-center flex-shrink-0">
          {isReady ? (
            <button
              onClick={handleEnterArena}
              className="group relative px-5 sm:px-6 py-1.5 sm:py-2 rounded-xl bg-[#1E1B4B] text-white border-2 border-[#1E1B4B] shadow-sketch hover:bg-amber-400 hover:text-[#1E1B4B] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-1.5 font-display font-black text-xs sm:text-sm tracking-wider uppercase animate-bounce"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300 group-hover:text-[#1E1B4B] transition-colors" />
              <span>ENTER THE ARENA ⚡</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 font-mono text-[9px] xs:text-[10px] font-bold text-[#1E1B4B]/50 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
              <span className="truncate max-w-[240px] xs:max-w-none">SYNCHRONIZING SQUADS & BRACKETS...</span>
            </div>
          )}
        </div>

      </div>

      {/* ── BOTTOM STADIUM FOOTER STRIP (COMPACT) ─────────────────────── */}
      <footer className="relative z-20 w-full px-3.5 sm:px-6 md:px-8 py-1.5 sm:py-2 bg-[#FAF6EE]/90 border-t-2 border-[#1E1B4B]/10 flex items-center justify-between text-[8.5px] xs:text-[9px] font-mono text-[#1E1B4B]/60 flex-shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="font-bold text-[#1E1B4B]">
            THEME: BUILD FOR UDUPI
          </span>
          <span className="text-[#1E1B4B]/40">•</span>
          <span className="truncate">
            SMVITM BANTAKAL
          </span>
        </div>
        <div className="flex items-center gap-1 ml-auto flex-shrink-0">
          <Code2 className="w-3 h-3 text-indigo-600" />
          <span className="font-bold">SEASON 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default LoadingScreen;
