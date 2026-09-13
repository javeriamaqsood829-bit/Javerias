import React from 'react';
import { GraduationCap, Award, ExternalLink, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const EducationSection: React.FC = () => {
  const { education, certifications } = usePortfolio();

  return (
    <section id="education" className="py-24 bg-[#080808] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Education Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col items-start mb-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141416]/90 border border-zinc-800/80 shadow-md backdrop-blur-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
                <span className="text-[#f59e0b] text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em]">
                  Academic Foundation
                </span>
              </div>
              <h3 className="font-impact uppercase tracking-tight text-3xl sm:text-4xl text-white">
                EDUCATION
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  id={`edu-item-${edu.id}`}
                  className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-orange-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-heading font-bold text-lg text-white">
                      {edu.degree}
                    </span>
                    <span className="text-xs font-mono text-orange-400 shrink-0">
                      {edu.startYear} &mdash; {edu.endYear}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-zinc-300 mb-2">
                    {edu.institution}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col items-start mb-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141416]/90 border border-zinc-800/80 shadow-md backdrop-blur-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
                <span className="text-[#f59e0b] text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em]">
                  Industry Accreditations
                </span>
              </div>
              <h3 className="font-impact uppercase tracking-tight text-3xl sm:text-4xl text-white">
                CERTIFICATIONS
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  id={`cert-item-${cert.id}`}
                  className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-orange-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-orange-400">
                        {cert.issuingOrg}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">{cert.date}</span>
                    </div>
                    <h4 className="font-heading font-bold text-base text-white group-hover:text-orange-400 transition-colors">
                      {cert.name}
                    </h4>
                    {cert.credentialId && (
                      <div className="text-[11px] font-mono text-zinc-400 mt-1">
                        ID: {cert.credentialId}
                      </div>
                    )}
                  </div>

                  {cert.certificateUrl && (
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-orange-400 transition-colors"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
