import React from 'react';

/**
 * Authentic Retro Cartoon Locomotive Train matching media_1788361754432.png
 * Native forward-facing (facing right) vector geometry without CSS transform hacks
 * Features:
 * - Crisp White/Cream Boiler and Driver Cabin with clean Navy outlines
 * - Tall Navy Chimney / Smokestack with flared rim
 * - Rising circular smoke puff clouds
 * - Orange "HPL" Pennant Flag with bold white lettering
 * - Conductor / Driver silhouette inside warm yellow lit cab window
 * - Trailing whistle / wire detail on rear
 * - Orange Front Headlight with glowing yellow bulb and radiant beam
 * - Pointy wedge Cowcatcher on rail
 * - 3 Spoked Wheels with bold Orange centers and Navy rims
 * - Horizontal Orange Piston / Coupling Drive Rod linking all wheel hubs
 */
export const LocomotiveTrain: React.FC<{ 
  className?: string;
}> = ({ 
  className = 'w-32 h-24'
}) => {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 160 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Light Beam Glow Gradient (Front / Right) */}
          <linearGradient id="trainLightBeamGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FDE047" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── 1. RISING SMOKE PUFFS (Drifting backward to the left) ───────── */}
        <g>
          {/* Smoke cloud 1 (near chimney) */}
          <ellipse cx="96" cy="18" rx="7" ry="5.5" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.8" />
          {/* Smoke cloud 2 */}
          <ellipse cx="110" cy="13" rx="9" ry="7" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.8" />
          {/* Smoke cloud 3 */}
          <ellipse cx="126" cy="9" rx="11" ry="8" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.8" />
          {/* Smoke cloud 4 (soft fading puff) */}
          <ellipse cx="144" cy="5" rx="8" ry="6" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.8" opacity="0.65" />
        </g>

        {/* ── 2. HPL ORANGE PENNANT FLAG (Attached to smokestack, pointing left) ─ */}
        <g>
          {/* Flagpole */}
          <line x1="88" y1="12" x2="88" y2="42" stroke="#1E1B4B" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="88" cy="12" r="2.2" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="1.2" />

          {/* Orange Triangle Pennant Flag */}
          <path
            d="M88 14 L44 26 L88 38 Z"
            fill="#EA580C"
            stroke="#1E1B4B"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Bold White "HPL" Text */}
          <text
            x="70"
            y="29"
            fill="#FFFFFF"
            fontSize="8"
            fontWeight="900"
            fontFamily="monospace"
            textAnchor="middle"
            letterSpacing="0.8"
          >
            HPL
          </text>
        </g>

        {/* ── 3. TALL NAVY SMOKESTACK / CHIMNEY ───────────────────────────── */}
        <g>
          <path
            d="M88 48 L90 24 L84 20 L104 20 L98 24 L100 48 Z"
            fill="#1E1B4B"
            stroke="#1E1B4B"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <ellipse cx="94" cy="20" rx="10" ry="2.5" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="1.4" />
        </g>

        {/* ── 4. WHITE/CREAM DRIVER CABIN (Left / Rear) ───────────────────── */}
        <g>
          {/* Main Cabin Box */}
          <rect
            x="22"
            y="42"
            width="42"
            height="46"
            rx="3"
            fill="#FFFFFF"
            stroke="#1E1B4B"
            strokeWidth="2.5"
          />

          {/* Cabin Curved Roof with Overhang */}
          <path
            d="M18 42 C18 35, 68 35, 68 42 Z"
            fill="#1E1B4B"
            stroke="#1E1B4B"
            strokeWidth="2"
          />

          {/* Rear Whistle / Wire Detail */}
          <path
            d="M22 42 C14 56, 14 76, 4 82"
            stroke="#1E1B4B"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Warm Yellow Cab Window */}
          <rect
            x="30"
            y="48"
            width="26"
            height="21"
            rx="3.5"
            fill="#FEF08A"
            stroke="#1E1B4B"
            strokeWidth="2"
          />

          {/* Conductor / Driver Silhouette inside Window */}
          <circle cx="43" cy="58" r="4.5" fill="#1E1B4B" />
          <path
            d="M35 69 C35 63.5, 51 63.5, 51 69 Z"
            fill="#1E1B4B"
          />
        </g>

        {/* ── 5. WHITE/CREAM BOILER (Right / Front) ────────────────────────── */}
        <g>
          <rect
            x="62"
            y="48"
            width="54"
            height="40"
            rx="4"
            fill="#FFFFFF"
            stroke="#1E1B4B"
            strokeWidth="2.5"
          />
        </g>

        {/* ── 6. FRONT HEADLIGHT WITH RADIANT BEAM (Front / Right) ─────────── */}
        <g>
          {/* Glowing Headlight Beam Cone */}
          <polygon
            points="126,62 160,50 160,84 126,72"
            fill="url(#trainLightBeamGrad)"
          />

          {/* Orange Housing */}
          <path
            d="M116 58 L126 62 L126 72 L116 76 Z"
            fill="#EA580C"
            stroke="#1E1B4B"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Yellow Bulb */}
          <circle cx="126" cy="67" r="4.5" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1.5" />
        </g>

        {/* ── 7. POINTY FRONT COWCATCHER (Front / Right) ──────────────────── */}
        <g>
          <polygon
            points="116,88 136,94 116,100"
            fill="#1E1B4B"
            stroke="#1E1B4B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="118,90 132,94 118,98"
            fill="#EA580C"
          />
        </g>

        {/* ── 8. BASE CHASSIS FRAME ────────────────────────────────────────── */}
        <rect
          x="18"
          y="86"
          width="106"
          height="6"
          rx="2"
          fill="#1E1B4B"
        />

        {/* ── 9. THREE SPOKED WHEELS WITH ORANGE CENTRES ───────────────────── */}
        {/* Wheel 1 (Rear) */}
        <g transform="translate(38, 97)">
          <circle cx="0" cy="0" r="13" fill="#1E1B4B" stroke="#1E1B4B" strokeWidth="2" />
          <circle cx="0" cy="0" r="10" fill="#EA580C" stroke="#1E1B4B" strokeWidth="1.4" />
          <line x1="0" y1="-9" x2="0" y2="9" stroke="#1E1B4B" strokeWidth="1.4" />
          <line x1="-9" y1="0" x2="9" y2="0" stroke="#1E1B4B" strokeWidth="1.4" />
          <circle cx="0" cy="0" r="3.5" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1" />
        </g>

        {/* Wheel 2 (Middle) */}
        <g transform="translate(76, 97)">
          <circle cx="0" cy="0" r="12" fill="#1E1B4B" stroke="#1E1B4B" strokeWidth="2" />
          <circle cx="0" cy="0" r="9" fill="#EA580C" stroke="#1E1B4B" strokeWidth="1.4" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#1E1B4B" strokeWidth="1.4" />
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#1E1B4B" strokeWidth="1.4" />
          <line x1="-6" y1="-6" x2="6" y2="6" stroke="#1E1B4B" strokeWidth="1.2" />
          <line x1="6" y1="-6" x2="-6" y2="6" stroke="#1E1B4B" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="3.2" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1" />
        </g>

        {/* Wheel 3 (Front) */}
        <g transform="translate(110, 97)">
          <circle cx="0" cy="0" r="11" fill="#1E1B4B" stroke="#1E1B4B" strokeWidth="2" />
          <circle cx="0" cy="0" r="8" fill="#EA580C" stroke="#1E1B4B" strokeWidth="1.4" />
          <line x1="0" y1="-7" x2="0" y2="7" stroke="#1E1B4B" strokeWidth="1.4" />
          <line x1="-7" y1="0" x2="7" y2="0" stroke="#1E1B4B" strokeWidth="1.4" />
          <circle cx="0" cy="0" r="3" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1" />
        </g>

        {/* ── 10. HORIZONTAL ORANGE PISTON / COUPLING DRIVE ROD ────────────── */}
        <line x1="38" y1="97" x2="110" y2="97" stroke="#EA580C" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="38" cy="97" r="2.4" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1" />
        <circle cx="76" cy="97" r="2.4" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1" />
        <circle cx="110" cy="97" r="2.4" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1" />

      </svg>
    </div>
  );
};

/**
 * Hand-drawn Golden Trophy with radiant milestone sparkle lines
 */
export const TrophyBurstDoodle: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <g stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.8">
      <line x1="50" y1="8" x2="50" y2="16" />
      <line x1="24" y1="18" x2="30" y2="24" />
      <line x1="76" y1="18" x2="70" y2="24" />
      <line x1="12" y1="40" x2="18" y2="42" />
      <line x1="88" y1="40" x2="82" y2="42" />
      <line x1="15" y1="62" x2="22" y2="60" />
      <line x1="85" y1="62" x2="78" y2="60" />
    </g>

    <path d="M82 12L83.5 15.5L87 17L83.5 18.5L82 22L80.5 18.5L77 17L80.5 15.5Z" fill="#F59E0B" />
    <path d="M18 20L19 22.5L22 23.5L19 24.5L18 27L17 24.5L14 23.5L17 22.5Z" fill="#F59E0B" />

    <g transform="translate(50, 52)">
      <path
        d="M-18 -20 C-32 -20, -32 0, -14 6"
        stroke="#1E1B4B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M-17 -18 C-28 -18, -28 -2, -14 4"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 -20 C32 -20, 32 0, 14 6"
        stroke="#1E1B4B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17 -18 C28 -18, 28 -2, 14 4"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M-18 -26 H18 V-8 C18 12, 7 20, 0 20 C-7 20, -18 12, -18 -8 Z"
        fill="#FBBF24"
        stroke="#1E1B4B"
        strokeWidth="2.5"
      />
      <path
        d="M-12 -24 H4 V-8 C4 6, -2 14, -6 14 C-10 14, -12 6, -12 -8 Z"
        fill="#FEF08A"
      />
      <line x1="-10" y1="-16" x2="-2" y2="-6" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="-6" y1="-20" x2="2" y2="-10" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="0" cy="-26" rx="18" ry="4.5" fill="#FEF08A" stroke="#1E1B4B" strokeWidth="2" />
      <polygon
        points="0,-14 2,-9 7,-9 3,-6 4.5,-1 0,-4 -4.5,-1 -3,-6 -7,-9 -2,-9"
        fill="#1E1B4B"
      />
      <path d="M-5 20 V26 H5 V20" fill="#D97706" stroke="#1E1B4B" strokeWidth="2" />
      <polygon points="-12,26 12,26 16,32 -16,32" fill="#B45309" stroke="#1E1B4B" strokeWidth="2" />
      <rect x="-18" y="32" width="36" height="8" rx="2" fill="#1E1B4B" />
      <rect x="-12" y="34" width="24" height="4" rx="1" fill="#FBBF24" />
    </g>
  </svg>
);

/**
 * Hand-drawn coastal palm trees & temple illustration sketch
 */
export const CoastalTempleSketch: React.FC<{ className?: string }> = ({ className = 'w-44 h-32' }) => (
  <svg
    viewBox="0 0 200 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M10 128 C50 125, 120 129, 190 126"
      stroke="#1E1B4B"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M20 132 C70 130, 140 134, 185 131"
      stroke="#1E1B4B"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.25"
      strokeDasharray="4 4"
    />

    <g opacity="0.55" stroke="#1E1B4B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M120 80 L140 55 L160 80 Z" fill="#F8FAFC" fillOpacity="0.4" />
      <line x1="140" y1="55" x2="140" y2="48" strokeWidth="2" />
      <circle cx="140" cy="48" r="2" fill="#F59E0B" />
      <rect x="114" y="80" width="52" height="12" rx="2" fill="#F8FAFC" fillOpacity="0.4" />
      <line x1="110" y1="80" x2="170" y2="80" strokeWidth="2" />
      <rect x="118" y="92" width="44" height="34" rx="2" fill="#F8FAFC" fillOpacity="0.4" />
      <line x1="124" y1="92" x2="124" y2="126" />
      <line x1="134" y1="92" x2="134" y2="126" />
      <line x1="146" y1="92" x2="146" y2="126" />
      <line x1="156" y1="92" x2="156" y2="126" />
      <path d="M136 126 V108 C136 104, 144 104, 144 108 V126" fill="#1E1B4B" fillOpacity="0.2" />
    </g>

    <g opacity="0.6" stroke="#1E1B4B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M182 128 C180 95, 172 65, 168 38" />
      <line x1="179" y1="110" x2="183" y2="110" strokeWidth="1.2" />
      <line x1="176" y1="90" x2="180" y2="90" strokeWidth="1.2" />
      <line x1="173" y1="70" x2="177" y2="70" strokeWidth="1.2" />
      <line x1="170" y1="50" x2="174" y2="50" strokeWidth="1.2" />
      <path d="M168 38 C160 22, 140 24, 134 30" fill="none" />
      <path d="M168 38 C166 18, 154 12, 146 16" fill="none" />
      <path d="M168 38 C172 16, 186 16, 194 24" fill="none" />
      <path d="M168 38 C180 26, 196 34, 198 48" fill="none" />
      <path d="M168 38 C162 38, 152 46, 150 56" fill="none" />
    </g>

    <g opacity="0.5" stroke="#1E1B4B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M164 128 C162 105, 152 75, 148 52" />
      <path d="M148 52 C142 38, 128 38, 122 44" fill="none" />
      <path d="M148 52 C152 36, 162 36, 170 42" fill="none" />
      <path d="M148 52 C140 50, 132 58, 130 68" fill="none" />
    </g>

    <path d="M70 34 Q75 30 80 34 Q85 30 90 34" stroke="#1E1B4B" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.4" />
    <path d="M96 24 Q100 20 104 24 Q108 20 112 24" stroke="#1E1B4B" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.35" />
  </svg>
);

/**
 * Hand-drawn Lightbulb Idea Doodle matching Image 2 top-right
 */
export const LightbulbIdeaDoodle: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <g stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.8">
      <line x1="30" y1="4" x2="30" y2="10" />
      <line x1="12" y1="12" x2="16" y2="16" />
      <line x1="48" y1="12" x2="44" y2="16" />
      <line x1="6" y1="30" x2="12" y2="30" />
      <line x1="54" y1="30" x2="48" y2="30" />
    </g>

    <path
      d="M20 38 C14 34, 12 26, 14 18 C17 9, 23 6, 30 6 C37 6, 43 9, 46 18 C48 26, 46 34, 40 38 Z"
      fill="#FEF08A"
      fillOpacity="0.8"
      stroke="#1E1B4B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />

    <path
      d="M26 38 L26 24 Q30 20 34 24 L34 38"
      stroke="#1E1B4B"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="30" cy="22" r="3" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="1.2" />

    <path d="M22 38 H38 V42 H22 Z" fill="#CBD5E1" stroke="#1E1B4B" strokeWidth="2" />
    <path d="M24 42 H36 V46 H24 Z" fill="#94A3B8" stroke="#1E1B4B" strokeWidth="2" />
    <path d="M26 46 H34 V49 C34 51, 26 51, 26 49 Z" fill="#1E1B4B" stroke="#1E1B4B" strokeWidth="1.5" />
  </svg>
);

/**
 * Hand-drawn Pencil Outline Star Doodle matching Image 2
 */
export const StarPencilDoodle: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M16 2 L20 11 L30 12 L22 19 L25 29 L16 23 L7 29 L10 19 L2 12 L12 11 Z"
      stroke="#1E1B4B"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
      opacity="0.65"
    />
  </svg>
);

/**
 * Organic Purple/Golden Watercolor Wash Splatter for Canvas Corners
 */
export const SideWatercolorSplatter: React.FC<{ 
  variant?: 'purple' | 'gold' | 'coastal'; 
  className?: string; 
}> = ({ variant = 'purple', className = 'w-64 h-64' }) => {
  if (variant === 'gold') {
    return (
      <svg viewBox="0 0 200 200" fill="none" className={`pointer-events-none ${className}`}>
        <path
          d="M30,70 C50,20 120,10 160,40 C190,70 180,140 140,170 C100,190 40,180 20,140 C5,100 10,90 30,70 Z"
          fill="#F59E0B"
          fillOpacity="0.12"
          filter="blur(16px)"
        />
        <circle cx="160" cy="50" r="3" fill="#D97706" opacity="0.3" />
        <circle cx="140" cy="30" r="2" fill="#D97706" opacity="0.25" />
        <circle cx="175" cy="85" r="2.5" fill="#D97706" opacity="0.35" />
      </svg>
    );
  }

  if (variant === 'coastal') {
    return (
      <svg viewBox="0 0 240 200" fill="none" className={`pointer-events-none ${className}`}>
        <path
          d="M40,60 C80,20 160,10 200,50 C230,90 220,160 170,180 C120,200 60,190 30,150 C5,110 10,80 40,60 Z"
          fill="#7C3AED"
          fillOpacity="0.15"
          filter="blur(20px)"
        />
        <circle cx="35" cy="165" r="3" fill="#7C3AED" opacity="0.4" />
        <circle cx="65" cy="180" r="2" fill="#7C3AED" opacity="0.3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" fill="none" className={`pointer-events-none ${className}`}>
      <path
        d="M50,40 C100,15 160,30 180,75 C195,120 160,170 115,185 C65,195 20,165 15,115 C10,70 20,55 50,40 Z"
        fill="#7C3AED"
        fillOpacity="0.18"
        filter="blur(18px)"
      />
      <circle cx="30" cy="45" r="2.5" fill="#7C3AED" opacity="0.35" />
      <circle cx="45" cy="25" r="1.8" fill="#7C3AED" opacity="0.3" />
      <circle cx="18" cy="80" r="2" fill="#7C3AED" opacity="0.25" />
    </svg>
  );
};
