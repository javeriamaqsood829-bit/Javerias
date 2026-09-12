import React, { useState, useEffect, useCallback } from 'react';
import {
  Share2,
  Search,
  Target,
  PenTool,
  Mail,
  BarChart3,
  TrendingUp,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ServiceItem } from '../../types/portfolio';

// Dynamic icon mapper helper
export const getServiceIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case 'search':
      return <Search className="w-6 h-6 text-orange-400" />;
    case 'target':
      return <Target className="w-6 h-6 text-orange-400" />;
    case 'pentool':
    case 'pen':
      return <PenTool className="w-6 h-6 text-orange-400" />;
    case 'mail':
      return <Mail className="w-6 h-6 text-orange-400" />;
    case 'barchart3':
    case 'barchart':
      return <BarChart3 className="w-6 h-6 text-orange-400" />;
    case 'trendingup':
      return <TrendingUp className="w-6 h-6 text-orange-400" />;
    case 'layers':
      return <Layers className="w-6 h-6 text-orange-400" />;
    case 'share2':
    case 'share':
    default:
      return <Share2 className="w-6 h-6 text-orange-400" />;
  }
};

export const ServicesSection: React.FC = () => {
  const { services, isAdmin } = usePortfolio();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const publishedServices = services
    .filter((s) => s.published)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const handleClose = useCallback(() => {
    setSelectedService(null);
    if (window.location.hash === '#service-detail') {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {
        window.location.hash = '';
      }
    }
  }, []);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    try {
      window.location.hash = 'service-detail';
    } catch (e) {
      // ignore
    }
  };

  // Keyboard Escape and browser Back listener
  useEffect(() => {
    if (!selectedService) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    const handleHashChange = () => {
      if (window.location.hash !== '#service-detail') {
        setSelectedService(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [selectedService, handleClose]);

  return (
    <section id="services" className="py-28 bg-[#080808] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Capabilities</span>
            </div>
            <h2
              id="services-heading"
              className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase"
            >
              STRATEGIC SERVICES
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md">
            Holistic growth architectures engineered to acquire, convert, and retain high-value customer cohorts.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => handleSelectService(service)}
              className="group p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-orange-500/50 hover:bg-zinc-900/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative shadow-lg overflow-hidden"
            >
              {/* Subtle top glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/0 group-hover:via-orange-500 to-transparent transition-all duration-500" />

              <div>
                {/* Optional Service Cover Image */}
                {service.image && (
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-6 border border-zinc-800 relative group-hover:border-orange-500/30 transition-colors">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  </div>
                )}

                {/* Icon box */}
                <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/30 flex items-center justify-center mb-6 transition-all duration-200 group-hover:scale-105">
                  {getServiceIcon(service.icon)}
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-white group-hover:text-orange-400 transition-colors duration-150 mb-3">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Checklist Features */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottom trigger */}
              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-orange-400 transition-colors">
                <span>Explore Scope &amp; Deliverables</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Service Detail Modal */}
      {selectedService && (
        <div
          id="service-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-lg bg-[#0e0e0e] border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pinned Top Bar with clear Back and Close buttons */}
            <div className="p-3.5 sm:p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/90 backdrop-blur-md shrink-0">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/60 text-zinc-200 hover:text-white text-xs font-semibold transition-all cursor-pointer active:scale-95"
                title="Back to Strategic Services"
              >
                <ArrowLeft className="w-4 h-4 text-orange-400" />
                <span>Back / Wapis</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 sm:p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-zinc-300">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-orange-500/40 flex items-center justify-center shrink-0">
                  {getServiceIcon(selectedService.icon)}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400">
                    Service Architecture
                  </span>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {selectedService.image && (
                <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-zinc-800 relative shrink-0">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              )}

              <div>
                <h4 className="text-[11px] uppercase font-mono tracking-widest text-zinc-400 mb-1.5">
                  Detailed Scope &amp; Methodology
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {selectedService.longDescription || selectedService.shortDescription}
                </p>
              </div>

              {selectedService.features && selectedService.features.length > 0 && (
                <div>
                  <h4 className="text-[11px] uppercase font-mono tracking-widest text-zinc-400 mb-2">
                    Core Inclusions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedService.features.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pinned Bottom Bar with Back button and Inquire CTA */}
            <div className="p-3 sm:p-4 border-t border-zinc-800/80 bg-zinc-950/95 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={handleClose}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
                <span>Back / Wapis</span>
              </button>

              <div className="flex items-center gap-2">
                {isAdmin && (
                  <a
                    href="#admin"
                    onClick={handleClose}
                    className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-orange-400 border border-orange-500/30 text-xs font-semibold inline-flex items-center gap-1.5"
                  >
                    <span>Edit in Admin</span>
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={handleClose}
                  className="px-4 sm:px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs transition-all cursor-pointer shadow-md inline-flex items-center gap-1.5 active:scale-95"
                >
                  <span>Inquire For Service</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
