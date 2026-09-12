import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Upload,
  ExternalLink,
  Eye,
  EyeOff,
  Star,
  Image as ImageIcon,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectItem } from '../../types/portfolio';
import { uploadMediaFile } from '../../lib/mediaUpload';

export const AdminProjects: React.FC = () => {
  const { projects, saveProject, deleteProject } = usePortfolio();
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);

  const startNewProject = () => {
    const newP: ProjectItem = {
      id: `project-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Social Media',
      client: '',
      date: new Date().getFullYear().toString(),
      shortDescription: '',
      fullDescription: '',
      challenge: '',
      strategy: '',
      execution: '',
      results: '',
      metrics: [
        { label: 'Growth', value: '+100%' },
        { label: 'ROAS', value: '3.0x' },
      ],
      services: ['Social Media', 'Content Strategy'],
      tools: ['Meta Business Suite', 'Canva'],
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      gallery: [],
      featured: true,
      displayOrder: projects.length + 1,
      published: true,
    };
    setEditingProject(newP);
    setIsNew(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    // Auto-slug if empty
    const slug =
      editingProject.slug ||
      editingProject.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    await saveProject({ ...editingProject, slug });
    setEditingProject(null);
    setIsNew(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'cover' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    try {
      setUploading(true);
      const res = await uploadMediaFile(file, 'projects');
      if (target === 'cover') {
        setEditingProject({ ...editingProject, coverImage: res.url });
      } else {
        setEditingProject({
          ...editingProject,
          gallery: [...(editingProject.gallery || []), res.url],
        });
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (idx: number) => {
    if (!editingProject) return;
    const g = [...(editingProject.gallery || [])];
    g.splice(idx, 1);
    setEditingProject({ ...editingProject, gallery: g });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
            Projects &amp; Case Studies
          </h1>
          <p className="text-xs text-zinc-400">
            Create and edit client case studies with metrics, visual gallery, and strategic breakdowns.
          </p>
        </div>

        {!editingProject && (
          <button
            onClick={startNewProject}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Case Study</span>
          </button>
        )}
      </div>

      {/* Editor Form Modal / Drawer */}
      {editingProject ? (
        <form
          onSubmit={handleSave}
          className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="font-heading font-bold text-lg text-white">
              {isNew ? 'Create New Case Study' : `Edit: ${editingProject.title}`}
            </h2>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                placeholder="e.g. Lumina Skin — 340% DTC Revenue Scale"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Category *
              </label>
              <input
                type="text"
                required
                value={editingProject.category}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                placeholder="e.g. Social Media, SEO, Paid Advertising"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Client */}
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Client / Brand
              </label>
              <input
                type="text"
                value={editingProject.client}
                onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                placeholder="Lumina Organics"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Date / Timeline */}
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Timeline / Year
              </label>
              <input
                type="text"
                value={editingProject.date}
                onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                placeholder="2024 &mdash; 2025"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Display Order (1 = First)
              </label>
              <input
                type="number"
                value={editingProject.displayOrder || 1}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, displayOrder: parseInt(e.target.value) || 1 })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Short Summary (Card Preview) *
            </label>
            <textarea
              required
              rows={2}
              value={editingProject.shortDescription}
              onChange={(e) =>
                setEditingProject({ ...editingProject, shortDescription: e.target.value })
              }
              placeholder="Brief summary displayed on project cards..."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          {/* Detailed Strategic Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                The Challenge (Diagnostic)
              </label>
              <textarea
                rows={3}
                value={editingProject.challenge}
                onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                placeholder="What was the client's initial stagnation or bottleneck?"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                The Strategy &amp; Solution
              </label>
              <textarea
                rows={3}
                value={editingProject.strategy}
                onChange={(e) => setEditingProject({ ...editingProject, strategy: e.target.value })}
                placeholder="Strategic frameworks, targeting, creative angles..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Execution
              </label>
              <textarea
                rows={3}
                value={editingProject.execution}
                onChange={(e) => setEditingProject({ ...editingProject, execution: e.target.value })}
                placeholder="Channels deployed, daily pacing, creative iterations..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Results &amp; Impact
              </label>
              <textarea
                rows={3}
                value={editingProject.results}
                onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                placeholder="Revenue figures, retention, customer acquisition cost reduction..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>
          </div>

          {/* Cover Image & Upload */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Cover Image URL
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={editingProject.coverImage}
                onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                placeholder="https://..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
              <label className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'cover')}
                  className="hidden"
                />
              </label>
            </div>
            {editingProject.coverImage && (
              <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden border border-zinc-800">
                <img
                  src={editingProject.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Services & Tools (Comma-separated) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Services (comma separated)
              </label>
              <input
                type="text"
                value={editingProject.services?.join(', ') || ''}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    services: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="Paid Ads, SEO, Content"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Tools &amp; Platforms (comma separated)
              </label>
              <input
                type="text"
                value={editingProject.tools?.join(', ') || ''}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="Meta Ads, Google Analytics 4, Klaviyo"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Visibility Toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={editingProject.published}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, published: e.target.checked })
                }
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span>Published (Visible on site)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={editingProject.featured}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, featured: e.target.checked })
                }
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span>Featured Highlight</span>
            </label>
          </div>

          {/* Submit / Cancel Buttons */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <Check className="w-4 h-4" />
              <span>Save Case Study</span>
            </button>
          </div>
        </form>
      ) : (
        /* Projects List Table / Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-20 h-16 rounded-lg object-cover border border-zinc-800 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-orange-500/20 text-orange-400">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] text-amber-400 font-mono flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate">Client: {project.client}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs">
                <span
                  className={`inline-flex items-center gap-1 font-mono ${
                    project.published ? 'text-emerald-400' : 'text-zinc-400'
                  }`}
                >
                  {project.published ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hidden</span>
                    </>
                  )}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setIsNew(false);
                    }}
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete case study "${project.title}"?`)) {
                        deleteProject(project.id);
                      }
                    }}
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-red-950/40 text-zinc-400 hover:text-red-400"
                    title="Delete"
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
