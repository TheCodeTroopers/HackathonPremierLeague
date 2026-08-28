import React, { useState } from 'react';
import { PageRoute, RegistrationFormData } from '../../types';
import { Button } from '../common/Button';
import { RegisterIllustration } from '../illustrations/RegisterIllustration';
import { SparkleDoodle, TrophyBadge } from '../illustrations/MicroDoodles';
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, User, Mail, Phone, School, Layers, QrCode, Download } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<RegistrationFormData>({
    teamName: '',
    track: 'Build For Udupi',
    teamLeaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: '',
    teamSize: 4,
    member2Name: '',
    member2Email: '',
    member3Name: '',
    member3Email: '',
    member4Name: '',
    member4Email: '',
    projectIdea: '',
    githubOrg: '',
    acceptRules: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      setIsSubmitted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
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
                      <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                        Squad / Team Name *
                      </label>
                      <input
                        type="text"
                        name="teamName"
                        required
                        value={formData.teamName}
                        onChange={handleChange}
                        placeholder="e.g. CodeTroopers, ByteBrawlers"
                        className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink font-display font-bold text-sm focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                      />
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
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink font-display font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                        >
                          <option value={3}>3 Members</option>
                          <option value={4}>4 Members (Recommended)</option>
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

                      {Number(formData.teamSize) === 4 && (
                        <>
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
                        </>
                      )}
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
                        required
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="e.g. SMVITM Bantakal, NMAMIT Nitte, MIT Manipal"
                        className="w-full px-4 py-2.5 rounded-xl sketch-border bg-paper-cream text-ink font-display font-bold text-sm focus:outline-none focus:ring-2 focus:ring-hpl-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-ink uppercase mb-1">
                        GitHub Organization / Team Username (Optional)
                      </label>
                      <input
                        type="text"
                        name="githubOrg"
                        value={formData.githubOrg}
                        onChange={handleChange}
                        placeholder="https://github.com/your-team"
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

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-ink">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={handleBack}
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
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    {currentStep === 3 ? 'SUBMIT SQUAD REGISTRATION' : 'NEXT STEP'}
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
