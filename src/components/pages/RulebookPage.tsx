import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { RulebookBookHero } from '../illustrations/AboutIllustration';
import { SparkleDoodle, StarDoodle, TrophyBadge } from '../illustrations/MicroDoodles';
import { HPL_IMAGES } from '../../assets/images';
import hplRulebookPdf from '../../assets/HPL-rulebook.pdf';
import { 
  Download, 
  FileText, 
  CheckCircle2, 
  Search, 
  ChevronRight, 
  ShieldAlert, 
  Users, 
  Calendar, 
  Code2, 
  Video, 
  Award, 
  CreditCard, 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  Scale, 
  Sparkles,
  Printer,
  ExternalLink,
  X,
  ChevronDown,
  FileDown,
  Layers,
  Compass
} from 'lucide-react';

interface RulebookPageProps {
  onNavigate: (page: PageRoute) => void;
}

// Full 15 official rulebook chapters according to SMVITM guidelines
export const OFFICIAL_RULES = [
  {
    id: 'sec-1',
    num: '01',
    title: 'About HPL',
    category: 'Tournament Overview',
    icon: BookOpen,
    summary: 'Three-week engineering championship organized by SMVITM Bantakal.',
    keyTakeaway: '3-week progressive tournament solving real-world challenges through technology.',
    points: [
      'Hackathon Premier League (HPL) 2026 is a three-week hackathon organized by Shri Madhwa Vadiraja Institute of Technology and Management (SMVITM).',
      'HPL challenges students to develop innovative and practical solutions to real-world problems using modern technology.',
      'Participants will work in teams, propose their solutions during registration, and shortlisted teams will proceed to subsequent stages of the league.'
    ]
  },
  {
    id: 'sec-2',
    num: '02',
    title: 'Eligibility',
    category: 'Participation Criteria',
    icon: Scale,
    summary: 'Exclusively open to currently enrolled SMVITM students across all departments.',
    keyTakeaway: 'Open only to SMVITM students (Any branch: CS, ECE, MECH, AIDS, AIML, MBA; Any year 1-4).',
    points: [
      'HPL 2026 is open exclusively to enrolled students of Shri Madhwa Vadiraja Institute of Technology and Management (SMVITM), Bantakal.',
      'Participants may belong to any academic year (1st, 2nd, 3rd, or 4th year) and any department.',
      'Inter-departmental and inter-year squad formation is strongly encouraged.'
    ]
  },
  {
    id: 'sec-3',
    num: '03',
    title: 'Team Formation',
    category: 'Squad Roster',
    icon: Users,
    summary: 'Strict squad size of exactly 5 members. Fixed upon submission.',
    keyTakeaway: 'Exactly 5 members per squad. No changes allowed post-registration.',
    points: [
      'Each team must consist of exactly 5 members — no more, no less.',
      'Teams may be formed freely by the participants across departments.',
      'A participant can be a member of only one team throughout HPL 2026.',
      'Teams are encouraged to maintain cross-functional balance (frontend, backend, design, AI/ML, presenting).',
      'The team composition cannot be changed once the registration form is submitted.',
      'Any correction or issue regarding registration details must be communicated directly to an HPL Coordinator.'
    ]
  },
  {
    id: 'sec-4',
    num: '04',
    title: 'Registration',
    category: 'Entry Protocol',
    icon: FileText,
    summary: 'Registration window: 2 – 6 September 2026 (closes 11:59 PM).',
    keyTakeaway: 'Requires Team Name, Leader & 5 Members info, Selected PS, and 3-min Drive Video link.',
    points: [
      'Registration Period: 2 September 2026 – 6 September 2026.',
      'Registration strictly closes at 11:59 PM on 6 September 2026.',
      'Each team must submit: Team Name, Team Leader Details (Name, Email, Contact), Names & Emails of all 5 members, Selected Problem Statement, and Solution Video (Google Drive Link).',
      'Teams may choose any one of the three official problem statements.',
      'IMPORTANT: The selected problem statement and squad composition are permanent after form submission.'
    ]
  },
  {
    id: 'sec-5',
    num: '05',
    title: 'Problem Statements',
    category: 'Challenge Tracks',
    icon: Code2,
    summary: 'Important: These problem statements are only for shortlisting. Actual Problem Statements will be given after shortlisting.',
    keyTakeaway: 'These problem statements are exclusively for shortlisting. Actual Problem Statements will be released after shortlisting.',
    points: [
      'Important: This problem statements are only for shortlisting. Actual Problem Statements will be given after shortlisting.',
      'PS 01 — WeatherGPT: Conversational AI for Weather Forecasting, Alerts, and Climate Information (Key Focus: Weather forecasting, alerts, climate insights, conversational UX).',
      'PS 02 — Rural Market Intelligence: Data-driven platform empowering farmers with price trends, nearby mandi comparisons, and net revenue calculators (Key Focus: Price discovery, demand insights, supply chain transparency).',
      'PS 03 — Internship & Opportunity Aggregator: Platform aggregating internships, scholarships, and hackathons with intelligent preference matching and deadline tracking.',
      'All 3 Problem Statements are evaluated on 6 core pillars: Problem Understanding, Functionality, User Experience, Technical Implementation, Innovation, and Practicality.'
    ]
  },
  {
    id: 'sec-6',
    num: '06',
    title: 'Registration Video',
    category: 'Submission Video',
    icon: Video,
    summary: 'Max 3-minute Google Drive video explaining walkthrough, tech stack, and approach.',
    keyTakeaway: 'Max 3 mins, set Drive sharing to "Anyone with the link", name file as TeamName.',
    points: [
      'Every team must submit a video demonstrating their proposed solution as part of registration.',
      'Video must cover: 1) Project Walkthrough, 2) Technology Stack, 3) Technology Justification, 4) Problem Solving Approach, 5) Uniqueness / Innovation.',
      'Maximum duration: 3 minutes (videos exceeding 3 minutes will be penalized).',
      'The video must be uploaded to Google Drive with sharing permission set to "Anyone with the link can view".',
      'The video file name must be your official Team Name.',
      'If the submitted video cannot be accessed, the HPL committee will reach out via email to resolve the permissions.'
    ]
  },
  {
    id: 'sec-7',
    num: '07',
    title: 'Shortlisting',
    category: 'Evaluation Phase',
    icon: Award,
    summary: 'Shortlisted teams announced on the HPL website on 8 September 2026.',
    keyTakeaway: 'Results published on 8 Sept 2026 followed by HPL Inauguration.',
    points: [
      'All registered teams will undergo a rigorous shortlisting review by evaluation panels.',
      'The shortlisted teams will be officially announced on the HPL website on 8 September 2026.',
      'Further tournament stages, weekly match schedules, and milestones will be revealed during the HPL Inauguration ceremony.'
    ]
  },
  {
    id: 'sec-8',
    num: '08',
    title: 'Technology & AI Usage',
    category: 'Tech Guidelines',
    icon: Sparkles,
    summary: 'Complete freedom of tech stack + AI tools permitted.',
    keyTakeaway: 'Tech stack is 100% your choice. Generative AI tools are permitted.',
    points: [
      'Technology Freedom: There are zero restrictions on technology stacks. Teams are free to choose languages, frameworks, libraries, cloud platforms, and APIs of their choice.',
      'AI Usage: Participants are permitted and encouraged to use modern AI tools, LLMs, copilot utilities, and AI APIs while engineering their solutions.'
    ]
  },
  {
    id: 'sec-9',
    num: '09',
    title: 'Shortlisted Team Fee',
    category: 'Registration Fee',
    icon: CreditCard,
    summary: 'Applicable only to shortlisted teams (₹150 for IEEE member squads, ₹200 others).',
    keyTakeaway: 'Fee applies only after shortlisting: ₹150 (IEEE squad) / ₹200 (Non-IEEE squad).',
    points: [
      'Zero fee at initial registration. The registration fee applies ONLY to teams that are shortlisted.',
      'Team with at least one active IEEE student member: ₹150 / team.',
      'Team with no IEEE student member: ₹200 / team.',
      'Payment links and instructions will be sent with the shortlist notification on 8 September 2026.'
    ]
  },
  {
    id: 'sec-10',
    num: '10',
    title: 'Cancellation & Refund',
    category: 'Finance Policy',
    icon: ShieldAlert,
    summary: 'Teams may withdraw anytime; shortlisted registration fees are strictly non-refundable.',
    keyTakeaway: 'Withdrawal is allowed anytime by informing coordinators; fees are non-refundable.',
    points: [
      'Teams may cancel or withdraw their participation at any time by notifying an HPL Coordinator in writing.',
      'Once the shortlisted-team registration fee has been paid, it is strictly non-refundable under any circumstance.'
    ]
  },
  {
    id: 'sec-11',
    num: '11',
    title: 'Code of Conduct & Fair Play',
    category: 'Integrity',
    icon: ShieldAlert,
    summary: 'Zero tolerance for plagiarism, unauthorized access, or unsportsmanlike conduct.',
    keyTakeaway: 'Submit original work. Disqualification applies for plagiarism or harassment.',
    points: [
      'Submit original work and strictly avoid plagiarism or copying another squad\'s work.',
      'Do not access another team\'s source code, accounts, cloud infrastructure, or repositories without authorization.',
      'Do not intentionally disrupt, DDoS, or sabotage any team\'s demonstration or hardware.',
      'Maintain respectful, collaborative, and professional behaviour toward fellow participants, coordinators, mentors, and jury members.',
      'Harassment, bullying, or discriminatory conduct will result in immediate expulsion.',
      'Respect open-source licenses and attribution when integrating third-party dependencies.',
      'Any form of cheating or unfair practice will result in immediate disqualification. The organizing committee\'s decision is final.'
    ]
  },
  {
    id: 'sec-12',
    num: '12',
    title: 'Important Dates',
    category: 'Schedule',
    icon: Calendar,
    summary: 'Registration: 2–6 Sept | Shortlist & Inauguration: 8 Sept 2026.',
    keyTakeaway: 'Mark 6 Sept (11:59 PM) for registration close & 8 Sept for shortlist + kickoff.',
    points: [
      '2 September 2026: Official Registrations Open.',
      '6 September 2026 (11:59 PM): Registrations Strictly Close.',
      '8 September 2026: Shortlisted Teams Announced on Portal.',
      '8 September 2026: Official HPL 2026 Inauguration Ceremony.',
      'Subsequent Match Days & Grand Finale dates announced at Inauguration.'
    ]
  },
  {
    id: 'sec-13',
    num: '13',
    title: 'Certificates',
    category: 'Recognition',
    icon: Award,
    summary: 'Official certificates awarded to participants as per committee guidelines.',
    keyTakeaway: 'Verified participation & merit certificates issued by SMVITM.',
    points: [
      'Official Certificates of Participation will be issued to all eligible teams that complete scheduled match days.',
      'Certificates of Merit and Winner credentials will be awarded to Champions, Runners-Up, and Domain Toppers.'
    ]
  },
  {
    id: 'sec-14',
    num: '14',
    title: 'Official Communication',
    category: 'Channels',
    icon: HelpCircle,
    summary: 'All formal announcements and schedule updates are disseminated via email.',
    keyTakeaway: 'Check the team leader and members\' registered email IDs regularly.',
    points: [
      'All official announcements, shortlists, match schedules, and directives are communicated via email.',
      'Participants are strictly responsible for regularly checking the email addresses provided during registration.'
    ]
  },
  {
    id: 'sec-15',
    num: '15',
    title: 'General Rules',
    category: 'Core Regulations',
    icon: CheckCircle2,
    summary: 'Accuracy of details, single-team rule, exactly 5 members, and compliance with committee decisions.',
    keyTakeaway: 'All data must be accurate. Committee decisions are binding and final.',
    points: [
      'Participants must provide accurate, verified personal and college details during registration.',
      'Each participant can register with only one team.',
      'Each squad roster must have exactly 5 members.',
      'Selected problem statements and team rosters are locked permanently post-submission.',
      'Any urgent corrections must be escalated directly to an HPL Coordinator.',
      'Participants must adhere to all directives and guidelines issued by the HPL organizing committee throughout the league.'
    ]
  }
];

export const RulebookPage: React.FC<RulebookPageProps> = ({ onNavigate }) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('sec-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDocModalOpen, setIsDocModalOpen] = useState<boolean>(false);

  const filteredRules = OFFICIAL_RULES.filter(rule =>
    rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.points.some(pt => pt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeRule = OFFICIAL_RULES.find(r => r.id === selectedChapter) || OFFICIAL_RULES[0];

  const handleDownloadPdf = () => {
    // Directly download the official HPL-rulebook.pdf file instantly upon clicking
    const link = document.createElement('a');
    link.href = hplRulebookPdf;
    link.download = 'HPL_2026_Official_Rulebook_SMVITM.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1E1B4B] selection:bg-[#FBBF24] selection:text-[#1E1B4B]">
      
      {/* Halftone Dot Matrix Texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(30, 27, 75, 0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-10 space-y-8 sm:space-y-10 lg:space-y-12">
        
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 1. HERO SECTION: DISPLAY TITLE & HAND-DRAWN RETRO RULEBOOK ART       */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          {/* Left Column: Heading, Subheading & Action Buttons */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-xs font-mono font-bold text-[#582A9C] uppercase tracking-wider shadow-2xs">
              <SparkleDoodle className="w-4 h-4 text-[#F59E0B]" />
              <span>THE OFFICIAL HPL RULE BOOK</span>
              <SparkleDoodle className="w-4 h-4 text-[#F59E0B]" />
            </div>

            <div className="space-y-1 tracking-tight">
              <h1 className="font-display font-black italic text-4xl xs:text-5xl sm:text-6xl text-[#1E1B4B] leading-[0.92] uppercase block">
                KNOW THE RULES.
              </h1>
              <div className="font-display font-black italic text-4xl xs:text-5xl sm:text-6xl text-[#582A9C] leading-[0.92] uppercase block">
                PLAY THE LEAGUE.
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#1E1B4B]/80 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Read the rules carefully and play fair. Shri Madhwa Vadiraja Institute of Technology & Management (SMVITM).
              Let the best minds win.
            </p>

            {/* Action Buttons: Download Rule Book & Quick Summary */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={handleDownloadPdf}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#582A9C] hover:bg-purple-900 text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-sketch-sm hover:shadow-sketch hover:-translate-y-0.5 transition-all cursor-pointer select-none"
              >
                <FileDown className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>DOWNLOAD RULE BOOK (PDF)</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('rules-directory');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-amber-50 text-[#1E1B4B] border-2 border-[#1E1B4B] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-sketch-xs hover:shadow-sketch-sm transition-all cursor-pointer select-none"
              >
                <FileText className="w-4 h-4 text-[#EA580C]" />
                <span>QUICK SUMMARY</span>
              </button>
            </div>

            {/* Quick Metadata Pill */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-mono text-[#1E1B4B]/70">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#582A9C]" />
                Registration: 2 – 6 Sept 2026
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#EA580C]" />
                Shortlist: 8 Sept 2026
              </span>
            </div>

          </div>

          {/* Right Column: Master Comic Rulebook Hero Illustration */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <RulebookBookHero className="w-full max-w-md sm:max-w-lg" />
          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 2. HPL AT A GLANCE (QUICK STATS RIBBON)                               */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div className="bg-white/90 border-2 border-[#1E1B4B] rounded-2xl p-3.5 sm:p-6 shadow-sketch-sm">
          <div className="text-center font-display font-black text-xs sm:text-sm uppercase tracking-wider text-[#582A9C] mb-3 sm:mb-4">
            ✦ HPL AT A GLANCE ✦
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#1E1B4B]/15">
            <div className="pt-2 md:pt-0 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#582A9C] flex items-center justify-center mx-auto mb-1.5">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="font-display font-black text-base text-[#1E1B4B]">3 WEEKS</div>
              <div className="font-mono text-[10px] text-[#1E1B4B]/70 uppercase">League Duration</div>
            </div>

            <div className="pt-2 md:pt-0 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mx-auto mb-1.5">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="font-display font-black text-base text-[#1E1B4B]">3 PHASES</div>
              <div className="font-mono text-[10px] text-[#1E1B4B]/70 uppercase">Progressive Problem</div>
            </div>

            <div className="pt-2 md:pt-0 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F766E] flex items-center justify-center mx-auto mb-1.5">
                <Users className="w-4 h-4" />
              </div>
              <div className="font-display font-black text-base text-[#1E1B4B]">TEAM-BASED</div>
              <div className="font-mono text-[10px] text-[#1E1B4B]/70 uppercase">5 Members per Squad</div>
            </div>

            <div className="pt-2 md:pt-0 space-y-1">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-1.5">
                <Scale className="w-4 h-4" />
              </div>
              <div className="font-display font-black text-base text-[#1E1B4B]">HEAD-TO-HEAD</div>
              <div className="font-mono text-[10px] text-[#1E1B4B]/70 uppercase">Match Evaluations</div>
            </div>

            <div className="pt-2 md:pt-0 space-y-1 col-span-2 md:col-span-1">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center mx-auto mb-1.5">
                <TrophyBadge className="w-5 h-5 text-amber-500" />
              </div>
              <div className="font-display font-black text-base text-[#1E1B4B]">CHAMPIONSHIP</div>
              <div className="font-mono text-[10px] text-[#1E1B4B]/70 uppercase">Grand Finale</div>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 3. INTERACTIVE 15-CHAPTER DIRECTORY & VIEWER                          */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section id="rules-directory" className="space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                TABLE OF CONTENTS
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1E1B4B] uppercase tracking-tight">
                15 OFFICIAL CHAPTERS
              </h2>
            </div>

            {/* Search Input Filter */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#1E1B4B]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter rules (e.g. video, fee, AI, IEEE)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#1E1B4B] bg-white text-xs font-sans text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#582A9C] shadow-2xs"
              />
            </div>
          </div>

          {/* MOBILE VIEW (Screen < lg): Streamlined Clean Accordion where tapping directly expands each chapter with illustrations and specs */}
          <div className="block lg:hidden space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-500">
              <span className="font-bold uppercase text-[#582A9C]">Tap any chapter to expand & read</span>
              <span>{filteredRules.length} Chapters</span>
            </div>

            {filteredRules.map((rule) => {
              const isExpanded = selectedChapter === rule.id;
              const Icon = rule.icon;
              return (
                <div 
                  key={rule.id}
                  className={`bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'border-[#582A9C] shadow-sketch ring-2 ring-[#582A9C]/20' 
                      : 'border-[#1E1B4B]/20 shadow-2xs hover:border-[#582A9C]/50'
                  }`}
                >
                  {/* Chapter Accordion Trigger */}
                  <button
                    onClick={() => setSelectedChapter(isExpanded ? '' : rule.id)}
                    className={`w-full p-4 flex items-center justify-between text-left cursor-pointer transition-colors ${
                      isExpanded ? 'bg-purple-50/70 border-b border-[#582A9C]/20' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span className={`font-mono text-xs font-black px-2 py-1 rounded-lg flex-shrink-0 ${
                        isExpanded ? 'bg-[#582A9C] text-white' : 'bg-slate-100 text-[#582A9C]'
                      }`}>
                        {rule.num}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-display font-black text-sm uppercase text-[#1E1B4B] tracking-tight leading-snug">
                          {rule.title}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-500 block truncate font-medium">
                          {rule.category}
                        </span>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'bg-[#582A9C] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expanded Content Section */}
                  {isExpanded && (
                    <div className="p-4 sm:p-6 space-y-5 bg-white text-[#1E1B4B]">
                      
                      {/* Summary & Key Takeaway */}
                      <div className="space-y-3">
                        <p className="font-sans text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                          {rule.summary}
                        </p>
                        <div className="bg-amber-50 border-l-4 border-[#F59E0B] p-3.5 rounded-r-xl shadow-2xs">
                          <div className="font-mono text-xs uppercase font-bold text-amber-900 tracking-wider">
                            ★ Key Takeaway
                          </div>
                          <div className="font-sans text-sm font-bold text-amber-950 mt-1 leading-snug">
                            {rule.keyTakeaway}
                          </div>
                        </div>
                      </div>

                      {rule.id === 'sec-9' && (
                        <div className="p-4 bg-emerald-50/80 rounded-xl border-2 border-emerald-300 space-y-2 text-center">
                          <div className="font-display font-bold text-xs uppercase text-emerald-900">
                            Registration Fee (Shortlisted Teams Only)
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white p-3 rounded-lg border border-emerald-200">
                              <span className="text-[11px] font-mono text-slate-500 font-bold block">IEEE MEMBER</span>
                              <span className="font-display font-black text-2xl text-emerald-700">₹150</span>
                              <span className="text-[10px] text-slate-500 block">per squad</span>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-emerald-200">
                              <span className="text-[11px] font-mono text-slate-500 font-bold block">NON-IEEE</span>
                              <span className="font-display font-black text-2xl text-[#1E1B4B]">₹200</span>
                              <span className="text-[10px] text-slate-500 block">per squad</span>
                            </div>
                          </div>
                          <p className="text-xs text-emerald-800 italic font-medium">
                            Initial registration is 100% free. Fee collected only after shortlist.
                          </p>
                        </div>
                      )}

                      {rule.id === 'sec-12' && (
                        <div className="p-4 bg-purple-50/70 rounded-xl border border-purple-200 space-y-2">
                          <div className="font-display font-bold text-xs uppercase text-[#582A9C]">
                            Critical Milestone Dates
                          </div>
                          <div className="space-y-2 text-xs sm:text-sm font-sans">
                            <div className="flex items-center justify-between p-2.5 rounded bg-white border border-purple-100 font-medium">
                              <span className="font-bold text-[#1E1B4B]">2 Sept 2026</span>
                              <span className="font-mono text-[#582A9C] font-bold">Registration Opens</span>
                            </div>
                            <div className="flex items-center justify-between p-2.5 rounded bg-white border border-purple-100 font-medium">
                              <span className="font-bold text-[#1E1B4B]">6 Sept 2026</span>
                              <span className="font-mono text-rose-600 font-bold">Registration Closes</span>
                            </div>
                            <div className="flex items-center justify-between p-2.5 rounded bg-white border border-purple-100 font-medium">
                              <span className="font-bold text-[#1E1B4B]">8 Sept 2026</span>
                              <span className="font-mono text-emerald-600 font-bold">Shortlist Kickoff</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Official Rule Points with clear bullets and larger comfortable font */}
                      <div className="space-y-2.5 pt-1">
                        <div className="font-mono text-xs font-bold text-[#582A9C] uppercase tracking-wider">
                          Official Rules & Directives:
                        </div>
                        <ul className="space-y-3 pl-1 sm:pl-2">
                          {rule.points.map((point, pIdx) => {
                            const isImportantNotice = rule.id === 'sec-5' && pIdx === 0;
                            return (
                              <li 
                                key={pIdx} 
                                className={`flex items-start gap-2.5 text-sm sm:text-base font-sans leading-relaxed ${
                                  isImportantNotice 
                                    ? 'bg-rose-50 border-2 border-rose-300 rounded-xl p-3 text-rose-700 font-bold shadow-2xs' 
                                    : 'text-slate-800 font-medium'
                                }`}
                              >
                                {!isImportantNotice && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#582A9C] flex-shrink-0 mt-2" />
                                )}
                                {isImportantNotice && (
                                  <span className="text-rose-600 font-black text-base flex-shrink-0">⚠️</span>
                                )}
                                <span>{point}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* DESKTOP VIEW (Screen >= lg): Master 2-Column Sidebar + Reader View */}
          <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
            
            {/* Left Column: 15-Chapter Sidebar Navigation */}
            <div className="col-span-4 bg-white rounded-2xl border-2 border-[#1E1B4B] p-3 sm:p-4 shadow-sketch-sm max-h-[640px] overflow-y-auto space-y-1.5 divide-y divide-[#1E1B4B]/10">
              <div className="px-3 py-1 text-[11px] font-mono font-bold text-[#582A9C] uppercase tracking-wider">
                Select Chapter to Read
              </div>
              <div className="pt-2 space-y-1">
                {filteredRules.map((rule) => {
                  const isSelected = selectedChapter === rule.id;
                  const Icon = rule.icon;
                  return (
                    <button
                      key={rule.id}
                      onClick={() => setSelectedChapter(rule.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#582A9C] text-white shadow-2xs'
                          : 'hover:bg-purple-50 text-[#1E1B4B]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`font-mono text-xs font-black px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#582A9C]'
                        }`}>
                          {rule.num}
                        </span>
                        <div className="truncate">
                          <span className="font-display font-bold text-xs uppercase block truncate">
                            {rule.title}
                          </span>
                          <span className={`text-[10px] font-sans block truncate ${
                            isSelected ? 'text-purple-200' : 'text-[#1E1B4B]/60'
                          }`}>
                            {rule.category}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-[#1E1B4B]/30'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Detailed Chapter Reader Card */}
            <div className="col-span-8 bg-white rounded-2xl border-2 border-[#1E1B4B] p-6 sm:p-8 shadow-sketch space-y-6">
              
              {/* Chapter Header */}
              <div className="border-b-2 border-[#1E1B4B]/10 pb-5 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-[#582A9C] font-mono text-xs font-bold uppercase">
                    Chapter {activeRule.num} • {activeRule.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    HPL 2026 OFFICIAL
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1E1B4B] uppercase leading-tight">
                  {activeRule.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#1E1B4B]/80 font-medium">
                  {activeRule.summary}
                </p>
              </div>

              {/* Key Takeaway Callout Card */}
              <div className="bg-amber-50/70 border-2 border-amber-300 rounded-xl p-4 flex items-start gap-3 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center flex-shrink-0 font-bold">
                  ★
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase font-bold text-amber-900 tracking-wider">
                    Core Rule Highlight
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-bold text-amber-950 mt-0.5">
                    {activeRule.keyTakeaway}
                  </div>
                </div>
              </div>

              {/* Specific Visual Enhancements For Certain Chapters */}
              {activeRule.id === 'sec-3' && (
                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
                  <div className="font-display font-bold text-xs uppercase tracking-wider text-blue-900">
                    Squad Composition Model
                  </div>
                  <div className="text-xs sm:text-sm font-sans text-blue-950 font-semibold">
                    1 Squad Leader + 4 Squad Specialists = <strong className="text-[#582A9C]">Exactly 5 Builders (Strict Requirement)</strong>
                  </div>
                </div>
              )}

              {activeRule.id === 'sec-9' && (
                <div className="p-4 bg-emerald-50/70 rounded-xl border-2 border-emerald-300 space-y-3">
                  <div className="font-display font-bold text-xs uppercase tracking-wider text-emerald-900">
                    Shortlisted Team Fee Structure
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-emerald-200 text-center">
                      <span className="font-mono text-[11px] font-bold text-slate-500 uppercase block">At Least 1 IEEE Member</span>
                      <span className="font-display font-black text-2xl text-emerald-700">₹150</span>
                      <span className="text-[10px] font-sans text-slate-500 block">per team total</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-emerald-200 text-center">
                      <span className="font-mono text-[11px] font-bold text-slate-500 uppercase block">No IEEE Member</span>
                      <span className="font-display font-black text-2xl text-[#1E1B4B]">₹200</span>
                      <span className="text-[10px] font-sans text-slate-500 block">per team total</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-sans text-emerald-900/80 italic text-center">
                    Note: Zero fee at initial registration. The fee applies only to teams shortlisted on 8 September 2026.
                  </p>
                </div>
              )}

              {activeRule.id === 'sec-12' && (
                <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 space-y-2">
                  <div className="font-display font-bold text-xs uppercase tracking-wider text-[#582A9C]">
                    Key Milestone Calendar
                  </div>
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex items-center justify-between p-2 rounded bg-white border border-purple-100">
                      <span className="font-bold text-[#1E1B4B]">2 September 2026</span>
                      <span className="font-mono text-[#582A9C] font-bold">Registration Opens</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white border border-purple-100">
                      <span className="font-bold text-[#1E1B4B]">6 September 2026 (11:59 PM)</span>
                      <span className="font-mono text-rose-600 font-bold">Registration Closes</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white border border-purple-100">
                      <span className="font-bold text-[#1E1B4B]">8 September 2026</span>
                      <span className="font-mono text-emerald-600 font-bold">Shortlist & Inauguration</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Point-by-Point Official Rules Breakdown */}
              <div className="space-y-4">
                <div className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-[#582A9C]">
                  Official Specifications & Directives
                </div>

                <div className="bg-[#FAF6EE] p-6 sm:p-8 rounded-2xl border-2 border-[#1E1B4B]/15 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3 border-b border-[#1E1B4B]/10 pb-3">
                    <span className="w-10 h-10 rounded-full bg-[#582A9C] text-white font-display font-black text-base flex items-center justify-center flex-shrink-0 shadow-sm">
                      {activeRule.num}
                    </span>
                    <div>
                      <h4 className="font-display font-black text-lg sm:text-xl text-[#1E1B4B] uppercase tracking-tight">
                        {activeRule.title}
                      </h4>
                      <span className="font-mono text-xs text-slate-500 font-semibold">
                        Chapter {activeRule.num} • {activeRule.category}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points with larger, comfortable, clear typography */}
                  <ul className="space-y-3.5 pl-2 sm:pl-4">
                    {activeRule.points.map((pt, idx) => {
                      const isImportantNotice = activeRule.id === 'sec-5' && idx === 0;
                      return (
                        <li 
                          key={idx} 
                          className={`flex items-start gap-3 text-sm sm:text-base font-sans leading-relaxed ${
                            isImportantNotice 
                              ? 'bg-rose-50 border-2 border-rose-300 rounded-xl p-3.5 text-rose-700 font-bold shadow-2xs' 
                              : 'text-[#1E1B4B] font-medium'
                          }`}
                        >
                          {!isImportantNotice && (
                            <span className="w-2 h-2 rounded-full bg-[#582A9C] flex-shrink-0 mt-2" />
                          )}
                          {isImportantNotice && (
                            <span className="text-rose-600 font-black text-lg flex-shrink-0">⚠️</span>
                          )}
                          <span>{pt}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Bottom Quick Navigator Between Chapters */}
              <div className="pt-4 border-t border-[#1E1B4B]/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    const currentIndex = OFFICIAL_RULES.findIndex(r => r.id === activeRule.id);
                    if (currentIndex > 0) {
                      setSelectedChapter(OFFICIAL_RULES[currentIndex - 1].id);
                    }
                  }}
                  disabled={activeRule.id === 'sec-1'}
                  className="px-4 py-2 rounded-lg border border-[#1E1B4B]/20 font-mono text-xs font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                >
                  ← Previous
                </button>

                <span className="font-mono text-xs text-slate-500">
                  {activeRule.num} of 15
                </span>

                <button
                  onClick={() => {
                    const currentIndex = OFFICIAL_RULES.findIndex(r => r.id === activeRule.id);
                    if (currentIndex < OFFICIAL_RULES.length - 1) {
                      setSelectedChapter(OFFICIAL_RULES[currentIndex + 1].id);
                    }
                  }}
                  disabled={activeRule.id === 'sec-15'}
                  className="px-4 py-2 rounded-lg bg-[#582A9C] text-white font-mono text-xs font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-900 cursor-pointer"
                >
                  Next →
                </button>
              </div>

            </div>

          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 4. ZERO TOLERANCE FAIR PLAY BANNER                                    */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 sm:p-8 space-y-3 shadow-sketch">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-7 h-7 text-rose-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-black font-display uppercase text-rose-950">
                FAIR PLAY & ZERO TOLERANCE FOR PLAGIARISM
              </h3>
              <span className="font-mono text-xs text-rose-800 font-bold uppercase">
                Section 11 • Hackathon Premier League
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-sans font-medium">
            All code repositories and demos are subjected to automated AST similarity and plagiarism scans.
            Misconduct, sabotage, harassment, or copying commercial projects will result in immediate disqualification.
            The decision of the SMVITM HPL Organizing Committee is final.
          </p>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 5. READY TO ENTER THE LEAGUE? (BOTTOM CTA BANNER)                    */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="rounded-[24px] sm:rounded-[28px] bg-[#311059] border-2 border-[#1E1B4B] p-6 sm:p-8 shadow-sketch relative overflow-hidden text-white">
          <div 
            className="absolute inset-0 pointer-events-none opacity-30 -z-0"
            style={{
              background: 'radial-gradient(circle at 85% 50%, rgba(245, 158, 11, 0.35) 0%, transparent 60%)'
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            
            <div className="flex-1 text-center md:text-left space-y-1.5">
              <h2 className="font-display font-black italic text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight">
                READY TO ENTER THE LEAGUE?
              </h2>
              <p className="font-sans text-xs sm:text-sm text-purple-200 font-medium">
                Read the rules. Build your squad of 5. Play fair. Rise through the standings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <button
                onClick={() => onNavigate('register')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-[#FBBF24] hover:bg-amber-400 text-[#1E1B4B] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-sketch-sm hover:shadow-sketch transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                <span>REGISTER YOUR SQUAD</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('timeline')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-display font-black text-xs uppercase tracking-wider border border-white/30 transition-colors cursor-pointer select-none text-center"
              >
                VIEW TIMELINE
              </button>
            </div>

          </div>
        </section>

      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 6. DOWNLOADABLE / PRINTABLE DOCUMENT MODAL                           */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-[#1E1B4B]/80 backdrop-blur-sm p-4 overflow-y-auto flex items-center justify-center">
          <div className="bg-[#FAF6EE] border-3 border-[#1E1B4B] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-sketch-xl p-6 sm:p-8 space-y-6 text-[#1E1B4B]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b-2 border-[#1E1B4B]/15 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#582A9C] uppercase tracking-wider">
                  OFFICIAL TOURNAMENT DIRECTIVE
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] uppercase">
                  HPL 2026 OFFICIAL RULEBOOK (DOCUMENT)
                </h3>
                <p className="font-sans text-xs text-[#1E1B4B]/70">
                  Shri Madhwa Vadiraja Institute of Technology & Management (SMVITM)
                </p>
              </div>
              <button
                onClick={() => setIsDocModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Content View */}
            <div className="bg-white p-6 rounded-xl border border-slate-300 font-sans text-xs sm:text-sm space-y-6 shadow-inner text-slate-800 leading-relaxed">
              <div className="text-center border-b pb-4 space-y-1">
                <h2 className="font-display font-black text-xl text-[#1E1B4B]">HACKATHON PREMIER LEAGUE 2026</h2>
                <h3 className="font-mono text-xs font-bold text-[#582A9C]">OFFICIAL RULEBOOK & TOURNAMENT GUIDELINES</h3>
                <p className="text-[11px] text-slate-500">
                  Shri Madhwa Vadiraja Institute of Technology and Management, Bantakal
                </p>
                <p className="text-[11px] font-mono text-amber-800">
                  Registration: 2 – 6 September 2026 • Shortlist Announcement: 8 September 2026
                </p>
              </div>

              {OFFICIAL_RULES.map((ch) => (
                <div key={ch.id} className="space-y-1.5">
                  <h4 className="font-display font-black text-sm text-[#1E1B4B] uppercase">
                    {ch.num}. {ch.title}
                  </h4>
                  <ul className="pl-5 space-y-1 text-slate-700">
                    {ch.points.map((pt, pIdx) => {
                      const isImportantNotice = ch.id === 'sec-5' && pIdx === 0;
                      return (
                        <li 
                          key={pIdx}
                          className={isImportantNotice ? 'text-rose-600 font-bold bg-rose-50 p-2 rounded border border-rose-200 list-none -ml-4 mb-2' : 'list-disc'}
                        >
                          {isImportantNotice ? '⚠️ ' : ''}{pt}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Modal Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="font-mono text-xs text-slate-500">
                Print or Save as PDF directly to keep an offline copy.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDownloadPdf}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#582A9C] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer hover:bg-purple-900 transition-colors"
                >
                  <FileDown className="w-4 h-4 text-amber-300" />
                  <span>DOWNLOAD PDF NOW</span>
                </button>
                <button
                  onClick={() => setIsDocModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-display font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-slate-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default RulebookPage;
