import React from 'react';
import { ArrowDownRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const HeroSection: React.FC = () => {
  const { heroContent, siteSettings } = usePortfolio();

  // Split heading into balanced lines to match reference image precisely
  const fullMain = (heroContent.mainHeading || 'TURNING DIGITAL STRATEGY').trim();
  const highlighted = (heroContent.highlightedText || 'INTO REAL GROWTH.').trim();

  let line1 = fullMain;
  let line2 = '';

  const words = fullMain.split(/\s+/);
  if (words.length >= 3 && words[0].toUpperCase() === 'TURNING' && words[1].toUpperCase() === 'DIGITAL') {
    line1 = `${words[0]} ${words[1]}`;
    line2 = words.slice(2).join(' ');
  } else if (words.length > 2) {
    line1 = words.slice(0, 2).join(' ');
    line2 = words.slice(2).join(' ');
  }

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#08080a]"
    >
      {/* Background warm amber glow effects matching reference photo */}
      <div className="absolute top-1/4 -left-10 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 sm:right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Pill Badge matching reference pic */}
            <div
              id="hero-badge"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141416]/90 border border-zinc-800/80 shadow-md backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
              <span className="text-[#f59e0b] text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em]">
                {heroContent.badge || 'DIGITAL MARKETING PROFESSIONAL'}
              </span>
            </div>

            {/* Main Heading matching reference pic typography - scaled down for clean, balanced visual proportions */}
            <h1
              id="hero-heading"
              className="font-impact uppercase tracking-tight text-white leading-[0.96] text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] select-none"
            >
              <span className="block text-white">{line1}</span>
              {line2 && <span className="block text-white">{line2}</span>}
              <span className="block text-[#f59e0b] mt-1">
                {highlighted}
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p
              id="hero-description"
              className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal"
            >
              {heroContent.description ||
                'I help brands build a stronger digital presence through strategic marketing, engaging content, social media, SEO, and conversion-focused digital solutions.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                id="hero-primary-cta"
                href={heroContent.primaryCtaLink || '#projects'}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#f59e0b] hover:bg-amber-500 text-black font-bold text-sm tracking-wide transition-all duration-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
              >
                <span>{heroContent.primaryCtaText || 'View My Work'}</span>
                <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                id="hero-secondary-cta"
                href={heroContent.secondaryCtaLink || '#contact'}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>{heroContent.secondaryCtaText || "Let's Work Together"}</span>
              </a>
            </div>

            {/* Trust / Skill Indicators */}
            <div className="pt-6 border-t border-zinc-800/80 w-full">
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 block mb-3">
                Core Specializations
              </span>
              <div id="hero-trust-pills" className="flex flex-wrap gap-2.5">
                {(heroContent.trustPills || ['Social Media', 'SEO', 'Content Strategy', 'Brand Growth']).map(
                  (pill, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                      <span>{pill}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame with Profile Image & Growth Float */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Radial glow around frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500/30 to-amber-500/20 blur-xl -z-10 opacity-70" />

              {/* Card Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950/80 p-2.5 shadow-2xl backdrop-blur-sm">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900">
                  <img
                    id="hero-profile-image"
                    src={heroContent.profileImage || siteSettings.profileImage}
                    alt={siteSettings.ownerName || 'Soma - Digital Marketer Portrait'}
                    className="w-full h-full object-cover object-center filter grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  {/* Subtle inner dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Caption overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/70 backdrop-blur-md border border-zinc-800/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-heading font-bold text-white text-base">
                          {siteSettings.ownerName || 'Soma'}
                        </div>
                        <div className="text-xs text-orange-400 font-mono">
                          {siteSettings.professionalTitle || 'Growth & Performance Strategist'}
                        </div>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Performance Metric Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 px-4 py-3 rounded-xl bg-[#0e0e0e] border border-orange-500/40 shadow-2xl flex items-center gap-3 backdrop-blur-md">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-base">
                  📈
                </div>
                <div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">ROI Delivery</div>
                  <div className="text-base font-extrabold text-white">3.4x Avg ROAS</div>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 px-4 py-2.5 rounded-xl bg-[#0e0e0e] border border-zinc-800 shadow-2xl flex items-center gap-2 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-xs font-semibold text-zinc-300">Available For Q3 Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
