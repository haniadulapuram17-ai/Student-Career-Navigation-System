import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { SAMPLE_RESUME_TEXT } from '../data/mockData';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  Check, 
  RefreshCw,
  Eye,
  FileCheck2
} from 'lucide-react';
import { ExtractedResumeData } from '../types';

export const ResumeAnalyzer: React.FC = () => {
  const { user, updateProfile, setActiveTab } = useApp();

  const [resumeText, setResumeText] = useState<string>(SAMPLE_RESUME_TEXT);
  const [targetRole, setTargetRole] = useState<string>(user.targetRole || 'Full Stack Engineer');
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [extractedData, setExtractedData] = useState<ExtractedResumeData | null>(
    user.resumeExtractedData || {
      skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'SQL', 'Python', 'Tailwind CSS', 'Git', 'Data Structures & Algorithms', 'PostgreSQL', 'Docker'],
      projects: ['Telangana Agri-Market Price Tracker (React, Node, Postgres)', 'Automated Campus Placement Scheduler (TS, Express, Docker)'],
      qualifications: 'B.Tech in Computer Science and Engineering, JNTUH CEH (CGPA 8.65)',
      experience: 'Winner of Telangana Smart Campus Hackathon, Academic full-stack projects, TASK Cloud Associate certified',
      atsScore: 84,
      strengths: [
        'Excellent technical alignment with Telangana DEET full-stack job listings',
        'Strong academic credibility (CGPA 8.65) and real regional project context',
        'Well-formatted bullet points demonstrating problem-solving capabilities'
      ],
      areasForImprovement: [
        'Add AWS or Azure cloud deployment specifics',
        'Incorporate unit testing (Jest/Playwright) keywords',
        'Quantify server latency reduction metrics in the Agri-Market project'
      ],
      matchedRoleScore: 88,
      suggestions: [
        'Transform project bullets to XYZ formula: "Architected Agri-Price system serving 15K daily queries by deploying Node/Postgres microservices"',
        'Include your official TASK Student ID in the certifications header',
        'Ensure contact links (GitHub and LinkedIn) are hyperlinked for automated ATS crawlers'
      ]
    }
  );

  const [syncedSkills, setSyncedSkills] = useState(false);
  const [uploadFileName, setUploadFileName] = useState<string>(user.resumeFileName || 'Srikanth_Goud_Resume_2026.pdf');
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    // Read text if plain text, or read buffer/sample
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text && text.trim().length > 50) {
        setResumeText(text);
      } else {
        // Fallback for binary pdf: set descriptive prompt
        setResumeText(`[Document Uploaded: ${file.name}]\n` + SAMPLE_RESUME_TEXT);
      }
    };
    reader.readAsText(file);
  };

  const handleRunAnalysis = async () => {
    if (!resumeText.trim()) return;
    setAnalyzing(true);
    setSyncedSkills(false);

    try {
      const res = await apiService.analyzeResume(resumeText, targetRole, user);
      if (res.success && res.extracted) {
        setExtractedData(res.extracted);
        updateProfile({
          resumeFileName: uploadFileName,
          resumeAtsScore: res.extracted.atsScore,
          resumeExtractedData: res.extracted
        });
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSyncSkills = () => {
    if (!extractedData) return;
    const combined = Array.from(new Set([...user.skills, ...extractedData.skills]));
    updateProfile({
      skills: combined,
      resumeAtsScore: extractedData.atsScore
    });
    setSyncedSkills(true);
    setTimeout(() => setSyncedSkills(false), 2500);
  };

  const handleDownloadSample = () => {
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = uploadFileName.replace('.pdf', '.txt');
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                DEET & TASK ATS Screening Engine
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">Gemini 3.8 Flash Powered</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              AI Resume Analyzer & Job Matcher
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Extract technical skills, assess ATS compliance for Telangana campus drives, and detect missing keywords before applying to DEET and TASK employers.
            </p>
          </div>

          {/* Secure Document Storage Status Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 truncate max-w-[160px]">{uploadFileName}</div>
              <div className="text-[11px] text-slate-500">Secure Storage · v1.2 Active</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Upload & Resume Input (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Upload or Paste Resume</h2>
              <button
                type="button"
                onClick={() => setResumeText(SAMPLE_RESUME_TEXT)}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
              >
                Load Sample JNTUH Resume
              </button>
            </div>

            {/* Drag & Drop Upload Area */}
            <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/60 hover:bg-emerald-50/20 transition-colors">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="w-7 h-7 text-slate-400 mb-2" />
              <span className="text-xs font-semibold text-slate-800">
                Click to upload PDF or DOCX
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Max 5MB · Secured for DEET recruitment verification
              </span>
            </label>

            {/* Target Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Role for Matching
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Full Stack Developer, Cloud Engineer"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            {/* Raw Text View / Edit */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Extracted Text Content
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewOpen(!previewOpen)}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{previewOpen ? 'Collapse' : 'Expand'}</span>
                  </button>
                  <button
                    onClick={handleDownloadSample}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <textarea
                rows={previewOpen ? 14 : 7}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste plain text of resume here..."
                className="w-full p-2.5 text-xs font-mono rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleRunAnalysis}
              disabled={analyzing}
              className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Extracting Skills & Auditing ATS...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run AI Resume Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Analysis Results (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {extractedData ? (
            <div className="space-y-4">
              
              {/* ATS Score Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">ATS Compliance Score</span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${
                        extractedData.atsScore >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {extractedData.atsScore >= 80 ? 'High ATS Pass Rate' : 'Needs Optimization'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Target Role Compatibility: <strong className="text-slate-800">{extractedData.matchedRoleScore || 85}%</strong>
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">{extractedData.atsScore}</span>
                    <span className="text-xs font-bold text-slate-400">/ 100</span>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="mt-3">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        extractedData.atsScore >= 80 ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${extractedData.atsScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Extracted Skills Section */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      Extracted Technical & Domain Skills ({extractedData.skills.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Skills identified by AI parser for Telangana drives
                    </p>
                  </div>

                  <button
                    onClick={handleSyncSkills}
                    disabled={syncedSkills}
                    className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    {syncedSkills ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Profile Synced!</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Sync with My Profile</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Skills Unboxed Clean Typography with bullet separators */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                  <div className="flex flex-wrap gap-2 text-xs">
                    {extractedData.skills.map((skill, index) => (
                      <span key={skill} className="inline-flex items-center text-slate-800">
                        <span className="font-medium">{skill}</span>
                        {index < extractedData.skills.length - 1 && (
                          <span className="text-slate-400 ml-2 select-none" aria-hidden="true">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Extracted Projects & Experience */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900">Extracted Projects & Training</h3>
                <div className="space-y-2">
                  {extractedData.projects.map((proj, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-slate-50/50">
                      <strong className="text-slate-900 block mb-0.5">Project #{idx + 1}</strong>
                      {proj}
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Actionable Improvements (Google XYZ Formula) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Candidate Strengths</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                    {extractedData.strengths.map((str, idx) => (
                      <li key={idx} className="leading-relaxed">{str}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>ATS Optimization Advice</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                    {extractedData.areasForImprovement.map((imp, idx) => (
                      <li key={idx} className="leading-relaxed">{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Google XYZ Formula Suggestions Banner */}
              {extractedData.suggestions && extractedData.suggestions.length > 0 && (
                <div className="bg-slate-900 text-slate-200 rounded-xl p-4 text-xs space-y-2">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                    Recommended XYZ Bullet Points
                  </span>
                  {extractedData.suggestions.map((sug, idx) => (
                    <p key={idx} className="text-slate-300 leading-relaxed pl-3 border-l-2 border-emerald-500">
                      "{sug}"
                    </p>
                  ))}
                </div>
              )}

              {/* Action Button: Match with DEET Jobs */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Matched DEET & TASK Openings</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
              <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-semibold text-slate-700">No Resume Analyzed Yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Upload your resume file or click "Load Sample JNTUH Resume" to inspect extracted skills and ATS score.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
