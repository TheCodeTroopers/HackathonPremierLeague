import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
  label?: string;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2026-08-20T10:00:00',
  label = 'NEXT MATCH DAY STARTS IN',
  className = ''
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 12,
    minutes: 35,
    seconds: 40
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className={`inline-flex flex-col items-center bg-paper-light sketch-border rounded-xl p-4 shadow-sketch ${className}`}>
      <span className="text-xs font-mono font-bold text-ink-muted uppercase tracking-wider mb-2">
        {label}
      </span>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex flex-col items-center bg-ink text-paper-light rounded-lg px-2.5 py-1.5 min-w-[50px] shadow-sm">
          <span className="text-xl sm:text-2xl font-black font-display">{format(timeLeft.days)}</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-hpl-gold">DAYS</span>
        </div>
        <span className="text-xl font-bold text-ink">:</span>
        <div className="flex flex-col items-center bg-ink text-paper-light rounded-lg px-2.5 py-1.5 min-w-[50px] shadow-sm">
          <span className="text-xl sm:text-2xl font-black font-display">{format(timeLeft.hours)}</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-hpl-gold">HRS</span>
        </div>
        <span className="text-xl font-bold text-ink">:</span>
        <div className="flex flex-col items-center bg-ink text-paper-light rounded-lg px-2.5 py-1.5 min-w-[50px] shadow-sm">
          <span className="text-xl sm:text-2xl font-black font-display">{format(timeLeft.minutes)}</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-hpl-gold">MIN</span>
        </div>
        <span className="text-xl font-bold text-ink">:</span>
        <div className="flex flex-col items-center bg-ink text-paper-light rounded-lg px-2.5 py-1.5 min-w-[50px] shadow-sm">
          <span className="text-xl sm:text-2xl font-black font-display text-hpl-yellow">{format(timeLeft.seconds)}</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-hpl-yellow">SEC</span>
        </div>
      </div>
    </div>
  );
};
