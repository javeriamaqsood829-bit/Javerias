import React from 'react';
import {
  ArrowUp,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Globe,
  Mail,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface FooterProps {
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateAdmin }) => {
  const { siteSettings, socialLinks, navigationLinks, isAdmin } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'twitter':
      case 'x':
        return <Twitter className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const currentYear = new Date().getFullYear();
  const publishedSocials = socialLinks
    .filter((s) => s.published)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-zinc-900 py-16 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-black font-extrabold text-base">
                {siteSettings.brandName ? siteSettings.brandName.charAt(0) : 'S'}
              </div>
              <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                {siteSettings.brandName || 'SOMA'}
              </span>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              {siteSettings.tagline || siteSettings.shortBio ||
                'Empirical growth architecture, omnichannel digital marketing, and data-driven customer acquisition.'}
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {publishedSocials.map((social) => (
                <a
                  key={social.id}
                  id={`footer-social-${social.platform.toLowerCase()}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/40 transition-colors"
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white">
              Navigation
            </h4>
            <div className="flex flex-col space-y-2">
              {navigationLinks.slice(0, 6).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="text-xs text-zinc-400 hover:text-orange-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white">
              Direct Contact
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-400">
              <p>Email: {siteSettings.contactEmail || siteSettings.email || 'soma.marketing@gmail.com'}</p>
              <p>Phone: {siteSettings.contactPhone || siteSettings.phone || '+1 (555) 782-3901'}</p>
              <p>Location: {siteSettings.location || 'New York, NY & Remote Global'}</p>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:underline"
              >
                <span>Request Strategic Growth Audit &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <p>
              &copy; {currentYear} {siteSettings.ownerName || 'Soma'}. All rights reserved.
            </p>
            {onNavigateAdmin && (
              <button
                id="footer-admin-btn"
                onClick={onNavigateAdmin}
                className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-300 transition-colors"
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-3 h-3 text-orange-400" />
                    <span>Admin Panel Active</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3" />
                    <span>Admin Portal</span>
                  </>
                )}
              </button>
            )}
          </div>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-orange-400 hover:border-zinc-700 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
