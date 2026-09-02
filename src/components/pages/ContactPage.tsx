import React from 'react';
import { PageRoute } from '../../types';
import { Phone, MapPin, ArrowRight, Shield, Users, GraduationCap } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
}

const FACULTY_COORDINATORS = [
  {
    name: 'Dr. Rajesh Nayak',
    phone: '9164510062',
    role: 'Faculty Coordinator',
    dept: 'Department of CSE',
    emoji: '🎓',
  },
  {
    name: 'Mr. Raghvendra G S',
    phone: '9738405453',
    role: 'Faculty Coordinator',
    dept: 'Department of ISE',
    emoji: '🎓',
  },
];

const CORE_TEAM = [
  {
    name: 'Yashwanth',
    phone: '8217561286',
    role: 'Core Team Member',
    emoji: '⚡',
  },
  {
    name: 'Abhishek Kini',
    phone: '9844101520',
    role: 'Core Team Lead',
    emoji: '⚡',
  },
  {
    name: 'Bhushan Poojary',
    phone: '7381709385',
    role: 'Core Team Member',
    emoji: '⚡',
  },
  {
    name: 'Tejas Nayak',
    phone: '8296151023',
    role: 'Core Team Member',
    emoji: '⚡',
  },
  {
    name: 'Pradyumna Upadhyaya',
    phone: '9980441036',
    role: 'Core Team Member',
    emoji: '⚡',
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1E1B4B]">

      {/* ------------------------------------------------------------------ */}
      {/* HERO HEADER                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-[#1E1B4B] pt-16 pb-20 px-4 sm:px-6 lg:px-10">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* Glowing spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] bg-indigo-600/20 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          {/* Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[11px] font-black tracking-widest text-amber-300 uppercase">
              HPL 2026 — Contact Us
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
            GET IN{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              TOUCH
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-indigo-200/90 font-medium max-w-xl mx-auto">
            Have questions about HPL 2026? Reach out to our faculty coordinators or core team directly.
          </p>

          {/* Venue chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-semibold text-indigo-200 tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>SMVITM Campus, Bantakal, Udupi — Karnataka, India</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-14 space-y-14">

        {/* ---- FACULTY COORDINATORS ---- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <GraduationCap className="w-4.5 h-4.5 text-amber-700" />
            </div>
            <div>
              <div className="font-mono text-[10px] font-black tracking-widest text-amber-600 uppercase">
                Hierarchy Level 1
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] uppercase tracking-tight">
                Faculty Coordinators
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FACULTY_COORDINATORS.map((person) => (
              <div
                key={person.phone}
                className="group relative bg-white border-2 border-[#1E1B4B] rounded-2xl p-6 shadow-[4px_4px_0px_#F59E0B] hover:shadow-[6px_6px_0px_#F59E0B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Amber accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-t-xl" />

                <div className="flex items-start gap-4 pt-2">
                  {/* Avatar circle */}
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-2xl flex-shrink-0">
                    {person.emoji}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="font-display font-black text-lg text-[#1E1B4B] leading-tight">
                      {person.name}
                    </div>
                    <div className="font-mono text-[10px] font-bold text-amber-700 uppercase tracking-widest">
                      {person.role}
                    </div>
                    <div className="font-sans text-xs text-[#1E1B4B]/60 font-medium">
                      {person.dept} • SMVITM
                    </div>
                  </div>
                </div>

                {/* Phone link */}
                <a
                  href={`tel:+91${person.phone}`}
                  className="mt-5 flex items-center justify-between w-full px-4 py-3 rounded-xl bg-amber-50 border-2 border-amber-300 hover:bg-amber-100 hover:border-amber-500 transition-all group/phone"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-700 group-hover/phone:animate-bounce" />
                    <span className="font-mono font-black text-sm text-[#1E1B4B] tracking-wide">
                      +91 {person.phone}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 group-hover/phone:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#1E1B4B]/10" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1B4B]/5 border border-[#1E1B4B]/10">
            <Shield className="w-3 h-3 text-[#1E1B4B]/40" />
            <span className="font-mono text-[10px] font-black text-[#1E1B4B]/40 uppercase tracking-widest">HPL Core</span>
          </div>
          <div className="flex-1 h-px bg-[#1E1B4B]/10" />
        </div>

        {/* ---- CORE TEAM ---- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 border-2 border-indigo-400 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Users className="w-4.5 h-4.5 text-indigo-700" />
            </div>
            <div>
              <div className="font-mono text-[10px] font-black tracking-widest text-indigo-600 uppercase">
                Hierarchy Level 2
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] uppercase tracking-tight">
                Core Team Members
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {CORE_TEAM.map((person, idx) => (
              <div
                key={person.phone}
                className="group relative bg-white border-2 border-[#1E1B4B] rounded-2xl p-5 shadow-[4px_4px_0px_#4F46E5] hover:shadow-[6px_6px_0px_#4F46E5] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Indigo accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-xl" />

                <div className="flex items-center gap-4 pt-2">
                  {/* Number badge */}
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border-2 border-indigo-300 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono font-black text-sm text-indigo-700">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="font-display font-black text-base text-[#1E1B4B] leading-tight">
                      {person.name}
                    </div>
                    <div className="font-mono text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                      {person.role}
                    </div>
                  </div>
                </div>

                {/* Phone link */}
                <a
                  href={`tel:+91${person.phone}`}
                  className="mt-4 flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-indigo-50 border-2 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 transition-all group/phone"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-600 group-hover/phone:animate-bounce" />
                    <span className="font-mono font-black text-sm text-[#1E1B4B] tracking-wide">
                      +91 {person.phone}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500 group-hover/phone:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </section>


        {/* ---- Back to Home ---- */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1E1B4B] bg-white hover:bg-amber-50 font-display font-black text-sm uppercase tracking-wider shadow-[3px_3px_0px_#1E1B4B] hover:shadow-[4px_4px_0px_#1E1B4B] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
