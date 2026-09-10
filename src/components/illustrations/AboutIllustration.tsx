import React from 'react';
import { HPL_IMAGES } from '../../assets/images';

export const AboutIllustration: React.FC<{ className?: string }> = ({ className = 'w-full' }) => {
  return (
    <div className={`relative ${className} group`}>
      <div className="relative rounded-3xl overflow-hidden sketch-border-thick shadow-sketch-xl bg-paper-cream border-3 border-ink">
        <img
          src={HPL_IMAGES.about}
          alt="HPL Developer Team Collaborating and High Fiving"
          className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-300 select-none block"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-ink/10 rounded-3xl" />
      </div>

      <div className="absolute -top-3 -left-3 hidden sm:flex items-center gap-1 bg-paper-light sketch-border px-3.5 py-1 rounded-full shadow-sketch-sm text-[11px] font-mono font-bold text-hpl-emerald">
        <span>💡</span>
        <span>COLLABORATION & SQUAD CULTURE</span>
      </div>
    </div>
  );
};

/**
 * Hand-drawn Comic Rulebook Hero Illustration
 * Uses the exact generated high-res comic artwork (HPL_IMAGES.rulebookHero) with multiply blend mode.
 */
export const RulebookBookHero: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg mx-auto' }) => (
  <div className={`relative ${className} select-none flex items-center justify-center`}>
    <div className="relative w-full max-w-md sm:max-w-lg select-none">
      <img 
        src={HPL_IMAGES.rulebookHero} 
        alt="HPL Official Rule Book Comic Illustration"
        className="w-full h-auto object-contain select-none block transform hover:scale-[1.02] transition-transform duration-300"
        style={{ mixBlendMode: 'multiply' }}
        loading="eager"
        decoding="async"
      />
    </div>
  </div>
);

/**
 * Section 01: Eligibility 3-Student illustration
 */
export const EligibilityIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 120 70" fill="none" className={className}>
    {/* Student 1 (Left) */}
    <g transform="translate(15, 16)">
      <circle cx="15" cy="14" r="10" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="2" />
      <path d="M5 10 C8 3 22 3 25 10 Z" fill="#1E1B4B" />
      <path d="M3 38 C3 26 27 26 27 38 Z" fill="#2563EB" stroke="#1E1B4B" strokeWidth="2" />
      <polygon points="15,26 13,34 17,34" fill="#FFFFFF" />
    </g>
    {/* Student 2 (Center - Leader with Shield Badge) */}
    <g transform="translate(45, 6)">
      {/* Little sparkle/shield */}
      <polygon points="15,0 12,5 18,5" fill="#FBBF24" />
      <circle cx="15" cy="16" r="11" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="2.2" />
      <path d="M4 12 C9 4 21 4 26 12 Z" fill="#4C1D95" />
      <path d="M2 44 C2 30 28 30 28 44 Z" fill="#582A9C" stroke="#1E1B4B" strokeWidth="2.2" />
      <polygon points="15,30 12,38 18,38" fill="#FBBF24" />
    </g>
    {/* Student 3 (Right) */}
    <g transform="translate(75, 16)">
      <circle cx="15" cy="14" r="10" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="2" />
      <path d="M5 10 C8 3 22 3 25 10 Z" fill="#EA580C" />
      <path d="M3 38 C3 26 27 26 27 38 Z" fill="#0D9488" stroke="#1E1B4B" strokeWidth="2" />
      <polygon points="15,26 13,34 17,34" fill="#FFFFFF" />
    </g>
  </svg>
);

/**
 * Section 02: Squad Rules 4+1 illustration
 */
export const SquadRulesIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 120 70" fill="none" className={className}>
    {/* 3 specialists in row behind */}
    <g transform="translate(10, 14)">
      <circle cx="12" cy="12" r="8" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="1.8" />
      <path d="M4 32 C4 22 20 22 20 32 Z" fill="#EA580C" stroke="#1E1B4B" strokeWidth="1.8" />
    </g>
    <g transform="translate(85, 14)">
      <circle cx="12" cy="12" r="8" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="1.8" />
      <path d="M4 32 C4 22 20 22 20 32 Z" fill="#D97706" stroke="#1E1B4B" strokeWidth="1.8" />
    </g>
    {/* 2 front builders (Leader + Co-lead) */}
    <g transform="translate(32, 6)">
      <circle cx="15" cy="14" r="10" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="2" />
      <path d="M4 11 C8 4 22 4 26 11 Z" fill="#D97706" />
      <path d="M2 40 C2 28 28 28 28 40 Z" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2" />
    </g>
    <g transform="translate(60, 10)">
      <circle cx="14" cy="13" r="9" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="2" />
      <path d="M4 10 C8 4 20 4 24 10 Z" fill="#1E1B4B" />
      <path d="M3 36 C3 25 25 25 25 36 Z" fill="#EA580C" stroke="#1E1B4B" strokeWidth="2" />
    </g>
  </svg>
);

/**
 * Section 03: League Format flag trail illustration
 */
export const LeagueFormatIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 100 65" fill="none" className={className}>
    {/* Dashed progression winding path */}
    <path d="M12 52 C30 45 35 25 55 35 C70 42 80 20 88 15" stroke="#1E1B4B" strokeWidth="2.2" strokeDasharray="3 3" strokeLinecap="round" />
    {/* Flag 1 */}
    <line x1="22" y1="48" x2="22" y2="36" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
    <polygon points="22,36 32,41 22,46" fill="#EA580C" stroke="#1E1B4B" strokeWidth="1.5" />
    {/* Flag 2 (Summit Flag) */}
    <line x1="88" y1="30" x2="88" y2="10" stroke="#1E1B4B" strokeWidth="2.2" strokeLinecap="round" />
    <polygon points="88,10 74,16 88,22" fill="#582A9C" stroke="#1E1B4B" strokeWidth="1.8" />
  </svg>
);

/**
 * Section 04: Match & Evaluation Handshake
 */
export const MatchHandshakeIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 100 65" fill="none" className={className}>
    {/* Left Sleeve (Navy/Purple) */}
    <path d="M8 36 L26 24 L36 32 L20 48 Z" fill="#582A9C" stroke="#1E1B4B" strokeWidth="2" strokeLinejoin="round" />
    <rect x="22" y="22" width="5" height="12" rx="1.5" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.5" />
    {/* Right Sleeve (Orange/Coral) */}
    <path d="M92 36 L74 24 L64 32 L80 48 Z" fill="#EA580C" stroke="#1E1B4B" strokeWidth="2" strokeLinejoin="round" />
    <rect x="73" y="22" width="5" height="12" rx="1.5" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.5" />
    {/* Handshake Fingers clasping */}
    <path d="M30 28 C38 22 45 22 56 28 L62 36 L48 46 L38 38 Z" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="2" strokeLinejoin="round" />
    <path d="M70 28 C62 22 55 22 44 28 L38 36 L52 46 L62 38 Z" fill="#FDBA74" stroke="#1E1B4B" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/**
 * Section 05: Points Podium
 */
export const PointsPodiumIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 100 65" fill="none" className={className}>
    {/* Podium Step 2 (Left) */}
    <rect x="18" y="32" width="20" height="26" rx="2" fill="#DBEAFE" stroke="#1E1B4B" strokeWidth="2" />
    <text x="28" y="48" fontFamily="Impact, sans-serif" fontSize="12" fill="#2563EB" textAnchor="middle">+1</text>
    {/* Podium Step 1 (Center) */}
    <rect x="40" y="20" width="22" height="38" rx="2" fill="#FEF08A" stroke="#1E1B4B" strokeWidth="2.2" />
    <polygon points="51,8 53,13 58,13 54,16 56,21 51,18 46,21 48,16 44,13 49,13" fill="#D97706" stroke="#1E1B4B" strokeWidth="1.2" />
    <text x="51" y="38" fontFamily="Impact, sans-serif" fontSize="14" fill="#D97706" textAnchor="middle">+3</text>
    {/* Podium Step 3 (Right) */}
    <rect x="64" y="38" width="18" height="20" rx="2" fill="#F1F5F9" stroke="#1E1B4B" strokeWidth="2" />
    <text x="73" y="52" fontFamily="Impact, sans-serif" fontSize="11" fill="#64748B" textAnchor="middle">0</text>
  </svg>
);

/**
 * Section 06: Submissions Cloud with Up Arrow
 */
export const SubmissionsCloudIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 100 65" fill="none" className={className}>
    {/* Cloud Body */}
    <path 
      d="M26 44 C20 44 14 39 14 32 C14 26 19 22 24 22 C26 15 33 10 42 10 C50 10 57 15 60 21 C63 19 66 18 70 18 C78 18 84 24 84 31 C88 32 91 36 91 40 C91 45 87 49 82 49 L26 49 Z" 
      fill="#F8FAFC" 
      stroke="#1E1B4B" 
      strokeWidth="2.2" 
      strokeLinejoin="round" 
    />
    {/* Upload Arrow */}
    <g transform="translate(43, 24)">
      <polygon points="7,0 0,9 5,9 5,20 9,20 9,9 14,9" fill="#582A9C" stroke="#1E1B4B" strokeWidth="1.8" strokeLinejoin="round" />
    </g>
  </svg>
);

/**
 * Section 3: Squad Composition 5 Members
 */
export const SquadRosterIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-12' }) => (
  <svg viewBox="0 0 100 60" fill="none" className={className}>
    <g transform="translate(5, 10)">
      <circle cx="12" cy="12" r="7" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="1.8" />
      <path d="M4 28 C4 21 20 21 20 28 Z" fill="#2563EB" stroke="#1E1B4B" strokeWidth="1.8" />
    </g>
    <g transform="translate(25, 6)">
      <circle cx="12" cy="12" r="7" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="1.8" />
      <path d="M4 32 C4 24 20 24 20 32 Z" fill="#EA580C" stroke="#1E1B4B" strokeWidth="1.8" />
    </g>
    <g transform="translate(45, 2)">
      <polygon points="12,0 9,5 15,5" fill="#FBBF24" />
      <circle cx="12" cy="12" r="8" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="2" />
      <path d="M3 36 C3 26 21 26 21 36 Z" fill="#582A9C" stroke="#1E1B4B" strokeWidth="2" />
    </g>
    <g transform="translate(65, 6)">
      <circle cx="12" cy="12" r="7" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="1.8" />
      <path d="M4 32 C4 24 20 24 20 32 Z" fill="#0F766E" stroke="#1E1B4B" strokeWidth="1.8" />
    </g>
    <g transform="translate(85, 10)">
      <circle cx="12" cy="12" r="7" fill="#FED7AA" stroke="#1E1B4B" strokeWidth="1.8" />
      <path d="M4 28 C4 21 20 21 20 28 Z" fill="#D97706" stroke="#1E1B4B" strokeWidth="1.8" />
    </g>
  </svg>
);

/**
 * Section 4: Match Flow (Submit -> Evaluate -> Result)
 */
export const MatchFlowIllustration: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xs' }) => (
  <div className={`flex items-center justify-between text-center gap-2 ${className}`}>
    <div className="flex flex-col items-center gap-1">
      <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-900 shadow-2xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v12m0-12l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
        </svg>
      </div>
      <span className="font-mono text-[10px] font-bold text-ink uppercase">Submit</span>
    </div>
    <span className="text-ink-muted font-bold">→</span>
    <div className="flex flex-col items-center gap-1">
      <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 shadow-2xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      </div>
      <span className="font-mono text-[10px] font-bold text-ink uppercase">Evaluate</span>
    </div>
    <span className="text-ink-muted font-bold">→</span>
    <div className="flex flex-col items-center gap-1">
      <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900 shadow-2xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 21h8m-4-4v4M5 4h14v5a7 7 0 01-14 0V4z" />
        </svg>
      </div>
      <span className="font-mono text-[10px] font-bold text-ink uppercase">Result</span>
    </div>
  </div>
);

/**
 * Party Popper celebration burst doodle with colorful confetti particles
 */
export const PartyPopperDoodle: React.FC<{ 
  className?: string; 
  flipped?: boolean;
}> = ({ className = 'w-16 h-16', flipped = false }) => (
  <svg 
    viewBox="0 0 120 120" 
    fill="none" 
    className={`${className} transform ${flipped ? '-scale-x-100' : ''}`}
  >
    {/* Confetti ribbons & bursts */}
    <path d="M60 45 Q75 30 85 40 T105 35" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M45 40 Q55 20 70 25 T88 15" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M50 55 Q65 60 78 50 T98 58" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M40 30 Q50 15 62 18 T78 8" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Confetti discs & stars */}
    <circle cx="85" cy="22" r="3.5" fill="#EF4444" />
    <circle cx="98" cy="42" r="3" fill="#3B82F6" />
    <circle cx="70" cy="12" r="2.5" fill="#FBBF24" />
    <circle cx="62" cy="38" r="3" fill="#10B981" />
    <circle cx="108" cy="25" r="2.5" fill="#8B5CF6" />
    <circle cx="92" cy="62" r="3" fill="#F97316" />
    <polygon points="76,28 78,33 84,33 79,36 81,42 76,38 71,42 73,36 68,33 74,33" fill="#FDE047" />
    <polygon points="102,12 103,15 107,15 104,17 105,21 102,18 99,21 100,17 97,15 101,15" fill="#A855F7" />

    {/* Popper Cone */}
    <g transform="translate(18, 55) rotate(-28)">
      {/* Outer Cone */}
      <polygon points="0,40 28,0 48,22" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Stripes on cone */}
      <path d="M7 30 L34 8" stroke="#DC2626" strokeWidth="3.5" />
      <path d="M14 20 L40 14" stroke="#7C3AED" strokeWidth="3.5" />
      {/* Cone Rim */}
      <ellipse cx="38" cy="11" rx="14" ry="6" fill="#FDE68A" stroke="#1E1B4B" strokeWidth="2" transform="rotate(-15 38 11)" />
    </g>
  </svg>
);

/**
 * Shortlist Trophy Celebration Vector Hero Illustration
 */
export const ShortlistTrophyIllustration: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md mx-auto' }) => (
  <div className={`relative ${className} select-none flex items-center justify-center p-4`}>
    <svg viewBox="0 0 500 320" fill="none" className="w-full h-auto drop-shadow-md">
      {/* Subtle Glow Aura behind Trophy */}
      <circle cx="250" cy="150" r="110" fill="#FEF08A" fillOpacity="0.45" />
      <ellipse cx="250" cy="275" rx="140" ry="18" fill="#1E1B4B" fillOpacity="0.12" />

      {/* Sunburst Rays */}
      <g stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 6" opacity="0.4">
        <line x1="250" y1="150" x2="250" y2="40" />
        <line x1="250" y1="150" x2="350" y2="60" />
        <line x1="250" y1="150" x2="370" y2="150" />
        <line x1="250" y1="150" x2="150" y2="60" />
        <line x1="250" y1="150" x2="130" y2="150" />
      </g>

      {/* Confetti Bursts Left */}
      <g transform="translate(60, 40)">
        <path d="M20 60 Q35 30 55 45 T85 20" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
        <circle cx="30" cy="20" r="5" fill="#EF4444" />
        <circle cx="65" cy="15" r="4" fill="#3B82F6" />
        <polygon points="45,40 48,46 55,46 50,50 52,57 45,53 38,57 40,50 35,46 42,46" fill="#FBBF24" />
      </g>

      {/* Confetti Bursts Right */}
      <g transform="translate(340, 40)">
        <path d="M20 20 Q40 45 60 30 T85 55" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        <circle cx="75" cy="20" r="5" fill="#F97316" />
        <circle cx="40" cy="15" r="4" fill="#EC4899" />
        <polygon points="60,40 63,46 70,46 65,50 67,57 60,53 53,57 55,50 50,46 57,46" fill="#FBBF24" />
      </g>

      {/* Left Laurel Wreath */}
      <g transform="translate(160, 90)">
        <path d="M30 110 C-10 80 -10 20 20 0" stroke="#059669" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="22" cy="10" rx="8" ry="4" fill="#10B981" transform="rotate(-30 22 10)" />
        <ellipse cx="7" cy="35" rx="8" ry="4" fill="#10B981" transform="rotate(-55 7 35)" />
        <ellipse cx="2" cy="65" rx="8" ry="4" fill="#10B981" transform="rotate(-85 2 65)" />
        <ellipse cx="14" cy="95" rx="8" ry="4" fill="#10B981" transform="rotate(-115 14 95)" />
      </g>

      {/* Right Laurel Wreath */}
      <g transform="translate(290, 90)">
        <path d="M20 110 C60 80 60 20 30 0" stroke="#059669" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="28" cy="10" rx="8" ry="4" fill="#10B981" transform="rotate(30 28 10)" />
        <ellipse cx="43" cy="35" rx="8" ry="4" fill="#10B981" transform="rotate(55 43 35)" />
        <ellipse cx="48" cy="65" rx="8" ry="4" fill="#10B981" transform="rotate(85 48 65)" />
        <ellipse cx="36" cy="95" rx="8" ry="4" fill="#10B981" transform="rotate(115 36 95)" />
      </g>

      {/* Big Golden Championship Trophy */}
      {/* Trophy Handles */}
      <path d="M190 105 C150 105 145 155 190 165" stroke="#D97706" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M190 105 C150 105 145 155 190 165" stroke="#FDE047" strokeWidth="4" fill="none" strokeLinecap="round" />
      
      <path d="M310 105 C350 105 355 155 310 165" stroke="#D97706" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M310 105 C350 105 355 155 310 165" stroke="#FDE047" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Cup Body */}
      <path d="M185 85 H315 V135 C315 175 285 200 250 200 C215 200 185 175 185 135 Z" fill="#FBBF24" stroke="#1E1B4B" strokeWidth="3.5" />
      {/* Cup Highlight */}
      <path d="M195 95 H245 V135 C245 160 230 180 215 185 C202 172 195 155 195 135 Z" fill="#FEF08A" opacity="0.8" />

      {/* Star Crest on Trophy */}
      <g transform="translate(250, 135)">
        <polygon points="0,-16 5,-5 16,-4 8,4 10,15 0,9 -10,15 -8,4 -16,-4 -5,-5" fill="#1E1B4B" />
        <polygon points="0,-12 3.5,-3.5 12,-3 6,3 7.5,11 0,6.5 -7.5,11 -6,3 -12,-3 -3.5,-3.5" fill="#FDE047" />
      </g>

      {/* Cup Rim */}
      <ellipse cx="250" cy="85" rx="65" ry="10" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="3.5" />
      <ellipse cx="250" cy="85" rx="55" ry="6" fill="#FEF08A" />

      {/* Trophy Stem */}
      <path d="M238 200 H262 V230 H238 Z" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="3" />
      <ellipse cx="250" cy="230" rx="20" ry="5" fill="#D97706" stroke="#1E1B4B" strokeWidth="2.5" />

      {/* Pedestal Base */}
      <polygon points="220,235 280,235 295,268 205,268" fill="#1E1B4B" stroke="#1E1B4B" strokeWidth="3" />
      <rect x="200" y="268" width="100" height="15" rx="3" fill="#312E81" stroke="#1E1B4B" strokeWidth="3" />
      
      {/* Plaque on Base */}
      <rect x="222" y="244" width="56" height="16" rx="2" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1.5" />
      <text x="250" y="256" textAnchor="middle" fill="#1E1B4B" fontSize="9" fontWeight="900" fontFamily="sans-serif">
        ROUND 2
      </text>

      {/* Little Floating Stars */}
      <polygon points="215,60 217,65 223,65 218,68 220,74 215,70 210,74 212,68 207,65 213,65" fill="#F59E0B" />
      <polygon points="285,60 287,65 293,65 288,68 290,74 285,70 280,74 282,68 277,65 283,65" fill="#F59E0B" />
    </svg>
  </div>
);


