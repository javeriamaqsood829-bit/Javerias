import React, { useState } from 'react';
import { Settings, Check, Globe, Share2, Plus, Trash2, Eye, EyeOff, Sparkles, Shield, Key, Lock, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SocialLink } from '../../types/portfolio';
import { auth } from '../../lib/firebase';
import { updatePassword, updateEmail } from 'firebase/auth';

export const AdminSettings: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    seoSettings,
    updateSeoSettings,
    socialLinks,
    saveSocialLink,
    deleteSocialLink,
    currentUser,
    authorizedAdminEmail,
    updateAdminPassword,
  } = usePortfolio();

  const [settingsForm, setSettingsForm] = useState(siteSettings);
  const [seoForm, setSeoForm] = useState(seoSettings);
  const [saved, setSaved] = useState(false);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  // Keep form synchronized when Firestore or Context updates
  React.useEffect(() => {
    if (siteSettings) {
      setSettingsForm(siteSettings);
    }
  }, [siteSettings]);

  React.useEffect(() => {
    if (seoSettings) {
      setSeoForm(seoSettings);
    }
  }, [seoSettings]);

  // Security & Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Social link state
  const [newPlatform, setNewPlatform] = useState('linkedin');
  const [newUrl, setNewUrl] = useState('');

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword.length < 6) {
      setPasswordStatus({ type: 'error', text: 'Password kam az kam 6 characters ka hona chahiye.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', text: 'Dono passwords match nahi kar rahe.' });
      return;
    }

    setPasswordLoading(true);
    try {
      await updateAdminPassword(newPassword);
      setPasswordStatus({ type: 'success', text: 'Admin secret password kamyabi se update ho gaya!' });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordStatus(null), 4000);
    } catch (err: any) {
      console.error(err);
      setPasswordStatus({
        type: 'error',
        text: err.message || 'Password update nahi ho saka.',
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(settingsForm);
    await updateSeoSettings(seoForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddSocial = async () => {
    if (!newUrl) return;
    const newLink: SocialLink = {
      id: `social-${Date.now()}`,
      platform: newPlatform,
      url: newUrl,
      displayOrder: socialLinks.length + 1,
      published: true,
    };
    await saveSocialLink(newLink);
    setNewUrl('');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
            Site Settings &amp; Global Configuration
          </h1>
          <p className="text-xs text-zinc-400">
            Control branding, direct contact information, SEO tags, and social media channels.
          </p>
        </div>

        <button
          onClick={handleSaveGeneral}
          className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
        >
          <Check className="w-4 h-4" />
          <span>Save Global Settings</span>
        </button>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs">
          Settings successfully saved and synchronized across your website!
        </div>
      )}

      {/* General & Identity */}
      <form onSubmit={handleSaveGeneral} className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6">
        <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Brand Identity &amp; Contact Coordinates</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Brand / Logo Name
            </label>
            <input
              type="text"
              value={settingsForm.brandName}
              onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Owner Full Name
            </label>
            <input
              type="text"
              value={settingsForm.ownerName}
              onChange={(e) => setSettingsForm({ ...settingsForm, ownerName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Professional Title
            </label>
            <input
              type="text"
              value={settingsForm.professionalTitle}
              onChange={(e) =>
                setSettingsForm({ ...settingsForm, professionalTitle: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Contact Email
            </label>
            <input
              type="email"
              value={settingsForm.contactEmail}
              onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              value={settingsForm.contactPhone}
              onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              WhatsApp Link / Number
            </label>
            <input
              type="text"
              value={settingsForm.whatsappNumber || ''}
              onChange={(e) =>
                setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
              }
              placeholder="+14158903421"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
            Physical Location / Base
          </label>
          <input
            type="text"
            value={settingsForm.location}
            onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-900">
          <span className="text-xs text-zinc-400">
            * Aap koi bhi single field (e.g. Name, Phone) change karke yahan se direct save kar sakte hain.
          </span>
          <button
            type="button"
            onClick={async () => {
              await updateSiteSettings(settingsForm);
              setSavedSection('identity');
              setTimeout(() => setSavedSection(null), 3000);
            }}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all shadow-md shadow-orange-500/10"
          >
            <Check className="w-4 h-4" />
            <span>Save Name &amp; Info</span>
          </button>
        </div>
        {savedSection === 'identity' && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs">
            Name and Identity settings saved successfully to website!
          </div>
        )}
      </form>

      {/* SEO Configuration */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6">
        <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-orange-400" />
          <span>Search Engine Optimization (SEO) &amp; OpenGraph</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              SEO Title Tag
            </label>
            <input
              type="text"
              value={seoForm.metaTitle}
              onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Target Keywords (comma separated)
            </label>
            <input
              type="text"
              value={seoForm.keywords?.join(', ') || ''}
              onChange={(e) =>
                setSeoForm({
                  ...seoForm,
                  keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
            Meta Description
          </label>
          <textarea
            rows={2}
            value={seoForm.metaDescription}
            onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6">
        <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
          <Share2 className="w-4 h-4 text-orange-400" />
          <span>Social Media Channels</span>
        </h2>

        {/* Add new social link */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-mono"
          >
            <option value="linkedin">LinkedIn</option>
            <option value="x">Twitter / X</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
            <option value="github">GitHub</option>
          </select>
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs"
          />
          <button
            onClick={handleAddSocial}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs shrink-0"
          >
            Add Channel
          </button>
        </div>

        {/* Existing channels list */}
        <div className="space-y-2 pt-2">
          {socialLinks.map((social) => (
            <div
              key={social.id}
              className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono uppercase font-bold text-orange-400">
                  {social.platform}
                </span>
                <span className="text-zinc-400 truncate max-w-sm">{social.url}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    saveSocialLink({ ...social, published: !social.published })
                  }
                  className={`p-1.5 rounded ${
                    social.published ? 'text-emerald-400' : 'text-zinc-500'
                  }`}
                  title={social.published ? 'Visible' : 'Hidden'}
                >
                  {social.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => deleteSocialLink(social.id)}
                  className="p-1.5 rounded text-zinc-400 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Panel Security & Master Password */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-400" />
            <span>Admin Authentication &amp; Password</span>
          </h2>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            Private Access Protected
          </span>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed">
          The Admin Panel is exclusively accessible with your private email and password. Google Sign-In has been disabled to ensure only you can log in.
        </p>

        <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs space-y-1">
          <div className="text-zinc-400">Authorized Master Administrator:</div>
          <div className="text-sm font-mono font-bold text-white">
            {currentUser?.email || authorizedAdminEmail || 'j88125859@gmail.com'}
          </div>
          <div className="text-[11px] text-orange-400/90 font-mono pt-1">
            Status: Master Administrator (Exclusively authorized CMS account)
          </div>
        </div>

        {passwordStatus && (
          <div
            className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
              passwordStatus.type === 'success'
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/50 border-red-500/40 text-red-300'
            }`}
          >
            {passwordStatus.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            )}
            <span>{passwordStatus.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                New Master Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={passwordLoading}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              {passwordLoading ? (
                <span>Updating Password...</span>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Update Admin Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
