import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { RULEBOOK_SECTIONS } from '../../data/hplData';
import { Button } from '../common/Button';
import { SparkleDoodle } from '../illustrations/MicroDoodles';
import { BookOpen, CheckCircle2, ChevronDown, ShieldAlert, ArrowRight, Download, Search } from 'lucide-react';

interface RulebookPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const RulebookPage: React.FC<RulebookPageProps> = ({ onNavigate }) => {
  const [openSection, setOpenSection] = useState<string | null>('eligibility');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = RULEBOOK_SECTIONS.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.rules.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-dark sketch-border text-xs font-mono font-bold text-ink uppercase tracking-wider shadow-sketch-sm">
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
          OFFICIAL LEAGUE DIRECTIVE
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-ink">
          OFFICIAL RULEBOOK
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          Comprehensive tournament regulations, git commit standards, points formulas, and fair-play policies.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-4 h-4 text-ink-muted absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search rulebook (e.g. eligibility, points, git, tiebreakers)..."
          className="w-full pl-11 pr-4 py-3 rounded-xl sketch-border bg-paper-light text-ink font-sans text-sm focus:outline-none focus:ring-2 focus:ring-hpl-purple shadow-sketch-sm"
        />
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {filteredSections.map((section) => {
          const isOpen = openSection === section.id || searchQuery.length > 0;
          return (
            <div
              key={section.id}
              className="bg-paper-light sketch-border rounded-2xl shadow-sketch overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenSection(isOpen ? null : section.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none bg-paper-light hover:bg-paper-cream transition-colors"
              >
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-black font-display uppercase text-ink">
                    {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted font-sans">
                    {section.summary}
                  </p>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-ink transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'transform rotate-180 text-hpl-coral' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t-2 border-ink/10 bg-paper-cream/40 space-y-3">
                  {section.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-paper-light sketch-border text-xs sm:text-sm font-sans leading-relaxed text-ink">
                      <CheckCircle2 className="w-4 h-4 text-hpl-emerald flex-shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fair Play Box */}
      <div className="bg-rose-50 border-2 border-rose-300 sketch-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-sketch">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-hpl-coral flex-shrink-0" />
          <h3 className="text-xl font-black font-display uppercase text-rose-950">
            ZERO TOLERANCE FOR PLAGIARISM
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-sans">
          All code repos are subjected to automated AST-level similarity scans. Plagiarized libraries or previously completed commercial applications will result in immediate disqualification and institution notification.
        </p>
      </div>
    </div>
  );
};
