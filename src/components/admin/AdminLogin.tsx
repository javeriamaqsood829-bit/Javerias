import React, { useState } from 'react';
import { Lock, Mail, Key, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface AdminLoginProps {
  onBackToSite: () => void;
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite, onLoginSuccess }) => {
  const { loginWithEmail, authorizedAdminEmail, updateAdminPassword } = usePortfolio();
  const [email, setEmail] = useState('j88125859@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const targetEmail = authorizedAdminEmail || 'j88125859@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    const trimmedEmail = email.trim().toLowerCase();

    // Strict email check
    if (trimmedEmail !== targetEmail.toLowerCase()) {
      setError(`Access Denied: Sirf authorized owner email (${targetEmail}) hi admin panel me login kar sakta hai.`);
      setLoading(false);
      return;
    }

    if (isResetMode) {
      if (newPassword.length < 6) {
        setError('Naya password kam az kam 6 characters ka hona chahiye.');
        setLoading(false);
        return;
      }
      try {
        await updateAdminPassword(newPassword);
        setSuccessMsg('Aapka secret password kamyabi se update ho gaya! Ab login karein.');
        setPassword(newPassword);
        setIsResetMode(false);
      } catch (err: any) {
        setError(err.message || 'Password update nahi ho saka.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!password) {
      setError('Barah-e-karam apna secret password darj karein.');
      setLoading(false);
      return;
    }

    try {
      await loginWithEmail(trimmedEmail, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error('Admin Auth error:', err);
      setError(err.message || 'Ghalat password! Sirf authorized admin ka secret password hi chalega.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Return to website */}
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Live Portfolio</span>
        </button>

        {/* Dedicated Admin Card */}
        <div className="p-8 sm:p-9 rounded-3xl bg-zinc-950/95 border border-zinc-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-13 h-13 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mx-auto shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
              {isResetMode ? 'Update Secret Password' : 'Owner Admin Portal'}
            </h1>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              {isResetMode
                ? 'Apna naya secret password enter karein jo sirf aapko pata hoga.'
                : 'Yeh portal sirf authorized owner ke email aur password se unlock hota hai.'}
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-2.5 text-red-300 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-start gap-2.5 text-emerald-300 text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Authorized Owner Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="j88125859@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <p className="text-[11px] text-zinc-400 font-mono mt-1 flex items-center justify-between">
                <span>Authorized: <strong className="text-orange-400">{targetEmail}</strong></span>
                <span className="text-emerald-400 font-bold">&bull; Owner Locked</span>
              </p>
            </div>

            {!isResetMode ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Secret Admin Password
                  </label>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Apna secret password enter karein"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-2 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
                  Master Password: <span className="text-orange-400 font-bold">soma2026</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Naya Secret Password Set Karein
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Naya secret password (kam az kam 6 characters)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.99] mt-2 cursor-pointer"
            >
              {loading ? (
                <span className="font-mono text-xs uppercase tracking-wider">Verifying Secret Credentials...</span>
              ) : isResetMode ? (
                <span>Save New Secret Password</span>
              ) : (
                <>
                  <span>Unlock Admin Panel</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Option to change/set secret password */}
          <div className="pt-2 border-t border-zinc-900 text-center">
            <button
              type="button"
              onClick={() => {
                setIsResetMode(!isResetMode);
                setError(null);
                setSuccessMsg(null);
              }}
              className="text-xs text-orange-400 hover:text-orange-300 font-mono cursor-pointer transition-colors"
            >
              {isResetMode
                ? 'Wapis Sign In screen par jayein'
                : 'Secret password badalna ya naya password set karna hai? Yahan click karein'}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-[11px] text-zinc-400 font-mono text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span>Strict Owner Protection &bull; {targetEmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
