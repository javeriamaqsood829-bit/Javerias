import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

// Public Components
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { AboutSection } from './components/public/AboutSection';
import { ServicesSection } from './components/public/ServicesSection';
import { ProcessSection } from './components/public/ProcessSection';
import { SkillsSection } from './components/public/SkillsSection';
import { ExperienceSection } from './components/public/ExperienceSection';
import { EducationSection } from './components/public/EducationSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { ResultsSection } from './components/public/ResultsSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { CtaSection } from './components/public/CtaSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';

// Admin Components
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminProjects } from './components/admin/AdminProjects';
import { AdminServices } from './components/admin/AdminServices';
import { AdminHeroAbout } from './components/admin/AdminHeroAbout';
import { AdminSkills } from './components/admin/AdminSkills';
import { AdminExperience } from './components/admin/AdminExperience';
import { AdminTestimonials } from './components/admin/AdminTestimonials';
import { AdminMessages } from './components/admin/AdminMessages';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminMedia } from './components/admin/AdminMedia';

const PortfolioMain: React.FC = () => {
  const { siteSettings, seoSettings, pageSections, currentUser, isAdmin } = usePortfolio();

  // Route state
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // Listen to hash or URL path changes for direct `/admin` access
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || window.location.pathname.startsWith('/admin')) {
        setViewMode('admin');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update dynamic page title, meta tags, and favicon from settings
  useEffect(() => {
    const title = seoSettings?.metaTitle || (siteSettings?.ownerName ? `${siteSettings.ownerName} | Digital Marketer & Growth Strategist` : 'Soma — Senior Digital Marketer & Growth Strategist');
    document.title = title;

    // Update meta description
    if (seoSettings?.metaDescription) {
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', seoSettings.metaDescription);

      let ogDescMeta = document.querySelector('meta[property="og:description"]');
      if (ogDescMeta) ogDescMeta.setAttribute('content', seoSettings.metaDescription);
    }

    // Update og:title
    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) ogTitleMeta.setAttribute('content', title);

    // Update dynamic favicon if custom URL provided
    if (siteSettings?.faviconUrl) {
      const favicons = document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]');
      favicons.forEach((el) => {
        el.href = siteSettings.faviconUrl!;
      });
    }
  }, [seoSettings, siteSettings]);

  // Section visibility helper
  const isSectionVisible = (id: string) => {
    const sec = pageSections.find((s) => s.id === id || s.name === id);
    if (!sec) return true;
    return sec.visible !== false && sec.enabled !== false;
  };

  // Render Admin View
  if (viewMode === 'admin') {
    if (!isAdmin) {
      return (
        <AdminLogin
          onBackToSite={() => {
            setViewMode('public');
            window.location.hash = '';
          }}
          onLoginSuccess={() => setAdminTab('overview')}
        />
      );
    }

    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={(tab) => setAdminTab(tab)}
        onBackToSite={() => {
          setViewMode('public');
          window.location.hash = '';
        }}
      >
        {adminTab === 'overview' && (
          <AdminOverview
            onNavigateTab={(tab) => setAdminTab(tab)}
            onBackToSite={() => {
              setViewMode('public');
              window.location.hash = '';
            }}
          />
        )}
        {adminTab === 'projects' && <AdminProjects />}
        {adminTab === 'services' && <AdminServices />}
        {adminTab === 'hero' && <AdminHeroAbout mode="hero" />}
        {adminTab === 'about' && <AdminHeroAbout mode="about" />}
        {adminTab === 'skills' && <AdminSkills />}
        {adminTab === 'experience' && <AdminExperience />}
        {adminTab === 'testimonials' && <AdminTestimonials />}
        {adminTab === 'messages' && <AdminMessages />}
        {adminTab === 'media' && <AdminMedia />}
        {adminTab === 'settings' && <AdminSettings />}
      </AdminLayout>
    );
  }

  // Render Public Website View
  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 selection:bg-orange-500 selection:text-black">
      {/* Sticky Navigation Bar */}
      <Navbar onNavigateAdmin={() => setViewMode('admin')} />

      {/* Hero Section */}
      {isSectionVisible('hero') && <HeroSection />}

      {/* About Section */}
      {isSectionVisible('about') && <AboutSection />}

      {/* Services Section */}
      {isSectionVisible('services') && <ServicesSection />}

      {/* Process Section */}
      {isSectionVisible('process') && <ProcessSection />}

      {/* Skills Section */}
      {isSectionVisible('skills') && <SkillsSection />}

      {/* Work Experience Section */}
      {isSectionVisible('experience') && <ExperienceSection />}

      {/* Education & Certifications */}
      {isSectionVisible('education') && <EducationSection />}

      {/* Case Studies / Projects Section */}
      {isSectionVisible('projects') && <ProjectsSection />}

      {/* Key Results & Metrics Section */}
      {isSectionVisible('results') && <ResultsSection />}

      {/* Testimonials Section */}
      {isSectionVisible('testimonials') && <TestimonialsSection />}

      {/* High-Impact CTA Banner */}
      <CtaSection />

      {/* Contact Inquiry Section */}
      {isSectionVisible('contact') && <ContactSection />}

      {/* Footer */}
      <Footer onNavigateAdmin={() => setViewMode('admin')} />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioMain />
    </PortfolioProvider>
  );
}
