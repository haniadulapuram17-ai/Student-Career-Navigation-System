import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { 
  Compass, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  RefreshCw, 
  Check, 
  Play, 
  Video, 
  Laptop
} from 'lucide-react';
import { SkillGapRoadmap as SkillGapType } from '../types';

const COMMON_ROLES = [
  'Full Stack Software Engineer',
  'Cloud & DevOps Engineer',
  'AI & Machine Learning Specialist',
  'Data Analyst & BI Engineer',
  'Embedded Systems & IoT Associate',
  'Cybersecurity & Network Analyst'
];

export const SkillGapRoadmap: React.FC = () => {
  const { user, updateProfile } = useApp();

  const [selectedRole, setSelectedRole] = useState<string>(user.targetRole || 'Full Stack Software Engineer');
  const [loading, setLoading] = useState(false);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({
    'milestone-0': true
  });

  const [roadmapData, setRoadmapData] = useState<SkillGapType>({
    targetJobTitle: selectedRole,
    matchedSkills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'SQL', 'Git', 'Data Structures & Algorithms'],
    missingCriticalSkills: [
      'PostgreSQL Query Optimization & Indexing',
      'Docker Containerization & Docker Compose',
      'System Design (Scalability, Caching & Load Balancing)'
    ],
    missingSecondarySkills: [
      'Automated Unit & Integration Testing (Jest)',
      'CI/CD Pipelines (GitHub Actions)',
      'Redis Distributed Caching'
    ],
    readinessPercentage: 74,
    learningRoadmap: [
      {
        week: 'Week 1-2: Backend API Architecture & Secure Microservices',
        topics: [
          'RESTful API maturity levels & error handling patterns',
          'JWT authentication, session security & rate limiting',
          'Middleware chains and asynchronous event queues'
        ],
        courses: [
          {
            name: 'Server-side Development with NodeJS, Express and MongoDB',
            provider: 'Coursera',
            url: 'https://www.coursera.org/learn/server-side-nodejs',
            type: 'University Course (HKUST)',
            duration: '4 Weeks'
          },
          {
            name: 'Joy of Computing using Python & Web Engineering',
            provider: 'NPTEL',
            url: 'https://nptel.ac.in',
            type: 'IIT Govt. Certified Course',
            duration: '8 Weeks'
          }
        ],
        practicalProject: 'Build a secure multi-tenant placement application API with role-based JWT authentication and rate limiting.'
      },
      {
        week: 'Week 3-4: Relational Database Architecture & Indexing',
        topics: [
          'PostgreSQL B-Tree and GIN index internals',
          'SQL EXPLAIN ANALYZE query profiling and slow-query resolution',
          'Transactions, ACID compliance, and connection pooling'
        ],
        courses: [
          {
            name: 'Database Management Systems (DBMS Certification)',
            provider: 'SWAYAM',
            url: 'https://swayam.gov.in',
            type: 'MHRD Govt. of India',
            duration: '8 Weeks'
          },
          {
            name: 'Relational Database Curriculum (PostgreSQL & Bash)',
            provider: 'freeCodeCamp',
            url: 'https://www.freecodecamp.org/learn/relational-database/',
            type: 'Interactive Hands-on Practice',
            duration: 'Self-paced'
          }
        ],
        practicalProject: 'Design a recruitment database schema with 100,000 synthetic candidate records and benchmark indexed query latency.'
      },
      {
        week: 'Week 5-6: DevOps, Docker & Cloud Deployment',
        topics: [
          'Docker container lifecycle, multi-stage Dockerfiles',
          'TASK Cloud Infrastructure & AWS EC2/S3 basics',
          'Continuous Integration with GitHub Actions automated test suites'
        ],
        courses: [
          {
            name: 'TASK Cloud & DevOps Engineering Workshop',
            provider: 'TASK',
            url: 'https://task.telangana.gov.in',
            type: 'Telangana State Upskilling',
            duration: '3 Weeks'
          },
          {
            name: 'Docker and Kubernetes Tutorial for Beginners',
            provider: 'YouTube',
            url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
            type: 'Curated 4-hour Video Course',
            duration: '4 Hours'
          }
        ],
        practicalProject: 'Containerize full-stack application and automate deployment with GitHub Actions CI pipeline.'
      }
    ]
  });

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    try {
      const res = await apiService.getSkillGapRoadmap(user.skills, selectedRole, user.branch);
      if (res.success && res.data) {
        setRoadmapData(res.data);
        updateProfile({ targetRole: selectedRole });
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMilestone = (key: string) => {
    setCompletedMilestones(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Target Role Skill Gap Benchmark
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">Government & Industry Curated</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              AI Skill Gap Analysis & Learning Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Compare your academic skills against DEET & Hyderabad tech recruiter expectations. Discover missing skills and follow structured learning paths from Coursera, NPTEL, SWAYAM, freeCodeCamp, and TASK.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Readiness Index:</span>
            <span className="text-lg font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {roadmapData.readinessPercentage}%
            </span>
          </div>
        </div>

        {/* Role Selector Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Choose Target Placement Role:
            </label>
            <div className="flex gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              >
                {COMMON_ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>

              <button
                onClick={handleGenerateRoadmap}
                disabled={loading}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run Gap Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Comparison Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Matched Skills */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900">Verified Existing Skills</h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
              {roadmapData.matchedSkills.length} Verified
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {roadmapData.matchedSkills.map(sk => (
              <span key={sk} className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-sm text-xs font-medium">
                {sk}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Meets baseline criteria for junior & associate full-stack developer roles.
          </p>
        </div>

        {/* Missing Critical Skills */}
        <div className="bg-white rounded-xl border border-rose-200/80 p-5 shadow-2xs space-y-3 bg-rose-50/10">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-bold text-rose-900">Missing Critical Skills</h3>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm">
              High Priority
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-rose-900">
            {roadmapData.missingCriticalSkills.map((sk, idx) => (
              <div key={idx} className="p-2 rounded-md bg-white border border-rose-200 font-medium">
                {sk}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Frequently assessed in Round 2 Technical interviews by Telangana recruiters.
          </p>
        </div>

        {/* Missing Secondary Skills */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold text-slate-900">Secondary Value-Adds</h3>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
              Tier-1 Advantage
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            {roadmapData.missingSecondarySkills.map((sk, idx) => (
              <div key={idx} className="p-2 rounded-md bg-slate-50 border border-slate-200 font-medium">
                {sk}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Gives competitive edge for digital packages (₹7.0+ LPA) at TCS, ServiceNow and ServiceNow IDC.
          </p>
        </div>
      </div>

      {/* Structured Multi-Week Learning Roadmap */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Personalized 6-Week Placement Acceleration Roadmap
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Curated syllabus covering foundational theory, verified online courses, and practical portfolio projects.
          </p>
        </div>

        <div className="space-y-5">
          {roadmapData.learningRoadmap.map((milestone, idx) => {
            const isCompleted = completedMilestones[`milestone-${idx}`] || false;

            return (
              <div
                key={idx}
                className={`p-5 rounded-xl border transition-all ${
                  isCompleted 
                    ? 'border-emerald-300 bg-emerald-50/20' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Milestone Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleMilestone(`milestone-${idx}`)}
                      className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                        isCompleted ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 hover:border-emerald-500'
                      }`}
                    >
                      {isCompleted && <Check className="w-4 h-4" />}
                    </button>
                    <div>
                      <h3 className={`text-sm font-bold ${isCompleted ? 'text-emerald-900 line-through' : 'text-slate-900'}`}>
                        {milestone.week}
                      </h3>
                      <div className="text-[11px] text-slate-500">
                        {isCompleted ? 'Completed milestone' : 'In-progress curriculum'}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-center">
                    Milestone {idx + 1} of {roadmapData.learningRoadmap.length}
                  </span>
                </div>

                {/* Topics Covered */}
                <div className="mt-3.5 space-y-2">
                  <div className="text-xs font-semibold text-slate-700">Core Concepts to Master:</div>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-600">
                    {milestone.topics.map((t, tidx) => (
                      <li key={tidx} className="p-2 rounded-md bg-slate-50 border border-slate-200 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                        <span className="leading-snug">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Official Courses (Coursera, NPTEL, SWAYAM, freeCodeCamp, TASK) */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Recommended Verified Courses & Government Certifications:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {milestone.courses.map((course, cidx) => (
                      <a
                        key={cidx}
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-slate-50 transition-colors flex items-start justify-between gap-2 group"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-xs border border-emerald-200">
                              {course.provider}
                            </span>
                            <span className="text-[10px] text-slate-400">·</span>
                            <span className="text-[10px] text-slate-500">{course.type}</span>
                          </div>
                          <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                            {course.name}
                          </h4>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 mt-1" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Practical Portfolio Project */}
                <div className="mt-3.5 p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs flex items-start gap-2.5">
                  <Laptop className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-emerald-950 font-semibold block mb-0.5">
                      Hands-on Portfolio Project:
                    </strong>
                    <span className="text-emerald-900 leading-relaxed">
                      {milestone.practicalProject}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
