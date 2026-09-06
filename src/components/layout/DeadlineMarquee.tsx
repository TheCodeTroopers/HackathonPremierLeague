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
      icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-300 flex-shrink-0 animate-pulse" />,
      text: 'DEADLINE EXTENDED: REGISTRATION WINDOW EXTENDED TILL 8TH SEPTEMBER 2026, 5:00 PM IST',
      highlight: true
    },
    {
      icon: <Clock className="w-3.5 h-3.5 text-white flex-shrink-0" />,
      text: 'FINAL CALL: +48 HOURS GRANTED FOR REGISTRATION',
      highlight: false
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-yellow-300 flex-shrink-0" />,
      text: 'PORTAL STRICTLY CLOSES 8TH SEP @ 5:00 PM SHARP • REGISTER YOUR SQUAD TODAY',
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
      aria-label="Registration Deadline Extension Announcement"
      className="relative z-30 w-full overflow-hidden bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#B91C1C] border-b-2 border-t border-[#1E1B4B] shadow-[0_2px_4px_rgba(0,0,0,0.12)] select-none"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between py-2 sm:py-2.5">
        
        {/* Left Sticky/Fixed Alert Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 z-10 pr-2 sm:pr-3 border-r-2 border-[#1E1B4B]/30 mr-1 sm:mr-3">
          <button
            onClick={onOpenNotice}
            title="Click to view full official notice"
            className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-[#1E1B4B] text-white border border-amber-400/40 text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider shadow-sm hover:bg-[#2A2468] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="text-amber-300 font-display">NOTICE</span>
            <span className="hidden xs:inline text-white/90">8TH SEP 5 PM</span>
          </button>
        </div>

        {/* Continuous Animated Marquee Ticker Loop */}
        <div 
          onClick={() => onNavigate('register')} 
          className="flex-1 overflow-hidden cursor-pointer group"
          title="Click to go to squad registration"
        >
          <div className="flex w-fit animate-marquee-ticker whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]">
            {/* Track 1 */}
            {renderTrack('track-1')}
            {/* Track 2 (Infinite loop clone) */}
            {renderTrack('track-2', true)}
          </div>
        </div>

        {/* Right Sticky CTA Button */}
        <div className="flex items-center gap-2 flex-shrink-0 z-10 pl-2 sm:pl-3 border-l-2 border-[#1E1B4B]/30 ml-1 sm:ml-3">
          <button
            onClick={() => onNavigate('register')}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1E1B4B] font-display font-black text-[11px] sm:text-xs uppercase tracking-wider border border-[#1E1B4B] shadow-[2px_2px_0px_#1E1B4B] hover:shadow-[3px_3px_0px_#1E1B4B] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>REGISTER</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </aside>
  );
};
