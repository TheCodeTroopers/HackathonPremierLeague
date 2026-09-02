import React, { useEffect, useRef } from 'react';
import { PageRoute } from '../../types';
import { HPL_IMAGES } from '../../assets/images';
import { gsap } from 'gsap';
import { 
  Calendar, 
  ArrowRight, 
  Clock, 
  Trophy, 
  Sparkles, 
  Lightbulb, 
  Code2, 
  Users,
  Star
} from 'lucide-react';

interface MentorsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const MentorsPage: React.FC<MentorsPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── GSAP CINEMATIC ENTRANCE & SCROLL REVEAL ANIMATIONS ──
  useEffect(() => {
    const gsapObj = (window as any).gsap || gsap;
    const ScrollTriggerObj = (window as any).ScrollTrigger;

    if (gsapObj) {
      if (ScrollTriggerObj) {
        gsapObj.registerPlugin(ScrollTriggerObj);
      }

      // ── HERO ENTRANCE TIMELINE ──
      const tl = gsapObj.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.anim-mentor-pill',
        { y: -20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5 }
      )
      .fromTo('.anim-mentor-title-1',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' },
        '-=0.3'
      )
      .fromTo('.anim-mentor-title-2',
        { y: 35, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.8)' },
        '-=0.4'
      )
      .fromTo('.anim-mentor-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      )
      .fromTo('.anim-mentor-hero-img',
        { scale: 0.94, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      );

      // ── CONTINUOUS KINETIC TEXT & ICON ANIMATIONS ──
      // 1. Continuous breathing and lively comic pulse on "REVEALING SOON"
      gsapObj.to('.anim-mentor-title-2', {
        scale: 1.036,
        rotate: -1.2,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2,
      });

      // 2. Continuous rotation/twinkle on Golden Star
      gsapObj.to('.anim-star-twinkle', {
        rotate: 360,
        duration: 22,
        repeat: -1,
        ease: 'none',
      });

      // 3. Continuous gentle hover float on pointer arrow
      gsapObj.to('.anim-pointer-arrow', {
        x: 4,
        y: -3,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ── SCROLLTRIGGER ANIMATIONS ──
      if (ScrollTriggerObj) {
        // Reveal Date Card
        gsapObj.fromTo('.scroll-date-card',
          { y: 35, opacity: 0, scale: 0.98 },
          {
            scrollTrigger: {
              trigger: '.scroll-date-card',
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
          }
        );

        // Section header
        gsapObj.fromTo('.scroll-panel-header',
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.scroll-panel-header',
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          }
        );

        // 3 Feature Cards (Vertical Rectangles, Staggered Pop-In)
        gsapObj.utils.toArray('.scroll-mentor-card').forEach((card: any, idx: number) => {
          gsapObj.fromTo(card,
            { y: 45, opacity: 0, scale: 0.96 },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              delay: idx * 0.1,
              ease: 'back.out(1.4)',
            }
          );
        });

        // Pre-Footer banner
        gsapObj.fromTo('.scroll-stay-tuned',
          { y: 30, opacity: 0, scale: 0.98 },
          {
            scrollTrigger: {
              trigger: '.scroll-stay-tuned',
              start: 'top 92%',
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
    // ── MAIN CANVAS: WARM PARCHMENT CREAM (#F6F3EB) EXACT TO THE ORIGINAL MOCK ──
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#F6F3EB] text-[#1E1B4B] py-8 sm:py-12 px-4 sm:px-6 lg:px-10 relative overflow-hidden selection:bg-[#FBBF24] selection:text-[#1E1B4B]"
    >
      
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 relative z-10">
        
        {/* ════ 1. HERO SECTION: ORGANIC 2-COLUMN LAYOUT WITH RICH DOODLES ════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            
            {/* Pill Badge with Golden Star Doodle */}
            <div className="flex items-center gap-3">
              <div className="anim-mentor-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B1A6B] text-white text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-2xs">
                <span>TECHNICAL ADVISORS & GRAND JURY</span>
              </div>
              {/* Hand-drawn yellow star doodle with continuous twinkle */}
              <div className="anim-star-twinkle inline-block origin-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90">
                  <path d="M12 2 L14.5 8.5 L21.5 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2.5 9 L9.5 8.5 Z" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Main Heading (Exact Original Fonts: Heavy Condensed Italic Sans + Royal Purple Marker with continuous kinetic pulse) */}
            <div className="space-y-1">
              <h1 className="anim-mentor-title-1 font-display font-black italic text-3xl xs:text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#1E1B4B] leading-none">
                MENTORS & JUDGES
              </h1>
              <h2 className="anim-mentor-title-2 font-marker text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-[#582A9C] tracking-wide leading-none inline-block origin-left">
                REVEALING SOON
              </h2>
            </div>

            {/* Description */}
            <p className="anim-mentor-desc font-sans text-sm sm:text-base text-[#1E1B4B]/80 font-medium leading-relaxed max-w-lg">
              We are curating an exceptional panel of senior system architects, startup founders, and engineering leaders from tier-1 tech firms. The full lineup will be unveiled on{' '}
              <span className="font-bold text-[#582A9C]">September 8, 2026</span> alongside the squad shortlist!
            </p>

            {/* Hand-drawn curving dashed pointer arrow with continuous gentle hover */}
            <div className="anim-pointer-arrow hidden lg:flex items-center gap-3 pt-2 text-[#1E1B4B]/70 font-mono text-xs">
              <svg width="110" height="42" viewBox="0 0 110 42" fill="none" className="transform rotate-3">
                <path d="M 4 34 C 45 40 85 28 102 8" stroke="#1E1B4B" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                <path d="M 90 6 L 104 8 L 98 21" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

          </div>

          {/* Right Column: Hero Stage Illustration (Organic On Canvas - Seamless Watercolor Blend, Zero Box Corners) */}
          <div className="lg:col-span-7 anim-mentor-hero-img relative flex items-center justify-center">
            
            <div className="relative w-full max-w-2xl select-none">
              <img
                src={HPL_IMAGES.mentorsHero}
                alt="HPL Mentors & Judges Stage - Revealing Soon with Championship Trophy"
                loading="eager"
                decoding="async"
                className="w-full h-auto object-contain transform group-hover:scale-[1.01] transition-transform duration-500 block select-none"
                style={{
                  maskImage: 'radial-gradient(ellipse 80% 74% at 50% 50%, black 48%, rgba(0,0,0,0.85) 64%, rgba(0,0,0,0.3) 80%, transparent 96%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 80% 74% at 50% 50%, black 48%, rgba(0,0,0,0.85) 64%, rgba(0,0,0,0.3) 80%, transparent 96%)',
                  mixBlendMode: 'multiply',
                }}
              />
            </div>

          </div>

        </div>

        {/* ════ 2. "OFFICIAL REVEAL DATE" BANNER CARD (Warm Tone + Speed Lines) ════ */}
        <div className="scroll-date-card rounded-2xl sm:rounded-3xl border border-[#1E1B4B]/15 bg-[#EDE8DC]/60 backdrop-blur-xs p-5 sm:p-7 shadow-2xs relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            
            {/* Left: Calendar Icon + Details */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              {/* Hand-Drawn Styled Calendar Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#3B1A6B] text-white flex flex-col items-center justify-center flex-shrink-0 shadow-2xs border-2 border-[#1E1B4B]">
                <div className="flex items-center gap-1.5 -mt-1 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
                <Star className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 fill-amber-400" />
              </div>

              <div>
                <span className="font-mono font-bold text-xs uppercase tracking-wider text-[#582A9C]">
                  OFFICIAL REVEAL DATE
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] leading-snug mt-0.5">
                  September 8, 2026 • Inauguration Day
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/70 font-medium mt-0.5">
                  Profiles, professional track records, and mentorship schedules will unlock concurrently with the Season Inauguration.
                </p>
              </div>
            </div>

            {/* Right: CTA Button with Hand-Drawn Speed/Action Lines */}
            <div className="flex items-center gap-3 flex-shrink-0 pt-2 md:pt-0 relative">
              {/* Hand-drawn speed accent lines */}
              <div className="hidden sm:block absolute -top-4 -right-2">
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
                  <line x1="8" y1="20" x2="22" y2="4" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
                  <line x1="14" y1="22" x2="26" y2="10" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4" y1="18" x2="16" y2="6" stroke="#1E1B4B" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              <button
                onClick={() => onNavigate('timeline')}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl bg-[#F6F3EB] border-2 border-[#582A9C] text-[#582A9C] font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VIEW SCHEDULE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* ════ 3. SECTION: "WHAT OUR PANEL BRINGS TO THE LEAGUE" ════ */}
        <div className="space-y-8 pt-2 sm:pt-4">
          
          {/* Section Header with Hand-Drawn Pencil Arrows & Sub-Banner */}
          <div className="scroll-panel-header text-center space-y-3 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <span className="font-marker text-[#F59E0B] text-2xl font-bold">&gt;</span>
              <h2 className="font-display font-black italic text-xl xs:text-2xl sm:text-3xl text-[#1E1B4B] tracking-tight uppercase">
                WHAT OUR PANEL BRINGS TO THE LEAGUE
              </h2>
              <span className="font-marker text-[#F59E0B] text-2xl font-bold">&lt;</span>
            </div>

            {/* Dark Purple Pill Banner */}
            <div className="inline-block px-5 py-1.5 rounded-full bg-[#3B1A6B] text-white text-xs sm:text-sm font-sans font-semibold tracking-normal shadow-2xs">
              Real engineering critique, direct mentorship, and live evaluation rigor.
            </div>
          </div>

          {/* ════ 4. THE 3 FEATURE CARDS (Tall Vertical Rectangles with Rich Doodles & Artworks) ════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            
            {/* ── CARD 1: 24-Hour Review Window (Soft Sage Tint + Notepad & Paper Doodles) ── */}
            <div className="scroll-mentor-card rounded-3xl border border-[#2D7A58]/20 bg-[#EBF3ED] p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-all group relative">
              {/* Top Content */}
              <div className="space-y-3">
                {/* Top Badge: Teal/Green Clock with Surrounding Sketch Doodles */}
                <div className="flex items-center justify-between">
                  {/* Left Notepad Sketch Doodle */}
                  <div className="opacity-70">
                    <svg width="22" height="26" viewBox="0 0 24 28" fill="none">
                      <rect x="3" y="6" width="18" height="20" rx="2" stroke="#1E1B4B" strokeWidth="1.5" strokeDasharray="3 2" />
                      <path d="M7 3 H17 V7 H7 Z" stroke="#1E1B4B" strokeWidth="1.5" fill="#EBF3ED" />
                      <line x1="7" y1="12" x2="17" y2="12" stroke="#1E1B4B" strokeWidth="1.5" />
                      <line x1="7" y1="16" x2="14" y2="16" stroke="#1E1B4B" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Centered Clock Emblem */}
                  <div className="w-14 h-14 rounded-full bg-white/80 border-2 border-[#2D7A58]/30 flex items-center justify-center text-[#2D7A58] shadow-2xs">
                    <Clock className="w-7 h-7 stroke-[2.2]" />
                  </div>

                  {/* Right Floating Paper Sheets Sketch Doodle */}
                  <div className="opacity-70">
                    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                      <rect x="6" y="4" width="16" height="18" rx="2" stroke="#1E1B4B" strokeWidth="1.5" transform="rotate(12 14 13)" />
                      <line x1="9" y1="10" x2="19" y2="12" stroke="#1E1B4B" strokeWidth="1.5" />
                      <line x1="10" y1="14" x2="18" y2="16" stroke="#1E1B4B" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                <h3 className="font-display font-black text-xl text-[#1E1B4B] tracking-tight text-center">
                  24-Hour Review Window
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-600 font-medium leading-relaxed text-center">
                  The panel evaluates your submitted sprint demonstration video with 24 hours of prep before each live round.
                </p>

                {/* Hand-drawn sage green divider stroke */}
                <div className="w-16 h-1 bg-[#2D7A58]/30 rounded-full mx-auto" />
              </div>

              {/* Bottom Illustration: Hand-Drawn Open Laptop Artwork with Feathered Edges */}
              <div className="pt-4 mt-3 flex items-center justify-center overflow-hidden relative">
                <img
                  src={HPL_IMAGES.mentorLaptop}
                  alt="Laptop sprint video evaluation"
                  className="w-full h-48 xs:h-52 sm:h-56 object-contain transform group-hover:scale-103 transition-transform duration-500 block"
                  style={{
                    maskImage: 'radial-gradient(ellipse 88% 85% at 50% 50%, black 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.25) 85%, transparent 98%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 88% 85% at 50% 50%, black 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.25) 85%, transparent 98%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none bg-gradient-to-t from-[#EBF3ED] to-transparent" />
                <div className="absolute inset-y-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-[#EBF3ED] to-transparent" />
                <div className="absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-[#EBF3ED] to-transparent" />
              </div>
            </div>

            {/* ── CARD 2: Live Team Q&A Grilling (Soft Lavender Tint + Question Doodles) ── */}
            <div className="scroll-mentor-card rounded-3xl border border-[#582A9C]/20 bg-[#F1ECF6] p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-all group relative">
              {/* Top Content */}
              <div className="space-y-3">
                {/* Top Badge: Purple Team with Question Mark & Code Window Doodles */}
                <div className="flex items-center justify-between">
                  {/* Left Smartphone/Doc Sketch Doodle */}
                  <div className="opacity-70">
                    <svg width="22" height="26" viewBox="0 0 24 28" fill="none">
                      <rect x="4" y="4" width="16" height="22" rx="3" stroke="#1E1B4B" strokeWidth="1.5" />
                      <circle cx="12" cy="22" r="1" fill="#1E1B4B" />
                    </svg>
                  </div>

                  {/* Centered Avatar Emblem with floating '?' */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-white/80 border-2 border-[#582A9C]/30 flex items-center justify-center text-[#582A9C] shadow-2xs">
                      <Users className="w-7 h-7 stroke-[2.2]" />
                    </div>
                    {/* Floating ? question marks */}
                    <span className="absolute -top-2 -left-1 font-marker text-xs text-[#582A9C]">?</span>
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-marker text-sm text-[#F59E0B]">?</span>
                    <span className="absolute -top-2 -right-1 font-marker text-xs text-[#582A9C]">?</span>
                  </div>

                  {/* Right </> Code Badge Sketch Doodle */}
                  <div className="opacity-70">
                    <div className="px-2 py-1 bg-white/60 border border-[#1E1B4B]/30 rounded-lg text-[10px] font-mono font-bold text-[#1E1B4B]">
                      &lt;/&gt;
                    </div>
                  </div>
                </div>

                <h3 className="font-display font-black text-xl text-[#1E1B4B] tracking-tight text-center">
                  Live Team Q&A Grilling
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-600 font-medium leading-relaxed text-center">
                  Each evaluation round includes interactive Q&A where squads defend tech choices, edge cases, and code quality.
                </p>

                {/* Hand-drawn purple divider stroke */}
                <div className="w-16 h-1 bg-[#582A9C]/30 rounded-full mx-auto" />
              </div>

              {/* Bottom Illustration: Hand-Drawn Student Pitching Artwork with Feathered Edges */}
              <div className="pt-4 mt-3 flex items-center justify-center overflow-hidden relative">
                <img
                  src={HPL_IMAGES.mentorGrilling}
                  alt="Live team Q&A evaluation grilling session"
                  className="w-full h-48 xs:h-52 sm:h-56 object-contain transform group-hover:scale-103 transition-transform duration-500 block"
                  style={{
                    maskImage: 'radial-gradient(ellipse 88% 85% at 50% 50%, black 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.25) 85%, transparent 98%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 88% 85% at 50% 50%, black 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.25) 85%, transparent 98%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none bg-gradient-to-t from-[#F1ECF6] to-transparent" />
                <div className="absolute inset-y-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-[#F1ECF6] to-transparent" />
                <div className="absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-[#F1ECF6] to-transparent" />
              </div>
            </div>

            {/* ── CARD 3: On-Stage Grand Jury (Soft Warm Honey Tint + Star Doodles) ── */}
            <div className="scroll-mentor-card rounded-3xl border border-[#D97706]/20 bg-[#FAF2E6] p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-all group relative">
              {/* Top Content */}
              <div className="space-y-3">
                {/* Top Badge: Golden Cup Trophy with Bursting Sparkles */}
                <div className="flex items-center justify-between">
                  {/* Left Star Doodle */}
                  <div className="opacity-80">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2 L14 8 L20 9 L15 14 L17 20 L12 17 L7 20 L9 14 L4 9 L10 8 Z" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="1.2" />
                    </svg>
                  </div>

                  {/* Centered Golden Cup Emblem */}
                  <div className="w-14 h-14 rounded-full bg-white/80 border-2 border-[#D97706]/30 flex items-center justify-center text-[#D97706] shadow-2xs">
                    <Trophy className="w-7 h-7 stroke-[2.2] text-[#D97706]" />
                  </div>

                  {/* Right Sparkle Cluster Doodle */}
                  <div className="opacity-80 flex flex-col items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2 L14 8 L20 9 L15 14 L17 20 L12 17 L7 20 L9 14 L4 9 L10 8 Z" fill="#FBBF24" stroke="#1E1B4B" strokeWidth="1.2" />
                    </svg>
                    <span className="w-1 h-1 rounded-full bg-amber-500" />
                  </div>
                </div>

                <h3 className="font-display font-black text-xl text-[#1E1B4B] tracking-tight text-center">
                  On-Stage Grand Jury
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-600 font-medium leading-relaxed text-center">
                  Top 4 squads from each of the 3 domains (12 finalist teams total) present directly before the senior jury at the SMVITM Auditorium for the grand championship trophy.
                </p>

                {/* Hand-drawn amber divider stroke */}
                <div className="w-16 h-1 bg-[#D97706]/30 rounded-full mx-auto" />
              </div>

              {/* Bottom Illustration: Hand-Drawn Auditorium Stage Artwork with Feathered Edges */}
              <div className="pt-4 mt-3 flex items-center justify-center overflow-hidden relative">
                <img
                  src={HPL_IMAGES.mentorJury}
                  alt="On-stage grand championship jury in SMVITM auditorium"
                  className="w-full h-48 xs:h-52 sm:h-56 object-contain transform group-hover:scale-103 transition-transform duration-500 block"
                  style={{
                    maskImage: 'radial-gradient(ellipse 88% 85% at 50% 50%, black 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.25) 85%, transparent 98%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 88% 85% at 50% 50%, black 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.25) 85%, transparent 98%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none bg-gradient-to-t from-[#FAF2E6] to-transparent" />
                <div className="absolute inset-y-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-[#FAF2E6] to-transparent" />
                <div className="absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-[#FAF2E6] to-transparent" />
              </div>
            </div>

          </div>

        </div>

        {/* ════ 5. PRE-FOOTER BANNER: "STAY TUNED. THE BEST MINDS ARE JOINING THE LEAGUE" ════ */}
        <div className="scroll-stay-tuned rounded-2xl sm:rounded-3xl bg-[#1E1B4B] text-white p-6 sm:p-8 shadow-sm relative overflow-hidden text-center space-y-2">
          {/* Hand-Drawn Lightbulb with Glow Rays on Left */}
          <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 opacity-70 hidden sm:block">
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
              <path d="M 24 6 C 16 6 12 12 12 18 C 12 23 16 26 18 29 V 34 H 30 V 29 C 32 26 36 23 36 18 C 36 12 32 6 24 6 Z" fill="#FBBF24" fillOpacity="0.25" stroke="#FBBF24" strokeWidth="2.2" />
              <line x1="24" y1="2" x2="24" y2="4" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="6" x2="10" y2="4" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
              <line x1="36" y1="6" x2="38" y2="4" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
              <rect x="20" y="34" width="8" height="5" rx="1.5" fill="#F59E0B" />
            </svg>
          </div>

          {/* Hand-Drawn Shining Star on Right */}
          <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 opacity-70 hidden sm:block">
            <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
              <path d="M 22 4 L 26 16 L 38 18 L 29 27 L 32 38 L 22 32 L 12 38 L 15 27 L 6 18 L 18 16 Z" fill="#FBBF24" fillOpacity="0.35" stroke="#FBBF24" strokeWidth="2.2" strokeLinejoin="round" />
            </svg>
          </div>

          <h3 className="font-display font-black italic text-xl xs:text-2xl sm:text-3xl uppercase tracking-tight leading-snug">
            STAY TUNED. THE <span className="font-marker not-italic text-[#FBBF24] tracking-normal">BEST MINDS</span> ARE JOINING THE LEAGUE.
          </h3>
          <p className="font-sans text-xs sm:text-sm text-white/75 font-medium">
            Great evaluations. Strong mentorship. Real impact.
          </p>
        </div>

      </div>

    </div>
  );
};

export default MentorsPage;
