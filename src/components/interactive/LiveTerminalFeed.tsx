import React, { useState, useEffect } from 'react';
import { Terminal, Activity, Zap } from 'lucide-react';

const EVENTS = [
  '⚡ [LIVE TELEMETRY] CodeTroopers pushed commit: "fix(cluster): dynamic queue sharding implemented" • Score +0.4',
  '🚀 [MATCH FIXTURE] Debuggers deployed IoT mesh testbed to Udupi Malpe harbor sensor node • Latency: 14ms',
  '🛡️ [SECURITY AUDIT] Ctrl Alt Elite passed automated OWASP vulnerability scan with 100% compliance',
  '🏆 [STANDINGS UPDATE] Syntax Squad climbed +1 rank following head-to-head match win (+3 Pts)',
  '💡 [MENTOR SESSION] Mr. Gautam N Shet completed architectural review with Binary Brains on GCP data pipelines',
  '⚙️ [LEAGUE LEDGER] Smart contract verified 6 new squad registrations for Season 2026',
];

export const LiveTerminalFeed: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % EVENTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#1E1B4B] text-paper-light border-y-2 border-ink py-2.5 px-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 flex-shrink-0 text-hpl-yellow font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <Activity className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">HPL LIVE LEDGER FEED:</span>
        </div>

        <div className="truncate flex-grow text-slate-200 animate-in fade-in slide-in-from-right-4 duration-500 key={currentIdx}">
          {EVENTS[currentIdx]}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-indigo-300 text-[11px] flex-shrink-0">
          <span>SEASON 2026</span>
          <span>•</span>
          <span className="text-emerald-400">SYNCED</span>
        </div>
      </div>
    </div>
  );
};
