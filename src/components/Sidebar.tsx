import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  LayoutGrid, 
  Briefcase, 
  FileText, 
  Compass, 
  MessageSquare, 
  Award, 
  LogOut, 
  HelpCircle, 
  Plus, 
  ArrowRight,
  Shield,
  Layers,
  FileCheck2,
  Share2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    user, 
    activeTab, 
    setActiveTab, 
    jobs, 
    applications, 
    logout, 
    currentRole,
    calculateReadinessScore
  } = useApp();

  const readiness = calculateReadinessScore();

  const activeAppsCount = applications.filter(a => a.stage !== 'rejected' && a.stage !== 'selected').length;

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto no-scrollbar font-sans">
      
      <div className="p-5 space-y-6">
        
        {/* Brand Logo matching image */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-2xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">pathwise.</span>
          </div>
        </div>

        {/* Section 1: YOUR WORKSPACE */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Your Workspace
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>Overview</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className={`w-4 h-4 ${activeTab === 'jobs' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>Opportunities</span>
            </div>
            <span className="px-1.5 py-0.2 text-[10px] font-semibold text-slate-500 bg-slate-100 rounded-sm">
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('recruitment')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'recruitment'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className={`w-4 h-4 ${activeTab === 'recruitment' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>My applications</span>
            </div>
            {activeAppsCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-semibold text-slate-500 bg-slate-100 rounded-sm">
                {activeAppsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('skillgap')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'skillgap'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Compass className={`w-4 h-4 ${activeTab === 'skillgap' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>Skill roadmap</span>
            </div>
          </button>

          {/* Active Interview Practice highlight as in uploaded image */}
          <button
            onClick={() => setActiveTab('interview')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'interview'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className={`w-4 h-4 ${activeTab === 'interview' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>Interview practice</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'resume'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileCheck2 className={`w-4 h-4 ${activeTab === 'resume' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>AI Resume Analyzer</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('counselor')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'counselor'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Award className={`w-4 h-4 ${activeTab === 'counselor' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>Career Counselor</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('mentor')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'mentor'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className={`w-4 h-4 ${activeTab === 'mentor' ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>Mentor Hub</span>
            </div>
          </button>

          {currentRole === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Shield className={`w-4 h-4 ${activeTab === 'admin' ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>Admin Console</span>
              </div>
            </button>
          )}
        </div>

        {/* Section 2: YOUR PROGRESS */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
            Your Progress
          </div>

          <div className="px-3 flex items-center gap-3">
            {/* Green Progress Circle matching image */}
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-600"
                  strokeDasharray={`${readiness}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-bold text-slate-800">{readiness}</span>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-800">Placement ready</div>
              <div className="text-[11px] text-slate-400">You're making great progress</div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('resume')}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-400" />
            <span>Add your resume</span>
          </button>
        </div>

        {/* Section 3: Need a little help? Card matching image */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Need a little help?</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Your career coach is just a click away.</p>
          </div>
          <button
            onClick={() => setActiveTab('mentor')}
            className="w-full py-1.5 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Explore resources</span>
            <ArrowRight className="w-3 h-3 text-emerald-600" />
          </button>
        </div>

      </div>

      {/* Footer Profile & Sign Out */}
      <div className="p-4 border-t border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {user.fullName ? user.fullName.charAt(0) : 'U'}
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-slate-800 truncate">{user.fullName || 'Student'}</div>
            <div className="text-[10px] text-slate-400 capitalize">{currentRole}</div>
          </div>
        </div>

        <button
          onClick={logout}
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          title="Sign out & Fresh Registration"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

    </aside>
  );
};
