export type PageRoute = 
  | 'home'
  | 'league'
  | 'timeline'
  | 'how-it-works'
  | 'match-day'
  | 'squads'
  | 'leaderboard'
  | 'journey'
  | 'playoffs'
  | 'mentors'
  | 'rulebook'
  | 'faq'
  | 'register';

export interface Squad {
  id: string;
  rank: number;
  name: string;
  number: string;
  college: string;
  lead: string;
  members: string[];
  track: 'Build For Udupi' | 'Smart Pilgrimage' | 'Coastal Tech' | 'AI for Governance' | 'Green Tech';
  projectName: string;
  projectSummary: string;
  matches: number;
  wins: number;
  ties: number;
  losses: number;
  points: number;
  movement: 'up' | 'stable' | 'down';
  avatarSeed: string;
  accentColor: string;
  isPlayoffQualified: boolean;
  scoreBreakdown: {
    week1: number;
    week2: number;
    innovation: number;
    codeQuality: number;
    impact: number;
  };
}

export interface MatchFixture {
  id: string;
  matchNumber: number;
  phase: string;
  week: number;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  squad1: {
    name: string;
    score?: number;
    pointsEarned?: number;
    statusBadge?: string;
  };
  squad2: {
    name: string;
    score?: number;
    pointsEarned?: number;
    statusBadge?: string;
  };
  challengeTrack: string;
  problemSummary: string;
  mentorInCharge: string;
}

export interface PersonProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  category: 'mentor' | 'judge';
  avatarUrl?: string;
  avatarSeed: string;
  expertise: string[];
  bio: string;
  linkedIn?: string;
  availableOfficeHours?: string;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Participation' | 'Submission' | 'Evaluation' | 'Playoffs' | 'Event Day';
  question: string;
  answer: string;
}

export interface RuleCategory {
  id: string;
  title: string;
  icon: string;
  summary: string;
  rules: string[];
}

export interface RegistrationFormData {
  teamName: string;
  track: string;
  teamLeaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  college: string;
  teamSize: number;
  member2Name: string;
  member2Email: string;
  member3Name: string;
  member3Email: string;
  member4Name: string;
  member4Email: string;
  projectIdea: string;
  githubOrg?: string;
  acceptRules: boolean;
}
