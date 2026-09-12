import React from 'react';
import { ArrowUpRight, Sparkles, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const CtaSection: React.FC = () => {
  const { siteSettings } = usePortfolio();

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-orange-500/30 text-center space-y-6 shadow-2xl overflow-hidden">
          {/* Top highlight line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scale Your Pipeline</span>
          </div>

          <h2
            id="cta-banner-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight max-w-4xl mx-auto leading-tight"
          >
            READY TO GROW YOUR DIGITAL PRESENCE?
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Let's turn your ideas into a strategic digital marketing experience that gets noticed, crushes benchmarks, and delivers measurable ROI.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              id="cta-start-project-btn"
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-black font-bold text-sm tracking-wide transition-all duration-200 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <a
              id="cta-view-work-btn"
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>View My Work</span>
            </a>
          </div>

          <div className="pt-6 text-xs text-zinc-400 font-mono">
            &bull; Response time: Guaranteed within 24 business hours &bull; Initial growth consultation is complimentary
          </div>
        </div>
      </div>
    </section>
  );
};
