import React, { useState, useEffect, useCallback } from 'react';
import { PageRoute, RegistrationFormData } from '../../types';
import { Button } from '../common/Button';
import { RegisterIllustration } from '../illustrations/RegisterIllustration';
import { SparkleDoodle } from '../illustrations/MicroDoodles';
import { CheckCircle2, ArrowRight, ArrowLeft, QrCode, Trophy, AlertCircle, Loader2, XCircle, Check } from 'lucide-react';
import { supabase } from '../../client_config';

interface RegisterPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live team name availability state
  const [teamNameStatus, setTeamNameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [teamNameFeedback, setTeamNameFeedback] = useState<string | null>(null);

  const [formData, setFormData] = useState<RegistrationFormData>({
    teamName: '',
    track: 'Build For Udupi',
    teamLeaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: 'Shri Madhwa Vadiraja Institute of Technology and Management',
    teamSize: 5,
    member2Name: '',
    member2Email: '',
    member3Name: '',
    member3Email: '',
    member4Name: '',
    member4Email: '',
    member5Name: '',
    member5Email: '',
    projectIdea: '',
    githubOrg: '',
    acceptRules: true
  });

  // Debounced real-time team name availability check
  useEffect(() => {
    const rawName = formData.teamName.trim();
    if (rawName.length < 3) {
      setTeamNameStatus('idle');
      setTeamNameFeedback(null);
      return;
    }

    setTeamNameStatus('checking');
    setTeamNameFeedback('Checking availability...');

    const timer = setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from('registrations')
          .select('id')
          .ilike('team_name', rawName)
          .limit(1);

        if (error) {
          // If query restricted or network hiccup, don't hard block
          setTeamNameStatus('idle');
          setTeamNameFeedback(null);
          return;
        }

        if (data && data.length > 0) {
          setTeamNameStatus('taken');
          setTeamNameFeedback(`"${rawName}" is already taken. Please choose another squad name.`);
        } else {
          setTeamNameStatus('available');
          setTeamNameFeedback(`"${rawName}" is available!`);
        }
      } catch (err) {
        setTeamNameStatus('idle');
        setTeamNameFeedback(null);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [formData.teamName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (currentStep === 1) {
      // Quick check if team name is already taken
      setIsSubmitting(true);
      try {
        const { data: existing } = await supabase
          .from('registrations')
          .select('id')
          .ilike('team_name', formData.teamName.trim())
          .limit(1);

        if (existing && existing.length > 0) {
          setErrorMessage(`Squad name "${formData.teamName.trim()}" is already taken! Please choose a unique team name.`);
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        // Continue if select is restricted by RLS
      } finally {
        setIsSubmitting(false);
      }

      setCurrentStep(2);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      setIsSubmitting(true);
      try {
        const { error } = await supabase.from('registrations').insert([
          {
            team_name: formData.teamName.trim(),
            track: formData.track,
            team_leader_name: formData.teamLeaderName.trim(),
            leader_email: formData.leaderEmail.trim().toLowerCase(),
            leader_phone: formData.leaderPhone.trim(),
            college: formData.college.trim(),
            team_size: Number(formData.teamSize) || 5,
            member2_name: formData.member2Name.trim(),
            member2_email: formData.member2Email.trim().toLowerCase(),
            member3_name: formData.member3Name.trim(),
            member3_email: formData.member3Email.trim().toLowerCase(),
            member4_name: formData.member4Name.trim(),
            member4_email: formData.member4Email.trim().toLowerCase(),
            member5_name: formData.member5Name?.trim() || null,
            member5_email: formData.member5Email?.trim().toLowerCase() || null,
            project_idea: formData.projectIdea.trim(),
            github_org: formData.githubOrg?.trim() || null,
            accept_rules: formData.acceptRules
          }
        ]);

        if (error) {
          console.error('Supabase registration error:', error);
          if (
            error.code === '23505' ||
            error.message?.toLowerCase().includes('unique') ||
            error.message?.toLowerCase().includes('duplicate')
          ) {
            setErrorMessage(`Squad name "${formData.teamName.trim()}" is already registered. Please go back to Step 1 and choose a unique team name.`);
          } else {
            setErrorMessage(error.message || 'Failed to submit registration. Please try again.');
          }
          return;
        }

        setIsSubmitted(true);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      } catch (err: any) {
        console.error('Unexpected error:', err);
        setErrorMessage(err.message || 'An unexpected error occurred while saving data.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-dark sketch-border text-xs font-mono font-bold text-ink uppercase tracking-wider shadow-sketch-sm">
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
          SEASON 2026 REGISTRATION
          <SparkleDoodle className="w-4 h-4 text-hpl-gold" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-ink">
          REGISTER YOUR{' '}
          <span className="font-marker text-[#EA580C] not-italic inline-block">
            TEAM
          </span>
        </h1>
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
          Let the league begin! Enter your squad details and secure your place on the starting grid.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-paper-light sketch-border rounded-sketch-lg p-6 sm:p-10 shadow-sketch-xl">
        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Form Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Stepper Indicator */}
              <div className="flex items-center justify-between border-b-2 border-ink pb-4">
                {[
                  { step: 1, label: 'SQUAD & TRACK' },
                  { step: 2, label: 'MEMBERS' },
                  { step: 3, label: 'COLLEGE & CONFIRM' }
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-xs sketch-border ${
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
                  </div>
                ))}
              </div>

              {/* Form Flow */}
              <form onSubmit={handleNext} className="space-y-4">
                {/* STEP 1: SQUAD & TRACK */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-mono font-bold text-ink uppercase">
                          Squad / Team Name *
                        </label>
                        {teamNameStatus === 'checking' && (
                          <span className="text-[11px] font-mono text-amber-700 font-bold flex items-center gap-1 animate-pulse">
                            <Loader2 className="w-3 h-3 animate-spin text-amber-600" />
                            Checking availability...
                          </span>
                        )}
                        {teamNameStatus === 'available' && (
                          <span className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1 bg-emerald-100 border border-emerald-400 px-2 py-0.5 rounded-full animate-in fade-in">
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                            Name Available
                          </span>
                        )}
                        {teamNameStatus === 'taken' && (
                          <span className="text-[11px] font-mono text-rose-700 font-bold flex items-center gap-1 bg-rose-100 border border-rose-400 px-2 py-0.5 rounded-full animate-in shake duration-200">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            Already Taken
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        name="teamName"
                        required
                        value={formData.teamName}
                        onChange={handleChange}
                        placeholder="e.g. CodeTroopers, ByteBrawlers"
                        className={`w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink font-display font-bold text-sm focus:outline-none focus:ring-2 transition-all ${
                          teamNameStatus === 'taken'
                            ? 'border-2 border-red-500 focus:ring-red-500 bg-red-50/50'
                            : teamNameStatus === 'available'
                            ? 'border-2 border-emerald-500 focus:ring-emerald-500'
                            : 'focus:ring-hpl-purple'
                        }`}
                      />
                      {teamNameStatus === 'taken' && teamNameFeedback && (
                        <p className="mt-1.5 text-xs text-red-600 font-mono font-bold flex items-center gap-1 animate-in fade-in">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          {teamNameFeedback}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                          Preferred Challenge Track *
                        </label>
                        <select
                          name="track"
                          value={formData.track}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink font-display font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                        >
                          <option value="Build For Udupi">Build For Udupi (Smart City & Heritage)</option>
                          <option value="Coastal Tech">Coastal Tech (Fisheries & Ecology)</option>
                          <option value="AI for Governance">AI for Governance (Civic WhatsApp Bots)</option>
                          <option value="Smart Pilgrimage">Smart Pilgrimage (Queue & Voice Guides)</option>
                          <option value="Green Tech">Green Tech (Beach Cleanliness & Waste)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                          Team Size *
                        </label>
                        <select
                          name="teamSize"
                          value={formData.teamSize}
                          disabled
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink font-display font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                        >
                          <option value={5} >5 Members</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                        Brief Problem Pitch / Innovation Idea (Optional at registration)
                      </label>
                      <textarea
                        name="projectIdea"
                        rows={3}
                        value={formData.projectIdea}
                        onChange={handleChange}
                        placeholder="Describe the real-world issue in Udupi you plan to address..."
                        className="w-full px-4 py-2 rounded-xl sketch-border bg-paper-cream text-ink font-sans text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: MEMBERS */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="p-3 bg-paper-cream rounded-xl sketch-border text-xs font-mono font-bold text-ink">
                      TEAM LEADER (PRIMARY POINT OF CONTACT)
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Leader Name *
                        </label>
                        <input
                          type="text"
                          name="teamLeaderName"
                          required
                          value={formData.teamLeaderName}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Leader Email *
                        </label>
                        <input
                          type="email"
                          name="leaderEmail"
                          required
                          value={formData.leaderEmail}
                          onChange={handleChange}
                          placeholder="lead@college.edu"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Leader WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="leaderPhone"
                          required
                          value={formData.leaderPhone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-paper-cream rounded-xl sketch-border text-xs font-mono font-bold text-ink mt-2">
                      SQUAD CO-BUILDERS
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Member 2 Name & Role *
                        </label>
                        <input
                          type="text"
                          name="member2Name"
                          required
                          value={formData.member2Name}
                          onChange={handleChange}
                          placeholder="e.g. Sneha Nayak (Frontend)"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Member 2 Email *
                        </label>
                        <input
                          type="email"
                          name="member2Email"
                          required
                          value={formData.member2Email}
                          onChange={handleChange}
                          placeholder="member2@college.edu"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Member 3 Name & Role *
                        </label>
                        <input
                          type="text"
                          name="member3Name"
                          required
                          value={formData.member3Name}
                          onChange={handleChange}
                          placeholder="e.g. Adithya Bhat (Backend)"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Member 3 Email *
                        </label>
                        <input
                          type="email"
                          name="member3Email"
                          required
                          value={formData.member3Email}
                          onChange={handleChange}
                          placeholder="member3@college.edu"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Member 4 Name & Role *
                        </label>
                        <input
                          type="text"
                          name="member4Name"
                          required
                          value={formData.member4Name}
                          onChange={handleChange}
                          placeholder="e.g. Pooja Hegde (AI/ML)"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Member 4 Email *
                        </label>
                        <input
                          type="email"
                          name="member4Email"
                          required
                          value={formData.member4Email}
                          onChange={handleChange}
                          placeholder="member4@college.edu"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Member 5 Name & Role *
                        </label>
                        <input
                          type="text"
                          name="member5Name"
                          required
                          value={formData.member5Name || ''}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Shenoy (UI/UX)"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-ink uppercase mb-1">
                          Member 5 Email *
                        </label>
                        <input
                          type="email"
                          name="member5Email"
                          required
                          value={formData.member5Email || ''}
                          onChange={handleChange}
                          placeholder="member5@college.edu"
                          className="w-full px-3 py-2 rounded-lg sketch-border bg-paper-cream text-xs font-sans"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: COLLEGE & CONFIRM */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                        College / Institution Name & Department *
                      </label>
                      <input
                        type="text"
                        name="college"
                        disabled
                        value={formData.college}
                        className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-dark text-ink font-display font-bold text-sm cursor-not-allowed opacity-90"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                        Drive Link (Project Video) *
                      </label>
                      <input
                        type="url"
                        name="githubOrg"
                        required
                        value={formData.githubOrg}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/..."
                        className="w-full px-4 py-2 rounded-xl sketch-border bg-paper-cream text-ink font-mono text-xs focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                      />
                    </div>

                    <div className="p-4 bg-paper-cream rounded-xl sketch-border space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="acceptRules"
                          checked={formData.acceptRules}
                          onChange={handleChange}
                          required
                          className="mt-1 w-4 h-4 rounded text-hpl-purple focus:ring-hpl-purple"
                        />
                        <span className="text-xs text-ink-muted leading-relaxed font-sans">
                          We confirm that our team members are authentic enrolled students and agree to comply with all HPL 2026 Fair Play, Git Commit, and Evaluation policies.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-3 bg-red-100 border-2 border-red-500 rounded-xl flex items-center gap-3 text-red-800 text-xs font-mono font-bold animate-in fade-in">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-ink">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      icon={<ArrowLeft className="w-4 h-4" />}
                      iconPosition="left"
                    >
                      BACK
                    </Button>
                  ) : <div />}

                  <Button
                    type="submit"
                    variant="purple"
                    size="lg"
                    disabled={isSubmitting}
                    icon={isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                  >
                    {isSubmitting
                      ? 'REGISTERING SQUAD...'
                      : currentStep === 3
                      ? 'SUBMIT SQUAD REGISTRATION'
                      : 'NEXT STEP'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Illustration Column (From Mockup Bottom-Right) */}
            <div className="lg:col-span-5 flex justify-center">
              <RegisterIllustration />
            </div>
          </div>
        ) : (
          /* REGISTRATION SUCCESS / OFFICIAL LEAGUE PASS */
          <div className="max-w-2xl mx-auto space-y-8 text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-800 mx-auto flex items-center justify-center shadow-sketch-sm">
              <CheckCircle2 className="w-8 h-8 text-hpl-emerald" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-hpl-emerald uppercase tracking-widest">
                ✦ SQUAD OFFICIALLY REGISTERED ✦
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display uppercase text-ink">
                WELCOME TO THE LEAGUE!
              </h2>
              <p className="text-sm text-ink-muted font-sans max-w-lg mx-auto">
                Your squad registration for <strong>{formData.teamName || 'Your Squad'}</strong> has been confirmed on the HPL 2026 League Ledger.
              </p>
            </div>

            {/* Digital HPL League Pass */}
            <div className="bg-ink text-paper-light sketch-border rounded-2xl p-6 sm:p-8 shadow-sketch-xl text-left space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-hpl-yellow" />
                  <span className="font-display font-black text-base text-white uppercase">
                    HPL 2026 OFFICIAL SQUAD PASS
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-hpl-coral text-white font-mono text-[10px] font-bold">
                  VERIFIED ENTRY
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">SQUAD NAME:</span>
                  <span className="font-black text-sm text-hpl-yellow">{formData.teamName || 'CodeTroopers'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">TRACK:</span>
                  <span className="font-black text-sm text-white">{formData.track}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">TEAM LEADER:</span>
                  <span className="font-bold text-white">{formData.teamLeaderName || 'Squad Lead'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">INSTITUTION:</span>
                  <span className="font-bold text-white truncate block">{formData.college || 'SMVITM Bantakal'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
                <div className="text-[10px] font-mono text-slate-400">
                  <span>LEAGUE PASS ID: </span>
                  <span className="text-emerald-400 font-bold">HPL-2026-SQ-{(Math.random() * 9000 + 1000).toFixed(0)}</span>
                </div>
                <QrCode className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                variant="purple"
                size="md"
                onClick={() => onNavigate('match-day')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                GO TO MATCH DAY ARENA
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('leaderboard')}
              >
                VIEW LIVE LEADERBOARD
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
