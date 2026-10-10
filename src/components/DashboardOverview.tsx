import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Upload, 
  Zap, 
  Briefcase, 
  Flame, 
  Send, 
  Search, 
  SlidersHorizontal, 
  Bookmark, 
  ExternalLink, 
  Clock, 
  Lightbulb, 
  ArrowRight, 
  MoreHorizontal,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { 
    user, 
    jobs, 
    applications, 
    setActiveTab, 
    applyToJob, 
    calculateReadinessScore 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Record<string, boolean>>({});

  const firstName = user.fullName ? user.fullName.split(' ')[0] : 'Ananya';
  const readiness = calculateReadinessScore();

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedJobs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Curated jobs
  const curatedJobs = [
    {
      id: 'job-task-04',
      company: 'Tata Consultancy Services',
      source: 'TASK',
      title: 'Graduate Engineer Trainee',
      location: 'Hyderabad · Hybrid · Full-time',
      skills: ['Java', 'SQL', 'Communication'],
      badge: 'Great fit',
      badgeType: 'fit',
      match: 94,
      avatar: 'T',
      avatarBg: 'bg-purple-100 text-purple-700',
      applyDate: 'Oct 24, 2026',
      link: 'https://task.telangana.gov.in/drives/tcs-national-telangana'
    },
    {
      id: 'job-deet-01',
      company: 'Tech Mahindra',
      source: 'DEET',
      title: 'Associate Software Engineer',
      location: 'Hyderabad · On-site · Full-time',
      skills: ['React', 'JavaScript', 'Git'],
      badge: 'Closing soon',
      badgeType: 'urgent',
      match: 88,
      avatar: 'M',
      avatarBg: 'bg-orange-100 text-orange-700',
      applyDate: 'Oct 28, 2026',
      link: 'https://deet.telangana.gov.in/jobs/tm-ase-2026'
    },
    {
      id: 'job-task-02',
      company: 'ServiceNow India Development Centre',
      source: 'TASK',
      title: 'Junior Cloud & DevOps Associate',
      location: 'Hyderabad · On-site · Full-time',
      skills: ['Python', 'Docker', 'Linux'],
      badge: 'Great fit',
      badgeType: 'fit',
      match: 91,
      avatar: 'S',
      avatarBg: 'bg-emerald-100 text-emerald-700',
      applyDate: 'Oct 20, 2026',
      link: 'https://task.telangana.gov.in/placements/servicenow-cloud-2026'
    }
  ];

  const filteredJobs = curatedJobs.filter(j => 
    !searchQuery.trim() || 
    `${j.company} ${j.title} ${j.skills.join(' ')}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Welcome Header matching image */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <span>Good morning, {firstName}</span>
            <span className="text-amber-500 font-normal select-none">✳</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A little progress today goes a long way. Here's your career at a glance.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('resume')}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Update resume</span>
        </button>
      </div>

      {/* 4 Stat Cards matching the exact layout and colors from image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Placement readiness */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-slate-500">Placement readiness</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap className="w-4 h-4 fill-emerald-600" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{readiness}</span>
              <span className="text-xs text-slate-400 font-medium">/100</span>
              <span className="text-xs font-bold text-emerald-600 ml-1">↗ 8 pts</span>
            </div>

            {/* Subtle Progress Bar */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-700" 
                  style={{ width: `${readiness}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">On your way</span>
            </div>
          </div>
        </div>

        {/* Card 2: Relevant opportunities */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-slate-500">Relevant opportunities</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900">{jobs.length}</span>
              <span className="text-xs text-slate-500 font-medium">jobs</span>
            </div>
            <div className="mt-3 text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
              <span>3 closing this week</span>
            </div>
          </div>
        </div>

        {/* Card 3: Skills in progress */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-slate-500">Skills in progress</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900">4</span>
              <span className="text-xs text-slate-500 font-medium">skills</span>
            </div>
            <div className="mt-3 text-xs text-slate-400">
              Keep your momentum going
            </div>
          </div>
        </div>

        {/* Card 4: Applications moving */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium text-slate-500">Applications moving</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900">
                {applications.filter(a => a.stage !== 'rejected' && a.stage !== 'selected').length}
              </span>
              <span className="text-xs text-slate-500 font-medium">active</span>
            </div>
            <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
              <span>Last updated Oct 08</span>
              <span className="text-slate-400">↘</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Opportunities worth a look (2/3) + Skills Snapshot (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Columns: Opportunities worth a look */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Curated for you</span>
              </div>
              <h2 className="text-base font-bold text-slate-900">Opportunities worth a look</h2>
              <p className="text-xs text-slate-500 mt-0.5">Roles that line up with your skills and goals.</p>
            </div>

            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              <span>See all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles, companies, skills..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <button className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-1.5 shrink-0 cursor-pointer">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>All</span>
            </button>
          </div>

          {/* Curated Job Cards matching image */}
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const isBookmarked = bookmarkedJobs[job.id];
              const isApplied = applications.some(a => a.jobId === job.id);

              return (
                <div
                  key={job.id}
                  className="p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all bg-white flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Pastel Monogram Avatar */}
                      <div className={`w-10 h-10 rounded-xl ${job.avatarBg} font-bold text-sm flex items-center justify-center shrink-0`}>
                        {job.avatar}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-600">{job.company}</span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-xs uppercase">
                            {job.source}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-emerald-700 transition-colors">
                          {job.title}
                        </h3>

                        <div className="text-xs text-slate-400 mt-0.5">
                          {job.location}
                        </div>
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-emerald-700">{job.match}%</div>
                      <div className="text-[10px] text-slate-400 font-medium">match</div>
                    </div>
                  </div>

                  {/* Skill Chips & Fit Badge */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {job.skills.map(sk => (
                      <span key={sk} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
                        {sk}
                      </span>
                    ))}

                    {job.badgeType === 'fit' ? (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{job.badge}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>{job.badge}</span>
                      </span>
                    )}
                  </div>

                  {/* Card Bottom Meta & Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="text-slate-400 text-[11px]">
                      Apply by <strong className="text-slate-700 font-medium">{job.applyDate}</strong>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => toggleBookmark(job.id, e)}
                        className={`p-1 rounded-md transition-colors cursor-pointer ${
                          isBookmarked ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title="Bookmark opportunity"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      {isApplied ? (
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => applyToJob(job.id)}
                          className="text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Official site</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right 4 Columns: Skills Snapshot & Application Tracker */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Skills Snapshot Card matching image */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Your growth
                </span>
                <h3 className="text-sm font-bold text-slate-900">Skills snapshot</h3>
              </div>
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            </div>

            <p className="text-xs text-slate-500">You're building a strong foundation.</p>

            {/* Skill Bars */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">JavaScript</span>
                  <span className="text-[11px] text-slate-400 font-medium">Strong</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full w-[85%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">React</span>
                  <span className="text-[11px] text-slate-400 font-medium">Growing</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full w-[65%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">SQL</span>
                  <span className="text-[11px] text-slate-400 font-medium">Growing</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full w-[45%]"></div>
                </div>
              </div>
            </div>

            {/* Your next step Callout Box matching image */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                <Lightbulb className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-slate-700">
                <strong className="block font-bold text-slate-900 mb-0.5">Your next step</strong>
                <span>Practice SQL joins to unlock more data roles.</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('skillgap')}
              className="text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>View your learning roadmap</span>
              <ArrowRight className="w-3 h-3 text-emerald-600" />
            </button>
          </div>

          {/* Application tracker Card matching image */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Keep the momentum
                </span>
                <h3 className="text-sm font-bold text-slate-900">Application tracker</h3>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>

            <div className="space-y-3">
              {applications.slice(0, 3).map(app => (
                <div 
                  key={app.id}
                  onClick={() => setActiveTab('recruitment')}
                  className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="truncate max-w-[170px]">
                    <div className="font-bold text-slate-900 truncate">{app.company}</div>
                    <div className="text-[11px] text-slate-400 truncate">{app.jobTitle}</div>
                  </div>

                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200/80 shrink-0">
                    {app.stage.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('recruitment')}
              className="w-full py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors text-center cursor-pointer block"
            >
              Open Kanban Pipeline →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
