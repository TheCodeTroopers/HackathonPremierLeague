import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { HeroIllustration } from '../illustrations/HeroIllustration';
import {
  Week1Illustration, Week2Illustration, Week3Illustration,
  LeagueFormatIcon, HeadToHeadIcon, ImproveAdaptIcon, ChampionIcon
} from '../illustrations/JourneyIllustrations';
import { AboutIllustration } from '../illustrations/AboutIllustration';
import { ComicPillarsBook } from '../common/ComicPillarsBook';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ParticleCanvas } from '../interactive/ParticleCanvas';
import { FAQ_DATA } from '../../data/hplData';

import {
  Calendar, Trophy, Rocket, Swords, Sparkles,
  ChevronDown, Code2, Star, ArrowRight, PlayCircle, Video, ExternalLink
} from 'lucide-react';
import registrationVideo from '../../assets/RegistrationVideo_opt.mp4';
import { HPL_IMAGES } from '../../assets/images';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectSquad?: (squadId: string) => void;
  isLoaded?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectSquad, isLoaded = true }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const rotatingTaglines = [
    'A 3-Week League of Innovation • Build impactful solutions.',
    '8+ Head-to-Head Match Days • Climb the Live Table.',
    'Iterate with 15+ Industry Mentors from Niveus & Top Tech Enterprises.',
    'Grand Playoffs Finale at SMVITM Auditorium • September 2026.'
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % rotatingTaglines.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Trigger post-loading entrance orchestration when loading screen finishes
  React.useEffect(() => {
    if (!isLoaded) return;
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Hardware-Accelerated Smooth Scroll Reveal (Appear on scroll down, re-trigger on scroll up)
  React.useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    const targets = document.querySelectorAll('.reveal-on-scroll');
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [isLoaded]);

  // Pure rAF Parallax on Scroll (Zero React Re-renders, 120 FPS Compositor-Linked)
  React.useEffect(() => {
    let rafId: number;

    const handleParallax = () => {
      const scroll = window.scrollY;

      // 1. Hero illustration subtle depth parallax
      const heroArt = document.querySelector('.anim-illustration') as HTMLElement;
      if (heroArt && scroll < 1200) {
        heroArt.style.transform = `translate3d(0, ${scroll * 0.12}px, 0)`;
      }

      // 2. About section illustration parallax
      const aboutArt = document.querySelector('.about-art-parallax') as HTMLElement;
      if (aboutArt) {
        const rect = aboutArt.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (window.innerHeight - rect.top) * 0.07;
          aboutArt.style.transform = `translate3d(0, ${-offset}px, 0)`;
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleParallax);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP & Anime.js Entrance Animations on Page Load & After Loading Screen Finishes
  React.useEffect(() => {
    if (!isLoaded) return;

    const runAnimations = () => {
      const gsap = (window as any).gsap;
      const anime = (window as any).anime;

      if (gsap) {
        const ScrollTrigger = (window as any).ScrollTrigger;
        if (ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }

        // Hero Entrance Timeline
        const tl = gsap.timeline({ defaults: { ease: 'back.out(1.8)' } });
        tl.fromTo('.anim-pill', 
          { scale: 0.4, opacity: 0, y: -20 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.6 }
        )
        .fromTo('.anim-title-word', 
          { scale: 0.4, y: 50, opacity: 0 }, 
          { scale: 1, y: 0, opacity: 1, stagger: 0.15, duration: 0.75 }
        )
        .fromTo('.anim-sub', 
          { y: 25, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5 }, 
          '-=0.3'
        )
        .fromTo('.anim-cta-group', 
          { scale: 0.85, opacity: 0, y: 20 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.6 }, 
          '-=0.2'
        )
        .fromTo('.anim-date-row', 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 
          '-=0.2'
        )
        .fromTo('.anim-illustration', 
          { scale: 0.88, opacity: 0, y: 25 }, 
          { scale: 1, opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 
          '-=0.8'
        );

        // GSAP Production-Grade Smooth Scroll & Parallax (Zero Jitter, Zero Layout Shifts)
        if (ScrollTrigger) {
          // 1. Gentle Hero Illustration Parallax on Scroll (Subtle depth without shake)
          gsap.to('.anim-illustration', {
            scrollTrigger: {
              trigger: '#hero-section',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
            y: 55,
            scale: 0.97,
            opacity: 0.94,
            ease: 'none',
          });

          // 2. Section Headers (Smooth fade-up on scroll down, cleanly reverses on scroll up)
          gsap.utils.toArray('.scroll-section-header').forEach((el: any) => {
            gsap.fromTo(el,
              { y: 30, opacity: 0 },
              {
                scrollTrigger: {
                  trigger: el,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                },
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: 'power2.out',
              }
            );
          });

          // 4. About Overview Card (Silky smooth entrance)
          gsap.fromTo('.scroll-overview-card',
            { y: 35, opacity: 0 },
            {
              scrollTrigger: {
                trigger: '.scroll-overview-card',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power2.out',
            }
          );

          // 5. 7 Pillars Comic Book Deck
          gsap.fromTo('.scroll-comic-book',
            { y: 35, opacity: 0 },
            {
              scrollTrigger: {
                trigger: '.scroll-comic-book',
                start: 'top 86%',
                toggleActions: 'play none none reverse',
              },
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power2.out',
            }
          );

          // 6. Bento Feature Cards (Staggered smooth entrance)
          gsap.fromTo('.scroll-bento-card',
            { y: 40, opacity: 0 },
            {
              scrollTrigger: {
                trigger: '#about-hpl',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.65,
              ease: 'power2.out',
            }
          );

          // 7. Impact Stats Banner
          gsap.fromTo('.scroll-stat-item',
            { y: 25, opacity: 0, scale: 0.9 },
            {
              scrollTrigger: {
                trigger: '.scroll-stats-bar',
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.08,
              duration: 0.55,
              ease: 'back.out(1.5)',
            }
          );

          // 8. League Journey Cards
          gsap.fromTo('.scroll-journey-card',
            { y: 35, opacity: 0 },
            {
              scrollTrigger: {
                trigger: '#journey',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              y: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.65,
              ease: 'power2.out',
            }
          );

          // 9. Feature Badges in Journey Container
          gsap.fromTo('.scroll-feature-badge',
            { y: 20, opacity: 0 },
            {
              scrollTrigger: {
                trigger: '#journey',
                start: 'top 65%',
                toggleActions: 'play none none reverse',
              },
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.5,
              ease: 'power2.out',
            }
          );

          // 10. FAQ Items
          gsap.fromTo('.scroll-faq-item',
            { y: 20, opacity: 0 },
            {
              scrollTrigger: {
                trigger: '#faq',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.45,
              ease: 'power2.out',
            }
          );

          ScrollTrigger.refresh();
        }
      } else if (anime) {
        anime.timeline({ easing: 'easeOutElastic(1, .8)' })
          .add({
            targets: '.anim-pill',
            scale: [0.4, 1],
            opacity: [0, 1],
            duration: 700
          })
          .add({
            targets: '.anim-title-word',
            translateY: [40, 0],
            scale: [0.5, 1],
            opacity: [0, 1],
            delay: anime.stagger(150),
            duration: 800
          }, '-=400')
          .add({
            targets: ['.anim-sub', '.anim-cta-group', '.anim-date-row'],
            translateY: [25, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 600
          }, '-=400')
          .add({
            targets: '.anim-illustration',
            scale: [0.9, 1],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutQuad'
          }, '-=600');
      }
    };

    const timer = setTimeout(runAnimations, 80);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div className="relative overflow-hidden bg-[#FBF9F2]">
      {/* Subtle comic halftone dot texture */}
      <div className="absolute inset-0 hero-texture pointer-events-none opacity-30 z-0" />
      <ParticleCanvas />

      {/* ================================================================= */}
      {/* 1. HERO SECTION (Expanded max-w-[1440px] to fill the right side)  */}
      {/* ================================================================= */}
      <section id="hero-section" className="relative w-full pt-8 pb-8 sm:pt-10 lg:pt-14 lg:pb-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* LEFT: Text Column */}
            <div className="hero-text-col lg:col-span-5 space-y-4 text-left z-20 relative lg:pr-2">

              {/* Live Season Pill */}
              <div
                className={`anim-pill inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FFFDF7] border-2 border-[#1E1B4B] font-mono text-[11px] font-black text-[#1E1B4B] shadow-sketch-sm select-none cursor-default ${
                  hasEntered ? 'hero-anim-pill' : 'hero-pre-enter'
                }`}
              >
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                </span>
                <span>SEASON 1 • 3-WEEK INNOVATION LEAGUE</span>
              </div>

              {/* Giant Marker Typography: CODE. COLLABORATE. CONQUER. */}
              <div className="space-y-0 select-none">
                <div
                  className={`anim-title-word font-marker text-5xl sm:text-6xl lg:text-7xl xl:text-[5.4rem] tracking-tight leading-[0.92] text-[#1E1B4B] hover:translate-x-1 transition-transform cursor-default ${
                    hasEntered ? 'hero-anim-word-1' : 'hero-pre-enter'
                  }`}
                >
                  CODE.
                </div>
                <div
                  className={`anim-title-word font-marker text-4xl sm:text-5xl lg:text-6xl xl:text-[4.7rem] tracking-tight leading-[0.94] text-[#4F46E5] animate-glow-purple hover:translate-x-1 transition-transform cursor-default ${
                    hasEntered ? 'hero-anim-word-2' : 'hero-pre-enter'
                  }`}
                >
                  COLLABORATE.
                </div>
                <div
                  className={`anim-title-word font-marker text-5xl sm:text-6xl lg:text-7xl xl:text-[5.4rem] tracking-tight leading-[0.92] text-[#EA580C] animate-glow-orange hover:translate-x-1 transition-transform cursor-default ${
                    hasEntered ? 'hero-anim-word-3' : 'hero-pre-enter'
                  }`}
                >
                  CONQUER.
                </div>
              </div>

              {/* Subtitle text matching original reference */}
              <div
                className={`anim-sub space-y-1 ${
                  hasEntered ? 'hero-anim-sub' : 'hero-pre-enter'
                }`}
              >
                <p className="text-base sm:text-lg text-[#1E1B4B] font-bold leading-snug">
                  A 3-Week League of Innovation.
                </p>
                <p className="text-sm sm:text-base text-[#1E1B4B]/80 font-semibold leading-snug">
                  Build impactful solutions. Compete. Improve. Be the champion.
                </p>
              </div>

              {/* Rotating Tagline Box */}
              <div
                className={`anim-sub h-6 flex items-center overflow-hidden ${
                  hasEntered ? 'hero-anim-sub' : 'hero-pre-enter'
                }`}
              >
                <p
                  key={taglineIndex}
                  className="font-mono text-xs sm:text-[13px] text-[#4F46E5] font-bold tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  ⚡ {rotatingTaglines[taglineIndex]}
                </p>
              </div>



              {/* Action Buttons (Purple Capsule + Yellow Demo Video Capsule + Outline Capsule) */}
              <div
                className={`anim-cta-group flex flex-wrap items-center gap-3.5 pt-1 ${
                  hasEntered ? 'hero-anim-cta' : 'hero-pre-enter'
                }`}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse" />
                  <button
                    onClick={() => onNavigate('register')}
                    className="relative px-7 py-3.5 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider sketch-border shadow-sketch hover:shadow-sketch-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <Trophy className="w-4 h-4 text-amber-300 animate-bounce" />
                    <span>REGISTER NOW!</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* How to Register Demo Video Button (Opens Pop-up Modal) */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-[#FEF08A] hover:bg-[#FDE047] text-[#1E1B4B] font-display font-black text-xs sm:text-sm uppercase tracking-wide sketch-border shadow-sketch hover:shadow-sketch-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <PlayCircle className="w-4 h-4 text-[#EA580C] group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span>HOW TO REGISTER DEMO VIDEO</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('rulebook');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 rounded-full bg-[#FFFDF7] hover:bg-[#EFE8D6] text-[#1E1B4B] font-display font-black text-xs sm:text-sm uppercase tracking-wide sketch-border shadow-sketch hover:shadow-sketch-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>EXPLORE RULEBOOK</span>
                  <span className="text-amber-600 font-bold">✦</span>
                </button>
              </div>

              {/* Date Badge: STARTS 2 SEPTEMBER 2026 */}
              <div
                className={`anim-date-row inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#FFFDF7] border-2 border-[#1E1B4B] font-display text-xs sm:text-sm font-bold text-[#1E1B4B] shadow-sketch-sm hover:shadow-sketch transition-all hover:-translate-y-0.5 w-fit ${
                  hasEntered ? 'hero-anim-dates' : 'hero-pre-enter'
                }`}
              >
                <Calendar className="w-4 h-4 text-[#4F46E5] flex-shrink-0 animate-pulse" />
                <span>STARTS 2 SEPTEMBER 2026 – 23 SEPTEMBER 2026</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold ml-1">SMVITM</span>
              </div>



            </div>

            {/* RIGHT: Master Championship Arena Illustration */}
            <div
              className={`anim-illustration lg:col-span-7 flex items-center justify-center lg:justify-end w-full z-10 lg:-mr-4 xl:-mr-8 ${
                hasEntered ? 'hero-anim-illustration' : 'hero-pre-enter'
              }`}
            >
              <HeroIllustration />
            </div>

        </div>
      </div>
    </section>

      {/* ================================================================= */}
      {/* VINTAGE COMIC INK MARQUEE TAPE (Seamless GPU 120 FPS Loop)        */}
      {/* ================================================================= */}
      <div className="w-full overflow-hidden bg-[#1E1B4B] py-3.5 border-y-2 border-[#1E1B4B] select-none">
        <div className="flex w-fit animate-marquee-ticker whitespace-nowrap will-change-transform">
          {/* TRACK 1 */}
          <div className="flex items-center gap-8 px-4 flex-shrink-0 font-mono text-xs font-black uppercase text-[#FBF9F2] tracking-widest">
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#EA580C]" /> REGISTRATIONS OPEN FOR SEASON 1</span>
            <span className="text-[#EA580C]">✦</span>
            <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-[#F59E0B]" /> GRAND TROPHY PLAYOFFS AT SMVITM</span>
            <span className="text-[#EA580C]">✦</span>
            <span className="flex items-center gap-2"><Swords className="w-4 h-4 text-[#818CF8]" /> 8+ HEAD-TO-HEAD MATCH FIXTURES</span>
            <span className="text-[#EA580C]">✦</span>
            <span className="flex items-center gap-2"><Rocket className="w-4 h-4 text-[#FBF9F2]" /> ₹30,000+ CASH PRIZE POOL & TROPHIES</span>
            <span className="text-[#EA580C]">✦</span>
          </div>
          {/* TRACK 2 (Seamless Infinite Loop Mirror) */}
          <div className="flex items-center gap-8 px-4 flex-shrink-0 font-mono text-xs font-black uppercase text-[#FBF9F2] tracking-widest" aria-hidden="true">
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#EA580C]" /> REGISTRATIONS OPEN FOR SEASON 1</span>
            <span className="text-[#EA580C]">✦</span>
            <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-[#F59E0B]" /> GRAND TROPHY PLAYOFFS AT SMVITM</span>
            <span className="text-[#EA580C]">✦</span>
            <span className="flex items-center gap-2"><Swords className="w-4 h-4 text-[#818CF8]" /> 8+ HEAD-TO-HEAD MATCH FIXTURES</span>
            <span className="text-[#EA580C]">✦</span>
            <span className="flex items-center gap-2"><Rocket className="w-4 h-4 text-[#FBF9F2]" /> ₹30,000+ CASH PRIZE POOL & TROPHIES</span>
            <span className="text-[#EA580C]">✦</span>
          </div>
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-16">

        {/* ================================================================= */}
        {/* 2. ABOUT HPL (The League Concept, Philosophy & 7 Pillars)          */}
        {/* ================================================================= */}
        <section id="about-hpl" className="space-y-12 scroll-mt-24">
          
          {/* Section Header */}
          <div className="scroll-section-header reveal-on-scroll text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E1B4B] text-[#FBF9F2] font-mono text-[10px] font-black uppercase tracking-widest shadow-sketch-sm">
              <Star className="w-3 h-3 text-[#F59E0B]" />
              <span>THE HPL PHILOSOPHY & SYSTEM</span>
              <Star className="w-3 h-3 text-[#F59E0B]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-[#1E1B4B]">
              Not Just a Hackathon. <span className="text-[#4F46E5]">A League.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#1E1B4B]/80 font-medium max-w-2xl mx-auto leading-relaxed">
              Inspired by the anticipation, fixtures, standings, and playoff energy of sports leagues — designed from the ground up for software builders.
            </p>
          </div>

          {/* Overview Card with AboutIllustration (From About Page) */}
          <div className="scroll-overview-card reveal-on-scroll bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 sm:p-10 shadow-sketch-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-[10px] font-mono font-black text-amber-900 uppercase">
                  THE ITERATIVE DISCIPLINE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-[#1E1B4B]">
                  BUILD → COMPETE → LEARN → IMPROVE → RISE
                </h3>
                <p className="text-sm sm:text-base text-[#1E1B4B]/80 font-medium leading-relaxed">
                  In professional sports, teams train, execute game plans, analyze game tape, adjust tactics, and return stronger for the next match. HPL applies this exact iterative discipline to software engineering across 3 high-intensity weeks.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const el = document.getElementById('journey');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-display font-black text-xs uppercase tracking-wider shadow-sketch-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>VIEW LEAGUE JOURNEY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate('squads')}
                    className="px-5 py-2.5 rounded-xl bg-[#FFFDF7] hover:bg-[#EFE8D6] border-2 border-[#1E1B4B] text-[#1E1B4B] font-display font-black text-xs uppercase tracking-wider shadow-sketch-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  >
                    EXPLORE SQUADS
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6 about-art-parallax">
                <AboutIllustration />
              </div>
            </div>
          </div>

          {/* 7 PILLARS OF HPL: COMIC BOOK INTERACTIVE FLIP-DECK (Zero vertical scrolling fatigue!) */}
          <div className="scroll-comic-book reveal-on-scroll space-y-6 pt-2">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono font-black text-[#EA580C] uppercase tracking-widest">
                ✦ COMPLETE TOURNAMENT LIFECYCLE ✦
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display uppercase text-[#1E1B4B]">
                THE 7 PILLARS OF HPL
              </h3>
              <p className="text-xs sm:text-sm text-[#1E1B4B]/70 font-medium max-w-lg mx-auto">
                Flip through each stage of the championship like an interactive comic issue — all 7 stages in one compact comic book deck!
              </p>
            </div>

            {/* The Comic Flipbook Component */}
            <ComicPillarsBook />
          </div>

          {/* 3 Comic Feature Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Panel 1: Engineering Sprints */}
            <div className="scroll-bento-card reveal-on-scroll stagger-1 bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-2xl p-6 shadow-sketch hover:-translate-y-1 hover:shadow-sketch-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center border-2 border-[#1E1B4B] bg-[#EEF2FF]">
                    <Code2 className="w-8 h-8 text-[#4F46E5]" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#EEF2FF] border border-[#4F46E5] text-[10px] font-mono font-black text-[#4F46E5] uppercase">
                    NO 24H BURNOUT
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-[#1E1B4B]">
                  3-Week Engineering Sprints
                </h3>
                <p className="text-sm text-[#1E1B4B]/75 leading-relaxed">
                  Forget superficial 24-hour prototypes. Squads build iteratively across 3 progressive weeks with mentor check-ins, feature twists, and real code reviews.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t-2 border-[#1E1B4B]/10">
                <p className="text-xs font-mono font-bold text-[#4F46E5]">
                  ✦ Build production-ready software
                </p>
              </div>
            </div>

            {/* Panel 2: Head-to-Head Fixtures */}
            <div className="scroll-bento-card reveal-on-scroll stagger-2 bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-2xl p-6 shadow-sketch hover:-translate-y-1 hover:shadow-sketch-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center border-2 border-[#1E1B4B] bg-[#FFF7ED]">
                    <Swords className="w-8 h-8 text-[#EA580C]" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFF7ED] border border-[#EA580C] text-[10px] font-mono font-black text-[#EA580C] uppercase">
                    FIXTURES & POINTS
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-[#1E1B4B]">
                  Head-to-Head Match Days
                </h3>
                <p className="text-sm text-[#1E1B4B]/75 leading-relaxed">
                  8+ structured match fixtures where squads defend architecture, stress tests, and user experience. Win: +3 pts, Tie: +1 pt, Loss: 0 pts.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t-2 border-[#1E1B4B]/10">
                <p className="text-xs font-mono font-bold text-[#EA580C]">
                  ✦ Climb the live standings table
                </p>
              </div>
            </div>

            {/* Panel 3: Grand Auditorium Playoffs */}
            <div className="scroll-bento-card reveal-on-scroll stagger-3 bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-2xl p-6 shadow-sketch hover:-translate-y-1 hover:shadow-sketch-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center border-2 border-[#1E1B4B] bg-[#FEF3C7]">
                    <Trophy className="w-8 h-8 text-[#D97706]" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] border border-[#D97706] text-[10px] font-mono font-black text-[#D97706] uppercase">
                    12 SQUADS FINALE
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-[#1E1B4B]">
                  Grand Auditorium Playoffs
                </h3>
                <p className="text-sm text-[#1E1B4B]/75 leading-relaxed">
                  The top 4 ranked teams from each of the 3 domains (12 finalist teams total) battle it out live on stage at the SMVITM Auditorium before industry juries and investors for the Championship Trophy.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t-2 border-[#1E1B4B]/10">
                <p className="text-xs font-mono font-bold text-[#D97706]">
                  ✦ Crowned League Champions
                </p>
              </div>
            </div>

          </div>

          {/* Impact Stats Banner */}
          <div className="scroll-stats-bar reveal-on-scroll bg-[#1E1B4B] rounded-2xl border-2 border-[#1E1B4B] shadow-sketch p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { num: '3', label: 'WEEKS', sub: 'of progressive building' },
                { num: '8+', label: 'MATCH DAYS', sub: 'live head-to-head fixtures' },
                { num: '12 TEAMS', label: 'PLAYOFFS', sub: 'Top 4 from each domain' },
                { num: '₹30K', label: 'PRIZE POOL', sub: 'cash awards & trophies' },
              ].map((s, idx) => (
                <div key={s.label} className={`scroll-stat-item reveal-on-scroll stagger-${idx + 1}`}>
                  <div className="font-marker text-4xl sm:text-5xl text-[#F59E0B] leading-none">{s.num}</div>
                  <div className="font-mono text-xs font-black text-[#F6F0E2] uppercase tracking-wider mt-1.5">{s.label}</div>
                  <div className="font-sans text-xs text-[#F6F0E2]/65 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 3. THE LEAGUE JOURNEY CONTAINER (Matching media_1787848945986.png)         */}
        {/* ========================================================================= */}
        <section id="journey" className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sketch space-y-8 scroll-mt-24">
          
          {/* Header with 4-Point Golden Sparkle Stars */}
          <div className="scroll-section-header reveal-on-scroll text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display uppercase tracking-wide text-[#1E1B4B] flex items-center justify-center gap-3">
              <span className="text-[#F59E0B] text-xl">✦</span>
              <span>THE LEAGUE JOURNEY</span>
              <span className="text-[#F59E0B] text-xl">✦</span>
            </h2>
          </div>

          {/* 3 Large Journey Stage Cards (Matching media_1787852490016.png) */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            
            {/* 1. WEEK 1 / PART 1 */}
            <div 
              onClick={() => onNavigate('timeline')}
              className="scroll-journey-card reveal-on-scroll stagger-1 md:col-span-3 text-center space-y-3 group cursor-pointer"
            >
              {/* Mint Pastel Illustration Frame with Soft Shaded Corner Blend */}
              <div className="relative overflow-hidden bg-[#D1FAE5]/70 border-2 border-emerald-400/60 group-hover:border-emerald-500 rounded-2xl h-48 sm:h-52 flex items-center justify-center shadow-sm group-hover:shadow-sketch group-hover:-translate-y-2 transition-all duration-300">
                <img
                  src={HPL_IMAGES.journeyWeek1}
                  alt="Week 1 - Idea Submission, Brainstorming & Build"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 select-none"
                  style={{
                    maskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, black 72%, rgba(0,0,0,0.85) 86%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, black 72%, rgba(0,0,0,0.85) 86%, transparent 100%)',
                  }}
                />
                {/* Soft pastel shaded corner & edge blend */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 66%, rgba(209, 250, 229, 0.45) 85%, rgba(209, 250, 229, 0.9) 100%)'
                  }}
                />
              </div>
              {/* Text labels */}
              <div className="space-y-0.5">
                <div className="font-display font-black text-sm text-emerald-700 tracking-wider uppercase">
                  WEEK 1
                </div>
                <div className="font-display font-black text-base text-[#1E1B4B] tracking-wide uppercase">
                  PART 1
                </div>
                <p className="font-bold text-xs text-amber-700 pt-1">
                  2 – 6 September 2026
                </p>
                <p className="text-[11px] text-[#1E1B4B]/65 font-medium">
                  Idea Submission • Build • Present
                </p>
              </div>
            </div>

            {/* Arrow 1 */}
            <div className="scroll-arrow hidden md:flex md:col-span-1 justify-center text-3xl font-bold text-[#1E1B4B]/40 select-none animate-pulse">
              →
            </div>

            {/* 2. WEEK 2 / PART 2 */}
            <div 
              onClick={() => onNavigate('timeline')}
              className="scroll-journey-card reveal-on-scroll stagger-2 md:col-span-3 text-center space-y-3 group cursor-pointer"
            >
              {/* Lavender/Purple Pastel Illustration Frame with Soft Shaded Corner Blend */}
              <div className="relative overflow-hidden bg-[#EDE9FE]/70 border-2 border-purple-400/60 group-hover:border-purple-500 rounded-2xl h-48 sm:h-52 flex items-center justify-center shadow-sm group-hover:shadow-sketch group-hover:-translate-y-2 transition-all duration-300">
                <img
                  src={HPL_IMAGES.journeyWeek2}
                  alt="Week 2 - Inauguration, 1st Evaluation & Sprints"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 select-none"
                  style={{
                    maskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, black 72%, rgba(0,0,0,0.85) 86%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, black 72%, rgba(0,0,0,0.85) 86%, transparent 100%)',
                  }}
                />
                {/* Soft lavender shaded corner & edge blend */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 66%, rgba(237, 233, 254, 0.45) 85%, rgba(237, 233, 254, 0.9) 100%)'
                  }}
                />
              </div>
              {/* Text labels */}
              <div className="space-y-0.5">
                <div className="font-display font-black text-sm text-[#7C3AED] tracking-wider uppercase">
                  WEEK 2
                </div>
                <div className="font-display font-black text-base text-[#1E1B4B] tracking-wide uppercase">
                  PART 2
                </div>
                <p className="font-bold text-xs text-[#1E1B4B]/80 pt-1">
                  9 September 2026 Onwards
                </p>
                <p className="text-[11px] text-[#1E1B4B]/65 font-medium">
                  Inauguration • 1st Evaluation • Sprints
                </p>
              </div>
            </div>

            {/* Arrow 2 */}
            <div className="scroll-arrow hidden md:flex md:col-span-1 justify-center text-3xl font-bold text-[#1E1B4B]/40 select-none animate-pulse">
              →
            </div>

            {/* 3. PLAYOFFS / PART 3 */}
            <div 
              onClick={() => onNavigate('timeline')}
              className="scroll-journey-card reveal-on-scroll stagger-3 md:col-span-3 text-center space-y-3 group cursor-pointer"
            >
              {/* Golden/Amber Pastel Illustration Frame with Soft Shaded Corner Blend */}
              <div className="relative overflow-hidden bg-[#FEF3C7]/70 border-2 border-amber-400/60 group-hover:border-amber-500 rounded-2xl h-48 sm:h-52 flex items-center justify-center shadow-sm group-hover:shadow-sketch group-hover:-translate-y-2 transition-all duration-300">
                <img
                  src={HPL_IMAGES.journeyPlayoffs}
                  alt="Playoffs - Grand Finale, Top 4 from Each Domain (12 Teams) & Championship Trophy"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 select-none"
                  style={{
                    maskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, black 72%, rgba(0,0,0,0.85) 86%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, black 72%, rgba(0,0,0,0.85) 86%, transparent 100%)',
                  }}
                />
                {/* Soft golden amber shaded corner & edge blend */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 66%, rgba(254, 243, 199, 0.45) 85%, rgba(254, 243, 199, 0.9) 100%)'
                  }}
                />
              </div>
              {/* Text labels */}
              <div className="space-y-0.5">
                <div className="font-display font-black text-sm text-[#EA580C] tracking-wider uppercase">
                  PLAYOFFS
                </div>
                <div className="font-display font-black text-base text-[#1E1B4B] tracking-wide uppercase">
                  PART 3
                </div>
                <p className="font-bold text-xs text-[#1E1B4B]/80 pt-1">
                  Top 4 from Each Domain (12 Teams)
                </p>
                <p className="text-[11px] text-[#1E1B4B]/65 font-medium">
                  Grand Finale & Crowning
                </p>
              </div>
            </div>

          </div>

          {/* 4 Bottom League Feature Badges (Matching media_1787852490016.png exactly) */}
          <div className="reveal-on-scroll bg-white/85 border-2 border-[#1E1B4B]/15 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1E1B4B]/10">
              
              {/* Badge 1: League Format */}
              <div className="scroll-feature-badge flex items-center gap-3.5 pt-2 sm:pt-0 sm:px-3 first:pl-0">
                <LeagueFormatIcon className="w-12 h-12 flex-shrink-0" />
                <div className="text-left space-y-0.5">
                  <div className="font-display font-black text-xs sm:text-[13px] text-[#1E1B4B] uppercase tracking-wider">
                    LEAGUE FORMAT
                  </div>
                  <div className="font-sans text-[11px] text-[#1E1B4B]/70 font-medium leading-snug">
                    Continuous competition over 3 weeks
                  </div>
                </div>
              </div>

              {/* Badge 2: Head to Head */}
              <div className="scroll-feature-badge flex items-center gap-3.5 pt-2 sm:pt-0 sm:px-3">
                <HeadToHeadIcon className="w-12 h-12 flex-shrink-0" />
                <div className="text-left space-y-0.5">
                  <div className="font-display font-black text-xs sm:text-[13px] text-[#1E1B4B] uppercase tracking-wider">
                    HEAD TO HEAD
                  </div>
                  <div className="font-sans text-[11px] text-[#1E1B4B]/70 font-medium leading-snug">
                    Compete in match-days earn league points
                  </div>
                </div>
              </div>

              {/* Badge 3: Improve & Adapt */}
              <div className="scroll-feature-badge flex items-center gap-3.5 pt-2 sm:pt-0 sm:px-3">
                <ImproveAdaptIcon className="w-12 h-12 flex-shrink-0" />
                <div className="text-left space-y-0.5">
                  <div className="font-display font-black text-xs sm:text-[13px] text-[#1E1B4B] uppercase tracking-wider">
                    IMPROVE & ADAPT
                  </div>
                  <div className="font-sans text-[11px] text-[#1E1B4B]/70 font-medium leading-snug">
                    Feedback driven iterative development
                  </div>
                </div>
              </div>

              {/* Badge 4: Be The Champion */}
              <div className="scroll-feature-badge flex items-center gap-3.5 pt-2 sm:pt-0 sm:px-3 last:pr-0">
                <ChampionIcon className="w-12 h-12 flex-shrink-0" />
                <div className="text-left space-y-0.5">
                  <div className="font-display font-black text-xs sm:text-[13px] text-[#1E1B4B] uppercase tracking-wider">
                    BE THE CHAMPION
                  </div>
                  <div className="font-sans text-[11px] text-[#1E1B4B]/70 font-medium leading-snug">
                    Top 4 from each domain battle for the title
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* CTA to Full Timeline Page */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('timeline')}
              className="px-6 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-display font-black text-xs uppercase tracking-wider shadow-sketch hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>EXPLORE COMPLETE SEASON TIMELINE & FIXTURES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </section>

        {/* ================================================================= */}
        {/* 4. FAQ SECTION                                                    */}
        {/* ================================================================= */}
        <section id="faq" className="space-y-8 scroll-mt-24">
          
          <div className="scroll-section-header reveal-on-scroll text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1B4B] text-[#FBF9F2] font-mono text-[10px] font-black uppercase tracking-widest shadow-sketch-sm">
              <span>❓</span><span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-[#1E1B4B]">
              Got <span className="text-[#4F46E5]">Questions?</span>
            </h2>
            <p className="text-sm sm:text-base text-[#1E1B4B]/75 font-medium max-w-xl mx-auto">
              Everything you need to know about the tournament structure, rules, and eligibility.
            </p>
          </div>

          {/* Accordion list */}
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_DATA.map((item, idx) => (
              <div
                key={idx}
                className={`scroll-faq-item reveal-on-scroll border-2 rounded-2xl overflow-hidden transition-all ${
                  openFaqIndex === idx
                    ? 'border-[#1E1B4B] shadow-sketch bg-[#FFFDF7]'
                    : 'border-[#1E1B4B]/25 hover:border-[#1E1B4B]/60 bg-[#FFFDF7]/80'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 hover:bg-[#F3EDD6]/50 transition-colors text-left cursor-pointer"
                >
                  <span className="font-display font-black text-sm sm:text-base text-[#1E1B4B]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#4F46E5] flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#1E1B4B]/10">
                    <p className="text-sm text-[#1E1B4B]/80 leading-relaxed font-medium">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </section>

      </div>

      {/* How to Register Demo Video Pop-up Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="HOW TO REGISTER • DEMO VIDEO"
        maxWidth="xl"
      >
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden sketch-border bg-black aspect-video flex items-center justify-center shadow-sketch-sm">
            <video
              controls
              playsInline
              preload="auto"
              key={isVideoModalOpen ? 'reg-video-open' : 'reg-video-closed'}
              className="w-full h-full object-contain"
            >
              <source src={registrationVideo} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
          <div className="p-3.5 bg-paper-cream rounded-xl sketch-border text-xs font-sans text-[#1E1B4B] space-y-1.5">
            <div className="font-mono font-bold uppercase text-[11px] text-[#4F46E5] flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              <span>Squad Registration Walkthrough</span>
            </div>
            <p className="text-[#1E1B4B]/80 text-[11px] leading-relaxed">
              Watch this quick walkthrough to learn how to choose your track, assemble your 5-member roster, add your project drive link, and generate your official HPL 2026 digital squad pass.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1E1B4B]">
            <a
              href={registrationVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-[#1E1B4B] text-xs font-mono font-bold bg-[#FFFDF7] hover:bg-[#EFE8D6] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onNavigate('register');
                }}
                className="px-3.5 py-1.5 rounded-lg border border-[#1E1B4B] text-xs font-mono font-bold bg-[#FEF08A] hover:bg-[#FDE047] text-[#1E1B4B] transition-colors shadow-sketch-xs cursor-pointer"
              >
                GO TO REGISTER →
              </button>
              <Button
                type="button"
                variant="purple"
                size="sm"
                onClick={() => setIsVideoModalOpen(false)}
              >
                GOT IT
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
