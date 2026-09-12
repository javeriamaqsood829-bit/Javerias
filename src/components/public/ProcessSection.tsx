import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ProcessSection: React.FC = () => {
  const { processSteps } = usePortfolio();

  const publishedSteps = processSteps
    .filter((s) => s.published)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <section id="process" className="py-28 bg-[#0a0a0a] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Growth Framework</span>
          </div>
          <h2
            id="process-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase"
          >
            THE 6-PHASE DIGITAL MARKETING PROCESS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            A battle-tested, iterative loop moving from empirical market diagnosis to scale and compounding returns.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {publishedSteps.map((step, idx) => (
            <div
              key={step.id}
              id={`process-step-${step.stepNumber || idx + 1}`}
              className="group p-8 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/0 group-hover:bg-orange-500/5 rounded-tr-2xl transition-all duration-300 blur-xl" />

              <div>
                {/* Number identifier */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading font-extrabold text-4xl text-zinc-700 group-hover:text-orange-500 transition-colors">
                    {step.stepNumber || `0${idx + 1}`}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs text-zinc-400 group-hover:border-orange-500/40 group-hover:text-orange-400 transition-colors">
                    {idx + 1}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-white group-hover:text-orange-400 transition-colors mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress bar hint */}
              <div className="mt-8 pt-4 border-t border-zinc-900 flex items-center gap-2">
                <div className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                    style={{ width: `${((idx + 1) / publishedSteps.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-400">
                  Phase {idx + 1} of {publishedSteps.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
