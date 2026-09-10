import React, { useState } from 'react';
import { HPL_IMAGES } from '../../assets/images';
import { Sparkles, Maximize2, Shield, Users, Lock, Compass } from 'lucide-react';

interface ProfileIllustrationProps {
  type?: 'hero' | 'roster' | 'challenge' | 'security';
  className?: string;
  onClick?: () => void;
  showZoom?: boolean;
}

export const ProfileIllustration: React.FC<ProfileIllustrationProps> = ({
  type = 'hero',
  className = 'w-full',
  onClick,
  showZoom = true,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const imageMap = {
    hero: {
      src: HPL_IMAGES.profileDashboardHero,
      alt: 'Team Workspace & Hackathon Dashboard',
      title: 'TEAM WORKSPACE',
      badge: 'DASHBOARD OVERVIEW',
      icon: Sparkles,
      accent: 'border-amber-400 bg-amber-400/20 text-amber-900',
    },
    roster: {
      src: HPL_IMAGES.profileTeamRoster,
      alt: 'Verified Team Members',
      title: 'TEAM SQUAD',
      badge: 'VERIFIED ROSTER',
      icon: Users,
      accent: 'border-purple-400 bg-purple-400/20 text-purple-900',
    },
    challenge: {
      src: HPL_IMAGES.profilePsChallenge,
      alt: 'Selected Problem Statement Challenge',
      title: 'PROJECT CHALLENGE',
      badge: 'CHALLENGE BRIEF',
      icon: Compass,
      accent: 'border-blue-400 bg-blue-400/20 text-blue-900',
    },
    security: {
      src: HPL_IMAGES.profileSecuritySettings,
      alt: 'Password & Account Settings',
      title: 'ACCOUNT SETTINGS',
      badge: 'PASSWORD SECURITY',
      icon: Lock,
      accent: 'border-emerald-400 bg-emerald-400/20 text-emerald-900',
    },
  };

  const current = imageMap[type] || imageMap.hero;
  const Icon = current.icon;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (showZoom) {
      setIsZoomed(!isZoomed);
    }
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className={`group relative rounded-3xl overflow-hidden border-2 border-[#1E1B4B] bg-white shadow-[5px_5px_0px_#1E1B4B] hover:shadow-[7px_7px_0px_#1E1B4B] transition-all duration-300 cursor-pointer ${className}`}
      >
        {/* Top Comic Tag */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF7] border-2 border-[#1E1B4B] shadow-[2px_2px_0px_#1E1B4B]">
          <Icon className="w-3.5 h-3.5 text-amber-600" />
          <span className="font-mono text-[10px] font-black tracking-wider uppercase text-[#1E1B4B]">
            {current.badge}
          </span>
        </div>

        {/* Zoom Hint Icon */}
        {showZoom && (
          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-[#1E1B4B]/80 text-white backdrop-blur-xs">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Artwork Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#FAF6EE]">
          <img
            src={current.src}
            alt={current.alt}
            className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-300 select-none block"
            loading="eager"
            onError={(e) => {
              // Fallback to brain artifact path if dev server hasn't copied
              const target = e.currentTarget;
              if (type === 'hero' && !target.src.includes('profile_dashboard_hero')) {
                target.src = '/hpl_profile_dashboard_hero.jpg';
              }
            }}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
        </div>

        {/* Bottom Editorial Caption Bar */}
        <div className="px-4 py-2.5 bg-[#FFFDF7] border-t-2 border-[#1E1B4B] flex items-center justify-between">
          <span className="font-display font-black text-xs uppercase tracking-tight text-[#1E1B4B]">
            {current.title}
          </span>
          <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-amber-600 transition-colors">
            Click to expand ↗
          </span>
        </div>
      </div>

      {/* Expanded Modal */}
      {isZoomed && (
        <div 
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-[#1E1B4B]/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-3xl border-3 border-[#1E1B4B] overflow-hidden shadow-[8px_8px_0px_#F59E0B]"
          >
            <div className="p-4 bg-[#1E1B4B] text-white flex items-center justify-between border-b-2 border-[#1E1B4B]">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-amber-400" />
                <span className="font-display font-black text-sm uppercase tracking-wider">
                  {current.title}
                </span>
              </div>
              <button 
                onClick={() => setIsZoomed(false)}
                className="px-3 py-1 rounded-xl bg-white text-[#1E1B4B] font-display font-black text-xs uppercase hover:bg-amber-400 cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <img
              src={current.src}
              alt={current.alt}
              className="w-full h-auto max-h-[75vh] object-contain bg-[#FAF6EE]"
            />
          </div>
        </div>
      )}
    </>
  );
};
