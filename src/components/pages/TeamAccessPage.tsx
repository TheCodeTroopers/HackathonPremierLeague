import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, LockKeyhole, ShieldCheck, Users } from 'lucide-react';
import { PageRoute } from '../../types';
import { SHORTLISTED_TEAMS_DATA } from '../../data/hplData';
import { ROUND2_PROBLEM_STATEMENTS } from './ProblemStatementsPage';
import { changeTeamPassword, findTeamRegistration, getTeamPassword, TeamRegistration } from '../../services/teamPortalService';

interface TeamAccessPageProps {
    view: 'login' | 'select' | 'portal';
    squadId: string | null;
    onNavigate: (page: PageRoute) => void;
}

const SELECTIONS_KEY = 'hpl-round2-ps-selections';
type Selections = Record<string, string>;

const getTeam = (squadId: string | null) => {
    const rank = Number(squadId?.split('-').pop() || 0);
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
    const team = getTeam(squadId);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [registration, setRegistration] = useState<TeamRegistration | null>(null);
    const [registrationLoading, setRegistrationLoading] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [selections, setSelections] = useState<Selections>(() => readSelections());
    const [selectedPs, setSelectedPs] = useState('');

    useEffect(() => {
        let isMounted = true;
        const loadRegistration = async () => {
            if (!team) {
                setRegistrationLoading(false);
                return;
            }
            try {
                const record = await findTeamRegistration(team.name);
                if (isMounted) setRegistration(record);
            } catch {
                if (isMounted) setError('Unable to load this team from the registration database. Please try again.');
            } finally {
                if (isMounted) setRegistrationLoading(false);
            }
        };
        void loadRegistration();
        return () => { isMounted = false; };
    }, [team]);

    useEffect(() => {
        const sync = () => setSelections(readSelections());
        window.addEventListener('storage', sync);
        window.addEventListener('hpl-selection-update', sync);
        return () => {
            window.removeEventListener('storage', sync);
            window.removeEventListener('hpl-selection-update', sync);
        };
    }, []);

    useEffect(() => {
        if (team) setSelectedPs(selections[team.squadId] || '');
    }, [team?.squadId, selections]);

    const counts = useMemo(() => ROUND2_PROBLEM_STATEMENTS.reduce<Record<string, number>>((result, ps) => {
        result[ps.id] = Object.values(selections).filter((selection) => selection === ps.id).length;
        return result;
    }, {}), [selections]);

    if (!team) return <EmptyTeamState onNavigate={onNavigate} />;

    const leaderEmail = registration?.leader_email?.trim().toLowerCase() || '';
    const assignedPassword = team ? getTeamPassword(team.squadId, team.name) : '';

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        if (!registration) {
            setError('This team could not be matched to a registration record.');
            return;
        }
        if (email.trim().toLowerCase() !== leaderEmail || password !== assignedPassword) {
            setError(`Use the team leader email registered for ${team.name} and the assigned password.`);
            return;
        }
        setError('');
        onNavigate('team-select');
    };

    const handlePasswordChange = (event: React.FormEvent) => {
        event.preventDefault();
        if (newPassword.length < 8) {
            setPasswordMessage('Password must be at least 8 characters.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordMessage('Passwords do not match.');
            return;
        }
        changeTeamPassword(team.squadId, newPassword);
        setNewPassword('');
        setConfirmPassword('');
        setPasswordMessage('Password updated for this browser.');
    };

    const saveSelection = () => {
        if (!selectedPs) return;
        const latestSelections = readSelections();
        const currentSelection = latestSelections[team.squadId];
        const countForSelection = Object.values(latestSelections).filter((selection) => selection === selectedPs).length;
        if (countForSelection >= 10 && currentSelection !== selectedPs) {
            setSelections(latestSelections);
            setError('This problem statement has reached its 10-team limit. Choose another one.');
            return;
        }
        const nextSelections = { ...latestSelections, [team.squadId]: selectedPs };
        window.localStorage.setItem(SELECTIONS_KEY, JSON.stringify(nextSelections));
        window.dispatchEvent(new Event('hpl-selection-update'));
        setSelections(nextSelections);
        onNavigate('team-portal');
    };

    return (
        <div className="min-h-screen bg-[#FAF6EE] text-[#1E1B4B] px-4 py-10 sm:px-6">
            <div className="max-w-5xl mx-auto">
                <button onClick={() => onNavigate('shortlisted')} className="inline-flex items-center gap-2 text-xs font-display font-black uppercase tracking-wider text-slate-600 hover:text-[#1E1B4B] mb-6"><ChevronLeft className="w-4 h-4" /> Back to shortlisted squads</button>

                {view === 'login' && <div className="max-w-lg mx-auto bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_#1E1B4B]">
                    <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-[#1E1B4B] flex items-center justify-center mb-5"><LockKeyhole /></div>
                    <p className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest">Round 2 team access</p>
                    <h1 className="font-display font-black text-3xl sm:text-4xl mt-2">Sign in, {team.name}</h1>
                    <p className="text-sm text-slate-600 mt-3">Only the team leader can select and lock the squad's problem statement.</p>
                    <form onSubmit={handleLogin} className="space-y-4 mt-7">
                        <label className="block text-xs font-display font-black uppercase tracking-wider">Team leader email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={leaderEmail || 'Loading registered email...'} disabled={registrationLoading} className="mt-2 w-full rounded-xl border-2 border-[#1E1B4B] bg-white px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-60" /></label>
                        <label className="block text-xs font-display font-black uppercase tracking-wider">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your team password" className="mt-2 w-full rounded-xl border-2 border-[#1E1B4B] bg-white px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-400" /></label>
                        <div className="rounded-xl bg-amber-50 border border-amber-300 p-3 text-xs text-amber-900">Assigned dummy password for this team: <strong>{assignedPassword}</strong></div>
                        {error && <p className="text-sm font-bold text-rose-700">{error}</p>}
                        <button type="submit" className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-[#1E1B4B] px-5 py-3 text-white font-display font-black text-sm uppercase tracking-wider hover:bg-amber-400 hover:text-[#1E1B4B]">Continue <ArrowRight className="w-4 h-4" /></button>
                    </form>
                </div>}

                {view === 'select' && <div className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-3xl p-5 sm:p-8 shadow-[6px_6px_0px_#1E1B4B]">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7"><div><p className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest">Signed in as {leaderEmail || 'registered team leader'}</p><h1 className="font-display font-black text-3xl sm:text-4xl mt-2">Choose your problem statement</h1><p className="text-sm text-slate-600 mt-2">Each challenge is available to a maximum of 10 teams. Counters update across open browsers.</p></div><div className="rounded-xl bg-emerald-50 border border-emerald-300 px-3 py-2 text-xs font-mono font-bold text-emerald-900">40 teams / 4 challenges</div></div>
                    <div className="grid gap-4 md:grid-cols-2">{ROUND2_PROBLEM_STATEMENTS.map((ps) => { const count = counts[ps.id] || 0; const isFull = count >= 10 && selections[team.squadId] !== ps.id; return <button type="button" key={ps.id} disabled={isFull} aria-pressed={selectedPs === ps.id} onClick={() => { setSelectedPs(ps.id); setError(''); }} className={`block w-full text-left rounded-2xl border-2 p-4 cursor-pointer transition-colors ${selectedPs === ps.id ? 'border-amber-500 bg-amber-50' : 'border-[#1E1B4B]/20 bg-white'} ${isFull ? 'opacity-60 cursor-not-allowed' : 'hover:border-[#1E1B4B]'}`}><div className="flex items-start justify-between gap-3"><div><p className="font-mono text-xs font-black text-slate-500">{ps.psCode}</p><h2 className="font-display font-black text-xl mt-1">{ps.title}</h2><p className="text-sm text-slate-600 mt-1">{ps.subtitle}</p></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-mono font-bold ${isFull ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>{count}/10 {isFull ? 'FULL' : 'TEAMS'}</span></div></button>; })}</div>
                    {error && <p className="mt-4 text-sm font-bold text-rose-700">{error}</p>}
                    <button onClick={saveSelection} disabled={!selectedPs} className="mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E1B4B] px-6 py-3 text-white font-display font-black text-sm uppercase tracking-wider disabled:opacity-40 hover:bg-amber-400 hover:text-[#1E1B4B]">Lock selection <CheckCircle2 className="w-4 h-4" /></button>
                </div>}

                {view === 'portal' && <div className="space-y-5"><div className="bg-[#1E1B4B] text-white rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#F59E0B]"><p className="font-mono text-xs font-bold text-amber-300 uppercase tracking-widest">Team portal / {team.squadId}</p><h1 className="font-display font-black text-4xl sm:text-5xl mt-2">{team.name}</h1><p className="text-white/70 mt-2">Round 2 qualified squad workspace</p></div><div className="grid gap-5 md:grid-cols-2"><PortalCard title="Squad details"><Detail label="Slot" value={`#${String(team.rank).padStart(2, '0')}`} /><Detail label="Squad ID" value={team.squadId} /><Detail label="Team leader email" value={leaderEmail || 'Unavailable'} /><Detail label="Status" value="Round 2 Live" /></PortalCard><PortalCard title="Problem statement"><Detail label="Selected challenge" value={ROUND2_PROBLEM_STATEMENTS.find((ps) => ps.id === selections[team.squadId])?.title || 'Not selected'} /><Detail label="Selection status" value="Locked for Round 2" /><Detail label="Capacity" value={`${counts[selections[team.squadId]] || 0}/10 teams`} /></PortalCard></div><PortalCard title="Change password"><form onSubmit={handlePasswordChange} className="grid gap-3 sm:grid-cols-2"><input required minLength={8} type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="New password" className="rounded-xl border-2 border-[#1E1B4B]/20 px-3 py-2 text-sm outline-none focus:border-amber-400" /><input required minLength={8} type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm new password" className="rounded-xl border-2 border-[#1E1B4B]/20 px-3 py-2 text-sm outline-none focus:border-amber-400" /><button type="submit" className="rounded-xl bg-[#1E1B4B] px-4 py-2 text-white font-display font-black text-xs uppercase hover:bg-amber-400 hover:text-[#1E1B4B]">Update password</button></form>{passwordMessage && <p className="mt-3 text-sm font-bold text-emerald-700">{passwordMessage}</p>}</PortalCard><div className="bg-white border-2 border-[#1E1B4B]/20 rounded-2xl p-5 text-sm text-slate-600 flex items-start gap-3"><Users className="w-5 h-5 text-emerald-600 shrink-0" /><p>Your team workspace is ready. Keep this portal link available for Round 2 announcements, submissions, and evaluation updates.</p></div></div>}
            </div>
        </div>
    );
};

const PortalCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => <section className="bg-[#FFFDF7] border-2 border-[#1E1B4B] rounded-2xl p-5 shadow-[3px_3px_0px_#1E1B4B]"><h2 className="font-display font-black text-lg uppercase tracking-tight mb-4">{title}</h2><div className="space-y-3">{children}</div></section>;
const Detail: React.FC<{ label: string; value: string }> = ({ label, value }) => <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 text-sm"><span className="text-slate-500">{label}</span><strong className="text-right text-[#1E1B4B]">{value}</strong></div>;
const EmptyTeamState: React.FC<{ onNavigate: (page: PageRoute) => void }> = ({ onNavigate }) => <div className="max-w-lg mx-auto bg-white border-2 border-[#1E1B4B] rounded-3xl p-8 text-center"><ShieldCheck className="w-10 h-10 mx-auto text-amber-500" /><h1 className="font-display font-black text-2xl mt-4">Choose a squad first</h1><button onClick={() => onNavigate('shortlisted')} className="mt-5 rounded-xl bg-[#1E1B4B] text-white px-5 py-3 font-display font-black text-sm uppercase">View shortlisted squads</button></div>;
