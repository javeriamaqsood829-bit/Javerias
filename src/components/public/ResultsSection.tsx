import React from 'react';
import { TrendingUp, Target, DollarSign, Users, Award, Sparkles, BarChart3 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const getResultIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case 'target':
      return <Target className="w-6 h-6 text-orange-400" />;
    case 'dollarsign':
    case 'dollar':
      return <DollarSign className="w-6 h-6 text-orange-400" />;
    case 'users':
      return <Users className="w-6 h-6 text-orange-400" />;
    case 'award':
      return <Award className="w-6 h-6 text-orange-400" />;
    case 'barchart':
      return <BarChart3 className="w-6 h-6 text-orange-400" />;
    case 'trendingup':
    default:
      return <TrendingUp className="w-6 h-6 text-orange-400" />;
  }
};

export const ResultsSection: React.FC = () => {
  const { results } = usePortfolio();

  const publishedResults = results
    .filter((r) => r.published)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <section id="results" className="py-24 bg-[#080808] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verifiable Impact</span>
          </div>
          <h2
            id="results-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase"
          >
            PROVEN TRACK RECORD &amp; ROI
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Aggregate revenue and conversion benchmarks delivered across 8+ years of growth leadership.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publishedResults.map((metric) => (
            <div
              key={metric.id}
              id={`result-metric-${metric.id}`}
              className="p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5 group-hover:border-orange-500/30 transition-colors">
                  {getResultIcon(metric.icon)}
                </div>

                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white group-hover:text-orange-400 transition-colors mb-2">
                  {metric.metricValue}
                </div>

                <div className="font-heading font-bold text-base text-zinc-200 mb-2">
                  {metric.metricLabel}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {metric.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center gap-1.5 text-[11px] font-mono text-orange-400">
                <span>Verified Metric Benchmark</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
