import React, { useState } from 'react';
import { Sparkles, Check, Upload, FileText, Image as ImageIcon } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadMediaFile } from '../../lib/mediaUpload';

interface AdminHeroAboutProps {
  mode: 'hero' | 'about';
}

export const AdminHeroAbout: React.FC<AdminHeroAboutProps> = ({ mode }) => {
  const { heroContent, updateHeroContent, aboutContent, updateAboutContent } = usePortfolio();
  const [heroForm, setHeroForm] = useState(heroContent);
  const [aboutForm, setAboutForm] = useState(aboutContent);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Synchronize state when context updates from Firestore
  React.useEffect(() => {
    if (heroContent) {
      setHeroForm(heroContent);
    }
  }, [heroContent]);

  React.useEffect(() => {
    if (aboutContent) {
      setAboutForm(aboutContent);
    }
  }, [aboutContent]);

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHeroContent(heroForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAboutContent(aboutForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'about') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadMediaFile(file, 'profile');
      if (target === 'hero') {
        setHeroForm({ ...heroForm, profileImage: res.url });
      } else {
        setAboutForm({ ...aboutForm, profileImage: res.url });
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (mode === 'hero') {
    return (
      <form onSubmit={handleHeroSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
              Hero Section Management
            </h1>
            <p className="text-xs text-zinc-400">
              Customize the above-the-fold headline, description, CTAs, and profile visual.
            </p>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <Check className="w-4 h-4" />
            <span>Save Hero Changes</span>
          </button>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs">
            Hero content updated successfully and synchronized to live website!
          </div>
        )}

        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Top Label Badge
              </label>
              <input
                type="text"
                value={heroForm.badge}
                onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Main Heading First Part
              </label>
              <input
                type="text"
                value={heroForm.mainHeading}
                onChange={(e) => setHeroForm({ ...heroForm, mainHeading: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Highlighted Text (Accent Orange Gradient)
            </label>
            <input
              type="text"
              value={heroForm.highlightedText}
              onChange={(e) => setHeroForm({ ...heroForm, highlightedText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Supporting Paragraph
            </label>
            <textarea
              rows={3}
              value={heroForm.description}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Primary CTA Button Label &amp; Anchor
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={heroForm.primaryCtaText}
                  onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                  placeholder="View My Work"
                  className="w-1/2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  value={heroForm.primaryCtaLink}
                  onChange={(e) => setHeroForm({ ...heroForm, primaryCtaLink: e.target.value })}
                  placeholder="#projects"
                  className="w-1/2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Secondary CTA Button Label &amp; Anchor
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={heroForm.secondaryCtaText}
                  onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                  placeholder="Let's Work Together"
                  className="w-1/2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
                <input
                  type="text"
                  value={heroForm.secondaryCtaLink}
                  onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaLink: e.target.value })}
                  placeholder="#contact"
                  className="w-1/2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Profile Portrait Image
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={heroForm.profileImage}
                onChange={(e) => setHeroForm({ ...heroForm, profileImage: e.target.value })}
                className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
              <label className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'hero')}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Trust Pills */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Specialization Badges (comma separated)
            </label>
            <input
              type="text"
              value={heroForm.trustPills?.join(', ') || ''}
              onChange={(e) =>
                setHeroForm({
                  ...heroForm,
                  trustPills: e.target.value.split(',').map((p) => p.trim()).filter(Boolean),
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </form>
    );
  }

  // About mode
  return (
    <form onSubmit={handleAboutSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
            About Section &amp; Statistics
          </h1>
          <p className="text-xs text-zinc-400">
            Edit your background, philosophy, CV link, and quantitative stats cards.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
        >
          <Check className="w-4 h-4" />
          <span>Save About Changes</span>
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs">
          About content updated successfully!
        </div>
      )}

      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Section Title
            </label>
            <input
              type="text"
              value={aboutForm.heading}
              onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Subheading / Pitch
            </label>
            <input
              type="text"
              value={aboutForm.subheading}
              onChange={(e) => setAboutForm({ ...aboutForm, subheading: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
            Primary Bio Paragraph
          </label>
          <textarea
            rows={3}
            value={aboutForm.bioParagraph1}
            onChange={(e) => setAboutForm({ ...aboutForm, bioParagraph1: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
            Secondary Bio Paragraph (Analytical vs Creative)
          </label>
          <textarea
            rows={3}
            value={aboutForm.bioParagraph2}
            onChange={(e) => setAboutForm({ ...aboutForm, bioParagraph2: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
            Growth Philosophy Statement
          </label>
          <textarea
            rows={2}
            value={aboutForm.approach}
            onChange={(e) => setAboutForm({ ...aboutForm, approach: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
          />
        </div>

        {/* 4 Statistics Cards */}
        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-3">
            Key Statistics Cards (Shown on About section)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(aboutForm.stats || []).map((st, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="text-xs font-mono text-zinc-400">Stat #{i + 1}</div>
                <input
                  type="text"
                  value={st.value}
                  onChange={(e) => {
                    const newStats = [...aboutForm.stats];
                    newStats[i] = { ...newStats[i], value: e.target.value };
                    setAboutForm({ ...aboutForm, stats: newStats });
                  }}
                  placeholder="e.g. 150"
                  className="w-full px-3 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-white font-bold text-sm"
                />
                <input
                  type="text"
                  value={st.suffix || '+'}
                  onChange={(e) => {
                    const newStats = [...aboutForm.stats];
                    newStats[i] = { ...newStats[i], suffix: e.target.value };
                    setAboutForm({ ...aboutForm, stats: newStats });
                  }}
                  placeholder="+"
                  className="w-full px-3 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-white text-xs font-mono"
                />
                <input
                  type="text"
                  value={st.label}
                  onChange={(e) => {
                    const newStats = [...aboutForm.stats];
                    newStats[i] = { ...newStats[i], label: e.target.value };
                    setAboutForm({ ...aboutForm, stats: newStats });
                  }}
                  placeholder="Label"
                  className="w-full px-3 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
            Download CV URL
          </label>
          <input
            type="text"
            value={aboutForm.cvUrl || ''}
            onChange={(e) => setAboutForm({ ...aboutForm, cvUrl: e.target.value })}
            placeholder="https://.../resume.pdf"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>
    </form>
  );
};
