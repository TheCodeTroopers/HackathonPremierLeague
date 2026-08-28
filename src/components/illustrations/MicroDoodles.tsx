import React from 'react';

export const SparkleDoodle: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-hpl-gold' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
  </svg>
);

export const StarDoodle: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-hpl-yellow' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export const ArrowDoodle: React.FC<{ className?: string }> = ({ className = 'w-8 h-8 text-ink' }) => (
  <svg viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12C12 8 24 16 34 12" />
    <path d="M28 6L35 12L28 18" />
  </svg>
);

export const CodeTagDoodle: React.FC<{ className?: string }> = ({ className = 'w-8 h-8 text-hpl-blue' }) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 8L3 16L10 24" />
    <path d="M22 8L29 16L22 24" />
    <path d="M19 6L13 26" />
  </svg>
);

export const LightbulbDoodle: React.FC<{ className?: string }> = ({ className = 'w-7 h-7 text-hpl-gold' }) => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 10C9 6.5 11.5 4 14 4C16.5 4 19 6.5 19 10C19 12.5 17 14.5 16 16V19H12V16C11 14.5 9 12.5 9 10Z" fill="#FDE047" fillOpacity="0.3" />
    <path d="M11 22H17" />
    <path d="M12 25H16" />
    <path d="M14 1V3" />
    <path d="M5 6L7 8" />
    <path d="M23 6L21 8" />
  </svg>
);

export const TrophyBadge: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M7 6H25V14C25 19 20 23 16 23C12 23 7 19 7 14V6Z" fill="#FBBF24" stroke="#1E1B4B" strokeWidth="2" />
    <path d="M7 9H3C3 14 6 16 8 16" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
    <path d="M25 9H29C29 14 26 16 24 16" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 23V27H20V23" stroke="#1E1B4B" strokeWidth="2" />
    <rect x="10" y="27" width="12" height="3" rx="1.5" fill="#1E1B4B" />
  </svg>
);

/**
 * Hand-drawn folded paper airplane doodle with dashed trail (Matching media_1787927299229.jpg)
 */
export const PaperPlaneDoodle: React.FC<{ className?: string; flipped?: boolean }> = ({ 
  className = 'w-8 h-8 text-[#1E1B4B]', 
  flipped = false 
}) => (
  <svg 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`${className} ${flipped ? '-scale-x-100' : ''}`}
  >
    {/* Folded paper plane body */}
    <path 
      d="M38 10L10 24L24 28L38 10Z" 
      fill="white" 
      stroke="currentColor" 
      strokeWidth="2.2" 
      strokeLinejoin="round" 
    />
    <path 
      d="M38 10L24 28L28 38L32 31L38 10Z" 
      fill="#F1F5F9" 
      stroke="currentColor" 
      strokeWidth="2.2" 
      strokeLinejoin="round" 
    />
    <path 
      d="M24 28V36L28 32" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinejoin="round" 
    />
    {/* Whimsical dashed wind trail */}
    <path 
      d="M8 38C12 36 14 30 11 26C8 22 12 18 16 22" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeDasharray="3 4" 
      opacity="0.6" 
    />
  </svg>
);

/**
 * Soft sketched cloud doodle in blue/gray ink (Matching background behind temple/calendar)
 */
export const CloudDoodle: React.FC<{ className?: string }> = ({ className = 'w-16 h-10 text-[#64748B]' }) => (
  <svg 
    viewBox="0 0 64 36" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M14 28C10 28 6 25 6 20C6 15 10 13 13 13C14 8 19 4 26 4C32 4 37 8 39 12C41 10 44 9 47 9C52 9 56 13 56 18C58 19 60 21 60 24C60 28 57 30 52 30C46 30 18 30 14 28Z" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      opacity="0.5" 
      strokeDasharray="60 0.5" 
    />
    {/* Inner subtle sketchy shade line */}
    <path 
      d="M18 24C24 24 38 24 46 25" 
      stroke="currentColor" 
      strokeWidth="1.4" 
      strokeLinecap="round" 
      opacity="0.3" 
      strokeDasharray="2 3" 
    />
  </svg>
);

/**
 * Hand-drawn crown doodle in navy ink (Matching under the champion stage)
 */
export const CrownDoodle: React.FC<{ className?: string }> = ({ className = 'w-9 h-7 text-[#1E1B4B]' }) => (
  <svg 
    viewBox="0 0 36 28" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M5 21L3 8L11 14L18 5L25 14L33 8L31 21H5Z" 
      stroke="currentColor" 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none" 
    />
    <circle cx="3" cy="8" r="1.6" fill="currentColor" />
    <circle cx="18" cy="5" r="1.8" fill="currentColor" />
    <circle cx="33" cy="8" r="1.6" fill="currentColor" />
    <path 
      d="M7 21C12 23 24 23 29 21" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
    />
  </svg>
);

/**
 * Shooting star doodle with arched dashed tail (Matching under One Champion subtitle)
 */
export const ShootingStarDoodle: React.FC<{ className?: string }> = ({ className = 'w-10 h-10 text-[#F59E0B]' }) => (
  <svg 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Star head */}
    <path 
      d="M28 6L30.5 12.5L37 14L32 18.5L33.5 25L28 21.5L22.5 25L24 18.5L19 14L25.5 12.5L28 6Z" 
      fill="currentColor" 
      stroke="#1E1B4B" 
      strokeWidth="1.6" 
      strokeLinejoin="round" 
    />
    {/* Curved trailing dashed wind line */}
    <path 
      d="M6 34C10 26 15 20 23 18" 
      stroke="#1E1B4B" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeDasharray="3 4" 
      opacity="0.7" 
    />
    <path 
      d="M10 37C14 31 18 25 25 23" 
      stroke="#F59E0B" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeDasharray="2 3" 
      opacity="0.8" 
    />
  </svg>
);

