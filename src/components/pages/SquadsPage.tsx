import React, { useState } from 'react';
import { PageRoute, Squad } from '../../types';
import { SQUADS_DATA } from '../../data/hplData';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { SparkleDoodle } from '../illustrations/MicroDoodles';
import { Search, Filter, Users, Trophy, Award, ExternalLink, Code2, CheckCircle2, ChevronRight } from 'lucide-react';

interface SquadsPageProps {
  onNavigate: (page: PageRoute) => void;
  selectedSquadId?: string | null;
}

export const SquadsPage: React.FC<SquadsPageProps> = ({ onNavigate, selectedSquadId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [activeModalSquad, setActiveModalSquad] = useState<Squad | null>(
    selectedSquadId ? SQUADS_DATA.find(s => s.id === selectedSquadId) || null : null
  );

  const tracks = ['All', 'Build For Udupi', 'Coastal Tech', 'AI for Governance', 'Smart Pilgrimage', 'Green Tech'];

  const filteredSquads = SQUADS_DATA.filter(squad => {
    const matchesSearch = squad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          squad.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          squad.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          squad.lead.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrack = selectedTrack === 'All' || squad.track === selectedTrack;
    return matchesSearch && matchesTrack;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-dark sketch-border text-xs font-mono font-bold text-ink uppercase tracking-wider shadow-sketch-sm">
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
          OFFICIAL SQUAD DIRECTORY
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-ink">
          COMPETING SQUADS
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          Meet the 8 student engineering squads competing for the HPL Championship Trophy.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-paper-light sketch-border rounded-2xl p-4 sm:p-6 shadow-sketch flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by squad, college, lead or project..."
            className="w-full pl-10 pr-4 py-2 rounded-xl sketch-border bg-paper-cream text-ink font-sans text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-hpl-purple"
          />
        </div>

        {/* Track Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {tracks.map((track) => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedTrack === track
                  ? 'bg-ink text-paper-light sketch-border shadow-sketch-sm'
                  : 'bg-paper-cream sketch-border text-ink hover:bg-paper-dark'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      {/* Squad Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSquads.map((squad) => (
          <div
            key={squad.id}
            onClick={() => setActiveModalSquad(squad)}
            className="bg-paper-light sketch-border rounded-2xl p-6 shadow-sketch hover:shadow-sketch-lg transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Top Banner */}
              <div className="flex items-center justify-between mb-3 border-b border-ink/10 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-8 h-8 rounded-xl sketch-border flex items-center justify-center font-display font-black text-xs shadow-sketch-sm"
                    style={{ backgroundColor: squad.accentColor, color: '#FFFFFF' }}
                  >
                    {squad.number}
                  </span>
                  <div>
                    <h3 className="font-black font-display text-lg text-ink uppercase group-hover:text-hpl-coral transition-colors">
                      {squad.name}
                    </h3>
                    <p className="text-[11px] font-mono text-ink-muted">
                      {squad.college}
                    </p>
                  </div>
                </div>

                {squad.isPlayoffQualified && (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold rounded border border-emerald-300">
                    TOP 4
                  </span>
                )}
              </div>

              {/* Track Badge */}
              <div className="mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-paper-cream sketch-border text-[10px] font-mono font-bold text-ink uppercase">
                  {squad.track}
                </span>
              </div>

              {/* Project Title & Summary */}
              <div className="space-y-1 mb-4">
                <h4 className="text-sm font-bold font-display text-ink leading-snug">
                  {squad.projectName}
                </h4>
                <p className="text-xs text-ink-muted font-sans line-clamp-2 leading-relaxed">
                  {squad.projectSummary}
                </p>
              </div>

              {/* Members List */}
              <div className="space-y-1 pt-2 border-t border-ink/10">
                <span className="text-[10px] font-mono font-bold text-ink-muted uppercase block">
                  SQUAD ROSTER ({squad.members.length} BUILDERS):
                </span>
                <div className="text-[11px] font-sans text-ink font-semibold flex flex-wrap gap-1.5">
                  {squad.members.map((m, idx) => (
                    <span key={idx} className="bg-paper-dark px-2 py-0.5 rounded sketch-border text-[10px]">
                      {m.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Record Bar */}
            <div className="mt-4 pt-3 border-t-2 border-ink flex items-center justify-between">
              <div className="text-xs font-mono">
                <span className="text-ink-muted">W-T-L: </span>
                <span className="font-bold text-emerald-700">{squad.wins}</span>-
                <span className="font-bold text-slate-600">{squad.ties}</span>-
                <span className="font-bold text-rose-700">{squad.losses}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-bold text-ink-muted">TOTAL:</span>
                <span className="px-2 py-0.5 rounded bg-ink text-paper-light font-display font-black text-sm shadow-sketch-sm">
                  {squad.points} PTS
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Squad Detailed Modal */}
      {activeModalSquad && (
        <Modal
          isOpen={!!activeModalSquad}
          onClose={() => setActiveModalSquad(null)}
          title={`${activeModalSquad.number} ${activeModalSquad.name}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-paper-cream rounded-xl sketch-border">
              <div>
                <span className="text-xs font-mono text-ink-muted block">INSTITUTION:</span>
                <span className="text-sm font-bold font-display text-ink">{activeModalSquad.college}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-ink-muted block">CURRENT RANK:</span>
                <span className="text-sm font-black font-display text-hpl-coral">RANK #{activeModalSquad.rank} ({activeModalSquad.points} PTS)</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-hpl-indigo uppercase block">PROJECT INNOVATION</span>
              <h4 className="text-lg font-black font-display text-ink uppercase">
                {activeModalSquad.projectName}
              </h4>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
                {activeModalSquad.projectSummary}
              </p>
            </div>

            {/* Score Breakdown Radar */}
            <div className="space-y-2 pt-2 border-t border-ink/10">
              <span className="text-xs font-mono font-bold text-ink-muted uppercase block">
                EVALUATOR SCORECARD BREAKDOWN (OUT OF 10):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-paper-dark rounded-lg sketch-border">
                  <span className="text-ink-muted block text-[10px]">INNOVATION:</span>
                  <span className="font-black text-sm text-ink">{activeModalSquad.scoreBreakdown.innovation} / 10</span>
                </div>
                <div className="p-2.5 bg-paper-dark rounded-lg sketch-border">
                  <span className="text-ink-muted block text-[10px]">CODE QUALITY:</span>
                  <span className="font-black text-sm text-ink">{activeModalSquad.scoreBreakdown.codeQuality} / 10</span>
                </div>
                <div className="p-2.5 bg-paper-dark rounded-lg sketch-border">
                  <span className="text-ink-muted block text-[10px]">LOCAL IMPACT:</span>
                  <span className="font-black text-sm text-ink">{activeModalSquad.scoreBreakdown.impact} / 10</span>
                </div>
                <div className="p-2.5 bg-paper-dark rounded-lg sketch-border">
                  <span className="text-ink-muted block text-[10px]">WEEK 1 SPRINT:</span>
                  <span className="font-black text-sm text-ink">{activeModalSquad.scoreBreakdown.week1} / 10</span>
                </div>
                <div className="p-2.5 bg-paper-dark rounded-lg sketch-border">
                  <span className="text-ink-muted block text-[10px]">WEEK 2 SPRINT:</span>
                  <span className="font-black text-sm text-ink">{activeModalSquad.scoreBreakdown.week2} / 10</span>
                </div>
              </div>
            </div>

            {/* Squad Members */}
            <div className="space-y-2 pt-2 border-t border-ink/10">
              <span className="text-xs font-mono font-bold text-ink-muted uppercase block">
                TEAM ROSTER & SPECIALIZATIONS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalSquad.members.map((member, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-paper-cream rounded-lg sketch-border text-xs font-bold font-sans text-ink">
                    <CheckCircle2 className="w-3.5 h-3.5 text-hpl-emerald flex-shrink-0" />
                    <span>{member}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="purple"
                size="md"
                className="w-full"
                onClick={() => {
                  setActiveModalSquad(null);
                  onNavigate('leaderboard');
                }}
              >
                VIEW ON LEAGUE TABLE
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
