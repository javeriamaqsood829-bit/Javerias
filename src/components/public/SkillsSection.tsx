import React, { useState } from 'react';
import { Sparkles, CheckCircle2, TrendingUp, Layers, PenTool, Cpu } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Digital Marketing', 'Creative', 'Tools'];

  const publishedSkills = skills.filter((s) => s.published);
  const filteredSkills =
    activeCategory === 'ALL'
      ? publishedSkills
      : publishedSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-28 bg-[#080808] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141416]/90 border border-zinc-800/80 shadow-md backdrop-blur-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
            <span className="text-[#f59e0b] text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em]">
              Mastery &amp; Tooling
            </span>
          </div>
          <h2
            id="skills-heading"
            className="font-impact uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl text-white leading-[1.02]"
          >
            TECHNICAL &amp; CREATIVE SKILLS
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-xl">
            A balanced synthesis of analytical media attribution, conversion psychology, and enterprise tool fluency.
          </p>
        </div>

        {/* Category Filters */}
        <div id="skills-category-filters" className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              id={`skill-card-${skill.id}`}
              className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-orange-500/40 transition-all duration-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-white text-base">
                  {skill.name}
                </span>
                <span className="text-xs font-mono font-bold text-orange-400">
                  {skill.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono pt-1">
                <span>{skill.category}</span>
                <span>Proficiency Level</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
