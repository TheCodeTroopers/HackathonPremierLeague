import React from 'react';
import { PageRoute } from '../../types';
import { SparkleDoodle, ShootingStarDoodle, PaperPlaneDoodle } from '../illustrations/MicroDoodles';
import { 
  Users, 
  HelpCircle, 
  Calendar, 
  Sparkles, 
  Award, 
  MessageSquare, 
  Code2, 
  Video, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface MentorsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const MentorsPage: React.FC<MentorsPageProps> = ({ onNavigate }) => {
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
      
      {/* Whimsical Background Doodles */}
      <div className="hidden sm:block absolute top-10 left-8 select-none pointer-events-none opacity-70">
        <PaperPlaneDoodle className="w-10 h-10 text-[#1E1B4B]/60 -rotate-12" />
      </div>
      <div className="hidden sm:block absolute top-14 right-10 select-none pointer-events-none opacity-70">
        <ShootingStarDoodle className="w-10 h-10 text-[#F59E0B]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border-2 border-purple-200/80 text-xs font-mono font-black text-[#7C3AED] uppercase tracking-wider shadow-2xs">
            <SparkleDoodle className="w-4 h-4 text-[#F59E0B]" />
            <span>TECHNICAL ADVISORS & GRAND JURY</span>
            <SparkleDoodle className="w-4 h-4 text-[#F59E0B]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display uppercase tracking-tight text-[#1E1B4B] leading-none">
            MENTORS & JUDGES{' '}
            <span className="font-marker text-[#EA580C] not-italic block sm:inline">
              REVEALING SOON
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#1E1B4B]/80 font-medium leading-relaxed max-w-2xl mx-auto font-sans">
            We are curating an exceptional panel of senior system architects, startup founders, and engineering leaders from tier-1 tech firms. 
            The full lineup will be unveiled on <span className="font-bold text-[#4F46E5]">September 8, 2026</span> alongside the squad shortlist!
          </p>
        </div>

        {/* Big Date Callout Banner */}
        <div className="reveal-on-scroll stagger-1 bg-white border-2 border-[#1E1B4B]/15 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-[#1E1B4B] flex items-center justify-center flex-shrink-0 shadow-sketch-sm">
              <Calendar className="w-7 h-7 text-[#EA580C]" />
            </div>
            <div>
              <div className="font-mono text-xs font-black text-[#EA580C] uppercase tracking-wider">
                OFFICIAL REVEAL DATE
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] uppercase">
                September 8, 2026 • Inauguration Day
              </h3>
              <p className="text-xs text-[#1E1B4B]/70 font-medium">
                Profiles, professional track records, and mentorship schedules will unlock concurrently with the Season Inauguration.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('timeline')}
            className="px-6 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>VIEW SCHEDULE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mystery Silhouette Teaser Grid */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-[#1E1B4B]">
              PANEL SNEAK PEEK
            </h3>
            <p className="text-xs sm:text-sm text-[#1E1B4B]/70 font-medium">
              Industry practitioners representing specialized domains
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white/90 border-2 border-[#1E1B4B]/15 rounded-2xl p-6 text-center shadow-sm hover:shadow-sketch-sm transition-all space-y-4 relative group">
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-purple-100 text-purple-900 font-mono text-[9px] font-bold uppercase rounded-md">
                MENTOR
              </div>
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-[#1E1B4B]/30 flex items-center justify-center mx-auto text-slate-400 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-10 h-10 text-indigo-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-base text-[#1E1B4B] uppercase">
                  Staff AI Architect
                </h4>
                <p className="text-xs text-[#1E1B4B]/70 font-mono">
                  Global Cloud Ecosystem
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-1 pt-1">
                <span className="text-[10px] font-mono bg-[#FBF9F2] px-2 py-0.5 rounded border border-[#1E1B4B]/10 font-bold">
                  LLMs & Agentic AI
                </span>
                <span className="text-[10px] font-mono bg-[#FBF9F2] px-2 py-0.5 rounded border border-[#1E1B4B]/10 font-bold">
                  Scalable Inference
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/90 border-2 border-[#1E1B4B]/15 rounded-2xl p-6 text-center shadow-sm hover:shadow-sketch-sm transition-all space-y-4 relative group">
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-blue-100 text-blue-900 font-mono text-[9px] font-bold uppercase rounded-md">
                MENTOR
              </div>
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-[#1E1B4B]/30 flex items-center justify-center mx-auto text-slate-400 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-10 h-10 text-blue-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-base text-[#1E1B4B] uppercase">
                  VP of Engineering
                </h4>
                <p className="text-xs text-[#1E1B4B]/70 font-mono">
                  FinTech Scaleup
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-1 pt-1">
                <span className="text-[10px] font-mono bg-[#FBF9F2] px-2 py-0.5 rounded border border-[#1E1B4B]/10 font-bold">
                  Distributed Systems
                </span>
                <span className="text-[10px] font-mono bg-[#FBF9F2] px-2 py-0.5 rounded border border-[#1E1B4B]/10 font-bold">
                  High Throughput
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/90 border-2 border-[#1E1B4B]/15 rounded-2xl p-6 text-center shadow-sm hover:shadow-sketch-sm transition-all space-y-4 relative group">
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-orange-100 text-orange-900 font-mono text-[9px] font-bold uppercase rounded-md">
                GRAND JURY
              </div>
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-[#1E1B4B]/30 flex items-center justify-center mx-auto text-slate-400 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-10 h-10 text-amber-500 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-base text-[#1E1B4B] uppercase">
                  Founder & CTO
                </h4>
                <p className="text-xs text-[#1E1B4B]/70 font-mono">
                  Series-A Tech Studio
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-1 pt-1">
                <span className="text-[10px] font-mono bg-[#FBF9F2] px-2 py-0.5 rounded border border-[#1E1B4B]/10 font-bold">
                  Product Architecture
                </span>
                <span className="text-[10px] font-mono bg-[#FBF9F2] px-2 py-0.5 rounded border border-[#1E1B4B]/10 font-bold">
                  Venture Building
                </span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white/90 border-2 border-[#1E1B4B]/15 rounded-2xl p-6 text-center shadow-sm hover:shadow-sketch-sm transition-all space-y-4 relative group">
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-100 text-emerald-900 font-mono text-[9px] font-bold uppercase rounded-md">
                GRAND JURY
              </div>
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-[#1E1B4B]/30 flex items-center justify-center mx-auto text-slate-400 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-10 h-10 text-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-base text-[#1E1B4B] uppercase">
                  Principal Security Lead
                </h4>
                <p className="text-xs text-[#1E1B4B]/70 font-mono">
                  Cybersecurity Enterprise
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-1 pt-1">
                <span className="text-[10px] font-mono bg-[#FBF9F2] px-2 py-0.5 rounded border border-[#1E1B4B]/10 font-bold">
                  Zero Trust
                </span>
                <span className="text-[10px] font-mono bg-[#FBF9F2] px-2 py-0.5 rounded border border-[#1E1B4B]/10 font-bold">
                  Cloud Infrastructure
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* What to Expect from the Panel */}
        <div className="bg-white border-2 border-[#1E1B4B]/15 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="font-display font-black text-2xl uppercase tracking-tight text-[#1E1B4B]">
              WHAT OUR PANEL BRINGS TO THE LEAGUE
            </h3>
            <p className="text-xs sm:text-sm text-[#1E1B4B]/70 font-medium">
              Real engineering critique, direct mentorship, and live evaluation rigor
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="space-y-3 p-5 rounded-2xl bg-[#FAF8F2] border border-[#1E1B4B]/10">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center shadow-2xs">
                <Video className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm uppercase tracking-wide text-[#1E1B4B]">
                24-Hour Review Window
              </h4>
              <p className="text-xs text-[#1E1B4B]/75 leading-relaxed font-medium">
                The panel evaluates your submitted sprint demonstration video with 24 hours of prep before each live round.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#FAF8F2] border border-[#1E1B4B]/10">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center shadow-2xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm uppercase tracking-wide text-[#1E1B4B]">
                Live Team Q&A Grilling
              </h4>
              <p className="text-xs text-[#1E1B4B]/75 leading-relaxed font-medium">
                Each evaluation round includes interactive Q&A where squads defend tech choices, edge cases, and code quality.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-[#FAF8F2] border border-[#1E1B4B]/10">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center shadow-2xs">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-display font-black text-sm uppercase tracking-wide text-[#1E1B4B]">
                On-Stage Grand Jury
              </h4>
              <p className="text-xs text-[#1E1B4B]/75 leading-relaxed font-medium">
                Top 4 squads present directly before the senior jury at the SMVITM Auditorium for the grand championship trophy.
              </p>
            </div>

          </div>
        </div>

        {/* Interested in Joining the Panel? Callout */}
        <div className="bg-[#321668] text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <div className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest">
              CALL FOR MENTORS & JUDGES
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              Interested in Mentoring or Judging?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-medium max-w-xl">
              Are you an experienced software architect, founder, or engineering leader interested in evaluating top collegiate squads? Connect with our team.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:contact@codetroopers.in"
              className="px-6 py-3 bg-[#F59E0B] hover:bg-[#FBBF24] text-[#1E1B4B] font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
