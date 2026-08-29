import React from 'react';
import { PageRoute } from '../../types';
import { Button } from '../common/Button';
import { SQUADS_DATA } from '../../data/hplData';
import { Week3Illustration } from '../illustrations/JourneyIllustrations';
import { SparkleDoodle, TrophyBadge } from '../illustrations/MicroDoodles';
import { Trophy, Award, MapPin, Calendar, Users, ShieldCheck, ArrowRight, Star, Flame } from 'lucide-react';

interface PlayoffsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const PlayoffsPage: React.FC<PlayoffsPageProps> = ({ onNavigate }) => {
  const playoffSquads = SQUADS_DATA.slice(0, 4);

  const prizePool = [
    { rank: 'CHAMPION', reward: '₹15,000 + Golden HPL Trophy', perks: 'Grand Champion Trophy + Incubation Fast-Track + Medals', color: 'bg-amber-100 border-amber-400 text-amber-900' },
    { rank: 'RUNNER UP', reward: '₹10,000 + Silver Shield', perks: 'Silver Shield + Pre-Incubation Mentorship & Cloud Credits', color: 'bg-slate-100 border-slate-300 text-slate-900' },
    { rank: '2ND RUNNER UP', reward: '₹5,000 + Bronze Shield', perks: 'Bronze Shield + Certificate of Engineering Excellence', color: 'bg-orange-100 border-orange-300 text-orange-900' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-dark sketch-border text-xs font-mono font-bold text-ink uppercase tracking-wider shadow-sketch-sm">
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
          KNOCKOUT CHAMPIONSHIP ARENA
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-ink">
          THE PLAYOFFS
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          The 12 finalist squads (Top 4 from each of the 3 domains) face off in the physical championship arena at SMVITM Bantakal to crown the Season 2026 Champion.
        </p>
      </div>

      {/* Playoff Venue & Date Card */}
      <div className="bg-ink text-paper-light sketch-border rounded-sketch-lg p-6 sm:p-8 shadow-sketch-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="px-3 py-1 bg-hpl-yellow text-ink font-mono font-black text-xs rounded-full uppercase">
              PHYSICAL FINALE ARENA
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-white">
              SMVITM CAMPUS AUDITORIUM ARENA, BANTAKAL
            </h3>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-hpl-yellow" />
                <span>19 – 22 August 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-hpl-coral" />
                <span>Bantakal, Udupi, Karnataka</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <Week3Illustration className="w-28 h-28" />
          </div>
        </div>
      </div>

      {/* Interactive Tournament Bracket Arena */}
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono font-bold text-hpl-coral uppercase tracking-widest">
            ✦ TOURNAMENT BRACKET ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase text-ink mt-1">
            CHAMPIONSHIP KNOCKOUT BRACKET
          </h2>
        </div>

        <div className="bg-paper-light sketch-border rounded-sketch-lg p-6 sm:p-10 shadow-sketch-lg overflow-x-auto">
          <div className="min-w-[760px] grid grid-cols-3 gap-8 items-center relative">
            {/* Column 1: Semifinals */}
            <div className="space-y-8">
              <div className="text-xs font-mono font-bold text-hpl-indigo uppercase text-center border-b border-ink/20 pb-2">
                SEMIFINALS (20 AUG)
              </div>

              {/* Semifinal 1 Box */}
              <div className="bg-paper-cream sketch-border rounded-xl p-4 space-y-2 shadow-sketch">
                <span className="text-[10px] font-mono font-bold text-ink-muted uppercase block">
                  SEMIFINAL 1 • 10:00 AM
                </span>
                <div className="flex items-center justify-between p-2 rounded bg-emerald-100/60 sketch-border">
                  <span className="font-display font-bold text-xs text-ink">{playoffSquads[0].name} (Rank #1)</span>
                  <span className="font-mono text-xs font-black text-emerald-800">10 PTS</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-paper-dark sketch-border">
                  <span className="font-display font-bold text-xs text-ink">{playoffSquads[3].name} (Rank #4)</span>
                  <span className="font-mono text-xs font-black text-ink-muted">6 PTS</span>
                </div>
              </div>

              {/* Semifinal 2 Box */}
              <div className="bg-paper-cream sketch-border rounded-xl p-4 space-y-2 shadow-sketch">
                <span className="text-[10px] font-mono font-bold text-ink-muted uppercase block">
                  SEMIFINAL 2 • 02:00 PM
                </span>
                <div className="flex items-center justify-between p-2 rounded bg-blue-100/60 sketch-border">
                  <span className="font-display font-bold text-xs text-ink">{playoffSquads[1].name} (Rank #2)</span>
                  <span className="font-mono text-xs font-black text-blue-800">9 PTS</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-paper-dark sketch-border">
                  <span className="font-display font-bold text-xs text-ink">{playoffSquads[2].name} (Rank #3)</span>
                  <span className="font-mono text-xs font-black text-ink-muted">7 PTS</span>
                </div>
              </div>
            </div>

            {/* Column 2: 3rd Place Match & Connectors */}
            <div className="space-y-6 text-center">
              <div className="text-xs font-mono font-bold text-amber-800 uppercase border-b border-ink/20 pb-2">
                3RD PLACE MATCH (21 AUG)
              </div>

              <div className="bg-amber-50 sketch-border rounded-xl p-4 space-y-2 shadow-sketch">
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase block">
                  BRONZE SHIELD DECIDER
                </span>
                <div className="p-2 rounded bg-paper-light sketch-border text-xs font-bold font-display text-ink">
                  Runner-up Semifinal 1
                </div>
                <div className="text-[11px] font-bold text-ink font-display">VS</div>
                <div className="p-2 rounded bg-paper-light sketch-border text-xs font-bold font-display text-ink">
                  Runner-up Semifinal 2
                </div>
              </div>
            </div>

            {/* Column 3: Grand Finale Championship */}
            <div className="space-y-4 text-center">
              <div className="text-xs font-mono font-bold text-hpl-coral uppercase border-b border-ink/20 pb-2">
                GRAND FINALE (22 AUG)
              </div>

              <div className="bg-amber-100 sketch-border-thick rounded-2xl p-6 space-y-4 shadow-sketch-lg border-hpl-yellow">
                <div className="w-12 h-12 rounded-full bg-hpl-yellow mx-auto flex items-center justify-center sketch-border shadow-sketch-sm">
                  <Trophy className="w-6 h-6 text-ink" />
                </div>
                <div>
                  <span className="text-xs font-mono font-black text-hpl-coral uppercase tracking-wider block">
                    GRAND CHAMPIONSHIP MATCH
                  </span>
                  <h4 className="text-lg font-black font-display uppercase text-ink mt-1">
                    WINNER SF1 vs WINNER SF2
                  </h4>
                </div>

                <div className="p-3 bg-paper-light rounded-xl sketch-border text-xs font-mono font-bold text-ink">
                  🏆 PRIZE: ₹50,000 + GOLDEN HPL TROPHY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prize Pool Breakdown */}
      <div className="bg-paper-light sketch-border rounded-2xl p-6 sm:p-10 shadow-sketch-lg space-y-8">
        <div className="text-center">
          <span className="text-xs font-mono font-bold text-hpl-gold uppercase tracking-widest">
            ✦ REWARDS & RECOGNITION ✦
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink mt-1">
            PRIZE POOL & INCUBATION GRANTS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizePool.map((prize) => (
            <div
              key={prize.rank}
              className={`p-6 rounded-2xl sketch-border shadow-sketch flex flex-col justify-between ${prize.color}`}
            >
              <div>
                <span className="text-xs font-mono font-black uppercase tracking-wider block mb-1">
                  {prize.rank}
                </span>
                <h3 className="text-xl font-black font-display uppercase text-ink mb-3">
                  {prize.reward}
                </h3>
                <p className="text-xs font-sans leading-relaxed text-ink/80">
                  {prize.perks}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
