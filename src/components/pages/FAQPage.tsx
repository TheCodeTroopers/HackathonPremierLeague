import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { FAQ_DATA } from '../../data/hplData';
import { Button } from '../common/Button';
import { SparkleDoodle } from '../illustrations/MicroDoodles';
import { Search, ChevronDown, HelpCircle, Mail, ArrowRight } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const categories = ['All', 'General', 'Participation', 'Submission', 'Evaluation', 'Playoffs', 'Event Day'];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesQuery = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-dark sketch-border text-xs font-mono font-bold text-ink uppercase tracking-wider shadow-sketch-sm">
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
          HPL KNOWLEDGE BASE
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-ink">
          FREQUENTLY ASKED{' '}
          <span className="font-marker text-[#4F46E5] not-italic inline-block">
            QUESTIONS
          </span>
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          Everything you need to know about team formations, match day mechanics, evaluation, and the Grand Finale.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-4 h-4 text-ink-muted absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions (e.g. eligibility, team size, venue)..."
          className="w-full pl-11 pr-4 py-3 rounded-xl sketch-border bg-paper-light text-ink font-sans text-sm focus:outline-none focus:ring-2 focus:ring-hpl-purple shadow-sketch-sm"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-display font-bold uppercase transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-ink text-paper-light sketch-border shadow-sketch-sm'
                : 'bg-paper-light sketch-border text-ink hover:bg-paper-dark'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaq === faq.id || searchQuery.length > 0;
          return (
            <div
              key={faq.id}
              className="bg-paper-light sketch-border rounded-2xl shadow-sketch overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                className="w-full px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none bg-paper-light hover:bg-paper-cream transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-paper-dark sketch-border text-[10px] font-mono font-bold uppercase text-hpl-indigo flex-shrink-0">
                    {faq.category}
                  </span>
                  <span className="text-sm sm:text-base font-bold font-display text-ink">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-ink transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'transform rotate-180 text-hpl-coral' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-2 border-t border-ink/10 text-xs sm:text-sm text-ink-muted font-sans leading-relaxed bg-paper-cream/30">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-paper-cream sketch-border rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sketch-lg">
        <h3 className="text-xl sm:text-2xl font-black font-display uppercase text-ink">
          STILL HAVE QUESTIONS?
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto">
          Reach out to the organizing team at SMVITM Bantakal. We are happy to clarify rules or track guidelines.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-paper-light sketch-border font-mono text-xs font-bold text-ink shadow-sketch-sm">
          <Mail className="w-4 h-4 text-hpl-coral" />
          <span>hpl@sode-edu.in</span>
        </div>
      </div>
    </div>
  );
};
