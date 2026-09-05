import React from 'react';
import { HPL_IMAGES } from '../../assets/images';

/**
 * Team Evaluation & Checklist Illustration (Matching bottom-left of mockup)
 * Uses the exact generated illustration (HPL_IMAGES.adminEvalArt) from src/assets/.
 */
export const AdminTeamEvalIllustration: React.FC<{ className?: string }> = ({ className = 'w-52 h-48' }) => {
  const imageSrc = (HPL_IMAGES as any).adminEvalArt;

  return (
    <div className={`relative ${className} select-none flex items-center justify-center`}>
      <img
        src={imageSrc}
        alt="Team Idea Evaluation Illustration"
        className="w-full h-full object-contain select-none block transform hover:scale-[1.03] transition-transform duration-300"
        style={{ 
          mixBlendMode: 'multiply',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 76%, rgba(0,0,0,0) 96%)',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 76%, rgba(0,0,0,0) 96%)',
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

/**
 * Small Clipboard Badge with Sparkles (Matching top right stat card accent)
 * Uses generated comic checklist badge artwork (HPL_IMAGES.adminClipboardBadge) from src/assets/.
 */
export const AdminClipboardDoodle: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  const badgeSrc = (HPL_IMAGES as any).adminClipboardBadge;

  return (
    <div className={`relative ${className} select-none flex items-center justify-center`}>
      <img
        src={badgeSrc}
        alt="Checklist Badge Accent"
        className="w-full h-full object-contain select-none block transform hover:rotate-3 transition-transform duration-300"
        style={{ 
          mixBlendMode: 'multiply',
          WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 56%, rgba(0,0,0,0.75) 74%, rgba(0,0,0,0) 94%)',
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 56%, rgba(0,0,0,0.75) 74%, rgba(0,0,0,0) 94%)',
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
