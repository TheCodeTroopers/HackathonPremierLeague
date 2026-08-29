import React from 'react';
import { PageRoute } from '../../types';
import { HPL_META, TIMELINE_PHASES } from '../../data/hplData';
import { Button } from '../common/Button';
import { SectionHeading } from '../common/SectionHeading';
import { Week1Illustration, Week2Illustration, Week3Illustration } from '../illustrations/JourneyIllustrations';
import { SparkleDoodle, ArrowDoodle } from '../illustrations/MicroDoodles';
import { ArrowRight, CheckCircle2, ShieldAlert, Award, FileCode, Users, Cpu, Layers, RefreshCw, Trophy } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const sixPhases = [
    {
      step: '01',
      title: 'PROBLEM RELEASE & SQUAD DRAFT',
      timing: 'Week 1 — Day 1',
      icon: FileCode,
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      description: 'Official track problem statements under the theme "Build For Udupi!" are revealed. Squads pick their challenge track, initialize GitHub repos, and meet their assigned track mentor.',
      deliverable: 'Clean GitHub Repo + System Architecture Blueprint'
    },
    {
      step: '02',
      title: 'FOUNDATION PROTOTYPE BUILD',
      timing: 'Week 1 — Days 2 & 3',
      icon: Cpu,
      color: 'bg-blue-100 text-blue-900 border-blue-300',
      description: 'Squads build core microservices, database schemas, and baseline frontend wireframes. Mid-sprint mentor checkpoints ensure technical feasibility and prevent blocker dead-ends.',
      deliverable: 'Working Prototype v1.0 + API Endpoints'
    },
    {
      step: '03',
      title: 'MATCH DAY 1: HEAD-TO-HEAD BATTLE',
      timing: 'Week 1 — Day 4',
      icon: Layers,
      color: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      description: 'Squads face off against opposing teams in front of live judges. Each squad gets 8 minutes to demo their working build, followed by 4 minutes of technical cross-examination.',
      deliverable: 'Live Demo Pitch + Points Awarded (+3 Win, +1 Tie, 0 Loss)'
    },
    {
      step: '04',
      title: 'FEATURE TWIST & MENTOR REVIEWS',
      timing: 'Week 2 — Days 1 & 2',
      icon: RefreshCw,
      color: 'bg-purple-100 text-purple-900 border-purple-300',
      description: 'The competition heats up! A surprise feature twist or high-load constraint is introduced. Mentors provide deep-dive code reviews and UI/UX critiques to guide the refactor.',
      deliverable: 'Code Refactor + Edge-case Handling'
    },
    {
      step: '05',
      title: 'MATCH DAY 2: PRESSURE TEST',
      timing: 'Week 2 — Days 3 & 4',
      icon: Users,
      color: 'bg-rose-100 text-rose-900 border-rose-300',
      description: 'Second round-robin showdown. Solutions are tested against real data pipelines, accessibility standards, and offline resilience. Cumulative points decide the Top 4 from each domain.',
      deliverable: 'Production Deployment v2.0 + Selection of Top 4 per Domain (12 Finalists)'
    },
    {
      step: '06',
      title: 'PLAYOFF ARENA & GRAND FINALE',
      timing: 'Week 3 — Grand Finale',
      icon: Trophy,
      color: 'bg-hpl-yellow text-ink border-ink',
      description: 'The 12 qualified squads (top 4 from each of the 3 domains) battle in the Grand Finale at SMVITM Bantakal. Final jury deliberations award the Golden HPL Trophy and prize pool.',
      deliverable: 'Championship Live Pitch + Trophy Award Ceremony'
    }
  ];

  const evaluationRubric = [
    { title: 'Problem Understanding', weight: 'Core Pillar', desc: 'Grasp of the problem domain, identification of user pain points, clear objective alignment, and constraint awareness.' },
    { title: 'Functionality', weight: 'Core Pillar', desc: 'Working completeness of features, end-to-end execution, computational accuracy, reliability, and error resilience.' },
    { title: 'User Experience', weight: 'Core Pillar', desc: 'Intuitive user journeys, visual polish, accessibility, responsiveness, and frictionless usability.' },
    { title: 'Technical Implementation', weight: 'Core Pillar', desc: 'Architectural soundness, clean code, secure API integrations, performance, and scalability.' },
    { title: 'Innovation', weight: 'Core Pillar', desc: 'Originality of concept, novel feature sets, creative problem solving, and competitive advantage.' },
    { title: 'Practicality', weight: 'Core Pillar', desc: 'Real-world viability, feasibility of deployment in target environments, cost efficiency, and tangible impact.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-dark sketch-border text-xs font-mono font-bold text-ink uppercase tracking-wider shadow-sketch-sm">
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
          OFFICIAL PROCESS BLUEPRINT
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-ink">
          HOW IT WORKS
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          The step-by-step competitive progression from problem statement release to the Grand Finale trophy.
        </p>
      </div>

      {/* 6-Phase Visual Journey */}
      <div className="space-y-6">
        <div className="text-center mb-4">
          <span className="text-xs font-mono font-bold text-hpl-coral uppercase tracking-widest">
            ✦ 6 SYSTEMATIC PHASES ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase text-ink mt-1">
            THE PROGRESSION PROCESS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sixPhases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.step}
                className="bg-paper-light sketch-border rounded-2xl p-6 shadow-sketch flex flex-col justify-between hover:shadow-sketch-lg transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-ink text-paper-light flex items-center justify-center font-display font-black text-base shadow-sketch-sm">
                      {phase.step}
                    </span>
                    <span className="text-xs font-mono font-bold text-hpl-indigo uppercase px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200">
                      {phase.timing}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display uppercase text-ink mb-2 group-hover:text-hpl-coral transition-colors">
                    {phase.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans mb-4">
                    {phase.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-ink/10">
                  <span className="text-[10px] font-mono font-bold text-ink-muted uppercase block">
                    KEY MILESTONE / DELIVERABLE:
                  </span>
                  <span className="text-xs font-bold font-display text-ink block mt-0.5">
                    ✓ {phase.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Points System & Qualification Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Points System */}
        <div className="lg:col-span-6 bg-paper-light sketch-border rounded-2xl p-6 sm:p-8 shadow-sketch-lg space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-hpl-emerald uppercase tracking-wider">
              ✦ MATCH DAY MECHANICS ✦
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink">
              POINTS SYSTEM
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted">
              League points from all match day evaluations are accumulated to determine the standings.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-emerald-50 sketch-border rounded-xl shadow-sketch-sm">
              <span className="font-display font-bold text-ink text-sm sm:text-base">Win Against Opponent</span>
              <span className="font-mono font-black text-emerald-800 text-lg sm:text-xl px-3 py-1 bg-emerald-200 rounded-lg border border-emerald-400">
                +3 POINTS
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-amber-50 sketch-border rounded-xl shadow-sketch-sm">
              <span className="font-display font-bold text-ink text-sm sm:text-base">Tie (Judges Deliberation)</span>
              <span className="font-mono font-black text-amber-800 text-lg sm:text-xl px-3 py-1 bg-amber-200 rounded-lg border border-amber-400">
                +1 POINT
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-rose-50 sketch-border rounded-xl shadow-sketch-sm">
              <span className="font-display font-bold text-ink text-sm sm:text-base">Loss</span>
              <span className="font-mono font-black text-rose-800 text-lg sm:text-xl px-3 py-1 bg-rose-200 rounded-lg border border-rose-400">
                0 POINTS
              </span>
            </div>
          </div>
        </div>

        {/* Qualification Criteria */}
        <div className="lg:col-span-6 bg-paper-cream sketch-border rounded-2xl p-6 sm:p-8 shadow-sketch-lg space-y-6 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-hpl-purple uppercase tracking-wider">
              ✦ PLAYOFF CUTOFF ✦
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink">
              PLAYOFF QUALIFICATION
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              After Week 2 completion, the top 4 squads from each of the 3 domains (12 teams total) on the cumulative league leaderboard automatically qualify for the Grand Finale.
            </p>
          </div>

          <div className="p-4 bg-paper-light sketch-border rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-hpl-yellow sketch-border flex items-center justify-center font-display font-black text-sm">
                1
              </span>
              <span className="text-sm font-bold font-display text-ink">Rank #1 (Advances to Semifinal 1)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-slate-200 sketch-border flex items-center justify-center font-display font-black text-sm">
                2
              </span>
              <span className="text-sm font-bold font-display text-ink">Rank #2 (Advances to Semifinal 2)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-200 sketch-border flex items-center justify-center font-display font-black text-sm">
                3
              </span>
              <span className="text-sm font-bold font-display text-ink">Rank #3 (Advances to Semifinal 2)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-paper-dark sketch-border flex items-center justify-center font-display font-black text-sm">
                4
              </span>
              <span className="text-sm font-bold font-display text-ink">Rank #4 (Advances to Semifinal 1)</span>
            </div>
          </div>

          <Button
            variant="purple"
            size="md"
            className="w-full"
            onClick={() => onNavigate('playoffs')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            VIEW PLAYOFF BRACKETS
          </Button>
        </div>
      </div>

      {/* Official Evaluation Rubric */}
      <div className="bg-paper-light sketch-border rounded-2xl p-6 sm:p-10 shadow-sketch-lg">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold text-hpl-indigo uppercase tracking-widest">
            ✦ TRANSPARENT JUDGING ✦
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink mt-1">
            OFFICIAL EVALUATION RUBRIC
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Every match day pitch and repo commit is graded across 5 rigorous pillars.
          </p>
        </div>

        <div className="space-y-4">
          {evaluationRubric.map((item, index) => (
            <div
              key={item.title}
              className="p-4 bg-paper-dark/60 sketch-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h4 className="text-base font-bold font-display uppercase text-ink">
                  {index + 1}. {item.title}
                </h4>
                <p className="text-xs text-ink-muted font-sans max-w-2xl">
                  {item.desc}
                </p>
              </div>
              <div className="px-4 py-2 bg-ink text-paper-light rounded-xl font-mono font-black text-base sketch-border flex-shrink-0 text-center sm:text-right shadow-sketch-sm">
                {item.weight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
