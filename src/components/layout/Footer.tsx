import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { 
  Instagram, 
  Linkedin, 
  Github, 
  Youtube, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  ShieldCheck, 
  Calendar,
  ExternalLink
} from 'lucide-react';
import { HPL_IMAGES } from '../../assets/images';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  return (
    <footer className="relative w-full overflow-hidden select-none">
      {/* 
        =======================================================================
        1. ANIMATED CONTINUOUS LEAGUE TICKER TAPE
        Continuous kinetic marquee moving smoothly across the horizon
        =======================================================================
      */}
      <div className="bg-[#F59E0B] border-y-2 border-ink text-ink font-display font-black text-xs sm:text-sm tracking-wider uppercase overflow-hidden py-2.5 shadow-sketch-sm">
        <div className="flex animate-marquee whitespace-nowrap gap-8 items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="flex items-center gap-2">
                <span className="animate-spin text-sm">⚡</span>
                <span>HACKATHON PREMIER LEAGUE 2026</span>
              </span>
              <span>✦</span>
              <span className="text-amber-950">CODE TODAY. IMPACT TOMORROW.</span>
              <span>✦</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping" />
                <span>REGISTRATIONS LIVE</span>
              </span>
              <span>✦</span>
              <span>3 WEEKS • 40+ SQUADS • HEAD-TO-HEAD BATTLES</span>
              <span>✦</span>
              <span className="text-amber-950">SMVITM BANTAKAL CAMPUS</span>
              <span>✦</span>
              <span>BE THE CHAMPION</span>
              <span>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 
        =======================================================================
        2. MAIN ANIMATED HORIZON ARENA (Original Royal Navy #1E1B4B)
        With animated floating ambient cosmic code particles
        =======================================================================
      */}
      <div className="relative bg-gradient-to-b from-[#1E1B4B] via-[#1B1847] to-[#15133B] text-white pt-10 pb-8 px-4 sm:px-6 lg:px-10 overflow-hidden border-t-2 border-[#F59E0B]/30">
        
        {/* Animated Background Halftone & Glowing Grid */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #FFFFFF 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Floating Sparks & Constellations */}
        <div className="absolute top-6 left-12 text-amber-400/20 text-2xl animate-float pointer-events-none">✦</div>
        <div className="absolute bottom-16 right-20 text-indigo-400/25 text-xl animate-float-reverse pointer-events-none">✦</div>
        <div className="absolute top-1/2 left-1/4 text-purple-400/15 text-lg animate-sparkle pointer-events-none">★</div>
        <div className="absolute top-8 right-1/3 text-emerald-400/20 text-sm font-mono animate-float pointer-events-none">&#123;code&#125;</div>
        <div className="absolute bottom-8 left-1/3 text-blue-400/20 text-xs font-mono animate-float-reverse pointer-events-none">&lt;/&gt;</div>

        {/* Glowing Center Radial Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-[1440px] mx-auto relative z-10 space-y-10">
          
          {/* Main 3-Column Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* ------------------------------------------------------------- */}
            {/* LEFT: HPL SHIELD BRAND & STATUS BADGE (4 Cols)                */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center lg:items-start text-center sm:text-left gap-4">
              <div 
                onClick={() => {
                  onNavigate('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-3.5 cursor-pointer group"
              >
                {/* HPL Shield with animated hover bounce */}
                <div className="w-14 h-14 relative flex-shrink-0">
                  <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-md group-hover:blur-lg transition-all group-hover:scale-110" />
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full relative z-10 transform group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300">
                    <polygon points="50,6 90,24 90,74 50,94 10,74 10,24" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="4.5" />
                    <path d="M 36 34 H 64 V 46 C 64 56 56 62 50 62 C 44 62 36 56 36 46 Z" fill="#F59E0B" />
                    <path d="M 30 38 C 24 38 24 50 36 52 M 70 38 C 76 38 76 50 64 52" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <rect x="46" y="62" width="8" height="8" fill="#F59E0B" />
                    <rect x="38" y="70" width="24" height="4" rx="1" fill="#F59E0B" />
                    <text x="50" y="86" fontFamily="'Space Grotesk', sans-serif" fontWeight="900" fontSize="13" fill="#FFFFFF" textAnchor="middle">
                      HPL
                    </text>
                  </svg>
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-2xl tracking-wider text-white">
                      HPL
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest">
                      SEASON 1
                    </span>
                  </div>
                  <div className="font-mono text-[10px] font-bold text-white/70 tracking-widest uppercase mt-0.5">
                    HACKATHON PREMIER LEAGUE
                  </div>
                </div>
              </div>

              {/* Live Status Pill with animated radar beacon */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-mono text-[11px] font-semibold text-emerald-300 tracking-wide">
                  Registrations Open • Season 2026
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* CENTER: ANIMATED CALL TO ACTION & HERO BUTTON (4 Cols)        */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col items-center text-center gap-3">
              <div className="space-y-1">
                <h3 className="font-display font-black italic text-xl sm:text-2xl lg:text-3xl tracking-wide uppercase bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
                  CODE TODAY. IMPACT TOMORROW.
                </h3>
                <p className="text-xs sm:text-sm text-indigo-200/90 font-sans font-medium max-w-sm mx-auto">
                  Are you ready to rise in the league and conquer the championship?
                </p>
              </div>

              {/* Pulsing Animated Champion Register Button */}
              <div className="relative group pt-1">
                {/* Ambient glowing button aura */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 group-hover:scale-105 animate-pulse" />
                
                <button
                  onClick={() => {
                    onNavigate('register');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="relative px-7 py-3 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-[#1E1B4B] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-sketch-sm hover:shadow-sketch hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-[#1E1B4B] animate-bounce" />
                  <span>REGISTER YOUR SQUAD</span>
                  <ArrowRight className="w-4 h-4 text-[#1E1B4B] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT: SOCIAL CHANNELS & POWERED BY (4 Cols)                  */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right gap-4">
              
              {/* Follow Us Interactive Glow Pills */}
              <div className="space-y-2">
                <span className="font-mono text-[11px] font-black tracking-widest text-amber-400 uppercase flex items-center justify-center lg:justify-end gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CONNECT WITH LEAGUE</span>
                </span>
                
                <div className="flex items-center gap-2.5">
                  {[
                    { icon: Instagram, href: '#instagram', label: 'Instagram', color: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-500' },
                    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn', color: 'hover:bg-[#0A66C2]' },
                    { icon: Github, href: '#github', label: 'GitHub', color: 'hover:bg-[#333]' },
                    { icon: Youtube, href: '#youtube', label: 'YouTube', color: 'hover:bg-[#FF0000]' },
                  ].map((soc) => (
                    <a
                      key={soc.label}
                      href={soc.href}
                      aria-label={soc.label}
                      className={`w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-transparent ${soc.color} shadow-sm`}
                    >
                      <soc.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Powered By & Collaboration Logos */}
              <div className="space-y-2.5 pt-1">
                <span className="font-mono text-[10px] sm:text-[11px] font-black tracking-widest text-white/60 uppercase block">
                  ORGANIZED IN COLLABORATION WITH
                </span>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-2.5">
                  {[
                    { id: 'smvitm', name: 'SMVITM', logo: HPL_IMAGES.smvitmLogo },
                    { id: 'shirva', name: 'Shirva Police', logo: HPL_IMAGES.shirvaLogo },
                    { id: 'codetroopers', name: 'CodeTroopers', logo: HPL_IMAGES.codeTrooperLogo },
                    { id: 'ignite', name: 'IGNITE AI', logo: HPL_IMAGES.igniteLogo },
                    { id: 'aikya', name: 'AIKYA', logo: HPL_IMAGES.aikyaLogo },
                    { id: 'ieee', name: 'IEEE', logo: HPL_IMAGES.ieeeLogo },
                    { id: 'iste', name: 'ISTE', logo: HPL_IMAGES.isteLogo },
                  ].map((partner) => (
                    <div
                      key={partner.id}
                      onMouseEnter={() => setHoveredPartner(partner.id)}
                      onMouseLeave={() => setHoveredPartner(null)}
                      className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-amber-400/60 transition-all duration-200 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 shadow-2xs"
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/95 rounded-lg p-0.5 flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <span className="font-display font-black text-xs sm:text-[12.5px] text-white tracking-tight whitespace-nowrap">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* --------------------------------------------------------------- */}
          {/* CONTACT US SECTION                                              */}
          {/* --------------------------------------------------------------- */}
          <div className="pt-8 border-t border-white/10 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
              <span className="font-mono text-[11px] font-black tracking-widest text-amber-400 uppercase">
                Contact Us
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Faculty Coordinators */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-[9px] font-mono font-black text-amber-300 uppercase tracking-widest">
                    Faculty Coordinators
                  </span>
                </div>
                {[
                  { name: 'Dr. Rajesh Nayak', phone: '9164510062' },
                  { name: 'Mr. Raghvendra G S', phone: '9738405453' },
                ].map((person) => (
                  <div key={person.phone} className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-300 text-xs">👨‍🏫</span>
                    </div>
                    <div>
                      <div className="font-display font-black text-xs text-white tracking-tight">{person.name}</div>
                      <a
                        href={`tel:+91${person.phone}`}
                        className="font-mono text-[11px] text-indigo-300 hover:text-amber-300 transition-colors"
                      >
                        +91 {person.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Team Members */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-400/15 border border-indigo-400/30 text-[9px] font-mono font-black text-indigo-300 uppercase tracking-widest">
                    Core Team
                  </span>
                </div>
                {[
                  { name: 'Yashwanth', phone: '8217561286' },
                  { name: 'Abhishek Kini', phone: '9844101520' },
                  { name: 'Bhushan Poojary', phone: '7381709385' },
                  { name: 'Tejas Nayak', phone: '8296151023' },
                  { name: 'Pradyumna Upadhyaya', phone: '9980441036' },
                ].map((person) => (
                  <div key={person.phone} className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-300 text-xs">⚡</span>
                    </div>
                    <div>
                      <div className="font-display font-black text-xs text-white tracking-tight">{person.name}</div>
                      <a
                        href={`tel:+91${person.phone}`}
                        className="font-mono text-[11px] text-indigo-300 hover:text-amber-300 transition-colors"
                      >
                        +91 {person.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* BOTTOM STRIP: QUICK NAVIGATION & VENUE INFO                     */}
          {/* --------------------------------------------------------------- */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>SMVITM Bantakal Campus, Udupi • Karnataka, India</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-white/70">
              <button 
                onClick={() => {
                  onNavigate('rulebook');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-300 hover:underline transition-colors cursor-pointer"
              >
                Official Rulebook
              </button>
              <span>•</span>
              <button 
                onClick={() => {
                  onNavigate('sponsors');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-300 hover:underline transition-colors cursor-pointer"
              >
                Sponsors & Partners
              </button>
              <span>•</span>
              <button 
                onClick={() => {
                  onNavigate('journey');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-300 hover:underline transition-colors cursor-pointer"
              >
                League Timeline
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-300 hover:underline transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Contact</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div>
              © 2026 HPL. Built for Student Innovators.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
