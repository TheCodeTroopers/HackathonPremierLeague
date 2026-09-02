import React, { useRef, useEffect, useState, useCallback } from 'react';
import { PageRoute } from '../../types';
import { HPL_IMAGES } from '../../assets/images';
import {
  SparkleDoodle,
  PaperPlaneDoodle,
  CloudDoodle,
  ShootingStarDoodle,
  LightbulbDoodle
} from '../illustrations/MicroDoodles';
import {
  Calendar,
  Trophy,
  Users,
  TrendingUp,
  BarChart3,
  Award,
  Sparkles,
  ArrowRight,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Terminal,
  Lock
} from 'lucide-react';


interface TimelinePageProps {
  onNavigate: (page: PageRoute) => void;
}

// ─── Platform data ────────────────────────────────────────────────────────────
interface Platform {
  id: string;          // "01" … "06"
  label: string;       // e.g. "Registration Starts"
  day: string;         // "01"
  month: string;       // "JUN"
  year: string;        // "2026"
  weekday: string;     // "MONDAY"
  desc: string;        // short description
  accentColor: string; // hex
  headerBg: string;    // hex for card header
  locked: boolean;
}

const PLATFORMS: Platform[] = [
  {
    id: '01',
    label: 'Registration Starts',
    day: '01', month: 'SEP', year: '2026', weekday: 'TUESDAY',
    desc: 'The Race Begins — Register, Team Up, Get Set to Hack!',
    accentColor: '#EA580C',
    headerBg: '#1E1B4B',
    locked: false,
  },
  {
    id: '02',
    label: 'Registration Closes',
    day: '05', month: 'SEP', year: '2026', weekday: 'SATURDAY',
    desc: 'Idea & video submission portal locks. Initial screening begins!',
    accentColor: '#7C3AED',
    headerBg: '#7C3AED',
    locked: false,
  },
  {
    id: '03',
    label: 'Grand Inauguration',
    day: '08', month: 'SEP', year: '2026', weekday: 'TUESDAY',
    desc: 'Shortlisted squads announced. Official season opening ceremony!',
    accentColor: '#2563EB',
    headerBg: '#2563EB',
    locked: false,
  },
  {
    id: '04',
    label: 'Part 1 Evaluation',
    day: '12', month: 'SEP', year: '2026', weekday: 'SATURDAY',
    desc: 'Live panel review + team Q&A. Sprint 1 scoring begins at 5:30 PM.',
    accentColor: '#059669',
    headerBg: '#059669',
    locked: true,
  },
  {
    id: '05',
    label: 'Part 2 Evaluation',
    day: '19', month: 'SEP', year: '2026', weekday: 'FRIDAY',
    desc: 'Build deeper. Video submitted, 24-hr jury window + live Q&A.',
    accentColor: '#D97706',
    headerBg: '#D97706',
    locked: true,
  },
  {
    id: '06',
    label: 'Grand Finale',
    day: '30', month: 'SEP', year: '2026', weekday: 'WEDNESDAY',
    desc: 'Live on-stage. ₹30,000+ prize pool. Champion Trophy lifted!',
    accentColor: '#E11D48',
    headerBg: '#1E1B4B',
    locked: true,
  },
];

// ─── SVG Train ────────────────────────────────────────────────────────────────
const TrainSVG: React.FC<{ className?: string; isMoving: boolean }> = ({ className, isMoving }) => (
  <svg
    viewBox="0 0 120 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ overflow: 'visible' }}
  >
    {/* Speed lines behind the train */}
    {isMoving && (
      <g opacity="0.55">
        <line x1="-50" y1="34" x2="-8" y2="34" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="-44" y1="40" x2="-6" y2="40" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-38" y1="28" x2="-10" y2="28" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" />
        <line x1="-60" y1="37" x2="-12" y2="37" stroke="#EA580C" strokeWidth="1" strokeLinecap="round" />
      </g>
    )}

    {/* Smoke puffs from chimney */}
    <circle cx="28" cy="6" r="4" fill="#9CA3AF" className="anim-smoke-1" style={{ transformOrigin: '28px 6px' }} />
    <circle cx="32" cy="2" r="3" fill="#D1D5DB" className="anim-smoke-2" style={{ transformOrigin: '32px 2px' }} />
    <circle cx="24" cy="0" r="2.5" fill="#E5E7EB" className="anim-smoke-3" style={{ transformOrigin: '24px 0px' }} />

    {/* Train body – navy */}
    <rect x="8" y="20" width="88" height="28" rx="4" fill="#1E1B4B" />

    {/* Cab (front section) */}
    <rect x="76" y="14" width="22" height="34" rx="3" fill="#2D2A6E" />

    {/* Windows cab */}
    <rect x="79" y="17" width="14" height="10" rx="2" fill="#BFDBFE" opacity="0.9" />

    {/* Body windows */}
    <rect x="18" y="24" width="12" height="10" rx="2" fill="#BFDBFE" opacity="0.75" />
    <rect x="34" y="24" width="12" height="10" rx="2" fill="#BFDBFE" opacity="0.75" />
    <rect x="50" y="24" width="12" height="10" rx="2" fill="#BFDBFE" opacity="0.75" />

    {/* Chimney */}
    <rect x="24" y="11" width="7" height="10" rx="1.5" fill="#374151" />
    <rect x="22" y="9" width="11" height="4" rx="1" fill="#4B5563" />

    {/* Orange accent stripe */}
    <rect x="8" y="38" width="88" height="5" rx="0" fill="#EA580C" />

    {/* Cowcatcher / front */}
    <path d="M98 36 L112 40 L112 48 L98 48 Z" fill="#374151" />

    {/* Flag on top */}
    <rect x="100" y="8" width="2" height="10" fill="#6B7280" />
    <polygon points="102,8 110,11 102,14" fill="#F59E0B" />

    {/* Under-frame */}
    <rect x="6" y="47" width="92" height="5" rx="2" fill="#111827" />

    {/* Wheels – animated */}
    <circle cx="22" cy="54" r="7" fill="#1F2937" stroke="#6B7280" strokeWidth="1.5" className="anim-train-wheel" />
    <circle cx="22" cy="54" r="3.5" fill="#374151" className="anim-train-wheel" />
    <circle cx="22" cy="54" r="1.5" fill="#9CA3AF" />

    <circle cx="44" cy="54" r="7" fill="#1F2937" stroke="#6B7280" strokeWidth="1.5" className="anim-train-wheel" />
    <circle cx="44" cy="54" r="3.5" fill="#374151" className="anim-train-wheel" />
    <circle cx="44" cy="54" r="1.5" fill="#9CA3AF" />

    <circle cx="66" cy="54" r="7" fill="#1F2937" stroke="#6B7280" strokeWidth="1.5" className="anim-train-wheel" />
    <circle cx="66" cy="54" r="3.5" fill="#374151" className="anim-train-wheel" />
    <circle cx="66" cy="54" r="1.5" fill="#9CA3AF" />

    <circle cx="88" cy="54" r="7" fill="#1F2937" stroke="#6B7280" strokeWidth="1.5" className="anim-train-wheel" />
    <circle cx="88" cy="54" r="3.5" fill="#374151" className="anim-train-wheel" />
    <circle cx="88" cy="54" r="1.5" fill="#9CA3AF" />

    {/* Rail below train */}
    <line x1="0" y1="62" x2="120" y2="62" stroke="#9CA3AF" strokeWidth="2" />
  </svg>
);

// ─── Platform Card ────────────────────────────────────────────────────────────
const PlatformCard: React.FC<{ platform: Platform; above: boolean; progress: number; index: number }> = ({
  platform, above, progress, index
}) => {
  const isVisible = progress > index / PLATFORMS.length - 0.05;
  const { locked, accentColor, headerBg, id, label, day, month, year, weekday, desc } = platform;

  return (
    <div
      className="relative flex flex-col"
      style={{ width: 220, minWidth: 220, flexShrink: 0 }}
    >
      {/* Card */}
      <div
        className="rounded-2xl overflow-hidden flex-1 select-none"
        style={{
          background: locked ? '#F3F4F6' : '#FFFFFF',
          border: locked ? '1.5px solid #D1D5DB' : `1.5px solid ${accentColor}33`,
          boxShadow: locked
            ? '0 2px 12px rgba(0,0,0,0.06)'
            : `0 4px 20px ${accentColor}22, 0 2px 8px rgba(0,0,0,0.06)`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : above ? 'translateY(-16px)' : 'translateY(16px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          transitionDelay: `${index * 0.06}s`,
        }}
      >
        {/* ── Card Header Bar ──────────────────────────────── */}
        <div
          className="px-3 py-2 flex items-center justify-between"
          style={{ background: locked ? '#9CA3AF' : headerBg }}
        >
          <span
            className="font-mono text-[9px] font-black uppercase tracking-widest"
            style={{ color: locked ? '#E5E7EB' : accentColor === '#1E1B4B' ? '#F59E0B' : '#FFFFFF99' }}
          >
            PLATFORM {id}
          </span>
          {/* Traffic-light dots */}
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: locked ? '#6B7280' : '#E11D48' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: locked ? '#6B7280' : '#F59E0B' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: locked ? '#6B7280' : '#22C55E' }} />
          </div>
        </div>

        {/* ── Card Body ───────────────────────────────────── */}
        {locked ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center gap-2">
            <Lock className="w-7 h-7 text-gray-300" />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-gray-400">
              COMING SOON
            </span>
            <span className="font-display font-bold text-xs text-gray-400 mt-1">{label}</span>
          </div>
        ) : (
          <div className="px-3 pt-3 pb-3 space-y-2">
            {/* Date block */}
            <div className="flex items-end gap-2">
              <span
                className="font-display font-black text-4xl leading-none"
                style={{ color: accentColor }}
              >
                {day}
              </span>
              <div className="flex flex-col leading-none pb-0.5">
                <span className="font-display font-black text-base text-[#1E1B4B]">{month}</span>
                <span className="font-mono text-[10px] text-[#1E1B4B]/50 font-bold">{year}</span>
                <span className="font-mono text-[8px] text-[#1E1B4B]/40 font-bold uppercase tracking-wider">{weekday}</span>
              </div>
            </div>

            {/* Title */}
            <p className="font-display font-black text-sm text-[#1E1B4B] leading-snug">{label}</p>

            {/* Desc */}
            <p className="font-sans text-[11px] text-[#1E1B4B]/65 font-medium leading-snug">{desc}</p>

            {/* Footer indicator */}
            <div className="flex items-center justify-between pt-1 border-t border-[#1E1B4B]/08">
              <div className="flex items-center gap-1">
                <div className="w-6 h-2 rounded-full" style={{ background: accentColor }} />
                <div className="w-3 h-2 rounded-full" style={{ background: `${accentColor}55` }} />
              </div>
              <Calendar className="w-3.5 h-3.5" style={{ color: `${accentColor}99` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Trophy SVG ──────────────────────────────────────────────────────────────
const TrophySVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 8 H60 V42 C60 58 40 66 40 66 C40 66 20 58 20 42 Z" fill="#F59E0B" />
    <path d="M20 12 H10 C10 12 8 28 20 34" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M60 12 H70 C70 12 72 28 60 34" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="32" y="66" width="16" height="10" fill="#D97706" />
    <rect x="24" y="76" width="32" height="6" rx="2" fill="#B45309" />
    <path d="M34 30 L38 40 L28 34 H52 L42 40 Z" fill="#FFFFFF" opacity="0.5" />
    <circle cx="55" cy="18" r="4" fill="#FBBF24" opacity="0.7" />
  </svg>
);

// ─── Star SVG ────────────────────────────────────────────────────────────────
const StarSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 2 L23.5 14 L36 14 L26 21.5 L29.5 34 L20 27 L10.5 34 L14 21.5 L4 14 L16.5 14 Z" fill="#F59E0B" />
  </svg>
);

// ─── Palm Tree SVG ───────────────────────────────────────────────────────────
const PalmSVG: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M30 90 C30 90 28 60 26 45" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" />
    <path d="M26 48 C18 30 5 28 8 20 C12 30 22 36 26 48 Z" fill="#374151" />
    <path d="M26 44 C30 22 45 18 46 10 C40 22 30 30 26 44 Z" fill="#374151" />
    <path d="M26 46 C10 42 2 54 0 62 C8 52 20 46 26 46 Z" fill="#4B5563" />
    <path d="M26 46 C40 50 50 42 56 34 C46 46 34 46 26 46 Z" fill="#4B5563" />
    <ellipse cx="26" cy="48" rx="4" ry="3" fill="#9CA3AF" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const TimelinePage: React.FC<TimelinePageProps> = ({ onNavigate }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  // Sticky scroll state
  const stickyOuterRef = useRef<HTMLDivElement>(null);
  const trackInnerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 → 1
  const [trainMoving, setTrainMoving] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Compute how wide the track overflows beyond viewport
  const TRACK_ITEM_WIDTH = 240;   // px per platform slot
  const TRACK_PADDING = 160;      // left padding for train start
  const TOTAL_TRACK_WIDTH = TRACK_PADDING + PLATFORMS.length * TRACK_ITEM_WIDTH + 120;

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // ── Reading-progress bar
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = docH > 0 ? `${(window.scrollY / docH) * 100}%` : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Scroll reveal
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
    document.querySelectorAll('.reveal-on-scroll').forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // ── Sticky horizontal-scroll driver
  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const outer = stickyOuterRef.current;
      if (!outer) return;

      const outerTop = outer.offsetTop;
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;

      // The outer element must be taller than viewport by the "scroll budget"
      const scrollBudget = outer.offsetHeight - viewH;
      // How far we've scrolled into the sticky zone
      const scrolledIn = Math.max(0, scrollY - outerTop);
      const rawPct = scrollBudget > 0 ? Math.min(1, scrolledIn / scrollBudget) : 0;

      setScrollProgress(rawPct);
      setTrainMoving(rawPct > 0.01 && rawPct < 0.99);

      // Drive track translateX
      const track = trackInnerRef.current;
      if (track) {
        const viewW = window.innerWidth;
        const maxShift = TOTAL_TRACK_WIDTH - viewW + 40;
        const shift = rawPct * maxShift;
        track.style.transform = `translateX(-${Math.max(0, shift)}px)`;
      }
    });
  }, [TOTAL_TRACK_WIDTH]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);


  return (
    <div className="min-h-screen bg-[#FBF9F2] text-[#1E1B4B] overflow-x-hidden selection:bg-[#FBBF24] selection:text-[#1E1B4B]">

      {/* ── Scroll progress bar ───────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[9998] bg-transparent pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full rounded-full transition-[width] duration-75 ease-linear"
          style={{ width: '0%', background: 'linear-gradient(90deg, #4F46E5 0%, #EA580C 60%, #F59E0B 100%)' }}
        />
      </div>

      {/* ======================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ======================================================================= */}
      <section className="relative pt-4 pb-2 sm:pt-6 sm:pb-4 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* Left: Heading */}
          <div className="lg:col-span-5 space-y-3 z-10 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-[11px] font-mono font-bold text-[#4F46E5] uppercase tracking-wider shadow-2xs ${hasEntered ? 'hero-anim-pill' : 'hero-pre-enter'}`}>
              <SparkleDoodle className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>OFFICIAL SEASON SCHEDULE</span>
            </div>

            <div className="space-y-0.5">
              <span className={`font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] tracking-tight leading-[0.95] text-[#1E1B4B] uppercase block ${hasEntered ? 'hero-anim-word-1' : 'hero-pre-enter'}`}>
                SEASON
              </span>
              <span className={`font-marker text-[#4F46E5] text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] tracking-tight leading-[0.95] uppercase not-italic block transform -rotate-1 hover:rotate-0 transition-transform ${hasEntered ? 'hero-anim-word-2' : 'hero-pre-enter'}`}>
                TIMELINE
              </span>
            </div>

            <p className={`text-base sm:text-xl lg:text-2xl font-black font-display text-[#1E1B4B]/90 tracking-tight ${hasEntered ? 'hero-anim-sub' : 'hero-pre-enter'}`}>
              Every great journey has milestones.
            </p>

            <div className={`flex items-center justify-center lg:justify-start gap-2 text-base sm:text-xl font-bold font-display text-[#1E1B4B]/80 pt-0.5 ${hasEntered ? 'hero-anim-dates' : 'hero-pre-enter'}`}>
              <span>Here's your</span>
              <span className="text-[#EA580C] font-black tracking-wide">route to glory!</span>
              <ShootingStarDoodle className="w-6 h-6 sm:w-8 sm:h-8 text-[#F59E0B] inline-block -mt-1 ml-0.5 animate-comic-wiggle" />
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end select-none">
            <div className="hidden md:block absolute -top-3 left-[26%] pointer-events-none z-0">
              <CloudDoodle className="w-20 h-12 text-[#64748B]/45 animate-float" />
            </div>
            <div className="hidden sm:block absolute -top-4 right-2 lg:right-6 pointer-events-none z-20">
              <PaperPlaneDoodle className="w-9 h-9 sm:w-11 sm:h-11 text-[#1E1B4B]/75 -rotate-12 transform hover:translate-x-1 transition-transform" />
            </div>
            <div className="absolute inset-0 pointer-events-none -z-10 rounded-full blur-3xl opacity-75"
              style={{ background: 'radial-gradient(circle at 60% 50%, rgba(246,240,226,0.95) 0%, rgba(251,249,242,0.5) 65%, transparent 88%)' }}
            />
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
              <div className="absolute inset-x-0 bottom-0 h-4 sm:h-5 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #FBF9F2 20%, transparent 100%)' }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================================= */}
      {/* 2. STICKY HORIZONTAL TRAIN TIMELINE                                      */}
      {/* ======================================================================= */}

      {/* ── Desktop: Sticky scroll version ──────────────────────────────────── */}
      <div
        ref={stickyOuterRef}
        className="hidden md:block relative timeline-sticky-outer"
        style={{ height: '500vh' }}  /* scroll budget = 500vh - 100vh = 400vh of horizontal travel */
      >
        {/* Sticky viewport frame */}
        <div
          className="sticky top-0 overflow-hidden"
          style={{
            height: '100vh',
            background: 'linear-gradient(160deg, #FAF6EE 0%, #F3EDD8 60%, #FAF6EE 100%)',
          }}
        >

          {/* ── Paper grain texture ─── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ── Decorative background elements ─── */}

          {/* Trophy — top right */}
          <div className="absolute top-8 right-10 pointer-events-none select-none z-10 animate-float">
            <TrophySVG className="w-20 h-24 opacity-75" />
          </div>

          {/* Stars */}
          <div className="absolute top-12 left-16 pointer-events-none select-none z-10 animate-float" style={{ animationDelay: '0.5s' }}>
            <StarSVG className="w-6 h-6 opacity-70" />
          </div>
          <div className="absolute bottom-32 left-32 pointer-events-none select-none z-10 animate-float" style={{ animationDelay: '1s' }}>
            <StarSVG className="w-4 h-4 opacity-50" />
          </div>

          {/* Lightbulb doodle */}
          <div className="absolute top-16 right-48 pointer-events-none select-none z-10 animate-float" style={{ animationDelay: '0.8s' }}>
            <LightbulbDoodle className="w-8 h-8 text-[#F59E0B] opacity-60" />
          </div>

          {/* Palm trees bottom */}
          <div className="absolute bottom-0 right-24 pointer-events-none select-none z-10">
            <PalmSVG className="w-12 h-20 opacity-40" />
          </div>
          <div className="absolute bottom-0 right-44 pointer-events-none select-none z-10">
            <PalmSVG className="w-9 h-16 opacity-30" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <div className="absolute bottom-0 left-20 pointer-events-none select-none z-10">
            <PalmSVG className="w-10 h-18 opacity-25" />
          </div>

          {/* Purple brush stroke top-center (decorative) */}
          <div className="absolute top-0 left-[30%] pointer-events-none select-none z-0 opacity-30">
            <svg viewBox="0 0 320 60" fill="none" className="w-80 h-14">
              <path d="M0 30 Q80 5 160 25 T320 20" stroke="#7C3AED" strokeWidth="22" strokeLinecap="round" opacity="0.35" />
            </svg>
          </div>

          {/* Paper plane doodle */}
          <div className="absolute top-20 left-[45%] pointer-events-none select-none z-10 animate-float" style={{ animationDelay: '1.2s' }}>
            <PaperPlaneDoodle className="w-8 h-8 text-[#1E1B4B]/50 -rotate-12" />
          </div>

          {/* ── TITLE overlay ─── */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none select-none">
            <h2 className="font-display font-black text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-none">
              <span className="text-[#1E1B4B]">TIME</span>
              <span className="text-[#4F46E5]">LINE</span>
            </h2>
            <p className="font-sans text-sm text-[#1E1B4B]/60 font-medium mt-1">
              Every great journey has milestones. Here's your{' '}
              <span className="text-[#EA580C] font-black">route to glory!</span>
            </p>
          </div>

          {/* ── Scrolling Track + Cards ─── */}
          <div className="absolute inset-0 flex items-center" style={{ top: 80 }}>
            {/* This is the moving inner rail */}
            <div
              ref={trackInnerRef}
              className="relative flex items-center will-change-transform"
              style={{
                width: TOTAL_TRACK_WIDTH,
                height: 380,
                transition: 'transform 0.05s linear',
                paddingLeft: TRACK_PADDING,
              }}
            >

              {/* ── DASHED RAIL LINE ──────────────────────────── */}
              <div
                className="absolute"
                style={{
                  top: '50%',
                  left: 0,
                  width: '100%',
                  height: 3,
                  transform: 'translateY(-50%)',
                  background: 'repeating-linear-gradient(90deg, #9CA3AF 0px, #9CA3AF 18px, transparent 18px, transparent 30px)',
                  borderRadius: 2,
                }}
              />

              {/* ── TRAIN ──────────────────────────────────────── */}
              <div
                className="absolute z-30"
                style={{
                  bottom: 'calc(50% - 2px)',  /* sits on the rail */
                  left: 20,
                  transform: `translateX(${Math.min(
                    (TOTAL_TRACK_WIDTH - TRACK_PADDING - 140),
                    scrollProgress * (TOTAL_TRACK_WIDTH - TRACK_PADDING - 160)
                  )}px)`,
                  transition: 'transform 0.05s linear',
                }}
              >
                <div className={trainMoving ? 'anim-train-chug' : ''}>
                  <TrainSVG className="w-32 h-20" isMoving={trainMoving} />
                </div>
                {/* START label */}
                <div
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded font-mono text-[10px] font-black uppercase tracking-widest text-white"
                  style={{ background: '#1E1B4B', whiteSpace: 'nowrap' }}
                >
                  START
                </div>
              </div>

              {/* ── PLATFORMS ─────────────────────────────────── */}
              {PLATFORMS.map((platform, i) => {
                const above = i % 2 === 0;   // odd index = above track
                const nodeX = TRACK_PADDING + i * TRACK_ITEM_WIDTH + TRACK_ITEM_WIDTH / 2 - 8;
                const isActive = !platform.locked;

                return (
                  <div
                    key={platform.id}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: nodeX - (TRACK_ITEM_WIDTH / 2) + 8,
                      width: TRACK_ITEM_WIDTH - 20,
                      top: above ? undefined : 'calc(50% + 28px)',
                      bottom: above ? 'calc(50% + 28px)' : undefined,
                    }}
                  >
                    {/* Card above track */}
                    {above && (
                      <PlatformCard
                        platform={platform}
                        above={true}
                        progress={scrollProgress}
                        index={i}
                      />
                    )}

                    {/* Vertical connector line */}
                    <div
                      style={{
                        width: 2,
                        height: 28,
                        background: platform.locked
                          ? '#D1D5DB'
                          : `linear-gradient(${above ? '180deg' : '0deg'}, ${platform.accentColor}, ${platform.accentColor}44)`,
                        flexShrink: 0,
                        alignSelf: 'center',
                      }}
                    />

                    {/* Node circle */}
                    <div className="relative flex-shrink-0" style={{ alignSelf: 'center' }}>
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-full anim-node-ripple"
                          style={{ background: platform.accentColor, opacity: 0.3 }}
                        />
                      )}
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white z-10 relative flex items-center justify-center"
                        style={{
                          background: platform.locked ? '#9CA3AF' : platform.accentColor,
                          boxShadow: isActive ? `0 0 0 3px ${platform.accentColor}33` : 'none',
                        }}
                      >
                        {!isActive && <div className="w-1.5 h-1.5 rounded-full bg-white/60" />}
                        {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>

                    {/* Vertical connector below node (for below-cards) */}
                    {!above && (
                      <div
                        style={{
                          width: 2,
                          height: 28,
                          background: platform.locked
                            ? '#D1D5DB'
                            : `linear-gradient(180deg, ${platform.accentColor}44, ${platform.accentColor})`,
                          flexShrink: 0,
                          alignSelf: 'center',
                        }}
                      />
                    )}

                    {/* Card below track */}
                    {!above && (
                      <PlatformCard
                        platform={platform}
                        above={false}
                        progress={scrollProgress}
                        index={i}
                      />
                    )}
                  </div>
                );
              })}

            </div>
          </div>

          {/* ── Scroll hint at bottom ────────────────────────── */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none select-none z-20"
            style={{ opacity: scrollProgress < 0.05 ? 1 : 0, transition: 'opacity 0.4s ease' }}
          >
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#1E1B4B]/50">
              Scroll to ride the timeline
            </span>
            <div className="flex flex-col items-center gap-0.5 animate-bounce">
              <div className="w-4 h-6 rounded-full border-2 border-[#1E1B4B]/30 flex items-start justify-center pt-1">
                <div className="w-1 h-2 rounded-full bg-[#4F46E5]/60" />
              </div>
            </div>
          </div>

          {/* ── Progress done badge ──────────────────────────── */}
          <div
            className="absolute bottom-8 right-8 pointer-events-none select-none z-20"
            style={{ opacity: scrollProgress > 0.92 ? 1 : 0, transition: 'opacity 0.5s ease' }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4F46E5] text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-lg">
              <span>✓</span>
              <span>All Platforms Viewed — Scroll to Continue</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile: Touch-scrollable strip ──────────────────────────────────── */}
      <div className="md:hidden relative py-8 px-4" style={{ background: 'linear-gradient(160deg, #FAF6EE 0%, #F3EDD8 100%)' }}>
        <div className="mb-4 text-center">
          <h2 className="font-display font-black text-4xl tracking-tight">
            <span className="text-[#1E1B4B]">TIME</span>
            <span className="text-[#4F46E5]">LINE</span>
          </h2>
          <p className="text-xs text-[#1E1B4B]/55 mt-1 font-mono font-bold uppercase tracking-wider">← Swipe to explore all platforms →</p>
        </div>

        {/* Mobile dashed track */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-none pb-4" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="relative flex items-center gap-0" style={{ width: PLATFORMS.length * 248 + 80, height: 420 }}>
              {/* Rail */}
              <div className="absolute"
                style={{
                  top: '50%', left: 0, width: '100%', height: 3,
                  background: 'repeating-linear-gradient(90deg, #9CA3AF 0px, #9CA3AF 14px, transparent 14px, transparent 24px)',
                  transform: 'translateY(-50%)'
                }}
              />

              {/* Mini train */}
              <div className="absolute z-30" style={{ bottom: 'calc(50% - 2px)', left: 8 }}>
                <TrainSVG className="w-20 h-12" isMoving={false} />
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded font-mono text-[9px] font-black uppercase text-white bg-[#1E1B4B] whitespace-nowrap">START</div>
              </div>

              {/* Platform cards */}
              {PLATFORMS.map((platform, i) => {
                const above = i % 2 === 0;
                const xPos = 80 + i * 248;
                return (
                  <div key={platform.id} className="absolute flex flex-col items-center"
                    style={{
                      left: xPos, width: 220,
                      top: above ? undefined : 'calc(50% + 22px)',
                      bottom: above ? 'calc(50% + 22px)' : undefined,
                    }}
                  >
                    {above && <PlatformCard platform={platform} above={true} progress={1} index={i} />}
                    <div style={{ width: 2, height: 22, background: platform.locked ? '#D1D5DB' : platform.accentColor, alignSelf: 'center' }} />
                    <div className="w-4 h-4 rounded-full border-2 border-white flex-shrink-0"
                      style={{ background: platform.locked ? '#9CA3AF' : platform.accentColor }}
                    />
                    {!above && <div style={{ width: 2, height: 22, background: platform.locked ? '#D1D5DB' : platform.accentColor, alignSelf: 'center' }} />}
                    {!above && <PlatformCard platform={platform} above={false} progress={1} index={i} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 3. "THE LEAGUE NEVER STOPS" + 4 FEATURE BADGES + CHAMPIONS ARTWORK       */}
      {/* ======================================================================= */}
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

          {/* Feature badges */}
          <div
            className="reveal-on-scroll stagger-2 flex-1 w-full border border-[#1E1B4B]/10 rounded-3xl p-6 sm:p-7 mb-1 lg:mb-2 shadow-sm"
            style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(4px)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#1E1B4B]/10">

              <div className="space-y-2 sm:pr-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#4F46E5] flex items-center justify-center shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#1E1B4B]">MULTIPLE MATCH DAYS</div>
                <p className="text-xs text-[#1E1B4B]/75 font-medium leading-relaxed font-sans">Teams face off, present, and earn crucial points in live competitive fixtures.</p>
              </div>

              <div className="space-y-2 pt-3 sm:pt-0 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-2xs">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#1E1B4B]">IMPROVE &amp; ADAPT</div>
                <p className="text-xs text-[#1E1B4B]/75 font-medium leading-relaxed font-sans">Use feedback to build smarter and stronger.</p>
              </div>

              <div className="space-y-2 pt-3 sm:pt-0 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-2xs">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#1E1B4B]">CLIMB THE STANDINGS</div>
                <p className="text-xs text-[#1E1B4B]/75 font-medium leading-relaxed font-sans">League points decide your fate.</p>
              </div>

              <div className="space-y-2 pt-3 sm:pt-0 sm:pl-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center shadow-2xs">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#1E1B4B]">ONLY THE BEST</div>
                <p className="text-xs text-[#1E1B4B]/75 font-medium leading-relaxed font-sans">Top teams battle for the ultimate glory.</p>
              </div>

            </div>
          </div>

          {/* Champions artwork */}
          <div className="reveal-on-scroll stagger-3 w-full lg:w-[440px] xl:w-[500px] flex-shrink-0 flex justify-center lg:justify-end select-none relative z-20 -mb-2 sm:-mb-3">
            <div
              className="absolute inset-0 pointer-events-none -z-10 rounded-full blur-3xl opacity-60"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(246,240,226,0.95) 0%, rgba(251,249,242,0.5) 60%, transparent 85%)' }}
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

      {/* ======================================================================= */}
      {/* 4. FOOTER                                                                */}
      {/* ======================================================================= */}
      <footer className="reveal-on-scroll w-full select-none mt-2 sm:mt-3 relative">

        {/* Paint stroke header */}
        <div className="w-full overflow-hidden leading-none relative -mb-[1px] pointer-events-none select-none">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 sm:h-11 lg:h-13 block" preserveAspectRatio="none">
            <path d="M0,56 L0,22 C35,14 70,26 110,17 C150,11 190,22 235,16 C280,24 325,13 370,19 C415,14 460,24 510,16 C560,22 610,13 660,20 C710,15 760,25 810,17 C860,23 910,14 960,21 C1010,15 1060,25 1115,18 C1170,24 1225,15 1280,22 C1335,16 1390,24 1440,18 L1440,56 Z" fill="#321668" />
            <path d="M0,20 Q120,8 240,16 T480,12 T720,17 T960,11 T1200,16 T1440,12" stroke="#321668" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
            <path d="M10,14 Q160,5 310,11 T620,7 T930,12 T1240,6 T1430,10" stroke="#321668" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <path d="M20,9 Q180,2 340,6 T700,2 T1060,5 T1420,3" stroke="#321668" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
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

        <div className="w-full bg-[#321668] text-white pt-2 pb-8 px-4 sm:px-8 lg:px-12 relative shadow-2xl">
          <div className="max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10">

            {/* Left: Logo + socials */}
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
                  <span className="font-display font-black text-sm sm:text-base tracking-widest uppercase block text-white leading-none">HPL</span>
                  <span className="font-display text-[8.5px] tracking-wider uppercase text-white/80 block mt-1 font-semibold">HACKATHON PREMIER LEAGUE</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[
                  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
                  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
                  { href: 'https://github.com', label: 'GitHub', Icon: Github },
                  { href: 'https://youtube.com', label: 'YouTube', Icon: Youtube },
                ].map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="w-7 h-7 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Center: CTA */}
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

            {/* Right: Powered by */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-1.5">
              <div className="font-mono text-[9px] font-bold text-white/70 uppercase tracking-widest">POWERED BY</div>
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 text-white/90">
                {[
                  { Icon: Terminal, label: 'CodeTroopers', color: 'text-white/80' },
                  { Icon: Sparkles, label: 'IGNITE', color: 'text-[#F59E0B]' },
                  { Icon: Award, label: 'AIKYA', color: 'text-white/80' },
                ].map(({ Icon, label, color }, i, arr) => (
                  <React.Fragment key={label}>
                    <span className="flex items-center gap-1 font-display font-black text-[11px] uppercase tracking-wider hover:text-white transition-colors">
                      <Icon className={`w-3.5 h-3.5 ${color}`} />
                      {label}
                    </span>
                    {i < arr.length - 1 && <span className="text-white/40">•</span>}
                  </React.Fragment>
                ))}
                <span className="text-white/40">•</span>
                <span className="font-display font-bold text-[10px] uppercase tracking-wider hover:text-white transition-colors">IEEE SMVITM</span>
                <span className="text-white/40">•</span>
                <span className="font-display font-bold text-[10px] uppercase tracking-wider hover:text-white transition-colors">ISTE Chapter</span>
              </div>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
};
