import React, { useState } from 'react';
import { PageRoute, MatchFixture } from '../../types';
import { MATCH_FIXTURES, SQUADS_DATA } from '../../data/hplData';
import { Button } from '../common/Button';
import { CountdownTimer } from '../common/CountdownTimer';
import { SparkleDoodle, CodeTagDoodle } from '../illustrations/MicroDoodles';
import { Swords, Clock, MapPin, CheckCircle2, Shield, ArrowRight, UploadCloud, Terminal, AlertCircle, ExternalLink } from 'lucide-react';

interface MatchDayPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const MatchDayPage: React.FC<MatchDayPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'fixtures' | 'submit' | 'brief'>('fixtures');
  const [selectedSquad, setSelectedSquad] = useState('CodeTroopers');
  const [repoUrl, setRepoUrl] = useState('https://github.com/hpl-squads/udupi-darshana');
  const [demoUrl, setDemoUrl] = useState('https://udupi-darshana.vercel.app');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionSuccess(true);
    setTimeout(() => {
      // auto reset notification state
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Match Day Arena Header with Countdown & Coming Soon Badge */}
      <div className="bg-ink text-paper-light sketch-border rounded-sketch-lg p-6 sm:p-10 shadow-sketch-xl relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400 text-amber-300 text-xs font-mono font-bold tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>ARENA COMING SOON • UNLOCKS AFTER SHORTLISTING</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white leading-tight">
              MATCH DAY ARENA: <br />
              <span className="text-hpl-yellow">HEAD-TO-HEAD SHOWDOWN</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-sans max-w-xl leading-relaxed">
              Match Day rounds, live scoring, surprise problem twists, and milestone submissions will go live once shortlisted squads are officially announced on <strong>8 September 2026</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-2">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-hpl-yellow" />
                <span>Shortlist Announcement: 8 September 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-hpl-coral" />
                <span>SMVITM Bantakal Main Arena & Virtual Pitch</span>
              </div>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <CountdownTimer label="MATCH DAY ARENA UNLOCKS IN" targetDate="2026-09-08T10:00:00" />
          </div>
        </div>
      </div>

      {/* Arena Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 border-b-2 border-ink pb-4">
        {[
          { id: 'fixtures', label: 'MATCH FIXTURES & RESULTS', icon: Swords },
          { id: 'brief', label: 'PROBLEM STATEMENT & TWIST', icon: Terminal },
          { id: 'submit', label: 'MILESTONE SUBMISSION DESK', icon: UploadCloud },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-hpl-purple text-white sketch-border shadow-sketch'
                  : 'bg-paper-light sketch-border text-ink hover:bg-paper-dark'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MATCH FIXTURES & BATTLES */}
      {activeTab === 'fixtures' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink">
                HEAD-TO-HEAD BATTLE CARDS
              </h2>
              <p className="text-xs font-mono text-amber-800 font-semibold mt-1">
                ✦ PREVIEW FORMAT • Official fixture matchups unlock once squads are shortlisted on Sept 8
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-ink-muted uppercase">
              PREVIEW FORMAT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MATCH_FIXTURES.map((match) => (
              <div
                key={match.id}
                className="bg-paper-light sketch-border rounded-2xl p-6 shadow-sketch hover:shadow-sketch-lg transition-all space-y-4"
              >
                {/* Match Header */}
                <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                  <span className="text-xs font-mono font-bold text-hpl-coral uppercase">
                    MATCH #{match.matchNumber} • {match.phase}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    match.status === 'completed' ? 'bg-slate-200 text-slate-800' : 'bg-rose-100 text-rose-800 animate-pulse border border-rose-300'
                  }`}>
                    {match.status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
                  </span>
                </div>

                {/* Squad vs Squad Arena Banner */}
                <div className="grid grid-cols-11 items-center gap-2 bg-paper-cream p-4 rounded-xl sketch-border">
                  {/* Squad 1 */}
                  <div className="col-span-5 text-center space-y-1">
                    <h4 className="font-display font-black text-sm sm:text-base text-ink uppercase truncate">
                      {match.squad1.name}
                    </h4>
                    {match.squad1.score !== undefined && (
                      <span className="inline-block font-mono font-black text-lg text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        {match.squad1.score} / 10
                      </span>
                    )}
                    {match.squad1.statusBadge && (
                      <span className="block text-[10px] font-mono font-bold text-emerald-800">
                        {match.squad1.statusBadge}
                      </span>
                    )}
                  </div>

                  {/* VS Emblem */}
                  <div className="col-span-1 flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-ink text-paper-light flex items-center justify-center font-display font-black text-xs shadow-sm">
                      VS
                    </span>
                  </div>

                  {/* Squad 2 */}
                  <div className="col-span-5 text-center space-y-1">
                    <h4 className="font-display font-black text-sm sm:text-base text-ink uppercase truncate">
                      {match.squad2.name}
                    </h4>
                    {match.squad2.score !== undefined && (
                      <span className="inline-block font-mono font-black text-lg text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                        {match.squad2.score} / 10
                      </span>
                    )}
                    {match.squad2.statusBadge && (
                      <span className="block text-[10px] font-mono font-bold text-slate-600">
                        {match.squad2.statusBadge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Problem Summary & Mentor */}
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-ink">
                    <span className="text-ink-muted font-normal">Track: </span>
                    {match.challengeTrack}
                  </div>
                  <div className="text-ink-muted leading-relaxed">
                    {match.problemSummary}
                  </div>
                  <div className="pt-2 text-[11px] font-mono font-bold text-hpl-indigo">
                    ✦ Lead Evaluator: {match.mentorInCharge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PROBLEM STATEMENT & TWIST */}
      {activeTab === 'brief' && (
        <div className="bg-paper-light sketch-border rounded-2xl p-6 sm:p-10 shadow-sketch-lg space-y-8">
          <div className="space-y-2 border-b-2 border-ink pb-6">
            <span className="text-xs font-mono font-bold text-hpl-coral uppercase tracking-wider">
              ✦ ACTIVE BRIEF • WEEK 2 ✦
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink">
              UDUPIDARSHANA & SAMUDRASETU MODIFIERS
            </h2>
            <p className="text-sm text-ink-muted">
              Released at the start of Week 2 to test architecture modularity, offline caching, and real-time streaming telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Core Requirement */}
            <div className="space-y-4 bg-paper-cream p-6 rounded-xl sketch-border">
              <h3 className="text-lg font-black font-display uppercase text-ink flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-hpl-emerald" />
                FOUNDATION REQUIREMENTS (WEEK 1)
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-ink-muted list-disc list-inside leading-relaxed">
                <li>Deploy responsive web & mobile interface for crowd telemetry in Udupi temple corridor.</li>
                <li>Implement RESTful API endpoints for queuing estimate times with sub-200ms latency.</li>
                <li>Support Kannada, English, and Hindi locale switching for multilingual accessibility.</li>
                <li>Store telemetry data in PostgreSQL / SQLite with structured migration scripts.</li>
              </ul>
            </div>

            {/* Surprise Modifier / Feature Twist */}
            <div className="space-y-4 bg-rose-50 p-6 rounded-xl sketch-border border-rose-300">
              <h3 className="text-lg font-black font-display uppercase text-rose-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-hpl-coral" />
                WEEK 2 SURPRISE TWIST: 4G OUTAGE RESILIENCE
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-950 list-disc list-inside leading-relaxed">
                <li><strong>Zero-Connectivity Mode:</strong> App must cache queue state locally in IndexedDB / SQLite when network drops along coastal roads.</li>
                <li><strong>Edge-Syncing Protocol:</strong> Automatic conflict-free syncing (CRDT) as soon as device reconnects to WiFi or cellular tower.</li>
                <li><strong>Voice Assistance:</strong> Kannada voice query recognition for pilgrims who cannot read text.</li>
                <li><strong>Live Stress Test:</strong> Judges will simulate 5,000 simulated concurrent requests during Match Day 2 defense.</li>
              </ul>
            </div>
          </div>

          {/* Code Spec Terminal */}
          <div className="bg-ink rounded-xl p-5 text-paper-light font-mono text-xs overflow-x-auto shadow-sketch">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700 text-slate-400">
              <span>endpoint-spec.ts</span>
              <span>HPL-2026-W2-CHALLENGE</span>
            </div>
            <pre className="text-emerald-400 leading-relaxed">
{`// HPL Live Telemetry Checkpoint Validator
interface PilgrimQueuePacket {
  nodeId: "UDUPI-SRIKRISHNA-GOPURA-01";
  timestamp: string; // ISO 8601
  estimatedWaitMinutes: number;
  crowdDensityIndex: "LOW" | "MODERATE" | "SURGE" | "PEAK";
  offlineSyncHash: string; // SHA-256 validation for zero-loss audit
}

// Requirement: Must handle 5,000 req/sec benchmark with p99 < 150ms`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: SUBMISSION DESK */}
      {activeTab === 'submit' && (
        <div className="max-w-2xl mx-auto bg-paper-light sketch-border rounded-2xl p-6 sm:p-10 shadow-sketch-lg space-y-6">
          <div className="space-y-2 text-center">
            <span className="text-xs font-mono font-bold text-hpl-purple uppercase tracking-wider">
              ✦ SPRINT DELIVERABLE PORTAL ✦
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink">
              SUBMIT MILESTONE BUILD
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Submit your GitHub Pull Request, deployed live demo, and video walkthrough before the countdown timer hits zero.
            </p>
          </div>

          {submissionSuccess && (
            <div className="p-4 bg-emerald-100 sketch-border rounded-xl text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-hpl-emerald flex-shrink-0" />
              <span>Milestone build received and timestamped on the HPL League Ledger! Evaluators have been notified.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                Select Your Squad
              </label>
              <select
                value={selectedSquad}
                onChange={(e) => setSelectedSquad(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink font-display font-bold text-sm focus:outline-none focus:ring-2 focus:ring-hpl-purple"
              >
                {SQUADS_DATA.map((sq) => (
                  <option key={sq.id} value={sq.name}>
                    {sq.number} {sq.name} ({sq.college})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                GitHub Repository / PR Link
              </label>
              <input
                type="url"
                required
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink font-mono text-xs focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                placeholder="https://github.com/hpl-squads/your-squad"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                Live Hosted Demo URL (Vercel / Netlify / Render)
              </label>
              <input
                type="url"
                required
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink font-mono text-xs focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                placeholder="https://your-demo.vercel.app"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                2-Minute Video Pitch Walkthrough Link (Loom / YouTube)
              </label>
              <input
                type="url"
                required
                defaultValue="https://loom.com/share/hpl-sprint2-demo"
                className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink font-mono text-xs focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                placeholder="https://loom.com/share/your-pitch"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="purple"
                size="lg"
                className="w-full"
                icon={<UploadCloud className="w-5 h-5" />}
              >
                LOCK IN SPRINT SUBMISSION
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
