import React, { useEffect, useMemo, useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  LockKeyhole, 
  Users, 
  Mail, 
  Phone, 
  School, 
  KeyRound, 
  Edit3, 
  Save, 
  Sparkle, 
  ShieldCheck, 
  Trophy, 
  Sparkles,
  AlertTriangle 
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
  findQualifiedTeamByEmail,
  findQualifiedTeamBySquadId,
  findQualifiedTeamByName,
  OFFICIAL_QUALIFIED_TEAMS
} from '../../services/teamPortalService';
import { RegisterIllustration } from '../illustrations/RegisterIllustration';
import { SparkleDoodle } from '../illustrations/MicroDoodles';
import { supabase } from '../../client_config';
import { 
  calculateStrictAllocations, 
  getPendingProblemStatements, 
  lockProblemStatementSelection, 
  readOverflowRecords, 
  readRawSelections,
  fetchRound2PsSelectionsFromDB,
  saveRound2TeamRoster,
  STRICT_CAP_PER_TRACK 
} from '../../services/round2AllocationService';

interface RegisterPageProps {
  onNavigate: (page: PageRoute) => void;
}

const SELECTIONS_KEY = 'hpl-round2-ps-selections';
type Selections = Record<string, string>;

const readSelections = (): Selections => {
  try {
    const value = window.localStorage.getItem(SELECTIONS_KEY);
    return value ? JSON.parse(value) as Selections : {};
  } catch {
    return {};
  }
};

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  // Stepper: 1: Team Sign In -> 2: Team Details & Members (Editable) -> 3: Choose Round 2 PS -> 4: Pass
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Authentication inputs: Email and Password only (Team name is fetched automatically!)
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Verified Team Data
  const [matchedTeam, setMatchedTeam] = useState<{ rank: number; name: string; squadId: string } | null>(null);
  const [registration, setRegistration] = useState<TeamRegistration | null>(null);

  // Editable details state
  const [leaderPhone, setLeaderPhone] = useState<string>('');
  const [collegeName, setCollegeName] = useState<string>('');
  const [member2Name, setMember2Name] = useState<string>('');
  const [member2Email, setMember2Email] = useState<string>('');
  const [member3Name, setMember3Name] = useState<string>('');
  const [member3Email, setMember3Email] = useState<string>('');
  const [member4Name, setMember4Name] = useState<string>('');
  const [member4Email, setMember4Email] = useState<string>('');
  const [member5Name, setMember5Name] = useState<string>('');
  const [member5Email, setMember5Email] = useState<string>('');

  const [isSavingDetails, setIsSavingDetails] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>('');

  // Auto-load existing active session if available
  useEffect(() => {
    const session = getActiveTeamSession();
    if (session) {
      // If team already has a confirmed locked problem statement (and is not an overflow team), redirect to profile
      const allSelections = readSelections();
      const overflowRecords = readOverflowRecords();
      const isPendingOverflow = !!overflowRecords[session.squadId] && !overflowRecords[session.squadId].reSelectionUsed;

      if (allSelections[session.squadId] && !isPendingOverflow) {
        onNavigate('team-profile');
        return;
      }

      setMatchedTeam({
        rank: session.rank,
        name: session.teamName,
        squadId: session.squadId
      });
      // Fetch fresh record from Supabase
      findTeamRegistration(session.teamName, session.leaderEmail).then((record) => {
        const effective = record || {
          id: `reg-${session.squadId}`,
          team_name: session.teamName,
          team_leader_name: 'Team Leader',
          leader_email: session.leaderEmail,
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
        setRegistration(effective);
        setLeaderPhone(effective.leader_phone || '');
        setCollegeName(effective.college || '');
        setMember2Name(effective.member2_name || '');
        setMember2Email(effective.member2_email || '');
        setMember3Name(effective.member3_name || '');
        setMember3Email(effective.member3_email || '');
        setMember4Name(effective.member4_name || '');
        setMember4Email(effective.member4_email || '');
        setMember5Name(effective.member5_name || '');
        setMember5Email(effective.member5_email || '');
        setCurrentStep(2);
      }).catch(console.error);
    }
  }, [onNavigate]);

  // Real-time auto-logout listener when Admin resets locks/sessions
  useEffect(() => {
    const handleSessionSync = () => {
      const sess = getActiveTeamSession();
      if (!sess) {
        setMatchedTeam(null);
        setRegistration(null);
        setCurrentStep(1);
        setEmailInput('');
        setPasswordInput('');
        setSelectedPs('');
      }
    };

    window.addEventListener('storage', handleSessionSync);
    window.addEventListener('hpl-team-session-update', handleSessionSync);
    return () => {
      window.removeEventListener('storage', handleSessionSync);
      window.removeEventListener('hpl-team-session-update', handleSessionSync);
    };
  }, []);

  // Round 2 Problem Statement selection state
  const [selections, setSelections] = useState<Selections>(() => readSelections());
  const [selectedPs, setSelectedPs] = useState<string>('');
  const [psError, setPsError] = useState<string>('');

  // Sync selections across windows/tabs and fetch from Supabase registrations table
  useEffect(() => {
    const sync = () => setSelections(readSelections());
    window.addEventListener('storage', sync);
    window.addEventListener('hpl-selection-update', sync);

    // Fetch live tracks from round2_ps_selections table across all teams
    (async () => {
      try {
        const dbRows = await fetchRound2PsSelectionsFromDB();
        if (dbRows.length > 0) {
          const strictAlloc = calculateStrictAllocations(dbRows, {});
          const clean: Record<string, string> = {};
          Object.values(strictAlloc.lockedMap).forEach(item => {
            clean[item.squadId] = item.psId;
            clean[item.teamName] = item.psId;
            clean[`squad-${item.rank}`] = item.psId;
          });
          window.localStorage.setItem(SELECTIONS_KEY, JSON.stringify(clean));
          setSelections(clean);
        }
      } catch (e) {
        console.warn('Could not sync round2_ps_selections:', e);
      }
    })();

    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('hpl-selection-update', sync);
    };
  }, []);

  // Strict allocation calculation state (Max 10 teams per track)
  const allocationState = useMemo(() => {
    return calculateStrictAllocations([], selections);
  }, [selections]);

  const counts = allocationState.trackCounts;

  // Update selected problem statement when team is resolved
  useEffect(() => {
    if (matchedTeam) {
      setSelectedPs(selections[matchedTeam.squadId] || '');
    }
  }, [matchedTeam, selections]);

  // Member list for display in Step 2 (matching Mithul's format)
  const teamMembers = useMemo(() => {
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

  // Step 1: Sign in handler using Email and Password only
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsVerifying(true);

    try {
      const cleanEmail = emailInput.trim().toLowerCase();

      // 1. First check official 40 shortlisted list directly
      const qualified = findQualifiedTeamByEmail(cleanEmail);
      let officialName = qualified ? qualified.teamName : '';
      let rank = qualified ? qualified.rank : 1;
      let squadId = qualified ? qualified.squadId : `HPL-R2-${String(rank).padStart(2, '0')}`;

      // 2. Fetch team registration record by leader email from Supabase if available
      let record = await findTeamRegistrationByEmail(cleanEmail);
      if (!record && qualified) {
        record = await findTeamRegistration(qualified.teamName);
      }

      if (!qualified && !record) {
        setAuthError('No registered team found with this team leader email. Only qualified team leaders can sign in.');
        setIsVerifying(false);
        return;
      }

      if (!officialName && record) {
        officialName = record.team_name;
        const idx = SHORTLISTED_TEAMS_DATA.findIndex(
          name => name.toLowerCase() === record!.team_name.trim().toLowerCase()
        );
        if (idx !== -1) {
          rank = idx + 1;
          squadId = `HPL-R2-${String(rank).padStart(2, '0')}`;
        }
      }

      // 3. Verify password with whitespace trimming
      const expectedPassword = getTeamPassword(squadId, officialName);
      const cleanInputPassword = passwordInput.trim();
      const cleanExpectedPassword = (expectedPassword || '').trim();

      if (cleanInputPassword !== cleanExpectedPassword) {
        setAuthError('Invalid team password. Please enter the team password provided to your team leader.');
        setIsVerifying(false);
        return;
      }

      // If no supabase record exists, construct a fallback record from the official 40 list
      const effectiveRecord: TeamRegistration = record || {
        id: `reg-${squadId}`,
        team_name: officialName,
        team_leader_name: qualified ? qualified.teamName + ' Leader' : 'Team Leader',
        leader_email: cleanEmail,
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

      // Successful authentication!
      setMatchedTeam({ rank, name: officialName, squadId });
      setRegistration(effectiveRecord);

      // Save persistent session so team stays signed in across refreshes
      saveActiveTeamSession({
        squadId,
        teamName: officialName,
        leaderEmail: cleanEmail,
        rank
      });

      // If this team has already selected and locked their Problem Statement,
      // redirect them straight to their Team Profile!
      const currentSelections = readSelections();
      if (currentSelections[squadId] || currentSelections[officialName] || currentSelections[`squad-${rank}`]) {
        onNavigate('team-profile');
        return;
      }

      // Populate editable fields with live data from Supabase or fallback
      setLeaderPhone(effectiveRecord.leader_phone || '');
      setCollegeName(effectiveRecord.college || '');
      setMember2Name(effectiveRecord.member2_name || '');
      setMember2Email(effectiveRecord.member2_email || '');
      setMember3Name(effectiveRecord.member3_name || '');
      setMember3Email(effectiveRecord.member3_email || '');
      setMember4Name(effectiveRecord.member4_name || '');
      setMember4Email(effectiveRecord.member4_email || '');
      setMember5Name(effectiveRecord.member5_name || '');
      setMember5Email(effectiveRecord.member5_email || '');

      // Advance directly to Step 2 (Team Profile & Details)
      setCurrentStep(2);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Authentication error:', err);
      setAuthError('An error occurred during verification. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Step 2: Save updated team details to Supabase
  const handleSaveTeamDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registration) return;

    setIsSavingDetails(true);
    setSaveMessage('');

    try {
      const payload = {
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
      };

      let saveError: any = null;
      // 1. Update registrations table
      try {
        if (registration.id && !registration.id.startsWith('reg-') && !registration.id.startsWith('fallback-')) {
          const { error } = await supabase.from('registrations').update(payload).eq('id', registration.id);
          saveError = error;
        } else if (registration.leader_email) {
          const { error } = await supabase.from('registrations').update(payload).ilike('leader_email', registration.leader_email);
          saveError = error;
        }
      } catch (e) {
        console.warn('Registrations table update error:', e);
      }

      // 2. Also save full details directly into the new round2_ps_selections schema!
      if (matchedTeam) {
        const res = await saveRound2TeamRoster({
          squad_id: matchedTeam.squadId,
          team_name: matchedTeam.name,
          leader_name: registration.team_leader_name,
          leader_email: registration.leader_email || emailInput,
          leader_phone: payload.leader_phone,
          college: payload.college,
          team_size: member5Name.trim() ? 5 : 4,
          member2_name: payload.member2_name,
          member2_email: payload.member2_email,
          member3_name: payload.member3_name,
          member3_email: payload.member3_email,
          member4_name: payload.member4_name,
          member4_email: payload.member4_email,
          member5_name: payload.member5_name || undefined,
          member5_email: payload.member5_email || undefined,
          rank: matchedTeam.rank,
        });
        if (!res.success && !saveError) {
          saveError = { message: res.error };
        }
      }

      if (saveError) {
        console.warn('Team details partial save notice:', saveError);
        setSaveMessage('Team details recorded! Proceeding to challenge selection...');
      } else {
        setSaveMessage('Team details updated successfully in database!');
      }

      // Advance to Step 3: Choose Problem Statement
      setTimeout(() => {
        setCurrentStep(3);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }, 400);
    } catch (err) {
      console.error(err);
      setCurrentStep(3);
    } finally {
      setIsSavingDetails(false);
    }
  };

  // Step 3: Lock Round 2 Problem Statement selection & Redirect to Profile Page
  const handleLockSelection = async () => {
    if (!matchedTeam || !selectedPs) return;

    const qualified = findQualifiedTeamBySquadId(matchedTeam.squadId) || findQualifiedTeamByName(matchedTeam.name);
    if (!qualified) return;

    const result = await lockProblemStatementSelection(
      qualified,
      selectedPs,
      counts,
      allocationState.lockedMap
    );

    if (!result.success) {
      setPsError(result.error || 'Failed to lock problem statement.');
      return;
    }

    setPsError('');

    // Persist session
    saveActiveTeamSession({
      squadId: matchedTeam.squadId,
      teamName: matchedTeam.name,
      leaderEmail: registration?.leader_email || emailInput,
      rank: matchedTeam.rank
    });

    // Directly redirect to the profile page (Mithul's team-profile)
    onNavigate('team-profile');
  };

  const activeLockedPs = matchedTeam ? ROUND2_PROBLEM_STATEMENTS.find(ps => ps.id === selections[matchedTeam.squadId]) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-dark sketch-border text-xs font-mono font-bold text-ink uppercase tracking-wider shadow-sketch-sm">
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
          ROUND 2 SQUAD PORTAL
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-ink">
          TEAM ACCESS &{' '}
          <span className="font-marker text-[#EA580C] not-italic inline-block">
            CHALLENGE SELECT
          </span>
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          Shortlisted team leaders: sign in to review your verified roster, edit member details, and lock your Round 2 Problem Statement.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="bg-paper-light sketch-border rounded-sketch-lg p-4 sm:p-7 md:p-10 shadow-sketch-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Flow Column */}
          <div className="lg:col-span-7 space-y-6">

            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b-2 border-ink pb-4 gap-2">
              {[
                { step: 1, label: 'LEADER SIGN IN', shortLabel: 'Sign In' },
                { step: 2, label: 'TEAM DETAILS', shortLabel: 'Team Roster' },
                { step: 3, label: 'CHOOSE PS', shortLabel: 'Choose PS' }
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-display font-black text-xs sketch-border flex-shrink-0 ${
                    currentStep === s.step
                      ? 'bg-hpl-purple text-white shadow-sketch-sm'
                      : currentStep > s.step
                      ? 'bg-hpl-emerald text-white'
                      : 'bg-paper-dark text-ink'
                  }`}>
                    {currentStep > s.step ? '✓' : s.step}
                  </span>
                  <span className="hidden sm:inline text-xs font-mono font-bold text-ink uppercase">
                    {s.label}
                  </span>
                  <span className="inline sm:hidden text-[11px] font-mono font-bold text-ink uppercase">
                    {s.shortLabel}
                  </span>
                </div>
              ))}
            </div>

            {/* ========================================================================= */}
            {/* STEP 1: LEADER SIGN IN (Email & Password Only)                            */}
            {/* ========================================================================= */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-[#1E1B4B] flex items-center justify-center shadow-sketch-sm">
                  <LockKeyhole className="w-6 h-6 text-[#1E1B4B]" />
                </div>
                <div>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1E1B4B] uppercase tracking-tight">
                    Team Leader Sign In
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Enter your registered Team Leader email and team password. Your team details and member records will be automatically fetched from the database.
                  </p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4" autoComplete="off">
                  <div>
                    <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                      Team Leader Registered Email *
                    </label>
                    <input
                      required
                      type="email"
                      name="hpl_team_email"
                      autoComplete="off"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. sridevi.25ad043@sode-edu.in"
                      className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                      Team Access Password *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="hpl_team_secret_pass"
                        autoComplete="new-password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter team access password"
                        className="w-full px-4 pr-12 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink text-xs font-mono font-bold cursor-pointer"
                      >
                        {showPassword ? 'HIDE' : 'SHOW'}
                      </button>
                    </div>
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-800 text-xs font-mono font-bold animate-in fade-in">
                      {authError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#1E1B4B] hover:bg-amber-400 hover:text-[#1E1B4B] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_#1E1B4B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <span>{isVerifying ? 'FETCHING TEAM DETAILS...' : 'SIGN IN & VIEW SQUAD DETAILS'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: TEAM DETAILS & MEMBER ROSTER (Mithul Design: Live from Supabase)  */}
            {/* ========================================================================= */}
            {currentStep === 2 && matchedTeam && registration && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Header Banner - Mithul's dark card */}
                <div className="bg-[#1E1B4B] text-white rounded-2xl p-5 sm:p-6 shadow-[5px_5px_0px_#F59E0B] border-2 border-[#1E1B4B]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest">
                        Squad Profile • {matchedTeam.squadId}
                      </p>
                      <h2 className="font-display font-black text-2xl sm:text-4xl mt-1">
                        {matchedTeam.name}
                      </h2>
                      <p className="text-amber-200 text-xs sm:text-sm mt-1 flex items-center gap-2">
                        <School className="w-4 h-4 shrink-0" />
                        <span>{collegeName || registration.college || 'Registered College / Institution'}</span>
                      </p>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-mono text-xs font-bold uppercase tracking-wider">
                      Slot #{String(matchedTeam.rank).padStart(2, '0')} Qualified
                    </span>
                  </div>
                </div>

                {/* Team Members & Details Display (Live from Supabase) */}
                <div className="bg-white border-2 border-[#1E1B4B] rounded-2xl p-5 shadow-[4px_4px_0px_#1E1B4B] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-300 border-2 border-[#1E1B4B] flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#1E1B4B]" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-lg text-[#1E1B4B] uppercase">
                          Team Members & Details
                        </h3>
                        <p className="text-[11px] text-slate-500 font-mono">
                          Fetched live from Supabase registration database
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                      {teamMembers.length} Members
                    </span>
                  </div>

                  {/* Members Grid (Mithul's verified layout) */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {teamMembers.map((m, idx) => (
                      <div 
                        key={idx} 
                        className={`rounded-xl border-2 p-3.5 transition-all ${
                          idx === 0 
                            ? 'border-amber-400 bg-amber-50/70 shadow-xs' 
                            : 'border-[#1E1B4B]/15 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-black uppercase ${
                            idx === 0 
                              ? 'bg-amber-400 text-[#1E1B4B]' 
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {m.role}
                          </span>
                          {idx === 0 && (
                            <span className="text-[10px] font-mono font-bold text-amber-800 flex items-center gap-1">
                              <KeyRound className="w-3 h-3" /> Team Leader
                            </span>
                          )}
                        </div>
                        <div className="font-display font-black text-sm text-[#1E1B4B]">
                          {m.name || 'Name not provided'}
                        </div>
                        <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 break-all">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{m.email || 'Email not available'}</span>
                        </div>
                        {m.phone && (
                          <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>+91 {m.phone}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSaveTeamDetails} className="space-y-4">
                  <div className="border-b border-ink/10 pb-2">
                    <h3 className="font-display font-black text-base text-[#1E1B4B] uppercase">
                      1. Team Leader & College Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                        Team Leader Name
                      </label>
                      <input
                        disabled
                        type="text"
                        value={registration.team_leader_name}
                        className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-dark text-ink font-display font-bold text-xs opacity-80 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                        Team Leader Email
                      </label>
                      <input
                        disabled
                        type="email"
                        value={registration.leader_email}
                        className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-dark text-ink text-xs opacity-80 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                        Leader Contact Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        value={leaderPhone}
                        onChange={(e) => setLeaderPhone(e.target.value)}
                        placeholder="Leader Phone Number"
                        className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-ink text-xs font-sans focus:ring-2 focus:ring-hpl-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                        College / Institution *
                      </label>
                      <input
                        required
                        type="text"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        placeholder="College Name"
                        className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-ink text-xs font-sans focus:ring-2 focus:ring-hpl-purple"
                      />
                    </div>
                  </div>

                  <div className="border-b border-ink/10 pb-2 pt-2">
                    <h3 className="font-display font-black text-base text-[#1E1B4B] uppercase">
                      2. Team Member Roster (Edit & Confirm)
                    </h3>
                  </div>

                  {/* Member 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-paper-cream rounded-xl sketch-border">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-ink uppercase mb-1">
                        Member 2 Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={member2Name}
                        onChange={(e) => setMember2Name(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-ink/20 text-xs bg-white font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-ink uppercase mb-1">
                        Member 2 Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={member2Email}
                        onChange={(e) => setMember2Email(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-ink/20 text-xs bg-white font-sans"
                      />
                    </div>
                  </div>

                  {/* Member 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-paper-cream rounded-xl sketch-border">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-ink uppercase mb-1">
                        Member 3 Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={member3Name}
                        onChange={(e) => setMember3Name(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-ink/20 text-xs bg-white font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-ink uppercase mb-1">
                        Member 3 Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={member3Email}
                        onChange={(e) => setMember3Email(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-ink/20 text-xs bg-white font-sans"
                      />
                    </div>
                  </div>

                  {/* Member 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-paper-cream rounded-xl sketch-border">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-ink uppercase mb-1">
                        Member 4 Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={member4Name}
                        onChange={(e) => setMember4Name(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-ink/20 text-xs bg-white font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-ink uppercase mb-1">
                        Member 4 Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={member4Email}
                        onChange={(e) => setMember4Email(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-ink/20 text-xs bg-white font-sans"
                      />
                    </div>
                  </div>

                  {/* Member 5 (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-paper-cream rounded-xl sketch-border">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-ink uppercase mb-1">
                        Member 5 Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={member5Name}
                        onChange={(e) => setMember5Name(e.target.value)}
                        placeholder="Leave empty if 4 members"
                        className="w-full px-3 py-1.5 rounded-lg border border-ink/20 text-xs bg-white font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-ink uppercase mb-1">
                        Member 5 Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={member5Email}
                        onChange={(e) => setMember5Email(e.target.value)}
                        placeholder="Leave empty if 4 members"
                        className="w-full px-3 py-1.5 rounded-lg border border-ink/20 text-xs bg-white font-sans"
                      />
                    </div>
                  </div>

                  {saveMessage && (
                    <div className="p-3 bg-emerald-100 border-2 border-emerald-500 rounded-xl text-emerald-900 text-xs font-mono font-bold">
                      {saveMessage}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-ink">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2.5 rounded-xl border-2 border-ink text-xs font-mono font-bold uppercase hover:bg-paper-dark cursor-pointer"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      disabled={isSavingDetails}
                      className="px-6 py-3 rounded-2xl bg-[#1E1B4B] hover:bg-amber-400 hover:text-[#1E1B4B] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#1E1B4B] transition-all"
                    >
                      <span>{isSavingDetails ? 'SAVING UPDATES...' : 'CONFIRM & NEXT: CHOOSE PS'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: CHOOSE PROBLEM STATEMENT (Mithul's 10-team limited selection)      */}
            {/* ========================================================================= */}
            {currentStep === 3 && matchedTeam && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest">
                      {matchedTeam.name} • Slot #{String(matchedTeam.rank).padStart(2, '0')}
                    </p>
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1E1B4B] mt-0.5">
                      Select Round 2 Problem Statement
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Each track has a strict cap of 10 teams. Once a problem statement reaches 10 teams, it is automatically removed from selection.
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-mono font-bold text-emerald-900 shrink-0">
                    {getPendingProblemStatements(counts).length} Tracks Available
                  </div>
                </div>

                {/* Overflow Team Banner */}
                {(() => {
                  const overflowRecords = readOverflowRecords();
                  const isOverflow = !!overflowRecords[matchedTeam.squadId] && !overflowRecords[matchedTeam.squadId].reSelectionUsed;
                  if (!isOverflow) return null;
                  const originalTrack = overflowRecords[matchedTeam.squadId];

                  return (
                    <div className="p-4 bg-amber-50 border-2 border-amber-400 rounded-2xl flex items-start gap-3 shadow-xs">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-display font-black text-amber-900 text-sm uppercase tracking-wide">
                          One-Time Challenge Re-Selection Granted
                        </h4>
                        <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                          Your team had selected <strong>{originalTrack.originalPsCode}: {originalTrack.originalPsTitle}</strong>, but this track reached the strict 10-team cap. The first 10 teams were retained. You have been granted a <strong>one-time opportunity</strong> to select from the available problem statements below. Full tracks have been removed.
                        </p>
                      </div>
                    </div>
                  );
                })()}

                <div className="grid gap-4">
                  {getPendingProblemStatements(counts).map((ps) => {
                    const count = counts[ps.id] || 0;
                    const remainingSlots = STRICT_CAP_PER_TRACK - count;
                    const isSelected = selectedPs === ps.id;

                    return (
                      <button
                        type="button"
                        key={ps.id}
                        onClick={() => { setSelectedPs(ps.id); setPsError(''); }}
                        className={`block w-full text-left rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/80 shadow-[3px_3px_0px_#F59E0B]'
                            : 'border-[#1E1B4B]/20 bg-white hover:border-[#1E1B4B]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-black text-indigo-700 uppercase bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                                {ps.psCode}
                              </span>
                              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                                {remainingSlots} SLOTS AVAILABLE
                              </span>
                            </div>
                            <h3 className="font-display font-black text-lg mt-1.5 text-[#1E1B4B]">
                              {ps.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1">
                              {ps.subtitle}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800">
                            {count}/10 LOCKED
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  {getPendingProblemStatements(counts).length === 0 && (
                    <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 space-y-2">
                      <p className="text-base font-display font-black text-slate-700 uppercase">
                        All Problem Statement Tracks Are Full (10/10)
                      </p>
                      <p className="text-xs text-slate-500">
                        Please contact the hackathon committee for assistance.
                      </p>
                    </div>
                  )}
                </div>

                {psError && (
                  <div className="p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-800 text-xs font-mono font-bold">
                    {psError}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-ink">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2.5 rounded-xl border-2 border-ink text-xs font-mono font-bold uppercase hover:bg-paper-dark cursor-pointer"
                  >
                    ← Back to Team Roster
                  </button>

                  <button
                    type="button"
                    onClick={handleLockSelection}
                    disabled={!selectedPs}
                    className="px-6 py-3 rounded-2xl bg-[#1E1B4B] hover:bg-amber-400 hover:text-[#1E1B4B] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#1E1B4B] transition-all disabled:opacity-40"
                  >
                    <span>LOCK PROBLEM STATEMENT</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 4: SELECTION CONFIRMATION PASS                                       */}
            {/* ========================================================================= */}
            {currentStep === 4 && matchedTeam && (
              <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-800 mx-auto flex items-center justify-center shadow-sketch-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
                    ✦ ROUND 2 CHALLENGE LOCKED ✦
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black font-display uppercase text-ink">
                    CHALLENGE SECURED!
                  </h2>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Your team <strong>{matchedTeam.name}</strong> has locked in their challenge slot for Hackathon Premier League Round 2.
                  </p>
                </div>

                <div className="bg-[#1E1B4B] text-white rounded-2xl p-6 text-left space-y-3 shadow-[5px_5px_0px_#F59E0B] border-2 border-[#1E1B4B]">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="font-display font-black text-base text-amber-300 uppercase">
                      HPL ROUND 2 SQUAD VERIFICATION PASS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-mono text-[10px] font-bold">
                      LOCKED
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">SQUAD:</span>
                      <strong className="text-amber-300 text-sm">{matchedTeam.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">SQUAD ID:</span>
                      <strong className="text-white">{matchedTeam.squadId}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[10px]">LOCKED CHALLENGE:</span>
                      <strong className="text-white text-xs sm:text-sm">
                        {activeLockedPs ? `${activeLockedPs.psCode}: ${activeLockedPs.title}` : 'Selected'}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2.5 rounded-xl border-2 border-ink text-xs font-display font-black uppercase hover:bg-slate-100 cursor-pointer"
                  >
                    Change Problem Statement
                  </button>
                  <button
                    onClick={() => onNavigate('shortlisted')}
                    className="px-6 py-2.5 rounded-xl bg-[#1E1B4B] text-white font-display font-black text-xs uppercase hover:bg-amber-400 hover:text-[#1E1B4B] cursor-pointer"
                  >
                    View All Shortlisted Squads →
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Illustration Column (Keeps the same aesthetic!) */}
          <div className="lg:col-span-5 flex justify-center">
            <RegisterIllustration onClick={() => onNavigate('team-profile')} />
          </div>

        </div>
      </div>
    </div>
  );
};
