import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectItem } from '../../types/portfolio';
import { CaseStudyModal } from './CaseStudyModal';

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const publishedProjects = useMemo(() => {
    return projects
      .filter((p) => p.published)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }, [projects]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    publishedProjects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ['ALL', ...Array.from(cats)];
  }, [publishedProjects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return publishedProjects;
    return publishedProjects.filter((p) => p.category === activeCategory);
  }, [publishedProjects, activeCategory]);

  return (
    <section id="projects" className="py-28 bg-[#0a0a0a] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Case Studies</span>
            </div>
            <h2
              id="projects-heading"
              className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase"
            >
              FEATURED CLIENT WORK
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md">
            Empirical results across high-growth DTC, B2B software, and social commerce brands.
          </p>
        </div>

        {/* Category Filtering Tabs */}
        <div
          id="project-category-tabs"
          className="flex flex-wrap items-center gap-2 mb-12 pb-2 border-b border-zinc-800/80"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/25'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => setSelectedProject(project)}
              className="group rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-orange-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-xl"
            >
              {/* Cover Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-orange-400 font-bold text-xs uppercase tracking-wider border border-orange-500/30">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-300 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-zinc-800">
                    {project.date}
                  </span>
                </div>

                {/* Client Label in Bottom corner */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
                    Client
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {project.client}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-7 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                <div className="space-y-3">
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white group-hover:text-orange-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Key Metrics Highlight */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {project.metrics.slice(0, 2).map((m, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80"
                      >
                        <div className="font-heading font-extrabold text-xl text-orange-400">
                          {m.value}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 uppercase">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer Trigger */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.services?.slice(0, 2).map((s, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 group-hover:text-orange-300">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Full Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
