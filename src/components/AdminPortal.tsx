import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  Bell, 
  CheckCircle2, 
  Users, 
  Send,
  X
} from 'lucide-react';
import { JobListing } from '../types';

export const AdminPortal: React.FC = () => {
  const { jobs, addJob, deleteJob, addNotification } = useApp();

  const [addJobModal, setAddJobModal] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const [newJobForm, setNewJobForm] = useState<Partial<JobListing>>({
    title: '',
    company: '',
    location: 'HITEC City, Hyderabad',
    source: 'DEET & TASK Verified',
    type: 'Full-time',
    salaryRange: '₹5.0 - ₹8.0 LPA',
    batchEligible: [2025, 2026],
    eligibleBranches: ['Computer Science & Engineering (CSE)', 'Information Technology (IT)'],
    minCgpa: 7.0,
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Git'],
    description: '',
    deadline: '2026-11-20',
    applicationLink: 'https://deet.telangana.gov.in/jobs/new-drive',
    openingsCount: 50,
    isVerified: true
  });

  const [skillsInput, setSkillsInput] = useState('React, Node.js, PostgreSQL, Git');

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobForm.title || !newJobForm.company) return;

    const jobToAdd: JobListing = {
      id: `job-admin-${Date.now()}`,
      title: newJobForm.title!,
      company: newJobForm.company!,
      logoText: newJobForm.company!.substring(0, 2).toUpperCase(),
      location: newJobForm.location || 'Hyderabad',
      source: newJobForm.source || 'DEET & TASK Verified',
      type: newJobForm.type || 'Full-time',
      salaryRange: newJobForm.salaryRange || '₹4.5 - ₹7.0 LPA',
      batchEligible: newJobForm.batchEligible || [2025, 2026],
      eligibleBranches: newJobForm.eligibleBranches || ['Computer Science & Engineering (CSE)'],
      minCgpa: newJobForm.minCgpa || 6.5,
      requiredSkills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
      description: newJobForm.description || 'Verified Campus Recruitment Drive under Government of Telangana Employment initiative.',
      deadline: newJobForm.deadline || '2026-11-30',
      applicationLink: newJobForm.applicationLink || 'https://deet.telangana.gov.in',
      openingsCount: newJobForm.openingsCount || 25,
      isVerified: true
    };

    addJob(jobToAdd);
    setAddJobModal(false);
    setNewJobForm({
      title: '',
      company: '',
      location: 'HITEC City, Hyderabad',
      source: 'DEET & TASK Verified',
      type: 'Full-time',
      salaryRange: '₹5.0 - ₹8.0 LPA',
      batchEligible: [2025, 2026],
      eligibleBranches: ['Computer Science & Engineering (CSE)'],
      minCgpa: 7.0,
      description: '',
      deadline: '2026-11-20',
      applicationLink: 'https://deet.telangana.gov.in',
      openingsCount: 50,
      isVerified: true
    });
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    addNotification({
      title: broadcastTitle,
      message: broadcastMessage,
      type: 'drive'
    });

    setBroadcastSent(true);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setTimeout(() => setBroadcastSent(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                DEET & TASK State Administration Console
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">Government of Telangana Verified Drive Controller</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Admin & Recruitment Drive Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Manage verified employer drives, publish statewide placement alerts, audit student readiness analytics, and configure DEET/TASK recruitment pipelines.
            </p>
          </div>

          <button
            onClick={() => setAddJobModal(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post Verified Drive</span>
          </button>
        </div>
      </div>

      {/* Admin Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Active DEET/TASK Drives</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{jobs.length}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Across Telangana IT Hubs</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Registered Colleges</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">142</div>
          <p className="text-[11px] text-slate-400 mt-0.5">JNTUH, OU, and Affiliated</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Average Student Readiness</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">82.4%</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Assessed via AI Engine</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Verified Hires YTD</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">3,480+</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Through DEET & TASK Drives</p>
        </div>
      </div>

      {/* Broadcast Alert Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-slate-900">Broadcast Placement Alert to Students</h2>
        </div>

        <form onSubmit={handleSendBroadcast} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4">
            <input
              type="text"
              required
              value={broadcastTitle}
              onChange={(e) => setBroadcastTitle(e.target.value)}
              placeholder="Alert Title (e.g. TCS Digital State Assessment Date)"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
            />
          </div>
          <div className="md:col-span-6">
            <input
              type="text"
              required
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Announcement details and instructions..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast</span>
            </button>
          </div>
        </form>

        {broadcastSent && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium text-center">
            Alert broadcasted successfully to all registered students!
          </div>
        )}
      </div>

      {/* Verified Jobs Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Verified Job Listings Database ({jobs.length})
          </h2>
          <span className="text-xs text-slate-500">Managed by DEET / TASK Administration</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="px-4 py-3">Company & Role</th>
                <th className="px-4 py-3">Source Tag</th>
                <th className="px-4 py-3">Package / CTC</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    <div>{job.title}</div>
                    <div className="text-slate-500 font-normal text-[11px]">{job.company}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-sm font-semibold text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {job.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {job.salaryRange}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {job.location}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {job.deadline}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete Drive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post Job Modal */}
      {addJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Publish Verified Campus Drive</h3>
              <button onClick={() => setAddJobModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newJobForm.company}
                    onChange={(e) => setNewJobForm({ ...newJobForm, company: e.target.value })}
                    placeholder="e.g. Wipro, Infosys"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={newJobForm.title}
                    onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                    placeholder="e.g. Junior Cloud Engineer"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Verification Source</label>
                  <select
                    value={newJobForm.source}
                    onChange={(e) => setNewJobForm({ ...newJobForm, source: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="DEET & TASK Verified">DEET & TASK Verified</option>
                    <option value="DEET">DEET Telangana</option>
                    <option value="TASK">TASK Exclusive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Salary Range / CTC</label>
                  <input
                    type="text"
                    value={newJobForm.salaryRange}
                    onChange={(e) => setNewJobForm({ ...newJobForm, salaryRange: e.target.value })}
                    placeholder="₹5.0 - ₹8.0 LPA"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newJobForm.location}
                    onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Min CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newJobForm.minCgpa}
                    onChange={(e) => setNewJobForm({ ...newJobForm, minCgpa: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={2}
                  value={newJobForm.description}
                  onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                  placeholder="Overview of hiring criteria..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={newJobForm.deadline}
                    onChange={(e) => setNewJobForm({ ...newJobForm, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Openings Count</label>
                  <input
                    type="number"
                    value={newJobForm.openingsCount}
                    onChange={(e) => setNewJobForm({ ...newJobForm, openingsCount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddJobModal(false)}
                  className="px-3.5 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs"
                >
                  Publish to Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
