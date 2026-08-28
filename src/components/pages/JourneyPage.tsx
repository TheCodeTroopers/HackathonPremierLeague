import React from 'react';
import { PageRoute } from '../../types';
import { Button } from '../common/Button';
import { Week1Illustration, Week2Illustration, Week3Illustration } from '../illustrations/JourneyIllustrations';
import { SparkleDoodle, ArrowDoodle } from '../illustrations/MicroDoodles';
import { Calendar, Flag, CheckCircle2, Trophy, ArrowRight, Zap, Target } from 'lucide-react';

interface JourneyPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const JourneyPage: React.FC<JourneyPageProps> = ({ onNavigate }) => {
  const milestones = [
    {
      date: '15 JULY 2026',
      stage: 'STAGE 01',
      title: 'SEASON OPENER & TRACK RELEASE',
      subtitle: 'The Journey Begins',
      tag: 'KICKOFF',
      color: 'emerald',
      illustration: <Week1Illustration className="w-20 h-20" />,
      desc: 'Problem statements under the theme "Build For Udupi!" go live. Registered squads receive GitHub organization access, configure their repositories, and attend the virtual opening orientation.',
      checklist: ['Official Problem Brief Release', 'Track Mentor Allocation', 'Repository Setup & CI/CD Pipeline']
    },
    {
      date: '16 – 17 JULY 2026',
      stage: 'STAGE 02',
      title: 'SPRINT 1: CORE ARCHITECTURE BUILD',
      subtitle: 'Foundation Prototype',
      tag: 'BUILD SPRINT',
      color: 'blue',
      illustration: <Week1Illustration className="w-20 h-20" />,
      desc: 'Intense 48-hour build window where teams develop database schemas, core backend microservices, and mobile/web frontends. Mid-sprint mentor checkpoints give early architectural guidance.',
      checklist: ['Database Migration & API Endpoints', 'Baseline Frontend UI Wireframes', 'Mid-sprint Mentor Architecture Review']
    },
    {
      date: '18 JULY 2026',
      stage: 'STAGE 03',
      title: 'MATCH DAY 1: HEAD-TO-HEAD PITCHES',
      subtitle: 'First League Points on the Line',
      tag: 'MATCH DAY 1',
      color: 'purple',
      illustration: <Week2Illustration className="w-20 h-20" />,
      desc: 'Squads face off in 12-minute virtual pitching battles against peer teams. Evaluators score live demos, and match points (+3 Win, +1 Tie, 0 Loss) update the public leaderboard.',
      checklist: ['Live Demo v1.0 Presentation', 'Q&A Cross-Examination', 'First Official Leaderboard Standings']
    },
    {
      date: '22 JULY 2026',
      stage: 'STAGE 04',
      title: 'PART 2 RELEASE: THE SURPRISE TWIST',
      subtitle: 'Pressure Test & Constraint Addition',
      tag: 'FEATURE TWIST',
      color: 'rose',
      illustration: <Week2Illustration className="w-20 h-20" />,
      desc: 'A surprise constraint layer is dropped! Squads must adapt to high-load simulated traffic, offline resilience modes, and Kannada voice accessibility requirements.',
      checklist: ['Modifier Brief Announcement', 'Resilience & Offline Syncing', '1-on-1 Mentor Code Review']
    },
    {
      date: '24 JULY 2026',
      stage: 'STAGE 05',
      title: 'MATCH DAY 2: SHOWDOWN & PLAYOFF CUT',
      subtitle: 'The Battle for Top 4',
      tag: 'MATCH DAY 2',
      color: 'amber',
      illustration: <Week2Illustration className="w-20 h-20" />,
      desc: 'Second head-to-head match day. Squads defend their refactored builds against simulated chaos tests. At the end of the day, the Top 4 Playoff qualifiers are officially announced.',
      checklist: ['Load & Stress Benchmark Defense', 'Final Round-Robin Points Tally', 'Official Top 4 Playoff Selection']
    },
    {
      date: '19 – 22 AUGUST 2026',
      stage: 'STAGE 06',
      title: 'GRAND PLAYOFFS & CHAMPIONSHIP FINALE',
      subtitle: 'Physical Arena at SMVITM Bantakal',
      tag: 'GRAND FINALE',
      color: 'gold',
      illustration: <Week3Illustration className="w-20 h-20" />,
      desc: 'The Top 4 squads gather at the SMVITM Auditorium Arena. Semifinals, 3rd place match, and Grand Finale live stage demonstrations in front of industry juries and venture investors.',
      checklist: ['Physical Arena 24H Sprint', 'Semifinal 1 & 2 Knockouts', 'Grand Championship Trophy Presentation']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-dark sketch-border text-xs font-mono font-bold text-ink uppercase tracking-wider shadow-sketch-sm">
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
          FULL SEASON CHRONOLOGY
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-ink">
          THE LEAGUE TIMELINE
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          From the opening kickoff to lifting the trophy at SMVITM Bantakal — explore every stage of the HPL season.
        </p>
      </div>

      {/* Timeline Roadmap Cards */}
      <div className="relative space-y-8">
        {milestones.map((item, index) => (
          <div
            key={item.stage}
            className="bg-paper-light sketch-border rounded-2xl p-6 sm:p-8 shadow-sketch hover:shadow-sketch-lg transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Stage Badge & Date */}
              <div className="lg:col-span-3 space-y-2 border-b lg:border-b-0 lg:border-r border-ink/15 pb-4 lg:pb-0 lg:pr-6">
                <span className="inline-block px-3 py-1 bg-ink text-paper-light text-xs font-mono font-black rounded-lg shadow-sketch-sm">
                  {item.stage}
                </span>
                <h4 className="text-xl font-black font-display text-ink uppercase">
                  {item.date}
                </h4>
                <span className="inline-block px-2.5 py-0.5 rounded bg-paper-cream sketch-border text-[10px] font-mono font-bold text-hpl-coral uppercase">
                  ✦ {item.tag}
                </span>
              </div>

              {/* Center Content */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-mono font-bold text-ink-muted uppercase">
                  {item.subtitle}
                </span>
                <h3 className="text-2xl font-black font-display text-ink uppercase">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
                  {item.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  {item.checklist.map((chk, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] font-bold font-sans text-ink bg-paper-dark p-2 rounded sketch-border">
                      <CheckCircle2 className="w-3.5 h-3.5 text-hpl-emerald flex-shrink-0" />
                      <span className="truncate">{chk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Illustrated Badge */}
              <div className="lg:col-span-2 flex justify-center lg:justify-end">
                {item.illustration}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-paper-cream sketch-border rounded-2xl p-8 text-center shadow-sketch-lg">
        <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink mb-2">
          JOIN THE SEASON 2026 EXPEDITION
        </h3>
        <p className="text-sm text-ink-muted max-w-lg mx-auto mb-6">
          Registrations close once 16 qualified collegiate squads are verified.
        </p>
        <Button
          variant="purple"
          size="lg"
          onClick={() => onNavigate('register')}
          icon={<ArrowRight className="w-5 h-5" />}
        >
          REGISTER NOW
        </Button>
      </div>
    </div>
  );
};
