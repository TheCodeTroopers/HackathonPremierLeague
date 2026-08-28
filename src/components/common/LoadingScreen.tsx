import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

/* Animated brushstroke underline — driven by a progress 0-100 state */
const SvgUnderline: React.FC<{ pct: number }> = ({ pct }) => {
  const TOTAL = 420;
  const offset = TOTAL - (pct / 100) * TOTAL;
  return (
    <div className="w-full max-w-md -mt-3">
      <svg viewBox="0 0 400 18" fill="none" className="w-full h-4">
        <path
          d="M4 12 C40 6 80 14 120 9 C160 4 200 13 240 8 C280 3 320 11 360 7 C375 5 390 9 396 8"
          stroke="#EA580C"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={TOTAL}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   PAINTBRUSH CANVAS REVEAL — Loading Screen
   
   Concept: A real HTML5 canvas where thick paintbrush strokes sweep across
   the screen one by one, each revealing a piece of the HPL identity.
   
   Stages:
     0-20%  → Wide ink wash sweeps left-to-right (background reveal)
     20-50% → Bold HPL title paints in letter by letter with brush strokes
     50-80% → Three tagline words stamp in
     80-100%→ Everything glows, "ENTER" button pulses in
   ───────────────────────────────────────────────────────────────────────────── */

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const tag1Ref      = useRef<HTMLSpanElement>(null);
  const tag2Ref      = useRef<HTMLSpanElement>(null);
  const tag3Ref      = useRef<HTMLSpanElement>(null);
  const enterRef     = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);
  const fillRef      = useRef<HTMLDivElement>(null);

  const [done, setDone]       = useState(false);
  const [exiting, setExiting] = useState(false);
  const [pct, setPct]         = useState(0);
  const progressVal            = useRef(0);

  // ── Canvas paintbrush engine ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d')!;
    let animId   = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Warm parchment background
    ctx.fillStyle = '#FBF9F2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* ── Brushstroke data ──────────────────────────────────────────────
       Each stroke: { x, y, width, height, color, angle, progress (0→1) }
       We animate their "progress" from 0 to 1 using requestAnimationFrame
    ── */
    interface Stroke {
      x: number;       // start x
      y: number;       // center y
      length: number;  // full length
      thickness: number;
      color: string;
      angle: number;   // slight tilt
      progress: number;// 0→1 how far painted
      speed: number;
      done: boolean;
      delay: number;   // seconds before this stroke starts
    }

    const W = canvas.width;
    const H = canvas.height;

    const strokes: Stroke[] = [
      // ── Wide background wash strokes ──────────────────────────
      { x: -W * 0.05, y: H * 0.18, length: W * 1.1, thickness: H * 0.22, color: 'rgba(79,70,229,0.07)', angle: -0.8, progress: 0, speed: 0.018, done: false, delay: 0 },
      { x: -W * 0.05, y: H * 0.52, length: W * 1.1, thickness: H * 0.20, color: 'rgba(234,88,12,0.06)', angle: 0.5, progress: 0, speed: 0.016, done: false, delay: 0.3 },
      { x: -W * 0.05, y: H * 0.82, length: W * 1.1, thickness: H * 0.18, color: 'rgba(245,158,11,0.07)', angle: -0.4, progress: 0, speed: 0.02, done: false, delay: 0.6 },

      // ── Bold accent strokes (dark ink) ─────────────────────────
      { x: W * 0.08, y: H * 0.42, length: W * 0.3, thickness: H * 0.012, color: 'rgba(30,27,75,0.18)', angle: 0, progress: 0, speed: 0.03, done: false, delay: 1.0 },
      { x: W * 0.08, y: H * 0.44, length: W * 0.22, thickness: H * 0.008, color: 'rgba(30,27,75,0.12)', angle: 0, progress: 0, speed: 0.03, done: false, delay: 1.15 },

      // ── Highlight swipes (indigo) ───────────────────────────────
      { x: -W * 0.02, y: H * 0.35, length: W * 0.55, thickness: H * 0.006, color: 'rgba(99,102,241,0.35)', angle: -0.3, progress: 0, speed: 0.04, done: false, delay: 1.4 },
      { x: W * 0.45, y: H * 0.65, length: W * 0.6, thickness: H * 0.005, color: 'rgba(234,88,12,0.3)', angle: 0.6, progress: 0, speed: 0.04, done: false, delay: 1.6 },
    ];

    /* Draw a single brush stroke up to its current progress (0→1).
       Uses quadratic bezier with bristle randomness for organic feel. */
    const drawStroke = (s: Stroke) => {
      if (s.progress <= 0) return;
      ctx.save();
      ctx.translate(s.x + (s.length * s.progress) / 2, s.y);
      ctx.rotate(s.angle * (Math.PI / 180));

      const halfLen = (s.length * s.progress) / 2;

      // Bristle layers — multiple thin paths offset by ±1-3px for texture
      for (let b = 0; b < 5; b++) {
        const offsetY = (b - 2) * (s.thickness * 0.18);
        const alpha   = 0.7 - Math.abs(b - 2) * 0.15;

        ctx.beginPath();
        ctx.moveTo(-halfLen, offsetY);
        // Slight wave in the stroke
        ctx.bezierCurveTo(
          -halfLen * 0.6, offsetY + Math.sin(b) * s.thickness * 0.15,
           halfLen * 0.6, offsetY - Math.sin(b) * s.thickness * 0.15,
           halfLen, offsetY
        );
        ctx.strokeStyle = s.color.replace(/[\d.]+\)$/, `${parseFloat(s.color.match(/([\d.]+)\)$/)![1]) * alpha})`);
        ctx.lineWidth   = s.thickness * (1 - Math.abs(b - 2) * 0.18);
        ctx.lineCap     = 'round';
        // Feathered edges via shadow
        ctx.shadowColor = s.color;
        ctx.shadowBlur  = s.thickness * 0.3;
        ctx.stroke();
      }
      ctx.restore();
    };

    let elapsed = 0;
    let last    = performance.now();

    const tick = (now: number) => {
      const dt  = (now - last) / 1000;
      last      = now;
      elapsed  += dt;

      // Clear & redraw parchment each frame
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#FBF9F2';
      ctx.fillRect(0, 0, W, H);

      // Subtle halftone dots
      for (let xi = 0; xi < W; xi += 26) {
        for (let yi = 0; yi < H; yi += 26) {
          ctx.beginPath();
          ctx.arc(xi, yi, 0.7, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(30,27,75,0.04)';
          ctx.fill();
        }
      }

      // Animate and draw each stroke
      strokes.forEach((s) => {
        if (elapsed >= s.delay && !s.done) {
          s.progress = Math.min(1, s.progress + s.speed);
          if (s.progress >= 1) s.done = true;
        }
        drawStroke(s);
      });

      // Update global progress ref (0–100)
      const total = strokes.length;
      const done  = strokes.filter((s) => s.done).length + strokes.reduce((a, s) => a + s.progress, 0);
      const pct   = Math.min(100, (done / (total * 2)) * 100);
      progressVal.current = pct;
      if (fillRef.current) {
        fillRef.current.style.width = `${pct}%`;
      }
      // Drive SVG underline via React state (throttled to ~10fps to avoid excess renders)
      setPct(Math.round(pct));

      const allDone = strokes.every((s) => s.done);
      if (allDone) {
        cancelAnimationFrame(animId);
        return;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── GSAP overlay animations ─────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline();

    // Title words stamp in
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.paint-word');
      tl.fromTo(words,
        { opacity: 0, scaleY: 0, transformOrigin: 'bottom center', skewX: 15 },
        { opacity: 1, scaleY: 1, skewX: 0, stagger: 0.18, duration: 0.65, ease: 'power4.out', delay: 0.8 }
      );
    }

    // Tag lines brush in
    [tag1Ref, tag2Ref, tag3Ref].forEach((ref, i) => {
      if (ref.current) {
        tl.fromTo(ref.current,
          { opacity: 0, x: -30, skewX: 10 },
          { opacity: 1, x: 0, skewX: 0, duration: 0.5, ease: 'power3.out' },
          `>-0.2`
        );
      }
    });

    // Enter button
    if (enterRef.current) {
      tl.fromTo(enterRef.current,
        { opacity: 0, scale: 0.7, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' },
        `>0.3`
      );
    }

    // Progress bar
    if (progressRef.current) {
      tl.fromTo(progressRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.4
      );
    }

    tl.call(() => setDone(true));
    return () => { tl.kill(); };
  }, []);

  // ── Auto-complete when strokes finish ──────────────────────────────────
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 600);
    }, 600);
    return () => clearTimeout(t);
  }, [done, onComplete]);

  // ── Exit animation ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!exiting || !overlayRef.current) return;
    gsap.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power4.inOut',
    });
  }, [exiting]);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(onComplete, 80);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* ── Canvas layer — paintbrush strokes ──────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* ── UI overlay layer ──────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 gap-6">

        {/* ── HPL badge ─────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[#1E1B4B]"
            style={{ background: '#1E1B4B' }}
          >
            <span className="font-display font-black text-sm text-[#FBBF24] tracking-widest">HPL</span>
          </div>
          <span className="font-mono text-xs font-black text-[#1E1B4B]/50 uppercase tracking-[0.25em]">
            Hackathon Premier League
          </span>
        </div>

        {/* ── Main painted title ────────────────────────────────── */}
        <div
          ref={titleRef}
          className="text-center"
          style={{ perspective: '600px' }}
        >
          {/* Line 1 */}
          <div className="flex items-baseline justify-center gap-3 sm:gap-5 flex-wrap">
            {['BUILD.', 'COMPETE.'].map((w) => (
              <span
                key={w}
                className="paint-word font-marker text-5xl sm:text-7xl lg:text-8xl text-[#1E1B4B] leading-none"
                style={{ display: 'inline-block', opacity: 0 }}
              >
                {w}
              </span>
            ))}
          </div>
          {/* Line 2 */}
          <div className="flex items-baseline justify-center mt-1 sm:mt-2">
            <span
              className="paint-word font-marker text-5xl sm:text-7xl lg:text-8xl leading-none"
              style={{
                display: 'inline-block',
                opacity: 0,
                color: '#4F46E5',
                WebkitTextStroke: '2px #1E1B4B',
              }}
            >
              CONQUER.
            </span>
          </div>
        </div>

        {/* ── Brushstroke underline SVG ─────────────────────────── */}
        <SvgUnderline pct={pct} />

        {/* ── Three tagline chips ───────────────────────────────── */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          <span
            ref={tag1Ref}
            className="px-4 py-1.5 rounded-full font-mono text-xs font-black uppercase tracking-widest text-white"
            style={{ background: '#1E1B4B', opacity: 0 }}
          >
            3 Weeks
          </span>
          <span
            ref={tag2Ref}
            className="px-4 py-1.5 rounded-full font-mono text-xs font-black uppercase tracking-widest text-white"
            style={{ background: '#4F46E5', opacity: 0 }}
          >
            16 Squads
          </span>
          <span
            ref={tag3Ref}
            className="px-4 py-1.5 rounded-full font-mono text-xs font-black uppercase tracking-widest text-white"
            style={{ background: '#EA580C', opacity: 0 }}
          >
            ₹30K Prize
          </span>
        </div>

        {/* ── Paintbrush progress bar ───────────────────────────── */}
        <div ref={progressRef} className="w-full max-w-xs" style={{ opacity: 0 }}>
          <div
            className="relative h-2.5 rounded-full overflow-hidden border border-[#1E1B4B]/20"
            style={{ background: '#EAE4D4' }}
          >
            <div
              ref={fillRef}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: '0%',
                background: 'linear-gradient(90deg, #1E1B4B, #4F46E5 45%, #EA580C 80%, #F59E0B)',
                transition: 'width 0.12s linear',
              }}
            />
          </div>
          <p className="text-center font-mono text-[10px] font-black text-[#1E1B4B]/40 uppercase tracking-widest mt-1.5">
            Painting the arena...
          </p>
        </div>

        {/* ── Enter / Skip ──────────────────────────────────────── */}
        <div ref={enterRef} style={{ opacity: 0 }}>
          <button
            onClick={handleSkip}
            className="group relative px-8 py-3 rounded-2xl font-display font-black text-sm uppercase tracking-widest text-white overflow-hidden cursor-pointer"
            style={{
              background: '#1E1B4B',
              boxShadow: '4px 4px 0px #4F46E5',
              border: '2px solid #4F46E5',
            }}
          >
            {/* Paintbrush swipe hover effect */}
            <span
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #4F46E5, #EA580C)' }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8 C2 3 6 1 8 1 C12 1 14 4 14 6 C14 9 11 11 10 12 L8 15 L6 12 C5 11 2 10 2 8Z"
                  fill="#FBBF24" stroke="white" strokeWidth="1" />
                <circle cx="8" cy="7" r="2" fill="white" opacity="0.8" />
              </svg>
              Enter the Arena
            </span>
          </button>
        </div>

      </div>

      {/* ── Skip text top-right ───────────────────────────────────── */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 z-20 font-mono text-[11px] font-black text-[#1E1B4B]/40 hover:text-[#1E1B4B] uppercase tracking-widest transition-colors cursor-pointer"
      >
        Skip →
      </button>

      {/* ── Floating paint-splash doodles ────────────────────────── */}
      <div className="absolute top-12 left-10 pointer-events-none select-none opacity-30"
        style={{ animation: 'float 4s ease-in-out infinite' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30 8 C45 8 54 20 52 34 C50 48 38 54 28 52 C14 48 6 36 10 22 C14 10 22 8 30 8Z"
            fill="#4F46E5" opacity="0.15" />
          <path d="M30 8 C45 8 54 20 52 34 C50 48 38 54 28 52 C14 48 6 36 10 22 C14 10 22 8 30 8Z"
            stroke="#4F46E5" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        </svg>
      </div>

      <div className="absolute bottom-16 right-12 pointer-events-none select-none opacity-25"
        style={{ animation: 'float 5s 1s ease-in-out infinite' }}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M25 4 L46 43 L4 43 Z"
            fill="#EA580C" opacity="0.12" />
          <path d="M25 4 L46 43 L4 43 Z"
            stroke="#EA580C" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-8 -translate-y-1/2 pointer-events-none select-none opacity-20"
        style={{ animation: 'float 3.5s 0.5s ease-in-out infinite' }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="5" y="5" width="30" height="30" rx="6"
            fill="#F59E0B" opacity="0.15"
            transform="rotate(20 20 20)" />
          <rect x="5" y="5" width="30" height="30" rx="6"
            stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" fill="none"
            transform="rotate(20 20 20)" />
        </svg>
      </div>

      <div className="absolute top-1/3 right-14 pointer-events-none select-none opacity-20"
        style={{ animation: 'float 6s 2s ease-in-out infinite' }}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <path d="M22 4 L38 14 L38 30 L22 40 L6 30 L6 14 Z"
            fill="#059669" opacity="0.12"
            transform="rotate(-10 22 22)" />
          <path d="M22 4 L38 14 L38 30 L22 40 L6 30 L6 14 Z"
            stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" fill="none"
            transform="rotate(-10 22 22)" />
        </svg>
      </div>

    </div>
  );
};
