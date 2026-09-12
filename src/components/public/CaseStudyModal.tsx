import React, { useEffect } from 'react';
import { X, ExternalLink, ArrowUpRight, ArrowLeft, CheckCircle2, TrendingUp, Calendar, Layers, ShieldCheck } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 md:p-10 flex items-start justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="case-study-modal-content"
        className="relative w-full max-w-4xl bg-[#0d0d0d] border border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with Back Button and Close */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <button
            onClick={onClose}
            aria-label="Back to Projects"
            className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 hover:bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-700 backdrop-blur-md text-xs font-semibold transition-all shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-orange-400" />
            <span>Back / Wapis</span>
          </button>

          <button
            id="close-case-study-btn"
            onClick={onClose}
            aria-label="Close Case Study"
            className="pointer-events-auto p-2 rounded-full bg-black/85 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700 backdrop-blur-md transition-all shadow-lg active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full bg-zinc-950 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/40 to-transparent" />

          {/* Floating Category & Date */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-500 text-black font-bold text-xs uppercase tracking-wider">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900/90 text-zinc-300 text-xs font-mono border border-zinc-700">
                Client: {project.client}
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-400">{project.date}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-10">
          {/* Header Title & Short Pitch */}
          <div className="space-y-4">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white uppercase leading-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800">
              {project.metrics.map((m, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-orange-400">
                    {m.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Structured Case Study Sections */}
          <div className="space-y-8">
            {/* The Challenge */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>The Challenge</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Diagnostic &amp; Friction Points</h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {project.challenge || project.fullDescription}
              </p>
            </div>

            {/* The Strategy */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>The Strategic Architecture</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Hypothesis &amp; Channel Allocation</h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {project.strategy}
              </p>
            </div>

            {/* Execution */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>Execution &amp; Implementation</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Technical Deployment &amp; Creative Iterations</h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {project.execution}
              </p>
            </div>

            {/* Results & Business Impact */}
            <div className="space-y-3 p-6 rounded-2xl bg-zinc-950/90 border border-orange-500/30">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400">
                <TrendingUp className="w-4 h-4" />
                <span>Empirical Results</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Business &amp; Pipeline Impact</h3>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                {project.results}
              </p>
            </div>
          </div>

          {/* Visual Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
                Visual Campaign Assets
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[16/10]"
                  >
                    <img
                      src={img}
                      alt={`${project.title} asset ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services & Tools Used */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 block mb-3">
                Services Provided
              </span>
              <div className="flex flex-wrap gap-2">
                {project.services?.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 block mb-3">
                Tools &amp; Platforms Used
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tools?.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-orange-400/90 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project CTA footer */}
          <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
                <span>Back / Wapis</span>
              </button>

              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-orange-400 transition-colors"
                >
                  <span>Visit Live Client Domain</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-xs text-zinc-400">Enterprise Private Client NDA</span>
              )}
            </div>

            <a
              href="#contact"
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm transition-colors cursor-pointer"
            >
              Achieve Similar Results For Your Brand
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
