import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Calendar, GraduationCap, Award, Briefcase } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExperienceItem, EducationItem, CertificationItem } from '../../types/portfolio';

export const AdminExperience: React.FC = () => {
  const {
    experience,
    saveExperience,
    deleteExperience,
    education,
    saveEducation,
    deleteEducation,
    certifications,
    saveCertification,
    deleteCertification,
  } = usePortfolio();

  const [activeSubTab, setActiveSubTab] = useState<'experience' | 'education' | 'certs'>('experience');

  // Experience state
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);

  // Education state
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);

  // Certification state
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);

  const startNewExp = () => {
    setEditingExp({
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      employmentType: 'Full-Time',
      startDate: '2023',
      endDate: 'Present',
      location: 'San Francisco, CA',
      description: '',
      achievements: ['Increased conversion rate by 45%'],
      technologies: ['Google Ads', 'GA4', 'HubSpot'],
      displayOrder: experience.length + 1,
      published: true,
    });
  };

  const startNewEdu = () => {
    setEditingEdu({
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      startYear: '2016',
      endYear: '2020',
      description: '',
      displayOrder: education.length + 1,
    });
  };

  const startNewCert = () => {
    setEditingCert({
      id: `cert-${Date.now()}`,
      name: '',
      issuingOrg: 'Google',
      date: '2024',
      credentialId: '',
      certificateUrl: '',
      displayOrder: certifications.length + 1,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
            Career, Education &amp; Certifications
          </h1>
          <p className="text-xs text-zinc-400">
            Maintain your professional employment timeline, academic background, and industry accreditations.
          </p>
        </div>

        {/* Subtabs */}
        <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveSubTab('experience')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeSubTab === 'experience' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Work Experience
          </button>
          <button
            onClick={() => setActiveSubTab('education')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeSubTab === 'education' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveSubTab('certs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeSubTab === 'certs' ? 'bg-orange-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Certifications
          </button>
        </div>
      </div>

      {/* Subtab 1: Experience */}
      {activeSubTab === 'experience' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            {!editingExp && (
              <button
                onClick={startNewExp}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Position</span>
              </button>
            )}
          </div>

          {editingExp ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveExperience(editingExp);
                setEditingExp(null);
              }}
              className="p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={editingExp.company}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Position</label>
                  <input
                    type="text"
                    required
                    value={editingExp.position}
                    onChange={(e) => setEditingExp({ ...editingExp, position: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={editingExp.startDate}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">End Date</label>
                  <input
                    type="text"
                    value={editingExp.endDate}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingExp.location}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingExp.description}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Achievements (comma separated)
                </label>
                <input
                  type="text"
                  value={editingExp.achievements?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      achievements: e.target.value.split(',').map((a) => a.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 text-black font-bold text-xs"
                >
                  Save Position
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-heading font-bold text-white text-base">
                      {exp.position} &mdash; <span className="text-zinc-400 font-normal">{exp.company}</span>
                    </h3>
                    <div className="text-xs text-orange-400 font-mono">
                      {exp.startDate} &mdash; {exp.endDate} ({exp.location})
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingExp(exp)}
                      className="p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete position at ${exp.company}?`)) {
                          deleteExperience(exp.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Education */}
      {activeSubTab === 'education' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            {!editingEdu && (
              <button
                onClick={startNewEdu}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Education</span>
              </button>
            )}
          </div>

          {editingEdu ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveEducation(editingEdu);
                setEditingEdu(null);
              }}
              className="p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Degree</label>
                  <input
                    type="text"
                    required
                    value={editingEdu.degree}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Institution</label>
                  <input
                    type="text"
                    required
                    value={editingEdu.institution}
                    onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Start Year</label>
                  <input
                    type="text"
                    value={editingEdu.startYear}
                    onChange={(e) => setEditingEdu({ ...editingEdu, startYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">End Year</label>
                  <input
                    type="text"
                    value={editingEdu.endYear}
                    onChange={(e) => setEditingEdu({ ...editingEdu, endYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingEdu(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 text-black font-bold text-xs"
                >
                  Save Education
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm">{edu.degree}</h3>
                    <div className="text-xs text-zinc-400">{edu.institution} ({edu.startYear} - {edu.endYear})</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingEdu(edu)}
                      className="p-1.5 rounded bg-zinc-900 text-zinc-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteEducation(edu.id)}
                      className="p-1.5 rounded bg-zinc-900 text-zinc-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Subtab 3: Certifications */}
      {activeSubTab === 'certs' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            {!editingCert && (
              <button
                onClick={startNewCert}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            )}
          </div>

          {editingCert ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveCertification(editingCert);
                setEditingCert(null);
              }}
              className="p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Certification Name</label>
                  <input
                    type="text"
                    required
                    value={editingCert.name}
                    onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Issuing Organization</label>
                  <input
                    type="text"
                    required
                    value={editingCert.issuingOrg}
                    onChange={(e) => setEditingCert({ ...editingCert, issuingOrg: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Date</label>
                  <input
                    type="text"
                    value={editingCert.date}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Credential URL</label>
                  <input
                    type="text"
                    value={editingCert.certificateUrl}
                    onChange={(e) => setEditingCert({ ...editingCert, certificateUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 text-black font-bold text-xs"
                >
                  Save Certification
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm">{cert.name}</h3>
                    <div className="text-xs text-orange-400 font-mono">{cert.issuingOrg} &bull; {cert.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingCert(cert)}
                      className="p-1.5 rounded bg-zinc-900 text-zinc-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCertification(cert.id)}
                      className="p-1.5 rounded bg-zinc-900 text-zinc-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
