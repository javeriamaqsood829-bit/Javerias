import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ContactSection: React.FC = () => {
  const { siteSettings, submitContactMessage, services } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in required fields (Name, Email, and Message).');
      setStatus('error');
      return;
    }

    try {
      setStatus('submitting');
      setErrorMessage('');

      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service || 'Growth Strategy',
        budget: formData.budget || 'Flexible',
        message: formData.message,
      });

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: '',
      });
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-28 bg-[#0a0a0a] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Channel</span>
          </div>
          <h2
            id="contact-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase"
          >
            LET'S DISCUSS YOUR GROWTH TARGETS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Whether you need full-funnel media buying, organic search dominance, or an omnichannel content engine &mdash; drop a note below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Quick Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800/80 space-y-6 shadow-xl">
              <h3 className="font-heading font-bold text-xl text-white">
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${siteSettings.contactEmail || 'alex@riveragrowth.com'}`}
                  className="flex items-start gap-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-400 uppercase">Direct Email</div>
                    <div className="text-sm font-semibold text-zinc-200 group-hover:text-orange-400 transition-colors">
                      {siteSettings.contactEmail || 'alex@riveragrowth.com'}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${siteSettings.contactPhone || '+1 (415) 890-3421'}`}
                  className="flex items-start gap-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-400 uppercase">Phone &amp; SMS</div>
                    <div className="text-sm font-semibold text-zinc-200 group-hover:text-orange-400 transition-colors">
                      {siteSettings.contactPhone || '+1 (415) 890-3421'}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-400 uppercase">Headquarters</div>
                    <div className="text-sm font-semibold text-zinc-200">
                      {siteSettings.location || 'San Francisco, CA & Remote Global'}
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                {siteSettings.whatsappNumber && (
                  <a
                    href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 hover:border-emerald-500/60 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-emerald-400 uppercase">WhatsApp Instant Chat</div>
                      <div className="text-sm font-semibold text-zinc-200">
                        {siteSettings.whatsappNumber}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Response time card */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Client Advisory Standards</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All client engagements include strict non-disclosure security (NDA), proprietary funnel mapping, and dedicated weekly executive reporting.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl bg-zinc-950/90 border border-zinc-800/80 shadow-2xl space-y-6"
            >
              {/* Success Notification */}
              {status === 'success' && (
                <div
                  id="contact-success-alert"
                  className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex items-start gap-3 text-emerald-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold">Inquiry Sent Successfully!</p>
                    <p className="text-xs text-emerald-400/90 mt-1">
                      Thank you for reaching out. Alex Rivera will review your project parameters and respond within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {status === 'error' && (
                <div
                  id="contact-error-alert"
                  className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 flex items-start gap-3 text-red-300 text-xs"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name-input" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Full Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email-input" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Email Address <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="sarah@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone-input" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone-input"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="contact-company-input" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Company / Organization
                  </label>
                  <input
                    id="contact-company-input"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Growth Inc."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Service Interested In */}
                <div>
                  <label htmlFor="contact-service-select" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Primary Service Focus
                  </label>
                  <select
                    id="contact-service-select"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select Service Area</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Comprehensive Growth Audit">Comprehensive Growth Audit</option>
                    <option value="Omnichannel Retainer">Omnichannel Retainer</option>
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="contact-budget-select" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Estimated Monthly Budget
                  </label>
                  <select
                    id="contact-budget-select"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select Budget Bracket</option>
                    <option value="$3,000 - $5,000 / mo">$3,000 - $5,000 / mo</option>
                    <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                    <option value="$10,000 - $25,000 / mo">$10,000 - $25,000 / mo</option>
                    <option value="$25,000+ / mo">$25,000+ / mo</option>
                    <option value="One-Time Strategic Audit">One-Time Strategic Audit</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message-input" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Project Scope &amp; Target Objectives <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="contact-message-input"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe your current baseline, target growth targets, and expected timeline..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 text-black font-bold text-sm tracking-wide transition-all shadow-xl shadow-orange-500/20"
              >
                {status === 'submitting' ? (
                  <span>Sending Inquiry...</span>
                ) : (
                  <>
                    <span>Submit Strategic Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
