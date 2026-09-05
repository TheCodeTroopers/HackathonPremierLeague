import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/common/CustomCursor';

// Pages
import { HomePage } from './components/pages/HomePage';
import { HowItWorksPage } from './components/pages/HowItWorksPage';
import { MatchDayPage } from './components/pages/MatchDayPage';
import { SquadsPage } from './components/pages/SquadsPage';
import { LeaderboardPage } from './components/pages/LeaderboardPage';
import { TimelinePage } from './components/pages/TimelinePage';
import { PlayoffsPage } from './components/pages/PlayoffsPage';
import { MentorsPage } from './components/pages/MentorsPage';
import { RulebookPage } from './components/pages/RulebookPage';
import { FAQPage } from './components/pages/FAQPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { SponsorsPage } from './components/pages/SponsorsPage';
import { ProblemStatementsPage } from './components/pages/ProblemStatementsPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminPage } from './components/pages/AdminPage';
import { LoadingScreen } from './components/common/LoadingScreen';
import { PageTransition } from './components/common/PageTransition';
import { preloadAllImages } from './utils/imagePreloader';

const getInitialPage = (): PageRoute => {
  if (typeof window !== 'undefined' && window.location.hash) {
    const rawHash = window.location.hash.replace('#', '') as PageRoute;
    const validPages: PageRoute[] = [
      'home', 'how-it-works', 'match-day', 'squads',
      'leaderboard', 'journey', 'playoffs', 'mentors', 'rulebook', 'faq', 'register', 'sponsors', 'problem-statements', 'contact', 'admin'
    ];
    if (validPages.includes(rawHash)) {
      return rawHash;
    }
  }
  return 'home';
};

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState<PageRoute>(getInitialPage);
  const [selectedSquadId, setSelectedSquadId] = useState<string | null>(null);

  // Preload all assets in the background immediately on mount
  useEffect(() => {
    preloadAllImages();
  }, []);

  // Prevent auto-scrolling on page refresh and clean lingering hashes
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // If user refreshed with #about-hpl or #league in the URL, remove it and stay at top
    if (window.location.hash === '#about-hpl' || window.location.hash === '#league') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Always start at top on fresh load / refresh
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (hash === 'league' || hash === 'about-hpl' as any) {
        setActivePage('home');
        const el = document.getElementById('about-hpl');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      const validPages: PageRoute[] = [
        'home', 'how-it-works', 'match-day', 'squads',
        'leaderboard', 'journey', 'playoffs', 'mentors', 'rulebook', 'faq', 'register', 'sponsors', 'problem-statements', 'contact', 'admin'
      ];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    // Run once on mount so direct URLs like #admin immediately open the page
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    if (page === 'league') {
      setActivePage('home');
      // Keep URL clean so refresh doesn't jump back
      window.history.replaceState(null, '', window.location.pathname);
      setTimeout(() => {
        const el = document.getElementById('about-hpl');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSquad = (squadId: string) => {
    setSelectedSquadId(squadId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-hpl-yellow selection:text-ink">
      {/* 6-Stage Hand-Drawn Loading Screen from Storyboard */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Unique Animated Mouse Cursor & Scroll Indicator */}
      <CustomCursor />

      {/* Top Sticky Header (Hidden on Admin portal for clean workspace view) */}
      {activePage !== 'admin' && (
        <Navbar activePage={activePage} onNavigate={handleNavigate} />
      )}

      {/* Main Multi-Page Container */}
      <main className="flex-grow">
        <PageTransition pageKey={activePage}>
          {(activePage === 'home' || activePage === 'league') && (
            <HomePage onNavigate={handleNavigate} onSelectSquad={handleSelectSquad} isLoaded={!isLoading} />
          )}
          {activePage === 'how-it-works' && (
            <HowItWorksPage onNavigate={handleNavigate} />
          )}
          {activePage === 'match-day' && (
            <MatchDayPage onNavigate={handleNavigate} />
          )}
          {activePage === 'squads' && (
            <SquadsPage onNavigate={handleNavigate} selectedSquadId={selectedSquadId} />
          )}
          {activePage === 'leaderboard' && (
            <LeaderboardPage onNavigate={handleNavigate} onSelectSquad={handleSelectSquad} />
          )}
          {(activePage === 'timeline' || activePage === 'journey') && (
            <TimelinePage onNavigate={handleNavigate} />
          )}
          {activePage === 'playoffs' && (
            <PlayoffsPage onNavigate={handleNavigate} />
          )}
          {activePage === 'mentors' && (
            <MentorsPage onNavigate={handleNavigate} />
          )}
          {activePage === 'rulebook' && (
            <RulebookPage onNavigate={handleNavigate} />
          )}
          {activePage === 'faq' && (
            <FAQPage onNavigate={handleNavigate} />
          )}
          {activePage === 'sponsors' && (
            <SponsorsPage onNavigate={handleNavigate} />
          )}
          {activePage === 'problem-statements' && (
            <ProblemStatementsPage onNavigate={handleNavigate} />
          )}
          {activePage === 'contact' && (
            <ContactPage onNavigate={handleNavigate} />
          )}
          {activePage === 'register' && (
            <RegisterPage onNavigate={handleNavigate} />
          )}
          {activePage === 'admin' && (
            <AdminPage onNavigate={handleNavigate} />
          )}
        </PageTransition>
      </main>

      {/* Editorial Footer with Partner Logos & Callout Banner (Hidden on Admin portal & Timeline) */}
      {activePage !== 'admin' && activePage !== 'timeline' && activePage !== 'journey' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
