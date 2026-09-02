import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PageRoute } from '../../types';
import { Menu } from 'lucide-react';

interface NavbarProps {
  activePage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems: { label: string; page: PageRoute }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'RULE BOOK', page: 'rulebook' },
    { label: 'TIMELINE', page: 'timeline' },
    { label: 'LEADERBOARD', page: 'leaderboard' },
    { label: 'MENTORS', page: 'mentors' },
    { label: 'SPONSORS', page: 'sponsors' },
    { label: 'PROBLEM STATEMENTS', page: 'problem-statements' },
    { label: 'FAQ', page: 'faq' },
    { label: 'CONTACT', page: 'contact' },
  ];

  // Smooth scroll depth tracker with hysteresis buffer to eliminate jitter
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setIsScrolled(prev => {
            if (!prev && currentY > 70) return true;
            if (prev && currentY < 30) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling while mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = (callback?: () => void) => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
      if (callback) callback();
    }, 280);
  };

  const handleNavClick = (page: PageRoute) => {
    if (mobileMenuOpen) {
      closeMenu(() => onNavigate(page));
    } else {
      onNavigate(page);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-16 sm:h-20 pointer-events-none transition-all duration-300">
      {/* Top Full Navbar Background Bar (Fades out when scrolled) */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        isScrolled 
          ? 'opacity-0 pointer-events-none' 
          : 'opacity-100 bg-[#FAF6EE]/95 backdrop-blur-md border-b-2 border-[#1E1B4B]/15 shadow-sm pointer-events-auto'
      }`} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Left: HPL Brand Shield Logo (Morphs into a sleek floating pill when scrolled) */}
        <button
          onClick={() => handleNavClick('home')}
          className={`flex items-center gap-2 sm:gap-2.5 group text-left cursor-pointer focus:outline-none pointer-events-auto transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-full px-3.5 py-1.5 shadow-[2.5px_2.5px_0px_#1E1B4B] hover:bg-amber-50 hover:shadow-[3.5px_3.5px_0px_#1E1B4B] active:translate-x-0.5 active:translate-y-0.5' 
              : ''
          }`}
        >
          <div className={`relative flex-shrink-0 transition-all duration-300 ${
            isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-9 h-9 sm:w-10 sm:h-10'
          }`}>
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full transform group-hover:scale-105 transition-transform duration-200">
              {/* Shield Body */}
              <polygon points="50,6 90,24 90,74 50,94 10,74 10,24" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="4" />
              {/* Golden Crown / Trophy inside shield */}
              <path d="M 30 38 L 40 54 L 50 34 L 60 54 L 70 38 L 68 62 H 32 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
              <rect x="36" y="64" width="28" height="5" rx="1.5" fill="#F59E0B" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className={`font-black font-display tracking-tight text-ink uppercase leading-none transition-all duration-300 ${
              isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
            }`}>
              HPL
            </span>
            {!isScrolled && (
              <span className="hidden xs:block text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-ink-muted uppercase leading-tight mt-0.5">
                HACKATHON PREMIER LEAGUE
              </span>
            )}
          </div>
        </button>

        {/* Center: Desktop Nav Items (Visible at the top, cleanly fades out when scrolling down) */}
        <nav className={`transition-all duration-300 ${
          isScrolled 
            ? 'opacity-0 scale-95 pointer-events-none hidden lg:hidden' 
            : 'hidden lg:flex items-center gap-6 xl:gap-8 opacity-100 scale-100 pointer-events-auto'
        }`}>
          {navItems.map((item) => {
            const isActive = (item.label === 'HOME' && activePage === 'home') ||
                             (item.label === 'RULE BOOK' && activePage === 'rulebook') ||
                             (item.label === 'TIMELINE' && (activePage === 'timeline' || activePage === 'journey')) ||
                             (item.label === 'LEADERBOARD' && activePage === 'leaderboard') ||
                             (item.label === 'MENTORS' && activePage === 'mentors') ||
                             (item.label === 'SPONSORS' && activePage === 'sponsors') ||
                             (item.label === 'PROBLEM STATEMENTS' && activePage === 'problem-statements') ||
                             (item.label === 'FAQ' && activePage === 'faq') ||
                             (item.label === 'CONTACT' && activePage === 'contact');

            return (
              <div key={item.label} className="relative py-1">
                <button
                  onClick={() => handleNavClick(item.page)}
                  className={`font-display text-xs xl:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-ink font-black'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
                {isActive && (
                  <div className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#4F46E5] rounded-full" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Floating MENU Pill & Register CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
          {/* Floating Big Standalone MENU Button when Scrolled / Mobile Menu at top */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#1E1B4B] bg-[#FFFDF7] text-[#1E1B4B] font-display font-black uppercase transition-all duration-300 cursor-pointer ${
              isScrolled 
                ? 'px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm shadow-[3.5px_3.5px_0px_#1E1B4B] hover:bg-[#FBBF24] hover:shadow-[4.5px_4.5px_0px_#1E1B4B] hover:scale-105 active:translate-x-0.5 active:translate-y-0.5' 
                : 'flex lg:hidden px-3.5 py-1.5 text-xs shadow-[2px_2px_0px_#1E1B4B] hover:bg-amber-100 active:translate-x-0.5 active:translate-y-0.5'
            }`}
            aria-label="Open menu drawer"
          >
            <Menu className={`transition-all duration-300 ${isScrolled ? 'w-4 h-4 sm:w-5 sm:h-5 text-[#1E1B4B]' : 'w-3.5 h-3.5'}`} />
            <span className="tracking-wider">MENU</span>
            {isScrolled && (
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping ml-0.5" />
            )}
          </button>

          {/* Register Capsule (Visible only at top) */}
          <div className={`transition-all duration-300 ${isScrolled ? 'hidden' : 'hidden sm:flex items-center'}`}>
            <button
              onClick={() => handleNavClick('register')}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-display font-black text-xs xl:text-sm uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
              <span>REGISTER NOW</span>
            </button>
          </div>
        </div>

      </div>
    </header>

      {/* ========================================================================= */}
      {/* DevHack-Style Slide-In Right Drawer (Mounted via Portal to document.body) */}
      {/* ========================================================================= */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] select-none">
          {/* Dark Backdrop Overlay */}
          <div 
            className={`fixed inset-0 bg-[#1E1B4B]/60 backdrop-blur-xs ${
              isClosing ? 'anim-backdrop-out' : 'anim-backdrop-in'
            }`}
            onClick={() => closeMenu()}
          />

          {/* Slide-over Container: Orange Accent + Cream Paper Canvas */}
          <div className={`fixed inset-y-0 right-0 h-screen w-full max-w-[340px] sm:max-w-[400px] flex shadow-2xl z-50 ${
            isClosing ? 'anim-drawer-out' : 'anim-drawer-in'
          }`}>
            
            {/* Left Orange Accent Strip (Matching reference mockup!) */}
            <div className="w-3.5 sm:w-5 bg-[#EA580C] border-l-2 border-r-2 border-[#1E1B4B] h-full flex-shrink-0" />

            {/* Main Cream Paper Panel */}
            <div className="flex-1 bg-[#FAF6EE] text-[#1E1B4B] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto border-l-2 border-[#1E1B4B] relative h-full">
              
              {/* Top Bar: CLOSE ✕ Pill Button */}
              <div className="flex items-center justify-between pb-5 border-b-2 border-[#1E1B4B]/15">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-ping" />
                  <span className="font-mono text-xs font-black tracking-widest uppercase text-[#1E1B4B]/70">
                    HPL SEASON 1
                  </span>
                </div>

                <button
                  onClick={() => closeMenu()}
                  className="anim-drawer-close inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border-2 border-[#1E1B4B] text-xs font-display font-black uppercase text-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] hover:bg-amber-100 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  aria-label="Close menu"
                >
                  <span>CLOSE</span>
                  <span className="text-sm font-sans font-black">✕</span>
                </button>
              </div>

              {/* Numbered Navigation Items with One-by-One Staggered Slide-Up */}
              <div className="py-6 space-y-3.5">
                {navItems.map((item, index) => {
                  const num = String(index + 1).padStart(2, '0');
                  const isActive = (item.label === 'HOME' && activePage === 'home') ||
                                   (item.label === 'RULE BOOK' && activePage === 'rulebook') ||
                                   (item.label === 'TIMELINE' && (activePage === 'timeline' || activePage === 'journey')) ||
                                   (item.label === 'LEADERBOARD' && activePage === 'leaderboard') ||
                                   (item.label === 'MENTORS' && activePage === 'mentors') ||
                                   (item.label === 'SPONSORS' && activePage === 'sponsors') ||
                                   (item.label === 'PROBLEM STATEMENTS' && activePage === 'problem-statements') ||
                                   (item.label === 'FAQ' && activePage === 'faq') ||
                                   (item.label === 'CONTACT' && activePage === 'contact');

                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.page)}
                      className="group text-left w-full cursor-pointer focus:outline-none block py-1"
                    >
                      <div className="overflow-hidden">
                        <div className={`drawer-text-stagger-${index + 1} transition-transform group-hover:translate-x-2 duration-200`}>
                          <span className="block font-mono text-[11px] font-bold text-[#1E1B4B]/40 tracking-wider mb-0.5">
                            {num}
                          </span>
                          <div className="flex items-center justify-between">
                            <span className={`font-display font-black text-2xl sm:text-3xl uppercase tracking-tight transition-colors ${
                              isActive ? 'text-[#EA580C] underline decoration-[#EA580C] decoration-2' : 'text-[#1E1B4B] group-hover:text-[#4F46E5]'
                            }`}>
                              {item.label}
                            </span>
                            {isActive ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-ping mr-2" />
                            ) : (
                              <span className="text-sm font-mono text-[#1E1B4B]/20 group-hover:text-[#4F46E5] group-hover:translate-x-1 transition-all mr-1">
                                →
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom: Socials + Register Action */}
              <div className="anim-drawer-footer pt-5 border-t-2 border-[#1E1B4B]/15 space-y-5">
                
                {/* Social Links */}
                <div className="space-y-2">
                  <div className="font-mono text-[11px] font-black tracking-widest text-[#1E1B4B]/50 uppercase">
                    SOCIALS
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-display font-black uppercase text-[#1E1B4B]/80">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-[#EA580C] transition-colors flex items-center justify-between py-1 border-b border-[#1E1B4B]/10 group"
                    >
                      <span>INSTAGRAM</span>
                      <span className="text-[10px] font-mono opacity-50 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-[#EA580C] transition-colors flex items-center justify-between py-1 border-b border-[#1E1B4B]/10 group"
                    >
                      <span>LINKEDIN</span>
                      <span className="text-[10px] font-mono opacity-50 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </a>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-[#EA580C] transition-colors flex items-center justify-between py-1 border-b border-[#1E1B4B]/10 group"
                    >
                      <span>GITHUB</span>
                      <span className="text-[10px] font-mono opacity-50 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </a>
                    <a 
                      href="https://youtube.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-[#EA580C] transition-colors flex items-center justify-between py-1 border-b border-[#1E1B4B]/10 group"
                    >
                      <span>YOUTUBE</span>
                      <span className="text-[10px] font-mono opacity-50 group-hover:translate-x-0.5 transition-transform">↗</span>
                    </a>
                  </div>
                </div>

                {/* Register CTA Button */}
                <button
                  onClick={() => handleNavClick('register')}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#EA580C] hover:bg-[#D97706] text-white font-display font-black text-xs uppercase tracking-wider text-center shadow-[3px_3px_0px_#1E1B4B] border-2 border-[#1E1B4B] flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                  <span>REGISTER SQUAD • ₹30K POOL</span>
                </button>

              </div>

            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
};
