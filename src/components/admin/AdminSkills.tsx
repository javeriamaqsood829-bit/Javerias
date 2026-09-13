import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Eye, EyeOff } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillItem } from '../../types/portfolio';

export const AdminSkills: React.FC = () => {
  const { skills, saveSkill, deleteSkill } = usePortfolio();
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deletingSkillId, setDeletingSkillId] = useState<string | null>(null);

  const startNewSkill = () => {
    const newS: SkillItem = {
      id: `skill-${Date.now()}`,
      name: '',
      category: 'Digital Marketing',
      percentage: 90,
      displayOrder: skills.length + 1,
      published: true,
    };
    setEditingSkill(newS);
    setIsNew(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name) return;
    await saveSkill(editingSkill);
    setEditingSkill(null);
    setIsNew(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
            Skills &amp; Tooling Management
          </h1>
          <p className="text-xs text-zinc-400">
            Configure technical competencies, mastery levels, and filter groupings ({skills.length} total competencies configured).
          </p>
        </div>

        {!editingSkill && (
          <button
            onClick={startNewSkill}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        )}
      </div>

      {editingSkill ? (
        <form
          onSubmit={handleSave}
          className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-5 animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="font-heading font-bold text-base text-white">
              {isNew ? 'New Skill' : `Edit: ${editingSkill.name}`}
            </h2>
            <button
              type="button"
              onClick={() => setEditingSkill(null)}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Skill Name *
              </label>
              <input
                type="text"
                required
                value={editingSkill.name}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                placeholder="e.g. SEO & Technical Audit"
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Category
              </label>
              <select
                value={editingSkill.category}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Creative">Creative</option>
                <option value="Tools">Tools &amp; Platforms</option>
                <option value="Analytics & Data">Analytics &amp; Data</option>
                <option value="Growth & Strategy">Growth &amp; Strategy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Icon Name (Lucide)
              </label>
              <input
                type="text"
                value={editingSkill.icon || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                placeholder="e.g. Target, BarChart2, Zap"
                className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Proficiency ({editingSkill.percentage}%)
              </label>
              <input
                type="range"
                min="30"
                max="100"
                value={editingSkill.percentage}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, percentage: parseInt(e.target.value) || 50 })
                }
                className="w-full mt-2 accent-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={editingSkill.published}
                onChange={(e) => setEditingSkill({ ...editingSkill, published: e.target.checked })}
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span>Published on Website</span>
            </label>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingSkill(null)}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save Skill</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm text-white truncate">
                    {skill.name}
                  </span>
                  <span className="text-xs text-orange-400 font-mono">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">{skill.category}</div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {deletingSkillId === skill.id ? (
                  <div className="flex items-center gap-1 bg-red-950/70 border border-red-800/80 rounded-lg px-2 py-1 animate-in fade-in">
                    <span className="text-[10px] text-red-200 font-semibold mr-0.5">Delete?</span>
                    <button
                      type="button"
                      onClick={async () => {
                        await deleteSkill(skill.id);
                        setDeletingSkillId(null);
                      }}
                      className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold transition-colors"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingSkillId(null)}
                      className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] transition-colors"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSkill(skill);
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors"
                      title="Edit Skill"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingSkillId(skill.id)}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
