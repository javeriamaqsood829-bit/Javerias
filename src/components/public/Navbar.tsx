import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Lock } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface NavbarProps {
  onNavigateAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateAdmin }) => {
  const { siteSettings, navigationLinks, isAdmin, currentUser } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleLinks = navigationLinks
    .filter((l) => l.visible)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="nav-brand-logo"
          href="#home"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
            {siteSettings.brandName ? siteSettings.brandName.charAt(0) : 'A'}
          </div>
          <div className="flex flex-col">
            <span className="font-impact uppercase text-xl tracking-wide text-white group-hover:text-[#f59e0b] transition-colors leading-tight">
              {siteSettings.brandName || 'DIGITAL STRATEGIST'}
            </span>
            <span className="text-[10px] tracking-widest text-[#f59e0b] uppercase font-mono font-semibold">
              Growth &amp; Performance
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-7">
          {visibleLinks.map((link) => (
            <a
              key={link.id}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.url}
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors duration-150 relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-orange-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Admin Shortcut */}
        <div className="hidden sm:flex items-center gap-3.5">
          {onNavigateAdmin && (
            <button
              id="nav-admin-shortcut-btn"
              onClick={onNavigateAdmin}
              title={isAdmin ? 'Go to Admin Dashboard' : 'Admin Login'}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-orange-400 hover:border-orange-500/40 transition-colors"
            >
              {isAdmin ? (
                <ShieldCheck className="w-4 h-4 text-orange-400" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
            </button>
          )}

          <a
            id="nav-cta-work-together"
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
          >
            <span>Let's Work Together</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {onNavigateAdmin && (
            <button
              id="mobile-admin-btn"
              onClick={onNavigateAdmin}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-orange-400"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden bg-[#0a0a0a] border-b border-zinc-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {visibleLinks.map((link) => (
              <a
                key={link.id}
                id={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.url}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-200 hover:text-orange-400 py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-3">
            <a
              id="mobile-cta-btn"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-black font-semibold text-sm"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
