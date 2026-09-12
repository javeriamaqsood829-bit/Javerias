import React, { useState } from 'react';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { DEFAULT_TESTIMONIALS } from '../../data/initialData';
import { TestimonialItem } from '../../types/portfolio';

const TestimonialCard: React.FC<{ item: TestimonialItem }> = ({ item }) => {
  const [imgError, setImgError] = useState(false);

  const quoteText =
    (item.quote && item.quote.trim().length > 3)
      ? item.quote
      : (item.testimonial && item.testimonial.trim().length > 3)
      ? item.testimonial
      : 'Soma transformed our growth strategy with unmatched analytical precision, engineering profitable customer acquisition funnels that scaled our business.';

  const roleText = item.role || item.clientPosition || 'Executive Partner';
  const companyText = item.company || 'Enterprise Partner';
  const avatarSrc = item.avatar || item.profileImage || '';

  // Get initials for graceful avatar fallback
  const getInitials = (name: string) => {
    if (!name) return 'C';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div
      id={`testimonial-card-${item.id}`}
      className="group p-7 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-orange-500/40 hover:bg-zinc-900/30 transition-all duration-300 flex flex-col justify-between relative shadow-xl hover:-translate-y-1"
    >
      {/* Accent top gradient line on hover */}
      <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/0 group-hover:via-orange-500/70 to-transparent transition-all duration-500" />

      <div>
        {/* Rating and Quote Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-orange-400">
            {Array.from({ length: item.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
            ))}
          </div>
          <Quote className="w-7 h-7 text-zinc-800 group-hover:text-orange-500/30 transition-colors" />
        </div>

        {/* Feedback Quote */}
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed italic mb-6">
          &ldquo;{quoteText}&rdquo;
        </p>

        {/* Optional Result Highlight */}
        {item.result && (
          <div className="mb-6 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center gap-2 text-xs text-orange-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{item.result}</span>
          </div>
        )}
      </div>

      {/* Author Row */}
      <div className="pt-4 border-t border-zinc-800/70 flex items-center gap-3.5">
        {avatarSrc && !imgError ? (
          <img
            src={avatarSrc}
            alt={item.clientName}
            onError={() => setImgError(true)}
            className="w-12 h-12 rounded-full object-cover border border-zinc-700 shrink-0 group-hover:border-orange-500/50 transition-colors"
            loading="lazy"
          />
        ) : (
          <div
            className="w-12 h-12 rounded-full bg-zinc-900 border border-orange-500/40 text-orange-400 font-heading font-bold text-sm flex items-center justify-center shrink-0 shadow-inner group-hover:border-orange-500 transition-colors"
            title={item.clientName}
          >
            {getInitials(item.clientName)}
          </div>
        )}

        <div className="overflow-hidden">
          <div className="flex items-center gap-1.5">
            <h4 className="font-heading font-bold text-sm sm:text-base text-white truncate">
              {item.clientName}
            </h4>
          </div>
          <p className="text-xs text-zinc-400 font-mono truncate">
            {roleText}, {companyText}
          </p>
          {item.date && (
            <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
              {item.date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = usePortfolio();

  const sourceList = (testimonials && testimonials.length > 0) ? testimonials : DEFAULT_TESTIMONIALS;

  const publishedTestimonials = sourceList
    .filter((t) => t.published !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <section id="testimonials" className="py-28 bg-[#0a0a0a] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Endorsements &amp; Results</span>
          </div>
          <h2
            id="testimonials-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase"
          >
            TRUSTED BY FOUNDERS &amp; EXECUTIVES
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Direct feedback and verifiable metrics from business leaders and CMOs whose brands we scaled.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedTestimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
