import React, { useRef, useEffect, useState } from 'react';
import { PageRoute } from '../../types';
import { HPL_IMAGES } from '../../assets/images';
import { 
  SparkleDoodle, 
  PaperPlaneDoodle, 
  CloudDoodle, 
  CrownDoodle, 
  ShootingStarDoodle, 
  LightbulbDoodle 
} from '../illustrations/MicroDoodles';
import { 
  Calendar, 
  Trophy, 
  Clock, 
  Code2, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Award, 
  Sparkles, 
  Swords, 
  ChevronRight, 
  ChevronLeft, 
  Video, 
  HelpCircle, 
  Timer, 
  PartyPopper, 
  ArrowRight, 
  Instagram, 
  Linkedin, 
  Github, 
  Youtube, 
  Terminal, 
  FileCheck 
} from 'lucide-react';

interface TimelinePageProps {
  onNavigate: (page: PageRoute) => void;
}

/**
 * Stage Banner — matches the reference canva-style colored pill header
 */
const StageBanner: React.FC<{
  title: string;
  part: string;
  date: string;
  color: 'green' | 'blue' | 'orange' | 'purple';
}> = ({ title, part, date, color }) => {
  const styles = {
    green:  { bg: '#059669', shadow: 'rgba(5,150,105,0.35)' },
    blue:   { bg: '#2563EB', shadow: 'rgba(37,99,235,0.35)' },
    orange: { bg: '#EA580C', shadow: 'rgba(234,88,12,0.35)' },
    purple: { bg: '#7C3AED', shadow: 'rgba(124,58,237,0.35)' },
  };
  const s = styles[color];

  return (
    <div
      className="w-full py-3 px-5 rounded-2xl text-center mb-5 select-none transform hover:scale-[1.02] transition-transform"
      style={{
        background: s.bg,
        boxShadow: `0 6px 20px ${s.shadow}`,
      }}
    >
      <div className="font-display font-black text-2xl sm:text-3xl tracking-wider text-white leading-none drop-shadow-sm uppercase">
        {title}
      </div>
      <div className="font-display font-black text-[10.5px] sm:text-xs tracking-widest text-white/95 uppercase mt-1">
        {part}
      </div>
      <div className="font-mono text-[10px] font-bold text-white/90 tracking-tight mt-0.5">
        {date}
      </div>
    </div>
  );
};

export const TimelinePage: React.FC<TimelinePageProps> = ({ onNavigate }) => {
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  // Trigger home-page style comic pop entrance on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // ── 1. Top Reading Scroll Progress Bar ────────────────────────────────────
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── 2. Rock-Solid Smooth Scroll Reveal (Zero Jitter, Zero Glitch) ────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Unobserve once revealed so it NEVER toggles or flickers!
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    const targets = document.querySelectorAll('.reveal-on-scroll');
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (timelineScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      timelineScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F2] text-[#1E1B4B] overflow-x-hidden selection:bg-[#FBBF24] selection:text-[#1E1B4B]">

      {/* ── Scroll progress bar ─────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[9998] bg-transparent pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full rounded-full transition-[width] duration-75 ease-linear"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, #4F46E5 0%, #EA580C 60%, #F59E0B 100%)',
          }}
        />
      </div>
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (With Exact HomePage Comic Spring Entrance Animations)    */}
      {/* ========================================================================= */}
      <section className="relative pt-4 pb-2 sm:pt-6 sm:pb-4 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* Left Column: Display Lettering */}
          <div className="lg:col-span-5 space-y-3 z-10 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-[11px] font-mono font-bold text-[#4F46E5] uppercase tracking-wider shadow-2xs ${hasEntered ? 'hero-anim-pill' : 'hero-pre-enter'}`}>
              <SparkleDoodle className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>OFFICIAL SEASON SCHEDULE</span>
            </div>

            {/* Main Title: Space Grotesk + Marker Accent with Word Pop Keyframes */}
            <div className="space-y-0.5">
              <span className={`font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] tracking-tight leading-[0.95] text-[#1E1B4B] uppercase block ${hasEntered ? 'hero-anim-word-1' : 'hero-pre-enter'}`}>
                SEASON
              </span>
              <span className={`font-marker text-[#4F46E5] text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] tracking-tight leading-[0.95] uppercase not-italic block transform -rotate-1 hover:rotate-0 transition-transform ${hasEntered ? 'hero-anim-word-2' : 'hero-pre-enter'}`}>
                TIMELINE
              </span>
            </div>

            {/* Subtitle */}
            <p className={`text-base sm:text-xl lg:text-2xl font-black font-display text-[#1E1B4B]/90 tracking-tight ${hasEntered ? 'hero-anim-sub' : 'hero-pre-enter'}`}>
              3 Weeks. 3 Parts. Countless Innovations.
            </p>

            {/* Tagline with Flying Shooting Star */}
            <div className={`flex items-center justify-center lg:justify-start gap-2 text-base sm:text-xl font-bold font-display text-[#1E1B4B]/80 pt-0.5 ${hasEntered ? 'hero-anim-dates' : 'hero-pre-enter'}`}>
              <span>One</span>
              <span className="text-[#EA580C] font-black tracking-wide">Champion.</span>
              <ShootingStarDoodle className="w-6 h-6 sm:w-8 sm:h-8 text-[#F59E0B] inline-block -mt-1 ml-0.5 animate-comic-wiggle" />
            </div>

          </div>

          {/* Right Column: Hero Artwork Responsive Wrapper */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end select-none">
            
            {/* Top Center Sky: Cloud Doodle */}
            <div className="hidden md:block absolute -top-3 left-[26%] pointer-events-none z-0">
              <CloudDoodle className="w-20 h-12 text-[#64748B]/45 animate-float" />
            </div>

            {/* Top Right: Paper Plane */}
            <div className="hidden sm:block absolute -top-4 right-2 lg:right-6 pointer-events-none z-20">
              <PaperPlaneDoodle className="w-9 h-9 sm:w-11 sm:h-11 text-[#1E1B4B]/75 -rotate-12 transform hover:translate-x-1 transition-transform" />
            </div>

            {/* Soft Ambient Cloud Glow */}
            <div 
              className="absolute inset-0 pointer-events-none -z-10 rounded-full blur-3xl opacity-75"
              style={{ background: 'radial-gradient(circle at 60% 50%, rgba(246,240,226,0.95) 0%, rgba(251,249,242,0.5) 65%, transparent 88%)' }}
            />

            {/* Illustration Container with Subtle Natural Perimeter Feather (Zero Foggy Haze) */}
            <div className="relative w-full max-w-[360px] sm:max-w-[520px] lg:max-w-none lg:w-[114%] xl:w-[120%] h-auto mx-auto lg:ml-auto -mt-2 lg:-mt-6">
              
              <img
                src={HPL_IMAGES.timelineHeader}
                alt="HPL Season Timeline"
                className={`w-full h-auto max-h-[320px] sm:max-h-[440px] lg:max-h-[560px] object-contain select-none block brightness-[1.02] contrast-[1.03] saturate-[1.02] will-change-transform ${hasEntered ? 'hero-anim-illustration' : 'hero-pre-enter'}`}
                style={{
                  maskImage: 'radial-gradient(ellipse 94% 88% at 50% 50%, black 78%, rgba(0,0,0,0.8) 90%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 94% 88% at 50% 50%, black 78%, rgba(0,0,0,0.8) 90%, transparent 100%)',
                }}
                loading="eager"
              />

              {/* Ultra-subtle bottom edge hairline ease (only 16px, preserves trophy pedestal & pencil cup completely) */}
              <div 
                className="absolute inset-x-0 bottom-0 h-4 sm:h-5 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, #FBF9F2 20%, transparent 100%)'
                }}
              />

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE HORIZONTAL CONNECTED TIMELINE CANVAS                              */}
      {/* ========================================================================= */}
      <section className="py-6 px-4 sm:px-6 lg:px-10 max-w-[1520px] mx-auto">
        
        {/* Navigation Control Header */}
        <div className="reveal-on-scroll stagger-1 flex items-center justify-between pb-3 select-none">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-[#4F46E5] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60 shadow-2xs">
              ✦ HORIZONTAL TIMELINE
            </span>
            <span className="text-xs text-[#1E1B4B]/70 font-medium hidden sm:inline font-sans">
              Scroll horizontally or use arrow buttons to explore all 4 phases
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => scrollTimeline('left')} 
              aria-label="Scroll left"
              className="w-8 h-8 rounded-full bg-white border-2 border-[#1E1B4B]/20 text-[#1E1B4B] flex items-center justify-center hover:bg-[#4F46E5] hover:border-[#4F46E5] hover:text-white shadow-2xs transition-all cursor-pointer active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollTimeline('right')} 
              aria-label="Scroll right"
              className="w-8 h-8 rounded-full bg-white border-2 border-[#1E1B4B]/20 text-[#1E1B4B] flex items-center justify-center hover:bg-[#4F46E5] hover:border-[#4F46E5] hover:text-white shadow-2xs transition-all cursor-pointer active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Touch Hint */}
        <div className="sm:hidden text-center pb-2 text-[10.5px] font-mono text-[#4F46E5] font-black tracking-wider flex items-center justify-center gap-1.5 animate-pulse select-none">
          <span>←</span>
          <span>SWIPE HORIZONTALLY TO VIEW ALL 4 STAGES</span>
          <span>→</span>
        </div>

        {/* Canvas Timeline Wrapper */}
        <div
          className="relative rounded-3xl overflow-hidden py-6 px-3 sm:px-5"
          style={{
            background: 'linear-gradient(135deg, #FAF6EE 0%, #F7F2E8 50%, #FAF6EE 100%)',
            boxShadow: 'inset 0 0 40px rgba(120,90,40,0.03)',
          }}
        >
          {/* Subtle Paper Grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Outer Horizontal Scroll Track */}
          <div 
            ref={timelineScrollRef}
            className="overflow-x-auto pb-4 pt-1 relative z-10 scrollbar-none touch-pan-x"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="min-w-[1040px] xl:min-w-full">
              
              {/* Rail Line + Nodes */}
              <div className="relative mb-5">
                <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-[2.5px] bg-[#1E1B4B]/25 -translate-y-1/2 rounded-full" />
                <div className="flex flex-row items-center w-full">
                  {[
                    { color: '#059669', icon: <Calendar className="w-5 h-5" /> },
                    { color: '#2563EB', icon: <Clock className="w-5 h-5" /> },
                    { color: '#EA580C', icon: <Swords className="w-5 h-5" /> },
                    { color: '#7C3AED', icon: <Trophy className="w-5 h-5 text-[#FBBF24]" /> },
                  ].map((node, i) => (
                    <div key={i} className="flex-1 flex justify-center">
                      <div
                        className="w-12 h-12 rounded-full text-white flex items-center justify-center border-[3px] border-white z-10 shadow-md transform hover:scale-110 transition-transform"
                        style={{ background: node.color }}
                      >
                        {node.icon}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage cards row */}
              <div className="flex flex-row items-stretch w-full gap-4">
                
                {/* --------------------------------------------------------- */}
                {/* STAGE 1: REGISTRATION & LAUNCH                            */}
                {/* --------------------------------------------------------- */}
                <div 
                  className="flex-1 min-w-[245px] lg:min-w-[255px] px-4 sm:px-5 py-4 flex flex-col rounded-2xl transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.65)',
                    boxShadow: '0 4px 18px rgba(30,27,75,0.08), 0 1px 4px rgba(30,27,75,0.05)',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  <StageBanner title="STAGE 1" part="REGISTRATION & LAUNCH" date="2 – 8 SEPTEMBER 2026" color="green" />

                  <div className="space-y-4 flex-grow">
                    
                    {/* Sep 2 */}
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0">
                        <FileCheck className="w-4 h-4 text-[#059669]" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-black text-[#1E1B4B] uppercase tracking-wide">SEP 2</span>
                          <span className="bg-[#059669] text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">PORTAL OPEN</span>
                        </div>
                        <p className="text-xs text-[#1E1B4B] font-bold leading-snug font-display">Registration Open with Problem Statement (PS)</p>
                        <p className="text-[11px] text-[#1E1B4B]/70 font-medium leading-tight font-sans">Registration must be done along with the solution. Deliverable is video for the PS.</p>
                      </div>
                    </div>

                    {/* Sep 6 */}
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0">
                        <Clock className="w-4 h-4 text-[#D97706]" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-black text-[#1E1B4B] uppercase tracking-wide">SEP 6</span>
                          <span className="bg-[#D97706] text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">DEADLINE</span>
                        </div>
                        <p className="text-xs text-[#1E1B4B] font-bold leading-snug font-display">Registration Close (11:59 PM)</p>
                        <p className="text-[11px] text-[#1E1B4B]/70 font-medium leading-tight font-sans">Idea and video submission portal locks for initial screening.</p>
                      </div>
                    </div>

                    {/* Sep 8 */}
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0">
                        <PartyPopper className="w-4 h-4 text-[#7C3AED]" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-black text-[#1E1B4B] uppercase tracking-wide">SEP 8</span>
                          <span className="bg-[#7C3AED] text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">INAUGURATION</span>
                        </div>
                        <p className="text-xs text-[#1E1B4B] font-bold leading-snug font-display">Shortlist Release & Grand Inauguration</p>
                        <p className="text-[11px] text-[#1E1B4B]/70 font-medium leading-tight font-sans">Qualified squads announced. Official season opening & briefing ceremony!</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-3 mt-4 border-t border-[#1E1B4B]/15">
                    <span className="text-[10px] font-mono text-[#059669] font-black uppercase tracking-wider">✦ SQUADS QUALIFIED</span>
                  </div>
                </div>

                {/* --------------------------------------------------------- */}
                {/* STAGE 2: PART 1 EVALUATION                                */}
                {/* --------------------------------------------------------- */}
                <div 
                  className="flex-1 min-w-[245px] lg:min-w-[255px] px-4 sm:px-5 py-4 flex flex-col rounded-2xl transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.65)',
                    boxShadow: '0 4px 18px rgba(30,27,75,0.08), 0 1px 4px rgba(30,27,75,0.05)',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  <StageBanner title="STAGE 2" part="PART 1 EVALUATION" date="9 – 16 SEPTEMBER 2026" color="blue" />

                  <div className="space-y-4 flex-grow">
                    
                    {/* Sep 12 */}
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0">
                        <Video className="w-4 h-4 text-[#2563EB]" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-black text-[#1E1B4B] uppercase tracking-wide">SEP 12</span>
                          <span className="bg-[#2563EB] text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">5:30 PM START</span>
                        </div>
                        <p className="text-xs text-[#1E1B4B] font-bold leading-snug font-display">Part 1: Evaluation 1</p>
                        <p className="text-[11px] text-[#1E1B4B]/70 font-medium leading-tight font-sans">Participants submit video. Panel gets 24 hrs to review, followed by live team Q&A.</p>
                      </div>
                    </div>

                    {/* Sep 16 */}
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0">
                        <Code2 className="w-4 h-4 text-[#4F46E5]" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-black text-[#1E1B4B] uppercase tracking-wide">SEP 16</span>
                          <span className="bg-[#4F46E5] text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">5:30 PM & PART 2 PS</span>
                        </div>
                        <p className="text-xs text-[#1E1B4B] font-bold leading-snug font-display">Part 1: Evaluation 2 + Part 2 Requirement Release</p>
                        <p className="text-[11px] text-[#1E1B4B]/70 font-medium leading-tight font-sans">Final Part 1 scoring + Part 2 problem statements officially unlocked for building.</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-3 mt-4 border-t border-[#1E1B4B]/15">
                    <span className="text-[10px] font-mono text-[#2563EB] font-black uppercase tracking-wider">✦ PART 1 COMPLETE</span>
                  </div>
                </div>

                {/* --------------------------------------------------------- */}
                {/* STAGE 3: PART 2 EVALUATION                                */}
                {/* --------------------------------------------------------- */}
                <div 
                  className="flex-1 min-w-[245px] lg:min-w-[255px] px-4 sm:px-5 py-4 flex flex-col rounded-2xl transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.65)',
                    boxShadow: '0 4px 18px rgba(30,27,75,0.08), 0 1px 4px rgba(30,27,75,0.05)',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  <StageBanner title="STAGE 3" part="PART 2 EVALUATION" date="17 – 23 SEPTEMBER 2026" color="orange" />

                  <div className="space-y-4 flex-grow">
                    
                    {/* Sep 19 */}
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0">
                        <Swords className="w-4 h-4 text-[#EA580C]" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-black text-[#1E1B4B] uppercase tracking-wide">SEP 19</span>
                          <span className="bg-[#EA580C] text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">5:30 PM START</span>
                        </div>
                        <p className="text-xs text-[#1E1B4B] font-bold leading-snug font-display">Part 2: Evaluation 1</p>
                        <p className="text-[11px] text-[#1E1B4B]/70 font-medium leading-tight font-sans">Video deliverable submitted. 24 hrs panel review window + live evaluation Q&A.</p>
                      </div>
                    </div>

                    {/* Sep 23 */}
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-black text-[#1E1B4B] uppercase tracking-wide">SEP 23</span>
                          <span className="bg-[#F59E0B] text-[#1E1B4B] font-mono text-[9px] font-black px-1.5 py-0.5 rounded-full">5:30 PM & PLAYOFFS</span>
                        </div>
                        <p className="text-xs text-[#1E1B4B] font-bold leading-snug font-display">Part 2: Evaluation 2 + Part 3 Requirement Release</p>
                        <p className="text-[11px] text-[#1E1B4B]/70 font-medium leading-tight font-sans">Sprint finals concluded. Top qualifiers advance to Part 3 Playoffs arena!</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-3 mt-4 border-t border-[#1E1B4B]/15">
                    <span className="text-[10px] font-mono text-[#EA580C] font-black uppercase tracking-wider">✦ QUALIFIERS DECIDED</span>
                  </div>
                </div>

                {/* --------------------------------------------------------- */}
                {/* STAGE 4: PART 3 PLAYOFFS & FINALE                         */}
                {/* --------------------------------------------------------- */}
                <div 
                  className="flex-1 min-w-[245px] lg:min-w-[255px] px-4 sm:px-5 py-4 flex flex-col rounded-2xl relative transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.65)',
                    boxShadow: '0 4px 18px rgba(30,27,75,0.08), 0 1px 4px rgba(30,27,75,0.05)',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  {/* Glowing Lightbulb on the right */}
                  <div className="hidden xl:block absolute -right-10 top-1/3 select-none pointer-events-none">
                    <LightbulbDoodle className="w-8 h-8 text-[#F59E0B] animate-pulse" />
                  </div>

                  {/* Hand-drawn Crown underneath */}
                  <div className="hidden xl:block absolute -bottom-9 right-12 select-none pointer-events-none -rotate-6">
                    <CrownDoodle className="w-9 h-7 text-[#1E1B4B]/65" />
                  </div>

                  <StageBanner title="STAGE 4" part="PART 3 PLAYOFFS & FINALE" date="LATE SEPTEMBER 2026" color="purple" />

                  <div className="space-y-4 flex-grow">
                    
                    {/* Playoffs Arena */}
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0">
                        <BarChart3 className="w-4 h-4 text-[#7C3AED]" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-mono text-xs font-black text-[#1E1B4B] uppercase tracking-wide">PLAYOFFS ARENA</span>
                        <p className="text-xs text-[#1E1B4B] font-bold leading-snug font-display">Head-to-Head Playoff Fixtures</p>
                        <p className="text-[11px] text-[#1E1B4B]/70 font-medium leading-tight font-sans">Top ranked squads battle live to determine the 4 Grand Finalists.</p>
                      </div>
                    </div>

                    {/* Grand Finale */}
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0">
                        <Trophy className="w-4 h-4 text-[#F59E0B]" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-mono text-xs font-black text-[#1E1B4B] uppercase tracking-wide">AUDITORIUM GRAND FINALE</span>
                        <p className="text-xs text-[#1E1B4B] font-bold leading-snug font-display">Live On-Stage Presentations at SMVITM</p>
                        <p className="text-[11px] text-[#1E1B4B]/70 font-medium leading-tight font-sans">₹30,000+ Prize Pool awarded & Championship Trophy lifted!</p>
                      </div>
                    </div>

                    {/* Champion Crowned */}
                    <div className="flex items-start gap-2.5">
                      <div className="mt-1 flex-shrink-0">
                        <Award className="w-4 h-4 text-[#EA580C]" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-mono text-xs font-black text-[#1E1B4B] uppercase tracking-wide">CHAMPION CROWNED</span>
                        <p className="text-xs text-[#1E1B4B] font-bold leading-snug font-display">One League. One Champion. Unlimited Impact.</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-3 mt-4 border-t border-[#1E1B4B]/15">
                    <span className="text-[10px] font-mono text-[#7C3AED] font-black uppercase tracking-wider">✦ ULTIMATE GLORY</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* OFFICIAL EVALUATION GUIDELINES & NOTES (From Organizer Schedule)      */}
        {/* ===================================================================== */}
        <div 
          className="reveal-on-scroll stagger-3 mt-8 border border-[#1E1B4B]/10 rounded-3xl p-5 sm:p-7 shadow-sm"
          style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(4px)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-ping" />
            <h3 className="font-display font-black text-sm sm:text-base uppercase tracking-wider text-[#1E1B4B]">
              OFFICIAL EVALUATION FORMAT & GUIDELINES
            </h3>
            <span className="text-xs font-mono text-[#1E1B4B]/50 font-semibold ml-auto hidden sm:inline">
              HPL Season Regulations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Note 1: Video Deliverable */}
            <div className="reveal-on-scroll stagger-1 border border-[#1E1B4B]/10 rounded-2xl p-4 flex items-start gap-3 bg-white/70 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Video className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-display font-black text-xs uppercase tracking-wide text-[#1E1B4B]">
                  Video Deliverable Required
                </div>
                <p className="text-xs text-[#1E1B4B]/80 font-medium leading-snug font-sans">
                  Registration has to be done along with the solution. The core deliverable is a demonstration video for the PS.
                </p>
              </div>
            </div>

            {/* Note 2: Inauguration */}
            <div className="reveal-on-scroll stagger-2 border border-[#1E1B4B]/10 rounded-2xl p-4 flex items-start gap-3 bg-white/70 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <PartyPopper className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-display font-black text-xs uppercase tracking-wide text-[#1E1B4B]">
                  Grand Inauguration: 8th Sep
                </div>
                <p className="text-xs text-[#1E1B4B]/80 font-medium leading-snug font-sans">
                  Official inauguration ceremony will take place on 8th September following the shortlist announcement.
                </p>
              </div>
            </div>

            {/* Note 3: 5:30 PM Start */}
            <div className="reveal-on-scroll stagger-3 border border-[#1E1B4B]/10 rounded-2xl p-4 flex items-start gap-3 bg-white/70 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-display font-black text-xs uppercase tracking-wide text-[#1E1B4B]">
                  Evaluation Starts at 5:30 PM
                </div>
                <p className="text-xs text-[#1E1B4B]/80 font-medium leading-snug font-sans">
                  All live evaluation rounds commence at 5:30 PM (after working hours) with mentors and jury members.
                </p>
              </div>
            </div>

            {/* Note 4: Video Per Evaluation */}
            <div className="reveal-on-scroll stagger-4 border border-[#1E1B4B]/10 rounded-2xl p-4 flex items-start gap-3 bg-white/70 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileCheck className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-display font-black text-xs uppercase tracking-wide text-[#1E1B4B]">
                  Video Submission Each Round
                </div>
                <p className="text-xs text-[#1E1B4B]/80 font-medium leading-snug font-sans">
                  Participants must submit an updated video demonstrating their latest sprint build for every evaluation round.
                </p>
              </div>
            </div>

            {/* Note 5: 24h Jury Review */}
            <div className="reveal-on-scroll stagger-5 border border-[#1E1B4B]/10 rounded-2xl p-4 flex items-start gap-3 bg-white/70 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Timer className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-display font-black text-xs uppercase tracking-wide text-[#1E1B4B]">
                  24-Hour Panel Review Window
                </div>
                <p className="text-xs text-[#1E1B4B]/80 font-medium leading-snug font-sans">
                  The judging panel is given a full 24 hours to review submitted sprint videos before the live session.
                </p>
              </div>
            </div>

            {/* Note 6: Team Q&A */}
            <div className="reveal-on-scroll stagger-6 border border-[#1E1B4B]/10 rounded-2xl p-4 flex items-start gap-3 bg-white/70 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-display font-black text-xs uppercase tracking-wide text-[#1E1B4B]">
                  Interactive Team Q&A Session
                </div>
                <p className="text-xs text-[#1E1B4B]/80 font-medium leading-snug font-sans">
                  Each evaluation includes live, direct Q&A between jury members and team members to test solution depth.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. "THE LEAGUE NEVER STOPS" + 4 FEATURE BADGES + CHAMPIONS ARTWORK        */}
      {/* ========================================================================= */}
      <section className="pt-6 pb-0 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto relative z-10">
        
        <div className="reveal-on-scroll stagger-1 space-y-1 mb-4">
          <div className="flex items-center gap-3">
            <PaperPlaneDoodle className="w-8 h-8 sm:w-9 sm:h-9 text-[#1E1B4B]/75 -rotate-45 flex-shrink-0 animate-comic-wiggle" />
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#1E1B4B] uppercase tracking-tight">
              THE LEAGUE{' '}
              <span className="font-marker text-[#4F46E5] not-italic underline decoration-[#4F46E5] decoration-2">
                NEVER STOPS
              </span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#1E1B4B]/80 font-medium pl-11 sm:pl-12">
            Every evaluation, every feedback and every improvement brings you closer to the trophy.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-end justify-between gap-6">
          
          {/* Left Column: Feature badges */}
          <div 
            className="reveal-on-scroll stagger-2 flex-1 w-full border border-[#1E1B4B]/10 rounded-3xl p-6 sm:p-7 mb-1 lg:mb-2 shadow-sm"
            style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(4px)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#1E1B4B]/10">
              
              <div className="space-y-2 sm:pr-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#4F46E5] flex items-center justify-center shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#1E1B4B]">
                  MULTIPLE MATCH DAYS
                </div>
                <p className="text-xs text-[#1E1B4B]/75 font-medium leading-relaxed font-sans">
                  Teams face off, present, and earn crucial points in live competitive fixtures.
                </p>
              </div>

              <div className="space-y-2 pt-3 sm:pt-0 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-2xs">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#1E1B4B]">
                  IMPROVE & LEVEL UP
                </div>
                <p className="text-xs text-[#1E1B4B]/75 font-medium leading-relaxed font-sans">
                  Use jury and mentor feedback to build smarter, stronger, production-ready solutions.
                </p>
              </div>

              <div className="space-y-2 pt-3 sm:pt-0 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-2xs">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#1E1B4B]">
                  CLIMB THE STANDINGS
                </div>
                <p className="text-xs text-[#1E1B4B]/75 font-medium leading-relaxed font-sans">
                  Every sprint and live demo accumulates points to decide your playoff qualification.
                </p>
              </div>

              <div className="space-y-2 pt-3 sm:pt-0 sm:pl-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center shadow-2xs">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#1E1B4B]">
                  ONLY THE BEST
                </div>
                <p className="text-xs text-[#1E1B4B]/75 font-medium leading-relaxed font-sans">
                  The top 4 squads from each of the 3 domains (12 finalist teams) battle live on stage at the SMVITM Auditorium for the grand championship.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Celebrating Champions Artwork */}
          <div className="reveal-on-scroll stagger-3 w-full lg:w-[440px] xl:w-[500px] flex-shrink-0 flex justify-center lg:justify-end select-none relative z-20 -mb-2 sm:-mb-3">
            
            {/* Ambient Warm Cloud Glow */}
            <div 
              className="absolute inset-0 pointer-events-none -z-10 rounded-full blur-3xl opacity-60"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(246, 240, 226, 0.95) 0%, rgba(251, 249, 242, 0.5) 60%, transparent 85%)'
              }}
            />

            <img
              src={HPL_IMAGES.timelineChampions}
              alt="Three student champions celebrating and lifting the HPL Trophy"
              className="anim-champ-art w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[500px] h-auto object-contain select-none pointer-events-none drop-shadow-md mix-blend-multiply will-change-transform"
              style={{
                maskImage: 'radial-gradient(ellipse 82% 80% at 50% 50%, black 35%, rgba(0,0,0,0.9) 52%, rgba(0,0,0,0.2) 74%, transparent 88%)',
                WebkitMaskImage: 'radial-gradient(ellipse 82% 80% at 50% 50%, black 35%, rgba(0,0,0,0.9) 52%, rgba(0,0,0,0.2) 74%, transparent 88%)',
              }}
              loading="eager"
            />
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. SOLID ROYAL PURPLE FOOTER WITH UNIFIED DRY-BRUSH PAINT STROKE          */}
      {/* ========================================================================= */}
      <footer className="reveal-on-scroll w-full select-none mt-2 sm:mt-3 relative">
        
        {/* 
          Unified Vector Dry-Brush Paint Stroke Header:
          Uses exact #321668 fill and stroke, creating a 100% perfect color match with the footer body!
        */}
        <div className="w-full overflow-hidden leading-none relative -mb-[1px] pointer-events-none select-none">
          <svg 
            viewBox="0 0 1440 56" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-8 sm:h-11 lg:h-13 block"
            preserveAspectRatio="none"
          >
            {/* Main organic ragged paint stroke body */}
            <path 
              d="M0,56 L0,22 
                 C35,14 70,26 110,17 
                 C150,11 190,22 235,16 
                 C280,24 325,13 370,19 
                 C415,14 460,24 510,16 
                 C560,22 610,13 660,20 
                 C710,15 760,25 810,17 
                 C860,23 910,14 960,21 
                 C1010,15 1060,25 1115,18 
                 C1170,24 1225,15 1280,22 
                 C1335,16 1390,24 1440,18 
                 L1440,56 Z" 
              fill="#321668" 
            />

            {/* Realistic continuous dry-brush feathering along the upper stroke edge */}
            <path 
              d="M0,20 Q120,8 240,16 T480,12 T720,17 T960,11 T1200,16 T1440,12" 
              stroke="#321668" 
              strokeWidth="4" 
              strokeLinecap="round" 
              opacity="0.8" 
            />
            <path 
              d="M10,14 Q160,5 310,11 T620,7 T930,12 T1240,6 T1430,10" 
              stroke="#321668" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              opacity="0.6" 
            />
            <path 
              d="M20,9 Q180,2 340,6 T700,2 T1060,5 T1420,3" 
              stroke="#321668" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              opacity="0.4" 
            />

            {/* Natural micro-splatters and detached brush bristle specks */}
            <circle cx="85" cy="6" r="1.6" fill="#321668" opacity="0.6" />
            <circle cx="175" cy="4" r="1.3" fill="#321668" opacity="0.5" />
            <circle cx="290" cy="5" r="1.5" fill="#321668" opacity="0.6" />
            <circle cx="430" cy="3" r="1.8" fill="#321668" opacity="0.7" />
            <circle cx="580" cy="5" r="1.4" fill="#321668" opacity="0.5" />
            <circle cx="730" cy="3" r="1.6" fill="#321668" opacity="0.6" />
            <circle cx="880" cy="6" r="1.7" fill="#321668" opacity="0.7" />
            <circle cx="1020" cy="4" r="1.5" fill="#321668" opacity="0.6" />
            <circle cx="1180" cy="5" r="1.8" fill="#321668" opacity="0.7" />
            <circle cx="1320" cy="3" r="1.4" fill="#321668" opacity="0.5" />
            <circle cx="1405" cy="6" r="1.5" fill="#321668" opacity="0.6" />
          </svg>
        </div>

        {/* Solid Royal Purple Footer Body with Unified #321668 Background */}
        <div className="w-full bg-[#321668] text-white pt-2 pb-8 px-4 sm:px-8 lg:px-12 relative shadow-2xl">
          
          <div className="max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10">
            
            {/* Left: Authentic White Geometric Shield Logo + Circular Social Outline Icons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <div className="flex items-center gap-2.5">
                {/* White Hexagonal Geometric Shield */}
                <div className="w-8 h-9 flex items-center justify-center">
                  <svg className="w-full h-full text-white" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2L30 8V20C30 27.5 16 34 16 34C16 34 2 27.5 2 20V8L16 2Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
                    <path d="M10 12V24M22 12V24M10 18H22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16 8V28" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="font-display font-black text-sm sm:text-base tracking-widest uppercase block text-white leading-none">
                    HPL
                  </span>
                  <span className="font-display text-[8.5px] tracking-wider uppercase text-white/80 block mt-1 font-semibold">
                    HACKATHON PREMIER LEAGUE
                  </span>
                </div>
              </div>

              {/* Circular Social Outline Icons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="LinkedIn"
                  className="w-7 h-7 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="GitHub"
                  className="w-7 h-7 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="YouTube"
                  className="w-7 h-7 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Center: "CODE TODAY. IMPACT TOMORROW." + Yellow Brush "REGISTER YOUR TEAM →" Button */}
            <div className="flex flex-col items-center text-center">
              <div className="font-display font-black text-xs sm:text-sm tracking-widest uppercase text-white">
                CODE TODAY.{' '}
                <span className="text-[#F59E0B] italic font-marker">IMPACT</span> TOMORROW.
              </div>

              <button 
                onClick={() => onNavigate('register')}
                className="mt-2 px-6 py-2 bg-[#F59E0B] hover:bg-[#FBBF24] text-[#1E1B4B] font-display font-black text-xs uppercase tracking-wider rounded-[14px_20px_12px_18px] shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer border border-amber-300/40"
              >
                <span>REGISTER YOUR TEAM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: "POWERED BY" + Partner Badges */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-1.5">
              <div className="font-mono text-[9px] font-bold text-white/70 uppercase tracking-widest">
                POWERED BY
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 text-white/90">
                <span className="flex items-center gap-1 font-display font-black text-[11px] uppercase tracking-wider hover:text-white transition-colors">
                  <Terminal className="w-3.5 h-3.5 text-white/80" />
                  CodeTroopers
                </span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1 font-display font-black text-[11px] uppercase tracking-wider hover:text-white transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  IGNITE
                </span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1 font-display font-black text-[11px] uppercase tracking-wider hover:text-white transition-colors">
                  <Award className="w-3.5 h-3.5 text-white/80" />
                  AIKYA
                </span>
                <span className="text-white/40">•</span>
                <span className="font-display font-bold text-[10px] uppercase tracking-wider hover:text-white transition-colors">
                  IEEE SMVITM
                </span>
                <span className="text-white/40">•</span>
                <span className="font-display font-bold text-[10px] uppercase tracking-wider hover:text-white transition-colors">
                  ISTE Chapter
                </span>
              </div>
            </div>

          </div>

        </div>

      </footer>

    </div>
  );
};
