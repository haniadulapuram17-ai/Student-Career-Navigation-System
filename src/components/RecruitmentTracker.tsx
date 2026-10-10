import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Plus, 
  Bell, 
  ShieldCheck, 
  Edit3, 
  ArrowRight,
  LayoutGrid,
  List
} from 'lucide-react';
import { ApplicationStage, Application } from '../types';

const STAGES: { key: ApplicationStage; label: string; desc: string }[] = [
  { key: 'submitted', label: 'Application Submitted', desc: 'Registered in recruiter database' },
  { key: 'shortlisted', label: 'Resume Shortlisted', desc: 'Screened by Talent Acquisition' },
  { key: 'round1_qualified', label: 'Round 1 Qualified', desc: 'Aptitude & DSA online test cleared' },
  { key: 'technical_interview', label: 'Technical Interview', desc: 'Core coding & system design round' },
  { key: 'hr_interview', label: 'HR Interview', desc: 'Behavioral & cultural fitment' },
  { key: 'selected', label: 'Selected / Offer Received', desc: 'Placement confirmed with package' }
];

export const RecruitmentTracker: React.FC = () => {
  const { 
    applications, 
    updateApplicationStage, 
    addApplication, 
    setActiveTab,
    addNotification 
  } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedAppModal, setSelectedAppModal] = useState<Application | null>(null);
  const [newAppModalOpen, setNewAppModalOpen] = useState(false);
  const [statusNotes, setStatusNotes] = useState('');
  const [newStage, setNewStage] = useState<ApplicationStage>('submitted');

  const [newAppData, setNewAppData] = useState({
    company: '',
    jobTitle: '',
    interviewDate: '',
    interviewTime: '10:00 AM IST',
    interviewVenue: 'Virtual / Hyderabad Office',
    interviewMeetingLink: ''
  });

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppData.company || !newAppData.jobTitle) return;

    addApplication({
      company: newAppData.company,
      jobTitle: newAppData.jobTitle,
      stage: 'submitted',
      interviewDate: newAppData.interviewDate || undefined,
      interviewTime: newAppData.interviewTime || undefined,
      interviewVenue: newAppData.interviewVenue || undefined,
      interviewMeetingLink: newAppData.interviewMeetingLink || undefined
    });

    addNotification({
      title: `Application Added: ${newAppData.company}`,
      message: `Tracked in Recruitment pipeline for ${newAppData.jobTitle}`,
      type: 'application'
    });

    setNewAppModalOpen(false);
    setNewAppData({
      company: '',
      jobTitle: '',
      interviewDate: '',
      interviewTime: '10:00 AM IST',
      interviewVenue: 'Virtual / Hyderabad Office',
      interviewMeetingLink: ''
    });
  };

  const handleUpdateAppStatus = (appId: string) => {
    updateApplicationStage(appId, newStage, statusNotes);
    setSelectedAppModal(null);
    setStatusNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                DEET Campus Recruitment Pipeline
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">6-Stage Official Tracker</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Smart Recruitment Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Monitor your job applications, confirmed interview slots, venue/virtual links, and verified recruiter stage updates across Telangana placement drives.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View Switcher */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-md text-xs font-medium ${
                  viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Kanban Board View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md text-xs font-medium ${
                  viewMode === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setNewAppModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Application</span>
            </button>
          </div>
        </div>

        {/* Live Notification Notification Preferences Indicator */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-emerald-600" />
            <span>Recruiter alerts enabled:</span>
            <span className="font-semibold text-slate-800">Email & In-App Alerts Active</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">SMS updates configured on verified drives</span>
          </div>

          <div className="text-[11px] text-slate-500">
            Total Tracked: <strong>{applications.length}</strong> Applications
          </div>
        </div>
      </div>

      {/* Main Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
          {STAGES.map((col) => {
            const stageApps = applications.filter(a => a.stage === col.key);

            return (
              <div 
                key={col.key}
                className="bg-slate-50/80 rounded-xl border border-slate-200 p-3 min-h-[480px] flex flex-col justify-between"
              >
                <div>
                  {/* Column Header */}
                  <div className="pb-2.5 mb-2.5 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">
                        {col.label}
                      </h3>
                      <p className="text-[10px] text-slate-500">{col.desc}</p>
                    </div>
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                      {stageApps.length}
                    </span>
                  </div>

                  {/* Stage Cards */}
                  <div className="space-y-2.5">
                    {stageApps.map((app) => (
                      <div
                        key={app.id}
                        className="bg-white rounded-lg border border-slate-200 p-3 shadow-2xs hover:border-slate-300 transition-all text-xs space-y-2 cursor-pointer"
                        onClick={() => {
                          setSelectedAppModal(app);
                          setNewStage(app.stage);
                          setStatusNotes(app.interviewerNotes || '');
                        }}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-bold text-slate-900 leading-tight">
                            {app.company}
                          </span>
                          {app.isEmployerVerified && (
                            <span title="Verified Recruiter Update">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            </span>
                          )}
                        </div>

                        <div className="text-slate-600 font-medium line-clamp-1">
                          {app.jobTitle}
                        </div>

                        {/* Interview Date & Schedule if present */}
                        {app.interviewDate && (
                          <div className="p-2 bg-emerald-50/80 rounded-md border border-emerald-100 text-[11px] text-emerald-900 space-y-0.5">
                            <div className="font-bold flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-emerald-700" />
                              <span>{app.interviewDate}</span>
                            </div>
                            <div className="text-emerald-700">
                              {app.interviewTime || '10:00 AM IST'}
                            </div>
                          </div>
                        )}

                        {/* Interviewer Notes */}
                        {app.interviewerNotes && (
                          <p className="text-[11px] text-slate-500 line-clamp-2 bg-slate-50 p-1.5 rounded-sm border border-slate-100">
                            "{app.interviewerNotes}"
                          </p>
                        )}

                        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span>Updated: {app.lastUpdatedDate}</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                            <span>Manage</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    ))}

                    {stageApps.length === 0 && (
                      <div className="py-8 text-center text-slate-400 text-[11px] border border-dashed border-slate-200 rounded-lg">
                        No candidates in this stage
                      </div>
                    )}
                  </div>
                </div>

                {col.key === 'technical_interview' && (
                  <div className="mt-3 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => setActiveTab('interview')}
                      className="w-full py-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                    >
                      Practice Mock Round
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="px-4 py-3">Company & Position</th>
                  <th className="px-4 py-3">Current Stage</th>
                  <th className="px-4 py-3">Interview Schedule</th>
                  <th className="px-4 py-3">Venue / Meeting</th>
                  <th className="px-4 py-3">Last Verified Update</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      <div>{app.company}</div>
                      <div className="text-slate-500 font-normal text-[11px]">{app.jobTitle}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-sm font-semibold text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {app.stage.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {app.interviewDate ? (
                        <div className="flex items-center gap-1.5 font-medium text-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{app.interviewDate} ({app.interviewTime || '10:00 AM'})</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {app.interviewMeetingLink ? (
                        <a
                          href={app.interviewMeetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <span>{app.interviewVenue || 'Virtual Meet'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span>{app.interviewVenue || 'Pending recruiter update'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {app.lastUpdatedDate}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedAppModal(app);
                          setNewStage(app.stage);
                          setStatusNotes(app.interviewerNotes || '');
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md"
                      >
                        Edit Stage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Application Stage Modal */}
      {selectedAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Update Status: {selectedAppModal.company}
              </h3>
              <p className="text-xs text-slate-500">{selectedAppModal.jobTitle}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recruitment Stage
              </label>
              <select
                value={newStage}
                onChange={(e) => setNewStage(e.target.value as ApplicationStage)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              >
                {STAGES.map(s => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
                <option value="rejected">Rejected / Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recruiter Feedback & Next Steps
              </label>
              <textarea
                rows={3}
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                placeholder="e.g. Cleared online assessment with 94%. Round 2 technical interview scheduled on 14th Oct."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedAppModal(null)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateAppStatus(selectedAppModal.id)}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs"
              >
                Save Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Custom Application Modal */}
      {newAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 mb-1">Add Job Application</h3>
            <p className="text-xs text-slate-500 mb-4">Track any on-campus or off-campus recruitment drive</p>

            <form onSubmit={handleCreateApplication} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={newAppData.company}
                  onChange={(e) => setNewAppData({ ...newAppData, company: e.target.value })}
                  placeholder="e.g. Infosys, TCS, Oracle IDC"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={newAppData.jobTitle}
                  onChange={(e) => setNewAppData({ ...newAppData, jobTitle: e.target.value })}
                  placeholder="e.g. Systems Engineer, Junior Full Stack"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Interview Date</label>
                  <input
                    type="date"
                    value={newAppData.interviewDate}
                    onChange={(e) => setNewAppData({ ...newAppData, interviewDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={newAppData.interviewTime}
                    onChange={(e) => setNewAppData({ ...newAppData, interviewTime: e.target.value })}
                    placeholder="10:30 AM IST"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Venue / Google Meet Link</label>
                <input
                  type="text"
                  value={newAppData.interviewMeetingLink}
                  onChange={(e) => setNewAppData({ ...newAppData, interviewMeetingLink: e.target.value })}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewAppModalOpen(false)}
                  className="px-3.5 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs"
                >
                  Add to Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
