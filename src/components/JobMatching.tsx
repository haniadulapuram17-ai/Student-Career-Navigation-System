import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  X
} from 'lucide-react';
import { JobListing } from '../types';

export const JobMatching: React.FC = () => {
  const { user, jobs, applications, applyToJob, setActiveTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'All' | 'DEET' | 'TASK'>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [selectedJobModal, setSelectedJobModal] = useState<JobListing | null>(null);

  // Compute matched percentage for each job
  const enrichedJobs = jobs.map(job => {
    const matchedSkills = job.requiredSkills.filter(sk =>
      user.skills.some(userSk => userSk.toLowerCase() === sk.toLowerCase())
    );
    const missingSkills = job.requiredSkills.filter(sk =>
      !user.skills.some(userSk => userSk.toLowerCase() === sk.toLowerCase())
    );
    const matchPercentage = Math.min(
      98,
      Math.max(50, Math.round((matchedSkills.length / job.requiredSkills.length) * 100))
    );
    const isEligibleCgpa = user.cgpa >= job.minCgpa;
    const isEligibleBranch = job.eligibleBranches.some(b => b === user.branch || b.includes(user.branch.split(' ')[0]));
    const isEligibleBatch = job.batchEligible.includes(user.graduationYear);

    return {
      ...job,
      matchedSkills,
      missingSkills,
      matchPercentage,
      isEligible: isEligibleCgpa && isEligibleBranch && isEligibleBatch
    };
  });

  // Filter jobs
  const filteredJobs = enrichedJobs.filter(job => {
    if (sourceFilter !== 'All') {
      if (sourceFilter === 'DEET' && !job.source.includes('DEET')) return false;
      if (sourceFilter === 'TASK' && !job.source.includes('TASK')) return false;
    }
    if (locationFilter !== 'All' && !job.location.includes(locationFilter)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${job.title} ${job.company} ${job.description} ${job.requiredSkills.join(' ')}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });

  // Sort by match percentage descending
  filteredJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                DEET & TASK Official Employment Network
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">Government of Telangana Verified</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Verified Job Matching & Campus Drives
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Real-time job opportunities from Telangana Digital Employment Exchange and TASK partner employers. Matching percentages are calculated directly against your verified profile skills.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Showing <strong>{filteredJobs.length}</strong> of {jobs.length} drives
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, company, or required skill (e.g. React, Python)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          {/* Source Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg shrink-0">
            {(['All', 'DEET', 'TASK'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSourceFilter(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  sourceFilter === tab
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'All' ? 'All Drives' : `${tab} Verified`}
              </button>
            ))}
          </div>

          {/* Location Dropdown */}
          <div className="shrink-0">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full md:w-auto px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="All">All Telangana Locations</option>
              <option value="HITEC City">HITEC City, Hyderabad</option>
              <option value="Gachibowli">Gachibowli, Hyderabad</option>
              <option value="Knowledge City">Knowledge City, Hyderabad</option>
              <option value="Madhapur">Madhapur, Hyderabad</option>
              <option value="Warangal">Warangal IT Hub</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map(job => {
          const isApplied = applications.some(a => a.jobId === job.id);
          const applicationRecord = applications.find(a => a.jobId === job.id);

          return (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between p-5"
            >
              <div>
                {/* Header with Source Badge & Match % */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 ${
                      job.company.includes('Tata') ? 'bg-purple-100 text-purple-700' :
                      job.company.includes('Tech Mahindra') ? 'bg-orange-100 text-orange-700' :
                      job.company.includes('ServiceNow') ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-800">{job.company}</span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-xs uppercase">
                          {job.source.includes('TASK') ? 'TASK' : 'DEET'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal">{job.location}</div>
                    </div>
                  </div>

                  {/* Match Percentage Display */}
                  <div className="text-right">
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-sm ${
                      job.matchPercentage >= 80 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {job.matchPercentage}% Match
                    </span>
                  </div>
                </div>

                {/* Job Title */}
                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                  {job.title}
                </h3>

                {/* Compensation & Location */}
                <div className="mt-2 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-1">
                    <span>{job.salaryRange}</span>
                    <span className="text-slate-400 font-normal">·</span>
                    <span className="text-slate-500 font-normal">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                {/* Description snippet */}
                <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Required Skills unboxed list with matched vs missing distinction */}
                <div className="mt-3.5 pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center justify-between">
                    <span>Skills Comparison</span>
                    <span className="text-[10px] text-emerald-700">{job.matchedSkills.length}/{job.requiredSkills.length} Matched</span>
                  </div>
                  
                  {/* Clean unboxed skill typography */}
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    {job.requiredSkills.map(sk => {
                      const isMatch = job.matchedSkills.includes(sk);
                      return (
                        <span
                          key={sk}
                          className={`px-1.5 py-0.5 rounded-xs font-medium ${
                            isMatch
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {sk}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Eligibility Checklist */}
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500">
                  <span>Min CGPA: <strong>{job.minCgpa}</strong></span>
                  <span>·</span>
                  <span>Batches: <strong>{job.batchEligible.join(', ')}</strong></span>
                </div>
              </div>

              {/* Card Footer: Deadline & Action */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Due: {job.deadline}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedJobModal(job)}
                    className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Details
                  </button>

                  {isApplied ? (
                    <button
                      onClick={() => setActiveTab('recruitment')}
                      className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{applicationRecord?.stage.replace('_', ' ').toUpperCase()}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => applyToJob(job.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <Briefcase className="w-12 h-12 mx-auto text-slate-300 mb-2" />
          <p className="text-sm font-semibold text-slate-700">No matching drives found</p>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or reset the source filter to "All Drives".
          </p>
        </div>
      )}

      {/* Job Details Modal */}
      {selectedJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  {selectedJobModal.source} Verified Listing
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedJobModal.title}
                </h2>
                <div className="text-xs text-slate-500">{selectedJobModal.company} · {selectedJobModal.location}</div>
              </div>
              <button
                onClick={() => setSelectedJobModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
              
              {/* Compensation & Openings Row */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">CTC / Package</span>
                  <span className="text-sm font-bold text-slate-900">{selectedJobModal.salaryRange}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Total Openings</span>
                  <span className="text-sm font-bold text-slate-900">{selectedJobModal.openingsCount} Positions</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Job Role & Scope</h4>
                <p className="leading-relaxed text-slate-600">{selectedJobModal.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Eligibility Criteria</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Minimum CGPA: <strong>{selectedJobModal.minCgpa}</strong> across undergraduate program</li>
                  <li>Graduation Batches: <strong>{selectedJobModal.batchEligible.join(', ')}</strong></li>
                  <li>Eligible Branches: {selectedJobModal.eligibleBranches.join(', ')}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Skills Assessment</h4>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-wrap gap-1.5">
                  {selectedJobModal.requiredSkills.map(sk => (
                    <span key={sk} className="px-2 py-0.5 bg-white border border-slate-200 rounded-sm font-medium text-slate-800">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-900">Application Deadline: {selectedJobModal.deadline}</div>
                  <div className="text-[11px] text-emerald-700">Campus Drive Date: {selectedJobModal.driveDate || 'To be announced'}</div>
                </div>
                <a
                  href={selectedJobModal.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-md font-semibold hover:bg-emerald-100 flex items-center gap-1"
                >
                  <span>Official DEET Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-200 flex items-center justify-end gap-3 bg-slate-50">
              <button
                onClick={() => setSelectedJobModal(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  applyToJob(selectedJobModal.id);
                  setSelectedJobModal(null);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs"
              >
                Apply via Career Navigator
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
