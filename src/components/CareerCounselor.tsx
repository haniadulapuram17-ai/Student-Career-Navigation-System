import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { 
  Compass, 
  Sparkles, 
  TrendingUp, 
  IndianRupee, 
  Building2, 
  Award, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { CareerRecommendation } from '../types';

export const CareerCounselor: React.FC = () => {
  const { user, setActiveTab } = useApp();

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([
    {
      role: 'Full Stack & Enterprise Cloud Engineer',
      matchScore: 94,
      reason: 'Direct match with your verified React, Node.js, and SQL proficiency. Hyderabad IT Corridor (HITEC City & Gachibowli) has the highest concentration of full-stack openings across DEET partner firms.',
      demandGrowth: '24% Annual Hiring Expansion',
      startingSalaryRange: '₹5.5 - ₹9.0 LPA',
      keyCertifications: ['TASK Cloud Associate', 'AWS Certified Solutions Architect Associate'],
      targetEmployers: ['Tech Mahindra', 'ServiceNow IDC', 'Infosys Digital', 'Cognizant']
    },
    {
      role: 'Cloud Infrastructure & Site Reliability Engineer',
      matchScore: 86,
      reason: 'Synergizes with your engineering problem-solving and Linux background. High demand driven by Telangana State Data Centre (SDC) initiatives and enterprise cloud migration.',
      demandGrowth: '28% Growth in GCC Tech Hubs',
      startingSalaryRange: '₹6.0 - ₹11.0 LPA',
      keyCertifications: ['Docker Certified Associate', 'CKA (Certified Kubernetes Administrator)'],
      targetEmployers: ['Cyient Digital', 'Tata Consultancy Services', 'Hyderabad GCC Centres']
    },
    {
      role: 'AI Applications & Generative Systems Developer',
      matchScore: 80,
      reason: 'Strong correlation with your Python skills and hackathon innovations. Ideal trajectory for early-stage generative AI startups at T-Hub Phase 2.',
      demandGrowth: '35% YoY Expansion across Indian Incubators',
      startingSalaryRange: '₹6.5 - ₹12.5 LPA',
      keyCertifications: ['Google Cloud Generative AI Leader', 'NPTEL Deep Learning'],
      targetEmployers: ['T-Hub Startups', 'Darwinbox', 'Qualcomm Hyderabad AI Lab']
    }
  ]);

  const handleRefreshCounselor = async () => {
    setLoading(true);
    try {
      const res = await apiService.getCareerGuidance(user);
      if (res.success && res.recommendations && res.recommendations.length > 0) {
        setRecommendations(res.recommendations);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Telangana IT Ecosystem Intelligence
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">AI Placement Guidance</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              AI Career Counselor & Trajectory Planner
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Discover tailored career trajectories based on your branch ({user.branch}), CGPA ({user.cgpa}), hackathon track record, and industry hiring trends across Telangana.
            </p>
          </div>

          <button
            onClick={handleRefreshCounselor}
            disabled={loading}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing Market...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Re-evaluate Career Paths</span>
              </>
            )}
          </button>
        </div>

        {/* Student Profile Snapshot in Counselor */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-600">
          <div>Branch: <strong className="text-slate-800">{user.branch}</strong></div>
          <span className="text-slate-300">·</span>
          <div>CGPA: <strong className="text-slate-800">{user.cgpa} / 10</strong></div>
          <span className="text-slate-300">·</span>
          <div>Batch: <strong className="text-slate-800">{user.graduationYear}</strong></div>
          <span className="text-slate-300">·</span>
          <div>College: <strong className="text-slate-800">{user.collegeName}</strong></div>
        </div>
      </div>

      {/* Recommended Career Tracks Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all p-6 shadow-2xs flex flex-col justify-between"
          >
            <div>
              {/* Header with Match % */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Career Track #{idx + 1}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-sm border border-emerald-200">
                  {rec.matchScore}% Match
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {rec.role}
              </h3>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {rec.reason}
              </p>

              {/* Compensation & Growth Grid */}
              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                    <span>Starting Salary:</span>
                  </span>
                  <span className="font-bold text-slate-900">{rec.startingSalaryRange}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hiring Growth:</span>
                  </span>
                  <span className="font-semibold text-emerald-700">{rec.demandGrowth}</span>
                </div>
              </div>

              {/* Target Employers in Telangana */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  <span>Key Recruiter Ecosystem:</span>
                </span>
                <div className="flex flex-wrap gap-1 text-[11px] text-slate-700">
                  {rec.targetEmployers.map((emp, eidx) => (
                    <span key={eidx} className="bg-slate-100 px-2 py-0.5 rounded-sm font-medium">
                      {emp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Recommended Certifications */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <Award className="w-3 h-3 text-emerald-600" />
                  <span>Recommended Certifications:</span>
                </span>
                <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                  {rec.keyCertifications.map((cert, cidx) => (
                    <li key={cidx}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('jobs')}
                className="w-full py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Find Related DEET Drives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
