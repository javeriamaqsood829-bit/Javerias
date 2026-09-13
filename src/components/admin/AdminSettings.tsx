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
  Upload,
  Image as ImageIcon,
  RefreshCw,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SocialLink, SiteSettings, SeoSettings } from '../../types/portfolio';
import { uploadMediaFile } from '../../lib/mediaUpload';

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

  // Favicon & Logo Manager State
  const [customFaviconUrl, setCustomFaviconUrl] = useState<string>(() => siteSettings?.faviconUrl || '/favicon.svg');
  const [customBrandLogoUrl, setCustomBrandLogoUrl] = useState<string>(() => siteSettings?.brandLogoUrl || '/favicon.svg');
  const [faviconUploading, setFaviconUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [brandSavedNotice, setBrandSavedNotice] = useState(false);

  useEffect(() => {
    if (siteSettings?.faviconUrl) {
      setCustomFaviconUrl(siteSettings.faviconUrl);
    }
    if (siteSettings?.brandLogoUrl) {
      setCustomBrandLogoUrl(siteSettings.brandLogoUrl);
    }
  }, [siteSettings]);

  const handleUploadFavicon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setFaviconUploading(true);
      const res = await uploadMediaFile(file, 'favicons');
      setCustomFaviconUrl(res.url);
    } catch (err) {
      console.error(err);
      alert('Favicon upload failed');
    } finally {
      setFaviconUploading(false);
    }
  };

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLogoUploading(true);
      const res = await uploadMediaFile(file, 'branding');
      setCustomBrandLogoUrl(res.url);
    } catch (err) {
      console.error(err);
      alert('Logo upload failed');
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSaveFaviconAndLogo = async () => {
    const updated = {
      ...siteSettings,
      faviconUrl: customFaviconUrl,
      brandLogoUrl: customBrandLogoUrl,
    };
    await updateSiteSettings(updated as SiteSettings);

    // Live update document favicon immediately in browser
    if (typeof document !== 'undefined') {
      const linkElements = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
      linkElements.forEach((link) => {
        link.href = customFaviconUrl;
      });
    }

    setBrandSavedNotice(true);
    setTimeout(() => setBrandSavedNotice(false), 4000);
  };

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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-900">
          <span className="text-xs text-zinc-400">
            * Yeh settings Google search results aur browser tabs me show hoti hain.
          </span>
          <button
            type="button"
            onClick={async () => {
              await updateSeoSettings(seoForm);
              setSavedSection('seo');
              setTimeout(() => setSavedSection(null), 3000);
            }}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all shadow-md shadow-orange-500/10 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>
        </div>
        {savedSection === 'seo' && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>SEO settings saved successfully and live on your website!</span>
          </div>
        )}
      </div>

      {/* Google Search Live Appearance & Favicon Branding Hub */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Google Search Appearance &amp; Brand Favicon</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Google search results aur modern browsers ke liye brand favicon preview aur indexing setup.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 self-start sm:self-auto">
            Google-Favicon Ready
          </span>
        </div>

        {/* Interactive Favicon & Brand Logo Customizer */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <ImageIcon className="w-4 h-4 text-orange-400" />
              <span>Favicon &amp; Navbar Brand Logo Uploader</span>
            </div>
            <button
              type="button"
              onClick={handleSaveFaviconAndLogo}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto shadow-md shadow-orange-500/20"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Favicon &amp; Logo</span>
            </button>
          </div>

          {brandSavedNotice && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Favicon aur Brand Logo kamyabi se update ho gaya! Website aur browser tab me live sync ho chuka hai.</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Favicon Control */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase text-zinc-400">
                  Browser &amp; Google Favicon
                </label>
                <div className="w-6 h-6 rounded-lg bg-[#09090b] border border-orange-500/40 p-0.5 flex items-center justify-center">
                  <img src={customFaviconUrl || '/favicon.svg'} alt="Favicon Preview" className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFaviconUrl}
                  onChange={(e) => setCustomFaviconUrl(e.target.value)}
                  placeholder="/favicon.svg ya https://.../favicon.png"
                  className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-orange-500"
                />
                <label className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{faviconUploading ? '...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*,.ico,.svg"
                    onChange={handleUploadFavicon}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setCustomFaviconUrl('/favicon.svg')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 font-mono"
                >
                  Flame Vector (Default)
                </button>
                <button
                  type="button"
                  onClick={() => setCustomFaviconUrl('/favicon-48x48.png')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 font-mono"
                >
                  48px Google Raster
                </button>
              </div>
            </div>

            {/* Navbar & Footer Brand Logo Control */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase text-zinc-400">
                  Navbar &amp; Footer Brand Logo
                </label>
                <div className="w-6 h-6 rounded-lg bg-[#09090b] border border-orange-500/40 p-0.5 flex items-center justify-center">
                  <img src={customBrandLogoUrl || '/favicon.svg'} alt="Logo Preview" className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customBrandLogoUrl}
                  onChange={(e) => setCustomBrandLogoUrl(e.target.value)}
                  placeholder="/favicon.svg ya https://.../logo.png"
                  className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-orange-500"
                />
                <label className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{logoUploading ? '...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*,.ico,.svg"
                    onChange={handleUploadLogo}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setCustomBrandLogoUrl('/favicon.svg')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 font-mono"
                >
                  Use Default Logo
                </button>
                <button
                  type="button"
                  onClick={() => setCustomBrandLogoUrl(customFaviconUrl)}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 font-mono"
                >
                  Sync With Favicon
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Google Search Preview (Dark Mode & Light Mode) */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Live Google Search Preview (How it looks on Google)
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Google Dark Mode Preview */}
            <div className="p-4 rounded-2xl bg-[#1f1f1f] border border-zinc-700/60 shadow-xl space-y-2">
              <div className="text-[10px] font-mono text-zinc-400 uppercase flex items-center justify-between pb-1 border-b border-zinc-800">
                <span>Google Search (Dark Mode)</span>
                <span className="text-emerald-400">Target Result</span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-7 h-7 rounded-full bg-[#0a0a0c] border border-zinc-700/80 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  <img src={customFaviconUrl || '/favicon-48x48.png'} alt="Favicon" className="w-5 h-5 object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-200 font-medium leading-none">
                    somadigitalmarketer.com
                  </span>
                  <span className="text-[11px] text-zinc-400 leading-tight">
                    https://somadigitalmarketer.com
                  </span>
                </div>
              </div>
              <a href="#" className="block text-base font-semibold text-[#99c3ff] hover:underline leading-snug">
                {seoForm?.metaTitle || 'Soma — Senior Digital Marketer & Growth Strategist'}
              </a>
              <p className="text-xs text-[#bdc1c6] line-clamp-2 leading-relaxed">
                {seoForm?.metaDescription ||
                  'Official portfolio of Soma, Senior Digital Marketer & Growth Strategist. Scaling businesses through high-ROAS Meta & Google Ads, data-driven SEO, conversion rate optimization, and omnichannel growth architecture.'}
              </p>
            </div>

            {/* Google Light Mode Preview */}
            <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-xl space-y-2 text-zinc-900">
              <div className="text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-between pb-1 border-b border-zinc-200">
                <span>Google Search (Light Mode)</span>
                <span className="text-emerald-600">High Contrast</span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-7 h-7 rounded-full bg-[#0a0a0c] border border-zinc-300 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  <img src={customFaviconUrl || '/favicon-48x48.png'} alt="Favicon" className="w-5 h-5 object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-800 font-medium leading-none">
                    somadigitalmarketer.com
                  </span>
                  <span className="text-[11px] text-zinc-500 leading-tight">
                    https://somadigitalmarketer.com
                  </span>
                </div>
              </div>
              <a href="#" className="block text-base font-semibold text-[#1a0dab] hover:underline leading-snug">
                {seoForm?.metaTitle || 'Soma — Senior Digital Marketer & Growth Strategist'}
              </a>
              <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                {seoForm?.metaDescription ||
                  'Official portfolio of Soma, Senior Digital Marketer & Growth Strategist. Scaling businesses through high-ROAS Meta & Google Ads, data-driven SEO, conversion rate optimization, and omnichannel growth architecture.'}
              </p>
            </div>
          </div>
        </div>

        {/* Generated Favicon Formats */}
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-400" />
            <span>Active Brand Favicon Assets</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#09090b] border border-zinc-700 flex items-center justify-center overflow-hidden">
                <img src="/favicon-48x48.png" alt="48x48" className="w-8 h-8 object-contain" />
              </div>
              <div className="text-[11px] font-mono text-zinc-300">favicon-48x48.png</div>
              <div className="text-[9px] text-emerald-400 font-mono">Google Standard</div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#09090b] border border-zinc-700 flex items-center justify-center overflow-hidden">
                <img src="/favicon-192x192.png" alt="192x192" className="w-9 h-9 object-contain" />
              </div>
              <div className="text-[11px] font-mono text-zinc-300">favicon-192x192.png</div>
              <div className="text-[9px] text-zinc-400 font-mono">Android &amp; PWA</div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#09090b] border border-zinc-700 flex items-center justify-center overflow-hidden">
                <img src="/apple-touch-icon.png" alt="180x180" className="w-9 h-9 object-contain" />
              </div>
              <div className="text-[11px] font-mono text-zinc-300">apple-touch-icon.png</div>
              <div className="text-[9px] text-zinc-400 font-mono">iOS Safari</div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#09090b] border border-zinc-700 flex items-center justify-center overflow-hidden">
                <img src="/favicon.svg" alt="SVG Vector" className="w-9 h-9 object-contain" />
              </div>
              <div className="text-[11px] font-mono text-zinc-300">favicon.svg</div>
              <div className="text-[9px] text-orange-400 font-mono">Vector Master</div>
            </div>
          </div>
        </div>

        {/* Why Google Search Showed Default Globe & How to Fix Immediately */}
        <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Google Search par Favicon aur Title update karne ka tarika:</span>
          </div>
          <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
            <p>
              1. <strong>Purani Cache Ki Wajah:</strong> Pehle is domain par WordPress default install tha, jiski wajah se Google ne purani cache <code className="text-amber-300">"Welcome to WordPress"</code> aur generic globe icon save kar li thi.
            </p>
            <p>
              2. <strong>Technical Fix Ho Chuka Hai:</strong> Ab aapki website me Google-Favicon ke mutabiq 48x48, 96x96, 192x192, 512x512, SVG, robots.txt, aur Schema.org JSON-LD structured data sab perfectly inject kar diye gaye hain.
            </p>
            <p>
              3. <strong>Google Par Fauran Update Kaise Karein:</strong>{' '}
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noreferrer"
                className="text-orange-400 hover:underline font-bold"
              >
                Google Search Console
              </a>{' '}
              kholein &rarr; top search bar me <code className="text-white">https://somadigitalmarketer.com/</code> paste karein &rarr; <strong>"Request Indexing"</strong> par click karein. Google ka crawler kuch ghanton me naya favicon aur title search results me show kar dega!
            </p>
          </div>
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
