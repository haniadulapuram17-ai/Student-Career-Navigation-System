/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { AuthScreen } from './components/AuthScreen';
import { AuthModal } from './components/AuthModal';
import { DashboardOverview } from './components/DashboardOverview';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';
import { JobMatching } from './components/JobMatching';
import { RecruitmentTracker } from './components/RecruitmentTracker';
import { SkillGapRoadmap } from './components/SkillGapRoadmap';
import { InterviewPrep } from './components/InterviewPrep';
import { CareerCounselor } from './components/CareerCounselor';
import { ResumeBuilder } from './components/ResumeBuilder';
import { PortfolioBuilder } from './components/PortfolioBuilder';
import { MentorPortal } from './components/MentorPortal';
import { AdminPortal } from './components/AdminPortal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { 
  Bell, 
  ExternalLink, 
  ShieldCheck, 
  LogOut, 
  Sparkles,
  User,
  ChevronDown
} from 'lucide-react';
import { Role } from './types';

const AppContent: React.FC = () => {
  const { 
    isLoggedIn, 
    activeTab, 
    setActiveTab, 
    currentRole, 
    setCurrentRole, 
    user, 
    logout, 
    setAuthModalOpen,
    notifications 
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Enforce fresh registration or login: do NOT show anything statically
  if (!isLoggedIn) {
    return <AuthScreen />;
  }

  const handleRoleSelect = (role: Role) => {
    setCurrentRole(role);
    setRoleDropdownOpen(false);
    if (role === 'mentor') setActiveTab('mentor');
    else if (role === 'admin') setActiveTab('admin');
    else if (activeTab === 'mentor' || activeTab === 'admin') setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Fixed Left Sidebar matching the uploaded pathwise design */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        
        {/* Top Minimal Utility Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              DEET & TASK Official Telangana Integration
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button
              onClick={() => setNotificationsOpen(true)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              >
                <span className="text-slate-400">Role:</span>
                <span className="font-bold capitalize text-emerald-700">{currentRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Perspective
                  </div>
                  <button
                    onClick={() => handleRoleSelect('student')}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 cursor-pointer ${currentRole === 'student' ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'}`}
                  >
                    Student ({user.fullName ? user.fullName.split(' ')[0] : 'Ananya'})
                  </button>
                  <button
                    onClick={() => handleRoleSelect('mentor')}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 cursor-pointer ${currentRole === 'mentor' ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'}`}
                  >
                    TPO / Faculty Mentor
                  </button>
                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 cursor-pointer ${currentRole === 'admin' ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'}`}
                  >
                    DEET / TASK Admin
                  </button>
                </div>
              )}
            </div>

            {/* Profile / Edit Academic Data */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Edit academic details"
            >
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                {user.fullName ? user.fullName.charAt(0) : 'A'}
              </div>
              <span className="text-xs font-medium text-slate-800 max-w-[100px] truncate">
                {user.fullName || 'Student'}
              </span>
            </button>

            {/* Logout / New Registration */}
            <button
              onClick={logout}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              title="Sign out to test fresh registration"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* View Component Body */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-6 sm:p-8">
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'jobs' && <JobMatching />}
          {activeTab === 'recruitment' && <RecruitmentTracker />}
          {activeTab === 'resume' && <ResumeAnalyzer />}
          {activeTab === 'interview' && <InterviewPrep />}
          {activeTab === 'skillgap' && <SkillGapRoadmap />}
          {activeTab === 'counselor' && <CareerCounselor />}
          {activeTab === 'resumebuilder' && <ResumeBuilder />}
          {activeTab === 'portfolio' && <PortfolioBuilder />}
          {activeTab === 'mentor' && <MentorPortal />}
          {activeTab === 'admin' && <AdminPortal />}
        </main>

        {/* Minimal Bottom Footer */}
        <footer className="mt-auto px-8 py-5 border-t border-slate-200/60 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">pathwise.</span>
            <span>· Digital Employment Exchange of Telangana (DEET) & TASK Placement Platform</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="https://deet.telangana.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700">
              DEET Official Portal ↗
            </a>
            <a href="https://task.telangana.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700">
              TASK Official Portal ↗
            </a>
          </div>
        </footer>

      </div>

      {/* Profile Editor Modal */}
      <AuthModal />

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
