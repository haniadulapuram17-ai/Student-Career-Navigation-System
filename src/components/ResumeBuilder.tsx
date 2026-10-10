import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  Sparkles, 
  Send
} from 'lucide-react';

export const ResumeBuilder: React.FC = () => {
  const { user } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'resume' | 'coverletter'>('resume');
  const [copied, setCopied] = useState(false);
  const [companyName, setCompanyName] = useState('Tech Mahindra');
  const [roleTitle, setRoleTitle] = useState('Associate Full Stack Developer');

  const [coverLetterText, setCoverLetterText] = useState(
    `Dear Hiring Manager / Campus Recruitment Team,

I am writing to express my strong interest in the ${roleTitle} position at ${companyName}, facilitated through the Digital Employment Exchange of Telangana (DEET) and TASK placement drive.

As a pre-final year ${user.degree} student in ${user.branch} at ${user.collegeName} (CGPA: ${user.cgpa}/10), I have developed a strong practical foundation in full-stack architecture, relational database optimization, and algorithmic problem solving.

During my academic coursework and regional hackathons (including 1st Place at the Telangana Smart Campus Hackathon), I architected practical full-stack solutions such as the Telangana Agri-Market Price Tracker, which handled over 15,000 daily queries by integrating open government datasets with Node.js and PostgreSQL microservices.

${companyName}'s technological footprint in the Hyderabad Technology Corridor aligns perfectly with my passion for engineering robust, resilient software. I am confident that my technical skills in ${user.skills.slice(0, 5).join(', ')}, coupled with my TASK Cloud accreditation, will enable me to make immediate positive contributions to your engineering teams.

Thank you for your time and consideration. I welcome the opportunity to discuss my qualifications further in a technical interview.

Sincerely,
${user.fullName}
${user.email} | ${user.mobile}
${user.collegeName}`
  );

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateCoverLetter = () => {
    setCoverLetterText(
      `Dear Campus Recruitment Team at ${companyName},

I am excited to submit my candidature for the ${roleTitle} opportunity through the Telangana State Employment Exchange (DEET).

Currently in my graduating batch at ${user.collegeName} with a CGPA of ${user.cgpa}, I have focused my development efforts on enterprise software engineering. My technical inventory includes ${user.skills.slice(0, 6).join(', ')}.

I look forward to discussing how my background can bring value to ${companyName}.

Warm regards,
${user.fullName}
${user.email} | ${user.mobile}`
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                ATS-Optimized Formatting
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">Harvard & Stanford Layout Standard</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              AI Resume Builder & Cover Letter Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Generates an ATS-compliant, single-page resume layout and customized cover letters tailored for DEET and TASK recruiter submissions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('resume')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeSubTab === 'resume'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Resume Layout
            </button>
            <button
              onClick={() => setActiveSubTab('coverletter')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeSubTab === 'coverletter'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Cover Letter
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'resume' ? (
        /* ATS Resume View */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Standard Single-Column ATS Layout</span>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-2xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / Save as PDF</span>
            </button>
          </div>

          {/* Harvard ATS Resume Canvas */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-md p-8 sm:p-12 max-w-4xl mx-auto font-serif text-slate-900 space-y-5 print:border-none print:shadow-none print:p-0">
            
            {/* Header */}
            <div className="text-center border-b border-slate-800 pb-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-slate-950 font-sans">
                {user.fullName}
              </h1>
              <div className="text-xs text-slate-700 mt-1.5 flex flex-wrap items-center justify-center gap-2 font-sans">
                <span>{user.email}</span>
                <span>•</span>
                <span>{user.mobile}</span>
                <span>•</span>
                <span>Hyderabad, Telangana</span>
                <span>•</span>
                <a href={user.linkedinUrl} className="text-slate-900 underline">LinkedIn</a>
                <span>•</span>
                <a href={user.githubUrl} className="text-slate-900 underline">GitHub</a>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5">
                Education
              </h2>
              <div className="text-xs flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{user.collegeName}</span>
                  <div className="text-slate-700">{user.degree} in {user.branch}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">Graduation: June {user.graduationYear}</div>
                  <div className="text-slate-700">CGPA: {user.cgpa} / 10.0</div>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="space-y-2 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5">
                Technical Skills
              </h2>
              <div className="text-xs text-slate-800 space-y-1">
                <div>
                  <strong>Core Languages & Web:</strong> {user.skills.join(', ')}
                </div>
                <div>
                  <strong>Database & Tooling:</strong> PostgreSQL, SQL, Git, Linux, Docker, RESTful APIs
                </div>
                <div>
                  <strong>Fundamentals:</strong> Data Structures & Algorithms, Object-Oriented Design, Database Management
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-3 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5">
                Technical Projects
              </h2>

              {user.portfolioProjects?.map(p => (
                <div key={p.id} className="text-xs space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{p.title} ({p.technologies.join(', ')})</span>
                    <a href={p.githubUrl} className="font-normal text-slate-700 underline">Code</a>
                  </div>
                  <p className="text-slate-700">{p.description}</p>
                  <ul className="list-disc list-inside text-slate-700 space-y-0.5 pl-1">
                    {p.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Certifications & Honors */}
            <div className="space-y-2 font-sans">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5">
                Certifications & Achievements
              </h2>
              <ul className="list-disc list-inside text-xs text-slate-800 space-y-1 pl-1">
                {user.certifications?.map(c => (
                  <li key={c.id}>
                    <strong>{c.name}</strong> – {c.issuer} ({c.issueDate})
                  </li>
                ))}
                <li>Winner, Telangana Smart Campus Hackathon 2025 (State-wide inter-college competition)</li>
                <li>TASK Member ID: TASK-HYD-2024-8849</li>
              </ul>
            </div>

          </div>
        </div>
      ) : (
        /* Cover Letter View */
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">Target Company:</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="px-2.5 py-1 text-xs border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-0.5">Role Position:</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="px-2.5 py-1 text-xs border border-slate-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRegenerateCoverLetter}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Regenerate</span>
              </button>

              <button
                onClick={handleCopyCoverLetter}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Letter'}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={15}
            value={coverLetterText}
            onChange={(e) => setCoverLetterText(e.target.value)}
            className="w-full p-4 font-mono text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      )}

    </div>
  );
};
