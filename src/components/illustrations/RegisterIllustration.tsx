import React from 'react';
import { HPL_IMAGES } from '../../assets/images';

export const RegisterIllustration: React.FC<{ className?: string; onClick?: () => void }> = ({ 
  className = 'w-full',
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`relative ${className} group ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="relative rounded-3xl overflow-hidden sketch-border-thick shadow-sketch-xl bg-paper-cream border-3 border-ink group-hover:shadow-[7px_7px_0px_#1E1B4B] transition-all duration-300">
        <img
          src={HPL_IMAGES.profileDashboardHero || HPL_IMAGES.register}
          alt="HPL Student Developer Ready to Enter the League"
          className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-300 select-none block"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-ink/10 rounded-3xl" />
        
        {onClick && (
          <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-[#1E1B4B] text-white font-mono text-[10px] font-bold tracking-wider opacity-90 group-hover:opacity-100 group-hover:bg-amber-400 group-hover:text-[#1E1B4B] transition-all shadow-xs">
            Open Squad Dashboard ↗
          </div>
        )}
      </div>

      <div className="absolute -top-3 -left-3 hidden sm:flex items-center gap-1 bg-paper-light sketch-border px-3.5 py-1 rounded-full shadow-sketch-sm text-[11px] font-mono font-bold text-hpl-purple">
        <span>⚡</span>
        <span>HPL SQUAD MISSION CONTROL</span>
      </div>
    </div>
  );
};
