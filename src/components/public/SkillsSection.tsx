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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mastery &amp; Tooling</span>
          </div>
          <h2
            id="skills-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase"
          >
            TECHNICAL &amp; CREATIVE SKILLS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
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
