import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, Check, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { experience } = usePortfolio();

  const publishedExp = experience
    .filter((e) => e.published)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <section id="experience" className="py-28 bg-[#0a0a0a] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141416]/90 border border-zinc-800/80 shadow-md backdrop-blur-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
            <span className="text-[#f59e0b] text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em]">
              Career Progression
            </span>
          </div>
          <h2
            id="experience-heading"
            className="font-impact uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl text-white leading-[1.02]"
          >
            WORK EXPERIENCE
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-xl">
            A proven track record of scaling pipeline, managing multi-million ad budgets, and building high-performance growth departments.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-8 before:w-[2px] before:bg-zinc-800/80">
          {publishedExp.map((item, idx) => (
            <div
              key={item.id}
              id={`experience-item-${item.id}`}
              className="relative pl-10 md:pl-20 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-2.5 md:left-6.5 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-950 border-2 border-orange-500 group-hover:scale-125 transition-transform" />

              {/* Card */}
              <div className="p-7 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800/80 hover:border-orange-500/40 transition-all duration-300 shadow-xl space-y-5">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/60 pb-5">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-1">
                      {item.employmentType || 'Full-Time'} &bull; {item.location}
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl text-white">
                      {item.position}
                    </h3>
                    <div className="text-base text-zinc-300 font-semibold mt-0.5">
                      {item.company}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-orange-400" />
                    <span>
                      {item.startDate} &mdash; {item.endDate}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 block">
                      Highlighted Achievements:
                    </span>
                    <div className="space-y-2">
                      {item.achievements.map((ach, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technology Pills */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800/60">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
