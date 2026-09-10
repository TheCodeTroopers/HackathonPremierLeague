import React from 'react';
import { PageRoute } from '../../types';
import { Sparkles, Trophy, ArrowRight, ShieldAlert, Clock } from 'lucide-react';

interface DeadlineMarqueeProps {
  onNavigate: (page: PageRoute) => void;
  onOpenNotice?: () => void;
}

export const DeadlineMarquee: React.FC<DeadlineMarqueeProps> = ({
  onNavigate,
  onOpenNotice
}) => {
  const marqueeItems = [
    {
      icon: <Trophy className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />,
      text: '🎉 ROUND 2 SHORTLISTED SQUADS OFFICIALLY ANNOUNCED!',
      highlight: true
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-yellow-300 flex-shrink-0" />,
      text: '40 TEAMS QUALIFIED FOR LIVE STAKEHOLDER ROUND',
      highlight: false
    },
    {
      icon: <ArrowRight className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />,
      text: 'CLICK TO VIEW SHORTLISTED SQUADS DIRECTORY',
      highlight: true
    }
  ];

  const renderTrack = (trackKey: string, isAriaHidden = false) => (
    <div
      key={trackKey}
      className="flex items-center gap-6 sm:gap-8 px-4 flex-shrink-0 font-mono text-[11px] sm:text-xs font-black uppercase text-white tracking-wider"
      aria-hidden={isAriaHidden}
    >
      {marqueeItems.map((item, idx) => (
        <React.Fragment key={`${trackKey}-${idx}`}>
          <div className="flex items-center gap-2 cursor-pointer hover:text-amber-200 transition-colors">
            {item.icon}
            <span className={item.highlight ? 'text-amber-300 underline decoration-amber-400/60 underline-offset-2' : 'text-white'}>
              {item.text}
            </span>
          </div>
          <span className="text-amber-400 font-bold opacity-80 select-none">✦</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <aside 
      aria-label="Round 2 Shortlisted Squads Announcement"
      className="relative z-30 w-full overflow-hidden bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#B91C1C] border-b-2 border-t border-[#1E1B4B] shadow-[0_2px_4px_rgba(0,0,0,0.12)] select-none"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between py-2 sm:py-2.5">
        
        {/* Left Sticky/Fixed Alert Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 z-10 pr-2 sm:pr-3 border-r-2 border-[#1E1B4B]/30 mr-1 sm:mr-3">
          <div
            className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-[#1E1B4B] text-white border border-amber-400/40 text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider shadow-sm"
          >
            <span className="text-amber-300 font-display">ROUND 2</span>
            <span className="hidden xs:inline text-white/90">ANNOUNCED</span>
          </div>
        </div>

        {/* Continuous Animated Marquee Ticker Loop */}
        <div 
          onClick={() => onNavigate('shortlisted')} 
          className="flex-1 overflow-hidden cursor-pointer group"
          title="Click to view shortlisted squads"
        >
          <div className="flex w-fit animate-marquee-ticker whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]">
            {/* Track 1 */}
            {renderTrack('track-1')}
            {/* Track 2 (Infinite loop clone) */}
            {renderTrack('track-2', true)}
          </div>
        </div>



      </div>
    </aside>
  );
};
