import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Star, Upload, Image as ImageIcon } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { TestimonialItem } from '../../types/portfolio';
import { uploadMediaFile } from '../../lib/mediaUpload';

export const AdminTestimonials: React.FC = () => {
  const { testimonials, saveTestimonial, deleteTestimonial } = usePortfolio();
  const [editingTesti, setEditingTesti] = useState<TestimonialItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const startNewTestimonial = () => {
    setEditingTesti({
      id: `testi-${Date.now()}`,
      clientName: '',
      company: '',
      role: 'Founder & CEO',
      quote: '',
      result: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
      rating: 5,
      displayOrder: testimonials.length + 1,
      published: true,
    });
    setIsNew(true);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingTesti) return;

    try {
      setUploadingAvatar(true);
      const res = await uploadMediaFile(file, 'general');
      setEditingTesti({ ...editingTesti, avatar: res.url, profileImage: res.url });
    } catch (err) {
      console.error(err);
      alert('Avatar upload failed. Please try a different image or enter URL directly.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTesti || !editingTesti.clientName) return;
    await saveTestimonial(editingTesti);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
    setEditingTesti(null);
    setIsNew(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
            Client Testimonials &amp; Reviews
          </h1>
          <p className="text-xs text-zinc-400">
            Showcase authentic endorsements, ratings, and quotes from clients and executives.
          </p>
        </div>

        {!editingTesti && (
          <div className="flex items-center gap-2">
            <button
              onClick={startNewTestimonial}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          </div>
        )}
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>Testimonial saved successfully and live on the website!</span>
        </div>
      )}

      {editingTesti ? (
        <form
          onSubmit={handleSave}
          className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-5 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="font-heading font-bold text-base text-white">
              {isNew ? 'New Testimonial' : `Edit: ${editingTesti.clientName}`}
            </h2>
            <button
              type="button"
              onClick={() => setEditingTesti(null)}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Client Full Name *
              </label>
              <input
                type="text"
                required
                value={editingTesti.clientName}
                onChange={(e) => setEditingTesti({ ...editingTesti, clientName: e.target.value })}
                placeholder="e.g. Marcus Vance"
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Company</label>
              <input
                type="text"
                value={editingTesti.company}
                onChange={(e) => setEditingTesti({ ...editingTesti, company: e.target.value })}
                placeholder="Aura Commerce"
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Role / Title</label>
              <input
                type="text"
                value={editingTesti.role || editingTesti.clientPosition || ''}
                onChange={(e) => setEditingTesti({ ...editingTesti, role: e.target.value, clientPosition: e.target.value })}
                placeholder="Founder &amp; CEO"
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Quote Statement *</label>
            <textarea
              required
              rows={3}
              value={editingTesti.quote || editingTesti.testimonial || ''}
              onChange={(e) => setEditingTesti({ ...editingTesti, quote: e.target.value, testimonial: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Highlight Result Pill (Optional)
              </label>
              <input
                type="text"
                value={editingTesti.result || ''}
                onChange={(e) => setEditingTesti({ ...editingTesti, result: e.target.value })}
                placeholder="e.g. +340% DTC Revenue in 90 Days"
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Star Rating</label>
              <div className="flex items-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setEditingTesti({ ...editingTesti, rating: s })}
                    className="p-1 cursor-pointer focus:outline-none"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        (editingTesti.rating || 5) >= s
                          ? 'fill-orange-400 text-orange-400'
                          : 'text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-zinc-400 font-mono ml-2">
                  {editingTesti.rating || 5} Stars
                </span>
              </div>
            </div>
          </div>

          {/* Client Avatar Image / Upload */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase text-zinc-300 font-semibold flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-orange-400" />
                <span>Client Photo / Avatar</span>
              </label>
              {(editingTesti.avatar || editingTesti.profileImage) && (
                <button
                  type="button"
                  onClick={() => setEditingTesti({ ...editingTesti, avatar: '', profileImage: '' })}
                  className="text-xs text-rose-400 hover:text-rose-300 font-mono"
                >
                  Remove Photo
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {editingTesti.avatar || editingTesti.profileImage ? (
                <div className="w-16 h-16 rounded-full overflow-hidden border border-zinc-700 relative shrink-0">
                  <img
                    src={editingTesti.avatar || editingTesti.profileImage}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-zinc-950 border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 shrink-0 text-[10px] font-mono">
                  <span>No Photo</span>
                </div>
              )}

              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2">
                  <label className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-orange-400" />
                    <span>{uploadingAvatar ? 'Uploading...' : 'Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-zinc-500 font-mono">PNG, JPG, WebP</span>
                </div>

                <div>
                  <input
                    type="url"
                    value={editingTesti.avatar || editingTesti.profileImage || ''}
                    onChange={(e) =>
                      setEditingTesti({
                        ...editingTesti,
                        avatar: e.target.value,
                        profileImage: e.target.value,
                      })
                    }
                    placeholder="Or enter Image URL: https://..."
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={editingTesti.published}
                onChange={(e) => setEditingTesti({ ...editingTesti, published: e.target.checked })}
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span>Published on Website</span>
            </label>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingTesti(null)}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save Testimonial</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => {
            const avatarSrc = t.avatar || t.profileImage || '';
            const quoteText = t.quote || t.testimonial || '';
            const roleText = t.role || t.clientPosition || 'Client';

            return (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-3">
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt={t.clientName}
                      className="w-12 h-12 rounded-full object-cover border border-zinc-700 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-orange-500/40 text-orange-400 font-bold text-sm flex items-center justify-center shrink-0">
                      {t.clientName ? t.clientName.substring(0, 2).toUpperCase() : 'CL'}
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">{t.clientName}</h3>
                    <div className="text-xs text-zinc-400 font-mono">
                      {roleText}, {t.company}
                    </div>
                    <div className="flex gap-0.5 text-orange-400 mt-1">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-orange-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 italic line-clamp-3">&ldquo;{quoteText}&rdquo;</p>

                {t.result && (
                  <div className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                    &bull; {t.result}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs">
                  <span className="text-[11px] font-mono text-zinc-400">
                    {t.published ? 'Live' : 'Hidden'}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingTesti({
                          ...t,
                          quote: quoteText,
                          testimonial: quoteText,
                          avatar: avatarSrc,
                          profileImage: avatarSrc,
                          role: roleText,
                          clientPosition: roleText,
                        });
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete testimonial from ${t.clientName}?`)) {
                          deleteTestimonial(t.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
