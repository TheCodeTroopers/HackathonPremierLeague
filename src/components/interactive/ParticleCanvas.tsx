import React, { useEffect, useRef } from 'react';

export const ParticleCanvas: React.FC<{ className?: string }> = ({ className = 'absolute inset-0 pointer-events-none' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const symbols = ['</>', '{}', 'fn()', '10', '01', '★', '⚡', 'λ', 'git'];
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 11 + 9,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: Math.random() * 0.12 + 0.04,
      color: ['#1E1B4B', '#EA580C', '#4F46E5', '#D97706'][Math.floor(Math.random() * 4)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.font = `bold ${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillText(p.symbol, p.x, p.y);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`${className} z-0 opacity-40`} />;
};

