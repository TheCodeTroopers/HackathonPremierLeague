import React, { useEffect, useMemo, useState } from 'react';
import { 
    ArrowRight, 
    CheckCircle2, 
    ChevronLeft, 
    LockKeyhole, 
    ShieldCheck, 
    Users, 
    Mail, 
    Phone, 
    School, 
    Sparkles,
    Check,
    KeyRound,
    LayoutDashboard,
    Compass,
    Settings,
    LogOut,
    Edit3,
    Save,
    Calendar,
    ExternalLink,
    AlertCircle,
    Trophy,
    Shield,
    MessageCircle,
    FileText,
    Target,
    Layers,
    Lightbulb,
    ChevronRight,
    Menu,
    X,
    User
} from 'lucide-react';
import { PageRoute } from '../../types';
import { SHORTLISTED_TEAMS_DATA } from '../../data/hplData';
import { ROUND2_PROBLEM_STATEMENTS } from './ProblemStatementsPage';
import { 
    changeTeamPassword, 
    findTeamRegistration, 
    findTeamRegistrationByEmail,
    getTeamPassword, 
    TeamRegistration,
    getActiveTeamSession,
    saveActiveTeamSession,
    clearActiveTeamSession,
    OFFICIAL_QUALIFIED_TEAMS,
    findQualifiedTeamByEmail,
    findQualifiedTeamBySquadId,
    findQualifiedTeamByName
} from '../../services/teamPortalService';
import { ProfileIllustration } from '../illustrations/ProfileIllustration';
import { supabase } from '../../client_config';

interface TeamAccessPageProps {
    view?: 'login' | 'profile' | 'select' | 'portal';
    squadId: string | null;
    onNavigate: (page: PageRoute) => void;
}

type TabKey = 'overview' | 'roster' | 'challenge' | 'settings';

const SELECTIONS_KEY = 'hpl-round2-ps-selections';
type Selections = Record<string, string>;

const getResolvedTeam = (squadId: string | null) => {
    const activeSession = getActiveTeamSession();
    const effectiveSquadId = squadId || activeSession?.squadId || null;
    if (!effectiveSquadId) return null;

    const record = findQualifiedTeamBySquadId(effectiveSquadId) || (activeSession?.teamName ? findQualifiedTeamByName(activeSession.teamName) : null);
    if (record) {
        return { rank: record.rank, name: record.teamName, squadId: record.squadId };
    }

    const rank = Number(effectiveSquadId?.split('-').pop() || 0);
    return rank >= 1 && rank <= SHORTLISTED_TEAMS_DATA.length
        ? { rank, name: SHORTLISTED_TEAMS_DATA[rank - 1], squadId: `HPL-R2-${String(rank).padStart(2, '0')}` }
        : null;
};

const readSelections = (): Selections => {
    try {
        const value = window.localStorage.getItem(SELECTIONS_KEY);
        return value ? JSON.parse(value) as Selections : {};
    } catch {
        return {};
    }
};

export const TeamAccessPage: React.FC<TeamAccessPageProps> = ({ view, squadId, onNavigate }) => {
    // Map initial tab based on route view and lock status
    const [activeTab, setActiveTab] = useState<TabKey>(() => {
        if (view === 'select') return 'challenge';
        if (view === 'profile' || view === 'portal') return 'overview';

        const session = getActiveTeamSession();
        if (session) {
            const currentSelections = readSelections();
            const hasLocked = !!(currentSelections[session.squadId] || currentSelections[session.teamName] || currentSelections[`squad-${session.rank}`]);
            return hasLocked ? 'overview' : 'challenge';
        }
        return 'overview';
    });

    const [resolvedSquadId, setResolvedSquadId] = useState<string | null>(squadId);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const activeSession = getActiveTeamSession();
    const team = useMemo(() => getResolvedTeam(resolvedSquadId || activeSession?.squadId || null), [resolvedSquadId, activeSession]);

    // Sign in state
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!activeSession && (!squadId || activeSession.squadId === squadId);
    });

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Registration data for this team
    const [registration, setRegistration] = useState<TeamRegistration | null>(null);
    const [registrationLoading, setRegistrationLoading] = useState(true);

    // Editable member fields
    const [isEditingRoster, setIsEditingRoster] = useState(false);
    const [leaderPhone, setLeaderPhone] = useState('');
    const [collegeName, setCollegeName] = useState('');
    const [member2Name, setMember2Name] = useState('');
    const [member2Email, setMember2Email] = useState('');
    const [member3Name, setMember3Name] = useState('');
    const [member3Email, setMember3Email] = useState('');
    const [member4Name, setMember4Name] = useState('');
    const [member4Email, setMember4Email] = useState('');
    const [member5Name, setMember5Name] = useState('');
    const [member5Email, setMember5Email] = useState('');
    const [rosterSaveMessage, setRosterSaveMessage] = useState('');
    const [isSavingRoster, setIsSavingRoster] = useState(false);

    // Settings (Change Password)
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Problem Statement selection state
    const [selections, setSelections] = useState<Selections>(() => readSelections());
    const [selectedPs, setSelectedPs] = useState('');
    const [psError, setPsError] = useState('');
    const [lockSuccessMessage, setLockSuccessMessage] = useState('');

    // Fetch this team's registration details from Supabase
    useEffect(() => {
        let isMounted = true;
        const loadRegistration = async () => {
            if (!team) {
                setRegistrationLoading(false);
                return;
            }
            try {
                let reg = await findTeamRegistrationByEmail(team.leaderEmail);
                if (!reg) {
                    reg = await findTeamRegistration(team.name);
                }
                
                if (!reg) {
                    reg = {
                        id: `reg-${team.squadId}`,
                        team_name: team.name,
                        team_leader_name: 'Team Leader',
                        leader_email: team.leaderEmail,
                        leader_phone: '',
                        college: 'SMVITM / Associated Institution',
                        team_size: 4,
                        member2_name: 'Member 2',
                        member2_email: '',
                        member3_name: 'Member 3',
                        member3_email: '',
                        member4_name: 'Member 4',
                        member4_email: ''
                    };
                }

                if (isMounted) {
                    setRegistration(reg);
                    if (reg?.college) setCollegeName(reg.college);
                    if (reg?.leader_phone) setLeaderPhone(reg.leader_phone);
                    if (reg?.member2_name) setMember2Name(reg.member2_name);
                    if (reg?.member2_email) setMember2Email(reg.member2_email);
                    if (reg?.member3_name) setMember3Name(reg.member3_name);
                    if (reg?.member3_email) setMember3Email(reg.member3_email);
                    if (reg?.member4_name) setMember4Name(reg.member4_name);
                    if (reg?.member4_email) setMember4Email(reg.member4_email);
                    if (reg?.member5_name) setMember5Name(reg.member5_name);
                    if (reg?.member5_email) setMember5Email(reg.member5_email);
                }
            } catch (err) {
                console.error('Failed to load team registration:', err);
            } finally {
                if (isMounted) setRegistrationLoading(false);
            }
        };
        loadRegistration();
        return () => { isMounted = false; };
    }, [team?.name]);

    // Keep selections synced across tabs
    useEffect(() => {
        const handleSync = () => {
            setSelections(readSelections());
        };
        window.addEventListener('storage', handleSync);
        window.addEventListener('hpl-selection-update', handleSync);
        return () => {
            window.removeEventListener('storage', handleSync);
            window.removeEventListener('hpl-selection-update', handleSync);
        };
    }, []);

    // The single locked problem statement for THIS team
    const lockedPsId = useMemo(() => {
        if (!team) return null;
        return selections[team.squadId] || selections[team.name] || selections[`squad-${team.rank}`] || null;
    }, [team, selections]);

    const activeLockedPs = useMemo(() => {
        if (!lockedPsId) return null;
        return ROUND2_PROBLEM_STATEMENTS.find(ps => ps.id === lockedPsId) || null;
    }, [lockedPsId]);

    // Synchronize initial selection choice
    useEffect(() => {
        if (lockedPsId) {
            setSelectedPs(lockedPsId);
        }
    }, [lockedPsId]);

    // Live capacity counts (Max 10 teams per Problem Statement)
    const counts = useMemo(() => {
        const tally: Record<string, number> = {};
        const teamRankToPs: Record<number, string> = {};

        Object.entries(selections).forEach(([key, psId]) => {
            const q = findQualifiedTeamBySquadId(key) || findQualifiedTeamByName(key);
            if (q) {
                teamRankToPs[q.rank] = psId;
            }
        });

        Object.values(teamRankToPs).forEach((psId) => {
            tally[psId] = (tally[psId] || 0) + 1;
        });

        return tally;
    }, [selections]);

    // Handle Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);

        try {
            const cleanEmail = loginEmail.trim().toLowerCase();

            // 1. Strictly verify if this email belongs to one of the 40 official shortlisted teams
            const qualified = findQualifiedTeamByEmail(cleanEmail);
            if (!qualified) {
                setLoginError('This email is not registered for any of the 40 Round 2 qualified teams. Only qualified team leaders can sign in.');
                setIsLoggingIn(false);
                return;
            }

            // 2. Validate Password against assigned password or updated password
            const currentSquadId = `HPL-R2-${String(qualified.rank).padStart(2, '0')}`;
            const expectedPassword = getTeamPassword(currentSquadId, qualified.teamName);

            const cleanInputPassword = loginPassword.trim();
            const cleanExpectedPassword = (expectedPassword || '').trim();

            if (cleanInputPassword !== cleanExpectedPassword) {
                setLoginError('Incorrect password. Please enter the team password provided or your updated password from settings.');
                setIsLoggingIn(false);
                return;
            }

            // 3. Resolve team and registration details
            const currentTeam = {
                rank: qualified.rank,
                name: qualified.teamName,
                squadId: currentSquadId
            };
            setResolvedSquadId(currentTeam.squadId);

            // Fetch registration data from Supabase if available
            try {
                const found = await findTeamRegistration(qualified.teamName) || await findTeamRegistrationByEmail(cleanEmail);
                if (found) {
                    setRegistration(found);
                    if (found.college) setCollegeName(found.college);
                    if (found.leader_phone) setLeaderPhone(found.leader_phone);
                    if (found.member2_name) setMember2Name(found.member2_name);
                    if (found.member2_email) setMember2Email(found.member2_email);
                    if (found.member3_name) setMember3Name(found.member3_name);
                    if (found.member3_email) setMember3Email(found.member3_email);
                    if (found.member4_name) setMember4Name(found.member4_name);
                    if (found.member4_email) setMember4Email(found.member4_email);
                    if (found.member5_name) setMember5Name(found.member5_name);
                    if (found.member5_email) setMember5Email(found.member5_email);
                }
            } catch (err) {
                console.warn('Could not fetch external registration:', err);
            }

            // 4. Save session to keep team logged in
            saveActiveTeamSession({
                squadId: currentTeam.squadId,
                teamName: currentTeam.name,
                leaderEmail: qualified.leaderEmail,
                rank: currentTeam.rank
            });

            // 5. Intelligent Redirection:
            // If team already locked PS -> redirect directly to Profile / Overview!
            // If team hasn't locked PS -> redirect to Challenge selection tab!
            const allSelections = readSelections();
            const hasLockedPs = !!(allSelections[currentTeam.squadId] || allSelections[currentTeam.name] || allSelections[`squad-${currentTeam.rank}`]);

            if (hasLockedPs) {
                setActiveTab('overview');
            } else {
                setActiveTab('challenge');
            }

            setIsAuthenticated(true);
            setLoginError('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error('Login error:', err);
            setLoginError('An error occurred during authentication. Please try again.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    // Handle Password Change
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMessage(null);

        if (!team) return;

        if (newPassword.length < 8) {
            setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match. Please re-enter.' });
            return;
        }

        changeTeamPassword(team.squadId, newPassword);
        setNewPassword('');
        setConfirmPassword('');
        setPasswordMessage({ 
            type: 'success', 
            text: 'Password updated successfully! You can now use your new password.' 
        });
    };

    // Save Selected Problem Statement
    const handleSaveSelection = () => {
        if (!team || !selectedPs) return;
        const latestSelections = readSelections();

        // Calculate count of unique qualified teams for this PS (excluding current team)
        const teamRankToPs: Record<number, string> = {};
        Object.entries(latestSelections).forEach(([key, psId]) => {
            const q = findQualifiedTeamBySquadId(key) || findQualifiedTeamByName(key);
            if (q) teamRankToPs[q.rank] = psId;
        });

        let countForSelection = 0;
        Object.entries(teamRankToPs).forEach(([rank, psId]) => {
            if (Number(rank) !== team.rank && psId === selectedPs) {
                countForSelection++;
            }
        });

        if (countForSelection >= 10) {
            setPsError('This problem statement has reached its maximum limit of 10 teams. Please select an available track.');
            return;
        }

        const nextSelections = { 
            ...latestSelections, 
            [team.squadId]: selectedPs,
            [team.name]: selectedPs,
            [`squad-${team.rank}`]: selectedPs
        };
        window.localStorage.setItem(SELECTIONS_KEY, JSON.stringify(nextSelections));
        window.dispatchEvent(new Event('hpl-selection-update'));
        setSelections(nextSelections);
        setPsError('');
        setLockSuccessMessage('Problem statement successfully locked! Redirecting to your dashboard overview...');

        // Smoothly redirect to overview after locking
        setTimeout(() => {
            setActiveTab('overview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1200);
    };

    // Save Edited Roster to Supabase
    const handleSaveRoster = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!registration) return;

        setIsSavingRoster(true);
        setRosterSaveMessage('');

        try {
            const { error } = await supabase
                .from('registrations')
                .update({
                    leader_phone: leaderPhone.trim(),
                    college: collegeName.trim(),
                    member2_name: member2Name.trim(),
                    member2_email: member2Email.trim().toLowerCase(),
                    member3_name: member3Name.trim(),
                    member3_email: member3Email.trim().toLowerCase(),
                    member4_name: member4Name.trim(),
                    member4_email: member4Email.trim().toLowerCase(),
                    member5_name: member5Name.trim() || null,
                    member5_email: member5Email.trim().toLowerCase() || null,
                })
                .eq('id', registration.id);

            if (error) {
                console.error('Failed to update roster:', error);
                setRosterSaveMessage('Failed to update database record. Please try again.');
            } else {
                setRosterSaveMessage('Team member details updated successfully!');
                setIsEditingRoster(false);
                setTimeout(() => setRosterSaveMessage(''), 4000);
            }
        } catch (err) {
            console.error(err);
            setRosterSaveMessage('Error updating roster.');
        } finally {
            setIsSavingRoster(false);
        }
    };

    // Sign out handler
    const handleSignOut = () => {
        clearActiveTeamSession();
        setIsAuthenticated(false);
        onNavigate('shortlisted');
    };

    // Formatted members list (strictly for THIS team)
    const teamMembersList = useMemo(() => {
        if (!registration) return [];
        const list = [
            { role: 'Team Leader', name: registration.team_leader_name, email: registration.leader_email, phone: leaderPhone || registration.leader_phone },
            { role: 'Member 2', name: member2Name || registration.member2_name, email: member2Email || registration.member2_email, phone: null },
            { role: 'Member 3', name: member3Name || registration.member3_name, email: member3Email || registration.member3_email, phone: null },
            { role: 'Member 4', name: member4Name || registration.member4_name, email: member4Email || registration.member4_email, phone: null },
        ];
        if (member5Name || (registration.member5_name && registration.member5_name.trim())) {
            list.push({ 
                role: 'Member 5', 
                name: member5Name || registration.member5_name || '', 
                email: member5Email || registration.member5_email || '', 
                phone: null 
            });
        }
        return list;
    }, [registration, leaderPhone, member2Name, member2Email, member3Name, member3Email, member4Name, member4Email, member5Name, member5Email]);

    // Navigation items definitions
    const navItems = [
        { key: 'overview' as TabKey, label: 'Overview', icon: LayoutDashboard, badge: null },
        { key: 'roster' as TabKey, label: 'Team Members', icon: Users, badge: `${teamMembersList.length || 4}` },
        { key: 'challenge' as TabKey, label: 'Problem Statement', icon: Compass, badge: activeLockedPs ? 'Selected' : 'Choose' },
        { key: 'settings' as TabKey, label: 'Change Password', icon: Settings, badge: null }
    ];

    // ─────────────────────────────────────────────────────────────────────────────
    // RENDER: UN-AUTHENTICATED SQUAD LEADER SIGN IN STATE
    // ─────────────────────────────────────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#FAF6EE] text-[#1E1B4B] px-4 py-8 sm:px-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    <button 
                        onClick={() => onNavigate('shortlisted')} 
                        className="inline-flex items-center gap-2 text-xs font-display font-black uppercase tracking-wider text-slate-600 hover:text-[#1E1B4B] cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back to shortlisted teams
                    </button>

                    <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_#1E1B4B]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            
                            <div className="lg:col-span-6 space-y-5">
                                <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-[#1E1B4B] flex items-center justify-center shadow-sketch-sm">
                                    <LockKeyhole className="w-6 h-6 text-[#1E1B4B]" />
                                </div>
                                <div>
                                    <p className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest">
                                        Round 2 Team Sign In
                                    </p>
                                    <h1 className="font-display font-black text-3xl sm:text-4xl mt-1 text-[#1E1B4B]">
                                        {team ? `Sign in: ${team.name}` : 'Team Sign In'}
                                    </h1>
                                    <p className="text-xs sm:text-sm text-slate-600 mt-2">
                                        Enter your team leader email and password to view your team profile, your selected problem statement, and account settings.
                                    </p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                                    <div>
                                        <label className="block text-xs font-display font-black uppercase tracking-wider mb-1 text-slate-700">
                                            Team Leader Email
                                        </label>
                                        <input 
                                            required 
                                            type="email" 
                                            name="hpl_participant_email"
                                            autoComplete="off"
                                            value={loginEmail} 
                                            onChange={(e) => setLoginEmail(e.target.value)} 
                                            placeholder="e.g. leader@college.edu" 
                                            className="w-full rounded-xl border-2 border-[#1E1B4B] bg-white px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-400" 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-display font-black uppercase tracking-wider mb-1 text-slate-700">
                                            Team Password
                                        </label>
                                        <div className="relative">
                                            <input 
                                                required 
                                                type={showPassword ? "text" : "password"} 
                                                name="hpl_participant_password"
                                                autoComplete="new-password"
                                                value={loginPassword} 
                                                onChange={(e) => setLoginPassword(e.target.value)} 
                                                placeholder="Enter team password (e.g. HPL01-APEX!)" 
                                                className="w-full rounded-xl border-2 border-[#1E1B4B] bg-white pl-4 pr-11 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-400" 
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1E1B4B] p-1 text-xs font-mono font-bold"
                                            >
                                                {showPassword ? 'HIDE' : 'SHOW'}
                                            </button>
                                        </div>
                                    </div>

                                    {loginError && (
                                        <div className="rounded-xl bg-rose-50 border border-rose-300 p-3 text-xs font-bold text-rose-700 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <span>{loginError}</span>
                                        </div>
                                    )}

                                    <button 
                                        type="submit" 
                                        disabled={isLoggingIn}
                                        className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3.5 text-white font-display font-black text-sm uppercase tracking-wider hover:bg-amber-400 hover:text-[#1E1B4B] transition-colors cursor-pointer shadow-[3px_3px_0px_#1E1B4B] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50"
                                    >
                                        <span>{isLoggingIn ? 'Verifying...' : 'Sign In to Dashboard'}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>

                            <div className="lg:col-span-6 flex justify-center">
                                <ProfileIllustration type="hero" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!team) return <EmptyTeamState onNavigate={onNavigate} />;

    // ─────────────────────────────────────────────────────────────────────────────
    // RENDER: UNIFIED PROFILE & DASHBOARD WITH RESPONSIVE SIDEBAR/NAVBAR
    // ─────────────────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#FAF6EE] text-[#1E1B4B] selection:bg-amber-300 selection:text-[#1E1B4B]">
            
            {/* Top Simple Header */}
            <div className="w-full bg-[#1E1B4B] text-white border-b-2 border-[#1E1B4B] px-4 py-3 sm:px-6 sticky top-0 z-30 shadow-xs">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs font-sans">
                    <div className="flex items-center gap-3">
                        {/* Mobile Drawer Trigger Button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileDrawerOpen(true)}
                            className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400 text-[#1E1B4B] font-display font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition-all cursor-pointer shadow-[2px_2px_0px_#1E1B4B] active:translate-x-0.5 active:translate-y-0.5"
                            title="Open navigation menu"
                        >
                            <Menu className="w-4 h-4" />
                            <span>Menu</span>
                        </button>

                        <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                            <span className="font-display font-black text-white uppercase tracking-wider text-xs sm:text-sm truncate">
                                {team.name}
                            </span>
                            <span className="hidden sm:inline text-amber-300 font-mono text-xs">
                                • Slot #{String(team.rank).padStart(2, '0')} Qualified
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Active Tab chip on mobile */}
                        <span className="lg:hidden text-[11px] font-mono font-bold text-amber-300 bg-white/10 px-2.5 py-1 rounded-lg uppercase">
                            {navItems.find(n => n.key === activeTab)?.label || 'Overview'}
                        </span>
                        
                        <span className="hidden md:inline text-white/80 text-xs">
                            Leader: <strong className="text-white">{registration?.team_leader_name || 'Verified'}</strong>
                        </span>

                        <button 
                            onClick={handleSignOut}
                            className="inline-flex items-center gap-1 font-display font-bold text-xs text-amber-300 hover:text-white uppercase transition-colors cursor-pointer bg-white/10 px-2.5 py-1.5 rounded-xl hover:bg-white/20"
                            title="Sign Out"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Slide-In Sidebar Drawer Overlay & Backdrop */}
            {isMobileDrawerOpen && (
                <div 
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="fixed inset-0 bg-[#1E1B4B]/60 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
                />
            )}

            {/* Mobile Side Drawer (Sliding in and out from the left edge like a professional drawer) */}
            <div className={`fixed inset-y-0 left-0 w-72 sm:w-80 max-w-[85vw] z-50 bg-[#FFFDF7] border-r-2 border-[#1E1B4B] shadow-[8px_0px_24px_rgba(0,0,0,0.3)] p-5 flex flex-col justify-between overflow-y-auto lg:hidden transition-transform duration-300 ease-in-out transform ${
                isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Top: Brand & Close */}
                <div className="flex items-center justify-between gap-3 pb-4 border-b-2 border-[#1E1B4B]/10">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-[#1E1B4B] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1E1B4B]">
                            <Trophy className="w-5 h-5 text-[#1E1B4B]" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-display font-black text-sm uppercase text-[#1E1B4B] truncate">
                                {team.name}
                            </h3>
                            <span className="inline-block text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                                Slot #{String(team.rank).padStart(2, '0')} Qualified
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsMobileDrawerOpen(false)}
                        className="p-2 rounded-xl border-2 border-[#1E1B4B] bg-slate-100 hover:bg-amber-100 text-[#1E1B4B] transition-colors cursor-pointer shadow-[2px_2px_0px_#1E1B4B]"
                        title="Close menu"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                    {/* Middle Nav Items */}
                    <div className="py-4 space-y-1 flex-1">
                        <p className="text-[10px] font-mono font-bold uppercase text-slate-400 px-3 pb-1">
                            Navigation
                        </p>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.key;
                            return (
                                <button
                                    key={item.key}
                                    onClick={() => {
                                        setActiveTab(item.key);
                                        setIsMobileDrawerOpen(false);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                                        isActive
                                            ? 'bg-[#1E1B4B] text-white shadow-[2px_2px_0px_#F59E0B]'
                                            : 'text-slate-700 hover:bg-amber-100/70 hover:text-[#1E1B4B]'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                                        <span className="truncate">{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                                            isActive ? 'bg-amber-400 text-[#1E1B4B]' : 'bg-slate-200 text-slate-700'
                                        }`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}

                        {/* Divider */}
                        <div className="my-3 border-t-2 border-[#1E1B4B]/10" />

                        <p className="text-[10px] font-mono font-bold uppercase text-slate-400 px-3 pb-1">
                            Support & Actions
                        </p>
                        
                        <button
                            onClick={() => {
                                setIsMobileDrawerOpen(false);
                                onNavigate('contact');
                            }}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider text-slate-700 hover:bg-amber-100/70 hover:text-[#1E1B4B] transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <MessageCircle className="w-4 h-4 text-amber-700" />
                                <span>Coordinator Help</span>
                            </div>
                            <span className="text-xs font-mono text-slate-400">↗</span>
                        </button>

                        <button
                            onClick={() => {
                                setIsMobileDrawerOpen(false);
                                handleSignOut();
                            }}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <LogOut className="w-4 h-4 text-rose-500" />
                                <span>Sign Out</span>
                            </div>
                            <span className="text-xs font-mono text-rose-400">↗</span>
                        </button>
                    </div>

                    {/* Bottom User Profile */}
                    <div className="pt-3 border-t-2 border-[#1E1B4B]/10">
                        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#1E1B4B] text-amber-300 font-display font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                                {(registration?.team_leader_name || team.name).charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs font-display font-black text-[#1E1B4B] truncate">
                                    {registration?.team_leader_name || team.name}
                                </div>
                                <div className="text-[10px] text-slate-500 truncate font-mono">
                                    {collegeName || registration?.college || registration?.leader_email || 'Team Leader'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Main Content Layout Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">

                    {/* ───────────────────────────────────────────────────────────── */}
                    {/* DESKTOP UNIFIED SIDEBAR (>= lg)                               */}
                    {/* ───────────────────────────────────────────────────────────── */}
                    <aside 
                        className={`hidden lg:flex flex-col justify-between shrink-0 sticky top-20 bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-4 shadow-[5px_5px_0px_#1E1B4B] transition-all duration-300 ${
                            isSidebarCollapsed ? 'w-20' : 'w-64 xl:w-72'
                        }`}
                        style={{ minHeight: '560px', maxHeight: 'calc(100vh - 100px)' }}
                    >
                        {/* Top: Team Identity & Collapse Toggle */}
                        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center flex-col gap-2' : 'justify-between'} pb-3 border-b-2 border-[#1E1B4B]/10`}>
                            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2.5'} min-w-0`}>
                                <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-[#1E1B4B] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1E1B4B]">
                                    <Trophy className="w-5 h-5 text-[#1E1B4B]" />
                                </div>
                                {!isSidebarCollapsed && (
                                    <div className="min-w-0">
                                        <h2 className="font-display font-black text-sm uppercase text-[#1E1B4B] truncate leading-tight">
                                            {team.name}
                                        </h2>
                                        <span className="inline-block text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300 mt-0.5">
                                            Slot #{String(team.rank).padStart(2, '0')} Qualified
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Collapse/Expand toggle button */}
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="p-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-500 hover:text-[#1E1B4B] transition-colors cursor-pointer"
                                title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                            >
                                {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Middle: Navigation Items & Actions */}
                        <nav className="py-3 space-y-1 flex-1 overflow-y-auto no-scrollbar">
                            {!isSidebarCollapsed && (
                                <p className="text-[10px] font-mono font-bold uppercase text-slate-400 px-3 pb-1">
                                    Navigation
                                </p>
                            )}

                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.key;
                                return (
                                    <button
                                        key={item.key}
                                        onClick={() => {
                                            setActiveTab(item.key);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        title={isSidebarCollapsed ? item.label : undefined}
                                        className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3.5 py-2.5'} rounded-2xl font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-[#1E1B4B] text-white shadow-[2px_2px_0px_#F59E0B]'
                                                : 'text-slate-700 hover:bg-amber-100/70 hover:text-[#1E1B4B]'
                                        }`}
                                    >
                                        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} min-w-0`}>
                                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                                            {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                                        </div>
                                        {!isSidebarCollapsed && item.badge && (
                                            <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                                                isActive 
                                                    ? 'bg-amber-400 text-[#1E1B4B]' 
                                                    : 'bg-slate-200 text-slate-700'
                                            }`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}

                            {/* Divider Line */}
                            <div className="my-2 border-t-2 border-[#1E1B4B]/10" />

                            {!isSidebarCollapsed && (
                                <p className="text-[10px] font-mono font-bold uppercase text-slate-400 px-3 pb-1">
                                    Support & Exit
                                </p>
                            )}

                            {/* Coordinator Help */}
                            <button
                                onClick={() => onNavigate('contact')}
                                title={isSidebarCollapsed ? "Coordinator Support" : undefined}
                                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3.5 py-2.5'} rounded-2xl font-display font-black text-xs uppercase tracking-wider text-slate-700 hover:bg-amber-100/70 hover:text-[#1E1B4B] transition-all cursor-pointer`}
                            >
                                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} min-w-0`}>
                                    <MessageCircle className="w-4 h-4 text-amber-700 shrink-0" />
                                    {!isSidebarCollapsed && <span className="truncate">Coordinator Help</span>}
                                </div>
                                {!isSidebarCollapsed && (
                                    <span className="text-[10px] font-mono text-slate-400">↗</span>
                                )}
                            </button>

                            {/* Sign Out inside Unified Sidebar */}
                            <button
                                onClick={handleSignOut}
                                title={isSidebarCollapsed ? "Sign Out" : undefined}
                                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3.5 py-2.5'} rounded-2xl font-display font-black text-xs uppercase tracking-wider text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all cursor-pointer`}
                            >
                                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} min-w-0`}>
                                    <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
                                    {!isSidebarCollapsed && <span>Sign Out</span>}
                                </div>
                                {!isSidebarCollapsed && (
                                    <span className="text-xs font-mono text-rose-400">↗</span>
                                )}
                            </button>
                        </nav>

                        {/* Bottom: Team Leader Profile Card */}
                        <div className="pt-3 border-t-2 border-[#1E1B4B]/10">
                            <div 
                                className={`bg-amber-50/80 border border-amber-200 rounded-2xl p-2.5 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2.5'} transition-all`}
                                title={isSidebarCollapsed ? (registration?.team_leader_name || team.name) : undefined}
                            >
                                <div className="w-8 h-8 rounded-xl bg-[#1E1B4B] text-amber-300 font-display font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                                    {(registration?.team_leader_name || team.name).charAt(0).toUpperCase()}
                                </div>
                                {!isSidebarCollapsed && (
                                    <div className="min-w-0 flex-1">
                                        <div className="text-xs font-display font-black text-[#1E1B4B] truncate">
                                            {registration?.team_leader_name || team.name}
                                        </div>
                                        <div className="text-[10px] text-slate-500 truncate font-mono">
                                            {collegeName || registration?.college || registration?.leader_email || 'Team Leader'}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </aside>

                    {/* ───────────────────────────────────────────────────────────── */}
                    {/* MAIN CONTENT AREA                                             */}
                    {/* ───────────────────────────────────────────────────────────── */}
                    <main className="flex-1 min-w-0 space-y-6">

                        {/* ═════════════════════════════════════════════════════════════ */}
                        {/* TAB 1: OVERVIEW                                               */}
                        {/* ═════════════════════════════════════════════════════════════ */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                
                                {/* Welcome Card */}
                                <div className="bg-[#1E1B4B] text-white rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#F59E0B] border-2 border-[#1E1B4B]">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span>Round 2 Dashboard</span>
                                    </div>
                                    <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white mt-1">
                                        Welcome, {team.name}
                                    </h1>
                                    <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                                        Welcome to your team dashboard. Review your selected challenge, see your team members, and manage your account.
                                    </p>
                                </div>

                                {/* Metrics Summary Row */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                    <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-2xl p-4 shadow-[3px_3px_0px_#1E1B4B]">
                                        <div className="text-[11px] font-mono font-bold text-slate-500 uppercase">Team Slot</div>
                                        <div className="text-2xl font-display font-black text-[#1E1B4B] mt-1">#{String(team.rank).padStart(2, '0')}</div>
                                        <div className="text-[10px] text-emerald-700 font-mono font-bold">Round 2 Qualified</div>
                                    </div>
                                    <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-2xl p-4 shadow-[3px_3px_0px_#1E1B4B]">
                                        <div className="text-[11px] font-mono font-bold text-slate-500 uppercase">Team Size</div>
                                        <div className="text-2xl font-display font-black text-[#1E1B4B] mt-1">{teamMembersList.length} Members</div>
                                        <div className="text-[10px] text-slate-600 font-mono">Leader + Members</div>
                                    </div>
                                    <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-2xl p-4 shadow-[3px_3px_0px_#1E1B4B]">
                                        <div className="text-[11px] font-mono font-bold text-slate-500 uppercase">Challenge</div>
                                        <div className="text-lg font-display font-black text-[#1E1B4B] mt-1 truncate">
                                            {activeLockedPs ? activeLockedPs.psCode : 'Not Selected'}
                                        </div>
                                        <div className={`text-[10px] font-mono font-bold ${activeLockedPs ? 'text-emerald-700' : 'text-amber-700'}`}>
                                            {activeLockedPs ? 'Selected & Locked' : 'Selection Pending'}
                                        </div>
                                    </div>
                                    <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-2xl p-4 shadow-[3px_3px_0px_#1E1B4B]">
                                        <div className="text-[11px] font-mono font-bold text-slate-500 uppercase">Evaluation</div>
                                        <div className="text-2xl font-display font-black text-indigo-700 mt-1">12 SEP</div>
                                        <div className="text-[10px] text-slate-600 font-mono">Hack Day Review</div>
                                    </div>
                                </div>

                                {/* Dashboard Illustration */}
                                <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 shadow-[5px_5px_0px_#1E1B4B] space-y-4">
                                    <div className="flex items-center justify-between border-b-2 border-[#1E1B4B]/10 pb-3">
                                        <div>
                                            <h3 className="font-display font-black text-lg text-[#1E1B4B] uppercase tracking-tight">
                                                Team Workspace
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                Your project workspace for Round 2.
                                            </p>
                                        </div>
                                        <span className="font-mono text-xs font-bold px-3 py-1 bg-amber-100 rounded-lg text-amber-900 border border-amber-300">
                                            Illustration
                                        </span>
                                    </div>

                                    <ProfileIllustration type="hero" />
                                </div>

                                {/* Problem Statement Snapshot */}
                                <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 shadow-[5px_5px_0px_#1E1B4B] space-y-4">
                                    <div className="flex items-center justify-between border-b-2 border-[#1E1B4B]/10 pb-3">
                                        <div>
                                            <h3 className="font-display font-black text-lg text-[#1E1B4B] uppercase tracking-tight">
                                                Selected Problem Statement
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                The challenge your team is working on.
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => setActiveTab('challenge')}
                                            className="text-xs font-display font-black uppercase text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                                        >
                                            <span>View Details</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {activeLockedPs ? (
                                        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/70 p-5 space-y-2">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="font-mono text-xs font-black text-emerald-900 uppercase bg-emerald-200/80 px-2.5 py-0.5 rounded border border-emerald-400">
                                                    {activeLockedPs.psCode}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-800">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Selected by {team.name}
                                                </span>
                                            </div>
                                            <h4 className="font-display font-black text-xl text-[#1E1B4B]">
                                                {activeLockedPs.title}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                                {activeLockedPs.subtitle}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="rounded-2xl border-2 border-amber-400 bg-amber-50/70 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <h4 className="font-display font-black text-lg text-[#1E1B4B]">
                                                    Problem Statement Not Selected Yet
                                                </h4>
                                                <p className="text-xs text-slate-600">
                                                    Please choose your Round 2 problem statement now.
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => setActiveTab('challenge')}
                                                className="px-5 py-2.5 rounded-xl bg-[#1E1B4B] text-white font-display font-black text-xs uppercase hover:bg-amber-400 hover:text-[#1E1B4B] transition-colors cursor-pointer shrink-0"
                                            >
                                                Select Challenge →
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Team Members Quick Roster Snapshot (Everything on the Profile Page) */}
                                <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 shadow-[5px_5px_0px_#1E1B4B] space-y-4">
                                    <div className="flex items-center justify-between border-b-2 border-[#1E1B4B]/10 pb-3">
                                        <div>
                                            <h3 className="font-display font-black text-lg text-[#1E1B4B] uppercase tracking-tight">
                                                Team Members Roster
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                Registered members and contact details for {team.name}.
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => setActiveTab('roster')}
                                            className="text-xs font-display font-black uppercase text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                                        >
                                            <span>Manage / Edit</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {teamMembersList.map((m, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`p-4 rounded-2xl border-2 transition-all ${
                                                    idx === 0 
                                                        ? 'border-amber-400 bg-amber-50/70' 
                                                        : 'border-[#1E1B4B]/15 bg-white'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] font-black uppercase tracking-wider ${
                                                        idx === 0 
                                                            ? 'bg-amber-400 text-[#1E1B4B]' 
                                                            : 'bg-slate-200 text-slate-700'
                                                    }`}>
                                                        {m.role}
                                                    </span>
                                                    {idx === 0 && (
                                                        <span className="text-[10px] font-mono font-bold text-amber-800">
                                                            Admin
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="font-display font-black text-sm text-[#1E1B4B] truncate">
                                                    {m.name || 'Name not provided'}
                                                </div>
                                                <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1 truncate">
                                                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                                    <span className="truncate">{m.email || 'Email not available'}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* ═════════════════════════════════════════════════════════════ */}
                        {/* TAB 2: TEAM MEMBERS (Showing strictly THIS team's details)    */}
                        {/* ═════════════════════════════════════════════════════════════ */}
                        {activeTab === 'roster' && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                
                                <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 sm:p-8 shadow-[5px_5px_0px_#1E1B4B] space-y-5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1E1B4B]/10 pb-4">
                                        <div>
                                            <h2 className="font-display font-black text-2xl text-[#1E1B4B] uppercase tracking-tight">
                                                Team Members
                                            </h2>
                                            <p className="text-xs text-slate-500">
                                                View and update details for your team members.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setIsEditingRoster(!isEditingRoster)}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-[#1E1B4B] bg-white font-display font-black text-xs uppercase text-[#1E1B4B] hover:bg-amber-100 transition-colors cursor-pointer shadow-[2px_2px_0px_#1E1B4B]"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                            <span>{isEditingRoster ? 'Cancel Editing' : 'Edit Details'}</span>
                                        </button>
                                    </div>

                                    {/* Illustration */}
                                    <ProfileIllustration type="roster" />

                                    {rosterSaveMessage && (
                                        <div className="p-3 bg-emerald-100 border-2 border-emerald-500 rounded-xl text-emerald-900 text-xs font-mono font-bold flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                                            <span>{rosterSaveMessage}</span>
                                        </div>
                                    )}

                                    {/* Institution info banner */}
                                    <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 flex items-center gap-3">
                                        <School className="w-5 h-5 text-amber-700 shrink-0" />
                                        <div className="text-xs">
                                            <span className="text-slate-500 block font-mono uppercase text-[10px]">Registered College / Institution:</span>
                                            <strong className="text-sm text-[#1E1B4B]">{collegeName || registration?.college || 'Registered College'}</strong>
                                        </div>
                                    </div>

                                    {/* VIEW MODE: Team Members Cards */}
                                    {!isEditingRoster ? (
                                        <div className="grid gap-4 sm:grid-cols-2 pt-2">
                                            {teamMembersList.map((m, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className={`rounded-2xl border-2 p-5 transition-all ${
                                                        idx === 0 
                                                            ? 'border-amber-400 bg-amber-50/70 shadow-[3px_3px_0px_#F59E0B]' 
                                                            : 'border-[#1E1B4B]/15 bg-white shadow-xs'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-black uppercase tracking-wider ${
                                                            idx === 0 
                                                                ? 'bg-amber-400 text-[#1E1B4B]' 
                                                                : 'bg-slate-200 text-slate-700'
                                                        }`}>
                                                            {m.role}
                                                        </span>
                                                        {idx === 0 && (
                                                            <span className="text-[11px] font-mono font-bold text-amber-800 flex items-center gap-1">
                                                                <KeyRound className="w-3 h-3" /> Team Admin
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="font-display font-black text-lg text-[#1E1B4B]">
                                                        {m.name || 'Name not provided'}
                                                    </div>

                                                    <div className="text-xs text-slate-600 mt-1.5 flex items-center gap-1.5 break-all">
                                                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                        <span>{m.email || 'Email not available'}</span>
                                                    </div>

                                                    {m.phone && (
                                                        <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                                                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                            <span>+91 {m.phone}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        /* EDIT MODE: Update form directly updating database */
                                        <form onSubmit={handleSaveRoster} className="space-y-4 pt-2">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase text-slate-700 mb-1">
                                                        Team Leader Phone
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        value={leaderPhone} 
                                                        onChange={(e) => setLeaderPhone(e.target.value)} 
                                                        placeholder="10-digit mobile number" 
                                                        className="w-full rounded-xl border-2 border-[#1E1B4B] px-3.5 py-2 text-sm bg-white font-medium" 
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase text-slate-700 mb-1">
                                                        College / Institution Name
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        value={collegeName} 
                                                        onChange={(e) => setCollegeName(e.target.value)} 
                                                        placeholder="College or university" 
                                                        className="w-full rounded-xl border-2 border-[#1E1B4B] px-3.5 py-2 text-sm bg-white font-medium" 
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase text-slate-700 mb-1">
                                                        Member 2 Name
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        value={member2Name} 
                                                        onChange={(e) => setMember2Name(e.target.value)} 
                                                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm bg-white" 
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase text-slate-700 mb-1">
                                                        Member 2 Email
                                                    </label>
                                                    <input 
                                                        type="email" 
                                                        value={member2Email} 
                                                        onChange={(e) => setMember2Email(e.target.value)} 
                                                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm bg-white" 
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase text-slate-700 mb-1">
                                                        Member 3 Name
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        value={member3Name} 
                                                        onChange={(e) => setMember3Name(e.target.value)} 
                                                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm bg-white" 
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase text-slate-700 mb-1">
                                                        Member 3 Email
                                                    </label>
                                                    <input 
                                                        type="email" 
                                                        value={member3Email} 
                                                        onChange={(e) => setMember3Email(e.target.value)} 
                                                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm bg-white" 
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase text-slate-700 mb-1">
                                                        Member 4 Name
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        value={member4Name} 
                                                        onChange={(e) => setMember4Name(e.target.value)} 
                                                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm bg-white" 
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase text-slate-700 mb-1">
                                                        Member 4 Email
                                                    </label>
                                                    <input 
                                                        type="email" 
                                                        value={member4Email} 
                                                        onChange={(e) => setMember4Email(e.target.value)} 
                                                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm bg-white" 
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase text-slate-700 mb-1">
                                                        Member 5 Name (Optional)
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        value={member5Name} 
                                                        onChange={(e) => setMember5Name(e.target.value)} 
                                                        placeholder="Leave empty if 4 members" 
                                                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm bg-white" 
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase text-slate-700 mb-1">
                                                        Member 5 Email (Optional)
                                                    </label>
                                                    <input 
                                                        type="email" 
                                                        value={member5Email} 
                                                        onChange={(e) => setMember5Email(e.target.value)} 
                                                        placeholder="Leave empty if 4 members" 
                                                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm bg-white" 
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                                                <button
                                                    type="submit"
                                                    disabled={isSavingRoster}
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E1B4B] text-white font-display font-black text-xs uppercase hover:bg-amber-400 hover:text-[#1E1B4B] transition-colors cursor-pointer shadow-[3px_3px_0px_#1E1B4B] disabled:opacity-50"
                                                >
                                                    <Save className="w-4 h-4" />
                                                    <span>{isSavingRoster ? 'Saving...' : 'Save Updates'}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditingRoster(false)}
                                                    className="px-4 py-3 rounded-xl border border-slate-300 text-xs font-display font-black uppercase text-slate-600 hover:bg-slate-100 cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>

                            </div>
                        )}

                        {/* ═════════════════════════════════════════════════════════════ */}
                        {/* TAB 3: PROBLEM STATEMENT (SHOWS ONLY THEIR SELECTED PS)       */}
                        {/* ═════════════════════════════════════════════════════════════ */}
                        {activeTab === 'challenge' && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                
                                <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 sm:p-8 shadow-[5px_5px_0px_#1E1B4B] space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1E1B4B]/10 pb-4">
                                        <div>
                                            <h2 className="font-display font-black text-2xl text-[#1E1B4B] uppercase tracking-tight">
                                                Selected Problem Statement
                                            </h2>
                                            <p className="text-xs text-slate-500">
                                                Review your team's assigned challenge details.
                                            </p>
                                        </div>

                                        {activeLockedPs && (
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                                    <span>Confirmed for Round 2</span>
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Illustration */}
                                    <ProfileIllustration type="challenge" />

                                    {lockSuccessMessage && (
                                        <div className="p-3 bg-emerald-100 border-2 border-emerald-500 rounded-xl text-emerald-900 text-xs font-mono font-bold flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                                            <span>{lockSuccessMessage}</span>
                                        </div>
                                    )}

                                    {/* CASE 1: TEAM HAS SELECTED THEIR PS -> SHOW ONLY THEIR SELECTED PS IN FULL DETAIL */}
                                    {activeLockedPs ? (
                                        <div className="space-y-6">
                                            
                                            {/* Highlight Card */}
                                            <div className="rounded-3xl border-2 border-emerald-400 bg-emerald-50/80 p-6 sm:p-8 shadow-[3px_3px_0px_#10B981] space-y-4">
                                                <div className="flex flex-wrap items-center justify-between gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-xs font-black text-white uppercase bg-[#1E1B4B] px-3 py-1 rounded-lg">
                                                            {activeLockedPs.psCode}
                                                        </span>
                                                        {activeLockedPs.sponsorName && (
                                                            <span className="font-sans text-xs font-bold text-emerald-800 bg-emerald-200/80 px-2.5 py-0.5 rounded-md border border-emerald-300">
                                                                Partner: {activeLockedPs.sponsorName}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs font-mono font-bold text-emerald-800 bg-white border border-emerald-400 px-3 py-1 rounded-xl flex items-center gap-1">
                                                        <LockKeyhole className="w-3.5 h-3.5 text-emerald-600" />
                                                        <span>Locked for {team.name}</span>
                                                    </span>
                                                </div>

                                                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1E1B4B]">
                                                    {activeLockedPs.title}
                                                </h3>
                                                <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                                                    {activeLockedPs.subtitle}
                                                </p>

                                                {/* One-Line Challenge */}
                                                {activeLockedPs.oneLineChallenge && (
                                                    <div className="bg-white/90 border border-emerald-300/80 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans shadow-2xs">
                                                        <strong className="text-[#1E1B4B] block font-display font-black uppercase text-xs mb-1">
                                                            Challenge Summary:
                                                        </strong>
                                                        {activeLockedPs.oneLineChallenge}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Project Goals */}
                                            {activeLockedPs.objective && activeLockedPs.objective.length > 0 && (
                                                <div className="bg-white border-2 border-[#1E1B4B]/15 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
                                                    <div className="flex items-center gap-2">
                                                        <Target className="w-4 h-4 text-indigo-700" />
                                                        <h4 className="font-display font-black text-base uppercase text-[#1E1B4B]">
                                                            Project Goals
                                                        </h4>
                                                    </div>
                                                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                                                        {activeLockedPs.objective.map((obj, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                                                                <span>{obj}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* What to Build & Submit */}
                                            {activeLockedPs.deliverables && activeLockedPs.deliverables.length > 0 && (
                                                <div className="bg-white border-2 border-[#1E1B4B]/15 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-amber-700" />
                                                        <h4 className="font-display font-black text-base uppercase text-[#1E1B4B]">
                                                            What to Build & Submit
                                                        </h4>
                                                    </div>
                                                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                                                        {activeLockedPs.deliverables.map((del, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                                                                    {i + 1}
                                                                </span>
                                                                <span>{del}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Key Topics & Ideas to Stand Out */}
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                {activeLockedPs.focusAreas && activeLockedPs.focusAreas.length > 0 && (
                                                    <div className="bg-white border-2 border-[#1E1B4B]/15 rounded-2xl p-5 space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <Layers className="w-4 h-4 text-purple-700" />
                                                            <h4 className="font-display font-black text-sm uppercase text-[#1E1B4B]">
                                                                Key Topics
                                                            </h4>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {activeLockedPs.focusAreas.map((area, i) => (
                                                                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-medium">
                                                                    {area}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {activeLockedPs.scopeForInnovation && activeLockedPs.scopeForInnovation.length > 0 && (
                                                    <div className="bg-white border-2 border-[#1E1B4B]/15 rounded-2xl p-5 space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <Lightbulb className="w-4 h-4 text-amber-600" />
                                                            <h4 className="font-display font-black text-sm uppercase text-[#1E1B4B]">
                                                                Ideas to Stand Out
                                                            </h4>
                                                        </div>
                                                        <ul className="space-y-1.5 text-xs text-slate-600">
                                                            {activeLockedPs.scopeForInnovation.slice(0, 3).map((inn, i) => (
                                                                <li key={i} className="flex items-start gap-1.5">
                                                                    <span className="text-amber-500 font-bold">•</span>
                                                                    <span>{inn}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    ) : (
                                        /* CASE 2: TEAM HAS NOT SELECTED YET -> SHOW SELECTION CHOICES TO PICK FROM */
                                        <div className="space-y-4">
                                            <h3 className="font-display font-black text-lg text-[#1E1B4B] uppercase">
                                                Select Your Round 2 Challenge (Max 10 Teams per Track)
                                            </h3>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                {ROUND2_PROBLEM_STATEMENTS.map((ps) => {
                                                    const count = counts[ps.id] || 0;
                                                    const isFull = count >= 10 && selections[team.squadId] !== ps.id;
                                                    const isSelected = selectedPs === ps.id;

                                                    return (
                                                        <button 
                                                            type="button" 
                                                            key={ps.id} 
                                                            disabled={isFull} 
                                                            onClick={() => { 
                                                                setSelectedPs(ps.id); 
                                                                setPsError(''); 
                                                            }} 
                                                            className={`block w-full text-left rounded-2xl border-2 p-5 transition-all cursor-pointer ${
                                                                isSelected 
                                                                    ? 'border-amber-500 bg-amber-50 shadow-[3px_3px_0px_#F59E0B]' 
                                                                    : 'border-[#1E1B4B]/20 bg-white hover:border-[#1E1B4B]'
                                                            } ${isFull ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        >
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div>
                                                                    <span className="font-mono text-xs font-black text-indigo-700 uppercase bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                                                                        {ps.psCode}
                                                                    </span>
                                                                    <h4 className="font-display font-black text-lg mt-2 text-[#1E1B4B]">
                                                                        {ps.title}
                                                                    </h4>
                                                                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                                                                        {ps.subtitle}
                                                                    </p>
                                                                </div>
                                                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-mono font-bold shrink-0 ${
                                                                    isFull ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                                                                }`}>
                                                                    {count}/10 {isFull ? 'FULL' : 'SLOTS'}
                                                                </span>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {psError && (
                                                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-700 text-xs font-bold">
                                                    {psError}
                                                </div>
                                            )}

                                            <div className="pt-2">
                                                <button 
                                                    onClick={handleSaveSelection} 
                                                    disabled={!selectedPs} 
                                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-8 py-3.5 text-white font-display font-black text-sm uppercase tracking-wider disabled:opacity-40 hover:bg-amber-400 hover:text-[#1E1B4B] transition-all cursor-pointer shadow-[3px_3px_0px_#1E1B4B]"
                                                >
                                                    <span>Lock Problem Statement</span>
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </div>

                            </div>
                        )}

                        {/* ═════════════════════════════════════════════════════════════ */}
                        {/* TAB 4: SETTINGS & CHANGE PASSWORD                             */}
                        {/* ═════════════════════════════════════════════════════════════ */}
                        {activeTab === 'settings' && (
                            <div className="space-y-6 animate-in fade-in duration-200">
                                
                                <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 sm:p-8 shadow-[5px_5px_0px_#1E1B4B] space-y-6">
                                    <div className="border-b-2 border-[#1E1B4B]/10 pb-4">
                                        <h2 className="font-display font-black text-2xl text-[#1E1B4B] uppercase tracking-tight">
                                            Change Password
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Update your team login password.
                                        </p>
                                    </div>

                                    {/* Illustration */}
                                    <ProfileIllustration type="security" />

                                    {/* Password Change Form */}
                                    <div className="bg-white border-2 border-[#1E1B4B]/20 rounded-2xl p-6 space-y-4 shadow-xs">
                                        <div>
                                            <h3 className="font-display font-black text-lg text-[#1E1B4B] uppercase tracking-tight">
                                                New Password
                                            </h3>
                                            <p className="text-xs text-slate-600 mt-0.5">
                                                Enter a new password (minimum 8 characters) for your team account.
                                            </p>
                                        </div>

                                        <form onSubmit={handlePasswordChange} className="space-y-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase tracking-wider mb-1 text-slate-700">
                                                        New Password
                                                    </label>
                                                    <input 
                                                        required 
                                                        minLength={8} 
                                                        type="password" 
                                                        value={newPassword} 
                                                        onChange={(e) => setNewPassword(e.target.value)} 
                                                        placeholder="Minimum 8 characters" 
                                                        className="w-full rounded-xl border-2 border-[#1E1B4B]/20 px-4 py-2.5 text-sm outline-none focus:border-amber-400 bg-slate-50/50" 
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-display font-black uppercase tracking-wider mb-1 text-slate-700">
                                                        Confirm New Password
                                                    </label>
                                                    <input 
                                                        required 
                                                        minLength={8} 
                                                        type="password" 
                                                        value={confirmPassword} 
                                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                                        placeholder="Re-enter new password" 
                                                        className="w-full rounded-xl border-2 border-[#1E1B4B]/20 px-4 py-2.5 text-sm outline-none focus:border-amber-400 bg-slate-50/50" 
                                                    />
                                                </div>
                                            </div>

                                            {passwordMessage && (
                                                <div className={`p-3 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${
                                                    passwordMessage.type === 'success' 
                                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                                                        : 'bg-rose-50 border-rose-300 text-rose-800'
                                                }`}>
                                                    {passwordMessage.type === 'success' ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                                    ) : (
                                                        <AlertCircle className="w-4 h-4 text-rose-600" />
                                                    )}
                                                    <span>{passwordMessage.text}</span>
                                                </div>
                                            )}

                                            <button 
                                                type="submit" 
                                                className="rounded-xl bg-[#1E1B4B] px-6 py-3 text-white font-display font-black text-xs uppercase hover:bg-amber-400 hover:text-[#1E1B4B] transition-colors cursor-pointer shadow-[2px_2px_0px_#1E1B4B]"
                                            >
                                                Update Password
                                            </button>
                                        </form>
                                    </div>

                                    {/* Password Tips */}
                                    <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 text-xs text-slate-700 space-y-1 font-sans">
                                        <div className="font-display font-black uppercase text-[#1E1B4B] flex items-center gap-1.5 mb-1">
                                            <Shield className="w-4 h-4 text-amber-700" />
                                            <span>Password Tips</span>
                                        </div>
                                        <p>• Make sure your password has at least 8 characters.</p>
                                        <p>• Share the updated password only with your registered team members.</p>
                                        <p>• If you ever forget your password, contact the hackathon faculty coordinators.</p>
                                    </div>
                                </div>

                            </div>
                        )}

                    </main>

                </div>
            </div>

        </div>
    );
};

const EmptyTeamState: React.FC<{ onNavigate: (page: PageRoute) => void }> = ({ onNavigate }) => (
    <div className="max-w-lg mx-auto bg-white border-2 border-[#1E1B4B] rounded-3xl p-8 text-center shadow-[6px_6px_0px_#1E1B4B] my-12">
        <ShieldCheck className="w-12 h-12 mx-auto text-amber-500" />
        <h1 className="font-display font-black text-2xl mt-4 text-[#1E1B4B]">Select your squad first</h1>
        <p className="text-sm text-slate-600 mt-2">
            Please pick your squad from the shortlisted directory to open your team profile and dashboard.
        </p>
        <button 
            onClick={() => onNavigate('shortlisted')} 
            className="mt-5 rounded-xl bg-[#1E1B4B] text-white px-5 py-3 font-display font-black text-sm uppercase hover:bg-amber-400 hover:text-[#1E1B4B] transition-colors cursor-pointer"
        >
            View shortlisted squads
        </button>
    </div>
);
