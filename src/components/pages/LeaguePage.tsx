import React from 'react';
import { PageRoute } from '../../types';
import { Button } from '../common/Button';
import { SectionHeading } from '../common/SectionHeading';
import { AboutIllustration } from '../illustrations/AboutIllustration';
import { Week1Illustration, Week2Illustration, Week3Illustration } from '../illustrations/JourneyIllustrations';
import { SparkleDoodle, TrophyBadge, ArrowDoodle } from '../illustrations/MicroDoodles';
import { ArrowRight, Lightbulb, Users, Swords, MessageSquare, TrendingUp, Trophy, Award, CheckCircle2 } from 'lucide-react';

interface LeaguePageProps {
  onNavigate: (page: PageRoute) => void;
}

export const LeaguePage: React.FC<LeaguePageProps> = ({ onNavigate }) => {
  const leagueSteps = [
    {
      number: '01',
      title: 'THE IDEA',
      subtitle: 'Why a Premier League?',
      icon: Lightbulb,
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'Traditional 24-hour hackathons reward hasty hacks and sleep deprivation. HPL turns software innovation into a premier multi-week league where solutions evolve through real engineering sprints, testing, and feedback loops.',
      points: [
        '3 progressive match weeks instead of a rushed overnight crunch',
        'Head-to-head match fixtures designed for genuine problem-solving',
        'Deep alignment with Udupi\'s coastal, cultural, and municipal challenges'
      ]
    },
    {
      number: '02',
      title: 'THE SQUADS',
      subtitle: 'Cross-Disciplinary Powerhouses',
      icon: Users,
      color: 'bg-blue-100 text-blue-900 border-blue-300',
      description: 'Squads assemble with 3 to 4 specialized builders. Just like premier sports franchises, successful squads balance backend architects, frontend craftsmen, AI/ML researchers, and product presenters.',
      points: [
        'Balanced 3-4 member squads across technology disciplines',
        'Official squad badges, numbers, and team repos',
        'Assigned mentor advisors for each challenge track'
      ]
    },
    {
      number: '03',
      title: 'THE MATCHES',
      subtitle: 'Head-to-Head Showdowns',
      icon: Swords,
      color: 'bg-rose-100 text-rose-900 border-rose-300',
      description: 'Every week features official Match Days. Squads face off against peer teams in their track, presenting working software demos, architecture diagrams, and test telemetry to an evaluation panel.',
      points: [
        'Win: +3 Points | Tie: +1 Point | Loss: 0 Points',
        'Live demo battles judged on code quality & user experience',
        'Real-time points allocation directly to the public leaderboard'
      ]
    },
    {
      number: '04',
      title: 'THE FEEDBACK',
      subtitle: 'Iterate & Engineer',
      icon: MessageSquare,
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      description: 'After every match day, squads receive detailed technical critiques from industry architects. Week 2 introduces a surprise requirement or load constraint to test how resiliently squads adapt.',
      points: [
        '1-on-1 mentor office hours and code reviews',
        'Feature twists that test modularity and clean abstractions',
        'Continuous improvement rewarded over static prototypes'
      ]
    },
    {
      number: '05',
      title: 'THE RANKINGS',
      subtitle: 'Climb the Table',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-900 border-purple-300',
      description: 'The live leaderboard updates dynamically after every evaluation round. Squads watch their rank rise or fall based on cumulative match points, code benchmarks, and innovation scores.',
      points: [
        'Dynamic table tracking Wins, Ties, Losses, and Total Points',
        'Movement indicators (↑ Rising, → Stable, ↓ Falling)',
        'Top 4 squads from each domain (12 teams) qualify for the Grand Finale'
      ]
    },
    {
      number: '06',
      title: 'THE PLAYOFFS',
      subtitle: 'Knockout Arena',
      icon: Trophy,
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'The top 4 ranked squads from each of the 3 domains (12 finalist teams total) enter the championship stadium for the high-stakes final showdown.',
      points: [
        'Physical arena sprint at SMVITM Bantakal Auditorium',
        'Live code stress tests and jury cross-examinations',
        'Bronze 3rd-place match and Championship Grand Finale'
      ]
    },
    {
      number: '07',
      title: 'THE CHAMPION',
      subtitle: 'Trophy & Legacy',
      icon: Award,
      color: 'bg-hpl-yellow text-ink border-ink',
      description: 'The Grand Champion lifts the golden HPL Trophy, claims the major cash prize pool, secures incubation support with industry partners, and enters the HPL Hall of Fame.',
      points: [
        'Official Golden HPL Champion Trophy & Medals',
        'Substantial cash prize pool and cloud infrastructure credits',
        'Direct angel incubation and tech internship fast-tracks'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-dark sketch-border text-xs font-mono font-bold text-ink uppercase tracking-wider shadow-sketch-sm">
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
          THE HPL PHILOSOPHY
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-ink">
          THE LEAGUE SYSTEM
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          How HPL redefines hackathons from chaotic 24-hour sprints into a structured 3-week engineering championship.
        </p>
      </div>

      {/* Overview Card */}
      <div className="bg-paper-light sketch-border rounded-sketch-lg p-6 sm:p-10 shadow-sketch-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink">
              BUILD → COMPETE → LEARN → IMPROVE → RISE
            </h3>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              In professional sports, teams train, execute game plans, analyze game tape, adjust tactics, and return stronger for the next match. HPL applies this exact iterative discipline to software engineering.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                variant="purple"
                size="md"
                onClick={() => onNavigate('how-it-works')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                VIEW PROCESS DETAILS
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('squads')}
              >
                EXPLORE SQUADS
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <AboutIllustration />
          </div>
        </div>
      </div>

      {/* 7-Step Illustrated Storytelling Sequence */}
      <div className="space-y-8">
        <div className="text-center">
          <span className="text-xs font-mono font-bold text-hpl-coral uppercase tracking-widest">
            ✦ COMPLETE TOURNAMENT LIFECYCLE ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase text-ink mt-1">
            THE 7 PILLARS OF HPL
          </h2>
        </div>

        <div className="space-y-6">
          {leagueSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-paper-light sketch-border rounded-2xl p-6 sm:p-8 shadow-sketch hover:shadow-sketch-lg transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Step Badge & Icon */}
                  <div className="lg:col-span-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-ink text-paper-light flex items-center justify-center font-display font-black text-2xl sketch-border shadow-sketch-sm flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-hpl-coral uppercase tracking-wider">
                        {step.subtitle}
                      </span>
                      <h3 className="text-2xl font-black font-display uppercase text-ink">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right Narrative & Bullet Points */}
                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
                      {step.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {step.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-ink">
                          <CheckCircle2 className="w-4 h-4 text-hpl-emerald flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-paper-cream sketch-border rounded-2xl p-8 text-center shadow-sketch-lg">
        <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-ink mb-2">
          READY TO FORM YOUR SQUAD?
        </h3>
        <p className="text-sm text-ink-muted max-w-lg mx-auto mb-6">
          Gather 3 to 4 team members and claim your spot in Season 2026.
        </p>
        <Button
          variant="purple"
          size="lg"
          onClick={() => onNavigate('register')}
          icon={<ArrowRight className="w-5 h-5" />}
        >
          ENTER THE LEAGUE
        </Button>
      </div>
    </div>
  );
};
