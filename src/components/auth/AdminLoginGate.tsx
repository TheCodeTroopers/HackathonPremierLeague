import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { authenticateAdmin } from '../../services/adminAuthService';
import { PageRoute } from '../../types';

interface AdminLoginGateProps {
  onAuthenticated: () => void;
  onNavigate: (page: PageRoute) => void;
  loggedOutMessage?: string;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ 
  onAuthenticated, 
  onNavigate,
  loggedOutMessage 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [logoutNotice, setLogoutNotice] = useState<string | null>(loggedOutMessage || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLogoutNotice(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your administrator ID.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your administrator password.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authenticateAdmin(email, password);
      if (result.success) {
        onAuthenticated();
      } else {
        setErrorMessage(result.error || 'Invalid administrator credentials. Access restricted.');
      }
    } catch (err: any) {
      setErrorMessage('Unable to connect to authentication server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF6EE] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Ambient background doodle elements */}
      <div className="absolute top-10 left-10 opacity-30 pointer-events-none hidden md:block">
        <span className="font-mono text-xs font-black text-[#1E1B4B] tracking-widest uppercase">&lt;HPL_SECURITY_GATE/&gt;</span>
      </div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#FFFDF7] border-[3px] border-[#1E1B4B] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#1E1B4B] relative z-10">
        
        {/* Crest & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1E1B4B] border-2 border-[#F59E0B] shadow-[3px_3px_0px_#F59E0B] mb-3 transform hover:rotate-3 transition-transform">
            <ShieldCheck className="w-7 h-7 text-[#FBBF24]" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black font-display text-[#1E1B4B] uppercase tracking-tight">
            Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#1E1B4B]/70 font-medium mt-1">
            Restricted evaluation portal for HPL judges & admins
          </p>
        </div>

        {/* Success / Logout Notification Banner */}
        {logoutNotice && !errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-800 text-xs font-medium flex items-start gap-2.5">
            <span className="text-base flex-shrink-0">✓</span>
            <div className="leading-snug">
              <span className="font-bold block font-display uppercase tracking-wide">Signed Out</span>
              {logoutNotice}
            </div>
          </div>
        )}

        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-800 text-xs font-medium flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold block font-display uppercase tracking-wide">Access Denied</span>
              {errorMessage}
            </div>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Admin ID / Email */}
          <div>
            <label className="block text-xs font-display font-black text-[#1E1B4B] uppercase tracking-wider mb-1.5">
              Admin Identifier
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1E1B4B]/40">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hpl"
                autoComplete="username"
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-[#1E1B4B] bg-white text-sm font-medium text-[#1E1B4B] placeholder:text-[#1E1B4B]/30 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-display font-black text-[#1E1B4B] uppercase tracking-wider mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1E1B4B]/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isLoading}
                className="w-full pl-10 pr-11 py-3 rounded-2xl border-2 border-[#1E1B4B] bg-white text-sm font-medium text-[#1E1B4B] placeholder:text-[#1E1B4B]/30 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#1E1B4B]/40 hover:text-[#1E1B4B] transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] active:translate-x-0.5 active:translate-y-0.5 text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[3px_3px_0px_#1E1B4B] border-2 border-[#1E1B4B] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Authorization...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize & Enter</span>
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 pt-5 border-t-2 border-[#1E1B4B]/10 text-center flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-display font-bold text-[#1E1B4B]/70 hover:text-[#1E1B4B] flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </button>

          <span className="font-mono text-[10px] font-bold text-[#1E1B4B]/40 uppercase tracking-wider">
            HPL 2026
          </span>
        </div>

      </div>

      {/* Security badge at bottom */}
      <div className="mt-6 flex items-center gap-2 text-xs font-mono font-bold text-[#1E1B4B]/50">
        <Lock className="w-3.5 h-3.5" />
        <span>Verified via HPL backend session auth. Access is strictly audited.</span>
      </div>
    </div>
  );
};
