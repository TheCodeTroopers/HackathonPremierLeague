import React from 'react';
import { PageRoute } from '../../types';
import { SparkleDoodle, ShootingStarDoodle, CrownDoodle, PaperPlaneDoodle } from '../illustrations/MicroDoodles';
import { Trophy, Lock, Calendar, ArrowRight, ShieldCheck, Flame, BarChart3, Users, Clock } from 'lucide-react';

interface LeaderboardPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectSquad?: (squadId: string) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onNavigate }) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    const targets = document.querySelectorAll('.reveal-on-scroll');
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F2] text-[#1E1B4B] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-[#FBBF24] selection:text-[#1E1B4B]">
      
      {/* Decorative Doodles */}
      <div className="hidden sm:block absolute top-8 left-8 select-none pointer-events-none opacity-70">
        <PaperPlaneDoodle className="w-10 h-10 text-[#1E1B4B]/60 -rotate-45" />
      </div>
      <div className="hidden sm:block absolute top-12 right-12 select-none pointer-events-none opacity-70">
        <ShootingStarDoodle className="w-11 h-11 text-[#F59E0B]" />
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border-2 border-indigo-200/80 text-xs font-mono font-black text-[#4F46E5] uppercase tracking-wider shadow-2xs">
            <SparkleDoodle className="w-4 h-4 text-[#F59E0B]" />
            <span>OFFICIAL LEAGUE STANDINGS</span>
            <SparkleDoodle className="w-4 h-4 text-[#F59E0B]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display uppercase tracking-tight text-[#1E1B4B] leading-none">
            LEADERBOARD{' '}
            <span className="font-marker text-[#4F46E5] not-italic block sm:inline">
              COMING SOON
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#1E1B4B]/80 font-medium leading-relaxed max-w-2xl mx-auto font-sans">
            The arena is being prepared! Live standings, squad points, and playoff race rankings will unlock immediately following the 
            <span className="font-bold text-[#EA580C]"> Part 1 Evaluation on September 12 at 5:30 PM</span>.
          </p>
        </div>

        {/* Central Teaser Canvas Card with Locked Podium */}
        <div 
          className="reveal-on-scroll stagger-1 rounded-3xl border-2 border-[#1E1B4B]/15 p-6 sm:p-10 text-center relative overflow-hidden shadow-sm hover:shadow-sketch-sm transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(250,246,238,0.9) 100%)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Background Ambient Glow */}
          <div 
            className="absolute inset-0 pointer-events-none -z-10 rounded-3xl blur-3xl opacity-50"
            style={{
              background: 'radial-gradient(circle at 50% 40%, rgba(79,70,229,0.12) 0%, rgba(245,158,11,0.08) 50%, transparent 80%)'
            }}
          />

          {/* Locked Podium Graphic */}
          <div className="max-w-xl mx-auto pt-4 pb-8">
            <div className="relative inline-block mb-6">
              {/* Crown above trophy */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                <CrownDoodle className="w-10 h-8 text-[#F59E0B]" />
              </div>
              
              {/* Trophy with Lock Badge */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-amber-50 border-3 border-[#1E1B4B] flex items-center justify-center mx-auto shadow-sketch-sm relative">
                <Trophy className="w-12 h-12 sm:w-14 sm:h-14 text-[#F59E0B]" />
                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center border-2 border-white shadow-sm">
                  <Lock className="w-4 h-4 text-amber-300" />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/80 border border-amber-300 rounded-full text-xs font-mono font-bold text-amber-900 mb-3">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>LOCK ACTIVE UNTIL MATCH DAY 1</span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#1E1B4B] mb-2">
              Who Will Claim the Cup?
            </h3>
            <p className="text-xs sm:text-sm text-[#1E1B4B]/75 font-medium max-w-md mx-auto leading-relaxed">
              Every sprint fixture, code demo, and jury feedback round awards league points. Track your squad’s climb towards the SMVITM Auditorium Grand Finale.
            </p>
          </div>

          {/* 3 Locked Podium Pillars */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-lg mx-auto items-end pt-4">
            
            {/* Rank 2 Podium */}
            <div className="bg-white/80 border-2 border-[#1E1B4B]/15 rounded-2xl p-2.5 sm:p-4 text-center h-36 sm:h-40 flex flex-col justify-between shadow-2xs">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200 text-slate-800 font-display font-black text-xs mx-auto flex items-center justify-center border border-[#1E1B4B]/20">
                #2
              </div>
              <div className="space-y-1">
                <div className="h-2.5 sm:h-3 w-12 sm:w-16 bg-slate-200 rounded mx-auto animate-pulse" />
                <div className="h-2 sm:h-2.5 w-8 sm:w-12 bg-slate-100 rounded mx-auto" />
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] font-black text-slate-500 uppercase">
                SILVER
              </div>
            </div>

            {/* Rank 1 Podium (Tallest) */}
            <div className="bg-amber-50/90 border-2 border-[#F59E0B] rounded-2xl p-2.5 sm:p-4 text-center h-48 sm:h-52 flex flex-col justify-between shadow-sm relative -translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#F59E0B] text-[#1E1B4B] font-mono text-[8.5px] sm:text-[9px] font-black uppercase rounded-full shadow-2xs whitespace-nowrap">
                CHAMPION
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FBBF24] text-[#1E1B4B] font-display font-black text-xs sm:text-sm mx-auto flex items-center justify-center border-2 border-[#1E1B4B] shadow-2xs">
                #1
              </div>
              <div className="space-y-1 sm:space-y-1.5">
                <div className="h-3 sm:h-3.5 w-14 sm:w-20 bg-amber-200 rounded mx-auto animate-pulse" />
                <div className="h-2 sm:h-2.5 w-10 sm:w-14 bg-amber-100 rounded mx-auto" />
              </div>
              <div className="font-mono text-[10px] sm:text-xs font-black text-[#D97706] uppercase whitespace-nowrap">
                TROPHY + ₹30K
              </div>
            </div>

            {/* Rank 3 Podium */}
            <div className="bg-white/80 border-2 border-[#1E1B4B]/15 rounded-2xl p-2.5 sm:p-4 text-center h-32 sm:h-36 flex flex-col justify-between shadow-2xs">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-200 text-orange-900 font-display font-black text-xs mx-auto flex items-center justify-center border border-[#1E1B4B]/20">
                #3
              </div>
              <div className="space-y-1">
                <div className="h-2.5 sm:h-3 w-12 sm:w-16 bg-orange-100 rounded mx-auto animate-pulse" />
                <div className="h-2 sm:h-2.5 w-8 sm:w-12 bg-orange-50 rounded mx-auto" />
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] font-black text-orange-600 uppercase">
                BRONZE
              </div>
            </div>

          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border-2 border-[#1E1B4B]/15 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#4F46E5] flex items-center justify-center shadow-2xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="font-display font-black text-sm uppercase tracking-wide text-[#1E1B4B]">
              Real-Time Tallies
            </h4>
            <p className="text-xs text-[#1E1B4B]/75 leading-relaxed font-medium">
              Dynamic rankings recalculate instantly after every evaluation round and mentor scoring review.
            </p>
          </div>

          <div className="bg-white border-2 border-[#1E1B4B]/15 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-2xs">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-display font-black text-sm uppercase tracking-wide text-[#1E1B4B]">
              Squad Profiles
            </h4>
            <p className="text-xs text-[#1E1B4B]/75 leading-relaxed font-medium">
              Deep dive into every team's project repository, tech stack, and sprint progression history.
            </p>
          </div>

          <div className="bg-white border-2 border-[#1E1B4B]/15 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center shadow-2xs">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-display font-black text-sm uppercase tracking-wide text-[#1E1B4B]">
              Playoff Race (Top 4)
            </h4>
            <p className="text-xs text-[#1E1B4B]/75 leading-relaxed font-medium">
              Only the Top 4 qualified squads on this board secure a slot for the physical stage battle at SMVITM.
            </p>
          </div>

          <div className="bg-white border-2 border-[#1E1B4B]/15 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-display font-black text-sm uppercase tracking-wide text-[#1E1B4B]">
              Transparent Metrics
            </h4>
            <p className="text-xs text-[#1E1B4B]/75 leading-relaxed font-medium">
              Evaluated on architectural depth, demo video execution, innovation, and live jury Q&A performance.
            </p>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="bg-[#1E1B4B] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <div className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest">
              STAY TUNED • SEASON 2026
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              Explore the Season Schedule
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-medium max-w-lg">
              Check out all evaluation milestones, sprint windows, and inauguration dates on the Season Timeline.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('timeline')}
              className="w-full sm:w-auto px-6 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>VIEW TIMELINE</span>
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="w-full sm:w-auto px-6 py-3 bg-[#F59E0B] hover:bg-[#FBBF24] text-[#1E1B4B] font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>REGISTER SQUAD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
