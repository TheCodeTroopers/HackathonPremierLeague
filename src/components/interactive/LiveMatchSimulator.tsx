import React, { useState } from 'react';
import { SQUADS } from '../../data/hplData';
import { Swords, Trophy, Play, CheckCircle2, Zap, Sparkles, RefreshCw } from 'lucide-react';

export const LiveMatchSimulator: React.FC = () => {
  const [squad1Id, setSquad1Id] = useState('squad-1');
  const [squad2Id, setSquad2Id] = useState('squad-2');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [scores, setScores] = useState<{ s1: number; s2: number } | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const squad1 = SQUADS.find(s => s.id === squad1Id) || SQUADS[0];
  const squad2 = SQUADS.find(s => s.id === squad2Id) || SQUADS[1];

  const handleSimulate = () => {
    setIsSimulating(true);
    setSimulationLogs(['Initializing HPL Match Day Neural Evaluation Engine...']);
    setScores(null);
    setWinner(null);

    const logSteps = [
      '⚡ [ROUND 1] Code Architecture & Stress-Test: Checking concurrency & latency...',
      '🛡️ [ROUND 2] Security Audit: Verifying API auth, injection defenses & data purity...',
      '💡 [ROUND 3] Local Impact: Calculating relevance to Udupi district problems...',
      '🚀 [ROUND 4] Live Pitch & Demo: Judges scoring frontend UX & demo stability...',
    ];

    logSteps.forEach((log, index) => {
      setTimeout(() => {
        setSimulationLogs(prev => [...prev, log]);
      }, (index + 1) * 600);
    });

    setTimeout(() => {
      const s1Final = +(Math.random() * 2 + 8.0).toFixed(1);
      const s2Final = +(Math.random() * 2 + 7.9).toFixed(1);
      setScores({ s1: s1Final, s2: s2Final });

      if (s1Final > s2Final) {
        setWinner(squad1.name);
        setSimulationLogs(prev => [...prev, `🏆 FINAL JURY VERDICT: ${squad1.name} wins (+3 League Points)!`]);
      } else if (s2Final > s1Final) {
        setWinner(squad2.name);
        setSimulationLogs(prev => [...prev, `🏆 FINAL JURY VERDICT: ${squad2.name} wins (+3 League Points)!`]);
      } else {
        setWinner('Tie');
        setSimulationLogs(prev => [...prev, `⚖️ FINAL JURY VERDICT: Match Drawn (+1 Point each)!`]);
      }
      setIsSimulating(false);
    }, 3200);
  };

  return (
    <div className="bg-paper-light sketch-border-thick rounded-3xl p-6 sm:p-8 shadow-sketch-xl space-y-6 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-ink pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hpl-coral/10 text-hpl-coral font-mono text-xs font-bold uppercase mb-1">
            <Zap className="w-3.5 h-3.5" /> INTERACTIVE LEAGUE FEATURE
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink">
            HEAD-TO-HEAD MATCH SIMULATOR
          </h3>
          <p className="text-xs text-ink-muted">Simulate live fixture battles between any 2 squads across the 5 evaluation tracks.</p>
        </div>

        <button
          onClick={handleSimulate}
          disabled={isSimulating}
          className="px-6 py-3 rounded-2xl bg-hpl-purple text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider sketch-border shadow-sketch hover:shadow-sketch-lg hover:bg-purple-800 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>EVALUATING SQUADS...</span>
            </>
          ) : (
            <>
              <Swords className="w-4 h-4 text-hpl-yellow" />
              <span>SIMULATE BATTLE ➔</span>
            </>
          )}
        </button>
      </div>

      {/* Squad Pickers & VS Center Arena */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        {/* Squad 1 Card */}
        <div className="md:col-span-5 bg-paper-cream sketch-border rounded-2xl p-5 shadow-sketch space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-hpl-coral uppercase">HOME SQUAD</span>
            <span className="text-xs font-mono font-bold text-ink-muted">Rank #{squad1.rank}</span>
          </div>

          <select
            value={squad1Id}
            onChange={e => setSquad1Id(e.target.value)}
            disabled={isSimulating}
            className="w-full px-3 py-2 rounded-xl sketch-border bg-paper-light font-display font-bold text-sm text-ink cursor-pointer"
          >
            {SQUADS.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.college})</option>
            ))}
          </select>

          <div className="space-y-1 text-xs">
            <div className="text-ink font-bold font-display">{squad1.projectName}</div>
            <div className="text-ink-muted text-[11px] truncate">{squad1.projectSummary}</div>
          </div>

          {scores && (
            <div className="pt-2 border-t border-ink/10 flex items-center justify-between">
              <span className="font-mono text-xs text-ink-muted">Jury Score:</span>
              <span className="font-display font-black text-xl text-ink">{scores.s1} / 10</span>
            </div>
          )}
        </div>

        {/* VS Lightning Center */}
        <div className="md:col-span-1 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-hpl-yellow sketch-border flex items-center justify-center font-display font-black text-lg text-ink shadow-sketch animate-pulse">
            VS
          </div>
        </div>

        {/* Squad 2 Card */}
        <div className="md:col-span-5 bg-paper-cream sketch-border rounded-2xl p-5 shadow-sketch space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-hpl-indigo uppercase">AWAY SQUAD</span>
            <span className="text-xs font-mono font-bold text-ink-muted">Rank #{squad2.rank}</span>
          </div>

          <select
            value={squad2Id}
            onChange={e => setSquad2Id(e.target.value)}
            disabled={isSimulating}
            className="w-full px-3 py-2 rounded-xl sketch-border bg-paper-light font-display font-bold text-sm text-ink cursor-pointer"
          >
            {SQUADS.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.college})</option>
            ))}
          </select>

          <div className="space-y-1 text-xs">
            <div className="text-ink font-bold font-display">{squad2.projectName}</div>
            <div className="text-ink-muted text-[11px] truncate">{squad2.projectSummary}</div>
          </div>

          {scores && (
            <div className="pt-2 border-t border-ink/10 flex items-center justify-between">
              <span className="font-mono text-xs text-ink-muted">Jury Score:</span>
              <span className="font-display font-black text-xl text-ink">{scores.s2} / 10</span>
            </div>
          )}
        </div>
      </div>

      {/* Live Simulation Terminal Console */}
      {simulationLogs.length > 0 && (
        <div className="bg-[#0F172A] text-emerald-400 font-mono text-xs rounded-2xl p-4 sketch-border shadow-sketch space-y-1.5 scanline-effect">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2 text-slate-400 text-[10px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              LIVE STADIUM EVALUATION FEED
            </span>
            <span>HPL-NEURAL-SIM-V2.6</span>
          </div>
          <div className="space-y-1 pt-1 max-h-36 overflow-y-auto">
            {simulationLogs.map((log, i) => (
              <div key={i} className="leading-relaxed animate-in fade-in duration-200">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
