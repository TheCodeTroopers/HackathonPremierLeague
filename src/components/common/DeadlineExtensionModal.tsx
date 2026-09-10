import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, Trophy, ArrowRight, AlertTriangle, Sparkles, ShieldAlert } from 'lucide-react';
import { PageRoute } from '../../types';

interface DeadlineExtensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageRoute) => void;
}

export const DeadlineExtensionModal: React.FC<DeadlineExtensionModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  // Keyboard accessibility and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleDismiss = () => {
    try {
      localStorage.setItem('hpl_deadline_extended_banner_seen', 'true');
    } catch {
      // Fallback if localStorage is disabled
    }
    onClose();
  };

  const handleRegisterClick = () => {
    try {
      localStorage.setItem('hpl_deadline_extended_banner_seen', 'true');
    } catch {
      // Fallback
    }
    onClose();
    onNavigate('register');
  };

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deadline-modal-title"
    >
      {/* Dark Navy Tinted Comic Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0F172A]/75 backdrop-blur-sm transition-opacity duration-300 anim-backdrop-in"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Main Special Bulletin Card */}
      <div className="relative w-full max-w-lg bg-[#FAF6EE] border-3 border-[#1E1B4B] rounded-2xl sm:rounded-3xl shadow-[8px_8px_0px_#1E1B4B] sm:shadow-[12px_12px_0px_#1E1B4B] overflow-hidden z-10 my-auto transform transition-all duration-300 anim-drawer-in">
        
        {/* Top Warning Hazard Stripes Bar */}
        <div className="w-full bg-[#BE123C] border-b-2 border-[#1E1B4B] px-4 py-2 flex items-center justify-between text-white overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-80" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
              OFFICIAL HPL ANNOUNCEMENT
            </span>
          </div>

          {/* Close Pill Button */}
          <button
            onClick={handleDismiss}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/30 text-white font-mono text-[11px] font-black uppercase transition-all cursor-pointer border border-white/40 active:scale-95"
            aria-label="Dismiss banner"
          >
            <span>CLOSE</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card Content Area */}
        <div className="p-5 sm:p-7 space-y-5">
          
          {/* Header Tag & Title (Reason removed) */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE2E2] border-2 border-[#BE123C] text-[#BE123C] font-mono text-xs font-black uppercase tracking-wider shadow-sketch-sm rotate-[-1deg]">
              <AlertTriangle className="w-3.5 h-3.5 text-[#BE123C] animate-bounce" />
              <span>DEADLINE EXTENSION GRANTED</span>
            </div>

            <h2 
              id="deadline-modal-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-[#1E1B4B] uppercase tracking-tight leading-none pt-1"
            >
              REGISTRATION EXTENDED!
            </h2>
          </div>

          {/* Red Highlighted Golden-Bordered Deadline Box */}
          <div className="relative bg-gradient-to-br from-[#FFFDF7] to-[#FEF2F2] border-2 border-[#BE123C] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#BE123C] space-y-3">
            
            {/* Stamp Ribbon */}
            <div className="flex items-center justify-between border-b border-[#BE123C]/20 pb-2.5">
              <span className="font-mono text-[11px] font-black tracking-wider text-[#991B1B] uppercase flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#DC2626]" />
                NEW REGISTRATION DEADLINE
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#DC2626] text-white font-mono text-[10px] font-black uppercase tracking-widest animate-pulse">
                FINAL CHANCE
              </span>
            </div>

            {/* Prominent Date Display */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#DC2626] text-white border-2 border-[#1E1B4B] flex flex-col items-center justify-center shadow-sketch-sm flex-shrink-0">
                  <span className="font-mono text-[10px] font-black uppercase leading-none opacity-90">SEP</span>
                  <span className="font-display text-xl font-black leading-none mt-0.5">08</span>
                </div>
                <div>
                  <div className="font-display font-black text-lg sm:text-xl text-[#1E1B4B] leading-tight">
                    9TH SEPTEMBER 2026
                  </div>
                  <div className="font-mono text-xs font-bold text-[#DC2626] flex items-center gap-1">
                    <span>CLOSES AT 7:00 PM IST SHARP</span>
                  </div>
                </div>
              </div>

              {/* Extra 48 Hours Badge */}
              <div className="px-3 py-1.5 rounded-xl bg-amber-100 border-2 border-amber-600 text-amber-900 font-mono text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 self-center sm:self-auto">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>+48 HOURS ADDED</span>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={handleRegisterClick}
              className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-display font-black text-sm uppercase tracking-wider text-center border-2 border-[#1E1B4B] shadow-[4px_4px_0px_#1E1B4B] hover:shadow-[6px_6px_0px_#1E1B4B] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Trophy className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>REGISTER SQUAD BEFORE 9TH SEP 7 PM</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleDismiss}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-amber-50 text-[#1E1B4B] font-display font-black text-xs uppercase tracking-wider text-center border-2 border-[#1E1B4B] shadow-sketch-sm hover:shadow-sketch active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              GOT IT, CONTINUE TO SITE
            </button>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
};
