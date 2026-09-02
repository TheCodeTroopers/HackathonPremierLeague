import React, { useState, useEffect } from 'react';
import { Lightbulb, Users, Swords, MessageSquare, TrendingUp, Trophy, Award, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface PillarStep {
  number: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  accentBg: string;
  description: string;
  points: string[];
}

export const PILLARS_DATA: PillarStep[] = [
  {
    number: '01',
    title: 'THE IDEA',
    subtitle: 'Why a Premier League?',
    icon: Lightbulb,
    color: '#D97706',
    accentBg: '#FEF3C7',
    description: 'Traditional 24-hour hackathons reward hasty hacks and sleep deprivation. HPL turns software innovation into a premier multi-week league where solutions evolve through real engineering sprints, testing, and feedback loops.',
    points: [
      '3 progressive match weeks instead of a rushed overnight crunch',
      'Head-to-head match fixtures designed for genuine problem-solving',
      'Deep alignment with Udupi\'s coastal, cultural, and municipal challenges'
    ]
  },
  {
    number: '02',
    title: 'THE SQUADS',
    subtitle: 'Cross-Disciplinary Powerhouses',
    icon: Users,
    color: '#2563EB',
    accentBg: '#DBEAFE',
    description: 'Squads assemble with exactly 5 specialized builders. Just like premier sports franchises, successful squads balance backend architects, frontend craftsmen, AI/ML researchers, product designers, and presenters.',
    points: [
      'Exactly 5-member squads across technology disciplines',
      'Official squad badges, numbers, and team repos',
      'Assigned mentor advisors for each challenge track'
    ]
  },
  {
    number: '03',
    title: 'THE MATCHES',
    subtitle: 'Head-to-Head Showdowns',
    icon: Swords,
    color: '#E11D48',
    accentBg: '#FFE4E6',
    description: 'Every week features official Match Days. Squads face off against peer teams in their track, presenting working software demos, architecture diagrams, and test telemetry to an evaluation panel.',
    points: [
      'Win: +3 Points | Tie: +1 Point | Loss: 0 Points',
      'Live demo battles judged on code quality & user experience',
      'Real-time points allocation directly to the public leaderboard'
    ]
  },
  {
    number: '04',
    title: 'THE FEEDBACK',
    subtitle: 'Iterate & Engineer',
    icon: MessageSquare,
    color: '#059669',
    accentBg: '#D1FAE5',
    description: 'After every match day, squads receive detailed technical critiques from industry architects. Week 2 introduces a surprise requirement or load constraint to test how resiliently squads adapt.',
    points: [
      '1-on-1 mentor office hours and code reviews',
      'Feature twists that test modularity and clean abstractions',
      'Continuous improvement rewarded over static prototypes'
    ]
  },
  {
    number: '05',
    title: 'THE RANKINGS',
    subtitle: 'Climb the Table',
    icon: TrendingUp,
    color: '#7C3AED',
    accentBg: '#EDE9FE',
    description: 'The live leaderboard updates dynamically after every evaluation round. Squads watch their rank rise or fall based on cumulative match points, code benchmarks, and innovation scores.',
    points: [
      'Dynamic table tracking Wins, Ties, Losses, and Total Points',
      'Movement indicators (↑ Rising, → Stable, ↓ Falling)',
      'Top 4 squads from each domain (12 teams) qualify for the Grand Finale'
    ]
  },
  {
    number: '06',
    title: 'THE PLAYOFFS',
    subtitle: 'Knockout Arena',
    icon: Trophy,
    color: '#EA580C',
    accentBg: '#FFEDD5',
    description: 'The top 4 ranked squads from each of the 3 domains (12 finalist teams total) enter the championship stadium for the high-stakes final showdown at the SMVITM Bantakal Auditorium.',
    points: [
      'Physical arena sprint at SMVITM Bantakal Auditorium',
      'Live code stress tests and jury cross-examinations',
      'Bronze 3rd-place match and Championship Grand Finale'
    ]
  },
  {
    number: '07',
    title: 'THE CHAMPION',
    subtitle: 'Trophy & Legacy',
    icon: Award,
    color: '#D97706',
    accentBg: '#FEF08A',
    description: 'The Grand Champion lifts the golden HPL Trophy, claims the ₹30,000+ cash prize pool, secures incubation support with industry partners, and enters the HPL Hall of Fame.',
    points: [
      'Official Golden HPL Champion Trophy & Medals',
      '₹30K prize pool and cloud infrastructure credits',
      'Direct angel incubation and tech internship fast-tracks'
    ]
  }
];

export const ComicPillarsBook: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto advance every 7 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PILLARS_DATA.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = PILLARS_DATA[activeIdx];
  const Icon = current.icon;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? PILLARS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % PILLARS_DATA.length);
  };

  return (
    <div 
      className="w-full space-y-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 
        =======================================================================
        1. COMIC ISSUE SELECTOR TABS (Horizontal Quick-Jump)
        =======================================================================
      */}
      <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
        {PILLARS_DATA.map((p, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={p.number}
              onClick={() => setActiveIdx(idx)}
              className={`px-3.5 py-1.5 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'bg-[#1E1B4B] text-amber-300 border-2 border-[#1E1B4B] shadow-sketch -translate-y-0.5 scale-105'
                  : 'bg-[#FFFDF7] text-[#1E1B4B]/80 hover:text-[#1E1B4B] border-2 border-[#1E1B4B]/20 hover:border-[#1E1B4B] hover:-translate-y-0.5'
              }`}
            >
              <span className="font-mono text-[10px] opacity-70">#{p.number}</span>
              <span>{p.title.replace('THE ', '')}</span>
              {isActive && <span className="text-amber-400">✦</span>}
            </button>
          );
        })}
      </div>

      {/* 
        =======================================================================
        2. COMIC BOOK OPEN SPREAD / STACKED CARDS CONTAINER
        Zero vertical scroll required! 
        =======================================================================
      */}
      <div className="relative max-w-4xl mx-auto">
        
        {/* Layer 3: Farthest Stacked Page (depth effect) */}
        <div className="absolute inset-0 bg-[#EFE8D6] rounded-3xl border-2 border-[#1E1B4B]/30 transform rotate-1 translate-y-3 translate-x-2 -z-20 shadow-sm" />
        
        {/* Layer 2: Middle Stacked Page */}
        <div className="absolute inset-0 bg-[#F5EEDC] rounded-3xl border-2 border-[#1E1B4B]/50 transform -rotate-1 translate-y-1.5 -translate-x-1.5 -z-10 shadow-md" />

        {/* Layer 1: The Active Main Comic Card */}
        <div className="relative bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sketch-lg overflow-hidden">
          
          {/* Top Comic Bar */}
          <div className="flex items-center justify-between border-b-2 border-[#1E1B4B]/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#1E1B4B] text-white font-mono text-[10.5px] font-black uppercase tracking-wider">
                STAGE {current.number} OF 07
              </span>
              <span className="hidden sm:inline font-mono text-xs font-bold text-[#1E1B4B]/60 uppercase">
                ✦ HPL TOURNAMENT LIFECYCLE
              </span>
            </div>

            {/* Prev / Next Comic Page Flip Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous stage"
                className="w-9 h-9 rounded-xl bg-[#FFFDF7] border-2 border-[#1E1B4B] flex items-center justify-center text-[#1E1B4B] hover:bg-[#F3EDD6] active:translate-y-0.5 shadow-sketch-sm transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next stage"
                className="w-9 h-9 rounded-xl bg-[#1E1B4B] text-white border-2 border-[#1E1B4B] flex items-center justify-center hover:bg-[#2A2663] active:translate-y-0.5 shadow-sketch-sm transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage Content Grid with Smooth Flip Animation */}
          <div key={activeIdx} className="animate-comic-card-flip grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Number, Title, Subtitle, Description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-[#1E1B4B] shadow-sketch flex-shrink-0"
                  style={{ backgroundColor: current.accentBg }}
                >
                  <Icon className="w-8 h-8" style={{ color: current.color }} />
                </div>
                <div>
                  <div className="font-mono text-xs font-black uppercase tracking-wider" style={{ color: current.color }}>
                    {current.subtitle}
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#1E1B4B]">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#1E1B4B]/80 font-medium leading-relaxed pt-1">
                {current.description}
              </p>
            </div>

            {/* Right Column: 3 Key Takeaways & Highlights */}
            <div className="lg:col-span-6 space-y-3 bg-[#FAF6EE] border-2 border-[#1E1B4B]/20 rounded-2xl p-5 shadow-inner">
              <div className="font-mono text-[11px] font-black text-[#1E1B4B] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>KEY LEAGUE MECHANICS</span>
              </div>
              <div className="space-y-2.5">
                {current.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-[#1E1B4B] leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Stage Progress Indicator Bar */}
          <div className="mt-6 pt-4 border-t border-[#1E1B4B]/10 flex items-center justify-between text-xs font-mono text-[#1E1B4B]/70">
            <div className="flex items-center gap-1.5">
              {PILLARS_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIdx ? 'w-8 bg-amber-500' : 'w-2 bg-[#1E1B4B]/25 hover:bg-[#1E1B4B]/50'
                  }`}
                  aria-label={`Jump to stage ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold">
              CLICK OR FLIP TO BROWSE STAGES ➔
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
