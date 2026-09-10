import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  shape: 'rect' | 'star' | 'circle' | 'ribbon';
  opacity: number;
  drag: number;
  gravity: number;
  wobble: number;
  wobbleSpeed: number;
}

interface BlasterSmoke {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  maxRadius: number;
}

interface StageConfettiBlasterProps {
  active: boolean;
}

const CELEBRATION_COLORS = [
  '#F59E0B', // Bright Gold
  '#FCD34D', // Light Gold
  '#D97706', // Deep Gold
  '#9333EA', // Royal Purple
  '#A855F7', // Vivid Purple
  '#38BDF8', // Electric Cyan
  '#06B6D4', // Deep Cyan
  '#EC4899', // Hot Pink / Magenta
  '#10B981', // Emerald Green
  '#FFFFFF', // Sparkling White
  '#F43F5E', // Ruby Rose
  '#FB923C', // Vibrant Tangerine
];

export const StageConfettiBlaster: React.FC<StageConfettiBlasterProps> = ({
  active,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const smokesRef = useRef<BlasterSmoke[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const spawnBlast = (originX: number, originY: number, angleDeg: number, count: number, spread: number = 42) => {
      // 1. Smoke puff at muzzle
      for (let s = 0; s < 8; s++) {
        smokesRef.current.push({
          x: originX + (Math.random() - 0.5) * 20,
          y: originY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 3 - 1,
          radius: 12 + Math.random() * 10,
          opacity: 0.7,
          maxRadius: 40 + Math.random() * 20,
        });
      }

      // 2. Confetti & Streamers
      for (let i = 0; i < count; i++) {
        const angle = ((angleDeg + (Math.random() - 0.5) * spread) * Math.PI) / 180;
        const speed = 20 + Math.random() * 28;
        const color = CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)];
        const shapeRoll = Math.random();
        const shape: 'rect' | 'star' | 'circle' | 'ribbon' =
          shapeRoll < 0.42 ? 'rect' : shapeRoll < 0.68 ? 'star' : shapeRoll < 0.85 ? 'circle' : 'ribbon';

        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 16,
          width: shape === 'ribbon' ? 7 + Math.random() * 4 : 11 + Math.random() * 12,
          height: shape === 'ribbon' ? 26 + Math.random() * 22 : 11 + Math.random() * 8,
          color,
          shape,
          opacity: 1,
          drag: 0.982,
          gravity: 0.38 + Math.random() * 0.15,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.08 + Math.random() * 0.07,
        });
      }
    };

    let waveTimer1: any;
    let waveTimer2: any;
    let waveTimer3: any;

    if (active) {
      // Wave 1: Twin Stage Bottom Cannons blast upward across each other
      spawnBlast(width * 0.06, height * 0.95, -60, 170, 48); // Left Cannon firing upward-right
      spawnBlast(width * 0.94, height * 0.95, -120, 170, 48); // Right Cannon firing upward-left

      // Wave 2: Center overhead sky burst after 500ms
      waveTimer1 = setTimeout(() => {
        spawnBlast(width * 0.5, height * 0.72, -90, 150, 85);
        spawnBlast(width * 0.22, height * 0.88, -72, 90, 36);
        spawnBlast(width * 0.78, height * 0.88, -108, 90, 36);
      }, 500);

      // Wave 3: Secondary celebratory glittering cascade after 1200ms
      waveTimer2 = setTimeout(() => {
        spawnBlast(width * 0.12, height * 0.92, -56, 100, 42);
        spawnBlast(width * 0.88, height * 0.92, -124, 100, 42);
      }, 1200);

      // Wave 4: Golden star grand finale after 2000ms
      waveTimer3 = setTimeout(() => {
        spawnBlast(width * 0.5, height * 0.55, -90, 120, 100);
      }, 2000);
    }

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render & Update Smoke Puffs
      for (let i = smokesRef.current.length - 1; i >= 0; i--) {
        const s = smokesRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.radius += 0.8;
        s.opacity *= 0.94;

        if (s.opacity < 0.02 || s.radius > s.maxRadius) {
          smokesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        grad.addColorStop(0, `rgba(253, 230, 138, ${s.opacity * 0.8})`);
        grad.addColorStop(0.5, `rgba(245, 158, 11, ${s.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Render & Update Confetti Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx + Math.sin(p.wobble) * 1.5;
        p.y += p.vy;
        p.wobble += p.wobbleSpeed;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 80) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Fade out slightly when falling down
        if (p.y > height * 0.82) {
          p.opacity = Math.max(0, p.opacity - 0.015);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(Math.cos(p.wobble), 1); // 3D flutter flipping
        ctx.globalAlpha = p.opacity;

        if (p.shape === 'star') {
          drawStar(0, 0, 5, p.width * 0.8, p.width * 0.38, p.color);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.beginPath();
          ctx.moveTo(-p.width / 2, -p.height / 2);
          ctx.quadraticCurveTo(p.width * 0.8, 0, -p.width / 2, p.height / 2);
          ctx.lineTo(p.width / 2, p.height / 2);
          ctx.quadraticCurveTo(-p.width * 0.8, 0, p.width / 2, -p.height / 2);
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          // Standard confetti rectangle with metallic sheen border
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);

          // Golden edge reflection
          if (p.color === '#F59E0B' || p.color === '#FCD34D') {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.lineWidth = 1;
            ctx.strokeRect(-p.width / 2, -p.height / 2, p.width, p.height);
          }
        }

        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(waveTimer1);
      clearTimeout(waveTimer2);
      clearTimeout(waveTimer3);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [active]);

  if (!active && particlesRef.current.length === 0) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
