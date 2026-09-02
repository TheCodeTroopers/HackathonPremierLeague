import React, { useEffect, useRef } from 'react';
import { PageRoute } from '../../types';
import { HPL_IMAGES } from '../../assets/images';
import { gsap } from 'gsap';
import { 
  ArrowRight, 
  Mail, 
  Sparkles, 
  Star
} from 'lucide-react';

interface SponsorsPageProps {
  onNavigate: (route: PageRoute) => void;
}

/* ═══════════════════════════════════════════════════════════════════════════════ */
/* 6 BESPOKE HAND-DRAWN COMIC ILLUSTRATIONS FOR "WHY PARTNER WITH HPL?"          */
/* Exactly matching the authentic comic aesthetic of the original mockup!       */
/* ═══════════════════════════════════════════════════════════════════════════════ */

// 1. Brand Visibility: Hand-drawn megaphone with sound waves
const BrandVisibilityIllustration = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M 44 20 C 48 24 48 40 44 44" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 50 14 C 56 20 56 44 50 50" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 56 8 C 64 16 64 48 56 56" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    <path d="M 12 26 L 24 20 L 40 14 L 42 50 L 24 44 L 12 38 Z" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2.5" strokeLinejoin="round" />
    <ellipse cx="41" cy="32" rx="4" ry="18" fill="#0284C7" stroke="#1E1B4B" strokeWidth="2.5" />
    <ellipse cx="41" cy="32" rx="2" ry="12" fill="#0369A1" />
    <path d="M 22 43 L 20 56 C 20 58 24 59 26 58 L 28 44" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 18 46 L 16 48" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="12" cy="32" rx="2.5" ry="6" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2" />
    <path d="M 22 24 L 38 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
  </svg>
);

// 2. Talent Connect: Hand-drawn 3 collegiate tech developers
const TalentConnectIllustration = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <circle cx="18" cy="24" r="8" fill="#FCD34D" stroke="#1E1B4B" strokeWidth="2.2" />
    <path d="M 14 20 Q 18 16 22 20" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 6 50 C 6 38 14 34 18 34 C 22 34 26 36 28 40" fill="#3B82F6" stroke="#1E1B4B" strokeWidth="2.2" strokeLinejoin="round" />

    <circle cx="46" cy="24" r="8" fill="#FCD34D" stroke="#1E1B4B" strokeWidth="2.2" />
    <path d="M 42 20 Q 46 16 50 20" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 36 40 C 38 36 42 34 46 34 C 50 34 58 38 58 50" fill="#0D9488" stroke="#1E1B4B" strokeWidth="2.2" strokeLinejoin="round" />

    <circle cx="32" cy="18" r="9" fill="#FDE68A" stroke="#1E1B4B" strokeWidth="2.4" />
    <path d="M 24 16 Q 32 10 40 16 C 40 18 38 14 32 14 C 26 14 24 18 24 16 Z" fill="#1E1B4B" />
    <path d="M 18 52 C 18 38 24 33 32 33 C 40 33 46 38 46 52 Z" fill="#10B981" stroke="#1E1B4B" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M 28 33 L 32 39 L 36 33" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
    <path d="M 31 39 L 31 45" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 33 39 L 33 45" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 3. Community Impact: Hand-drawn Earth globe in hands with sparkles
const CommunityImpactIllustration = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <circle cx="32" cy="28" r="17" fill="#60A5FA" stroke="#1E1B4B" strokeWidth="2.4" />
    <path d="M 20 22 Q 26 20 28 26 Q 30 32 26 36 Q 22 34 20 28 Z" fill="#34D399" stroke="#1E1B4B" strokeWidth="1.8" />
    <path d="M 34 16 Q 42 16 44 22 Q 46 28 40 32 Q 36 28 34 22 Z" fill="#34D399" stroke="#1E1B4B" strokeWidth="1.8" />
    <path d="M 32 38 Q 38 36 42 40 Q 36 44 32 44 Z" fill="#34D399" stroke="#1E1B4B" strokeWidth="1.8" />
    <path d="M 12 40 C 14 46 22 52 30 52 C 32 52 30 46 26 44" fill="#FCD34D" stroke="#1E1B4B" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M 52 40 C 50 46 42 52 34 52 C 32 52 34 46 38 44" fill="#FCD34D" stroke="#1E1B4B" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M 48 10 L 50 6 L 52 10 L 56 12 L 52 14 L 50 18 L 48 14 L 44 12 Z" fill="#F59E0B" />
    <circle cx="14" cy="16" r="2" fill="#F59E0B" />
  </svg>
);

// 4. On-Ground & Digital: Hand-drawn monitor screen broadcasting
const OnGroundDigitalIllustration = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <rect x="10" y="12" width="44" height="30" rx="4" fill="#8B5CF6" stroke="#1E1B4B" strokeWidth="2.4" />
    <rect x="14" y="16" width="36" height="22" rx="2" fill="#EDE9FE" stroke="#1E1B4B" strokeWidth="1.8" />
    <path d="M 18 32 L 24 26 L 30 30 L 44 20" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="44" cy="20" r="2.5" fill="#EF4444" />
    <path d="M 18 22 H 26" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
    <path d="M 28 42 L 26 50 L 38 50 L 36 42" fill="#6D28D9" stroke="#1E1B4B" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M 22 50 H 42" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 52 10 C 56 14 56 20 52 24" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 5. Thought Leadership: Profile head with glowing lightbulb in brain
const ThoughtLeadershipIllustration = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M 20 54 C 20 46 22 42 22 36 C 18 34 16 30 18 26 C 19 24 22 24 23 26 C 22 18 28 10 38 10 C 48 10 52 18 52 28 C 52 38 46 44 42 46 C 42 48 43 51 44 54" stroke="#1E1B4B" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <path d="M 32 20 C 28 20 26 23 26 26 C 26 28 28 31 30 32 L 30 36 L 34 36 L 34 32 C 36 31 38 28 38 26 C 38 23 36 20 32 20 Z" fill="#FBBF24" stroke="#1E1B4B" strokeWidth="2" />
    <path d="M 29 36 H 35" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
    <path d="M 30 38 H 34" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
    <path d="M 32 13 V 16" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <path d="M 23 18 L 25 20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <path d="M 41 18 L 39 20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <path d="M 44 26 H 41" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <path d="M 23 26 H 20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);


// 6. Exclusive Benefits: Hand-drawn golden gift box with red ribbon & bow
const ExclusiveBenefitsIllustration = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <rect x="14" y="24" width="36" height="28" rx="3" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2.4" />
    <rect x="11" y="18" width="42" height="9" rx="2" fill="#FBBF24" stroke="#1E1B4B" strokeWidth="2.4" />
    <rect x="29" y="18" width="6" height="34" fill="#EF4444" stroke="#1E1B4B" strokeWidth="1.8" />
    <rect x="11" y="21" width="42" height="3" fill="#DC2626" />
    <path d="M 24 13 C 20 8 30 8 32 17 C 34 8 44 8 40 13 C 37 17 32 18 32 18 C 32 18 27 17 24 13 Z" fill="#EF4444" stroke="#1E1B4B" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="32" cy="18" r="3" fill="#DC2626" stroke="#1E1B4B" strokeWidth="2" />
    <path d="M 12 10 L 14 8 L 16 10 L 14 12 Z" fill="#F59E0B" />
    <circle cx="50" cy="12" r="2" fill="#EF4444" />
    <path d="M 52 34 L 55 37" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SponsorsPage: React.FC<SponsorsPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── GSAP CINEMATIC SCROLLTRIGGER, STAGGER & KINETIC ANIMATIONS ──
  useEffect(() => {
    const gsapObj = (window as any).gsap || gsap;
    const ScrollTriggerObj = (window as any).ScrollTrigger;

    if (gsapObj) {
      if (ScrollTriggerObj) {
        gsapObj.registerPlugin(ScrollTriggerObj);
      }

      // 1. HERO ENTRANCE TIMELINE
      const tl = gsapObj.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.anim-sponsors-title-1',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'back.out(1.8)' }
      )
      .fromTo('.anim-sponsors-title-2',
        { y: 35, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.8)' },
        '-=0.45'
      )
      .fromTo('.anim-sponsors-title-3',
        { y: 35, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.8)' },
        '-=0.45'
      )
      .fromTo('.anim-sponsors-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      )
      .fromTo('.anim-sponsors-hero-img',
        { scale: 0.92, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      );

      // 2. CONTINUOUS KINETIC LOOPS (Subtle, Organic & Smooth)
      gsapObj.to('.anim-sponsors-title-2', {
        scale: 1.025,
        rotate: -0.8,
        duration: 2.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2,
      });

      gsapObj.to('.anim-sponsors-title-3', {
        scale: 1.025,
        rotate: 0.8,
        duration: 2.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.4,
      });

      gsapObj.to('.anim-star-twinkle', {
        rotate: 360,
        duration: 22,
        repeat: -1,
        ease: 'none',
      });

      gsapObj.to('.anim-doodle-float', {
        y: -5,
        x: 3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsapObj.to('.anim-cta-rocket', {
        y: -7,
        x: 5,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3. WHOLE PAGE SCROLLTRIGGER ANIMATIONS
      if (ScrollTriggerObj) {
        
        // ── A. PRIMARY SUPPORTERS SECTION ──
        gsapObj.fromTo('.scroll-primary-ribbon',
          { y: -25, opacity: 0, scale: 0.9, rotate: -4 },
          {
            scrollTrigger: {
              trigger: '.scroll-primary-card',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: -1,
            duration: 0.65,
            ease: 'back.out(1.8)',
          }
        );

        gsapObj.fromTo('.scroll-primary-card',
          { y: 35, opacity: 0, scale: 0.98 },
          {
            scrollTrigger: {
              trigger: '.scroll-primary-card',
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
          }
        );

        // Stagger inside Primary Supporters
        gsapObj.fromTo('.scroll-primary-col',
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.scroll-primary-card',
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power2.out',
          }
        );

        // ── B. CO-SPONSORS SECTION ──
        gsapObj.fromTo('.scroll-co-ribbon',
          { y: -25, opacity: 0, scale: 0.9, rotate: 4 },
          {
            scrollTrigger: {
              trigger: '.scroll-co-card',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 1,
            duration: 0.65,
            ease: 'back.out(1.8)',
          }
        );

        gsapObj.fromTo('.scroll-co-card',
          { y: 35, opacity: 0, scale: 0.98 },
          {
            scrollTrigger: {
              trigger: '.scroll-co-card',
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
          }
        );

        // Stagger inside Co-Sponsors
        gsapObj.fromTo('.scroll-co-item',
          { y: 30, opacity: 0, scale: 0.96 },
          {
            scrollTrigger: {
              trigger: '.scroll-co-card',
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.65,
            ease: 'back.out(1.4)',
          }
        );

        // ── C. WHY PARTNER WITH HPL? SECTION ──
        gsapObj.fromTo('.scroll-why-left',
          { x: -35, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.scroll-why-grid',
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
          }
        );

        gsapObj.fromTo('.scroll-why-card-wrapper',
          { x: 35, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.scroll-why-grid',
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
          }
        );

        // Stagger the 6 feature items sequentially
        gsapObj.fromTo('.scroll-why-feature-item',
          { y: 25, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.scroll-why-card-wrapper',
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.55,
            ease: 'power2.out',
          }
        );

        // ── D. CALL-TO-ACTION BANNER ──
        gsapObj.fromTo('.scroll-cta-banner',
          { y: 40, opacity: 0, scale: 0.97 },
          {
            scrollTrigger: {
              trigger: '.scroll-cta-banner',
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
          }
        );

        gsapObj.fromTo('.scroll-cta-trophy',
          { scale: 0.7, opacity: 0, rotate: -15 },
          {
            scrollTrigger: {
              trigger: '.scroll-cta-banner',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.75,
            ease: 'back.out(1.8)',
          }
        );

        gsapObj.fromTo('.scroll-cta-rocket-in',
          { x: 40, y: 30, opacity: 0, scale: 0.8 },
          {
            scrollTrigger: {
              trigger: '.scroll-cta-banner',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.6)',
          }
        );
      }
    }

    return () => {
      // Clean up triggers on unmount for smooth page transitions
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 1. HERO SECTION: DISPLAY LETTERING & LARGE SEAMLESS HERO ARTWORK     */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 sm:pt-4">
          
          {/* Left Column: Heading, Markers & Mission (Exact Tight Proportions to Mock) */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            
            {/* Main Typographic Lockup (Tight Leading, Extra Bold Slanted Display) */}
            <div className="space-y-0 tracking-tight">
              <h1 className="anim-sponsors-title-1 font-display font-black italic text-4xl xs:text-5xl sm:text-6xl lg:text-[70px] uppercase text-[#1E1B4B] leading-[0.88] block">
                OUR SPONSORS.
              </h1>
              <div className="anim-sponsors-title-2 font-marker text-4xl xs:text-5xl sm:text-6xl lg:text-[66px] text-[#582A9C] tracking-wide leading-[0.92] block -mt-1 sm:-mt-1.5">
                OUR STRENGTH.
              </div>
              <div className="anim-sponsors-title-3 font-marker text-4xl xs:text-5xl sm:text-6xl lg:text-[66px] text-[#E11D48] tracking-wide leading-[0.92] block -mt-1 sm:-mt-1.5">
                YOUR IMPACT.
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="anim-sponsors-desc space-y-2.5 font-sans text-sm sm:text-base text-[#1E1B4B]/80 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 pt-1">
              <p>
                HPL is powered by visionary partners who believe in innovation, collaboration and creating a better future.
              </p>
              <p className="font-semibold text-[#1E1B4B]">
                Together, we inspire, build and empower the next generation.
              </p>
            </div>

            {/* Hand-drawn Floating Doodles with animated star */}
            <div className="hidden lg:flex items-center gap-4 pt-1 text-[#1E1B4B]/60">
              <svg width="34" height="34" viewBox="0 0 48 48" fill="none" className="opacity-70 anim-doodle-float">
                <path d="M 6 22 L 42 6 L 26 42 L 20 28 Z" fill="#F59E0B" fillOpacity="0.3" stroke="#1E1B4B" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 42 6 L 20 28" stroke="#1E1B4B" strokeWidth="2" />
                <path d="M 6 36 Q 14 38 20 28" stroke="#1E1B4B" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#582A9C]">
                <Star className="anim-star-twinkle w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Building For Udupi & Beyond</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Illustration (Scaled by 1.14 to push black border lines outside + Radial Feather) */}
          <div className="lg:col-span-7 anim-sponsors-hero-img relative flex items-center justify-center">
            <div 
              className="relative w-full max-w-3xl select-none overflow-hidden"
              style={{
                maskImage: 'radial-gradient(ellipse 78% 72% at 50% 50%, black 46%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.2) 78%, transparent 92%)',
                WebkitMaskImage: 'radial-gradient(ellipse 78% 72% at 50% 50%, black 46%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.2) 78%, transparent 92%)',
              }}
            >
              <img
                src={HPL_IMAGES.sponsorsHero}
                alt="Our Sponsors, Our Strength - Four Collegiate Developers with Golden Trophy"
                loading="eager"
                decoding="async"
                className="w-full h-auto object-cover transform scale-[1.14] block select-none"
                style={{
                  mixBlendMode: 'multiply',
                }}
              />
            </div>
          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 2. SECTION: OUR PRIMARY SUPPORTERS (Transparent Card, Page Aligned)  */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          
          {/* Header Banner: Royal Purple Brush Ribbon with Entrance Animation */}
          <div className="flex justify-center -mb-5 relative z-20">
            <div className="scroll-primary-ribbon bg-[#482384] text-white font-marker px-6 sm:px-8 py-2 rounded-xl text-sm sm:text-base tracking-wider uppercase shadow-sketch-sm border-2 border-[#1E1B4B] transform -rotate-1 inline-flex items-center gap-2 select-none">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>OUR PRIMARY SUPPORTERS</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          {/* Canvas Card with Page Color (No White Fill, Elegant Rounded Outline Border) */}
          <div className="scroll-primary-card border border-[#2C2723]/30 rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 pt-8 sm:pt-10 shadow-none bg-transparent">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2C2723]/20 gap-6 md:gap-8 items-center text-center">
              
              {/* 1. EXTERNAL SPONSOR: SHIRVA POLICE */}
              <div className="scroll-primary-col flex flex-col items-center justify-between min-h-[190px] sm:min-h-[210px] py-3 md:py-0 md:px-4 space-y-3.5">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#0F766E] text-white font-display font-black text-[10px] sm:text-[11px] uppercase tracking-wider shadow-2xs">
                  EXTERNAL SPONSOR
                </span>
                
                {/* Real Shirva Police Crest & Brand Name (Responsive side-by-side / stacked lockup) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-1 w-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0 bg-white/60 rounded-2xl p-1.5 border border-[#0F766E]/20 shadow-2xs">
                    <img
                      src={HPL_IMAGES.shirvaLogo}
                      alt="Shirva Police Official Crest"
                      className="w-full h-full object-contain mix-blend-multiply transform hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-[#1E1B4B] uppercase tracking-tight leading-none">
                      SHIRVA
                    </h3>
                    <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-[#1E1B4B] uppercase tracking-tight leading-none mt-1 text-[#0F766E]">
                      POLICE
                    </h3>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/70 font-medium">
                  Our External Community Partner
                </p>
              </div>

              {/* 2. TITLE SPONSOR: SMVITM (Seamlessly Blended, Zero White Box!) */}
              <div className="scroll-primary-col flex flex-col items-center justify-between min-h-[190px] sm:min-h-[210px] py-3 md:py-0 md:px-4 space-y-3.5">
                <span className="inline-block px-4 py-1 rounded-full bg-[#582A9C] text-white font-display font-black text-[10px] sm:text-[11px] uppercase tracking-wider shadow-2xs">
                  TITLE SPONSOR
                </span>

                {/* SMVITM Official Brand Logo */}
                <div className="h-16 sm:h-20 lg:h-24 w-full flex items-center justify-center py-1">
                  <img
                    src={HPL_IMAGES.smvitmLogo}
                    alt="SMVITM Official Logo"
                    className="h-full w-auto max-w-full object-contain mix-blend-multiply filter drop-shadow-xs transform hover:scale-105 transition-transform"
                  />
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/75 font-medium max-w-xs mx-auto leading-snug">
                  Shri Madhwa Vadiraja Institute of Technology & Management
                </p>
              </div>

              {/* 3. TECHNOLOGY PARTNER: IEEE FIRST, THEN ISTE (Prominent & Clear) */}
              <div className="scroll-primary-col flex flex-col items-center justify-between min-h-[190px] sm:min-h-[210px] py-3 md:py-0 md:px-4 space-y-3.5">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#0F766E] text-white font-display font-black text-[10px] sm:text-[11px] uppercase tracking-wider shadow-2xs">
                  TECHNOLOGY PARTNER
                </span>

                {/* Technology Partners: IEEE & ISTE */}
                <div className="flex flex-col items-center justify-center gap-4 py-1 w-full max-w-sm mx-auto">
                  
                  {/* 1. IEEE */}
                  <div className="flex items-center justify-center gap-4 w-full">
                    <div className="h-16 sm:h-14 w-36 sm:w-32 flex items-center justify-center flex-shrink-0 bg-white/90 rounded-2xl p-2 border-2 border-[#00629B]/20 shadow-2xs">
                      <img
                        src={HPL_IMAGES.ieeeLogo}
                        alt="IEEE Official Student Branch SMVITM"
                        className="h-full w-auto object-contain mix-blend-multiply transform hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-display font-black text-xl sm:text-2xl text-[#00629B] uppercase tracking-tight leading-none">
                        IEEE
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/75 font-semibold leading-tight mt-1">
                        Student Branch SMVITM
                      </p>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="w-40 h-px bg-[#2C2723]/20" />

                  {/* 2. ISTE */}
                  <div className="flex items-center justify-center gap-4 w-full">
                    <div className="w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-white/95 border-2 border-[#1E1B4B]/20 p-1.5 flex items-center justify-center flex-shrink-0 shadow-2xs overflow-hidden">
                      <img
                        src={HPL_IMAGES.isteLogo}
                        alt="ISTE Official Crest"
                        className="w-full h-full object-contain mix-blend-multiply transform scale-[1.45] hover:scale-[1.55] transition-transform"
                      />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] uppercase tracking-tight leading-none">
                        ISTE
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/75 font-semibold leading-tight mt-1">
                        Student Chapter SMVITM
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 3. SECTION: CO-SPONSORS (Full-Width Card, Centered in Their Thirds)  */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          
          {/* Header Banner: Dark Navy Marker Ribbon with Entrance Animation */}
          <div className="flex justify-center -mb-5 relative z-20">
            <div className="scroll-co-ribbon bg-[#1E1B4B] text-white font-marker px-6 sm:px-8 py-2 rounded-xl text-sm sm:text-base tracking-wider uppercase shadow-sketch-sm border-2 border-[#1E1B4B] transform rotate-1 inline-flex items-center gap-2 select-none">
              <span>CO-SPONSORS</span>
            </div>
          </div>

          {/* Full-Width Canvas Card (Spreads across 100% of container with equal 33.3% columns) */}
          <div className="scroll-co-card border border-[#2C2723]/30 rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 pt-8 sm:pt-10 shadow-none bg-transparent">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#2C2723]/20 gap-4 sm:gap-0">
              
              {/* 1. CodeTroopers (Centered in Left Third) */}
              <div className="scroll-co-item flex flex-col items-center justify-between min-h-[180px] sm:min-h-[190px] py-5 sm:py-6 px-3 sm:px-6 hover:-translate-y-1 transition-transform">
                <div className="h-28 sm:h-24 lg:h-28 w-full flex items-center justify-center overflow-hidden p-1">
                  <img
                    src={HPL_IMAGES.codeTrooperLogo}
                    alt="CodeTroopers Official Logo"
                    className="max-h-full max-w-full object-contain filter drop-shadow-xs transform scale-[1.25] hover:scale-[1.35] transition-transform"
                  />
                </div>
                <div className="text-center mt-3">
                  <h4 className="font-display font-black text-base sm:text-lg lg:text-xl text-[#1E1B4B] uppercase tracking-tight">
                    CodeTroopers
                  </h4>
                  <p className="font-sans text-xs text-[#1E1B4B]/65 font-medium mt-0.5">
                    Learn . Build . Lead
                  </p>
                </div>
              </div>

              {/* 2. IGNITE AI (Centered in Middle Third) */}
              <div className="scroll-co-item flex flex-col items-center justify-between min-h-[180px] sm:min-h-[190px] py-5 sm:py-6 px-3 sm:px-6 hover:-translate-y-1 transition-transform">
                <div className="h-24 sm:h-20 lg:h-24 w-full flex items-center justify-center p-2">
                  <img
                    src={HPL_IMAGES.igniteLogo}
                    alt="IGNITE AI Official Logo"
                    className="max-h-full max-w-full object-contain filter drop-shadow-xs mix-blend-multiply transform hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-center mt-3">
                  <h4 className="font-display font-black text-base sm:text-lg lg:text-xl text-[#1E1B4B] uppercase tracking-tight">
                    IGNITE AI
                  </h4>
                  <p className="font-sans text-xs text-[#1E1B4B]/65 font-medium mt-0.5">
                    Fueling Ideas with AI
                  </p>
                </div>
              </div>

              {/* 3. AIKYA Club (Centered in Right Third) */}
              <div className="scroll-co-item flex flex-col items-center justify-between min-h-[180px] sm:min-h-[190px] py-5 sm:py-6 px-3 sm:px-6 hover:-translate-y-1 transition-transform">
                <div className="h-24 sm:h-20 lg:h-24 w-full flex items-center justify-center p-2">
                  <img
                    src={HPL_IMAGES.aikyaLogo}
                    alt="AIKYA Club Official Logo"
                    className="max-h-full max-w-full object-contain filter drop-shadow-xs transform hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-center mt-3">
                  <h4 className="font-display font-black text-base sm:text-lg lg:text-xl text-[#1E1B4B] uppercase tracking-tight">
                    AIKYA
                  </h4>
                  <p className="font-sans text-xs text-[#1E1B4B]/65 font-medium mt-0.5">
                    AIKYA Club • Unity in Purpose
                  </p>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 4. SECTION: WHY PARTNER WITH HPL? (Responsive Grid & Stagger SVGs)   */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="scroll-why-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & High-Five Celebratory Artwork */}
          <div className="scroll-why-left lg:col-span-5 space-y-4 sm:space-y-5 text-center lg:text-left">
            <h2 className="font-display font-black italic text-3xl xs:text-4xl sm:text-5xl uppercase tracking-tight text-[#1E1B4B] leading-tight">
              WHY PARTNER WITH HPL?
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#1E1B4B]/80 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Partnering with HPL connects your brand with bright minds, emerging technologies and a vibrant community of innovators.
            </p>

            {/* High-Five Celebratory Artwork (Scaled by 1.12 to mask out border, seamless on page) */}
            <div 
              className="relative w-full max-w-xs sm:max-w-md select-none mx-auto lg:mx-0 overflow-hidden pt-2"
              style={{
                maskImage: 'radial-gradient(ellipse 80% 74% at 50% 50%, black 48%, rgba(0,0,0,0.85) 64%, rgba(0,0,0,0.2) 80%, transparent 94%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 74% at 50% 50%, black 48%, rgba(0,0,0,0.85) 64%, rgba(0,0,0,0.2) 80%, transparent 94%)',
              }}
            >
              <img
                src={HPL_IMAGES.sponsorsHighFive}
                alt="Two Student Developers High-Fiving in Celebration of Success"
                className="w-full h-auto object-cover transform scale-[1.12] block select-none"
                style={{
                  mixBlendMode: 'multiply',
                }}
              />
            </div>
          </div>

          {/* Right Column: Unified 3-Column × 2-Row Canvas Card (Transparent, Hand-Drawn SVGs, Fluid Breakpoints) */}
          <div className="scroll-why-card-wrapper lg:col-span-7 border border-[#2C2723]/30 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-none bg-transparent">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 divide-[#2C2723]/20 sm:border-b sm:border-[#2C2723]/20 lg:border-b-0">
              
              {/* 1. BRAND VISIBILITY */}
              <div className="scroll-why-feature-item p-5 sm:p-6 space-y-2 hover:bg-black/[0.02] transition-colors sm:border-r sm:border-[#2C2723]/20">
                <div className="mb-2.5">
                  <BrandVisibilityIllustration className="w-11 h-11" />
                </div>
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B]">
                  BRAND VISIBILITY
                </h3>
                <p className="font-sans text-xs text-[#1E1B4B]/75 font-medium leading-relaxed">
                  Showcase your brand to a diverse audience of students, mentors, and tech enthusiasts.
                </p>
              </div>

              {/* 2. TALENT CONNECT */}
              <div className="scroll-why-feature-item p-5 sm:p-6 space-y-2 hover:bg-black/[0.02] transition-colors lg:border-r lg:border-[#2C2723]/20">
                <div className="mb-2.5">
                  <TalentConnectIllustration className="w-11 h-11" />
                </div>
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B]">
                  TALENT CONNECT
                </h3>
                <p className="font-sans text-xs text-[#1E1B4B]/75 font-medium leading-relaxed">
                  Engage with future innovators and potential recruits from across the region.
                </p>
              </div>

              {/* 3. COMMUNITY IMPACT */}
              <div className="scroll-why-feature-item p-5 sm:p-6 space-y-2 hover:bg-black/[0.02] transition-colors border-t sm:border-t-0 border-[#2C2723]/20 sm:border-r lg:border-r-0">
                <div className="mb-2.5">
                  <CommunityImpactIllustration className="w-11 h-11" />
                </div>
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B]">
                  COMMUNITY IMPACT
                </h3>
                <p className="font-sans text-xs text-[#1E1B4B]/75 font-medium leading-relaxed">
                  Support innovation and make a meaningful impact on the tech ecosystem.
                </p>
              </div>

              {/* 4. ON-GROUND & DIGITAL */}
              <div className="scroll-why-feature-item p-5 sm:p-6 space-y-2 hover:bg-black/[0.02] transition-colors border-t lg:border-t border-[#2C2723]/20 sm:border-r sm:border-[#2C2723]/20">
                <div className="mb-2.5">
                  <OnGroundDigitalIllustration className="w-11 h-11" />
                </div>
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B]">
                  ON-GROUND & DIGITAL
                </h3>
                <p className="font-sans text-xs text-[#1E1B4B]/75 font-medium leading-relaxed">
                  Get featured across all event platforms, social media, and promotional materials.
                </p>
              </div>

              {/* 5. THOUGHT LEADERSHIP */}
              <div className="scroll-why-feature-item p-5 sm:p-6 space-y-2 hover:bg-black/[0.02] transition-colors border-t lg:border-t border-[#2C2723]/20 lg:border-r lg:border-[#2C2723]/20">
                <div className="mb-2.5">
                  <ThoughtLeadershipIllustration className="w-11 h-11" />
                </div>
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B]">
                  THOUGHT LEADERSHIP
                </h3>
                <p className="font-sans text-xs text-[#1E1B4B]/75 font-medium leading-relaxed">
                  Position your organization as a leader in technology and innovation.
                </p>
              </div>

              {/* 6. EXCLUSIVE BENEFITS */}
              <div className="scroll-why-feature-item p-5 sm:p-6 space-y-2 hover:bg-black/[0.02] transition-colors border-t lg:border-t border-[#2C2723]/20">
                <div className="mb-2.5">
                  <ExclusiveBenefitsIllustration className="w-11 h-11" />
                </div>
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B]">
                  EXCLUSIVE BENEFITS
                </h3>
                <p className="font-sans text-xs text-[#1E1B4B]/75 font-medium leading-relaxed">
                  Access to workshops, networking sessions, and exclusive branding opportunities.
                </p>
              </div>

            </div>
          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 5. CALL-TO-ACTION BANNER: KEPT PREVIOUS SHARP TROPHY & ROCKET ARTWORK */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="scroll-cta-banner rounded-[28px] sm:rounded-[32px] bg-[#311059] border-2 border-[#1E1B4B] p-6 sm:p-8 lg:p-10 shadow-sketch relative overflow-hidden text-white">
          
          {/* Subtle Ambient Cosmic Glow */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 -z-0"
            style={{
              background: 'radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.25) 0%, transparent 60%)'
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            
            {/* Left: PREVIOUS Golden Trophy Artwork (Clean & Razor Sharp!) */}
            <div className="scroll-cta-trophy w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex-shrink-0 select-none">
              <img
                src={HPL_IMAGES.sponsorsTrophy}
                alt="Golden Championship Trophy"
                className="w-full h-full object-contain filter drop-shadow-md transform hover:scale-105 transition-transform"
              />
            </div>

            {/* Center: Title & Subtitle */}
            <div className="flex-1 text-center md:text-left space-y-1">
              <h2 className="font-display font-black italic text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight leading-tight">
                BE A PART OF SOMETHING BIGGER.
              </h2>
              <p className="font-sans text-sm sm:text-base text-purple-200 font-medium">
                Let's build the future together.
              </p>
            </div>

            {/* Right: Bold Hackathon Energy Stats */}
            <div className="flex flex-col items-center md:items-end gap-2 flex-shrink-0 text-center md:text-right">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#FBBF24] leading-none">40+</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-purple-300 mt-0.5">Squads</div>
                </div>
                <div className="w-px h-8 bg-purple-400/40" />
                <div className="text-center">
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#FBBF24] leading-none">3</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-purple-300 mt-0.5">Weeks</div>
                </div>
                <div className="w-px h-8 bg-purple-400/40" />
                <div className="text-center">
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#FBBF24] leading-none">∞</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-purple-300 mt-0.5">Ideas</div>
                </div>
              </div>
              <p className="font-mono text-[11px] text-purple-300 uppercase tracking-widest pt-1">
                ✦ Fuelling Innovation. Season 2026 ✦
              </p>
            </div>

            {/* Far Right: PREVIOUS Rocket Launching Artwork with gentle float (Clean & Razor Sharp!) */}
            <div className="scroll-cta-rocket-in anim-cta-rocket hidden lg:block w-24 h-24 xl:w-28 xl:h-28 flex-shrink-0 select-none">
              <img
                src={HPL_IMAGES.sponsorsRocket}
                alt="Rocket Launching into the Future"
                className="w-full h-full object-contain filter drop-shadow-md transform hover:scale-105 transition-transform"
              />
            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

export default SponsorsPage;
