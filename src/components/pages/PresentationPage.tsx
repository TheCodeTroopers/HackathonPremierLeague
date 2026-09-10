import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PageRoute } from '../../types';
import { HPL_IMAGES } from '../../assets/images';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  Printer, 
  Download,
  Trophy, 
  Calendar, 
  Clock, 
  Shield, 
  Award, 
  Code2, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Video, 
  Layers, 
  Zap, 
  ArrowLeft,
  Grid,
  Play,
  Check,
  ExternalLink
} from 'lucide-react';

interface PresentationPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PresentationPage: React.FC<PresentationPageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showOverview, setShowOverview] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = 12;

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setCurrentSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setCurrentSlide(totalSlides - 1);
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'o' || e.key === 'O') {
      e.preventDefault();
      setShowOverview(prev => !prev);
    } else if (e.key === 'Escape') {
      if (showOverview) setShowOverview(false);
    }
  }, [showOverview, totalSlides]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Autoplay timer
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 8000);
    return () => clearInterval(interval);
  }, [autoPlay, totalSlides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error('Fullscreen request failed', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => {
        console.error('Exit fullscreen failed', err);
      });
      setIsFullscreen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  /**
   * Client-Side Dynamic .PPTX Generator using PptxGenJS
   * Builds and triggers an immediate download of the complete 12-slide PowerPoint presentation
   */
  const handleDownloadPptx = async () => {
    try {
      setIsDownloading(true);

      // Dynamically load PptxGenJS bundle if not present
      let PptxGenClass = (window as any).PptxGenJS;
      if (!PptxGenClass) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js';
          script.onload = () => resolve(true);
          script.onerror = reject;
          document.head.appendChild(script);
        });
        PptxGenClass = (window as any).PptxGenJS;
      }

      const pptx = new PptxGenClass();
      pptx.layout = 'LAYOUT_16x9';
      pptx.author = 'SMVITM & Code Troopers';
      pptx.company = 'Hackathon Premier League';
      pptx.title = 'HPL 2026 Official Round 2 Presentation Deck';

      const bgPaper = { color: 'FAF6EE' };
      const navyInk = '1E1B4B';
      const amberGold = 'F59E0B';
      const royalBlue = '2563EB';
      const emeraldGreen = '059669';
      const purpleViolet = '7C3AED';
      const vividOrange = 'EA580C';

      // Slide 1: Title
      const s1 = pptx.addSlide();
      s1.background = bgPaper;
      s1.addText('HACKATHON PREMIER LEAGUE 2026', { x: 0.8, y: 1.8, w: 11.7, fontSize: 36, bold: true, color: navyInk, fontFace: 'Arial Black' });
      s1.addText('“CODE TODAY. IMPACT TOMORROW.”', { x: 0.8, y: 2.7, w: 11.7, fontSize: 22, bold: true, color: amberGold });
      s1.addText('Organized by Shri Madhwa Vadiraja Institute of Technology and Management (SMVITM), Bantakal\nIn Association with Code Troopers • ISTE • IEEE • Aikya • Ignite', { x: 0.8, y: 3.8, w: 11.7, fontSize: 13, color: '4B5563' });
      s1.addText('🏆 ₹30,000+ Prize Pool    •    ⚡ 4 Stakeholder Problem Statements    •    🔥 3-Week Progressive Championship', { x: 0.8, y: 5.2, w: 11.7, fontSize: 13, bold: true, color: navyInk });

      // Slide 2: About HPL
      const s2 = pptx.addSlide();
      s2.background = bgPaper;
      s2.addText('ABOUT HACKATHON PREMIER LEAGUE', { x: 0.8, y: 0.6, w: 11.7, fontSize: 24, bold: true, color: navyInk });
      s2.addText('A 3-week progressive collegiate engineering championship solving real-world challenges.', { x: 0.8, y: 1.2, w: 11.7, fontSize: 13, color: '6B7280' });
      
      s2.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 2.0, w: 3.6, h: 3.6, fill: { color: 'FFFFFF' }, line: { color: navyInk, width: 2 } });
      s2.addText('01. REAL STAKEHOLDERS', { x: 1.0, y: 2.2, w: 3.2, fontSize: 14, bold: true, color: amberGold });
      s2.addText('Problems sourced directly from Shirva Police, SDM Ayurveda Hospital, SMVITM Transit, and Art of Living (IAHV). Zero toy datasets.', { x: 1.0, y: 2.8, w: 3.2, fontSize: 11, color: navyInk });

      s2.addShape(pptx.shapes.RECTANGLE, { x: 4.8, y: 2.0, w: 3.6, h: 3.6, fill: { color: 'FFFFFF' }, line: { color: navyInk, width: 2 } });
      s2.addText('02. 3-STAGE LEAGUE', { x: 5.0, y: 2.2, w: 3.2, fontSize: 14, bold: true, color: royalBlue });
      s2.addText('Video pitch screening → Rapid prototyping sprint with mentor grilling → Head-to-head auditorium playoffs.', { x: 5.0, y: 2.8, w: 3.2, fontSize: 11, color: navyInk });

      s2.addShape(pptx.shapes.RECTANGLE, { x: 8.8, y: 2.0, w: 3.6, h: 3.6, fill: { color: 'FFFFFF' }, line: { color: navyInk, width: 2 } });
      s2.addText('03. DEEP MENTORSHIP', { x: 9.0, y: 2.2, w: 3.2, fontSize: 14, bold: true, color: emeraldGreen });
      s2.addText('Alumni and industry software architects provide direct code reviews, architecture guidance, and pitch rehearsals.', { x: 9.0, y: 2.8, w: 3.2, fontSize: 11, color: navyInk });

      // Slide 3: Timeline (Highlighting Sept 12)
      const s3 = pptx.addSlide();
      s3.background = bgPaper;
      s3.addText('ROUND 2 SPRINT TIMELINE', { x: 0.8, y: 0.6, w: 11.7, fontSize: 24, bold: true, color: navyInk });
      s3.addText('CRITICAL: First Presentation kicks off Saturday, 12th September at 5:30 PM!', { x: 0.8, y: 1.2, w: 11.7, fontSize: 13, bold: true, color: 'DC2626' });
      
      s3.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 2.0, w: 2.6, h: 4.0, fill: { color: 'FFFFFF' }, line: { color: navyInk, width: 2 } });
      s3.addText('08 SEP\nShortlist & Briefing\n\nSeason opening ceremony and release of qualified squads into Round 2 Arena.', { x: 1.0, y: 2.2, w: 2.2, fontSize: 11, color: navyInk });

      s3.addShape(pptx.shapes.RECTANGLE, { x: 3.7, y: 1.8, w: 2.8, h: 4.4, fill: { color: 'EFF6FF' }, line: { color: royalBlue, width: 3 } });
      s3.addText('⭐ 12 SEP (5:30 PM)\nPart 1: Evaluation 1\n(First Presentation)\n\nDeliverable video submission + 24hr panel review + live team Q&A and code walkthrough.\n\nMandatory attendance for all 5 squad members.', { x: 3.9, y: 2.0, w: 2.4, fontSize: 11, bold: true, color: royalBlue });

      s3.addShape(pptx.shapes.RECTANGLE, { x: 6.8, y: 2.0, w: 2.6, h: 4.0, fill: { color: 'FFFFFF' }, line: { color: navyInk, width: 2 } });
      s3.addText('16 - 23 SEP\nPart 2 Mid-Sprint\n\nDatabase and API evaluation, feature completion checks, prototype stress tests.', { x: 7.0, y: 2.2, w: 2.2, fontSize: 11, color: navyInk });

      s3.addShape(pptx.shapes.RECTANGLE, { x: 9.7, y: 2.0, w: 2.6, h: 4.0, fill: { color: 'FFFFFF' }, line: { color: navyInk, width: 2 } });
      s3.addText('26 & 28 SEP\nPlayoffs & Finale\n\nSemi-final fixtures and live On-Stage Auditorium Grand Finale at SMVITM.\n₹30,000+ awarded!', { x: 9.9, y: 2.2, w: 2.2, fontSize: 11, color: navyInk });

      // Slide 4: PS 01 AyurEssence
      const s4 = pptx.addSlide();
      s4.background = bgPaper;
      s4.addText('PS 01: AYURESSENCE', { x: 0.8, y: 0.6, w: 8.5, fontSize: 24, bold: true, color: purpleViolet });
      s4.addText('SPONSOR: SDM COLLEGE OF AYURVEDA, UDUPI', { x: 0.8, y: 1.2, w: 8.5, fontSize: 12, bold: true, color: '4B5563' });
      s4.addText('Problem Context: Prakriti assessment (Vata, Pitta, Kapha) relies on extensive subjective observations and paper questionnaires. AyurEssence standardizes this through an intelligent digital decision-support tool for practitioners and students.', { x: 0.8, y: 1.6, w: 11.7, fontSize: 11, color: navyInk });
      
      const ps1Bullets = [
        '1. Classical Questionnaire Engine: Standardized questions covering anatomy, physiology, metabolism, and habits.',
        '2. Clinical Practitioner Observations: Physician module capturing Nadi (pulse), tongue, skin, and ocular traits.',
        '3. Quantitative Dosha Breakdown: Algorithmic model outputting normalized % breakdown with dominant classification.',
        '4. Evidence-Referenced Reports: Exports clinical PDF with citations to classical texts (Charaka & Sushruta Samhita).'
      ];
      s4.addText(ps1Bullets.join('\n\n'), { x: 0.8, y: 2.8, w: 11.7, fontSize: 12, color: navyInk });

      // Slide 5: PS 02 SMARTBUS
      const s5 = pptx.addSlide();
      s5.background = bgPaper;
      s5.addText('PS 02: SMARTBUS', { x: 0.8, y: 0.6, w: 8.5, fontSize: 24, bold: true, color: emeraldGreen });
      s5.addText('SPONSOR: SMVITM BANTAKAL (TRANSPORT DEPT)', { x: 0.8, y: 1.2, w: 8.5, fontSize: 12, bold: true, color: '4B5563' });
      s5.addText('Problem Context: Students and parents endure prolonged uncertainty regarding bus arrival times during peak hours. Eliminates expensive dedicated GPS hardware by turning the driver\'s smartphone into the live tracking beacon.', { x: 0.8, y: 1.6, w: 11.7, fontSize: 11, color: navyInk });
      
      const ps2Bullets = [
        '1. Driver Smartphone GPS Beacon: 1-tap route trip activation streaming encrypted lightweight telemetry to server.',
        '2. Multi-Tier Geofencing: Automated proximity alerts to waiting students at 1 km, 500 m, and 200 m milestones.',
        '3. Dynamic Route-Aware ETA Engine: Real-time calculation adjusting for halts, traffic, and coastal speed variations.',
        '4. College Administration Hub: Command dashboard to monitor active fleet, driver telemetry, and delay logs.'
      ];
      s5.addText(ps2Bullets.join('\n\n'), { x: 0.8, y: 2.8, w: 11.7, fontSize: 12, color: navyInk });

      // Slide 6: PS 03 Sahayak
      const s6 = pptx.addSlide();
      s6.background = bgPaper;
      s6.addText('PS 03: SAHAYAK (ಸಹಾಯಕ)', { x: 0.8, y: 0.6, w: 8.5, fontSize: 24, bold: true, color: royalBlue });
      s6.addText('SPONSOR: SHIRVA POLICE STATION', { x: 0.8, y: 1.2, w: 8.5, fontSize: 12, bold: true, color: '4B5563' });
      s6.addText('Problem Context: Senior citizens in Shirva face severe mobility barriers. Emergency 112 is not designed for routine daily needs (medicine pickup, auto-rickshaw rides). Sahayak bridges this gap safely with police-vetted volunteers.', { x: 0.8, y: 1.6, w: 11.7, fontSize: 11, color: navyInk });
      
      const ps3Bullets = [
        '1. Voice-First Access: Phone calls and simple IVR channel with zero app-learning curve for senior citizens.',
        '2. Shirva Police Verification Workflow: Multi-step KYC and police admin review portal to vet all volunteer recruits.',
        '3. Proximity Dispatch Engine: Smart matchmaking by proximity, availability, language, and nature of assistance.',
        '4. Emergency Escalation: AI distress detection automatically routes emergencies directly to 112 / Police desk.'
      ];
      s6.addText(ps3Bullets.join('\n\n'), { x: 0.8, y: 2.8, w: 11.7, fontSize: 12, color: navyInk });

      // Slide 7: PS 04 SWMS
      const s7 = pptx.addSlide();
      s7.background = bgPaper;
      s7.addText('PS 04: SWMS (SMART WASTE SIMULATOR)', { x: 0.8, y: 0.6, w: 8.5, fontSize: 24, bold: true, color: vividOrange });
      s7.addText('SPONSOR: IAHV (ART OF LIVING)', { x: 0.8, y: 1.2, w: 8.5, fontSize: 12, bold: true, color: '4B5563' });
      s7.addText('Problem Context: Solid waste planning for growing towns and coastal cities fails because static planning neglects multi-decade demographic growth and extreme monsoon weather. SWMS models decisions across a 20-year horizon.', { x: 0.8, y: 1.6, w: 11.7, fontSize: 11, color: navyInk });
      
      const ps4Bullets = [
        '1. 7-Parameter Habitation Model: Demography, Infrastructure, Industries, Resources, Terrain, Economy, and Culture.',
        '2. 20-Year Forecasting Engine: Simulates long-range waste volumes, treatment capacity, and landfill life exhaustion.',
        '3. Monsoon & Disaster Stress Testing: Simulates scenario impacts during heavy rainfall, coastal floods, and road halts.',
        '4. Conversational AI Querying: Enables planners to ask natural questions like "What if composting increases 30%?"'
      ];
      s7.addText(ps4Bullets.join('\n\n'), { x: 0.8, y: 2.8, w: 11.7, fontSize: 12, color: navyInk });

      // Slide 8: Rules & Regulations
      const s8 = pptx.addSlide();
      s8.background = bgPaper;
      s8.addText('RULES & SQUAD REGULATIONS', { x: 0.8, y: 0.6, w: 11.7, fontSize: 24, bold: true, color: navyInk });
      const rules = [
        '01. Strict Squad Size: Exactly 5 registered members per squad. No additions or changes permitted.',
        '02. Mandatory Live Attendance: All 5 members must be present for live panel reviews and Q&A.',
        '03. Original Codebase: Solution logic must be built during HPL. Open-source libraries permitted with attribution.',
        '04. Punctual Submissions: Video demo, repo access, and deployment link submitted before deadline.',
        '05. Runnable Prototype: Evaluators require a runnable software prototype, not just Figma mockups.',
        '06. Zero Tolerance: Plagiarism or submitting pre-built projects results in immediate disqualification.'
      ];
      s8.addText(rules.join('\n\n'), { x: 0.8, y: 1.6, w: 11.7, fontSize: 12, color: navyInk });

      // Slide 9: Evaluation Pillars (25% x 4)
      const s9 = pptx.addSlide();
      s9.background = bgPaper;
      s9.addText('EVALUATION CRITERIA (4 PILLARS @ 25% EACH)', { x: 0.8, y: 0.6, w: 11.7, fontSize: 24, bold: true, color: navyInk });
      
      s9.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 2.7, h: 4.2, fill: { color: 'EFF6FF' }, line: { color: royalBlue, width: 2 } });
      s9.addText('PROBLEM UNDERSTANDING (25%)\n\n• Pain point accuracy\n• Domain research depth\n• Sponsor scope coverage\n• Edge case handling', { x: 1.0, y: 2.0, w: 2.3, fontSize: 11, color: navyInk });

      s9.addShape(pptx.shapes.RECTANGLE, { x: 3.8, y: 1.8, w: 2.7, h: 4.2, fill: { color: 'ECFDF5' }, line: { color: emeraldGreen, width: 2 } });
      s9.addText('ARCHITECTURE & CODE (25%)\n\n• Clean modular code\n• Scalable DB schema\n• API design & latency\n• Security & error handling', { x: 4.0, y: 2.0, w: 2.3, fontSize: 11, color: navyInk });

      s9.addShape(pptx.shapes.RECTANGLE, { x: 6.8, y: 1.8, w: 2.7, h: 4.2, fill: { color: 'F5F3FF' }, line: { color: purpleViolet, width: 2 } });
      s9.addText('INNOVATION & UX (25%)\n\n• Creative technology\n• Delightful user interface\n• Accessibility for all\n• Real-world deployability', { x: 7.0, y: 2.0, w: 2.3, fontSize: 11, color: navyInk });

      s9.addShape(pptx.shapes.RECTANGLE, { x: 9.8, y: 1.8, w: 2.7, h: 4.2, fill: { color: 'FFFBEB' }, line: { color: amberGold, width: 2 } });
      s9.addText('PRESENTATION & Q&A (25%)\n\n• Live demo clarity\n• Pitch time management\n• Technical defense depth\n• Team coordination', { x: 10.0, y: 2.0, w: 2.3, fontSize: 11, color: navyInk });

      // Slide 10: Organizers
      const s10 = pptx.addSlide();
      s10.background = bgPaper;
      s10.addText('ORGANIZING BODIES & PARTNERS', { x: 0.8, y: 0.6, w: 11.7, fontSize: 24, bold: true, color: navyInk });
      const orgs = [
        '• SMVITM Bantakal — Host Institution & Academic Authority',
        '• Code Troopers — Technical Engine, Platform Architecture & Mentorship',
        '• ISTE SMVITM Student Chapter — Event Coordination & Outreach',
        '• IEEE Student Branch — Technical Standards & Innovation Review',
        '• Aikya Club — Social Responsibility & Community Engagement',
        '• Ignite — Innovation & Incubation Partner'
      ];
      s10.addText(orgs.join('\n\n'), { x: 0.8, y: 1.8, w: 11.7, fontSize: 13, color: navyInk });

      // Slide 11: Sponsors
      const s11 = pptx.addSlide();
      s11.background = bgPaper;
      s11.addText('OFFICIAL PROBLEM STATEMENT SPONSORS', { x: 0.8, y: 0.6, w: 11.7, fontSize: 24, bold: true, color: navyInk });
      const sponsors = [
        '• SDM College of Ayurveda, Udupi (PS 01: AyurEssence) — Traditional Science & Digital Health',
        '• SMVITM Bantakal Transport Dept (PS 02: SMARTBUS) — Campus Transit & Geofencing',
        '• Shirva Police Station (PS 03: Sahayak) — Community Safety & Senior Citizen Welfare',
        '• IAHV Art of Living (PS 04: SWMS) — Ecological Sustainability & 20-Year Waste Modeling'
      ];
      s11.addText(sponsors.join('\n\n'), { x: 0.8, y: 1.8, w: 11.7, fontSize: 13, color: navyInk });

      // Slide 12: Grand Finale
      const s12 = pptx.addSlide();
      s12.background = bgPaper;
      s12.addText('STEP INTO THE ARENA — HPL 2026', { x: 0.8, y: 1.5, w: 11.7, fontSize: 32, bold: true, color: navyInk });
      s12.addText('“CODE TODAY. IMPACT TOMORROW.”', { x: 0.8, y: 2.4, w: 11.7, fontSize: 22, bold: true, color: amberGold });
      s12.addText('NEXT IMMEDIATE CHECKPOINT:\nSaturday, 12th September @ 5:30 PM\nPart 1 Evaluation 1: Deliverable Video & Code Walkthrough Presentation\n\n₹30,000+ Prize Pool  •  Championship Trophy  •  Incubation Pilots', { x: 0.8, y: 3.4, w: 11.7, fontSize: 14, color: navyInk });

      await pptx.writeFile({ fileName: 'HPL_2026_Round2_Official_Presentation.pptx' });
      setIsDownloading(false);
    } catch (err) {
      console.error('PPTX generation error:', err);
      setIsDownloading(false);
      alert('Could not download PPTX automatically. You can also print/save as PDF using the Print button.');
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#FAF6EE] text-[#1E1B4B] flex flex-col justify-between select-none overflow-hidden font-sans print:bg-white print:text-black"
      style={{
        backgroundImage: `radial-gradient(circle at 15% 15%, rgba(245, 158, 11, 0.08) 0%, transparent 40%), radial-gradient(circle at 85% 85%, rgba(37, 99, 235, 0.06) 0%, transparent 40%)`
      }}
    >
      {/* ── TOP NAV / CONTROL BAR ── */}
      <header className="relative z-50 flex items-center justify-between px-6 py-3 border-b-2 border-[#1E1B4B] bg-[#1E1B4B] text-white shadow-md print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('problem-statements')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to HPL
          </button>
          
          <div className="flex items-center gap-2 border-l border-white/20 pl-4">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="font-extrabold tracking-widest text-xs text-amber-300 uppercase font-mono">
              HPL 2026 OFFICIAL DECK
            </span>
          </div>
        </div>

        {/* Slide Counter & Progress */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-black text-[#1E1B4B] bg-amber-400 px-3 py-1 rounded-full border border-amber-500 shadow-[1.5px_1.5px_0px_#000]">
            SLIDE {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
          <div className="hidden md:flex w-32 h-2.5 bg-white/20 rounded-full overflow-hidden border border-white/30">
            <div 
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            />
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Open Official Canva Presentation Deck */}
          <a
            href="https://canva.link/i3lsg9k7n9mg4k5"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Official Canva Presentation Deck"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#1E1B4B] font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open PPT Deck</span>
          </a>

          <button
            onClick={() => setShowOverview(prev => !prev)}
            title="Slide Overview (Press O)"
            className={`p-2 rounded-lg transition-all ${showOverview ? 'bg-amber-400 text-[#1E1B4B]' : 'bg-white/10 hover:bg-white/20 text-white/90'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          
          <button
            onClick={handlePrint}
            title="Print / Save as PDF (Ctrl+P)"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 transition-all"
          >
            <Printer className="w-4 h-4" />
          </button>
          
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen (Press F)"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 transition-all"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── OVERVIEW GRID MODAL (PRESS 'O') ── */}
      {showOverview && (
        <div className="absolute inset-0 z-50 bg-[#1E1B4B]/95 backdrop-blur-md p-8 overflow-y-auto text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-black text-amber-400 tracking-wider uppercase font-display">
                  Slide Navigator — 12 Slides
                </h2>
                <p className="text-xs text-white/70 font-mono">Click any card to navigate immediately</p>
              </div>
              <button
                onClick={() => setShowOverview(false)}
                className="px-4 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-xs uppercase"
              >
                Close (ESC)
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                '01. Title & Arena',
                '02. About HPL 2026',
                '03. Round 2 Schedule & 12th Sept',
                '04. PS 01: AyurEssence (SDM)',
                '05. PS 02: SMARTBUS (SMVITM)',
                '06. PS 03: Sahayak (Shirva Police)',
                '07. PS 04: SWMS (IAHV)',
                '08. Rules & Regulations',
                '09. Evaluation Pillars (25% x 4)',
                '10. Organizing Bodies',
                '11. Problem Sponsors',
                '12. Grand Finale & Awards'
              ].map((label, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentSlide(idx);
                    setShowOverview(false);
                  }}
                  className={`p-4 rounded-xl cursor-pointer border-2 transition-all transform hover:scale-102 ${
                    currentSlide === idx 
                      ? 'border-amber-400 bg-amber-500/30 shadow-[4px_4px_0px_#000]' 
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <span className="text-xs font-mono font-black text-amber-400">SLIDE {String(idx + 1).padStart(2, '0')}</span>
                  <p className="mt-1 font-bold text-sm text-white line-clamp-2">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN STAGE: SLIDE DISPLAY (WARM PAPER RETRO COMIC THEME) ── */}
      <main className="flex-1 flex items-center justify-center p-3 md:p-6 relative z-20">
        <div className="w-full max-w-6xl aspect-[16/9] min-h-[580px] bg-white rounded-2xl border-3 border-[#1E1B4B] shadow-[8px_8px_0px_#1E1B4B] flex flex-col overflow-hidden relative print:border-none print:shadow-none print:aspect-auto print:min-h-0">
          
          {/* Subtle Halftone Pattern Watermark */}
          <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none text-right z-0">
            <span className="text-7xl font-black tracking-tighter text-[#1E1B4B] font-display">HPL</span>
            <p className="text-xs tracking-widest uppercase text-[#1E1B4B] font-mono">2026 SEASON</p>
          </div>

          {/* Render Active Slide */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-10">
            {currentSlide === 0 && <Slide01_Title />}
            {currentSlide === 1 && <Slide02_About />}
            {currentSlide === 2 && <Slide03_Timeline />}
            {currentSlide === 3 && <Slide04_PS1_AyurEssence />}
            {currentSlide === 4 && <Slide05_PS2_Smartbus />}
            {currentSlide === 5 && <Slide06_PS3_Sahayak />}
            {currentSlide === 6 && <Slide07_PS4_SWMS />}
            {currentSlide === 7 && <Slide08_Rules />}
            {currentSlide === 8 && <Slide09_EvaluationCriteria />}
            {currentSlide === 9 && <Slide10_Organizers />}
            {currentSlide === 10 && <Slide11_Sponsors />}
            {currentSlide === 11 && <Slide12_Conclusion />}
          </div>

          {/* Slide Footer */}
          <div className="px-8 py-2.5 bg-[#FAF6EE] border-t-2 border-[#1E1B4B] flex items-center justify-between text-xs text-[#1E1B4B]/80 font-mono print:text-black">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#EA580C]">SMVITM BANTAKAL</span>
              <span>•</span>
              <span className="font-bold text-[#2563EB]">CODE TROOPERS</span>
              <span>•</span>
              <span className="font-bold text-[#1E1B4B]">HACKATHON PREMIER LEAGUE 2026</span>
            </div>
            <div>
              <span className="font-bold">SLIDE {currentSlide + 1} OF {totalSlides}</span>
            </div>
          </div>
        </div>
      </main>

      {/* ── BOTTOM DOCKED CONTROLLER ── */}
      <footer className="relative z-50 flex items-center justify-between px-6 py-3 border-t-2 border-[#1E1B4B] bg-[#FAF6EE] shadow-md print:hidden">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider border-2 border-[#1E1B4B] transition-all ${
            currentSlide === 0 
              ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400' 
              : 'bg-white hover:bg-amber-100 text-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] active:translate-x-0.5 active:translate-y-0.5'
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        {/* Slide Mini-Thumbnails / Dots */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-[50vw] py-1 px-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              title={`Slide ${idx + 1}`}
              className={`h-3 rounded-full border border-[#1E1B4B] transition-all duration-300 ${
                currentSlide === idx 
                  ? 'w-8 bg-amber-400 shadow-[2px_2px_0px_#1E1B4B]' 
                  : 'w-3 bg-white hover:bg-amber-200'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider border-2 border-[#1E1B4B] transition-all ${
            currentSlide === totalSlides - 1
              ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400'
              : 'bg-amber-400 hover:bg-amber-300 text-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] active:translate-x-0.5 active:translate-y-0.5 font-black'
          }`}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 01: TITLE & ROYAL ARENA (WITH HERO ARENA ARTWORK)
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide01_Title = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full my-auto">
    <div className="lg:col-span-7 flex flex-col justify-center text-left">
      {/* Comic Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 border-2 border-[#1E1B4B] text-[#1E1B4B] text-xs font-black tracking-widest uppercase mb-3 shadow-[2px_2px_0px_#1E1B4B] w-fit">
        <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
        SEASON 2026 • COLLEGIATE CHAMPIONSHIP
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1E1B4B] uppercase font-display leading-[1.05]">
        HACKATHON PREMIER LEAGUE
      </h1>

      <p className="mt-2 text-lg sm:text-xl font-black text-[#EA580C] font-mono tracking-wide uppercase">
        “CODE TODAY. IMPACT TOMORROW.”
      </p>

      <div className="mt-4 pt-3 border-t-2 border-[#1E1B4B]/20">
        <p className="text-xs sm:text-sm font-bold text-[#1E1B4B]">
          Organized by <span className="text-[#2563EB]">SMVITM Bantakal</span>
        </p>
        <p className="text-xs text-[#1E1B4B]/70 font-mono mt-0.5">
          In Association with Code Troopers • ISTE • IEEE • Aikya • Ignite
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <span className="px-3 py-1 rounded-lg bg-emerald-100 border-2 border-[#1E1B4B] text-xs font-black text-[#065F46] shadow-[2px_2px_0px_#1E1B4B]">
          🏆 ₹30,000+ Prize Pool
        </span>
        <span className="px-3 py-1 rounded-lg bg-blue-100 border-2 border-[#1E1B4B] text-xs font-black text-[#1E40AF] shadow-[2px_2px_0px_#1E1B4B]">
          ⚡ 4 Real Stakeholder Problem Statements
        </span>
        <span className="px-3 py-1 rounded-lg bg-orange-100 border-2 border-[#1E1B4B] text-xs font-black text-[#9A3412] shadow-[2px_2px_0px_#1E1B4B]">
          🔥 3-Week Progressive Tournament
        </span>
      </div>
    </div>

    {/* Right Hero Illustration */}
    <div className="lg:col-span-5 flex items-center justify-center">
      <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border-3 border-[#1E1B4B] shadow-[6px_6px_0px_#1E1B4B] bg-[#FAF6EE]">
        <img 
          src={HPL_IMAGES.hero} 
          alt="HPL Championship Arena Illustration" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm border-2 border-[#1E1B4B] px-3 py-1.5 rounded-lg text-center shadow-sm">
          <span className="text-[11px] font-mono font-black text-[#1E1B4B] uppercase">
            Official Tournament Deck
          </span>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 02: ABOUT HPL (WITH TEAM COLLABORATION ARTWORK)
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide02_About = () => (
  <div className="flex flex-col justify-between h-full">
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 text-[#EA580C] font-mono text-xs font-black tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
          CHAMPIONSHIP VISION & SQUAD CULTURE
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-[#1E1B4B] uppercase tracking-tight mt-0.5 font-display">
          About Hackathon Premier League
        </h2>
      </div>
      <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border-2 border-[#1E1B4B] text-xs font-mono font-bold text-[#1E1B4B] shadow-[2px_2px_0px_#1E1B4B]">
        <span>Strict 5 Members / Squad</span>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-2 items-center">
      {/* Left 3 Pillars */}
      <div className="lg:col-span-7 space-y-3">
        <div className="p-3.5 rounded-xl bg-blue-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-black text-sm shrink-0 border border-[#1E1B4B]">
            01
          </div>
          <div>
            <h4 className="text-xs font-black text-[#1E1B4B] uppercase">Real Stakeholder Problems</h4>
            <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5 leading-snug">
              Challenges directly from Shirva Police, SDM Ayurveda Hospital, SMVITM Transit, and Art of Living (IAHV). Built for real deployability.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#059669] text-white flex items-center justify-center font-black text-sm shrink-0 border border-[#1E1B4B]">
            02
          </div>
          <div>
            <h4 className="text-xs font-black text-[#1E1B4B] uppercase">3-Stage Engineering League</h4>
            <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5 leading-snug">
              Video pitch screening → Rapid prototyping sprint with mentor grilling → Head-to-head auditorium playoffs.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-purple-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED] text-white flex items-center justify-center font-black text-sm shrink-0 border border-[#1E1B4B]">
            03
          </div>
          <div>
            <h4 className="text-xs font-black text-[#1E1B4B] uppercase">Full-Stack Mentorship</h4>
            <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5 leading-snug">
              Industry software architects provide direct code reviews, database schema guidance, and live pitch rehearsals.
            </p>
          </div>
        </div>
      </div>

      {/* Right Collaboration Team Illustration */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="relative w-full max-w-xs rounded-xl overflow-hidden border-3 border-[#1E1B4B] shadow-[5px_5px_0px_#1E1B4B] bg-[#FAF6EE]">
          <img 
            src={HPL_IMAGES.about} 
            alt="Team Collaboration High Five" 
            className="w-full h-auto object-cover"
          />
          <div className="p-2 bg-white border-t-2 border-[#1E1B4B] text-center">
            <span className="text-[10px] font-mono font-bold text-[#1E1B4B] uppercase">
              🤝 Collaborative Engineering Culture
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Key Stats */}
    <div className="p-3 rounded-xl bg-amber-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-center justify-around text-center">
      <div>
        <div className="text-lg font-black text-[#1E1B4B]">5 Members</div>
        <div className="text-[10px] text-[#1E1B4B]/70 font-mono uppercase">Strict Squad Size</div>
      </div>
      <div className="h-6 w-[2px] bg-[#1E1B4B]/20" />
      <div>
        <div className="text-lg font-black text-[#EA580C]">3 Weeks</div>
        <div className="text-[10px] text-[#1E1B4B]/70 font-mono uppercase">Progressive Tournament</div>
      </div>
      <div className="h-6 w-[2px] bg-[#1E1B4B]/20" />
      <div>
        <div className="text-lg font-black text-[#2563EB]">₹30,000+</div>
        <div className="text-[10px] text-[#1E1B4B]/70 font-mono uppercase">Championship Pool</div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 03: TIMELINE & 12TH SEPT MILESTONE
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide03_Timeline = () => (
  <div className="flex flex-col justify-between h-full">
    <div>
      <div className="flex items-center gap-2 text-[#EA580C] font-mono text-xs font-black tracking-widest uppercase">
        <Clock className="w-3.5 h-3.5" />
        SEASON ROADMAP & KEY MILESTONES
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 mt-0.5">
        <h2 className="text-2xl md:text-3xl font-black text-[#1E1B4B] uppercase tracking-tight font-display">
          Round 2 Timeline & Presentations
        </h2>
        <span className="px-3 py-1 rounded-full bg-red-100 border-2 border-[#1E1B4B] text-red-700 text-xs font-black animate-pulse shadow-[2px_2px_0px_#1E1B4B]">
          🚨 CRITICAL: 1st Presentation Starts Sept 12!
        </span>
      </div>
    </div>

    {/* 4 Multi-Color Platforms */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 my-2">
      {/* Platform 3 */}
      <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-mono font-bold text-gray-500">PLATFORM 03</span>
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800">DONE</span>
          </div>
          <div className="text-xl font-black text-[#059669] font-display">08 SEP</div>
          <h4 className="font-black text-[#1E1B4B] text-xs mt-1">Shortlist & Inauguration</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-1 leading-snug">
            Season opening briefing and qualified squads release into Round 2 Arena.
          </p>
        </div>
        <div className="mt-2 pt-1.5 border-t border-[#1E1B4B]/10 text-[9px] font-mono text-gray-500">
          Official Briefing Done
        </div>
      </div>

      {/* Platform 4 - HIGHLIGHTED */}
      <div className="p-3.5 rounded-xl bg-blue-100 border-3 border-[#2563EB] shadow-[4px_4px_0px_#2563EB] flex flex-col justify-between transform md:-translate-y-1">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-mono font-black text-[#2563EB]">PLATFORM 04</span>
            <span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-400 text-[#1E1B4B] border border-[#1E1B4B] animate-bounce">
              ⭐ ROUND 2 START
            </span>
          </div>
          <div className="text-2xl font-black text-[#1D4ED8] font-display">12 SEP</div>
          <div className="text-[10px] font-mono font-black text-[#2563EB]">5:30 PM ONWARDS</div>
          <h4 className="font-black text-[#1E1B4B] text-xs mt-1">Part 1: Evaluation 1 (Live Presentation)</h4>
          <p className="text-[11px] text-[#1E1B4B]/90 mt-1 leading-snug font-medium">
            Video deliverable + 24-hr panel review followed by live team Q&A and code walkthrough.
          </p>
        </div>
        <div className="mt-2 pt-1.5 border-t border-[#2563EB]/30 text-[9px] font-mono text-[#1D4ED8] font-black">
          ➔ Mandatory Attendance (All 5)
        </div>
      </div>

      {/* Platform 5-7 */}
      <div className="p-3.5 rounded-xl bg-orange-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-mono font-bold text-gray-500">PLATFORMS 05-07</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-200 text-orange-800">MID-SPRINT</span>
          </div>
          <div className="text-xl font-black text-[#EA580C] font-display">16 - 23 SEP</div>
          <h4 className="font-black text-[#1E1B4B] text-xs mt-1">Evaluations 2 & Part 2 Review</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-1 leading-snug">
            Feature completion check, database & API evaluation, live prototype stress tests.
          </p>
        </div>
        <div className="mt-2 pt-1.5 border-t border-[#1E1B4B]/10 text-[9px] font-mono text-gray-500">
          Rankings updated on board
        </div>
      </div>

      {/* Platform 8-9 */}
      <div className="p-3.5 rounded-xl bg-purple-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-mono font-bold text-gray-500">PLATFORMS 08-09</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-200 text-purple-800">PLAYOFFS</span>
          </div>
          <div className="text-xl font-black text-[#7C3AED] font-display">26 & 28 SEP</div>
          <h4 className="font-black text-[#1E1B4B] text-xs mt-1">Auditorium Grand Finale</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-1 leading-snug">
            Top qualifying squads battle live on stage at SMVITM Main Auditorium before judges & audience.
          </p>
        </div>
        <div className="mt-2 pt-1.5 border-t border-[#1E1B4B]/10 text-[9px] font-mono text-[#7C3AED] font-bold">
          ₹30,000+ Trophy Awarded
        </div>
      </div>
    </div>

    {/* Note banner */}
    <div className="p-2.5 rounded-xl bg-blue-50 border-2 border-[#2563EB] flex items-center justify-between text-xs text-[#1E1B4B] font-mono">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-[#2563EB] shrink-0" />
        <span><strong>First Presentation Deliverable:</strong> High-quality demo video + Architecture diagram + GitHub repository access due before the 12th Sept 5:30 PM evaluation slot.</span>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 04: PS 01 — AYURESSENCE (SDM COLLEGE OF AYURVEDA & PURPLE PALETTE)
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide04_PS1_AyurEssence = () => (
  <div className="flex flex-col justify-between h-full">
    {/* Header with Sponsor Logo & Badge */}
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#7C3AED] text-white font-mono text-xs font-black border border-[#1E1B4B]">PS 01</span>
          <span className="text-[#7C3AED] font-mono text-xs font-bold uppercase tracking-wider">DIGITAL AYURVEDIC PLATFORM</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B4B] uppercase tracking-tight mt-0.5 font-display">
          AyurEssence
        </h2>
        <p className="text-[#1E1B4B]/70 text-xs sm:text-sm font-semibold">
          Intelligent Ayurvedic Prakriti Assessment & Decision-Support System
        </p>
      </div>

      {/* Sponsor Logo Card */}
      <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-purple-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B]">
        <img 
          src={HPL_IMAGES.sdmLogo} 
          alt="SDM College of Ayurveda" 
          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-purple-200"
        />
        <div className="text-right">
          <div className="text-[9px] text-[#1E1B4B]/60 font-mono uppercase">Official Sponsor</div>
          <div className="text-xs font-black text-[#7C3AED]">SDM College of Ayurveda</div>
        </div>
      </div>
    </div>

    {/* Background & Context Pill */}
    <div className="p-3 rounded-xl bg-purple-50/70 border-2 border-[#7C3AED] text-xs text-[#1E1B4B] leading-relaxed my-1">
      <strong>Problem Context:</strong> Prakriti (individual biological constitution) is central to Ayurvedic diagnosis across Vata, Pitta, and Kapha doshas. Clinical assessment relies on extensive subjective observations and paper questionnaires. AyurEssence standardizes this through an intelligent digital decision-support tool for clinicians and students.
    </div>

    {/* Point-wise Technical Specifications */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-1">
      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-purple-100 text-[#7C3AED] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">1</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Classical Questionnaire Engine</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Standardized multi-attribute questionnaire covering anatomical features, metabolism, sleep habits, and behavioral tendencies.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-purple-100 text-[#7C3AED] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">2</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Clinical Practitioner Observations</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Physician observation module capturing pulse characteristics (Nadi), tongue inspection, skin texture, and eye luster.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-purple-100 text-[#7C3AED] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">3</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Quantitative Dosha Breakdown</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Mathematical model computing normalized percentage breakdown (e.g., 45% Vata, 35% Pitta, 20% Kapha) with dominant classification.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-purple-100 text-[#7C3AED] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">4</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Evidence-Referenced Report Generation</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Exports comprehensive clinical PDF with citations to classical Ayurvedic texts (Charaka & Sushruta Samhita) for student learning.</p>
        </div>
      </div>
    </div>

    {/* Key Use Case Footer */}
    <div className="p-2 rounded-lg bg-purple-50 border-2 border-[#1E1B4B] text-[11px] text-[#1E1B4B] font-mono flex items-center justify-between">
      <span>💡 Sample Use Case: Ayurvedic intern administers guided diagnostic assessment to outpatient; system computes verified Prakriti chart.</span>
      <span className="text-[#7C3AED] font-black">Focus: Traditional Science + AI</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 05: PS 02 — SMARTBUS (SMVITM LOGO & EMERALD GREEN PALETTE)
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide05_PS2_Smartbus = () => (
  <div className="flex flex-col justify-between h-full">
    {/* Header with Sponsor Logo & Badge */}
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#059669] text-white font-mono text-xs font-black border border-[#1E1B4B]">PS 02</span>
          <span className="text-[#059669] font-mono text-xs font-bold uppercase tracking-wider">INTELLIGENT COLLEGE TRANSIT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B4B] uppercase tracking-tight mt-0.5 font-display">
          SMARTBUS
        </h2>
        <p className="text-[#1E1B4B]/70 text-xs sm:text-sm font-semibold">
          Smartphone GPS Tracking & Geofenced Notification System for College Fleet
        </p>
      </div>

      {/* Sponsor Logo Card */}
      <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-emerald-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B]">
        <img 
          src={HPL_IMAGES.smvitmLogo} 
          alt="SMVITM Bantakal" 
          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-emerald-200"
        />
        <div className="text-right">
          <div className="text-[9px] text-[#1E1B4B]/60 font-mono uppercase">Official Sponsor</div>
          <div className="text-xs font-black text-[#059669]">SMVITM Bantakal</div>
        </div>
      </div>
    </div>

    {/* Background & Context Pill */}
    <div className="p-3 rounded-xl bg-emerald-50/70 border-2 border-[#059669] text-xs text-[#1E1B4B] leading-relaxed my-1">
      <strong>Problem Context:</strong> Hundreds of day-scholar students and parents experience severe uncertainty regarding bus arrival times due to coastal weather and traffic bottlenecks. Existing systems require expensive custom hardware GPS boxes. SMARTBUS eliminates hardware by turning the driver's smartphone into the GPS beacon.
    </div>

    {/* Point-wise Technical Specifications */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-1">
      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-emerald-100 text-[#059669] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">1</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Driver Smartphone as GPS Beacon</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Zero-hardware deployment; driver initiates trip with 1 tap, streaming lightweight encrypted telemetry coords to server.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-emerald-100 text-[#059669] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">2</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Multi-Tier Boarding Geofencing</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Automated proximity push notifications to waiting students at 1 km, 500 m, and 200 m approaching thresholds.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-emerald-100 text-[#059669] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">3</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Dynamic Route-Aware ETA Engine</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Real-time calculation of remaining travel time adjusting for historical delays, halts, and coastal speed variations.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-emerald-100 text-[#059669] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">4</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">College Fleet Administration Hub</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Unified dashboard for college transport in-charge to monitor active routes, bus delays, driver status, and student rosters.</p>
        </div>
      </div>
    </div>

    {/* Key Use Case Footer */}
    <div className="p-2 rounded-lg bg-emerald-50 border-2 border-[#1E1B4B] text-[11px] text-[#1E1B4B] font-mono flex items-center justify-between">
      <span>💡 Sample Use Case: Parent receives automatic "Bus 500m away" alert at Katapadi junction; student boards without 25-min roadside wait.</span>
      <span className="text-[#059669] font-black">Focus: Zero Hardware Cost</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 06: PS 03 — SAHAYAK (SHIRVA POLICE STATION LOGO & BLUE PALETTE)
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide06_PS3_Sahayak = () => (
  <div className="flex flex-col justify-between h-full">
    {/* Header with Sponsor Logo & Badge */}
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#2563EB] text-white font-mono text-xs font-black border border-[#1E1B4B]">PS 03</span>
          <span className="text-[#2563EB] font-mono text-xs font-bold uppercase tracking-wider">COMMUNITY ASSISTANCE PLATFORM</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B4B] uppercase tracking-tight mt-0.5 font-display">
          Sahayak (ಸಹಾಯಕ)
        </h2>
        <p className="text-[#1E1B4B]/70 text-xs sm:text-sm font-semibold">
          Bridging Senior Citizens with Police-Verified Community Volunteers
        </p>
      </div>

      {/* Sponsor Logo Card */}
      <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-blue-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B]">
        <img 
          src={HPL_IMAGES.shirvaLogo} 
          alt="Shirva Police Station" 
          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-blue-200"
        />
        <div className="text-right">
          <div className="text-[9px] text-[#1E1B4B]/60 font-mono uppercase">Official Sponsor</div>
          <div className="text-xs font-black text-[#2563EB]">Shirva Police Station</div>
        </div>
      </div>
    </div>

    {/* Background & Context Pill */}
    <div className="p-3 rounded-xl bg-blue-50/70 border-2 border-[#2563EB] text-xs text-[#1E1B4B] leading-relaxed my-1">
      <strong>Problem Context:</strong> Elderly residents in rural and suburban Shirva frequently live alone or lack immediate family support. While emergency 112 services exist, they are not designed for routine daily needs (medicine pickup, transport to clinic, minor domestic assistance). Sahayak bridges this gap safely with verified volunteers.
    </div>

    {/* Point-wise Technical Specifications */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-1">
      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-blue-100 text-[#2563EB] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">1</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Voice-First Access (IVR / Telephony)</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Senior citizens request assistance via phone call or simple voice messages with zero complicated app-learning curves.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-blue-100 text-[#2563EB] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">2</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Shirva Police Verification Workflow</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Strict multi-step KYC and police admin review portal before any volunteer is cleared to receive community requests.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-blue-100 text-[#2563EB] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">3</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Intelligent Volunteer Dispatch</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Automated matchmaking by geographical proximity, availability, language, and nature of assistance requested.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-blue-100 text-[#2563EB] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">4</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Automated Emergency 112 Escalation</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">AI-assisted distress detection escalates medical or security emergencies directly to police and ambulance dispatch.</p>
        </div>
      </div>
    </div>

    {/* Key Use Case Footer */}
    <div className="p-2 rounded-lg bg-amber-50 border-2 border-[#1E1B4B] text-[11px] text-[#1E1B4B] font-mono flex items-center justify-between">
      <span>💡 Sample Use Case: 78-yr-old resident calls to request urgent blood pressure tablet pickup from Shirva junction pharmacy.</span>
      <span className="text-[#2563EB] font-black">Focus: Trust & Safety</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 07: PS 04 — SWMS (IAHV ART OF LIVING & VIBRANT ORANGE PALETTE)
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide07_PS4_SWMS = () => (
  <div className="flex flex-col justify-between h-full">
    {/* Header with Sponsor Logo & Badge */}
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#EA580C] text-white font-mono text-xs font-black border border-[#1E1B4B]">PS 04</span>
          <span className="text-[#EA580C] font-mono text-xs font-bold uppercase tracking-wider">DECISION SUPPORT PLATFORM</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B4B] uppercase tracking-tight mt-0.5 font-display">
          SWMS (Smart Waste Simulator)
        </h2>
        <p className="text-[#1E1B4B]/70 text-xs sm:text-sm font-semibold">
          20-Year Habitation Solid Waste Generation, Treatment & Resilience Modeling
        </p>
      </div>

      {/* Sponsor Logo Card */}
      <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-orange-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B]">
        <img 
          src={HPL_IMAGES.iahvLogo} 
          alt="IAHV - Art of Living" 
          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-orange-200"
        />
        <div className="text-right">
          <div className="text-[9px] text-[#1E1B4B]/60 font-mono uppercase">Official Sponsor</div>
          <div className="text-xs font-black text-[#EA580C]">IAHV (Art of Living)</div>
        </div>
      </div>
    </div>

    {/* Background & Context Pill */}
    <div className="p-3 rounded-xl bg-orange-50/70 border-2 border-[#EA580C] text-xs text-[#1E1B4B] leading-relaxed my-1">
      <strong>Problem Context:</strong> Solid waste planning for growing habitations (wards, towns, coastal cities) fails because static planning neglects multi-decade demographic growth, economic surges, and extreme monsoon weather. SWMS provides a simulation decision-support engine across a 20-year horizon.
    </div>

    {/* Point-wise Technical Specifications */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-1">
      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-orange-100 text-[#EA580C] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">1</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">7-Parameter Habitation Modeling</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Incorporates Demography, Infrastructure, Industries, Natural Resources, Terrain, Economy, and Cultural Consumption factors.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-orange-100 text-[#EA580C] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">2</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">20-Year Forecasting & Landfill Projection</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Simulates long-range waste generation volumes, treatment plant capacities, and estimates exact landfill exhaustion timelines.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-orange-100 text-[#EA580C] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">3</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Disaster & Monsoon Stress-Testing</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Simulates scenario impacts during heavy rainfall, coastal floods, bridge collapses, and festival season waste volume surges.</p>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md bg-orange-100 text-[#EA580C] flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-[#1E1B4B]">4</div>
        <div>
          <h4 className="text-xs font-black text-[#1E1B4B] uppercase tracking-wider">Conversational AI Query Interface</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5">Enables civic planners to ask natural-language questions: "What happens if composting increases by 30% over the next 5 years?"</p>
        </div>
      </div>
    </div>

    {/* Key Use Case Footer */}
    <div className="p-2 rounded-lg bg-orange-50 border-2 border-[#1E1B4B] text-[11px] text-[#1E1B4B] font-mono flex items-center justify-between">
      <span>💡 Sample Use Case: Udupi Municipal Council models waste processing requirements during 2026-2046 considering beach tourism growth.</span>
      <span className="text-[#EA580C] font-black">Focus: Sustainability & Simulation</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 08: RULES & SQUAD REGULATIONS
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide08_Rules = () => (
  <div className="flex flex-col justify-between h-full">
    <div>
      <div className="flex items-center gap-2 text-[#EA580C] font-mono text-xs font-black tracking-widest uppercase">
        <Shield className="w-3.5 h-3.5" />
        CHAMPIONSHIP CODE & SQUAD INTEGRITY
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-[#1E1B4B] uppercase tracking-tight mt-0.5 font-display">
        Rules & Squad Regulations
      </h2>
      <p className="text-[#1E1B4B]/70 text-xs mt-0.5">
        Strict adherence to engineering ethics, team discipline, and evaluation standards is required throughout HPL.
      </p>
    </div>

    {/* Rules 6-Card Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
      <div className="p-3 rounded-xl bg-amber-50 border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B]">
        <div className="flex items-center gap-2 text-[#1E1B4B] font-black text-xs mb-1">
          <Users className="w-4 h-4 text-[#EA580C]" /> 01. Strict Squad Size
        </div>
        <p className="text-[11px] text-[#1E1B4B]/80 leading-snug">
          Every squad must consist of <strong>exactly 5 members</strong>. No additions, substitutions, or drop-in changes are permitted post-shortlisting.
        </p>
      </div>

      <div className="p-3 rounded-xl bg-blue-50 border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B]">
        <div className="flex items-center gap-2 text-[#1E1B4B] font-black text-xs mb-1">
          <Video className="w-4 h-4 text-[#2563EB]" /> 02. Attendance & Live Defense
        </div>
        <p className="text-[11px] text-[#1E1B4B]/80 leading-snug">
          All 5 squad members must be present during live panel reviews. Random questions may be directed to any member to test collective understanding.
        </p>
      </div>

      <div className="p-3 rounded-xl bg-emerald-50 border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B]">
        <div className="flex items-center gap-2 text-[#1E1B4B] font-black text-xs mb-1">
          <Code2 className="w-4 h-4 text-[#059669]" /> 03. Originality & Open Source
        </div>
        <p className="text-[11px] text-[#1E1B4B]/80 leading-snug">
          Core solution logic must be built during the hackathon. Open-source frameworks/libraries are permitted with full attribution in the README.
        </p>
      </div>

      <div className="p-3 rounded-xl bg-orange-50 border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B]">
        <div className="flex items-center gap-2 text-[#1E1B4B] font-black text-xs mb-1">
          <Clock className="w-4 h-4 text-[#EA580C]" /> 04. Punctual Submissions
        </div>
        <p className="text-[11px] text-[#1E1B4B]/80 leading-snug">
          Deliverables (code repository, demonstration video, deployment URL) must be submitted before deadline. Late submissions incur penalty points.
        </p>
      </div>

      <div className="p-3 rounded-xl bg-purple-50 border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B]">
        <div className="flex items-center gap-2 text-[#1E1B4B] font-black text-xs mb-1">
          <Zap className="w-4 h-4 text-[#7C3AED]" /> 05. Live Runnable Demo
        </div>
        <p className="text-[11px] text-[#1E1B4B]/80 leading-snug">
          Figma mockups alone will not suffice for Round 2. Evaluators require a runnable software prototype demonstrating core functionality.
        </p>
      </div>

      <div className="p-3 rounded-xl bg-rose-50 border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B]">
        <div className="flex items-center gap-2 text-[#1E1B4B] font-black text-xs mb-1">
          <Award className="w-4 h-4 text-[#E11D48]" /> 06. Jury Decision Finality
        </div>
        <p className="text-[11px] text-[#1E1B4B]/80 leading-snug">
          The scoring and technical recommendations of the evaluation jury and problem stakeholders are binding and final.
        </p>
      </div>
    </div>

    {/* Bottom Warning Alert */}
    <div className="p-2.5 rounded-xl bg-red-100 border-2 border-red-500 flex items-center gap-2.5 text-xs text-red-900 font-medium">
      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
      <span><strong>Zero Tolerance Policy:</strong> Plagiarism, uncredited repository cloning, or submitting solutions built prior to HPL will lead to immediate disqualification.</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 09: EVALUATION PILLARS (THE 4 PILLARS @ 25% EACH)
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide09_EvaluationCriteria = () => (
  <div className="flex flex-col justify-between h-full">
    <div>
      <div className="flex items-center gap-2 text-[#EA580C] font-mono text-xs font-black tracking-widest uppercase">
        <Award className="w-3.5 h-3.5" />
        SCORING METHODOLOGY
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-[#1E1B4B] uppercase tracking-tight mt-0.5 font-display">
        Evaluation Criteria (4 Pillars @ 25% Each)
      </h2>
      <p className="text-[#1E1B4B]/70 text-xs mt-0.5">
        Jury evaluation is strictly balanced across four 25-point dimensions to reward well-rounded engineering.
      </p>
    </div>

    {/* 4 Multi-Color Pillars Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 my-2">
      {/* Pillar 1 */}
      <div className="p-3.5 rounded-xl bg-blue-50 border-2 border-[#2563EB] shadow-[3px_3px_0px_#2563EB] flex flex-col justify-between">
        <div>
          <div className="text-2xl font-black text-[#2563EB] font-display">25%</div>
          <h4 className="text-xs font-black text-[#1E1B4B] mt-0.5 uppercase tracking-wider">Problem Understanding</h4>
          <ul className="mt-2.5 space-y-1.5 text-[11px] text-[#1E1B4B]/80 leading-normal">
            <li>• Accuracy in addressing pain points</li>
            <li>• Depth of domain research</li>
            <li>• Scope coverage against sponsor needs</li>
            <li>• Edge case anticipation</li>
          </ul>
        </div>
        <div className="mt-3 pt-2 border-t border-[#2563EB]/20 text-[10px] font-mono text-[#2563EB] font-bold">
          Max: 25 Points
        </div>
      </div>

      {/* Pillar 2 */}
      <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-[#059669] shadow-[3px_3px_0px_#059669] flex flex-col justify-between">
        <div>
          <div className="text-2xl font-black text-[#059669] font-display">25%</div>
          <h4 className="text-xs font-black text-[#1E1B4B] mt-0.5 uppercase tracking-wider">Architecture & Code</h4>
          <ul className="mt-2.5 space-y-1.5 text-[11px] text-[#1E1B4B]/80 leading-normal">
            <li>• Clean, modular code structure</li>
            <li>• Scalable database schema</li>
            <li>• API robustness & latency</li>
            <li>• Security & error handling</li>
          </ul>
        </div>
        <div className="mt-3 pt-2 border-t border-[#059669]/20 text-[10px] font-mono text-[#059669] font-bold">
          Max: 25 Points
        </div>
      </div>

      {/* Pillar 3 */}
      <div className="p-3.5 rounded-xl bg-purple-50 border-2 border-[#7C3AED] shadow-[3px_3px_0px_#7C3AED] flex flex-col justify-between">
        <div>
          <div className="text-2xl font-black text-[#7C3AED] font-display">25%</div>
          <h4 className="text-xs font-black text-[#1E1B4B] mt-0.5 uppercase tracking-wider">Innovation & UX</h4>
          <ul className="mt-2.5 space-y-1.5 text-[11px] text-[#1E1B4B]/80 leading-normal">
            <li>• Creative technical approaches</li>
            <li>• Delightful user interface</li>
            <li>• Accessibility for all users</li>
            <li>• Practicality in real deployment</li>
          </ul>
        </div>
        <div className="mt-3 pt-2 border-t border-[#7C3AED]/20 text-[10px] font-mono text-[#7C3AED] font-bold">
          Max: 25 Points
        </div>
      </div>

      {/* Pillar 4 */}
      <div className="p-3.5 rounded-xl bg-amber-50 border-2 border-[#F59E0B] shadow-[3px_3px_0px_#F59E0B] flex flex-col justify-between">
        <div>
          <div className="text-2xl font-black text-[#D97706] font-display">25%</div>
          <h4 className="text-xs font-black text-[#1E1B4B] mt-0.5 uppercase tracking-wider">Presentation & Q&A</h4>
          <ul className="mt-2.5 space-y-1.5 text-[11px] text-[#1E1B4B]/80 leading-normal">
            <li>• Clarity of live demonstration</li>
            <li>• Time management</li>
            <li>• Depth of technical responses</li>
            <li>• Team cohesion in Q&A</li>
          </ul>
        </div>
        <div className="mt-3 pt-2 border-t border-[#F59E0B]/30 text-[10px] font-mono text-[#D97706] font-bold">
          Max: 25 Points
        </div>
      </div>
    </div>

    {/* Formula Banner */}
    <div className="p-2.5 rounded-xl bg-white border-2 border-[#1E1B4B] shadow-[2.5px_2.5px_0px_#1E1B4B] flex items-center justify-between text-xs font-mono">
      <span className="text-[#1E1B4B]">TOTAL SCORE = Problem Understanding (25) + Architecture (25) + Innovation (25) + Presentation (25)</span>
      <span className="text-[#EA580C] font-black">= 100 POINTS</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 10: ORGANIZING BODIES & TECHNICAL CHAPTERS (WITH REAL LOGOS)
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide10_Organizers = () => (
  <div className="flex flex-col justify-between h-full">
    <div>
      <div className="flex items-center gap-2 text-[#EA580C] font-mono text-xs font-black tracking-widest uppercase">
        <Users className="w-3.5 h-3.5" />
        CHAMPIONSHIP ORGANIZERS
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-[#1E1B4B] uppercase tracking-tight mt-0.5 font-display">
        Organizing Bodies & Technical Chapters
      </h2>
      <p className="text-[#1E1B4B]/70 text-xs mt-0.5">
        Powered by an alliance of academic excellence, student developer clubs, and professional engineering societies.
      </p>
    </div>

    {/* 6 Organizers Grid with Logos */}
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-2">
      {/* 1. SMVITM */}
      <div className="p-3 rounded-xl bg-white border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-center gap-3">
        <img 
          src={HPL_IMAGES.smvitmLogo} 
          alt="SMVITM" 
          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-gray-200 shrink-0" 
        />
        <div>
          <h4 className="font-extrabold text-xs text-[#1E1B4B]">SMVITM Bantakal</h4>
          <p className="text-[10px] text-[#2563EB] font-mono font-bold">Host & Academic Authority</p>
        </div>
      </div>

      {/* 2. Code Troopers */}
      <div className="p-3 rounded-xl bg-white border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-center gap-3">
        <img 
          src={HPL_IMAGES.codeTrooperLogo} 
          alt="Code Troopers" 
          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-gray-200 shrink-0" 
        />
        <div>
          <h4 className="font-extrabold text-xs text-[#1E1B4B]">Code Troopers</h4>
          <p className="text-[10px] text-[#EA580C] font-mono font-bold">Technical Engine & Mentorship</p>
        </div>
      </div>

      {/* 3. ISTE */}
      <div className="p-3 rounded-xl bg-white border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-center gap-3">
        <img 
          src={HPL_IMAGES.isteLogo} 
          alt="ISTE" 
          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-gray-200 shrink-0" 
        />
        <div>
          <h4 className="font-extrabold text-xs text-[#1E1B4B]">ISTE SMVITM</h4>
          <p className="text-[10px] text-[#059669] font-mono font-bold">Student Chapter & Outreach</p>
        </div>
      </div>

      {/* 4. IEEE */}
      <div className="p-3 rounded-xl bg-white border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-center gap-3">
        <img 
          src={HPL_IMAGES.ieeeLogo} 
          alt="IEEE" 
          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-gray-200 shrink-0" 
        />
        <div>
          <h4 className="font-extrabold text-xs text-[#1E1B4B]">IEEE Student Branch</h4>
          <p className="text-[10px] text-[#2563EB] font-mono font-bold">Technical Standards & Review</p>
        </div>
      </div>

      {/* 5. Aikya */}
      <div className="p-3 rounded-xl bg-white border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-center gap-3">
        <img 
          src={HPL_IMAGES.aikyaLogo} 
          alt="Aikya Club" 
          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-gray-200 shrink-0" 
        />
        <div>
          <h4 className="font-extrabold text-xs text-[#1E1B4B]">Aikya Club</h4>
          <p className="text-[10px] text-[#7C3AED] font-mono font-bold">Social Outreach & Community</p>
        </div>
      </div>

      {/* 6. Ignite */}
      <div className="p-3 rounded-xl bg-white border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-center gap-3">
        <img 
          src={HPL_IMAGES.igniteLogo} 
          alt="Ignite" 
          className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-gray-200 shrink-0" 
        />
        <div>
          <h4 className="font-extrabold text-xs text-[#1E1B4B]">Ignite Incubation</h4>
          <p className="text-[10px] text-[#E11D48] font-mono font-bold">Innovation & Acceleration</p>
        </div>
      </div>
    </div>

    <div className="p-2.5 rounded-xl bg-white border-2 border-[#1E1B4B] text-xs text-[#1E1B4B]/80 text-center font-mono">
      Collaboratively committed to elevating undergraduate engineering capability and civic problem-solving.
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 11: PROBLEM STATEMENT SPONSORS & STAKEHOLDERS (WITH REAL LOGOS)
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide11_Sponsors = () => (
  <div className="flex flex-col justify-between h-full">
    <div>
      <div className="flex items-center gap-2 text-[#EA580C] font-mono text-xs font-black tracking-widest uppercase">
        <Sparkles className="w-3.5 h-3.5" />
        REAL-WORLD PROBLEM STAKEHOLDERS
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-[#1E1B4B] uppercase tracking-tight mt-0.5 font-display">
        Official Problem Statement Sponsors
      </h2>
      <p className="text-[#1E1B4B]/70 text-xs mt-0.5">
        Distinguished institutional partners providing genuine challenge statements, domain guidance, and deployment pilots.
      </p>
    </div>

    {/* 4 Sponsors Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
      {/* 1. SDM Ayurveda */}
      <div className="p-3.5 rounded-xl bg-purple-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-start gap-3.5">
        <img 
          src={HPL_IMAGES.sdmLogo} 
          alt="SDM College of Ayurveda" 
          className="w-14 h-14 object-contain bg-white rounded-xl p-1 shrink-0 border border-purple-200" 
        />
        <div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-200 text-[#5B21B6] font-black">PS 01 STAKEHOLDER</span>
          <h4 className="font-extrabold text-sm text-[#1E1B4B] mt-0.5">SDM College of Ayurveda, Udupi</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5 leading-snug">
            Sponsor for <strong>AyurEssence</strong>. Providing classical Ayurvedic literature, diagnostic traits, and doctor clinical feedback.
          </p>
        </div>
      </div>

      {/* 2. SMVITM */}
      <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-start gap-3.5">
        <img 
          src={HPL_IMAGES.smvitmLogo} 
          alt="SMVITM Bantakal" 
          className="w-14 h-14 object-contain bg-white rounded-xl p-1 shrink-0 border border-emerald-200" 
        />
        <div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-200 text-[#065F46] font-black">PS 02 STAKEHOLDER</span>
          <h4 className="font-extrabold text-sm text-[#1E1B4B] mt-0.5">SMVITM Bantakal (Transport Dept)</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5 leading-snug">
            Sponsor for <strong>SMARTBUS</strong>. Providing college fleet route coordinates, stop locations, and test validation on campus routes.
          </p>
        </div>
      </div>

      {/* 3. Shirva Police */}
      <div className="p-3.5 rounded-xl bg-blue-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-start gap-3.5">
        <img 
          src={HPL_IMAGES.shirvaLogo} 
          alt="Shirva Police" 
          className="w-14 h-14 object-contain bg-white rounded-xl p-1 shrink-0 border border-blue-200" 
        />
        <div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-200 text-[#1E40AF] font-black">PS 03 STAKEHOLDER</span>
          <h4 className="font-extrabold text-sm text-[#1E1B4B] mt-0.5">Shirva Police Station</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5 leading-snug">
            Sponsor for <strong>Sahayak</strong>. Providing police verification protocol requirements and 112 emergency routing standards.
          </p>
        </div>
      </div>

      {/* 4. IAHV */}
      <div className="p-3.5 rounded-xl bg-orange-50 border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#1E1B4B] flex items-start gap-3.5">
        <img 
          src={HPL_IMAGES.iahvLogo} 
          alt="IAHV (Art of Living)" 
          className="w-14 h-14 object-contain bg-white rounded-xl p-1 shrink-0 border border-orange-200" 
        />
        <div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-orange-200 text-[#9A3412] font-black">PS 04 STAKEHOLDER</span>
          <h4 className="font-extrabold text-sm text-[#1E1B4B] mt-0.5">IAHV (Art of Living)</h4>
          <p className="text-[11px] text-[#1E1B4B]/80 mt-0.5 leading-snug">
            Sponsor for <strong>SWMS</strong>. Providing ecological sustainability benchmarks, 7 habitation parameter guidelines, and simulation goals.
          </p>
        </div>
      </div>
    </div>

    <div className="p-2.5 rounded-xl bg-amber-100 border-2 border-[#1E1B4B] text-xs text-[#1E1B4B] text-center font-mono font-bold">
      ⭐ Winning squads will be offered official mentorship and opportunities to pilot their solution with the respective stakeholder!
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   SLIDE 12: GRAND FINALE & CALL TO ACTION (WITH CHAMPIONSHIP ARTWORK)
   ═══════════════════════════════════════════════════════════════════════════════ */
const Slide12_Conclusion = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full my-auto">
    <div className="lg:col-span-7 flex flex-col justify-center text-left">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border-2 border-[#1E1B4B] text-[#1E1B4B] text-xs font-black uppercase tracking-widest mb-3 shadow-[2px_2px_0px_#1E1B4B] w-fit">
        THE GRAND FINALE AWAITS
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1B4B] uppercase tracking-tight font-display">
        STEP INTO THE ARENA
      </h2>

      <p className="mt-2 text-base sm:text-lg text-[#EA580C] font-mono font-black">
        “CODE TODAY. IMPACT TOMORROW.”
      </p>

      <p className="mt-2 text-xs sm:text-sm text-[#1E1B4B]/80 max-w-xl leading-relaxed">
        Build with rigor, test with passion, and present with conviction. The championship trophy, ₹30,000+ prize pool, and real-world impact are yours to seize!
      </p>

      {/* Checkpoint Banner */}
      <div className="mt-4 p-3.5 rounded-xl bg-blue-50 border-3 border-[#2563EB] shadow-[3px_3px_0px_#2563EB] text-[#1E1B4B] text-xs font-mono max-w-lg w-full">
        <div className="text-[#2563EB] font-black text-sm mb-0.5">NEXT IMMEDIATE CHECKPOINT:</div>
        <div className="font-bold text-sm">Saturday, 12th September @ 5:30 PM</div>
        <div className="text-[#1E1B4B]/80 text-[11px] mt-0.5">Part 1 Evaluation 1: Deliverable Video & Code Walkthrough Presentation</div>
      </div>

      <div className="mt-3 text-xs text-[#1E1B4B]/60 font-mono">
        Questions? Contact: hpl@sode-edu.in | Discord Support Channel Active
      </div>
    </div>

    {/* Right Trophy Artwork */}
    <div className="lg:col-span-5 flex justify-center">
      <div className="relative w-full max-w-xs rounded-xl overflow-hidden border-3 border-[#1E1B4B] shadow-[6px_6px_0px_#1E1B4B] bg-[#FAF6EE]">
        <img 
          src={HPL_IMAGES.timelineChampions} 
          alt="HPL Champions Trophy" 
          className="w-full h-auto object-cover"
        />
        <div className="p-2.5 bg-amber-400 border-t-2 border-[#1E1B4B] text-center">
          <span className="text-xs font-mono font-black text-[#1E1B4B] uppercase">
            🏆 Championship Trophy & Glory
          </span>
        </div>
      </div>
    </div>
  </div>
);
