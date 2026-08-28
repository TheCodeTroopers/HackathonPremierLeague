import React, { useEffect, useState, useRef } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StardustParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  char: string;
  rotation: number;
}

interface ComicBurst {
  id: number;
  x: number;
  y: number;
  word: string;
  color: string;
  rotation: number;
}

const BURST_WORDS = ['POW! 💥', 'BOOM! ⚡', 'ZAP! ✦', 'WHAM! 🔥', 'CLICK! 🚀'];
const BURST_COLORS = ['#F59E0B', '#E11D48', '#7C3AED', '#2563EB', '#F97316'];

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTag, setHoverTag] = useState('CLICK! ✦');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState<StardustParticle[]>([]);
  const [bursts, setBursts] = useState<ComicBurst[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const mousePosRef = useRef({ x: -100, y: -100 });
  const particleIdRef = useRef(0);
  const burstIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // 120 FPS Compositor-Linked RAF cursor tracking
    const updateCursorPosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePosRef.current.x}px, ${mousePosRef.current.y}px, 0)`;
      }
      rafRef.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      // Immediate hardware position sync
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      if (!isVisible) setIsVisible(true);

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateCursorPosition);
      }

      // Distance check for trailing sparkles (throttled to > 28px movement)
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = dx * dx + dy * dy;

      if (dist > 784) { // 28 * 28
        lastPosRef.current = { x: e.clientX, y: e.clientY };
        const pId = ++particleIdRef.current;
        const colors = ['#F59E0B', '#E11D48', '#7C3AED', '#2563EB', '#10B981'];
        const chars = ['✦', '★', '✧', '•'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const char = chars[Math.floor(Math.random() * chars.length)];

        setParticles((prev) => [
          ...prev.slice(-6),
          {
            id: pId,
            x: e.clientX + (Math.random() * 8 - 4),
            y: e.clientY + (Math.random() * 8 - 4),
            size: Math.random() * 5 + 10,
            color,
            char,
            rotation: Math.random() * 90 - 45,
          },
        ]);

        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== pId));
        }, 450);
      }

      // Interactive hover detector
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
        if (clickable) {
          setIsHovering(true);
          const text = (clickable.textContent || '').toLowerCase();
          if (text.includes('register') || text.includes('join') || text.includes('squad')) {
            setHoverTag("LET'S GO! 🚀");
          } else if (text.includes('faq') || text.includes('rule')) {
            setHoverTag('READ INTEL 💡');
          } else if (text.includes('explore') || text.includes('journey') || text.includes('timeline')) {
            setHoverTag('EXPLORE ✦');
          } else {
            setHoverTag('CLICK! ⚡');
          }
        } else {
          setIsHovering(false);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const bId = ++burstIdRef.current;
      const word = BURST_WORDS[Math.floor(Math.random() * BURST_WORDS.length)];
      const color = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
      const rotation = Math.floor(Math.random() * 20 - 10);

      setBursts((prev) => [
        ...prev.slice(-2),
        { id: bId, x: e.clientX, y: e.clientY, word, color, rotation },
      ]);

      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== bId));
      }, 450);
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    let scrollTicking = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
          setScrollProgress(Math.round(scrolled));
          setIsScrolledDown(winScroll > 300);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Smooth scroll trigger
  const handleScrollClick = () => {
    if (isScrolledDown) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div 
        className="pointer-events-none fixed inset-0 z-[10000000] overflow-hidden select-none"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s ease-out' }}
      >
          
          {/* Floating Stardust Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="fixed font-black transition-opacity duration-400 ease-out select-none"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                fontSize: `${p.size}px`,
                color: p.color,
                transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
                textShadow: '1px 2px 0px #1E1B4B',
                pointerEvents: 'none',
              }}
            >
              {p.char}
            </div>
          ))}

          {/* Comic Action Bursts on Click */}
          {bursts.map((b) => (
            <div
              key={b.id}
              className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 flex items-center justify-center animate-badge-pulse"
              style={{
                left: `${b.x}px`,
                top: `${b.y}px`,
                transform: `translate(-50%, -50%) rotate(${b.rotation}deg) scale(1.15)`,
              }}
            >
              <div className="relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-24 h-24 filter drop-shadow-[2.5px_3.5px_0px_#1E1B4B]">
                  <polygon
                    points="50,2 62,24 88,12 78,38 98,50 78,62 88,88 62,76 50,98 38,76 12,88 22,62 2,50 22,38 12,12 38,24"
                    fill={b.color}
                    stroke="#1E1B4B"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="50,14 58,30 76,22 69,41 84,50 69,59 76,78 58,70 50,86 42,70 24,78 31,59 16,50 31,41 24,22 42,30"
                    fill="#FFFDF7"
                    fillOpacity="0.35"
                  />
                </svg>
                <span className="absolute font-black font-display text-white text-xs tracking-wider uppercase drop-shadow-[1px_2px_0px_#1E1B4B]">
                  {b.word}
                </span>
              </div>
            </div>
          ))}

          {/* Hardware-Accelerated 120 FPS Cursor Element */}
          <div
            ref={cursorRef}
            className="fixed top-0 left-0 will-change-transform pointer-events-none"
            style={{
              transform: `translate3d(-100px, -100px, 0)`,
            }}
          >
            <div
              className={`flex items-center gap-2 transition-transform duration-75 ease-out ${
                isClicking
                  ? 'scale-85 rotate-[-8deg]'
                  : isHovering
                  ? 'scale-115 rotate-[-12deg]'
                  : 'scale-100 rotate-0'
              }`}
            >
              {/* Chunky Comic Arrow Vector with Precise Tip at (0, 0) */}
              <div className="relative w-9 h-10 filter drop-shadow-[3px_4px_0px_#1E1B4B]">
                <svg viewBox="0 0 40 44" fill="none" className="w-full h-full overflow-visible">
                  {/* Action Rays on Hover */}
                  {isHovering && (
                    <g className="animate-pulse">
                      <line x1="-3" y1="-3" x2="-8" y2="-8" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                      <line x1="0" y1="-5" x2="0" y2="-12" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                      <line x1="-5" y1="0" x2="-12" y2="0" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                    </g>
                  )}

                  {/* Main Arrowhead */}
                  <path
                    d="M 2 2 
                       L 14 36 
                       L 20 25 
                       L 34 38 
                       L 38 34 
                       L 24 21 
                       L 35 15 
                       Z"
                    fill="#F59E0B"
                    stroke="#1E1B4B"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Wing Fin Accent */}
                  <path
                    d="M 20 25 L 34 38 L 38 34 L 24 21 Z"
                    fill="#E11D48"
                    stroke="#1E1B4B"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* Gloss Streak */}
                  <path
                    d="M 6 8 L 13 25 L 15 23 L 8 6 Z"
                    fill="#FFFFFF"
                    fillOpacity="0.8"
                  />

                  {/* Orbiting Sparkle Star */}
                  <g 
                    className="animate-spin" 
                    style={{ transformOrigin: '32px 10px', animationDuration: '5s' }}
                  >
                    <polygon
                      points="32,4 34,8 38,10 34,12 32,16 30,12 26,10 30,8"
                      fill="#FDE047"
                      stroke="#1E1B4B"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              </div>

              {/* Context Comic Speech Tag on Hover */}
              {isHovering && (
                <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-lg px-2.5 py-1 shadow-sketch-sm animate-comic-wiggle whitespace-nowrap">
                  <span className="font-display font-black text-[10.5px] text-[#1E1B4B] tracking-wider uppercase block">
                    {hoverTag}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

      {/* Floating Bottom-Right Comic Compass & Scroll-to-Top Widget */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-center select-none">
        <button
          onClick={handleScrollClick}
          className="group relative flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#FFFDF7] border-2 border-[#1E1B4B] shadow-sketch hover:shadow-sketch-lg active:scale-95 transition-all cursor-pointer"
          title={isScrolledDown ? "Return to Summit" : "Scroll Down Arena"}
          aria-label={isScrolledDown ? "Return to Summit" : "Scroll Down Arena"}
        >
          <div className="w-8 h-8 rounded-full bg-[#1E1B4B] text-[#FBBF24] flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-2xs">
            <span className="text-xs">⚡</span>
          </div>

          <div className="mt-1 text-[#1E1B4B] transition-transform duration-200 group-hover:scale-110">
            {isScrolledDown ? (
              <ArrowUp className="w-4 h-4 text-[#EA580C]" />
            ) : (
              <ArrowDown className="w-4 h-4 text-[#4F46E5]" />
            )}
          </div>

          <span className="text-[9px] font-mono font-black text-[#1E1B4B]/80 mt-0.5">
            {scrollProgress}%
          </span>
        </button>
      </div>
    </>
  );
};
