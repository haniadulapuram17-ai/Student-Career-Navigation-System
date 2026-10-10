import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  Code2, 
  Share2, 
  Check, 
  Layers, 
  X
} from 'lucide-react';
import { PortfolioProject, Certification } from '../types';

export const PortfolioBuilder: React.FC = () => {
  const { user, updateProfile } = useApp();

  const [addProjModal, setAddProjModal] = useState(false);
  const [addCertModal, setAddCertModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [newProj, setNewProj] = useState({
    title: '',
    description: '',
    tech: 'React, Node.js, PostgreSQL',
    github: 'https://github.com/srikanth-goud/',
    highlight: 'Handled high-throughput requests with automated indexing'
  });

  const [newCert, setNewCert] = useState({
    name: '',
    issuer: 'TASK' as const,
    issueDate: 'November 2025',
    url: 'https://task.telangana.gov.in/verify'
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title) return;

    const project: PortfolioProject = {
      id: `proj-${Date.now()}`,
      title: newProj.title,
      description: newProj.description,
      technologies: newProj.tech.split(',').map(t => t.trim()),
      githubUrl: newProj.github,
      highlights: [newProj.highlight]
    };

    updateProfile({
      portfolioProjects: [...(user.portfolioProjects || []), project]
    });

    setAddProjModal(false);
    setNewProj({
      title: '',
      description: '',
      tech: 'React, Node.js, PostgreSQL',
      github: 'https://github.com/srikanth-goud/',
      highlight: 'Handled high-throughput requests with automated indexing'
    });
  };

  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.name) return;

    const cert: Certification = {
      id: `cert-${Date.now()}`,
      name: newCert.name,
      issuer: newCert.issuer,
      issueDate: newCert.issueDate,
      credentialUrl: newCert.url
    };

    updateProfile({
      certifications: [...(user.certifications || []), cert]
    });

    setAddCertModal(false);
    setNewCert({
      name: '',
      issuer: 'TASK',
      issueDate: 'November 2025',
      url: 'https://task.telangana.gov.in/verify'
    });
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(`https://career-navigator.telangana.gov.in/portfolio/${user.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Digital Showcase & Verification
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">DEET Verified Student Portfolio</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Technical Portfolio & Credential Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Highlight your regional software projects, NPTEL and TASK certifications, hackathon awards, and GitHub repositories directly for campus recruiters.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShareLink}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Portfolio'}</span>
            </button>
            <button
              onClick={() => setAddProjModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Featured Software Engineering Projects</span>
          </h2>
          <span className="text-xs text-slate-500">{user.portfolioProjects?.length || 0} Projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {user.portfolioProjects?.map(proj => (
            <div
              key={proj.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {proj.title}
                  </h3>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-900 p-1"
                      title="View GitHub Repository"
                    >
                      <Code2 className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {proj.technologies.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-sm text-[11px] font-medium bg-slate-100 text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                {proj.highlights && proj.highlights.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Measurable Impact:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Project</span>
                </span>
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Inspect Code</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Government & Industry Certifications</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accredited credentials from TASK, NPTEL, SWAYAM, and freeCodeCamp
            </p>
          </div>

          <button
            onClick={() => setAddCertModal(true)}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {user.certifications?.map(cert => (
            <div key={cert.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                  {cert.issuer}
                </span>
                <span className="text-[11px] text-slate-400">{cert.issueDate}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                {cert.name}
              </h4>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-700 hover:underline inline-flex items-center gap-1 font-medium mt-1"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Project Modal */}
      {addProjModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900">Add Technical Project</h3>
              <button onClick={() => setAddProjModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newProj.title}
                  onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                  placeholder="e.g. Hyderabad Smart Traffic Visualizer"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={newProj.description}
                  onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                  placeholder="Summary of project problem statement and architecture..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Technologies Used (comma separated)</label>
                <input
                  type="text"
                  value={newProj.tech}
                  onChange={(e) => setNewProj({ ...newProj, tech: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">GitHub Repository URL</label>
                <input
                  type="url"
                  value={newProj.github}
                  onChange={(e) => setNewProj({ ...newProj, github: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Key Measurable Outcome / Highlight</label>
                <input
                  type="text"
                  value={newProj.highlight}
                  onChange={(e) => setNewProj({ ...newProj, highlight: e.target.value })}
                  placeholder="e.g. Decreased API response time by 40% via Redis"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddProjModal(false)}
                  className="px-3.5 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Certification Modal */}
      {addCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-slate-900">Add Credential / Certification</h3>
              <button onClick={() => setAddCertModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCertification} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course / Certification Name *</label>
                <input
                  type="text"
                  required
                  value={newCert.name}
                  onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                  placeholder="e.g. TASK Cloud & Cyber Security Certification"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Issuing Body</label>
                  <select
                    value={newCert.issuer}
                    onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="TASK">TASK (Telangana)</option>
                    <option value="NPTEL">NPTEL</option>
                    <option value="SWAYAM">SWAYAM</option>
                    <option value="Coursera">Coursera</option>
                    <option value="freeCodeCamp">freeCodeCamp</option>
                    <option value="AWS">AWS</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={newCert.issueDate}
                    onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Credential Verification URL</label>
                <input
                  type="url"
                  value={newCert.url}
                  onChange={(e) => setNewCert({ ...newCert, url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddCertModal(false)}
                  className="px-3.5 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs"
                >
                  Save Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
