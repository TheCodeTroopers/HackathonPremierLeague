import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PageRoute } from '../../types';
import { HPL_IMAGES } from '../../assets/images';
import { gsap } from 'gsap';
import { 
  ArrowRight, 
  MessageSquareText, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Target, 
  FileText, 
  ChevronRight,
  Scale,
  Brain,
  Layout,
  Code2,
  Compass,
  Search,
  Star,
  Bell,
  ShieldCheck
} from 'lucide-react';

interface ProblemStatementsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const EVALUATION_CRITERIA = [
  { name: 'Problem Understanding', icon: Brain, bg: 'bg-purple-50 text-[#582A9C] border-purple-200' },
  { name: 'Functionality', icon: CheckCircle2, bg: 'bg-emerald-50 text-[#0F766E] border-emerald-200' },
  { name: 'User Experience', icon: Layout, bg: 'bg-blue-50 text-blue-800 border-blue-200' },
  { name: 'Technical Implementation', icon: Code2, bg: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  { name: 'Innovation', icon: Sparkles, bg: 'bg-amber-50 text-amber-900 border-amber-200' },
  { name: 'Practicality', icon: Compass, bg: 'bg-rose-50 text-rose-800 border-rose-200' }
];

// ── PROBLEM STATEMENT DATA (CLEANED: NO TECH STACK, NO TIPS, NO DELIVERABLES) ──
interface ProblemStatementData {
  id: string;
  number: string;
  themeColor: string;
  badgeBg: string;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  background: string;
  objective: string;
  coreFeatures: string[];
  optionalFeatures: string[];
  exampleScenario?: {
    title: string;
    details: string;
    formula: string;
  };
  useCases: string[];
}

const PROBLEM_DETAILS: Record<string, ProblemStatementData> = {
  'ps-1': {
    id: 'ps-1',
    number: '01',
    themeColor: '#582A9C',
    badgeBg: 'bg-[#582A9C]',
    title: 'WeatherGPT: Conversational AI for Weather Forecasting, Alerts, and Climate Information',
    category: 'Software & Applied AI',
    subtitle: 'Conversational Meteorology & Early Warning Intelligence',
    summary: 'Build an intelligent conversational AI solution that provides accurate weather forecasts, severe weather alerts, and climate insights through natural language interactions.',
    background: 'Weather information is currently distributed across multiple portals, bulletins, satellite products, and forecast systems, making it difficult for common users, researchers, disaster managers, and government agencies to quickly obtain actionable insights. There is a need for an intelligent conversational platform that can provide real-time weather information, forecasts, warnings, climate analysis, and decision support in natural language.',
    objective: 'Develop an AI-powered chatbot platform named WeatherGPT that integrates meteorological datasets, forecasting models, and disaster warning systems to provide accurate, contextual, and multilingual weather intelligence through conversational interfaces.',
    coreFeatures: [
      'Real-time weather information retrieval across geographical coordinates',
      'Natural language querying for micro-climate & daily/weekly forecasts',
      'Extreme weather alerts and early warning dissemination',
      'Location-based forecasting and personalized advisory generation',
      'Conversational user experience and contextual query handling'
    ],
    optionalFeatures: [
      'Integration with numerical weather prediction (NWP) models such as GFS/WRF',
      'Multilingual support for regional Indian languages',
      'Voice-enabled conversational interaction for rural accessibility',
      'Climate trend and historical weather analysis for researchers'
    ],
    useCases: [
      'Farmers seeking localized crop-weather advisories and sowing timelines',
      'Aviation & marine weather briefings for safe navigation',
      'Municipal flood / cyclone warning automated dissemination',
      'Smart city weather monitoring and climate analytics'
    ]
  },

  'ps-2': {
    id: 'ps-2',
    number: '02',
    themeColor: '#0F766E',
    badgeBg: 'bg-[#0F766E]',
    title: 'Rural Market Intelligence Platform',
    category: 'Agritech & Market Intelligence',
    subtitle: 'Transparent Price Discovery & Decision Support for Farmers',
    summary: 'Develop a data-driven solution that empowers farmers and rural businesses with real-time market insights, price trends, demand prediction, and supply chain intelligence to make smarter decisions and maximize income.',
    background: 'Small and marginal farmers often face difficulty in deciding where to sell their agricultural produce. Prices for the same crop can differ across nearby markets, while transportation costs, distance, and market conditions can significantly affect the farmer\'s final earnings. Farmers may not have an easy way to compare these factors before making a selling decision.',
    objective: 'Develop a Rural Market Intelligence Platform that helps farmers compare different market options and make a more informed decision about where to sell their produce based on crop, quantity, and location.',
    coreFeatures: [
      'Market-wise crop price discovery across nearby regional APMC markets',
      'Nearby market options with distance and route insights',
      'Transparent price comparison across multiple market centers',
      'Estimated transportation cost calculation based on produce volume & distance',
      'Projected net revenue calculation: Market Price × Quantity − Transportation Cost'
    ],
    optionalFeatures: [],
    exampleScenario: {
      title: 'Example Scenario: 500 kg Tomatoes',
      details: 'A farmer has 500 kg of tomatoes and wants to decide between three nearby markets. Instead of displaying only the market offering the highest price, the platform helps the farmer understand the overall opportunity by calculating net return.',
      formula: 'Net Return = (Market Price × Quantity) − Transportation Cost − Distance Expenses'
    },
    useCases: [
      'Smallholder vegetable farmers deciding the most profitable local mandi',
      'Cooperative procurement vs. direct wholesale market comparison',
      'Optimizing vehicle hiring and transport pooling for rural clusters'
    ]
  },

  'ps-3': {
    id: 'ps-3',
    number: '03',
    themeColor: '#EA580C',
    badgeBg: 'bg-[#EA580C]',
    title: 'Internship and Opportunity Aggregator',
    category: 'EdTech & Opportunity Discovery',
    subtitle: 'Centralized Opportunity Discovery & Intelligent Recommendation',
    summary: 'Build a smart platform that aggregates internships, jobs, scholarships, and opportunities from across the web, and helps students discover the right opportunities based on their skills, interests, and goals.',
    background: 'Students discover internships, hackathons, scholarships, fellowships and competitions across many websites and messaging groups. Opportunities can be missed because there is no single personalized place to find relevant items and deadlines.',
    objective: 'Build an opportunity discovery platform that collects structured opportunities from a set of provided or simulated sources. Each opportunity should include category, eligibility, deadline, location or mode, and relevant skills. Students should be able to define preferences and receive ranked matches. Teams may implement recommendation logic based on profile attributes and deadline proximity. Scraping real websites is optional; the core problem is information normalization, filtering and recommendation.',
    coreFeatures: [
      'Opportunity data model and ingestion pipeline across provided or simulated sources',
      'Search and filtering (category, eligibility, deadline, location/mode, and relevant skills)',
      'Student preference profile (define preferences, skills, and eligibility criteria)',
      'Recommendation logic and deadline tracking based on profile attributes & deadline proximity'
    ],
    optionalFeatures: [],
    useCases: [
      'Students finding internships, fellowships, and scholarships tailored to their profile and eligibility',
      'Hackers and competitive coders tracking upcoming hackathons, rules, and submission deadlines',
      'Campus student communities receiving centralized curated opportunity feeds without noise',
      'Placement and career development cells disseminating verified job and internship openings'
    ]
  }
};

export const ProblemStatementsPage: React.FC<ProblemStatementsPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [selectedPs, setSelectedPs] = useState<ProblemStatementData | null>(null);

  // Lock background scroll, reset modal scroll, and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPs(null);
    };

    if (selectedPs) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Ensure modal body starts at top
      setTimeout(() => {
        if (modalBodyRef.current) {
          modalBodyRef.current.scrollTop = 0;
        }
      }, 0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPs]);

  // ── GSAP ENTRANCE, CONTINUOUS KINETIC & BIDIRECTIONAL SCROLL ANIMATIONS ──
  useEffect(() => {
    const gsapObj = (window as any).gsap || gsap;
    const ScrollTriggerObj = (window as any).ScrollTrigger;

    if (gsapObj) {
      if (ScrollTriggerObj) {
        gsapObj.registerPlugin(ScrollTriggerObj);
      }

      // 1. Hero Entrance Timeline
      const tl = gsapObj.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.anim-ps-title-1',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'back.out(1.8)' }
      )
      .fromTo('.anim-ps-title-2',
        { y: 35, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.8)' },
        '-=0.45'
      )
      .fromTo('.anim-ps-round-badge',
        { scale: 0.8, opacity: 0, rotate: -4 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.55, ease: 'back.out(2)' },
        '-=0.3'
      )
      .fromTo('.anim-ps-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      )
      .fromTo('.anim-ps-hero-art',
        { scale: 0.94, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
        '-=0.5'
      );

      // 2. Continuous Micro-Animations
      gsapObj.to('.anim-ps-star-spin', {
        rotate: 360,
        duration: 24,
        repeat: -1,
        ease: 'none',
      });

      gsapObj.to('.anim-ps-rocket-float', {
        y: -6,
        x: 4,
        duration: 2.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsapObj.to('.anim-ps-airplane-float', {
        y: -5,
        x: 3,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3. Bidirectional ScrollTrigger Animations (Reveal smoothly on scroll up and down)
      if (ScrollTriggerObj) {
        gsapObj.fromTo('.scroll-ps-divider',
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.scroll-ps-divider',
              start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
          }
        );

        // Individual Cards Stagger & Smooth Reveal
        gsapObj.utils.toArray('.scroll-ps-card').forEach((card: any, i: number) => {
          gsapObj.fromTo(card,
            { y: 45, opacity: 0, scale: 0.97 },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              },
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              delay: i * 0.08,
            }
          );
        });

        // CTA Banner Scroll Reveal
        gsapObj.fromTo('.scroll-ps-cta',
          { y: 40, opacity: 0, scale: 0.97 },
          {
            scrollTrigger: {
              trigger: '.scroll-ps-cta',
              start: 'top 90%',
              toggleActions: 'play reverse play reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
          }
        );
      }
    }

    return () => {
      if ((window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.getAll().forEach((t: any) => t.kill());
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#FAF6EE] text-[#1E1B4B] selection:bg-[#FBBF24] selection:text-[#1E1B4B] overflow-x-hidden relative"
    >
      {/* Halftone Dot Matrix Texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(30, 27, 75, 0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-14">

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 1. HERO SECTION: DISPLAY LETTERING & MASTER TEAM COLLABORATION ART   */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          {/* Left Column: Heading, Round 1 Marker & Description */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            
            {/* Main Typographic Lockup */}
            <div className="space-y-0 tracking-tight">
              <h1 className="anim-ps-title-1 font-display font-black italic text-4xl xs:text-5xl sm:text-6xl lg:text-[68px] uppercase text-[#1E1B4B] leading-[0.88] block">
                PROBLEM
              </h1>
              <div className="anim-ps-title-2 font-display font-black italic text-4xl xs:text-5xl sm:text-6xl lg:text-[68px] uppercase text-[#582A9C] leading-[0.88] block -mt-1 sm:-mt-2">
                STATEMENTS
              </div>
            </div>

            {/* Sub-badge: ROUND 1 with marker speed lines */}
            <div className="anim-ps-round-badge flex items-center justify-center lg:justify-start gap-2 pt-1 select-none">
              <span className="text-[#F59E0B] font-marker text-xl sm:text-2xl tracking-widest">
                —
              </span>
              <span className="font-marker text-xl sm:text-2xl text-[#1E1B4B] tracking-wider uppercase">
                ROUND 1
              </span>
              <span className="text-[#F59E0B] font-marker text-xl sm:text-2xl tracking-widest">
                —
              </span>
            </div>

            {/* Description Paragraph */}
            <div className="anim-ps-desc space-y-1.5 font-sans text-sm sm:text-base text-[#1E1B4B]/80 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 pt-1">
              <p>Real-world challenges.</p>
              <p>Innovative solutions.</p>
              <p className="font-semibold text-[#1E1B4B]">
                Choose a problem statement that inspires you and build something impactful!
              </p>
            </div>

            {/* Hand-drawn Floating Paper Airplane Doodle */}
            <div className="hidden lg:flex items-center gap-3 pt-2 text-[#1E1B4B]/60 select-none">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="opacity-75 anim-ps-airplane-float">
                <path d="M 6 22 L 42 6 L 26 42 L 20 28 Z" fill="#F59E0B" fillOpacity="0.25" stroke="#1E1B4B" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 42 6 L 20 28" stroke="#1E1B4B" strokeWidth="2" />
                <path d="M 6 36 Q 14 38 20 28" stroke="#1E1B4B" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
              <span className="font-mono text-xs font-bold text-[#582A9C]">
                ✦ Explore All Tracks & Challenges
              </span>
            </div>

          </div>

          {/* Right Column: Hero Illustration */}
          <div className="lg:col-span-7 anim-ps-hero-art relative flex items-center justify-center">
            
            {/* Blasting Space Rocket Doodle Top Right */}
            <div className="absolute -top-6 -right-2 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 select-none pointer-events-none anim-ps-rocket-float hidden sm:block z-20">
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
                <path d="M 18 46 Q 12 56 16 62 Q 22 58 24 50 Z" fill="#EF4444" />
                <path d="M 19 48 Q 15 54 18 58 Q 22 56 23 51 Z" fill="#F59E0B" />
                <path d="M 22 48 L 18 34 C 18 20 34 10 46 8 C 48 20 38 36 24 48 Z" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2.2" strokeLinejoin="round" />
                <circle cx="33" cy="23" r="5" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2" />
                <path d="M 20 36 L 10 42 L 18 46 Z" fill="#2563EB" stroke="#1E1B4B" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M 32 46 L 38 56 L 42 46 Z" fill="#2563EB" stroke="#1E1B4B" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M 38 16 C 42 12 46 8 46 8 C 46 8 42 12 38 16 Z" fill="#EF4444" />
                <path d="M 52 4 L 54 0 L 56 4 L 60 6 L 56 8 L 54 12 L 52 8 L 48 6 Z" fill="#F59E0B" />
              </svg>
            </div>

            {/* Seamless Hero Artwork */}
            <div 
              className="relative w-full max-w-2xl select-none overflow-hidden"
              style={{
                maskImage: 'radial-gradient(ellipse 84% 78% at 50% 50%, black 50%, rgba(0,0,0,0.9) 68%, rgba(0,0,0,0.2) 84%, transparent 96%)',
                WebkitMaskImage: 'radial-gradient(ellipse 84% 78% at 50% 50%, black 50%, rgba(0,0,0,0.9) 68%, rgba(0,0,0,0.2) 84%, transparent 96%)',
              }}
            >
              <svg 
                viewBox="215 65 445 245" 
                className="w-full h-auto select-none block" 
                style={{ mixBlendMode: 'multiply' }}
              >
                <image 
                  href={HPL_IMAGES.psMockup} 
                  width="682" 
                  height="1024" 
                />
              </svg>
            </div>

          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 2. SECTION DIVIDER & HEADER: ROUND 1 - PROBLEM STATEMENTS            */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div className="scroll-ps-divider text-center space-y-3 py-2">
          <div className="flex items-center justify-center gap-3 select-none">
            <span className="font-marker text-xl sm:text-2xl text-[#1E1B4B]/40">
              —
            </span>
            <h2 className="font-marker text-2xl sm:text-3xl text-[#1E1B4B] uppercase tracking-wide">
              ROUND 1 – PROBLEM STATEMENTS
            </h2>
            <span className="font-marker text-xl sm:text-2xl text-[#1E1B4B]/40">
              —
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/75 font-medium max-w-xl mx-auto leading-relaxed">
            These are the challenges for the first round.<br />
            Analyze the problem, validate your ideas, and build solutions that create real impact.
          </p>

          {/* Universal Evaluation Criteria Bar for All Problem Statements */}
          <div className="max-w-4xl mx-auto pt-2">
            <div className="bg-white/80 border border-[#1E1B4B]/15 rounded-2xl p-3 sm:p-4 shadow-sketch-xs">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#582A9C] mb-2.5">
                <Scale className="w-4 h-4 text-[#582A9C]" />
                <span>Evaluation Criteria For All Problem Statements</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {EVALUATION_CRITERIA.map((crit, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border font-sans text-xs font-bold ${crit.bg} shadow-2xs`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75"></span>
                    <span>{crit.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 3. PROBLEM STATEMENT CARDS (BESPOKE GENERATED ILLUSTRATIONS)         */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div className="space-y-8 sm:space-y-10">

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* CARD 01: WeatherGPT (Royal Purple Theme)                          */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <div className="scroll-ps-card border border-[#582A9C]/30 rounded-[24px] sm:rounded-[28px] bg-[#FAF6EE] shadow-none relative hover:border-[#582A9C]/60 hover:shadow-sketch-sm transition-all group overflow-hidden">
            
            {/* Top-Left Attached Number Ribbon (01) */}
            <div className="absolute top-0 left-0 bg-[#582A9C] text-white font-display font-black text-lg sm:text-2xl px-4 sm:px-6 py-1.5 sm:py-2 rounded-br-2xl select-none z-20 shadow-2xs">
              01
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center p-4 sm:p-7 pt-12 sm:pt-7 gap-5 lg:gap-8">
              
              {/* Left Column: Authentic Original WeatherGPT Robot Artwork (Feathered Edge, Zero Box) */}
              <div className="lg:col-span-4 flex items-center justify-center select-none p-1">
                <div 
                  className="w-full max-w-[240px] sm:max-w-[260px] transform group-hover:scale-105 transition-transform duration-300 select-none"
                  style={{
                    maskImage: 'radial-gradient(ellipse 90% 86% at 50% 50%, black 72%, rgba(0,0,0,0.6) 88%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 90% 86% at 50% 50%, black 72%, rgba(0,0,0,0.6) 88%, transparent 100%)',
                  }}
                >
                  <svg 
                    viewBox="70 374 178 143" 
                    className="w-full h-auto select-none block" 
                    style={{ mixBlendMode: 'multiply' }}
                  >
                    <image href={HPL_IMAGES.psMockup} width="682" height="1024" />
                  </svg>
                </div>
              </div>

              {/* Center Column: Problem Title, Description & Action Button */}
              <div className="lg:col-span-5 space-y-3 text-left">
                <h3 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] leading-tight tracking-tight">
                  WeatherGPT: Conversational AI for Weather Forecasting, Alerts, and Climate Information
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/80 font-medium leading-relaxed">
                  Build an intelligent conversational AI solution that provides accurate weather forecasts, severe weather alerts, and climate insights through natural language interactions.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  {['AI/ML', 'NLP', 'Data Science', 'Climate Tech'].map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-full border border-purple-300 text-[#582A9C] bg-purple-50/60 font-sans text-xs font-bold tracking-tight select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Evaluation Criteria Mini-List */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#582A9C]">
                    <Scale className="w-3.5 h-3.5 text-[#582A9C]" />
                    <span>Evaluated On 6 Core Pillars:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Problem Understanding',
                      'Functionality',
                      'User Experience',
                      'Technical Implementation',
                      'Innovation',
                      'Practicality'
                    ].map((crit, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md bg-[#582A9C]/10 text-[#582A9C] border border-[#582A9C]/20"
                      >
                        {crit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: View Details & Direct Register */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
                  <button
                    onClick={() => setSelectedPs(PROBLEM_DETAILS['ps-1'])}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#582A9C]/10 hover:bg-[#582A9C] text-[#582A9C] hover:text-white font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer border border-[#582A9C]/30 text-center"
                  >
                    <span>SHOW FULL DETAILS & CRITERIA</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      try {
                        localStorage.setItem('hpl_selected_ps', PROBLEM_DETAILS['ps-1'].title);
                      } catch (e) {}
                      onNavigate('register');
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-amber-400 text-[#1E1B4B] font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sketch-xs hover:shadow-sketch-sm text-center"
                  >
                    <span>REGISTER FOR PS 01</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Key Focus Areas (Dashed Divider) */}
              <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-dashed border-[#2C2723]/25 pt-4 lg:pt-0 lg:pl-6 space-y-2.5 text-left">
                <div className="font-display font-bold text-xs uppercase tracking-wider text-[#582A9C]">
                  Key Focus Areas
                </div>

                <ul className="space-y-2 text-xs text-[#1E1B4B]/80 font-medium">
                  <li className="flex items-center gap-2.5">
                    <MessageSquareText className="w-4 h-4 text-[#582A9C] flex-shrink-0" />
                    <span>Real-time forecasts & updates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-[#582A9C] flex-shrink-0" />
                    <span>Severe weather alerts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4 text-[#582A9C] flex-shrink-0" />
                    <span>Climate insights & analytics</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-[#582A9C] flex-shrink-0" />
                    <span>Conversational user experience</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* CARD 02: Rural Market Intelligence (Forest Green Theme)          */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <div className="scroll-ps-card border border-[#0F766E]/30 rounded-[24px] sm:rounded-[28px] bg-[#FAF6EE] shadow-none relative hover:border-[#0F766E]/60 hover:shadow-sketch-sm transition-all group overflow-hidden">
            
            {/* Top-Left Attached Number Ribbon (02) */}
            <div className="absolute top-0 left-0 bg-[#0F766E] text-white font-display font-black text-lg sm:text-2xl px-4 sm:px-6 py-1.5 sm:py-2 rounded-br-2xl select-none z-20 shadow-2xs">
              02
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center p-4 sm:p-7 pt-12 sm:pt-7 gap-5 lg:gap-8">
              
              {/* Left Column: Authentic Original Rural Market Farmer Artwork (Feathered Edge, Zero Box) */}
              <div className="lg:col-span-4 flex items-center justify-center select-none p-1">
                <div 
                  className="w-full max-w-[240px] sm:max-w-[260px] transform group-hover:scale-105 transition-transform duration-300 select-none"
                  style={{
                    maskImage: 'radial-gradient(ellipse 90% 86% at 50% 50%, black 72%, rgba(0,0,0,0.6) 88%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 90% 86% at 50% 50%, black 72%, rgba(0,0,0,0.6) 88%, transparent 100%)',
                  }}
                >
                  <svg 
                    viewBox="56 546 196 152" 
                    className="w-full h-auto select-none block" 
                    style={{ mixBlendMode: 'multiply' }}
                  >
                    <image href={HPL_IMAGES.psMockup} width="682" height="1024" />
                  </svg>
                </div>
              </div>

              {/* Center Column: Problem Title, Description & Action Button */}
              <div className="lg:col-span-5 space-y-3 text-left">
                <h3 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] leading-tight tracking-tight">
                  Rural Market Intelligence
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/80 font-medium leading-relaxed">
                  Develop a data-driven solution that empowers farmers and rural businesses with real-time market insights, price trends, demand prediction, and supply chain intelligence to make smarter decisions and maximize income.
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  {['Data Analytics', 'IoT', 'Agritech', 'Business Intelligence'].map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-full border border-emerald-300 text-[#0F766E] bg-emerald-50/60 font-sans text-xs font-bold tracking-tight select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Evaluation Criteria Mini-List */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#0F766E]">
                    <Scale className="w-3.5 h-3.5 text-[#0F766E]" />
                    <span>Evaluated On 6 Core Pillars:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Problem Understanding',
                      'Functionality',
                      'User Experience',
                      'Technical Implementation',
                      'Innovation',
                      'Practicality'
                    ].map((crit, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20"
                      >
                        {crit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: View Details & Direct Register */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
                  <button
                    onClick={() => setSelectedPs(PROBLEM_DETAILS['ps-2'])}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#0F766E]/10 hover:bg-[#0F766E] text-[#0F766E] hover:text-white font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer border border-[#0F766E]/30 text-center"
                  >
                    <span>SHOW FULL DETAILS & CRITERIA</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      try {
                        localStorage.setItem('hpl_selected_ps', PROBLEM_DETAILS['ps-2'].title);
                      } catch (e) {}
                      onNavigate('register');
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-amber-400 text-[#1E1B4B] font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sketch-xs hover:shadow-sketch-sm text-center"
                  >
                    <span>REGISTER FOR PS 02</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Key Focus Areas (Dashed Divider) */}
              <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-dashed border-[#2C2723]/25 pt-4 lg:pt-0 lg:pl-6 space-y-2.5 text-left">
                <div className="font-display font-bold text-xs uppercase tracking-wider text-[#0F766E]">
                  Key Focus Areas
                </div>

                <ul className="space-y-2 text-xs text-[#1E1B4B]/80 font-medium">
                  <li className="flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-[#0F766E] flex-shrink-0" />
                    <span>Price tracking & trends</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4 text-[#0F766E] flex-shrink-0" />
                    <span>Demand forecasting & insights</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-[#0F766E] flex-shrink-0" />
                    <span>Supply chain transparency</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-[#0F766E] flex-shrink-0" />
                    <span>Rural empowerment</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* CARD 03: Internship & Opportunity Aggregator (Sunset Orange Theme) */}
          {/* ───────────────────────────────────────────────────────────────── */}
          <div className="scroll-ps-card border border-[#EA580C]/30 rounded-[24px] sm:rounded-[28px] bg-[#FAF6EE] shadow-none relative hover:border-[#EA580C]/60 hover:shadow-sketch-sm transition-all group overflow-hidden">
            
            {/* Top-Left Attached Number Ribbon (03) */}
            <div className="absolute top-0 left-0 bg-[#EA580C] text-white font-display font-black text-lg sm:text-2xl px-4 sm:px-6 py-1.5 sm:py-2 rounded-br-2xl select-none z-20 shadow-2xs">
              03
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center p-4 sm:p-7 pt-12 sm:pt-7 gap-5 lg:gap-8">
              
              {/* Left Column: Authentic Hand-Drawn Editorial Illustration (Feathered Edge, Zero Box) */}
              <div className="lg:col-span-4 flex items-center justify-center select-none p-1">
                <div 
                  className="w-full max-w-[240px] sm:max-w-[270px] transform group-hover:scale-105 transition-transform duration-300 select-none"
                  style={{
                    maskImage: 'radial-gradient(ellipse 90% 86% at 50% 50%, black 72%, rgba(0,0,0,0.6) 88%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 90% 86% at 50% 50%, black 72%, rgba(0,0,0,0.6) 88%, transparent 100%)',
                  }}
                >
                  <img
                    src={HPL_IMAGES.ps3Aggregator}
                    alt="Internship and Opportunity Aggregator Artwork"
                    className="w-full h-auto object-contain block select-none"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>
              </div>

              {/* Center Column: Problem Title, Description & Action Button */}
              <div className="lg:col-span-5 space-y-3 text-left">
                <h3 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] leading-tight tracking-tight">
                  Internship and Opportunity Aggregator
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/80 font-medium leading-relaxed">
                  Build a smart platform that aggregates internships, jobs, scholarships, and opportunities from across the web, and helps students discover the right opportunities based on their skills, interests, and goals.
                </p>

                {/* Tech Stack / Focus Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  {['Web Development', 'AI/ML', 'Data Aggregation', 'UX/UI'].map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 rounded-full border border-orange-300 text-[#EA580C] bg-orange-50/60 font-sans text-xs font-bold tracking-tight select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mini Evaluated Ribbon */}
                <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs text-[#1E1B4B]/70 font-sans">
                  <span className="font-bold text-[#EA580C] flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Evaluated On 6 Core Pillars:</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-1">
                    {['Problem Understanding', 'Functionality', 'UX', 'Tech Implementation', 'Innovation', 'Practicality'].map((crit, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md bg-[#EA580C]/10 text-[#EA580C] border border-[#EA580C]/20"
                      >
                        {crit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: View Details & Direct Register */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
                  <button
                    onClick={() => setSelectedPs(PROBLEM_DETAILS['ps-3'])}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#EA580C]/10 hover:bg-[#EA580C] text-[#EA580C] hover:text-white font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer border border-[#EA580C]/30 text-center"
                  >
                    <span>SHOW FULL DETAILS & CRITERIA</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      try {
                        localStorage.setItem('hpl_selected_ps', 'PS 03: Internship and Opportunity Aggregator');
                      } catch (e) {}
                      onNavigate('register');
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-amber-400 text-[#1E1B4B] font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sketch-xs hover:shadow-sketch-sm text-center"
                  >
                    <span>REGISTER FOR PS 03</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Key Focus Areas (Dashed Divider) */}
              <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-dashed border-[#2C2723]/25 pt-4 lg:pt-0 lg:pl-6 space-y-2.5 text-left">
                <div className="font-display font-bold text-xs uppercase tracking-wider text-[#EA580C]">
                  Key Focus Areas
                </div>

                <ul className="space-y-2 text-xs text-[#1E1B4B]/80 font-medium">
                  <li className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-[#EA580C] flex-shrink-0" />
                    <span>Smart search & filtering</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Star className="w-4 h-4 text-[#EA580C] flex-shrink-0" />
                    <span>Personalized recommendations</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Bell className="w-4 h-4 text-[#EA580C] flex-shrink-0" />
                    <span>Real-time alerts & notifications</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#EA580C] flex-shrink-0" />
                    <span>Trusted & verified opportunities</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 4. CALL-TO-ACTION BANNER: PICK YOUR CHALLENGE. BUILD THE FUTURE.     */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="scroll-ps-cta rounded-[24px] sm:rounded-[28px] bg-[#311059] border-2 border-[#1E1B4B] p-6 sm:p-8 shadow-sketch relative overflow-hidden text-white">
          
          {/* Subtle Ambient Golden Glow */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-35 -z-0"
            style={{
              background: 'radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 60%)'
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            
            {/* Left: Golden Championship Trophy */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 select-none">
              <img
                src={HPL_IMAGES.sponsorsTrophy}
                alt="Golden Championship Trophy"
                className="w-full h-full object-contain filter drop-shadow-md transform hover:scale-105 transition-transform"
              />
            </div>

            {/* Center: Bold Title Lockup */}
            <div className="flex-1 text-center md:text-left space-y-1">
              <h2 className="font-display font-black italic text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight">
                PICK YOUR CHALLENGE.
              </h2>
              <div className="font-marker text-2xl sm:text-3xl text-[#FBBF24] tracking-wide block">
                BUILD THE FUTURE.
              </div>
              <p className="font-sans text-xs sm:text-sm text-purple-200 font-medium pt-0.5">
                Each problem is an opportunity to innovate, collaborate, and create lasting impact.
              </p>
            </div>

            {/* Right: Register Now Action Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => onNavigate('register')}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-[#FBBF24] hover:bg-amber-400 text-[#1E1B4B] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-sketch-sm hover:shadow-sketch hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer group select-none"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </section>

      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 5. FULL PROBLEM STATEMENT SPECIFICATION MODAL (PORTAL TO BODY: FIXED IN VIEWPORT) */}
      {selectedPs && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] overflow-y-auto overflow-x-hidden flex justify-center items-start sm:items-center p-3 sm:p-5 md:p-8 bg-[#1E1B4B]/80 backdrop-blur-sm animate-in fade-in duration-200"
          style={{ overscrollBehavior: 'contain' }}
        >
          {/* Clickable Backdrop */}
          <div 
            onClick={() => setSelectedPs(null)}
            className="fixed inset-0 -z-10 cursor-pointer"
            aria-label="Close modal backdrop"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl my-auto bg-[#FAF6EE] border-2 sm:border-3 border-[#1E1B4B] rounded-[20px] sm:rounded-[28px] shadow-sketch-xl z-10 text-[#1E1B4B] flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3.5rem)] overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Fixed / Sticky Header Lockup */}
            <div className="flex-shrink-0 bg-[#FAF6EE] px-4 py-3.5 sm:px-6 sm:py-4 border-b-2 border-[#1E1B4B]/15 flex items-start justify-between gap-3 select-none">
              <div className="space-y-1 pr-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-white font-display font-black text-xs ${selectedPs.badgeBg}`}>
                    PS {selectedPs.number}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-[#582A9C] uppercase tracking-wider">
                    {selectedPs.category}
                  </span>
                </div>
                <h3 className="font-display font-black text-base xs:text-lg sm:text-2xl text-[#1E1B4B] leading-tight">
                  {selectedPs.title}
                </h3>
                <p className="font-marker text-xs sm:text-sm text-[#EA580C]">
                  {selectedPs.subtitle}
                </p>
              </div>

              {/* Close Button - Always visible, never requires scrolling up */}
              <button
                onClick={() => setSelectedPs(null)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E1B4B]/10 hover:bg-[#1E1B4B] hover:text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-2xs hover:scale-105 active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body - Resets to top when opened */}
            <div ref={modalBodyRef} className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-6 overscroll-contain">
              {/* 1. Background & Context */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#582A9C]">
                  <FileText className="w-4 h-4" />
                  <span>1. Background & Context</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/85 font-medium leading-relaxed bg-white/60 p-3.5 sm:p-4 rounded-xl border border-[#2C2723]/15">
                  {selectedPs.background}
                </p>
              </div>

              {/* 2. Primary Objective */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#0F766E]">
                  <Target className="w-4 h-4" />
                  <span>2. Primary Objective</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/85 font-medium leading-relaxed bg-emerald-50/50 p-3.5 sm:p-4 rounded-xl border border-[#0F766E]/20">
                  {selectedPs.objective}
                </p>
              </div>

              {/* 3. Core Requirements vs. Optional Innovation Features */}
              {selectedPs.optionalFeatures && selectedPs.optionalFeatures.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Core Features */}
                  <div className="space-y-2 bg-white/70 p-3.5 sm:p-4 rounded-xl border border-[#2C2723]/15">
                    <div className="font-display font-black text-xs uppercase tracking-wider text-[#1E1B4B] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Core Requirements</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#1E1B4B]/85 font-medium">
                      {selectedPs.coreFeatures.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Optional Innovation Features */}
                  <div className="space-y-2 bg-amber-50/60 p-3.5 sm:p-4 rounded-xl border-2 border-[#F59E0B]/40">
                    <div className="font-display font-black text-xs uppercase tracking-wider text-[#B45309] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                        <span>Innovation Enhancements</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#F59E0B] text-white text-[10px] font-mono font-bold uppercase">
                        OPTIONAL
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#1E1B4B]/85 font-medium">
                      {selectedPs.optionalFeatures.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#EA580C] font-bold">★</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                /* Single Clean Full-Width Card for PS without optional features */
                <div className="space-y-2 bg-white/70 p-3.5 sm:p-4 rounded-xl border border-[#2C2723]/15">
                  <div className="font-display font-black text-xs uppercase tracking-wider text-[#1E1B4B] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Core Requirements & Minimum Expected Scope</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1E1B4B]/85 font-medium pt-1">
                    {selectedPs.coreFeatures.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#FAF6EE]/80 p-2.5 rounded-lg border border-[#2C2723]/10">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 4. Example Scenario (if present) */}
              {selectedPs.exampleScenario && (
                <div className="space-y-2 bg-blue-50/50 p-3.5 sm:p-4 rounded-xl border border-blue-200">
                  <div className="font-display font-black text-xs uppercase tracking-wider text-blue-900">
                    {selectedPs.exampleScenario.title}
                  </div>
                  <p className="font-sans text-xs text-blue-950/80 font-medium leading-relaxed">
                    {selectedPs.exampleScenario.details}
                  </p>
                  <div className="bg-white/80 p-2.5 rounded-lg border border-blue-200 font-mono text-xs font-bold text-blue-900 break-words">
                    Formula: {selectedPs.exampleScenario.formula}
                  </div>
                </div>
              )}

              {/* 5. Target Use Cases */}
              <div className="space-y-2 bg-white/50 p-3.5 sm:p-4 rounded-xl border border-[#2C2723]/15">
                <div className="font-display font-black text-xs uppercase tracking-wider text-[#1E1B4B]">
                  Key Real-World Use Cases
                </div>
                <ul className="space-y-1 text-xs text-[#1E1B4B]/80 font-medium">
                  {selectedPs.useCases.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#582A9C]">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. Evaluation Criteria (Names Only, Responsive Grid) */}
              <div className="space-y-2.5 bg-white/70 p-3.5 sm:p-4 rounded-xl border border-[#1E1B4B]/15">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-[#1E1B4B]/10">
                  <div className="flex items-center gap-2 font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#582A9C]">
                    <Scale className="w-4 h-4 text-[#582A9C]" />
                    <span>Evaluation Criteria</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B45309] bg-[#F59E0B]/20 border border-[#F59E0B]/30 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                    Universal For All Problem Statements
                  </span>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {EVALUATION_CRITERIA.map((crit, idx) => {
                    const Icon = crit.icon;
                    return (
                      <div 
                        key={idx}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border font-sans text-xs font-bold ${crit.bg} shadow-2xs`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{crit.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Fixed / Sticky Footer Lockup */}
            <div className="flex-shrink-0 bg-[#FAF6EE] px-4 py-3 sm:px-6 sm:py-3.5 border-t-2 border-[#1E1B4B]/15 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 select-none">
              <button
                onClick={() => setSelectedPs(null)}
                className="px-4 py-2 rounded-xl bg-white border border-[#2C2723]/30 font-display font-bold text-xs uppercase tracking-wider text-[#1E1B4B] hover:bg-[#FAF6EE] text-center cursor-pointer transition-colors"
              >
                Close Window
              </button>

              <button
                onClick={() => {
                  try {
                    localStorage.setItem('hpl_selected_ps', selectedPs.title);
                  } catch (e) {}
                  setSelectedPs(null);
                  onNavigate('register');
                }}
                className="px-5 sm:px-6 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-amber-400 font-display font-black text-xs uppercase tracking-wider text-[#1E1B4B] shadow-sketch-sm hover:shadow-sketch transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>REGISTER FOR THIS CHALLENGE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>,
        document.body
      )}

    </div>
  );
};

export default ProblemStatementsPage;
