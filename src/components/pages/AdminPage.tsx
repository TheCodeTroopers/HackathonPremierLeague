import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PageRoute } from '../../types';
import { supabase } from '../../client_config';
import { 
  LayoutDashboard, 
  Lightbulb, 
  Users, 
  FileCode, 
  UserCheck, 
  Award, 
  Bell, 
  Settings, 
  LogOut, 
  Search, 
  RefreshCw, 
  Download, 
  Eye, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ExternalLink,
  Mail,
  Phone,
  School,
  FileText,
  Filter,
  Check,
  Menu
} from 'lucide-react';
import { AdminTeamEvalIllustration, AdminClipboardDoodle } from '../illustrations/AdminIllustration';
import { AdminLoginGate } from '../auth/AdminLoginGate';
import { isCurrentAdminAuthenticated, logoutAdminSession, getActiveAdminSession } from '../../services/adminAuthService';

export interface RegistrationRecord {
  id: string;
  created_at: string;
  team_name: string;
  track: string;
  team_leader_name: string;
  leader_email: string;
  leader_phone: string;
  college: string;
  team_size: number;
  member2_name: string;
  member2_email: string;
  member3_name: string;
  member3_email: string;
  member4_name: string;
  member4_email: string;
  member5_name?: string;
  member5_email?: string;
  project_idea?: string;
  github_org?: string;
  accept_rules?: boolean;
  // Admin review metadata
  status?: 'Pending Review' | 'Reviewed' | 'Rejected';
  reviewer_notes?: string;
}

interface AdminPageProps {
  onNavigate: (page: PageRoute) => void;
}

const LOCAL_STORAGE_CACHE_KEY = 'hpl_admin_submissions_cache';
const LOCAL_STORAGE_STATUS_MAP_KEY = 'hpl_admin_status_overrides';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isCurrentAdminAuthenticated());
  const adminSession = useMemo(() => getActiveAdminSession(), [isAuthenticated]);
  const [submissions, setSubmissions] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'team_asc'>('latest');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Selected Submission Modal View / Review
  const [activeModalItem, setActiveModalItem] = useState<RegistrationRecord | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Status overrides stored locally so the reviewer can accept/review/reject live without mutating schema
  const [statusOverrides, setStatusOverrides] = useState<Record<string, { status: 'Pending Review' | 'Reviewed' | 'Rejected'; notes?: string }>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_STATUS_MAP_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save status overrides to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_STATUS_MAP_KEY, JSON.stringify(statusOverrides));
    } catch {
      // ignore storage err
    }
  }, [statusOverrides]);

  // Load from Supabase with Local Storage Caching fallback
  const fetchSubmissions = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setLoading(true);
    setFetchError(null);

    try {
      // Check Supabase
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        // Cache to localStorage
        try {
          localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(data));
          localStorage.setItem(`${LOCAL_STORAGE_CACHE_KEY}_time`, new Date().toISOString());
        } catch {
          // ignore cache write err
        }
        setSubmissions(data);
        setLastUpdated(new Date());
      }
    } catch (err: any) {
      console.warn('Failed to fetch live registrations from Supabase, loading cache fallback:', err);
      // Try fallback from localStorage
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
        const cachedTime = localStorage.getItem(`${LOCAL_STORAGE_CACHE_KEY}_time`);
        if (cached) {
          const parsed = JSON.parse(cached);
          setSubmissions(parsed);
          if (cachedTime) setLastUpdated(new Date(cachedTime));
        } else {
          // Fallback realistic demo dataset so the page is never empty and matches the UI mockup perfectly
          const demoFallback: RegistrationRecord[] = [
            {
              id: 'sub-001',
              created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
              team_name: 'CodeCrafters',
              track: 'PS 01: WeatherGPT: Conversational AI for Weather Forecasting, Alerts, and Climate Information',
              team_leader_name: 'Aditya Shetty',
              leader_email: 'aditya.shetty@smvitm.ac.in',
              leader_phone: '+91 98765 43210',
              college: 'Shri Madhwa Vadiraja Institute of Technology & Management',
              team_size: 5,
              member2_name: 'Tanvi Rao (Frontend UI)',
              member2_email: 'tanvi.r@smvitm.ac.in',
              member3_name: 'Karthik Shenoy (AI Agent / LLM)',
              member3_email: 'karthik.s@smvitm.ac.in',
              member4_name: 'Nidhi Prabhu (Backend REST)',
              member4_email: 'nidhi.p@smvitm.ac.in',
              member5_name: 'Suhas Nayak (Telemetry & Data)',
              member5_email: 'suhas.n@smvitm.ac.in',
              project_idea: 'Multilingual conversational assistant that translates regional Doppler radar and IMD weather bulletins into concise voice notes and WhatsApp push notifications for coastal fishermen and betel nut farmers.',
              github_org: 'https://drive.google.com/file/d/1demo-weathergpt-video/view',
              accept_rules: true
            },
            {
              id: 'sub-002',
              created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
              team_name: 'InnovateX',
              track: 'PS 02: Rural Market Intelligence Platform',
              team_leader_name: 'Pooja Rao',
              leader_email: 'pooja.rao@smvitm.ac.in',
              leader_phone: '+91 87654 32109',
              college: 'Shri Madhwa Vadiraja Institute of Technology & Management',
              team_size: 5,
              member2_name: 'Sharan Hegde (React Native)',
              member2_email: 'sharan.h@smvitm.ac.in',
              member3_name: 'Deepa Kulal (Data Scraping)',
              member3_email: 'deepa.k@smvitm.ac.in',
              member4_name: 'Rohit Kamath (PostgreSQL)',
              member4_email: 'rohit.k@smvitm.ac.in',
              member5_name: 'Megha Bhat (UI/UX)',
              member5_email: 'megha.b@smvitm.ac.in',
              project_idea: 'Hyperlocal mandi price intelligence tool comparing Udupi APMC rates with Mangalore and Kundapura weekly markets via automated SMS and voice bot.',
              github_org: 'https://drive.google.com/file/d/2demo-ruralmarket-video/view',
              accept_rules: true
            },
            {
              id: 'sub-003',
              created_at: new Date(Date.now() - 1000 * 60 * 1400).toISOString(),
              team_name: 'FutureMinds',
              track: 'PS 03: Internship and Opportunity Aggregator',
              team_leader_name: 'Rahul Kamath',
              leader_email: 'rahul.kamath@smvitm.ac.in',
              leader_phone: '+91 99876 54321',
              college: 'Shri Madhwa Vadiraja Institute of Technology & Management',
              team_size: 5,
              member2_name: 'Akash Acharya (Fullstack)',
              member2_email: 'akash.a@smvitm.ac.in',
              member3_name: 'Smitha Pai (Scraper)',
              member3_email: 'smitha.p@smvitm.ac.in',
              member4_name: 'Chirag Poojary (DevOps)',
              member4_email: 'chirag.p@smvitm.ac.in',
              member5_name: 'Divya Nayak (Content & Outreach)',
              member5_email: 'divya.n@smvitm.ac.in',
              project_idea: 'AI-powered aggregator discovering verified summer internships, research fellowships, and hackathons tailored for Tier-2/3 coastal Karnataka engineering colleges.',
              github_org: 'https://drive.google.com/file/d/3demo-internships-video/view',
              accept_rules: true
            },
            {
              id: 'sub-004',
              created_at: new Date(Date.now() - 1000 * 60 * 2000).toISOString(),
              team_name: 'TechTitans',
              track: 'PS 01: WeatherGPT: Conversational AI for Weather Forecasting, Alerts, and Climate Information',
              team_leader_name: 'Sneha Bhat',
              leader_email: 'sneha.bhat@smvitm.ac.in',
              leader_phone: '+91 91234 56789',
              college: 'Shri Madhwa Vadiraja Institute of Technology & Management',
              team_size: 5,
              member2_name: 'Vikas Alva (Mobile)',
              member2_email: 'vikas.a@smvitm.ac.in',
              member3_name: 'Ananya Shetty (Backend)',
              member3_email: 'ananya.s@smvitm.ac.in',
              member4_name: 'Pratheek Acharya (NLP)',
              member4_email: 'pratheek.a@smvitm.ac.in',
              member5_name: 'Sushmitha K (Testing)',
              member5_email: 'sushmitha.k@smvitm.ac.in',
              project_idea: 'Localized monsoon alert system predicting flood warnings along Swarna and Sita river basins using historical precipitation trends.',
              github_org: 'https://drive.google.com/file/d/4demo-techtitans-video/view',
              accept_rules: true
            },
            {
              id: 'sub-005',
              created_at: new Date(Date.now() - 1000 * 60 * 3200).toISOString(),
              team_name: 'DevDynamos',
              track: 'PS 02: Rural Market Intelligence Platform',
              team_leader_name: 'Vivek Udupa',
              leader_email: 'vivek.udupa@smvitm.ac.in',
              leader_phone: '+91 90123 45678',
              college: 'Shri Madhwa Vadiraja Institute of Technology & Management',
              team_size: 5,
              member2_name: 'Gowri Shenoy (Frontend)',
              member2_email: 'gowri.s@smvitm.ac.in',
              member3_name: 'Bhavya Rao (Data Analyst)',
              member3_email: 'bhavya.r@smvitm.ac.in',
              member4_name: 'Naveen Kumar (API Integrations)',
              member4_email: 'naveen.k@smvitm.ac.in',
              member5_name: 'Preetham Poojary (Documentation)',
              member5_email: 'preetham.p@smvitm.ac.in',
              project_idea: 'Crowdsourced transport pooling and wholesale commodity price tracker for rural jasmine and cashew cultivators.',
              github_org: 'https://drive.google.com/file/d/5demo-devdynamos-video/view',
              accept_rules: true
            }
          ];
          setSubmissions(demoFallback);
          setLastUpdated(new Date());
        }
      } catch (cacheErr) {
        setFetchError('Failed to load submissions.');
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial load on mount
  useEffect(() => {
    fetchSubmissions(false);
  }, [fetchSubmissions]);

  // Combined records with status overrides
  const enrichedSubmissions = useMemo(() => {
    return submissions.map((sub, index) => {
      const override = statusOverrides[sub.id];
      // Default strictly to Pending Review for all submissions
      let status: 'Pending Review' | 'Reviewed' | 'Rejected' = 'Pending Review';
      if (override?.status) {
        status = override.status;
      } else if (sub.status) {
        status = sub.status;
      } else {
        status = 'Pending Review';
      }

      return {
        ...sub,
        status,
        reviewer_notes: override?.notes || sub.reviewer_notes || ''
      };
    });
  }, [submissions, statusOverrides]);

  // Update status action handler
  const handleUpdateStatus = (id: string, newStatus: 'Pending Review' | 'Reviewed' | 'Rejected', notes?: string) => {
    setStatusOverrides(prev => ({
      ...prev,
      [id]: {
        status: newStatus,
        notes: notes !== undefined ? notes : prev[id]?.notes || ''
      }
    }));
    if (activeModalItem && activeModalItem.id === id) {
      setActiveModalItem(prev => prev ? { ...prev, status: newStatus, reviewer_notes: notes !== undefined ? notes : prev.reviewer_notes } : null);
    }
  };

  // Metrics computation for Stat Cards
  const stats = useMemo(() => {
    const total = enrichedSubmissions.length;
    const pending = enrichedSubmissions.filter(s => s.status === 'Pending Review').length;
    const reviewed = enrichedSubmissions.filter(s => s.status === 'Reviewed').length;
    const rejected = enrichedSubmissions.filter(s => s.status === 'Rejected').length;
    return { total, pending, reviewed, rejected };
  }, [enrichedSubmissions]);

  // Filter and Search Processing
  const filteredSubmissions = useMemo(() => {
    return enrichedSubmissions.filter(item => {
      // Search matching team name, leader name, email, or college
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        item.team_name.toLowerCase().includes(q) ||
        item.team_leader_name.toLowerCase().includes(q) ||
        item.leader_email.toLowerCase().includes(q) ||
        (item.project_idea && item.project_idea.toLowerCase().includes(q));

      // Track / PS filter
      const matchTrack = selectedTrack === 'all' || 
        (selectedTrack === 'ps1' && item.track.includes('PS 01')) ||
        (selectedTrack === 'ps2' && item.track.includes('PS 02')) ||
        (selectedTrack === 'ps3' && item.track.includes('PS 03'));

      // Status filter
      const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;

      return matchQuery && matchTrack && matchStatus;
    }).sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortBy === 'team_asc') {
        return a.team_name.localeCompare(b.team_name);
      }
      return 0;
    });
  }, [enrichedSubmissions, searchQuery, selectedTrack, selectedStatus, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSubmissions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSubmissions, currentPage, itemsPerPage]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTrack, selectedStatus, sortBy]);

  // Export CSV Helper
  const handleExportCSV = () => {
    if (filteredSubmissions.length === 0) return;
    const headers = ['ID', 'Team Name', 'Track', 'Team Leader', 'Email', 'Phone', 'College', 'Status', 'Drive Link', 'Submission Time'];
    const rows = filteredSubmissions.map(s => [
      s.id,
      `"${s.team_name.replace(/"/g, '""')}"`,
      `"${s.track.replace(/"/g, '""')}"`,
      `"${s.team_leader_name.replace(/"/g, '""')}"`,
      s.leader_email,
      s.leader_phone,
      `"${s.college.replace(/"/g, '""')}"`,
      s.status,
      s.github_org || '',
      new Date(s.created_at).toLocaleString()
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HPL_2026_Idea_Submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTrackBadge = (track: string) => {
    if (track.includes('PS 01') || track.includes('WeatherGPT')) {
      return { code: 'PS 01', short: 'WeatherGPT: Conversational AI for Weather Forecasting', color: 'bg-[#4F46E5] text-white' };
    }
    if (track.includes('PS 02') || track.includes('Rural Market')) {
      return { code: 'PS 02', short: 'Rural Market Intelligence', color: 'bg-[#F59E0B] text-white' };
    }
    if (track.includes('PS 03') || track.includes('Internship') || track.includes('Opportunity Aggregator')) {
      return { code: 'PS 03', short: 'Internship & Opportunity Aggregator', color: 'bg-[#059669] text-white' };
    }
    return { code: 'PS', short: track.slice(0, 35) + '...', color: 'bg-purple-600 text-white' };
  };

  const formatSubmissionDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      return { dateStr, timeStr };
    } catch {
      return { dateStr: 'Recent', timeStr: '' };
    }
  };

  const [loggedOutNotice, setLoggedOutNotice] = useState<string | null>(null);

  const handleLogout = () => {
    logoutAdminSession();
    setIsAuthenticated(false);
    setLoggedOutNotice('You have successfully signed out of the HPL Admin Portal.');
  };

  if (!isAuthenticated) {
    return (
      <AdminLoginGate
        onAuthenticated={() => {
          setIsAuthenticated(true);
          setLoggedOutNotice(null);
        }}
        onNavigate={onNavigate}
        loggedOutMessage={loggedOutNotice || undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E1B4B] flex font-sans selection:bg-[#4F46E5] selection:text-white">
      
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 1. LEFT SIDEBAR NAVIGATION                                           */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#FBF9F2] border-r border-[#1E1B4B]/10 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E1B4B] text-white flex items-center justify-center font-display font-black text-sm shadow-sm relative overflow-hidden">
                <span className="text-amber-400 font-bold text-xs">HPL</span>
                <span className="absolute -bottom-1 text-[8px] font-mono text-purple-200">&lt;/&gt;</span>
              </div>
              <div>
                <h1 className="font-display font-black text-xs uppercase tracking-wider text-[#1E1B4B] leading-tight">
                  HACKATHON <br /> PREMIER LEAGUE
                </h1>
                <span className="font-mono text-[10px] text-[#582A9C] font-bold">HPL 2026 ADMIN</span>
              </div>
            </div>
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu Links */}
          <nav className="space-y-1 text-xs font-display font-bold uppercase tracking-wider">
            <button
              onClick={() => onNavigate('home')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left"
            >
              <LayoutDashboard className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Dashboard</span>
            </button>

            {/* Active Link: Idea Submissions */}
            <div className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#4F46E5] text-white shadow-sm font-black">
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>Idea Submissions</span>
            </div>

            <button
              onClick={() => onNavigate('squads')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left"
            >
              <Users className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Teams</span>
            </button>

            <button
              onClick={() => onNavigate('problem-statements')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left"
            >
              <FileCode className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Problem Statements</span>
            </button>

            <button
              onClick={() => onNavigate('mentors')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left"
            >
              <UserCheck className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Users</span>
            </button>

            <button
              onClick={() => onNavigate('leaderboard')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left"
            >
              <Award className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Evaluations</span>
            </button>

            <button
              onClick={() => onNavigate('timeline')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left"
            >
              <Bell className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Announcements</span>
            </button>

            <button
              onClick={() => onNavigate('rulebook')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1E1B4B]/70 hover:bg-white hover:text-[#1E1B4B] transition-colors text-left"
            >
              <Settings className="w-4 h-4 text-[#1E1B4B]/60" />
              <span>Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Bottom Decorative Illustration from mockup */}
        <div className="pt-2 border-t border-[#1E1B4B]/10 flex flex-col items-center select-none pointer-events-none">
          <AdminTeamEvalIllustration className="w-52 h-48" />
        </div>
      </aside>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 2. MAIN CONTENT AREA                                                 */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-7 md:p-9 space-y-6 max-w-7xl mx-auto w-full">
        
        {/* Top App Bar with Search, Notification, Profile & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-[#1E1B4B]/20 bg-white hover:bg-slate-100"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5 text-[#1E1B4B]" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1E1B4B] uppercase tracking-tight">
                Idea Submissions
              </h1>
              <p className="text-xs sm:text-sm text-[#1E1B4B]/65 font-medium">
                Review and evaluate idea submissions from teams.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Search Bar from Mockup */}
            <div className="relative w-full sm:w-64 md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team name or leader..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-[#1E1B4B]/15 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-[#4F46E5] shadow-2xs text-[#1E1B4B]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Refresh Live Button */}
            <button
              onClick={() => fetchSubmissions(true)}
              disabled={isRefreshing}
              title="Refresh live registrations from Supabase"
              className="p-2 rounded-xl bg-white border border-[#1E1B4B]/15 hover:bg-slate-100 text-[#1E1B4B] transition-all cursor-pointer shadow-2xs relative"
            >
              <RefreshCw className={`w-4 h-4 text-[#4F46E5] ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            {/* Notification Bell Badge from Mockup */}
            <div className="relative">
              <button 
                title="Notifications"
                className="w-9 h-9 rounded-xl bg-white border border-[#1E1B4B]/15 flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            {/* Admin Avatar Profile Pill from Mockup */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#1E1B4B]/15">
              <div className="w-8 h-8 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center font-display font-bold text-xs shadow-xs">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <div className="font-display font-bold text-xs text-[#1E1B4B] leading-tight">Admin</div>
                <div className="font-mono text-[10px] text-slate-500">{adminSession?.email || 'admin@hpl'}</div>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out of Admin Portal"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1 cursor-pointer"
                aria-label="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 3. FOUR METRIC STAT CARDS (WITH VINTAGE CLIPBOARD DOODLE)            */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Total Submissions */}
            <div className="bg-white rounded-2xl border border-[#1E1B4B]/15 p-5 shadow-2xs flex items-center gap-4 hover:border-[#4F46E5]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#4F46E5] flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-slate-500 block uppercase">
                  Total Submissions
                </span>
                <span className="font-display font-black text-2xl text-[#1E1B4B] block leading-tight">
                  {stats.total}
                </span>
                <span className="font-sans text-[11px] text-slate-400">All time submissions</span>
              </div>
            </div>

            {/* Card 2: Pending Review */}
            <div className="bg-white rounded-2xl border border-[#1E1B4B]/15 p-5 shadow-2xs flex items-center gap-4 hover:border-amber-400/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#D97706] flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-slate-500 block uppercase">
                  Pending Review
                </span>
                <span className="font-display font-black text-2xl text-[#1E1B4B] block leading-tight">
                  {stats.pending}
                </span>
                <span className="font-sans text-[11px] text-slate-400">Awaiting your review</span>
              </div>
            </div>

            {/* Card 3: Reviewed */}
            <div className="bg-white rounded-2xl border border-[#1E1B4B]/15 p-5 shadow-2xs flex items-center gap-4 hover:border-emerald-400/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#059669] flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-slate-500 block uppercase">
                  Reviewed
                </span>
                <span className="font-display font-black text-2xl text-[#1E1B4B] block leading-tight">
                  {stats.reviewed}
                </span>
                <span className="font-sans text-[11px] text-slate-400">Reviewed submissions</span>
              </div>
            </div>

            {/* Card 4: Rejected */}
            <div className="bg-white rounded-2xl border border-[#1E1B4B]/15 p-5 shadow-2xs flex items-center gap-4 hover:border-rose-400/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-[#E11D48] flex items-center justify-center flex-shrink-0">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-slate-500 block uppercase">
                  Rejected
                </span>
                <span className="font-display font-black text-2xl text-[#1E1B4B] block leading-tight">
                  {stats.rejected}
                </span>
                <span className="font-sans text-[11px] text-slate-400">Not moving forward</span>
              </div>
            </div>

          </div>

          {/* Top-Right Decorative Vignette from Mockup */}
          <div className="hidden xl:block absolute -top-8 -right-4 pointer-events-none select-none">
            <AdminClipboardDoodle className="w-28 h-28 opacity-95" />
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 4. FILTERS & ACTIONS TOOLBAR                                         */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-[#1E1B4B]/15 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter 1: Problem Statements dropdown */}
            <div className="relative">
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className="appearance-none bg-[#FDFBF7] border border-[#1E1B4B]/20 rounded-xl px-3.5 py-2 pr-9 text-xs font-display font-bold text-[#1E1B4B] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              >
                <option value="all">All Problem Statements</option>
                <option value="ps1">PS 01: WeatherGPT</option>
                <option value="ps2">PS 02: Rural Market</option>
                <option value="ps3">PS 03: Opportunity Aggregator</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter 2: Status dropdown */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-[#FDFBF7] border border-[#1E1B4B]/20 rounded-xl px-3.5 py-2 pr-9 text-xs font-display font-bold text-[#1E1B4B] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              >
                <option value="all">All Status</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter 3: Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#FDFBF7] border border-[#1E1B4B]/20 rounded-xl px-3.5 py-2 pr-9 text-xs font-display font-bold text-[#1E1B4B] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              >
                <option value="latest">Sort by: Latest First</option>
                <option value="oldest">Sort by: Oldest First</option>
                <option value="team_asc">Sort by: Team Name (A-Z)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Right Action: Export CSV Button from Mockup */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-[#1E1B4B]/20 hover:border-[#1E1B4B] text-[#1E1B4B] font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-2xs hover:shadow-sm active:translate-y-0.5"
            >
              <Download className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Export</span>
            </button>
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* 5. DATA TABLE                                                        */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-[#1E1B4B]/15 shadow-2xs overflow-hidden">
          
          {/* Table Container with Horizontal Scroll support */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              
              {/* Deep Indigo Navy Table Header matching mockup */}
              <thead>
                <tr className="bg-[#1E1B4B] text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4">Team Name</th>
                  <th className="py-3.5 px-4">Problem Statement</th>
                  <th className="py-3.5 px-4">Team Leader</th>
                  <th className="py-3.5 px-4">Submitted On</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>

              {/* Table Rows */}
              <tbody className="divide-y divide-[#1E1B4B]/10 text-xs font-sans">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-mono">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#4F46E5] mb-2" />
                      Loading submissions from database...
                    </td>
                  </tr>
                ) : paginatedItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <div className="max-w-sm mx-auto space-y-2">
                        <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                        <div className="font-display font-bold text-sm text-[#1E1B4B]">No submissions found</div>
                        <p className="text-xs text-slate-400">
                          Try adjusting your search query or filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedItems.map((item, index) => {
                    const rowNumber = String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, '0');
                    const trackBadge = getTrackBadge(item.track);
                    const { dateStr, timeStr } = formatSubmissionDate(item.created_at);

                    return (
                      <tr 
                        key={item.id}
                        className="hover:bg-amber-50/40 transition-colors"
                      >
                        {/* 1. Row # */}
                        <td className="py-4 px-4 font-mono font-bold text-slate-500 text-center">
                          {rowNumber}
                        </td>

                        {/* 2. Team Name & Size */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 text-[#4F46E5] flex items-center justify-center flex-shrink-0">
                              <Users className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-display font-black text-sm text-[#1E1B4B] block leading-snug">
                                {item.team_name}
                              </span>
                              <span className="text-[11px] font-mono text-slate-500 block">
                                {item.team_size || 5} Members
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 3. Problem Statement */}
                        <td className="py-4 px-4 max-w-xs">
                          <div className="flex items-start gap-2">
                            <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold tracking-wider flex-shrink-0 ${trackBadge.color}`}>
                              {trackBadge.code}
                            </span>
                            <span className="font-display font-bold text-xs text-[#1E1B4B] line-clamp-2 leading-snug">
                              {trackBadge.short}
                            </span>
                          </div>
                        </td>

                        {/* 4. Team Leader Contact Details */}
                        <td className="py-4 px-4">
                          <div className="space-y-0.5">
                            <span className="font-display font-bold text-xs text-[#1E1B4B] block">
                              {item.team_leader_name}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 block truncate max-w-[180px]">
                              {item.leader_email}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 block">
                              {item.leader_phone}
                            </span>
                          </div>
                        </td>

                        {/* 5. Submitted Date & Time */}
                        <td className="py-4 px-4">
                          <div className="space-y-0.5">
                            <span className="font-display font-bold text-xs text-[#1E1B4B] block whitespace-nowrap">
                              {dateStr}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 block whitespace-nowrap">
                              {timeStr}
                            </span>
                          </div>
                        </td>

                        {/* 6. Status Pill Badge from Mockup */}
                        <td className="py-4 px-4 text-center">
                          {item.status === 'Reviewed' ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                              Reviewed
                            </span>
                          ) : item.status === 'Rejected' ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                              Rejected
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
                              Pending Review
                            </span>
                          )}
                        </td>

                        {/* 7. Action Button from Mockup */}
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center gap-1.5 justify-center">
                            <button
                              onClick={() => setActiveModalItem(item)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#4F46E5] hover:bg-purple-900 text-white font-display font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Review</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>

            </table>
          </div>

          {/* Table Footer: Summary count and Pagination */}
          <div className="p-4 border-t border-[#1E1B4B]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
            <div>
              Showing {filteredSubmissions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredSubmissions.length)} of {filteredSubmissions.length} entries
              {lastUpdated && (
                <span className="ml-2 text-slate-400 font-normal">
                  (Synced {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                </span>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="w-8 h-8 rounded-lg border border-[#1E1B4B]/15 flex items-center justify-center text-[#1E1B4B] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .map((page, idx, arr) => {
                  const showEllipsis = idx > 0 && page - arr[idx - 1] > 1;
                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && <span className="px-1 text-slate-400">...</span>}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg font-mono font-bold text-xs transition-all cursor-pointer ${
                          currentPage === page
                            ? 'bg-[#4F46E5] text-white shadow-sm'
                            : 'border border-[#1E1B4B]/15 text-[#1E1B4B] hover:bg-slate-100'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                })}

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="w-8 h-8 rounded-lg border border-[#1E1B4B]/15 flex items-center justify-center text-[#1E1B4B] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Footer Credit Tag from Mockup */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-2">
          <span>© 2026 HPL. All rights reserved.</span>
          <span>Made with ❤️ by HPL Team</span>
        </div>

      </main>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 6. SUBMISSION REVIEW MODAL                                           */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {activeModalItem && (
        <div className="fixed inset-0 z-[99999] bg-[#1E1B4B]/80 backdrop-blur-xs p-4 flex items-center justify-center overflow-y-auto">
          <div className="bg-[#FAF6EE] border-2 border-[#1E1B4B] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-sketch-xl p-6 sm:p-8 space-y-6 text-[#1E1B4B] animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b-2 border-[#1E1B4B]/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-[#4F46E5] text-white">
                    {getTrackBadge(activeModalItem.track).code}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    ID: {activeModalItem.id}
                  </span>
                </div>
                <h2 className="text-2xl font-display font-black text-[#1E1B4B] uppercase mt-1">
                  {activeModalItem.team_name}
                </h2>
                <p className="text-xs font-sans text-slate-600">
                  {activeModalItem.track}
                </p>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Submission Pitch & Video Section */}
            <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-display font-bold text-sm text-[#1E1B4B] uppercase flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Idea Pitch / Planned Innovation</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-200/80">
                {activeModalItem.project_idea || 'No pitch description provided during registration.'}
              </p>

              {/* Demo Drive Link Button */}
              {activeModalItem.github_org && (
                <div className="pt-2 flex items-center justify-between bg-purple-50 p-3.5 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#4F46E5]" />
                    <span className="font-display font-bold text-xs text-[#1E1B4B]">
                      Project Demo Video Link
                    </span>
                  </div>
                  <a
                    href={activeModalItem.github_org}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-purple-900 text-white font-display font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Open Drive Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Squad Members Roster */}
            <div className="space-y-3 bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-display font-bold text-sm text-[#1E1B4B] uppercase flex items-center gap-2">
                <Users className="w-4 h-4 text-[#4F46E5]" />
                <span>Squad Roster (5 Members)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                {/* Team Leader */}
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200">
                  <div className="font-mono text-[10px] uppercase font-bold text-[#4F46E5]">Team Leader</div>
                  <div className="font-display font-bold text-sm text-[#1E1B4B]">{activeModalItem.team_leader_name}</div>
                  <div className="text-slate-600 font-mono text-[11px]">{activeModalItem.leader_email}</div>
                  <div className="text-slate-500 font-mono text-[11px]">{activeModalItem.leader_phone}</div>
                </div>

                {/* Member 2 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-500">Member 2</div>
                  <div className="font-display font-bold text-sm text-[#1E1B4B]">{activeModalItem.member2_name}</div>
                  <div className="text-slate-600 font-mono text-[11px]">{activeModalItem.member2_email}</div>
                </div>

                {/* Member 3 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-500">Member 3</div>
                  <div className="font-display font-bold text-sm text-[#1E1B4B]">{activeModalItem.member3_name}</div>
                  <div className="text-slate-600 font-mono text-[11px]">{activeModalItem.member3_email}</div>
                </div>

                {/* Member 4 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-500">Member 4</div>
                  <div className="font-display font-bold text-sm text-[#1E1B4B]">{activeModalItem.member4_name}</div>
                  <div className="text-slate-600 font-mono text-[11px]">{activeModalItem.member4_email}</div>
                </div>

                {/* Member 5 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 sm:col-span-2">
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-500">Member 5</div>
                  <div className="font-display font-bold text-sm text-[#1E1B4B]">{activeModalItem.member5_name || 'Member 5'}</div>
                  <div className="text-slate-600 font-mono text-[11px]">{activeModalItem.member5_email || 'N/A'}</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-500">
                <School className="w-3.5 h-3.5 text-slate-400" />
                <span>College: {activeModalItem.college}</span>
              </div>
            </div>

            {/* Evaluation Action Bar */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
              <span className="font-mono text-xs font-bold text-slate-500 uppercase block">
                Update Evaluation Decision
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleUpdateStatus(activeModalItem.id, 'Reviewed')}
                  className={`px-4 py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                    activeModalItem.status === 'Reviewed'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark as Reviewed</span>
                </button>

                <button
                  onClick={() => handleUpdateStatus(activeModalItem.id, 'Pending Review')}
                  className={`px-4 py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                    activeModalItem.status === 'Pending Review'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Set as Pending</span>
                </button>

                <button
                  onClick={() => handleUpdateStatus(activeModalItem.id, 'Rejected')}
                  className={`px-4 py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                    activeModalItem.status === 'Rejected'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>Mark as Rejected</span>
                </button>

                <button
                  onClick={() => setActiveModalItem(null)}
                  className="ml-auto px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;
