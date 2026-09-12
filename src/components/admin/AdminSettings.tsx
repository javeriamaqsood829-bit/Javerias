import React, { useState, useEffect } from 'react';
import {
  Check,
  Globe,
  Share2,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Key,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SocialLink, SiteSettings, SeoSettings } from '../../types/portfolio';

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
    updateAdminEmail,
  } = usePortfolio();

  // Safely initialize state with default fallbacks to prevent undefined access
  const [settingsForm, setSettingsForm] = useState<Partial<SiteSettings>>(() => siteSettings || {});
  const [seoForm, setSeoForm] = useState<Partial<SeoSettings>>(() => seoSettings || {});
  const [saved, setSaved] = useState(false);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  // Synchronize when context updates
  useEffect(() => {
    if (siteSettings) {
      setSettingsForm(siteSettings);
    }
  }, [siteSettings]);

  useEffect(() => {
    if (seoSettings) {
      setSeoForm(seoSettings);
    }
  }, [seoSettings]);

  // Security: Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Security: Admin Email state
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);

  // Social link state
  const [newPlatform, setNewPlatform] = useState('linkedin');
  const [newUrl, setNewUrl] = useState('');

  // Handle Admin Email Update
  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus(null);
    const trimmed = newAdminEmail.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setEmailStatus({ type: 'error', text: 'Barah-e-karam durust email address enter karein.' });
      return;
    }
    setEmailLoading(true);
    try {
      await updateAdminEmail(trimmed);
      setEmailStatus({
        type: 'success',
        text: `Admin email kamyabi se update ho gaya: ${trimmed}. Ab aap is email se login kar sakte hain.`,
      });
      setNewAdminEmail('');
      setTimeout(() => setEmailStatus(null), 6000);
    } catch (err: any) {
      setEmailStatus({ type: 'error', text: err.message || 'Email update nahi ho saka.' });
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle Password Update
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
      setPasswordStatus({
        type: 'success',
        text: 'Aapka naya secret admin password kamyabi se save ho gaya! Ab sirf ye password panel unlock karega.',
      });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordStatus(null), 6000);
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

  // Handle General Settings Save
  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const emailValue = settingsForm.contactEmail || settingsForm.email || '';
      const phoneValue = settingsForm.contactPhone || settingsForm.phone || '';
      const whatsappValue = settingsForm.whatsappNumber || settingsForm.whatsapp || '';

      await updateSiteSettings({
        ...settingsForm,
        email: emailValue,
        contactEmail: emailValue,
        phone: phoneValue,
        contactPhone: phoneValue,
        whatsapp: whatsappValue,
        whatsappNumber: whatsappValue,
      });

      await updateSeoSettings(seoForm);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  };

  // Handle Social Link
  const handleAddSocial = async () => {
    if (!newUrl.trim()) return;
    const currentList = Array.isArray(socialLinks) ? socialLinks : [];
    const newLink: SocialLink = {
      id: `social-${Date.now()}`,
      platform: newPlatform,
      url: newUrl.trim(),
      displayOrder: currentList.length + 1,
      published: true,
    };
    await saveSocialLink(newLink);
    setNewUrl('');
  };

  // Safely format keywords (handles both string and string[])
  const keywordsValue = Array.isArray(seoForm?.keywords)
    ? seoForm.keywords.join(', ')
    : typeof seoForm?.keywords === 'string'
    ? seoForm.keywords
    : '';

  const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];
  const currentDisplayEmail =
    authorizedAdminEmail || currentUser?.email || 'gtpc3820@gmail.com';

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
            Site Settings &amp; Global Configuration
          </h1>
          <p className="text-xs text-zinc-400">
            Control branding, admin security credentials, contact coordinates, and SEO tags.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveGeneral}
          className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer self-start sm:self-auto"
        >
          <Check className="w-4 h-4" />
          <span>Save Global Settings</span>
        </button>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Settings successfully saved and synchronized across your website!</span>
        </div>
      )}

      {/* Admin Panel Security & Master Password (Top Priority) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-400" />
            <span>Admin Authentication &amp; Password</span>
          </h2>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Private Access Protected
          </span>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed">
          Yeh Admin Panel sirf aapke private email aur secret password se khulta hai. Yahan se aap apna email aur secret password dono update kar sakte hain jo sirf aapko pata honge.
        </p>

        {/* Current Active Account Box */}
        <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs space-y-1">
          <div className="text-zinc-400">Current Authorized Admin Email:</div>
          <div className="text-sm font-mono font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-orange-400" />
            <span>{currentDisplayEmail}</span>
          </div>
          <div className="text-[11px] text-emerald-400/90 font-mono pt-1">
            Status: Master Administrator (Exclusively authorized CMS account)
          </div>
        </div>

        {/* 1. Change Admin Email Form */}
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-orange-400" />
              <span>Update Authorized Admin Email</span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-400">
            Agar aap apna admin login email tabdeel karna chahte hain (e.g. <strong className="text-zinc-300">gtpc3820@gmail.com</strong>), to yahan enter karke Save karein:
          </p>

          {emailStatus && (
            <div
              className={`p-3 rounded-xl border flex items-start gap-2 text-xs animate-in fade-in ${
                emailStatus.type === 'success'
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/50 border-red-500/40 text-red-300'
              }`}
            >
              {emailStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              <span>{emailStatus.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateEmail} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              <input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="Naya admin email enter karein (e.g. gtpc3820@gmail.com)"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              disabled={emailLoading}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-bold text-xs transition-all cursor-pointer whitespace-nowrap shadow-md"
            >
              {emailLoading ? 'Saving...' : 'Save Admin Email'}
            </button>
          </form>
        </div>

        {/* 2. Change Admin Password Form */}
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
          <div className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
            <Key className="w-3.5 h-3.5 text-orange-400" />
            <span>Update Secret Admin Password</span>
          </div>
          <p className="text-[11px] text-zinc-400">
            Apna private secret password yahan set karein jo sirf aapko maloom hoga.
          </p>

          {passwordStatus && (
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs animate-in fade-in ${
                passwordStatus.type === 'success'
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/50 border-red-500/40 text-red-300'
              }`}
            >
              {passwordStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              <span>{passwordStatus.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Naya Secret Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Kam az kam 6 characters"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Confirm Naya Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Password dobara enter karein"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-orange-500"
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
                    <span>Save Secret Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

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
              value={settingsForm.brandName || ''}
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
              value={settingsForm.ownerName || ''}
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
              value={settingsForm.professionalTitle || ''}
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
              Public Contact Email
            </label>
            <input
              type="email"
              value={settingsForm.contactEmail || settingsForm.email || ''}
              onChange={(e) =>
                setSettingsForm({
                  ...settingsForm,
                  contactEmail: e.target.value,
                  email: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              value={settingsForm.contactPhone || settingsForm.phone || ''}
              onChange={(e) =>
                setSettingsForm({
                  ...settingsForm,
                  contactPhone: e.target.value,
                  phone: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              WhatsApp Link / Number
            </label>
            <input
              type="text"
              value={settingsForm.whatsappNumber || settingsForm.whatsapp || ''}
              onChange={(e) =>
                setSettingsForm({
                  ...settingsForm,
                  whatsappNumber: e.target.value,
                  whatsapp: e.target.value,
                })
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
            value={settingsForm.location || ''}
            onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-900">
          <span className="text-xs text-zinc-400">
            * Yahan se aap apna Brand name, phone, WhatsApp number aur location direct update kar sakte hain.
          </span>
          <button
            type="button"
            onClick={async () => {
              const emailVal = settingsForm.contactEmail || settingsForm.email || '';
              const phoneVal = settingsForm.contactPhone || settingsForm.phone || '';
              const waVal = settingsForm.whatsappNumber || settingsForm.whatsapp || '';
              await updateSiteSettings({
                ...settingsForm,
                email: emailVal,
                contactEmail: emailVal,
                phone: phoneVal,
                contactPhone: phoneVal,
                whatsapp: waVal,
                whatsappNumber: waVal,
              });
              setSavedSection('identity');
              setTimeout(() => setSavedSection(null), 3000);
            }}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all shadow-md shadow-orange-500/10 cursor-pointer"
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
              value={seoForm?.metaTitle || ''}
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
              value={keywordsValue}
              onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
              placeholder="e.g. digital marketing, SEO, growth strategist"
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
            value={seoForm?.metaDescription || ''}
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
            className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-mono cursor-pointer"
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
            className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-orange-500"
          />
          <button
            type="button"
            onClick={handleAddSocial}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs shrink-0 cursor-pointer"
          >
            Add Channel
          </button>
        </div>

        {/* Existing channels list */}
        <div className="space-y-2 pt-2">
          {safeSocialLinks.length === 0 ? (
            <p className="text-xs text-zinc-500 font-mono py-2">Koi social links add nahi hain.</p>
          ) : (
            safeSocialLinks.map((social) => (
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
                    type="button"
                    onClick={() =>
                      saveSocialLink({ ...social, published: !social.published })
                    }
                    className={`p-1.5 rounded cursor-pointer ${
                      social.published ? 'text-emerald-400' : 'text-zinc-500'
                    }`}
                    title={social.published ? 'Visible' : 'Hidden'}
                  >
                    {social.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteSocialLink(social.id)}
                    className="p-1.5 rounded text-zinc-400 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
