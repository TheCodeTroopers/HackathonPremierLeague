import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

/**
 * Signature HPL Royal Purple Curtain Transition Screen.
 * Executes a smooth, cinematic royal purple wipe (#321668) between page navigations,
 * resetting scroll position cleanly behind the curtain with zero flicker.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children, pageKey }) => {
  const wrapRef       = useRef<HTMLDivElement>(null);
  const curtainRef    = useRef<HTMLDivElement>(null);
  const iconRef       = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on the very first website mount so the initial preloader handles entrance
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const wrap    = wrapRef.current;
    const curtain = curtainRef.current;
    const icon    = iconRef.current;
    if (!wrap || !curtain) return;

    gsap.killTweensOf([wrap, curtain, icon]);

    // Setup curtain at bottom of the screen ready to sweep up
    gsap.set(curtain, { 
      display: 'flex', 
      scaleY: 0, 
      transformOrigin: 'bottom center', 
      opacity: 1 
    });
    if (icon) gsap.set(icon, { opacity: 0, scale: 0.85 });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
    });

    // 1. Purple Curtain sweeps up from bottom to cover screen (0.32s)
    tl.to(curtain, { 
      scaleY: 1, 
      duration: 0.32, 
      ease: 'power3.inOut' 
    });

    // Centered golden HPL crest pops in
    if (icon) {
      tl.to(icon, { opacity: 1, scale: 1, duration: 0.18, ease: 'back.out(2)' }, '-=0.12');
    }

    // 2. Invisibly reset scroll to top while user sees the purple screen!
    tl.add(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      gsap.set(wrap, { opacity: 0, y: 14 });
    });

    // Micro-hold for a premium feel
    tl.to({}, { duration: 0.05 });

    // Icon fades out
    if (icon) {
      tl.to(icon, { opacity: 0, scale: 0.9, duration: 0.12, ease: 'power2.in' });
    }

    // 3. Purple Curtain wipes out toward top (0.35s)
    tl.add(() => {
      gsap.set(curtain, { transformOrigin: 'top center' });
    });
    tl.to(curtain, { 
      scaleY: 0, 
      duration: 0.35, 
      ease: 'power3.inOut' 
    });

    // 4. Page content lifts and fades in as curtain leaves
    tl.to(wrap, { 
      opacity: 1, 
      y: 0, 
      duration: 0.32, 
      ease: 'power2.out',
      clearProps: 'transform,opacity' 
    }, '-=0.22');

    // Hide curtain after transition completes
    tl.set(curtain, { display: 'none' });

    return () => { tl.kill(); };
  }, [pageKey]);

  return (
    <div className="relative w-full">
      {/* 
        =======================================================================
        SIGNATURE HPL ROYAL PURPLE CURTAIN WIPE SCREEN (#321668)
        =======================================================================
      */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9990] pointer-events-none hidden flex-col items-center justify-center select-none overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, #431E8C 0%, #321668 55%, #1F0D42 100%)',
          boxShadow: '0 0 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Centered HPL Golden Crest & Pulsing Beacon */}
        <div ref={iconRef} className="flex flex-col items-center gap-3 select-none pointer-events-none">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/15 border-2 border-amber-300/70 flex items-center justify-center shadow-xl transform rotate-2">
            <svg viewBox="0 0 100 100" fill="none" className="w-10 h-10 drop-shadow-sm">
              <polygon points="50,6 90,24 90,74 50,94 10,74 10,24" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="4" />
              <path d="M 30 38 L 40 54 L 50 34 L 60 54 L 70 38 L 68 62 H 32 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
              <rect x="36" y="64" width="28" height="5" rx="1.5" fill="#F59E0B" />
            </svg>
          </div>
          <div className="flex items-center gap-2 text-amber-300 font-display font-black text-xs uppercase tracking-widest drop-shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>HACKATHON PREMIER LEAGUE</span>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div ref={wrapRef} className="w-full will-change-transform">
        {children}
      </div>
    </div>
  );
};
