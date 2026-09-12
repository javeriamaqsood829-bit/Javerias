import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Eye, EyeOff, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ServiceItem } from '../../types/portfolio';
import { getServiceIcon } from '../public/ServicesSection';
import { uploadMediaFile } from '../../lib/mediaUpload';

export const AdminServices: React.FC = () => {
  const { services, saveService, deleteService } = usePortfolio();
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const startNewService = () => {
    const newS: ServiceItem = {
      id: `service-${Date.now()}`,
      title: '',
      icon: 'target',
      shortDescription: '',
      longDescription: '',
      features: ['Strategy formulation', 'Cohort optimization', 'Weekly reporting'],
      displayOrder: services.length + 1,
      published: true,
    };
    setEditingService(newS);
    setIsNew(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingService) return;

    try {
      setUploadingImage(true);
      const res = await uploadMediaFile(file, 'general');
      setEditingService({ ...editingService, image: res.url });
    } catch (err) {
      console.error(err);
      alert('Image upload failed. Please try a different image or enter URL directly.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;
    await saveService(editingService);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
    setEditingService(null);
    setIsNew(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
            Services Management
          </h1>
          <p className="text-xs text-zinc-400">
            Define marketing services, deliverables, icons, and visibility on the live website.
          </p>
        </div>

        {!editingService && (
          <button
            onClick={startNewService}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        )}
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>Service picture &amp; details saved successfully and updated live on the website!</span>
        </div>
      )}

      {editingService ? (
        <form
          onSubmit={handleSave}
          className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="font-heading font-bold text-lg text-white">
              {isNew ? 'Create New Service' : `Edit: ${editingService.title}`}
            </h2>
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Service Title *
              </label>
              <input
                type="text"
                required
                value={editingService.title}
                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                placeholder="e.g. Paid Media & Performance Marketing"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Icon Identifier
              </label>
              <select
                value={editingService.icon}
                onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="target">Target (Advertising / Acquisition)</option>
                <option value="search">Search (SEO / Analytics)</option>
                <option value="share">Share (Social Media)</option>
                <option value="pentool">PenTool (Creative / Copy)</option>
                <option value="mail">Mail (Email Marketing)</option>
                <option value="barchart">BarChart (Analytics / Reporting)</option>
                <option value="trendingup">TrendingUp (Growth / Revenue)</option>
                <option value="layers">Layers (Brand Architecture)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Short Description (Card Summary) *
            </label>
            <textarea
              required
              rows={2}
              value={editingService.shortDescription}
              onChange={(e) =>
                setEditingService({ ...editingService, shortDescription: e.target.value })
              }
              placeholder="High-level description for the card..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Full Methodology (Modal Breakdown)
            </label>
            <textarea
              rows={4}
              value={editingService.longDescription}
              onChange={(e) =>
                setEditingService({ ...editingService, longDescription: e.target.value })
              }
              placeholder="Detailed explanation shown when user opens the service..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          {/* Service Picture / Image */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase text-zinc-300 font-semibold flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-orange-400" />
                <span>Service Picture / Cover Image</span>
              </label>
              {editingService.image && (
                <button
                  type="button"
                  onClick={() => setEditingService({ ...editingService, image: '' })}
                  className="text-xs text-rose-400 hover:text-rose-300 font-mono"
                >
                  Remove Picture
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {editingService.image ? (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-zinc-700 relative shrink-0">
                  <img
                    src={editingService.image}
                    alt="Service Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-zinc-950 border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-400 shrink-0 text-[10px] font-mono p-2 text-center">
                  <ImageIcon className="w-6 h-6 mb-1 text-zinc-400" />
                  <span>No Picture</span>
                </div>
              )}

              <div className="flex-1 space-y-2.5 w-full">
                <div className="flex items-center gap-2">
                  <label className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-2 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-orange-400" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Picture From Device'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-zinc-400 font-mono">PNG, JPG, WebP</span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Or paste Image URL directly:
                  </label>
                  <input
                    type="url"
                    value={editingService.image || ''}
                    onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Key Inclusions / Features (comma separated)
            </label>
            <input
              type="text"
              value={editingService.features?.join(', ') || ''}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  features: e.target.value.split(',').map((f) => f.trim()).filter(Boolean),
                })
              }
              placeholder="Creative Concepting, Rapid Copy Testing, Daily Bid Optimization"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={editingService.published}
                onChange={(e) =>
                  setEditingService({ ...editingService, published: e.target.checked })
                }
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span>Published on Website</span>
            </label>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span>Display Order:</span>
              <input
                type="number"
                value={editingService.displayOrder || 1}
                onChange={(e) =>
                  setEditingService({ ...editingService, displayOrder: parseInt(e.target.value) || 1 })
                }
                className="w-16 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-white text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <Check className="w-4 h-4" />
              <span>Save Service</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-3">
                {service.image ? (
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-zinc-700 shrink-0">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    {getServiceIcon(service.icon)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm text-white truncate">
                      {service.title}
                    </h3>
                    {service.image && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
                        Has Pic
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs">
                <span
                  className={`inline-flex items-center gap-1 font-mono text-[11px] ${
                    service.published ? 'text-emerald-400' : 'text-zinc-400'
                  }`}
                >
                  {service.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{service.published ? 'Live' : 'Hidden'}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingService(service);
                      setIsNew(false);
                    }}
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete service "${service.title}"?`)) {
                        deleteService(service.id);
                      }
                    }}
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-red-950/40 text-zinc-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
