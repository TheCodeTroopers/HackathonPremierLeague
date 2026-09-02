import { Squad, MatchFixture, PersonProfile, FAQItem, RuleCategory } from '../types';

export const HPL_META = {
  name: 'HPL — Hackathon Premier League',
  shortName: 'HPL',
  edition: 'Season 2026',
  season: 'Season 2026',
  tagline: 'CODE. COLLABORATE. CONQUER.',
  subTagline: 'A 3-Week League of Innovation. Build impactful solutions. Compete. Improve. Be the champion.',
  dates: 'STARTS 2 SEPTEMBER 2026 – 23 SEPTEMBER 2026',
  venue: 'SMVITM Campus, Bantakal, Udupi & Hybrid Arena',
  stats: [
    { value: '3', label: 'WEEKS', subtitle: 'Continuous Innovation' },
    { value: '8+', label: 'MATCH DAYS', subtitle: 'Head-to-Head Rounds' },
    { value: '12 TEAMS', label: 'PLAYOFFS', subtitle: 'Top 4 per Domain' },
    { value: '1', label: 'CHAMPION', subtitle: 'Golden Trophy & Cash' },
  ],
  pointsRules: [
    { condition: 'Win Against Another Team', points: '+3 Points', color: 'emerald' },
    { condition: 'Tie (Judges draw)', points: '+1 Point', color: 'amber' },
    { condition: 'Loss', points: '0 Points', color: 'ink' },
  ],
  theme: {
    title: 'Theme: Build For Udupi!',
    description: 'Create technology solutions that address real challenges in and around Udupi — covering Smart Pilgrimage, Coastal Tourism & Ecology, Fishery Supply Chains, Civic Waste Management, and Local Healthcare.',
    keyPillars: [
      'Smart Heritage & Pilgrimage Infrastructure',
      'Coastal Marine Ecology & Fishermen Safety',
      'Hyperlocal Agriculture & Cashew Processing Tech',
      'Clean Beach & Civic Waste Intelligence',
      'Community Healthcare & Kannada Tech Access'
    ]
  }
};

export const SQUADS_DATA: Squad[] = [
  {
    id: 'squad-1',
    rank: 1,
    name: 'CodeTroopers',
    number: '#01',
    college: 'SMVITM Bantakal',
    lead: 'Karthik Rao',
    members: ['Karthik Rao (Lead)', 'Sneha Nayak (Frontend)', 'Adithya Bhat (Backend)', 'Pooja Hegde (AI/ML)'],
    track: 'Build For Udupi',
    projectName: 'UdupiDarshana — Smart Pilgrimage Corridor',
    projectSummary: 'Real-time dynamic crowd routing, automated prasadam queue telemetry, and multilingual voice guides for temple visitors.',
    matches: 6,
    wins: 5,
    ties: 0,
    losses: 1,
    points: 10,
    movement: 'up',
    avatarSeed: 'codetroopers',
    accentColor: '#E11D48',
    isPlayoffQualified: true,
    scoreBreakdown: {
      week1: 9.4,
      week2: 9.6,
      innovation: 9.5,
      codeQuality: 9.8,
      impact: 9.7
    }
  },
  {
    id: 'squad-2',
    rank: 2,
    name: 'Debuggers',
    number: '#02',
    college: 'NMAMIT Nitte',
    lead: 'Rohan Shetty',
    members: ['Rohan Shetty (Lead)', 'Ananya Prabhu (Fullstack)', 'Ganesh Pai (DevOps)', 'Chirag Kulal (UI/UX)'],
    track: 'Coastal Tech',
    projectName: 'SamudraSetu — Fishery Logistics & Cold-Chain IoT',
    projectSummary: 'Edge-AI device for small fishing trawlers to predict catch zones and track cold storage telemetry with cellular failover.',
    matches: 6,
    wins: 4,
    ties: 1,
    losses: 1,
    points: 9,
    movement: 'up',
    avatarSeed: 'debuggers',
    accentColor: '#2563EB',
    isPlayoffQualified: true,
    scoreBreakdown: {
      week1: 9.1,
      week2: 9.3,
      innovation: 9.2,
      codeQuality: 9.4,
      impact: 9.5
    }
  },
  {
    id: 'squad-3',
    rank: 3,
    name: 'Ctrl Alt Elite',
    number: '#03',
    college: 'MIT Manipal',
    lead: 'Vikram Joshi',
    members: ['Vikram Joshi (Lead)', 'Meera Kamath (Computer Vision)', 'Tanmay Shenoy (Mobile)', 'Siddharth V (Security)'],
    track: 'Green Tech',
    projectName: 'SwachhKaravali — AI Beach Drone Surveillance',
    projectSummary: 'Autonomous micro-drone imagery processing to detect plastic hotspots along Malpe and Kaup coastline for municipal cleanup.',
    matches: 6,
    wins: 3,
    ties: 1,
    losses: 2,
    points: 7,
    movement: 'stable',
    avatarSeed: 'ctrlaltelite',
    accentColor: '#059669',
    isPlayoffQualified: true,
    scoreBreakdown: {
      week1: 8.8,
      week2: 8.9,
      innovation: 9.0,
      codeQuality: 8.7,
      impact: 8.6
    }
  },
  {
    id: 'squad-4',
    rank: 4,
    name: 'Syntax Squad',
    number: '#04',
    college: 'Canara Engineering College',
    lead: 'Deepak Acharya',
    members: ['Deepak Acharya (Lead)', 'Divya M (Cloud)', 'Prasad Nayak (Fullstack)', 'Kavya Devadiga (Design)'],
    track: 'AI for Governance',
    projectName: 'GramaSeva — Hyperlocal Civic Complaint Portal',
    projectSummary: 'WhatsApp-native Kannada grievance dispatcher with automatic geotagging and ward-officer SLA escalation tracker.',
    matches: 6,
    wins: 3,
    ties: 0,
    losses: 3,
    points: 6,
    movement: 'stable',
    avatarSeed: 'syntaxsquad',
    accentColor: '#EA580C',
    isPlayoffQualified: true,
    scoreBreakdown: {
      week1: 8.2,
      week2: 8.6,
      innovation: 8.5,
      codeQuality: 8.4,
      impact: 8.8
    }
  },
  {
    id: 'squad-5',
    rank: 5,
    name: 'Binary Brains',
    number: '#05',
    college: 'Sahyadri College of Engg',
    lead: 'Nishanth Kotian',
    members: ['Nishanth Kotian (Lead)', 'Preethi Poojary (Data)', 'Shravan Kumar (Backend)', 'Rakshitha S (Frontend)'],
    track: 'Smart Pilgrimage',
    projectName: 'YatraMitra — Offline Coastal Transit Map',
    projectSummary: 'Mesh-networking based public bus tracker and schedule predictor working without stable 4G network along Western Ghats.',
    matches: 6,
    wins: 2,
    ties: 1,
    losses: 3,
    points: 5,
    movement: 'down',
    avatarSeed: 'binarybrains',
    accentColor: '#7C3AED',
    isPlayoffQualified: false,
    scoreBreakdown: {
      week1: 7.9,
      week2: 8.1,
      innovation: 8.0,
      codeQuality: 7.9,
      impact: 8.2
    }
  },
  {
    id: 'squad-6',
    rank: 6,
    name: '404 Founders',
    number: '#06',
    college: 'St Joseph Engineering College',
    lead: 'Abhishek Shetty',
    members: ['Abhishek Shetty (Lead)', 'Sanjana Rai (Fullstack)', 'Mohan Das (AI)', 'Varun Kini (Mobile)'],
    track: 'Build For Udupi',
    projectName: 'KsheeraTrack — Dairy Farmer Purity Sentinel',
    projectSummary: 'Spectrophotometric milk fat testing reader connected via BLE to mobile app for direct cooperative society credit settlement.',
    matches: 6,
    wins: 1,
    ties: 1,
    losses: 4,
    points: 3,
    movement: 'down',
    avatarSeed: '404founders',
    accentColor: '#0D9488',
    isPlayoffQualified: false,
    scoreBreakdown: {
      week1: 7.5,
      week2: 7.7,
      innovation: 7.8,
      codeQuality: 7.4,
      impact: 8.0
    }
  },
  {
    id: 'squad-7',
    rank: 7,
    name: 'AlgoRhythm',
    number: '#07',
    college: 'PA College of Engineering',
    lead: 'Faizan Ahmed',
    members: ['Faizan Ahmed (Lead)', 'Suhana Banu (Design)', 'Rahul K (Backend)', 'Aman Ali (Frontend)'],
    track: 'AI for Governance',
    projectName: 'MedAlert — Rural PHC Medicine Supply Predictor',
    projectSummary: 'Predictive analytics model for Primary Health Centers to prevent anti-venom and essential antibiotic stockouts.',
    matches: 6,
    wins: 1,
    ties: 0,
    losses: 5,
    points: 2,
    movement: 'stable',
    avatarSeed: 'algorhythm',
    accentColor: '#3B82F6',
    isPlayoffQualified: false,
    scoreBreakdown: {
      week1: 7.2,
      week2: 7.4,
      innovation: 7.5,
      codeQuality: 7.1,
      impact: 7.6
    }
  },
  {
    id: 'squad-8',
    rank: 8,
    name: 'PixelCrafters',
    number: '#08',
    college: 'Alva\'s Institute of Engg',
    lead: 'Prajwal Hegde',
    members: ['Prajwal Hegde (Lead)', 'Swathi Rao (UI/UX)', 'Bhavya P (Frontend)', 'Darshan K (Backend)'],
    track: 'Coastal Tech',
    projectName: 'KaravaliHeritage — AR Folk Art & Yakshagana Archive',
    projectSummary: 'WebXR experience documenting Yakshagana costumes, beats, and prasangas for interactive cultural education.',
    matches: 6,
    wins: 0,
    ties: 1,
    losses: 5,
    points: 1,
    movement: 'down',
    avatarSeed: 'pixelcrafters',
    accentColor: '#F59E0B',
    isPlayoffQualified: false,
    scoreBreakdown: {
      week1: 7.0,
      week2: 7.2,
      innovation: 7.3,
      codeQuality: 7.0,
      impact: 7.1
    }
  }
];

export const TIMELINE_PHASES = [
  {
    phaseNumber: '01',
    week: 'WEEK 1 — PART 1',
    dateRange: '15 – 18 JULY 2026',
    title: 'Problem Part 1 Released',
    subHeader: 'Build • Present • Improve',
    color: 'emerald',
    badgeText: 'RELEASE & FOUNDATION',
    description: 'Core problem statement unveiled. Squads assemble, define system architecture, write baseline code, and submit initial prototype v1.0.',
    milestones: [
      'Day 1 (15 July): Track briefs revealed & mentor assignment',
      'Day 2 (16 July): Mid-sprint architecture checkpoint & repo setup',
      'Day 3 (17 July): Head-to-Head Pitch Match Day 1 (Demo v1.0)',
      'Day 4 (18 July): Mentor critique feedback & week 1 scores published'
    ]
  },
  {
    phaseNumber: '02',
    week: 'WEEK 2 — PART 2',
    dateRange: '22 – 25 JULY 2026',
    title: 'Problem Part 2 & Feature Twist Released',
    subHeader: 'Build • Present • Improve',
    color: 'blue',
    badgeText: 'ITERATION & PRESSURE TEST',
    description: 'A surprise constraint/feature layer is added. Teams must refactor, integrate live APIs, improve UI/UX, and battle in Match Day 2.',
    milestones: [
      'Day 1 (22 July): Problem Part 2 modifier released',
      'Day 2 (23 July): Deep-dive mentor code review & QA testing',
      'Day 3 (24 July): Match Day 2 face-offs & live demo showdown',
      'Day 4 (25 July): League points calculated & Top 4 per domain (12 finalists) announced'
    ]
  },
  {
    phaseNumber: '03',
    week: 'PLAYOFFS — PART 3',
    dateRange: '19 – 22 AUGUST 2026',
    title: 'Part 3 Released: Grand Finale & Crowning',
    subHeader: '12 Finalist Squads (Top 4 per Domain) Battle for the Championship',
    color: 'purple',
    badgeText: 'CHAMPIONSHIP ARENA',
    description: 'The 12 finalist squads (top 4 from each of the 3 domains) enter the physical arena. 24-hour sprint to build final production deployment, live security audit, and grand jury defense.',
    milestones: [
      'Day 1 (19 Aug): Playoff sprint begins & stadium setup',
      'Day 2 (20 Aug): Semifinal 1 (Rank 1 vs 4) & Semifinal 2 (Rank 2 vs 3)',
      'Day 3 (21 Aug): 3rd Place Match & Final Polish',
      'Day 4 (22 Aug): Grand Finale Keynote, Live Stage Pitches & Trophy Presentation'
    ]
  }
];

export const MATCH_FIXTURES: MatchFixture[] = [
  {
    id: 'match-101',
    matchNumber: 1,
    phase: 'Week 2 — Round Robin',
    week: 2,
    date: '24 July 2026',
    time: '02:00 PM IST',
    venue: 'Main Arena / Virtual Pitch A',
    status: 'completed',
    squad1: { name: 'CodeTroopers', score: 9.6, pointsEarned: 3, statusBadge: 'Winner (+3 Pts)' },
    squad2: { name: 'Ctrl Alt Elite', score: 8.9, pointsEarned: 0, statusBadge: 'Defeated' },
    challengeTrack: 'Build For Udupi (Smart Pilgrimage vs Green Drone)',
    problemSummary: 'Head-to-head architectural evaluation and offline resilience stress-test.',
    mentorInCharge: 'Mr. Gautam N Shet'
  },
  {
    id: 'match-102',
    matchNumber: 2,
    phase: 'Week 2 — Round Robin',
    week: 2,
    date: '24 July 2026',
    time: '03:30 PM IST',
    venue: 'Main Arena / Virtual Pitch B',
    status: 'completed',
    squad1: { name: 'Debuggers', score: 9.3, pointsEarned: 3, statusBadge: 'Winner (+3 Pts)' },
    squad2: { name: 'Syntax Squad', score: 8.6, pointsEarned: 0, statusBadge: 'Defeated' },
    challengeTrack: 'Coastal Tech vs AI Governance',
    problemSummary: 'Live IoT telemetry demonstration and Kannada NLP latency benchmarks.',
    mentorInCharge: 'Mr. Satvik S Bhat'
  },
  {
    id: 'match-103',
    matchNumber: 3,
    phase: 'Playoffs — Semifinal 1',
    week: 3,
    date: '20 August 2026',
    time: '10:00 AM IST',
    venue: 'Auditorium Arena Stage 1',
    status: 'upcoming',
    squad1: { name: 'CodeTroopers (Rank #1)' },
    squad2: { name: 'Syntax Squad (Rank #4)' },
    challengeTrack: 'Championship Playoff Semifinal 1',
    problemSummary: 'High-concurrency load testing, security posture, and municipal impact pitch.',
    mentorInCharge: 'Mr. Sumadh Navada & Mr. Shreyas Shenoy'
  },
  {
    id: 'match-104',
    matchNumber: 4,
    phase: 'Playoffs — Semifinal 2',
    week: 3,
    date: '20 August 2026',
    time: '02:00 PM IST',
    venue: 'Auditorium Arena Stage 2',
    status: 'upcoming',
    squad1: { name: 'Debuggers (Rank #2)' },
    squad2: { name: 'Ctrl Alt Elite (Rank #3)' },
    challengeTrack: 'Championship Playoff Semifinal 2',
    problemSummary: 'Hardware-in-the-loop IoT demo vs autonomous drone computer vision pipeline.',
    mentorInCharge: 'Mr. Vikram Poojary & Ms. K Nivedita Kamath'
  },
  {
    id: 'match-105',
    matchNumber: 5,
    phase: 'Playoffs — Grand Finale',
    week: 3,
    date: '22 August 2026',
    time: '04:00 PM IST',
    venue: 'Grand Championship Arena',
    status: 'upcoming',
    squad1: { name: 'Winner SF 1' },
    squad2: { name: 'Winner SF 2' },
    challengeTrack: 'HPL 2026 Grand Championship Trophy Match',
    problemSummary: 'Live jury Q&A, investor readiness review, and working production deployment demo.',
    mentorInCharge: 'Grand Jury Panel'
  }
];

export const MENTORS_AND_JUDGES: PersonProfile[] = [
  {
    id: 'pers-1',
    name: 'Mr. Sumadh Navada',
    title: 'Dev Intern & Community Lead',
    company: 'Unloadin, India',
    category: 'mentor',
    avatarSeed: 'sumadh',
    expertise: ['Full Stack Architecture', 'Cloud Infrastructure', 'Developer Tools'],
    bio: 'Experienced developer and hackathon veteran specializing in rapid prototyping, resilient API microservices, and student engineering mentorship.',
    availableOfficeHours: 'Wed & Fri 5:00 PM - 7:00 PM IST'
  },
  {
    id: 'pers-2',
    name: 'Mr. Gautam N Shet',
    title: 'Pre-sales Data Architect',
    company: 'Niveus Solutions',
    category: 'mentor',
    avatarSeed: 'gautam',
    expertise: ['Data Engineering', 'GCP / Cloud Native', 'Enterprise Solutions'],
    bio: 'Data architect with deep expertise in large-scale distributed databases, analytics pipelines, and technical solutioning for enterprise systems.',
    availableOfficeHours: 'Tue & Thu 6:00 PM - 8:00 PM IST'
  },
  {
    id: 'pers-3',
    name: 'Mr. Satvik S Bhat',
    title: 'Software Engineer',
    company: 'Unicourt',
    category: 'mentor',
    avatarSeed: 'satvik',
    expertise: ['Python / Django', 'Data Scraping & Pipelines', 'LegalTech Systems'],
    bio: 'Specialist in building high-throughput data extraction engines, clean modular code design, and asynchronous worker queues.',
    availableOfficeHours: 'Mon & Wed 7:00 PM - 9:00 PM IST'
  },
  {
    id: 'pers-4',
    name: 'Mr. Vikram Poojary',
    title: 'AI-ML Engineer',
    company: '890K Pvt. Ltd.',
    category: 'mentor',
    avatarSeed: 'vikram',
    expertise: ['Computer Vision', 'Deep Learning', 'Edge AI Optimization'],
    bio: 'Computer vision specialist driving edge inference deployments, PyTorch pipelines, and intelligent camera sensor networks.',
    availableOfficeHours: 'Sat 2:00 PM - 5:00 PM IST'
  },
  {
    id: 'pers-5',
    name: 'Mr. Akshay Hegde',
    title: 'AI Engineer & System Architect',
    company: '360Labs.ai',
    category: 'mentor',
    avatarSeed: 'akshay',
    expertise: ['Generative AI', 'LLM Agents', 'Production MLOps'],
    bio: 'Leading generative AI research and multi-agent system deployments with a focus on practical real-world impact.',
    availableOfficeHours: 'Daily 4:00 PM - 6:00 PM IST'
  },
  {
    id: 'pers-6',
    name: 'Mr. Prathviraj',
    title: 'Backend Developer & Founder',
    company: 'Vaan.T.in',
    category: 'judge',
    avatarSeed: 'prathviraj',
    expertise: ['System Architecture', 'Fintech / Payments', 'Startup Incubation'],
    bio: 'Founder and engineering leader focused on commercial viability, scalable fintech infrastructure, and rapid startup execution.'
  },
  {
    id: 'pers-7',
    name: 'Mr. Ramachandra',
    title: 'System Designer & Principal Consultant',
    company: 'Enterprise Solutions Consultant',
    category: 'judge',
    avatarSeed: 'ramachandra',
    expertise: ['Enterprise Architecture', 'Cybersecurity', 'High-Availability Systems'],
    bio: 'Over 15+ years evaluating mission-critical IT infrastructure, fault tolerance, and security compliance across global tech deployments.'
  },
  {
    id: 'pers-8',
    name: 'Ms. K Nivedita Kamath',
    title: 'AI-ML Engineer',
    company: 'Niveus Solutions',
    category: 'judge',
    avatarSeed: 'nivedita',
    expertise: ['Natural Language Processing', 'Data Ethics', 'Cloud AI Solutions'],
    bio: 'Pioneering multimodal conversational interfaces and responsible AI frameworks for regional language applications.'
  }
];

export const RULEBOOK_SECTIONS: RuleCategory[] = [
  {
    id: 'eligibility',
    title: '1. Eligibility & Team Formation',
    icon: 'Users',
    summary: 'Rules governing squad composition, college affiliations, and registration guidelines.',
    rules: [
      'Each squad must consist of exactly 3 to 4 registered undergraduate/postgraduate engineering or technology students.',
      'Cross-departmental and inter-disciplinary teams are strongly encouraged (e.g. 2 Developers + 1 AI/Data + 1 UI/UX & Pitch).',
      'All team members must carry valid institution ID cards throughout match days and playoff rounds.',
      'A participant cannot be registered in more than one squad concurrently.'
    ]
  },
  {
    id: 'league-format',
    title: '2. League Match Days & Points Structure',
    icon: 'Trophy',
    summary: 'How squads earn points, compete head-to-head, and qualify for playoffs.',
    rules: [
      'HPL spans 3 progressive weeks with two round-robin match fixtures and one playoff championship round.',
      'Points Allocation per match day: Win = 3 Points, Tie = 1 Point, Loss = 0 Points.',
      'In each match day, two squads in the same track present their weekly milestone build to a panel of expert mentors & judges.',
      'The top 4 squads from each of the 3 domains (12 finalist teams total) on the cumulative points table after Week 2 automatically qualify for the Grand Finale.'
    ]
  },
  {
    id: 'code-submission',
    title: '3. Code Integrity & Repository Rules',
    icon: 'Code',
    summary: 'Guidelines on Git commit history, open-source libraries, and original development.',
    rules: [
      'All squads must initialize a clean GitHub repository under the official HPL organization upon problem release.',
      'Code must be written during the official match window. Pre-built entire commercial products will lead to instant disqualification.',
      'Open-source frameworks, packages, and public APIs are permitted provided they are declared in the README.md.',
      'Frequent, descriptive git commits by all team members are evaluated as proof of authentic teamwork.'
    ]
  },
  {
    id: 'evaluation-criteria',
    title: '4. Evaluation & Judging Rubric',
    icon: 'Scale',
    summary: 'Universal evaluation across 6 core pillars for all problem statements.',
    rules: [
      'Problem Understanding: Depth of domain understanding, identification of core pain points, and user persona empathy.',
      'Functionality: End-to-end working system, core feature completeness, computational accuracy, and error resilience.',
      'User Experience: Intuitive user journey, clean navigation, accessibility, responsive UI polish, and communication clarity.',
      'Technical Implementation: Architectural robustness, clean modular code, secure API integrations, and git commit hygiene.',
      'Innovation: Originality of concept, novel feature sets, creative problem solving, and competitive differentiation.',
      'Practicality: Real-world viability, feasibility of deployment in target environments, cost efficiency, and tangible user impact.'
    ]
  },
  {
    id: 'fair-play',
    title: '5. Fair Play, Code of Conduct & Disqualification',
    icon: 'ShieldAlert',
    summary: 'Zero tolerance for plagiarism, harassment, or unethical conduct.',
    rules: [
      'Zero tolerance for plagiarized code or uncredited copying from other repositories.',
      'All participants must maintain professional respect toward mentors, judges, peers, and organizing staff.',
      'The decision of the Chief Grand Jury panel on scoring, tie-breakers, and playoff results is final and binding.'
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is the Hackathon Premier League (HPL)?',
    answer: 'HPL is a 3-week innovation tournament structured like a premier sports league. Rather than a single 24-hour sprint, teams build, test, receive mentor feedback, iterate across weekly match days, and climb the live leaderboard to qualify among the Top 4 in their domain (12 finalist teams) for the Grand Finale.'
  },
  {
    id: 'faq-2',
    category: 'Participation',
    question: 'How many members can be in a team / squad?',
    answer: 'Each squad must have 5 members. We recommend having a balanced mix of frontend, backend, AI/ML or hardware, and UI/UX design capabilities.'
  },
  {
    id: 'faq-3',
    category: 'Participation',
    question: 'Who is eligible to participate?',
    answer: 'HPL 2026 is an internal hackathon exclusively for students of Shri Madhwa Vadiraja Institute of Technology & Management (SMVITM), Bantakal. Every currently enrolled student — from any branch (CS, ECE, MECH, AIDS, AIML, MBA) and any year (1st to 4th year) — is fully eligible to participate. No prior hackathon experience is required. Just bring your passion to build!'
  },
  {
    id: 'faq-4',
    category: 'Submission',
    question: 'Will the problem statements be the same for all teams?',
    answer: 'Problem statements are categorized into 5 major tracks under the central theme "Build For Udupi!". In Week 2, a surprise twist/feature layer is added to test iterative architecture.'
  },
  {
    id: 'faq-5',
    category: 'Evaluation',
    question: 'How does the points and match day system work?',
    answer: 'In each round, squads present against another squad on live evaluation boards. A win earns +3 league points, a tie earns +1 point, and a loss earns 0. Points accumulate on the live public leaderboard.'
  },
  {
    id: 'faq-6',
    category: 'Playoffs',
    question: 'Is it mandatory to participate in all weeks?',
    answer: 'Yes! Continuous progression is the core philosophy of HPL. Week 1 lays the foundation, Week 2 introduces deep technical challenges, and the top 4 ranked teams from each domain (12 finalists) advance to the Physical Grand Finale.'
  },
  {
    id: 'faq-7',
    category: 'Event Day',
    question: 'When and where will the Grand Finale take place?',
    answer: 'The Grand Finale will take place on 22 August 2026 at the SMVITM Campus Auditorium Arena in Bantakal, Udupi, featuring live stage demos, physical trophy presentation, and venture partners.'
  }
];

export const PARTNERS_DATA = [
  { name: 'CodeTroopers', role: 'Lead Technical Club & Organizer', logoText: 'CODETROOPERS' },
  { name: 'IGNITE', role: 'Innovation & Incubation Cell', logoText: 'IGNITE' },
  { name: 'AIKYA', role: 'Cultural & Student Welfare Forum', logoText: 'AIKYA' },
  { name: 'IEEE SMVITM Student Chapter', role: 'Technical Partner', logoText: 'IEEE SMVITM' },
  { name: 'ISTE SMVITM Chapter', role: 'Academic Partner', logoText: 'ISTE SMVITM' },
];

// Convenience Aliases for Clean Component Imports
export const SQUADS = SQUADS_DATA;
export const MENTORS = MENTORS_AND_JUDGES;
export const FAQS = FAQ_DATA;
export const FAQS_DATA = FAQ_DATA;
export const PARTNERS = PARTNERS_DATA;
export const FIXTURES = MATCH_FIXTURES;


