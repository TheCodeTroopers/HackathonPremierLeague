import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { PageRoute } from '../../types';
import { HPL_IMAGES } from '../../assets/images';
import { 
  SparkleDoodle, 
  PaperPlaneDoodle, 
  CloudDoodle, 
  ShootingStarDoodle
} from '../illustrations/MicroDoodles';
import {
  LocomotiveTrain,
  TrophyBurstDoodle,
  CoastalTempleSketch,
  LightbulbIdeaDoodle,
  StarPencilDoodle,
  SideWatercolorSplatter
} from '../illustrations/TrainJourneyIllustration';
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
  FileCheck,
  MousePointer,
  AlertCircle,
  Compass
} from 'lucide-react';

interface TimelinePageProps {
  onNavigate: (page: PageRoute) => void;
}

interface PlatformData {
  id: string;
  platformNumber: string;
  position: 'top' | 'bottom';
  headerBg: string;
  headerTextColor: string;
  accentColor: string;
  day: string;
  month: string;
  yearDay: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ReactNode;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({ onNavigate }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const pinnedContainerRef = useRef<HTMLDivElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const desktopTrainRef = useRef<HTMLDivElement>(null);
  
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileTrainRef = useRef<HTMLDivElement>(null);
  
  const [hasEntered, setHasEntered] = useState(false);
  const [activePlatformIndex, setActivePlatformIndex] = useState(0);
  const [totalScrollTravel, setTotalScrollTravel] = useState(2800);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  // Cached layout metrics to eliminate all layout thrashing during scroll
  const layoutMetricsRef = useRef({
    containerTop: 0,
    scrollDistance: 2800,
    maxTrackTranslate: 1800,
    maxTrainDistance: 2200,
  });

  const mobileMetricsRef = useRef({
    containerTop: 0,
    containerHeight: 1200,
  });

  // Trigger entrance on mount
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

  // ── 2. Smooth Scroll Reveal Observer for static sections ─────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
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

  // ── 3. Official HPL Season Milestones Schedule (Platforms 01 to 09) ───────
  const platforms: PlatformData[] = useMemo(() => [
    {
      id: 'p1',
      platformNumber: 'PLATFORM 01',
      position: 'top',
      headerBg: '#1E1B4B',
      headerTextColor: '#FFFFFF',
      accentColor: '#EA580C',
      day: '02',
      month: 'SEP',
      yearDay: '2026 WEDNESDAY',
      title: 'Registration Open with PS',
      subtitle: 'Registration must be done along with the solution. Deliverable is video for the PS.',
      tag: 'PORTAL OPEN',
      icon: <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
    },
    {
      id: 'p2',
      platformNumber: 'PLATFORM 02',
      position: 'bottom',
      headerBg: '#991B1B',
      headerTextColor: '#FFFFFF',
      accentColor: '#EF4444',
      day: '06',
      month: 'SEP',
      yearDay: '2026 SUN 11:59 PM',
      title: 'Registration Close (11:59 PM)',
      subtitle: 'Idea and video submission portal locks for initial jury screening.',
      tag: 'DEADLINE',
      icon: <AlertCircle className="w-3.5 h-3.5 text-[#EF4444]" />
    },
    {
      id: 'p3',
      platformNumber: 'PLATFORM 03',
      position: 'top',
      headerBg: '#059669',
      headerTextColor: '#FFFFFF',
      accentColor: '#059669',
      day: '08',
      month: 'SEP',
      yearDay: '2026 TUESDAY',
      title: 'Shortlist Release & Inauguration',
      subtitle: 'Qualified squads announced. Official season opening & briefing ceremony!',
      tag: 'INAUGURATION',
      icon: <PartyPopper className="w-3.5 h-3.5 text-[#059669]" />
    },
    {
      id: 'p4',
      platformNumber: 'PLATFORM 04',
      position: 'bottom',
      headerBg: '#2563EB',
      headerTextColor: '#FFFFFF',
      accentColor: '#2563EB',
      day: '12',
      month: 'SEP',
      yearDay: '2026 SAT 5:30 PM',
      title: 'Part 1: Evaluation 1',
      subtitle: 'Participants submit video. Panel gets 24 hrs to review, followed by live team Q&A.',
      tag: '5:30 PM START',
      icon: <Video className="w-3.5 h-3.5 text-[#2563EB]" />
    },
    {
      id: 'p5',
      platformNumber: 'PLATFORM 05',
      position: 'top',
      headerBg: '#EA580C',
      headerTextColor: '#FFFFFF',
      accentColor: '#EA580C',
      day: '16',
      month: 'SEP',
      yearDay: '2026 WED 5:30 PM',
      title: 'Part 1: Eval 2 + Part 2 PS',
      subtitle: 'Final Part 1 scoring + Part 2 problem statements officially unlocked for building.',
      tag: '5:30 PM & PART 2 PS',
      icon: <Swords className="w-3.5 h-3.5 text-[#EA580C]" />
    },
    {
      id: 'p6',
      platformNumber: 'PLATFORM 06',
      position: 'bottom',
      headerBg: '#D97706',
      headerTextColor: '#FFFFFF',
      accentColor: '#D97706',
      day: '19',
      month: 'SEP',
      yearDay: '2026 SAT 5:30 PM',
      title: 'Part 2: Evaluation 1',
      subtitle: 'Video deliverable submitted. 24 hrs panel review window + live evaluation Q&A.',
      tag: '5:30 PM START',
      icon: <FileCheck className="w-3.5 h-3.5 text-[#D97706]" />
    },
    {
      id: 'p7',
      platformNumber: 'PLATFORM 07',
      position: 'top',
      headerBg: '#E11D48',
      headerTextColor: '#FFFFFF',
      accentColor: '#E11D48',
      day: '23',
      month: 'SEP',
      yearDay: '2026 WED 5:30 PM',
      title: 'Part 2: Eval 2 + Part 3 Release',
      subtitle: 'Sprint finals concluded. Top qualifiers advance to Part 3 Playoffs arena!',
      tag: '5:30 PM & PLAYOFFS',
      icon: <BarChart3 className="w-3.5 h-3.5 text-[#E11D48]" />
    },
    {
      id: 'p8',
      platformNumber: 'PLATFORM 08',
      position: 'bottom',
      headerBg: '#4F46E5',
      headerTextColor: '#FFFFFF',
      accentColor: '#6366F1',
      day: '26',
      month: 'SEP',
      yearDay: '2026 SATURDAY',
      title: 'Head-to-Head Playoff Fixtures',
      subtitle: 'Top ranked squads battle live to determine the 4 Grand Finalist squads.',
      tag: 'PLAYOFFS ARENA',
      icon: <Swords className="w-3.5 h-3.5 text-[#6366F1]" />
    },
    {
      id: 'p9',
      platformNumber: 'PLATFORM 09',
      position: 'top',
      headerBg: '#7C3AED',
      headerTextColor: '#FFFFFF',
      accentColor: '#F59E0B',
      day: '28',
      month: 'SEP',
      yearDay: '2026 LATE SEP',
      title: 'Auditorium Grand Finale',
      subtitle: 'Live On-Stage Presentations at SMVITM. ₹30,000+ Prize Pool awarded & Trophy lifted!',
      tag: 'GRAND FINALE',
      icon: <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
    }
  ], []);

  // ── 4. Measure & Cache Layout (Called ONCE on mount & on window.resize) ───
  const measureLayout = useCallback(() => {
    if (!pinnedContainerRef.current || !timelineTrackRef.current) return;
    const container = pinnedContainerRef.current;
    const track = timelineTrackRef.current;
    
    const containerRect = container.getBoundingClientRect();
    const containerTop = window.scrollY + containerRect.top;
    
    const trackScrollWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    const maxTrackTranslate = Math.max(trackScrollWidth - viewportWidth + 240, 0);
    const scrollDistance = maxTrackTranslate + 320;
    const maxTrainDistance = trackScrollWidth - 440;

    layoutMetricsRef.current = {
      containerTop,
      scrollDistance,
      maxTrackTranslate,
      maxTrainDistance,
    };
    
    setTotalScrollTravel(scrollDistance);
  }, []);

  const measureMobileLayout = useCallback(() => {
    if (!mobileContainerRef.current) return;
    const container = mobileContainerRef.current;
    const rect = container.getBoundingClientRect();
    mobileMetricsRef.current = {
      containerTop: window.scrollY + rect.top,
      containerHeight: rect.height,
    };
  }, []);

  // ── 5. Desktop Zero-Layout-Thrashing 120 FPS GPU Render Loop ──────────────
  useEffect(() => {
    let animationFrameId: number;
    let smoothProgress = 0;
    let targetProgress = 0;

    measureLayout();

    const onScroll = () => {
      if (window.innerWidth < 768) return;
      const { containerTop, scrollDistance } = layoutMetricsRef.current;
      if (scrollDistance <= 0) return;

      const scrolledPx = window.scrollY - containerTop;
      const rawProgress = Math.min(Math.max(scrolledPx / scrollDistance, 0), 1);
      targetProgress = Math.min(rawProgress / 0.88, 1);

      const platformStep = 1 / (platforms.length - 1);
      const currentIdx = Math.min(
        Math.floor((targetProgress + (platformStep * 0.4)) * (platforms.length - 1)), 
        platforms.length - 1
      );
      
      setActivePlatformIndex(prev => prev !== currentIdx ? currentIdx : prev);
    };

    const renderLoop = () => {
      if (!timelineTrackRef.current) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      // Smooth lerp on GPU compositor without layout reflows
      smoothProgress += (targetProgress - smoothProgress) * 0.16;
      
      const { maxTrackTranslate, maxTrainDistance } = layoutMetricsRef.current;

      const trackX = smoothProgress * maxTrackTranslate;
      const trainX = smoothProgress * maxTrainDistance;

      timelineTrackRef.current.style.transform = `translate3d(${-trackX}px, 0, 0)`;

      if (desktopTrainRef.current) {
        desktopTrainRef.current.style.transform = `translate3d(${trainX + 24}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measureLayout);
    
    onScroll();
    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureLayout);
    };
  }, [measureLayout, platforms.length]);

  // ── 6. Mobile Instant Synchronous Native Scroll Tracking ──────────────────
  useEffect(() => {
    measureMobileLayout();

    const handleMobileScroll = () => {
      if (!mobileContainerRef.current || window.innerWidth >= 768) return;
      
      const { containerTop, containerHeight } = mobileMetricsRef.current;
      const viewportHeight = window.innerHeight;
      
      const scrolledPx = window.scrollY + viewportHeight * 0.45 - containerTop;
      const totalTrackHeight = Math.max(containerHeight - 180, 1);
      
      const progress = Math.min(Math.max(scrolledPx / totalTrackHeight, 0), 1);
      const trainY = progress * (totalTrackHeight - 20);

      if (mobileTrainRef.current) {
        mobileTrainRef.current.style.transform = `translate3d(0, ${trainY}px, 0)`;
      }

      const activeIdx = Math.min(
        Math.floor(progress * platforms.length), 
        platforms.length - 1
      );
      setMobileActiveIndex(prev => prev !== activeIdx ? activeIdx : prev);
    };

    window.addEventListener('scroll', handleMobileScroll, { passive: true });
    window.addEventListener('resize', measureMobileLayout);
    
    handleMobileScroll();

    return () => {
      window.removeEventListener('scroll', handleMobileScroll);
      window.removeEventListener('resize', measureMobileLayout);
    };
  }, [measureMobileLayout, platforms.length]);

  // Smooth Button Jump to Station
  const scrollToStation = useCallback((targetIndex: number) => {
    if (!pinnedContainerRef.current) return;
    const { containerTop, scrollDistance } = layoutMetricsRef.current;
    const targetProgress = (targetIndex / (platforms.length - 1)) * 0.88;
    const targetScrollY = containerTop + targetProgress * scrollDistance;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }, [platforms.length]);

  const handlePrevStation = () => {
    const nextIdx = Math.max(activePlatformIndex - 1, 0);
    scrollToStation(nextIdx);
  };

  const handleNextStation = () => {
    const nextIdx = Math.min(activePlatformIndex + 1, platforms.length - 1);
    scrollToStation(nextIdx);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F2] text-[#1E1B4B] overflow-x-clip selection:bg-[#FBBF24] selection:text-[#1E1B4B]">

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
              <span>One League. One</span>
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

            {/* Illustration Container with Subtle Natural Perimeter Feather */}
            <div className="relative w-full max-w-[360px] sm:max-w-[520px] lg:max-w-none lg:w-[114%] xl:w-[120%] h-auto mx-auto lg:ml-auto -mt-2 lg:-mt-6">
              
              <img
                src={HPL_IMAGES.timelineHeader}
                alt="HPL Season Timeline"
                decoding="async"
                className={`w-full h-auto max-h-[320px] sm:max-h-[440px] lg:max-h-[560px] object-contain select-none block brightness-[1.02] contrast-[1.03] saturate-[1.02] will-change-transform ${hasEntered ? 'hero-anim-illustration' : 'hero-pre-enter'}`}
                style={{
                  maskImage: 'radial-gradient(ellipse 94% 88% at 50% 50%, black 78%, rgba(0,0,0,0.8) 90%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 94% 88% at 50% 50%, black 78%, rgba(0,0,0,0.8) 90%, transparent 100%)',
                }}
                loading="eager"
              />

              {/* Ultra-subtle bottom edge hairline ease */}
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
      {/* 2A. DESKTOP/TABLET: HORIZONTAL PINNED TRAIN JOURNEY                       */}
      {/* ========================================================================= */}
      <section 
        ref={pinnedContainerRef}
        className="hidden md:block relative w-full select-none"
        style={{
          height: `calc(100vh + ${totalScrollTravel}px)`,
        }}
      >
        {/* Sticky Viewport Canvas */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-[74px] pb-3 px-4 lg:px-8 bg-[#FBF9F2] relative">
          
          {/* Top-Left Authentic Purple Watercolor Wash & Side Illustrations */}
          <div className="absolute top-12 left-0 pointer-events-none z-0">
            <SideWatercolorSplatter variant="purple" className="w-80 h-72 opacity-60 -translate-x-12 -translate-y-8" />
          </div>
          <div className="absolute top-24 left-8 pointer-events-none z-10">
            <PaperPlaneDoodle className="w-9 h-9 text-[#1E1B4B]/80 -rotate-12 hover:scale-110 transition-transform" />
          </div>
          <div className="absolute top-36 left-20 pointer-events-none z-10">
            <StarPencilDoodle className="w-6 h-6 text-[#1E1B4B]" />
          </div>

          {/* Top-Right Golden/Purple Watercolor Wash & Trophy + Lightbulb Doodles */}
          <div className="absolute top-12 right-0 pointer-events-none z-0">
            <SideWatercolorSplatter variant="gold" className="w-96 h-80 opacity-70 translate-x-14 -translate-y-6" />
          </div>
          <div className="absolute top-18 right-16 pointer-events-none z-10">
            <TrophyBurstDoodle className="w-20 h-20 text-[#F59E0B]" />
          </div>
          <div className="absolute top-36 right-8 pointer-events-none z-10">
            <LightbulbIdeaDoodle className="w-9 h-9" />
          </div>

          {/* ── TOP HEADER ROW: Guidance Badge + Centered Title + Controls ── */}
          <div className="relative w-full max-w-[1520px] mx-auto flex items-center justify-between z-20 pb-0.5">
            
            {/* Left: Continuous Scroll Guidance Pill */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border-2 border-[#1E1B4B]/20 text-xs font-mono font-black text-[#1E1B4B] uppercase tracking-wider shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping" />
                <MousePointer className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span className="text-[#4F46E5] font-black">SCROLL TO DRIVE TRAIN 🚂 ➔</span>
              </div>
            </div>

            {/* Center Heading: "TIMELINE" */}
            <div className="text-center absolute left-1/2 -translate-x-1/2 pointer-events-none">
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] tracking-tight uppercase leading-none drop-shadow-sm">
                TIMELINE
              </h2>
              <p className="text-[11.5px] sm:text-[13px] font-medium text-[#1E1B4B]/80 mt-1 whitespace-nowrap">
                Every great journey has milestones. Here&apos;s your{' '}
                <span className="text-[#EA580C] font-black underline decoration-[#EA580C]/40 decoration-2">
                  route to glory!
                </span>
              </p>
            </div>

            {/* Right Interactive Controls */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-white/95 border-2 border-[#1E1B4B]/20 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-[#1E1B4B] shadow-2xs">
                <span className="text-[#EA580C]">✦</span>
                <span>PLATFORM 0{activePlatformIndex + 1}/0{platforms.length} REVEALED</span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevStation}
                  disabled={activePlatformIndex === 0}
                  aria-label="Previous Platform"
                  className="w-8 h-8 rounded-full bg-white border-2 border-[#1E1B4B]/20 text-[#1E1B4B] flex items-center justify-center hover:bg-[#4F46E5] hover:border-[#4F46E5] hover:text-white disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#1E1B4B] shadow-2xs transition-all cursor-pointer active:scale-90"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextStation}
                  disabled={activePlatformIndex === platforms.length - 1}
                  aria-label="Next Platform"
                  className="w-8 h-8 rounded-full bg-white border-2 border-[#1E1B4B]/20 text-[#1E1B4B] flex items-center justify-center hover:bg-[#4F46E5] hover:border-[#4F46E5] hover:text-white disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#1E1B4B] shadow-2xs transition-all cursor-pointer active:scale-90"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* ── MIDDLE SECTION: Horizontal Scrolling Railway Track & Platform Cards ── */}
          <div className="relative w-full flex-grow flex items-center overflow-hidden my-auto py-1">
            
            <div
              ref={timelineTrackRef}
              className="flex items-center gap-0 relative will-change-transform pl-4 lg:pl-10 pr-32"
              style={{ minWidth: 'max-content' }}
            >
              
              {/* 1. START STATION WITH START BADGE ON TRACK */}
              <div className="relative flex flex-col items-center justify-center mr-8 lg:mr-12 flex-shrink-0 z-20 select-none">
                <div className="bg-[#1E1B4B] text-white font-mono font-black text-xs px-4 py-1 rounded-full shadow-md tracking-widest uppercase border-2 border-white/20">
                  START
                </div>
              </div>

              {/* 2. CONTINUOUS DASHED RAILWAY LINE */}
              <div className="absolute left-[100px] lg:left-[130px] right-0 top-1/2 -translate-y-1/2 h-[3px] border-b-[3px] border-dashed border-[#1E1B4B]/35 pointer-events-none z-0" />

              {/* 3. DYNAMICALLY MOVING RETRO STEAM TRAIN (Glitch-Free Synchronized) */}
              <div 
                ref={desktopTrainRef}
                className="absolute pointer-events-none z-30 select-none will-change-transform"
                style={{
                  top: 'calc(50% - 68px)',
                  left: '0px',
                }}
              >
                <div className="relative">
                  <LocomotiveTrain className="w-32 h-24 lg:w-36 lg:h-28" />
                </div>
              </div>

              {/* 4. PLATFORM STATIONS (Progressive Unlocking as Train Arrives) */}
              <div className="flex items-center gap-12 lg:gap-16 xl:gap-20 relative z-10">
                {platforms.map((p, idx) => {
                  const isUnlocked = idx <= activePlatformIndex;
                  const isCurrent = idx === activePlatformIndex;

                  return (
                    <div 
                      key={p.id}
                      className="relative flex flex-col items-center flex-shrink-0"
                      style={{ width: '315px', height: '390px' }}
                    >

                      {/* --- TOP SLOT (Height: 185px) --- */}
                      <div className="w-full h-[185px] flex flex-col items-center justify-end">
                        {p.position === 'top' ? (
                          <>
                            {isUnlocked ? (
                              /* ── REVEALED CARD (Top Slot) ── */
                              <div 
                                className={`w-full rounded-2xl bg-white border-2 ${
                                  isCurrent 
                                    ? 'border-[#1E1B4B] ring-4 ring-[#4F46E5]/25 shadow-xl scale-[1.02]' 
                                    : 'border-[#1E1B4B]/35 shadow-md'
                                } transition-all duration-300 overflow-hidden flex flex-col animate-comic-card-flip`}
                                style={{ height: '165px' }}
                              >
                                <div 
                                  className="w-full py-1.5 px-3.5 flex items-center justify-between select-none"
                                  style={{ background: p.headerBg, color: p.headerTextColor }}
                                >
                                  <span className="font-mono text-[11px] font-black tracking-wider uppercase">
                                    {p.platformNumber}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                                  </div>
                                </div>

                                <div className="p-3 flex flex-col justify-between flex-grow">
                                  <div className="flex items-center justify-between border-b border-[#1E1B4B]/10 pb-1.5">
                                    <div className="flex items-center gap-2">
                                      <span 
                                        className="font-display font-black text-2xl lg:text-3xl leading-none"
                                        style={{ color: p.accentColor }}
                                      >
                                        {p.day}
                                      </span>
                                      <div className="flex flex-col">
                                        <span className="bg-[#1E1B4B] text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded leading-none">
                                          {p.month}
                                        </span>
                                        <span className="font-mono text-[8.5px] font-bold text-[#1E1B4B]/70 tracking-tight mt-0.5 leading-tight">
                                          {p.yearDay}
                                        </span>
                                      </div>
                                    </div>
                                    <span className="text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-[#1E1B4B]/80 border border-[#1E1B4B]/10">
                                      ✦ {p.tag}
                                    </span>
                                  </div>

                                  <div className="py-1 space-y-0.5">
                                    <h4 className="font-display font-black text-xs lg:text-[13px] text-[#1E1B4B] uppercase tracking-tight leading-snug line-clamp-1">
                                      {p.title}
                                    </h4>
                                    <p className="font-sans text-[10px] lg:text-[10.5px] text-[#1E1B4B]/75 font-medium leading-tight line-clamp-2">
                                      {p.subtitle}
                                    </p>
                                  </div>

                                  <div className="pt-1 border-t border-[#1E1B4B]/10 flex items-center justify-between">
                                    <div className="flex items-center gap-1 flex-grow pr-2">
                                      <div className="h-1 bg-[#1E1B4B]/15 rounded-full flex-grow relative">
                                        <span 
                                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-xs"
                                          style={{ left: `${Math.min(idx * 12 + 8, 88)}%`, background: p.accentColor }}
                                        />
                                      </div>
                                    </div>
                                    <div className="w-5 h-5 rounded border border-[#1E1B4B]/20 bg-white flex items-center justify-center text-[#1E1B4B] shadow-2xs">
                                      {p.icon}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* ── GREY UNREVEALED CARD (Top Slot - "Scroll down to see") ── */
                              <div 
                                className="w-full rounded-2xl bg-[#F4F0E6]/70 border-2 border-dashed border-[#1E1B4B]/20 shadow-xs flex flex-col justify-between overflow-hidden opacity-75"
                                style={{ height: '165px' }}
                              >
                                <div className="w-full py-1.5 px-3.5 bg-[#E8DFC8]/60 border-b border-[#1E1B4B]/10 flex items-center justify-between select-none">
                                  <span className="font-mono text-[10.5px] font-bold text-[#1E1B4B]/50 uppercase tracking-wider">
                                    {p.platformNumber}
                                  </span>
                                  <div className="flex items-center gap-1 opacity-35">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E1B4B]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E1B4B]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E1B4B]" />
                                  </div>
                                </div>

                                <div className="flex flex-col items-center justify-center py-2 space-y-1 text-center px-3">
                                  <div className="w-8 h-8 rounded-full bg-[#1E1B4B]/10 flex items-center justify-center text-[#1E1B4B]/70 shadow-2xs">
                                    <Compass className="w-4 h-4 text-[#EA580C] animate-pulse" />
                                  </div>
                                  <span className="font-mono text-[10.5px] font-black uppercase tracking-wider text-[#1E1B4B]/70">
                                    SCROLL TO REVEAL
                                  </span>
                                  <span className="font-sans text-[9px] text-[#1E1B4B]/50 font-medium leading-tight">
                                    Scroll down to drive train here
                                  </span>
                                </div>

                                <div className="p-2.5 border-t border-[#1E1B4B]/10 flex items-center justify-between opacity-50">
                                  <div className="h-1 bg-[#1E1B4B]/15 rounded-full flex-grow mr-2" />
                                  <div className="w-4 h-4 rounded border border-[#1E1B4B]/20 bg-white/50" />
                                </div>
                              </div>
                            )}

                            <div className={`w-[2.5px] h-[20px] ${isUnlocked ? 'bg-[#1E1B4B]' : 'bg-[#1E1B4B]/30'}`} />
                          </>
                        ) : null}
                      </div>

                      {/* --- CENTRAL STATION NODE ON RAILWAY LINE --- */}
                      <div className="w-full h-[32px] flex items-center justify-center relative z-20">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 ${
                            isCurrent
                              ? 'border-[#1E1B4B] bg-white scale-125 shadow-lg ring-4 ring-[#EA580C]/25'
                              : isUnlocked 
                                ? 'border-[#1E1B4B] bg-white shadow-sm'
                                : 'border-[#1E1B4B]/35 bg-[#FBF9F2]'
                          }`}
                        >
                          <div 
                            className={`w-3.5 h-3.5 rounded-full transition-transform ${isCurrent ? 'scale-110 animate-pulse' : ''}`}
                            style={{ background: isUnlocked ? p.accentColor : '#CBD5E1' }}
                          />
                        </div>
                      </div>

                      {/* --- BOTTOM SLOT (Height: 185px) --- */}
                      <div className="w-full h-[185px] flex flex-col items-center justify-start">
                        {p.position === 'bottom' ? (
                          <>
                            <div className={`w-[2.5px] h-[20px] ${isUnlocked ? 'bg-[#1E1B4B]' : 'bg-[#1E1B4B]/30'}`} />

                            {isUnlocked ? (
                              /* ── REVEALED CARD (Bottom Slot) ── */
                              <div 
                                className={`w-full rounded-2xl bg-white border-2 ${
                                  isCurrent 
                                    ? 'border-[#1E1B4B] ring-4 ring-[#4F46E5]/25 shadow-xl scale-[1.02]' 
                                    : 'border-[#1E1B4B]/35 shadow-md'
                                } transition-all duration-300 overflow-hidden flex flex-col animate-comic-card-flip`}
                                style={{ height: '165px' }}
                              >
                                <div 
                                  className="w-full py-1.5 px-3.5 flex items-center justify-between select-none"
                                  style={{ background: p.headerBg, color: p.headerTextColor }}
                                >
                                  <span className="font-mono text-[11px] font-black tracking-wider uppercase">
                                    {p.platformNumber}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                                  </div>
                                </div>

                                <div className="p-3 flex flex-col justify-between flex-grow">
                                  <div className="flex items-center justify-between border-b border-[#1E1B4B]/10 pb-1.5">
                                    <div className="flex items-center gap-2">
                                      <span 
                                        className="font-display font-black text-2xl lg:text-3xl leading-none"
                                        style={{ color: p.accentColor }}
                                      >
                                        {p.day}
                                      </span>
                                      <div className="flex flex-col">
                                        <span className="bg-[#1E1B4B] text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded leading-none">
                                          {p.month}
                                        </span>
                                        <span className="font-mono text-[8.5px] font-bold text-[#1E1B4B]/70 tracking-tight mt-0.5 leading-tight">
                                          {p.yearDay}
                                        </span>
                                      </div>
                                    </div>
                                    <span className="text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-[#1E1B4B]/80 border border-[#1E1B4B]/10">
                                      ✦ {p.tag}
                                    </span>
                                  </div>

                                  <div className="py-1 space-y-0.5">
                                    <h4 className="font-display font-black text-xs lg:text-[13px] text-[#1E1B4B] uppercase tracking-tight leading-snug line-clamp-1">
                                      {p.title}
                                    </h4>
                                    <p className="font-sans text-[10px] lg:text-[10.5px] text-[#1E1B4B]/75 font-medium leading-tight line-clamp-2">
                                      {p.subtitle}
                                    </p>
                                  </div>

                                  <div className="pt-1 border-t border-[#1E1B4B]/10 flex items-center justify-between">
                                    <div className="flex items-center gap-1 flex-grow pr-2">
                                      <div className="h-1 bg-[#1E1B4B]/15 rounded-full flex-grow relative">
                                        <span 
                                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-xs"
                                          style={{ left: `${Math.min(idx * 12 + 8, 88)}%`, background: p.accentColor }}
                                        />
                                      </div>
                                    </div>
                                    <div className="w-5 h-5 rounded border border-[#1E1B4B]/20 bg-white flex items-center justify-center text-[#1E1B4B] shadow-2xs">
                                      {p.icon}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* ── GREY UNREVEALED CARD (Bottom Slot - "Scroll down to see") ── */
                              <div 
                                className="w-full rounded-2xl bg-[#F4F0E6]/70 border-2 border-dashed border-[#1E1B4B]/20 shadow-xs flex flex-col justify-between overflow-hidden opacity-75"
                                style={{ height: '165px' }}
                              >
                                <div className="w-full py-1.5 px-3.5 bg-[#E8DFC8]/60 border-b border-[#1E1B4B]/10 flex items-center justify-between select-none">
                                  <span className="font-mono text-[10.5px] font-bold text-[#1E1B4B]/50 uppercase tracking-wider">
                                    {p.platformNumber}
                                  </span>
                                  <div className="flex items-center gap-1 opacity-35">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E1B4B]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E1B4B]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E1B4B]" />
                                  </div>
                                </div>

                                <div className="flex flex-col items-center justify-center py-2 space-y-1 text-center px-3">
                                  <div className="w-8 h-8 rounded-full bg-[#1E1B4B]/10 flex items-center justify-center text-[#1E1B4B]/70 shadow-2xs">
                                    <Compass className="w-4 h-4 text-[#EA580C] animate-pulse" />
                                  </div>
                                  <span className="font-mono text-[10.5px] font-black uppercase tracking-wider text-[#1E1B4B]/70">
                                    SCROLL TO REVEAL
                                  </span>
                                  <span className="font-sans text-[9px] text-[#1E1B4B]/50 font-medium leading-tight">
                                    Scroll down to drive train here
                                  </span>
                                </div>

                                <div className="p-2.5 border-t border-[#1E1B4B]/10 flex items-center justify-between opacity-50">
                                  <div className="h-1 bg-[#1E1B4B]/15 rounded-full flex-grow mr-2" />
                                  <div className="w-4 h-4 rounded border border-[#1E1B4B]/20 bg-white/50" />
                                </div>
                              </div>
                            )}
                          </>
                        ) : null}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* ── BOTTOM FEATURE PILL STRIP ── */}
          <div className="relative w-full max-w-[1520px] mx-auto z-20 pt-1">
            <div className="flex items-center justify-between gap-4 border border-[#1E1B4B]/15 rounded-2xl py-2 px-4 bg-white/85 backdrop-blur-sm shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-4 gap-4 w-full divide-x divide-[#1E1B4B]/10">
                <div className="flex items-center gap-2 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#4F46E5] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.2">
                    <div className="font-display font-black text-xs uppercase tracking-wider text-[#1E1B4B]">
                      MULTIPLE MATCH DAYS
                    </div>
                    <p className="text-[10px] text-[#1E1B4B]/70 font-medium leading-tight font-sans line-clamp-1">
                      Teams face off, present, and earn points.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.2">
                    <div className="font-display font-black text-xs uppercase tracking-wider text-[#1E1B4B]">
                      IMPROVE & ADAPT
                    </div>
                    <p className="text-[10px] text-[#1E1B4B]/70 font-medium leading-tight font-sans line-clamp-1">
                      Use feedback to build smarter and stronger.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#D97706] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Trophy className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.2">
                    <div className="font-display font-black text-xs uppercase tracking-wider text-[#1E1B4B]">
                      CLIMB THE STANDINGS
                    </div>
                    <p className="text-[10px] text-[#1E1B4B]/70 font-medium leading-tight font-sans line-clamp-1">
                      League points decide your fate.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#4F46E5] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.2">
                    <div className="font-display font-black text-xs uppercase tracking-wider text-[#1E1B4B]">
                      ONLY THE BEST
                    </div>
                    <p className="text-[10px] text-[#1E1B4B]/70 font-medium leading-tight font-sans line-clamp-1">
                      Top teams battle for the ultimate glory.
                    </p>
                  </div>
                </div>
              </div>

              {/* Coastal Temple & Palm Trees Sketch on bottom right */}
              <div className="hidden xl:block absolute right-2 -bottom-1 opacity-45 pointer-events-none">
                <CoastalTempleSketch className="w-28 h-16" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2B. MOBILE VERSION: GORGEOUS VERTICAL TRAIN JOURNEY                       */}
      {/* ========================================================================= */}
      <section 
        ref={mobileContainerRef}
        className="block md:hidden py-6 px-3.5 max-w-lg mx-auto select-none relative overflow-hidden"
      >
        
        {/* Mobile Header Banner */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border-2 border-[#1E1B4B]/20 text-[10.5px] font-mono font-black text-[#1E1B4B] uppercase tracking-wider shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping" />
            <MousePointer className="w-3 h-3 text-[#4F46E5]" />
            <span>SCROLL DOWN TO DRIVE TRAIN 🚂 ➔</span>
          </div>
          
          <h2 className="font-display font-black text-3xl text-[#1E1B4B] uppercase tracking-tight leading-none">
            TIMELINE
          </h2>
          <p className="text-xs font-medium text-[#1E1B4B]/80">
            Every great journey has milestones. Here&apos;s your{' '}
            <span className="text-[#EA580C] font-black underline decoration-[#EA580C]/40 decoration-2">
              route to glory!
            </span>
          </p>

          <div className="inline-flex items-center gap-1.5 bg-white/90 border border-[#1E1B4B]/15 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#1E1B4B] mt-1">
            <span className="text-[#EA580C]">✦</span>
            <span>PLATFORM 0{mobileActiveIndex + 1}/0{platforms.length} REVEALED</span>
          </div>
        </div>

        {/* Start Station Badge on Mobile */}
        <div className="flex items-center gap-2 pl-3 mb-4">
          <div className="bg-[#1E1B4B] text-white font-mono font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-widest border border-white/20 shadow-xs">
            START
          </div>
          <span className="font-mono text-[10px] text-[#1E1B4B]/60 font-semibold">
            • Scroll down to follow the train journey
          </span>
        </div>

        {/* Vertical Rail Journey List with Progressive Card Reveals */}
        <div className="relative pl-10 space-y-6">
          
          {/* Vertical Dashed Railway Line */}
          <div className="absolute left-[22px] top-2 bottom-4 w-[3px] border-l-[3px] border-dashed border-[#1E1B4B]/35" />

          {/* DYNAMICALLY MOVING STEAM TRAIN ON MOBILE VERTICAL RAIL */}
          <div 
            ref={mobileTrainRef}
            className="absolute pointer-events-none z-30 select-none will-change-transform"
            style={{
              left: '-14px',
              top: '0px',
            }}
          >
            <div className="relative">
              <LocomotiveTrain className="w-20 h-16" />
            </div>
          </div>

          {platforms.map((p, idx) => {
            const isUnlocked = idx <= mobileActiveIndex;
            const isCurrent = idx === mobileActiveIndex;

            return (
              <div key={p.id} className="relative flex items-start gap-3">
                
                {/* Station Node on Vertical Rail */}
                <div 
                  className={`absolute -left-10 top-3.5 w-7 h-7 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 z-20 ${
                    isCurrent
                      ? 'border-[#1E1B4B] bg-white scale-125 shadow-md ring-4 ring-[#EA580C]/25'
                      : isUnlocked 
                        ? 'border-[#1E1B4B] bg-white shadow-xs'
                        : 'border-[#1E1B4B]/35 bg-[#FBF9F2]'
                  }`}
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

                {/* Horizontal Stem Connector */}
                <div className={`w-3 h-[2px] mt-6.5 flex-shrink-0 ${isUnlocked ? 'bg-[#1E1B4B]' : 'bg-[#1E1B4B]/30'}`} />

                {/* Card: Revealed vs Grey Scroll-Down-To-See */}
                {isUnlocked ? (
                  /* ── REVEALED CARD (Mobile) ── */
                  <div className="flex-grow rounded-2xl bg-white border-2 border-[#1E1B4B] shadow-md overflow-hidden flex flex-col animate-comic-card-flip">
                    
                    {/* Header Bar */}
                    <div 
                      className="w-full py-1.5 px-3 flex items-center justify-between select-none"
                      style={{ background: p.headerBg, color: p.headerTextColor }}
                    >
                      <span className="font-mono text-[10.5px] font-black tracking-wider uppercase">
                        {p.platformNumber}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between border-b border-[#1E1B4B]/10 pb-1.5">
                        <div className="flex items-center gap-2">
                          <span 
                            className="font-display font-black text-2xl leading-none"
                            style={{ color: p.accentColor }}
                          >
                            {p.day}
                          </span>
                          <div className="flex flex-col">
                            <span className="bg-[#1E1B4B] text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded leading-none">
                              {p.month}
                            </span>
                            <span className="font-mono text-[8.5px] font-bold text-[#1E1B4B]/70 tracking-tight mt-0.5 leading-tight">
                              {p.yearDay}
                            </span>
                          </div>
                        </div>
                        <span className="text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-[#1E1B4B]/80 border border-[#1E1B4B]/10">
                          ✦ {p.tag}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="font-display font-black text-xs text-[#1E1B4B] uppercase tracking-tight leading-snug">
                          {p.title}
                        </h4>
                        <p className="font-sans text-[10.5px] text-[#1E1B4B]/75 font-medium leading-tight">
                          {p.subtitle}
                        </p>
                      </div>

                      <div className="pt-1.5 border-t border-[#1E1B4B]/10 flex items-center justify-between">
                        <div className="flex items-center gap-1 flex-grow pr-2">
                          <div className="h-1 bg-[#1E1B4B]/15 rounded-full flex-grow relative">
                            <span 
                              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-xs"
                              style={{ left: `${Math.min(idx * 12 + 8, 88)}%`, background: p.accentColor }}
                            />
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded border border-[#1E1B4B]/20 bg-white flex items-center justify-center text-[#1E1B4B] shadow-2xs">
                          {p.icon}
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* ── GREY UNREVEALED CARD (Mobile - "Scroll down to see") ── */
                  <div className="flex-grow rounded-2xl bg-[#F4F0E6]/70 border-2 border-dashed border-[#1E1B4B]/20 shadow-xs overflow-hidden flex flex-col opacity-75">
                    
                    {/* Muted Header Bar */}
                    <div className="w-full py-1 px-3 bg-[#E8DFC8]/60 border-b border-[#1E1B4B]/10 flex items-center justify-between select-none">
                      <span className="font-mono text-[10px] font-bold text-[#1E1B4B]/50 uppercase tracking-wider">
                        {p.platformNumber}
                      </span>
                      <div className="flex items-center gap-1 opacity-35">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E1B4B]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E1B4B]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E1B4B]" />
                      </div>
                    </div>

                    {/* Center: Scroll Down to Reveal Message */}
                    <div className="flex flex-col items-center justify-center gap-1 py-3 text-center px-2">
                      <div className="w-6 h-6 rounded-full bg-[#1E1B4B]/10 flex items-center justify-center text-[#1E1B4B]/60">
                        <Compass className="w-3.5 h-3.5 text-[#EA580C]" />
                      </div>
                      <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#1E1B4B]/70">
                        SCROLL DOWN TO REVEAL
                      </span>
                    </div>

                    <div className="p-2 border-t border-[#1E1B4B]/10 flex items-center justify-between opacity-50">
                      <div className="h-1 bg-[#1E1B4B]/15 rounded-full flex-grow mr-2" />
                      <div className="w-4 h-4 rounded border border-[#1E1B4B]/20 bg-white/50" />
                    </div>

                  </div>
                )}

              </div>
            );
          })}

        </div>

        {/* Mobile 4 Feature Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-[#1E1B4B]/15 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#4F46E5] flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-xs uppercase text-[#1E1B4B]">MULTIPLE MATCH DAYS</div>
              <p className="text-[10px] text-[#1E1B4B]/70 font-medium">Teams face off, present, and earn points.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-[#1E1B4B]/15 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-xs uppercase text-[#1E1B4B]">IMPROVE & ADAPT</div>
              <p className="text-[10px] text-[#1E1B4B]/70 font-medium">Use feedback to build smarter & stronger.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-[#1E1B4B]/15 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#D97706] flex items-center justify-center flex-shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-xs uppercase text-[#1E1B4B]">CLIMB THE STANDINGS</div>
              <p className="text-[10px] text-[#1E1B4B]/70 font-medium">League points decide your fate.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-[#1E1B4B]/15 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#4F46E5] flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-xs uppercase text-[#1E1B4B]">ONLY THE BEST</div>
              <p className="text-[10px] text-[#1E1B4B]/70 font-medium">Top teams battle for ultimate glory.</p>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. OFFICIAL EVALUATION GUIDELINES & NOTES (Preserved Section)             */}
      {/* ========================================================================= */}
      <section className="py-8 px-4 sm:px-6 lg:px-10 max-w-[1520px] mx-auto">
        <div 
          className="reveal-on-scroll stagger-1 border border-[#1E1B4B]/10 rounded-3xl p-5 sm:p-7 shadow-sm"
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
      {/* 4. "THE LEAGUE NEVER STOPS" + 4 FEATURE BADGES + CHAMPIONS ARTWORK        */}
      {/* ========================================================================= */}
      <section className="pt-4 pb-0 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto relative z-10">
        
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
              decoding="async"
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
      {/* 5. SOLID ROYAL PURPLE FOOTER WITH UNIFIED DRY-BRUSH PAINT STROKE          */}
      {/* ========================================================================= */}
      <footer className="reveal-on-scroll w-full select-none mt-2 sm:mt-3 relative">
        
        {/* Unified Vector Dry-Brush Paint Stroke Header */}
        <div className="w-full overflow-hidden leading-none relative -mb-[1px] pointer-events-none select-none">
          <svg 
            viewBox="0 0 1440 56" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-8 sm:h-11 lg:h-13 block"
            preserveAspectRatio="none"
          >
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

        {/* Solid Royal Purple Footer Body */}
        <div className="w-full bg-[#321668] text-white pt-2 pb-8 px-4 sm:px-8 lg:px-12 relative shadow-2xl">
          
          <div className="max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10">
            
            {/* Left: White Geometric Shield Logo + Circular Social Outline Icons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <div className="flex items-center gap-2.5">
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
