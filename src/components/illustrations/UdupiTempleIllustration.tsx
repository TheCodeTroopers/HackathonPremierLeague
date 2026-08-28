import React from 'react';
import { HPL_IMAGES } from '../../assets/images';

export const UdupiTempleIllustration: React.FC<{ className?: string }> = ({ className = 'w-full' }) => {
  return (
    <div className={`relative ${className} group`}>
      <div className="relative rounded-3xl overflow-hidden sketch-border-thick shadow-sketch-xl bg-paper-cream border-3 border-ink">
        <img
          src={HPL_IMAGES.udupi}
          alt="Build For Udupi Theme - Temple Architecture, Coastal Ecology and Robot Assistant"
          className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-300 select-none block"
          loading="eager"
        />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-ink/10 rounded-3xl" />
      </div>

      <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1 bg-paper-light sketch-border px-3.5 py-1 rounded-full shadow-sketch-sm text-[11px] font-mono font-bold text-amber-900">
        <span>🏛️</span>
        <span>THEME: BUILD FOR UDUPI</span>
      </div>
    </div>
  );
};
