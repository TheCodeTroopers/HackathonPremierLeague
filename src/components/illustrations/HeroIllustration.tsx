import React from 'react';
import { HPL_IMAGES } from '../../assets/images';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = 'w-full' }) => {
  return (
    <div className={`relative ${className} w-full flex items-center justify-end select-none`}>
      {/* 
        Atmospheric soft cloud ambient glow behind the artwork:
        Softens the transition and adds comic editorial depth
      */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 rounded-full blur-2xl opacity-50"
        style={{
          background: 'radial-gradient(circle at 55% 50%, rgba(246, 240, 226, 0.9) 0%, rgba(251, 249, 242, 0.3) 60%, transparent 80%)'
        }}
      />

      {/* 
        Seamless Organic Vignette Mask:
        - Expanded height and width to fill the top space towards the header
        - Shifted slightly rightwards and fades on the left before reaching the text column
        - Reaches 0% opacity by 86% radius
      */}
      <img
        src={HPL_IMAGES.hero}
        alt="HPL Hackathon Premier League Championship Arena"
        className="w-full lg:w-[110%] xl:w-[115%] h-auto max-h-[680px] lg:max-h-[760px] xl:max-h-[840px] 2xl:max-h-[900px] object-contain select-none block brightness-[1.03] contrast-[1.04] saturate-[1.02] drop-shadow-sm ml-auto -mt-4 lg:-mt-10 xl:-mt-14"
        style={{
          maskImage: 'radial-gradient(ellipse 84% 82% at 54% 48%, black 35%, rgba(0,0,0,0.88) 52%, rgba(0,0,0,0.25) 72%, transparent 86%)',
          WebkitMaskImage: 'radial-gradient(ellipse 84% 82% at 54% 48%, black 35%, rgba(0,0,0,0.88) 52%, rgba(0,0,0,0.25) 72%, transparent 86%)',
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
