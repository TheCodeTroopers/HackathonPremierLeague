import React from 'react';

// --- LEAGUE JOURNEY STEP 1: WEEK 1 / PART 1 ---
export const Week1Illustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" className={className}>
    {/* Soft ink drop-shadow / background aura */}
    <ellipse cx="80" cy="100" rx="60" ry="8" fill="#059669" fillOpacity="0.15" />
    
    {/* Floating Paper Notes / Doodles */}
    <g transform="translate(108, 16) rotate(12)">
      <rect x="0" y="0" width="28" height="28" rx="3" fill="#FEF08A" stroke="#1E1B4B" strokeWidth="1.5" />
      <line x1="4" y1="8" x2="20" y2="8" stroke="#1E1B4B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="14" x2="16" y2="14" stroke="#1E1B4B" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2" fill="#E11D48" />
    </g>
    
    {/* Floating Gear Doodle on Left */}
    <g transform="translate(18, 52)">
      <circle cx="12" cy="12" r="10" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" fill="#FAF6EE" stroke="#1E1B4B" strokeWidth="1.5" />
      <line x1="12" y1="0" x2="12" y2="4" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="24" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="12" x2="4" y2="12" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="12" x2="24" y2="12" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Laptop Screen Frame */}
    <rect x="36" y="24" width="88" height="60" rx="6" fill="#1E1B4B" stroke="#1E1B4B" strokeWidth="2.5" />
    {/* Screen Inner Glass */}
    <rect x="40" y="28" width="80" height="52" rx="3" fill="#0F172A" />
    {/* Window Header */}
    <rect x="40" y="28" width="80" height="10" fill="#1E293B" />
    <circle cx="45" cy="33" r="2" fill="#EF4444" />
    <circle cx="51" cy="33" r="2" fill="#F59E0B" />
    <circle cx="57" cy="33" r="2" fill="#10B981" />
    
    {/* Code Editor Content */}
    <g transform="translate(44, 42)">
      <line x1="4" y1="4" x2="28" y2="4" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="4" x2="52" y2="4" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="12" x2="44" y2="12" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="20" x2="64" y2="20" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="28" x2="36" y2="28" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
      {/* Code Cursor */}
      <rect x="40" y="25" width="2" height="6" fill="#FBBF24" />
    </g>

    {/* Laptop Keyboard Base */}
    <polygon points="26,84 134,84 124,98 36,98" fill="#E2E8F0" stroke="#1E1B4B" strokeWidth="2" />
    <rect x="68" y="86" width="24" height="4" rx="1.5" fill="#94A3B8" />
    
    {/* Star / Spark Doodles */}
    <path d="M 136 36 L 138 41 L 143 43 L 138 45 L 136 50 L 134 45 L 129 43 L 134 41 Z" fill="#059669" />
    <path d="M 30 18 L 31.5 22 L 35 23.5 L 31.5 25 L 30 29 L 28.5 25 L 25 23.5 L 28.5 22 Z" fill="#F59E0B" />
  </svg>
);

// --- LEAGUE JOURNEY STEP 2: WEEK 2 / PART 2 ---
export const Week2Illustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" className={className}>
    {/* Soft ink drop-shadow */}
    <ellipse cx="80" cy="104" rx="55" ry="7" fill="#2563EB" fillOpacity="0.15" />
    
    {/* Speed Trails & Star Dust */}
    <path d="M 40 85 Q 55 90 70 75" stroke="#93C5FD" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" />
    <path d="M 50 100 Q 70 95 85 85" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
    <circle cx="36" cy="62" r="3" fill="#F59E0B" />
    <circle cx="132" cy="28" r="2.5" fill="#6366F1" />
    <circle cx="125" cy="85" r="3" fill="#EC4899" />

    {/* Sparkles */}
    <path d="M 120 18 L 122 23 L 127 25 L 122 27 L 120 32 L 118 27 L 113 25 L 118 23 Z" fill="#F59E0B" />
    <path d="M 38 35 L 39.5 39 L 43 40.5 L 39.5 42 L 38 46 L 36.5 42 L 33 40.5 L 36.5 39 Z" fill="#3B82F6" />

    {/* Rocket Group angled at ~35 deg */}
    <g transform="translate(82, 54) rotate(-35)">
      {/* Exhaust Flame Clouds */}
      <path d="M -10 40 Q -16 65 0 75 Q 16 65 10 40 Z" fill="#EF4444" stroke="#1E1B4B" strokeWidth="1.5" />
      <path d="M -6 40 Q -10 58 0 65 Q 10 58 6 40 Z" fill="#F59E0B" />
      <path d="M -3 40 Q -5 50 0 55 Q 5 50 3 40 Z" fill="#FDE047" />

      {/* Side Booster Fins */}
      <path d="M -18 20 L -30 38 L -18 34 Z" fill="#E11D48" stroke="#1E1B4B" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 18 20 L 30 38 L 18 34 Z" fill="#E11D48" stroke="#1E1B4B" strokeWidth="2" strokeLinejoin="round" />

      {/* Rocket Fuselage */}
      <path d="M 0 -36 C 24 -12 24 24 16 38 C 4 40 -4 40 -16 38 C -24 24 -24 -12 0 -36 Z" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2.5" />
      
      {/* Red Rocket Nose Cone */}
      <path d="M 0 -36 C 14 -22 18 -12 18 -4 L -18 -4 C -18 -12 -14 -22 0 -36 Z" fill="#2563EB" stroke="#1E1B4B" strokeWidth="2" />

      {/* Porthole Glass */}
      <circle cx="0" cy="10" r="8" fill="#38BDF8" stroke="#1E1B4B" strokeWidth="2" />
      <circle cx="-2" cy="8" r="3" fill="#FFFFFF" />
      
      {/* Tech Decal */}
      <rect x="-8" y="24" width="16" height="3" rx="1" fill="#1E1B4B" />
    </g>
  </svg>
);

// --- LEAGUE JOURNEY STEP 3: PLAYOFFS / PART 3 ---
export const Week3Illustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" className={className}>
    {/* Soft ink drop-shadow */}
    <ellipse cx="80" cy="104" rx="60" ry="7" fill="#F59E0B" fillOpacity="0.2" />

    {/* Celebration Confetti & Sparkles */}
    <circle cx="28" cy="38" r="3.5" fill="#E11D48" />
    <circle cx="135" cy="42" r="3" fill="#2563EB" />
    <circle cx="32" cy="78" r="2.5" fill="#10B981" />
    <circle cx="128" cy="80" r="3.5" fill="#8B5CF6" />
    <rect x="25" y="55" width="5" height="5" rx="1" fill="#F59E0B" transform="rotate(25 25 55)" />
    <rect x="130" y="26" width="6" height="6" rx="1" fill="#EF4444" transform="rotate(-15 130 26)" />
    <rect x="138" y="60" width="5" height="5" rx="1" fill="#3B82F6" transform="rotate(45 138 60)" />

    {/* Star Bursts */}
    <path d="M 38 24 L 40 29 L 45 31 L 40 33 L 38 38 L 36 33 L 31 31 L 36 29 Z" fill="#F59E0B" />
    <path d="M 122 20 L 124 25 L 129 27 L 124 29 L 122 34 L 120 29 L 115 27 L 120 25 Z" fill="#F59E0B" />
    <path d="M 80 12 L 81.5 16 L 85.5 17.5 L 81.5 19 L 80 23 L 78.5 19 L 74.5 17.5 L 78.5 16 Z" fill="#E11D48" />

    {/* Championship Golden Trophy Group */}
    <g transform="translate(80, 58)">
      {/* Side Ribbon Handles */}
      <path d="M -24 -24 C -42 -24 -40 2 -18 6" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M -22 -22 C -38 -22 -36 0 -18 4" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      
      <path d="M 24 -24 C 42 -24 40 2 18 6" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 22 -22 C 38 -22 36 0 18 4" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Main Trophy Cup Body */}
      <path d="M -22 -32 H 22 V -10 C 22 14 8 24 0 24 C -8 24 -22 14 -22 -10 Z" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2.5" />
      
      {/* Inner Golden Highlight Shading */}
      <path d="M -16 -30 H 6 V -10 C 6 8 -2 18 -6 18 C -10 18 -16 10 -16 -10 Z" fill="#FBBF24" />

      {/* Top Rim Ellipse */}
      <ellipse cx="0" cy="-32" rx="22" ry="6" fill="#FEF08A" stroke="#1E1B4B" strokeWidth="2" />

      {/* Center Trophy Emblem (Star & Ribbon) */}
      <circle cx="0" cy="-6" r="8" fill="#1E1B4B" />
      <path d="M 0 -11 L 2 -7 L 6 -7 L 3 -4 L 4 0 L 0 -2 L -4 0 L -3 -4 L -6 -7 L -2 -7 Z" fill="#FDE047" />

      {/* Trophy Stem */}
      <path d="M -6 24 V 32 H 6 V 24" fill="#D97706" stroke="#1E1B4B" strokeWidth="2" />
      
      {/* Base Layer 1 */}
      <polygon points="-14,32 14,32 18,38 -18,38" fill="#B45309" stroke="#1E1B4B" strokeWidth="2" />
      
      {/* Base Layer 2 (Podium Plinth) */}
      <rect x="-24" y="38" width="48" height="12" rx="2.5" fill="#1E1B4B" stroke="#1E1B4B" strokeWidth="2" />
      <rect x="-16" y="41" width="32" height="6" rx="1.5" fill="#FBBF24" />
    </g>
  </svg>
);

// --- 4 LEAGUE FORMAT STRIP ICONS ---

// 1. LEAGUE FORMAT (Clipboard + Chart + Pencil in Mint Badge)
export const LeagueFormatIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg viewBox="0 0 56 56" fill="none" className={className}>
    {/* Teal/Mint Badge Box */}
    <rect x="4" y="4" width="48" height="48" rx="12" fill="#D1FAE5" stroke="#1E1B4B" strokeWidth="2.5" />
    {/* Clipboard Base */}
    <rect x="15" y="14" width="26" height="30" rx="3" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="2" />
    {/* Clipboard Clip */}
    <rect x="22" y="11" width="12" height="5" rx="1.5" fill="#1E1B4B" />
    {/* Checklist Lines & Bar Chart */}
    <line x1="20" y1="22" x2="30" y2="22" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="28" x2="36" y2="28" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="20" y="34" width="4" height="6" fill="#10B981" />
    <rect x="26" y="31" width="4" height="9" fill="#059669" />
    <rect x="32" y="36" width="4" height="4" fill="#34D399" />
    {/* Pencil */}
    <g transform="translate(38, 14) rotate(45)">
      <rect x="0" y="0" width="4" height="14" rx="1" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="1.5" />
      <polygon points="0,14 4,14 2,18" fill="#1E1B4B" />
    </g>
  </svg>
);

// 2. HEAD TO HEAD (Tournament Shield & Crossed Swords in Blue Badge)
export const HeadToHeadIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg viewBox="0 0 56 56" fill="none" className={className}>
    {/* Blue Badge Box */}
    <rect x="4" y="4" width="48" height="48" rx="12" fill="#DBEAFE" stroke="#1E1B4B" strokeWidth="2.5" />
    {/* Shield Container */}
    <path d="M 28 14 C 36 14 40 18 40 26 C 40 35 28 41 28 41 C 28 41 16 35 16 26 C 16 18 20 14 28 14 Z" fill="#2563EB" stroke="#1E1B4B" strokeWidth="2" />
    {/* Crossed Swords */}
    <line x1="21" y1="21" x2="35" y2="33" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="35" y1="21" x2="21" y2="33" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    {/* Sword Hilts */}
    <circle cx="19" cy="19" r="2" fill="#FBBF24" />
    <circle cx="37" cy="19" r="2" fill="#FBBF24" />
    {/* Center Clash Star */}
    <polygon points="28,24 29.5,27 32,27 30,29 31,32 28,30 25,32 26,29 24,27 26.5,27" fill="#FDE047" />
  </svg>
);

// 3. IMPROVE & ADAPT (Purple Hexagon Badge with Gear & Upward Arrow)
export const ImproveAdaptIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg viewBox="0 0 56 56" fill="none" className={className}>
    {/* Purple Badge Box */}
    <rect x="4" y="4" width="48" height="48" rx="12" fill="#EDE9FE" stroke="#1E1B4B" strokeWidth="2.5" />
    {/* Outer Gear */}
    <circle cx="28" cy="28" r="13" fill="#7C3AED" stroke="#1E1B4B" strokeWidth="2" />
    <circle cx="28" cy="28" r="8" fill="#FAF6EE" stroke="#1E1B4B" strokeWidth="1.5" />
    {/* Upward Arrow */}
    <path d="M 28 35 V 21 M 23 25 L 28 20 L 33 25" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Small Sparkle */}
    <circle cx="39" cy="16" r="2" fill="#F59E0B" />
  </svg>
);

// 4. BE THE CHAMPION (Golden Trophy Cup in Yellow Badge)
export const ChampionIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <svg viewBox="0 0 56 56" fill="none" className={className}>
    {/* Yellow Badge Box */}
    <rect x="4" y="4" width="48" height="48" rx="12" fill="#FEF3C7" stroke="#1E1B4B" strokeWidth="2.5" />
    {/* Trophy Cup */}
    <g transform="translate(28, 28)">
      {/* Handles */}
      <path d="M -11 -8 C -17 -8 -16 2 -8 4 M 11 -8 C 17 -8 16 2 8 4" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Cup Body */}
      <path d="M -9 -11 H 9 V -2 C 9 6 4 10 0 10 C -4 10 -9 6 -9 -2 Z" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2" />
      <ellipse cx="0" cy="-11" rx="9" ry="2.5" fill="#FEF08A" stroke="#1E1B4B" strokeWidth="1.5" />
      {/* Stem & Base */}
      <path d="M -2.5 10 V 13 H 2.5 V 10" fill="#B45309" stroke="#1E1B4B" strokeWidth="1.5" />
      <rect x="-8" y="13" width="16" height="4" rx="1.5" fill="#1E1B4B" />
    </g>
  </svg>
);

// --- 4 WHY PARTICIPATE BENEFIT ICONS ---

// Benefit 1: Real World Problems
export const WhyRealWorldIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <circle cx="32" cy="32" r="26" fill="#D1FAE5" stroke="#1E1B4B" strokeWidth="2.5" />
    {/* Globe Grids */}
    <ellipse cx="32" cy="32" rx="14" ry="26" stroke="#059669" strokeWidth="2" />
    <line x1="6" y1="32" x2="58" y2="32" stroke="#059669" strokeWidth="2" />
    <line x1="12" y1="20" x2="52" y2="20" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="12" y1="44" x2="52" y2="44" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" />
    {/* Pin / Target */}
    <circle cx="32" cy="24" r="5" fill="#E11D48" stroke="#1E1B4B" strokeWidth="1.5" />
  </svg>
);

// Benefit 2: Learn & Grow
export const WhyLearnGrowIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <circle cx="32" cy="32" r="26" fill="#DBEAFE" stroke="#1E1B4B" strokeWidth="2.5" />
    {/* Upward Growth Bar Chart + Arrow */}
    <rect x="18" y="38" width="6" height="12" rx="1.5" fill="#3B82F6" stroke="#1E1B4B" strokeWidth="1.5" />
    <rect x="28" y="30" width="6" height="20" rx="1.5" fill="#2563EB" stroke="#1E1B4B" strokeWidth="1.5" />
    <rect x="38" y="20" width="6" height="30" rx="1.5" fill="#1D4ED8" stroke="#1E1B4B" strokeWidth="1.5" />
    <path d="M 16 34 L 28 24 L 38 16 L 48 10 M 42 10 H 48 V 16" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Benefit 3: Build Together
export const WhyBuildTogetherIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <circle cx="32" cy="32" r="26" fill="#EDE9FE" stroke="#1E1B4B" strokeWidth="2.5" />
    {/* Interlocking Puzzle / Squad Hands */}
    <g transform="translate(18, 18)">
      <rect x="0" y="0" width="13" height="13" rx="2" fill="#7C3AED" stroke="#1E1B4B" strokeWidth="1.5" />
      <rect x="15" y="0" width="13" height="13" rx="2" fill="#A78BFA" stroke="#1E1B4B" strokeWidth="1.5" />
      <rect x="0" y="15" width="13" height="13" rx="2" fill="#C4B5FD" stroke="#1E1B4B" strokeWidth="1.5" />
      <rect x="15" y="15" width="13" height="13" rx="2" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="1.5" />
    </g>
    <circle cx="48" cy="18" r="2.5" fill="#F59E0B" />
  </svg>
);

// Benefit 4: Win & Earn
export const WhyWinEarnIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <circle cx="32" cy="32" r="26" fill="#FEF3C7" stroke="#1E1B4B" strokeWidth="2.5" />
    {/* Medal / Trophy Ribbon */}
    <path d="M 24 34 L 18 52 L 28 46 L 34 52 L 30 36" fill="#E11D48" stroke="#1E1B4B" strokeWidth="1.5" />
    <circle cx="32" cy="26" r="14" fill="#F59E0B" stroke="#1E1B4B" strokeWidth="2" />
    <circle cx="32" cy="26" r="10" fill="#FEF08A" stroke="#1E1B4B" strokeWidth="1.5" />
    <path d="M 32 19 L 34 23 L 38 23.5 L 35 26.5 L 36 30.5 L 32 28.5 L 28 30.5 L 29 26.5 L 26 23.5 L 30 23 Z" fill="#D97706" />
  </svg>
);
