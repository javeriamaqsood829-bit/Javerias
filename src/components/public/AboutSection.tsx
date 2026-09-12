import React from 'react';
import { Download, Check, Sparkles, TrendingUp, Cpu, Lightbulb } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AboutSection: React.FC = () => {
  const { aboutContent, siteSettings } = usePortfolio();

  return (
    <section
      id="about"
      className="py-28 bg-[#0a0a0a] relative border-t border-zinc-900 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introduction</span>
          </div>
          <h2
            id="about-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase"
          >
            {aboutContent.heading || 'ABOUT ME'}
          </h2>
          <p className="text-orange-400 font-medium text-lg mt-2 max-w-2xl">
            {aboutContent.subheading || 'Where Analytical Rigor Meets High-Performance Creative Execution'}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Bio & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <p
              id="about-bio-1"
              className="text-base sm:text-lg text-zinc-300 leading-relaxed"
            >
              {aboutContent.bioParagraph1}
            </p>

            <p
              id="about-bio-2"
              className="text-base sm:text-lg text-zinc-400 leading-relaxed"
            >
              {aboutContent.bioParagraph2}
            </p>

            {/* Approach Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-3 text-orange-400 font-heading font-bold text-lg">
                <Lightbulb className="w-5 h-5" />
                <span>The Growth Philosophy</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {aboutContent.approach ||
                  'Creative intuition guided by cohort analytics, conversion rate optimization, and relentless A/B testing.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <span>Dual Creative &amp; Quantitative Core</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <span>Unit Economics &amp; Blended CAC Focus</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <span>Rapid Omnichannel Experimentation</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                  <span>Long-Term Brand Equity Compounding</span>
                </div>
              </div>
            </div>

            {/* Download CV and Contact CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                id="about-download-cv-btn"
                href={aboutContent.cvUrl || siteSettings.cvUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-500/50 shadow-md"
              >
                <Download className="w-4 h-4 text-orange-400" />
                <span>Download Professional CV</span>
              </a>

              <a
                id="about-contact-btn"
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Discuss Your Growth Targets</span>
              </a>
            </div>
          </div>

          {/* Right: Real-time Stats Cards & Frame */}
          <div className="lg:col-span-5 space-y-6">
            {/* 4 Dynamic Statistic Cards */}
            <div id="about-stats-grid" className="grid grid-cols-2 gap-4">
              {(aboutContent.stats || []).map((stat, idx) => (
                <div
                  key={idx}
                  id={`about-stat-${idx}`}
                  className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-orange-500/40 transition-all duration-300 group"
                >
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white group-hover:text-orange-400 transition-colors">
                    {stat.value}
                    <span className="text-orange-500 font-normal">{stat.suffix || '+'}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-1 uppercase tracking-wider font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Profile secondary visual card */}
            <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-4">
              <div className="aspect-[16/9] rounded-xl overflow-hidden relative">
                <img
                  src={aboutContent.profileImage || siteSettings.profileImage}
                  alt="Soma - Marketing Strategy Session"
                  className="w-full h-full object-cover object-center filter contrast-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-xs text-zinc-300 font-mono">
                  &bull; Analytics &amp; Creative Performance Studio &mdash; New York &amp; Global Remote
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
