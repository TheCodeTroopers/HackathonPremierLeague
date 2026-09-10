import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Volume2, VolumeX, RotateCcw, Award, PartyPopper, Keyboard } from 'lucide-react';
import { StageConfettiBlaster } from './StageConfettiBlaster';

interface CurtainRevealStageProps {
  onRevealed?: () => void;
  onReset?: () => void;
  children?: React.ReactNode;
}

/**
 * Web Audio Synthesizer for Ceremonial Stage Reveal, Heavy Velvet Swoosh & Birthday Party Blaster POPs!
 * Zero external MP3 dependencies - guaranteed 100% reliable and instantaneous on all browsers.
 */
function playStageCurtainAudio(soundEnabled: boolean = true) {
  if (!soundEnabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // ── 1. Rope Pull Tension Creak & Suspense Hum ──────────────────────────
    const creakOsc = ctx.createOscillator();
    const creakGain = ctx.createGain();
    creakOsc.type = 'sawtooth';
    creakOsc.frequency.setValueAtTime(100, now);
    creakOsc.frequency.exponentialRampToValueAtTime(280, now + 0.28);
    creakGain.gain.setValueAtTime(0.001, now);
    creakGain.gain.linearRampToValueAtTime(0.12, now + 0.06);
    creakGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    creakOsc.connect(creakGain);
    creakGain.connect(ctx.destination);
    creakOsc.start(now);
    creakOsc.stop(now + 0.38);

    // Warm theatrical suspense hum during the delay
    const humOsc = ctx.createOscillator();
    const humGain = ctx.createGain();
    humOsc.type = 'sine';
    humOsc.frequency.setValueAtTime(110, now + 0.1);
    humOsc.frequency.linearRampToValueAtTime(146.83, now + 1.0); // D3 tension
    humGain.gain.setValueAtTime(0.001, now + 0.1);
    humGain.gain.linearRampToValueAtTime(0.08, now + 0.6);
    humGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
    humOsc.connect(humGain);
    humGain.connect(ctx.destination);
    humOsc.start(now + 0.1);
    humOsc.stop(now + 1.15);

    // ── 2. Heavy Royal Velvet Curtain Opening Swish (3.4s Ultra-Smooth Sweep) ─
    const bufferSize = Math.floor(ctx.sampleRate * 3.6);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, now + 1.0);
    filter.frequency.exponentialRampToValueAtTime(1100, now + 2.4);
    filter.frequency.exponentialRampToValueAtTime(130, now + 4.2);
    filter.Q.value = 1.6;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now + 1.0);
    noiseGain.gain.linearRampToValueAtTime(0.28, now + 1.8);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 4.4);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    whiteNoise.start(now + 1.0);

    // ── 3. BIRTHDAY PARTY BLASTER CANNON POPS (Fires at peak reveal: ~2.1s) ─
    const triggerBlasterPop = (startTime: number, pitch: number = 180) => {
      // Deep compressed air thump
      const thumpOsc = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      thumpOsc.type = 'triangle';
      thumpOsc.frequency.setValueAtTime(pitch, startTime);
      thumpOsc.frequency.exponentialRampToValueAtTime(30, startTime + 0.14);

      thumpGain.gain.setValueAtTime(0.65, startTime);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.24);
      thumpOsc.connect(thumpGain);
      thumpGain.connect(ctx.destination);
      thumpOsc.start(startTime);
      thumpOsc.stop(startTime + 0.26);

      // Sharp paper rupture crackle
      const popBufferSize = Math.floor(ctx.sampleRate * 0.2);
      const popBuffer = ctx.createBuffer(1, popBufferSize, ctx.sampleRate);
      const popData = popBuffer.getChannelData(0);
      for (let j = 0; j < popBufferSize; j++) {
        popData[j] = (Math.random() * 2 - 1) * Math.exp(-j / (ctx.sampleRate * 0.045));
      }
      const crackle = ctx.createBufferSource();
      crackle.buffer = popBuffer;
      const popFilter = ctx.createBiquadFilter();
      popFilter.type = 'highpass';
      popFilter.frequency.value = 1200;

      const crackleGain = ctx.createGain();
      crackleGain.gain.setValueAtTime(0.55, startTime);
      crackleGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
      crackle.connect(popFilter);
      popFilter.connect(crackleGain);
      crackleGain.connect(ctx.destination);
      crackle.start(startTime);
    };

    // Twin cannon salvo timed right when curtain is ~40% open!
    triggerBlasterPop(now + 2.1, 240); // Left cannon
    triggerBlasterPop(now + 2.3, 210); // Right cannon
    triggerBlasterPop(now + 2.8, 270); // High sky burst

    // ── 4. Grand Brass Fanfare Triad (Swells as cards become visible) ────────
    const notes = [
      { freq: 261.63, start: 1.9, dur: 2.8, vol: 0.15 }, // C4
      { freq: 392.00, start: 2.1, dur: 2.9, vol: 0.18 }, // G4
      { freq: 523.25, start: 2.3, dur: 3.1, vol: 0.22 }, // C5
      { freq: 659.25, start: 2.5, dur: 3.2, vol: 0.25 }, // E5
      { freq: 783.99, start: 2.7, dur: 3.4, vol: 0.27 }, // G5
      { freq: 1046.50, start: 2.9, dur: 3.6, vol: 0.29 }, // High C6
    ];

    notes.forEach(({ freq, start, dur, vol }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + start);

      gain.gain.setValueAtTime(0.001, now + start);
      gain.gain.linearRampToValueAtTime(vol, now + start + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + dur);
    });

    // ── 5. Golden Shimmer Chimes (Confetti Cascade) ──────────────────────────
    [1046.5, 1318.5, 1567.98, 1760.0, 2093.0, 2637.0].forEach((freq, idx) => {
      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      const bellStart = now + 2.8 + idx * 0.14;
      bell.type = 'sine';
      bell.frequency.setValueAtTime(freq, bellStart);

      bellGain.gain.setValueAtTime(0.001, bellStart);
      bellGain.gain.linearRampToValueAtTime(0.12, bellStart + 0.03);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, bellStart + 1.5);

      bell.connect(bellGain);
      bellGain.connect(ctx.destination);
      bell.start(bellStart);
      bell.stop(bellStart + 1.5);
    });
  } catch (e) {
    // Audio context silent fallback
  }
}

export const CurtainRevealStage: React.FC<CurtainRevealStageProps> = ({
  onRevealed,
  onReset,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [blasterActive, setBlasterActive] = useState(false);
  const [suspenseActive, setSuspenseActive] = useState(false);

  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<HTMLDivElement>(null);

  const handlePullRope = useCallback(() => {
    if (isPulling || isOpen) return;
    setIsPulling(true);
    setSuspenseActive(true);

    // 1. Play synthesized ceremonial stage audio with suspense, slow sweep & party blasters
    playStageCurtainAudio(soundEnabled);

    // 2. Suspense delay: Rope pulls down and holds for 1000ms with golden seam anticipation
    setTimeout(() => {
      setIsOpen(true);
      if (onRevealed) onRevealed();
    }, 1000);

    // 3. Fire birthday party blasters at peak reveal moment (t = 2100ms from pull)
    setTimeout(() => {
      setBlasterActive(true);
    }, 2100);

    setTimeout(() => {
      setIsPulling(false);
      setSuspenseActive(false);
    }, 2400);
  }, [isPulling, isOpen, soundEnabled, onRevealed]);

  // Keyboard trigger for ceremonial pull: Space, Enter, or Down Arrow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (['Space', ' ', 'Enter', 'ArrowDown'].includes(e.key)) {
        if (!isOpen && !isPulling) {
          e.preventDefault();
          handlePullRope();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePullRope, isOpen, isPulling]);

  const handleResetCurtain = () => {
    setIsOpen(false);
    setBlasterActive(false);
    setSuspenseActive(false);
    if (onReset) onReset();
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* BIRTHDAY PARTY CONFETTI & STREAMER BLASTER CANNON SYSTEM              */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <StageConfettiBlaster active={blasterActive} />
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* REVEALED CONTENT (Lies directly behind the velvet curtains)           */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div 
        className={`w-full transition-all duration-[3000ms] ease-out ${
          isOpen ? 'opacity-100 delay-300' : 'opacity-15 scale-[0.98] pointer-events-none select-none blur-xs'
        }`}
        style={isOpen ? { transform: 'none' } : undefined}
      >
        {children}
      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* TWIN CORNER PARTY POPPER CANNONS (Visual blaster hardware on stage)   */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-45 overflow-hidden">
        {/* Left Bottom Cannon */}
        <div 
          className={`absolute -bottom-6 -left-6 transition-all duration-700 ${
            blasterActive ? 'scale-110 -translate-x-1 translate-y-2' : 'scale-100'
          }`}
        >
          <div className="relative rotate-[42deg] origin-bottom-left">
            {/* Cannon Tube */}
            <div className="w-14 sm:w-18 h-32 sm:h-44 rounded-t-xl bg-gradient-to-r from-amber-700 via-amber-300 to-amber-600 border-4 border-amber-200 shadow-2xl relative overflow-hidden">
              {/* Metallic Ring Bands */}
              <div className="absolute top-4 left-0 right-0 h-3 bg-amber-900/60 border-y border-amber-300" />
              <div className="absolute top-14 left-0 right-0 h-3 bg-amber-900/60 border-y border-amber-300" />
              {/* Muzzle Rim */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-amber-400 border-b-2 border-amber-800" />
            </div>
            {/* Muzzle Flash & Sparkles when fired */}
            {blasterActive && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-radial from-amber-200 via-amber-400 to-transparent rounded-full animate-ping opacity-75" />
            )}
          </div>
        </div>

        {/* Right Bottom Cannon */}
        <div 
          className={`absolute -bottom-6 -right-6 transition-all duration-700 ${
            blasterActive ? 'scale-110 translate-x-1 translate-y-2' : 'scale-100'
          }`}
        >
          <div className="relative -rotate-[42deg] origin-bottom-right">
            {/* Cannon Tube */}
            <div className="w-14 sm:w-18 h-32 sm:h-44 rounded-t-xl bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 border-4 border-amber-200 shadow-2xl relative overflow-hidden">
              {/* Metallic Ring Bands */}
              <div className="absolute top-4 left-0 right-0 h-3 bg-amber-900/60 border-y border-amber-300" />
              <div className="absolute top-14 left-0 right-0 h-3 bg-amber-900/60 border-y border-amber-300" />
              {/* Muzzle Rim */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-amber-400 border-b-2 border-amber-800" />
            </div>
            {/* Muzzle Flash & Sparkles when fired */}
            {blasterActive && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-radial from-amber-200 via-amber-400 to-transparent rounded-full animate-ping opacity-75" />
            )}
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* RE-CURTAIN / REPLAY TOOLBAR (Visible after curtains are open)          */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#1E1B4B]/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full border-2 border-amber-400 shadow-[0_10px_30px_rgba(245,158,11,0.4)] animate-in fade-in slide-in-from-bottom-3 duration-500">
          <button
            onClick={handleResetCurtain}
            className="flex items-center gap-2 text-xs sm:text-sm font-display font-black uppercase text-amber-300 hover:text-white transition-colors cursor-pointer"
            title="Reset stage curtain for another reveal"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Curtain Reveal</span>
          </button>
          <span className="text-white/30 text-xs">|</span>
          <button
            onClick={() => setBlasterActive(true)}
            className="flex items-center gap-1.5 text-xs text-fuchsia-300 hover:text-fuchsia-100 transition-colors cursor-pointer px-1"
            title="Fire party blasters again"
          >
            <PartyPopper className="w-3.5 h-3.5 text-fuchsia-400" />
            <span className="hidden sm:inline font-bold">Pop!</span>
          </button>
          <span className="text-white/30 text-xs">|</span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-white/70 hover:text-white transition-colors cursor-pointer p-0.5"
            title={soundEnabled ? "Mute Reveal Sound" : "Enable Reveal Sound"}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* GRAND ROYAL VELVET STAGE CURTAINS (Left & Right halves)              */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div 
        className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-1000 ${
          isOpen ? 'opacity-0 pointer-events-none delay-[3200ms]' : 'opacity-100 pointer-events-auto'
        }`}
      >
        {/* Suspense Seam Laser Beam (Glows intensely down the center crack before opening) */}
        {suspenseActive && !isOpen && (
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-35 pointer-events-none flex items-center justify-center animate-pulse">
            <div className="w-2.5 h-full bg-gradient-to-b from-amber-100 via-white to-amber-200 shadow-[0_0_35px_#F59E0B,0_0_60px_#FCD34D]" />
          </div>
        )}

        {/* Theatrical Spotlight Cones radiating from center as curtains part */}
        <div 
          className={`absolute inset-0 z-25 pointer-events-none transition-opacity duration-1000 ${
            isOpen ? 'opacity-90' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(253, 230, 138, 0.45) 0%, rgba(245, 158, 11, 0.2) 35%, transparent 70%)'
          }}
        />

        {/* Deep Stage Ambient Vignette Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/95 pointer-events-none z-30" />

        {/* ── 1. LEFT VELVET CURTAIN DRAPE ── */}
        <div
          ref={leftCurtainRef}
          className="absolute top-0 left-0 bottom-0 w-[51%] h-full z-10 transition-transform duration-[3400ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] shadow-[25px_0_50px_rgba(0,0,0,0.85)]"
          style={{
            transformOrigin: 'left center',
            transform: isOpen ? 'translateX(-96%) scaleX(0.16)' : 'translateX(0%) scaleX(1)',
            background: 'linear-gradient(90deg, #120520 0%, #2A084E 15%, #3B0764 42%, #20003B 65%, #3C096C 85%, #18082B 100%)',
          }}
        >
          {/* 3D Velvet Folds with highlighted ridges & deep shadowed troughs */}
          <div 
            className="absolute inset-0 opacity-90 mix-blend-overlay"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.7) 0px, rgba(255,255,255,0.08) 28px, rgba(0,0,0,0.8) 56px, rgba(255,230,160,0.18) 84px, rgba(0,0,0,0.75) 112px)',
            }}
          />

          {/* Sateen Velvet Sheen Highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40 pointer-events-none" />

          {/* Golden Bullion Fringe along the bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-12 border-t-2 border-amber-300 shadow-xl"
            style={{
              background: 'repeating-linear-gradient(90deg, #D97706 0px, #FEF3C7 4px, #B45309 8px, #F59E0B 14px, #78350F 18px)',
            }}
          >
            <div className="w-full h-full opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent" />
          </div>

          {/* Center Seam Gold Rope Piping */}
          <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-r from-amber-600 via-amber-200 to-amber-700 shadow-xl border-l border-amber-900" />
        </div>

        {/* ── 2. RIGHT VELVET CURTAIN DRAPE ── */}
        <div
          ref={rightCurtainRef}
          className="absolute top-0 right-0 bottom-0 w-[51%] h-full z-10 transition-transform duration-[3400ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] shadow-[-25px_0_50px_rgba(0,0,0,0.85)]"
          style={{
            transformOrigin: 'right center',
            transform: isOpen ? 'translateX(96%) scaleX(0.16)' : 'translateX(0%) scaleX(1)',
            background: 'linear-gradient(270deg, #120520 0%, #2A084E 15%, #3B0764 42%, #20003B 65%, #3C096C 85%, #18082B 100%)',
          }}
        >
          {/* 3D Velvet Folds with highlighted ridges & deep shadowed troughs */}
          <div 
            className="absolute inset-0 opacity-90 mix-blend-overlay"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.75) 0px, rgba(255,230,160,0.18) 28px, rgba(0,0,0,0.8) 56px, rgba(255,255,255,0.08) 84px, rgba(0,0,0,0.7) 112px)',
            }}
          />

          {/* Sateen Velvet Sheen Highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40 pointer-events-none" />

          {/* Golden Bullion Fringe along the bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-12 border-t-2 border-amber-300 shadow-xl"
            style={{
              background: 'repeating-linear-gradient(90deg, #D97706 0px, #FEF3C7 4px, #B45309 8px, #F59E0B 14px, #78350F 18px)',
            }}
          >
            <div className="w-full h-full opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent" />
          </div>

          {/* Center Seam Gold Rope Piping */}
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-amber-700 via-amber-200 to-amber-600 shadow-xl border-r border-amber-900" />
        </div>

        {/* ── 3. TOP THEATER VALANCE (Scalloped velvet swag with gold rope trim) ── */}
        <div 
          className={`absolute top-0 left-0 right-0 h-18 sm:h-26 z-20 transition-transform duration-[1800ms] ease-out ${
            isOpen ? '-translate-y-full opacity-0 delay-[1600ms]' : 'translate-y-0 opacity-100'
          }`}
          style={{
            background: 'linear-gradient(180deg, #18052B 0%, #3B0764 70%, #2E1065 100%)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.8)'
          }}
        >
          {/* Scalloped Gold Fringe Swag */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-5 border-t-2 border-amber-300"
            style={{
              background: 'repeating-linear-gradient(90deg, #D97706 0px, #FDE68A 8px, #B45309 16px, #F59E0B 24px)',
            }}
          />
          
          {/* Centered HPL Royal Medallion */}
          <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-[#1E1B4B] border-2 border-amber-400 rounded-full px-5 py-1.5 shadow-[0_4px_20px_rgba(245,158,11,0.4)]">
            <Award className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-display font-black text-xs sm:text-sm text-amber-300 uppercase tracking-widest">
              HPL 2026 • ROUND 2 UNVEILING STAGE
            </span>
          </div>
        </div>

        {/* ── 4. CEREMONIAL GOLDEN PULL-ROPE (Interactive CEO Trigger on the Right) ── */}
        {!isOpen && (
          <div
            ref={ropeRef}
            onClick={handlePullRope}
            className={`absolute top-0 right-6 sm:right-16 md:right-28 z-30 flex flex-col items-center cursor-pointer group select-none transition-all duration-700 ease-out ${
              isPulling ? 'translate-y-24 rotate-[-2deg] scale-[0.98]' : 'hover:translate-y-3'
            }`}
            style={{ touchAction: 'manipulation' }}
          >
            {/* Top Brass Anchor Ring with Wall Bracket */}
            <div className="w-10 h-10 rounded-full border-4 border-amber-400 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 shadow-2xl mt-3 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#1E1B4B] shadow-inner" />
            </div>

            {/* Long Braided Golden Twisted Cord with Light Glow */}
            <div 
              className="w-3.5 sm:w-4 h-68 sm:h-88 shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-200"
              style={{
                background: 'repeating-linear-gradient(45deg, #FEF3C7 0px, #F59E0B 6px, #B45309 12px, #78350F 16px)',
                boxShadow: '6px 0 18px rgba(0,0,0,0.7)'
              }}
            />

            {/* Brass Slider Knot Ring */}
            <div className="w-10 h-8 rounded-md border-2 border-amber-300 bg-gradient-to-r from-amber-600 via-amber-200 to-amber-700 shadow-2xl flex items-center justify-center -my-1">
              <div className="w-8 h-2 bg-amber-950/70 rounded-full" />
            </div>

            {/* Heavy Weighted Golden Tassel */}
            <div className="flex flex-col items-center">
              {/* Tassel Cap (Embossed dome) */}
              <div className="w-12 h-8 rounded-t-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 border-2 border-amber-300 shadow-2xl" />
              
              {/* Tassel Strands / Silk Fringe */}
              <div 
                className="w-14 h-24 rounded-b-2xl shadow-[0_12px_30px_rgba(0,0,0,0.85)] transition-transform group-hover:scale-105"
                style={{
                  background: 'repeating-linear-gradient(90deg, #F59E0B 0px, #FEF3C7 3px, #B45309 6px, #D97706 9px, #78350F 12px)',
                }}
              />
            </div>

            {/* Interactive Pulse Callout Badge (Specially designed for stage visibility & keyboard hint) */}
            <div className="mt-5 animate-bounce flex flex-col items-center gap-1.5">
              <div className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 text-[#1E1B4B] border-2 border-white px-5 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.7)] flex items-center gap-2.5 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-[#1E1B4B] animate-spin" style={{ animationDuration: '3s' }} />
                <span className="font-display font-black text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap">
                  👑 PULL ROPE TO UNVEIL ROUND 2
                </span>
                <span className="text-lg">👇</span>
              </div>
              {/* Keyboard helper pill */}
              <div className="flex items-center gap-1.5 bg-[#1E1B4B]/90 text-amber-300 border border-amber-400/60 px-3 py-1 rounded-full text-[11px] font-mono shadow-md backdrop-blur-sm">
                <Keyboard className="w-3.5 h-3.5 text-amber-400" />
                <span>Or press <kbd className="px-1.5 py-0.5 bg-amber-400 text-[#1E1B4B] font-extrabold rounded text-[10px]">SPACE</kbd> or <kbd className="px-1.5 py-0.5 bg-amber-400 text-[#1E1B4B] font-extrabold rounded text-[10px]">ENTER</kbd></span>
              </div>
            </div>
          </div>
        )}

        {/* ── 5. CENTER GOLDEN LIGHT BURST (Fires while parting) ── */}
        {(isPulling || isOpen) && (
          <div className="absolute inset-0 z-25 flex items-center justify-center pointer-events-none transition-opacity duration-1000">
            <div className="w-[600px] h-[600px] rounded-full bg-radial from-amber-300/70 via-amber-500/30 to-transparent blur-3xl animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};
