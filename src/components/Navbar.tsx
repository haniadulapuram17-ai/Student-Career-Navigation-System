import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  User, 
  Bell, 
  Award, 
  Compass, 
  FileText, 
  CheckCircle2, 
  MessageSquare, 
  Shield, 
  Layers, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Role } from '../types';

interface NavbarProps {
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications }) => {
  const { 
    user, 
    currentRole, 
    setCurrentRole, 
    setAuthModalOpen, 
    activeTab, 
    setActiveTab, 
    notifications,
    calculateReadinessScore 
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const readiness = calculateReadinessScore();

  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
    setRoleDropdownOpen(false);
    if (role === 'mentor') setActiveTab('mentor');
    else if (role === 'admin') setActiveTab('admin');
    else if (activeTab === 'mentor' || activeTab === 'admin') setActiveTab('dashboard');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers, roles: ['student'] },
    { id: 'jobs', label: 'DEET & TASK Jobs', icon: Briefcase, roles: ['student', 'admin'] },
    { id: 'recruitment', label: 'Recruitment Tracker', icon: CheckCircle2, roles: ['student', 'mentor'] },
    { id: 'resume', label: 'AI Resume Analyzer', icon: FileText, roles: ['student'] },
    { id: 'interview', label: 'AI Mock Interview', icon: Award, roles: ['student', 'mentor'] },
    { id: 'skillgap', label: 'Skill Gap & Roadmap', icon: Compass, roles: ['student'] },
    { id: 'counselor', label: 'Career Counselor', icon: Compass, roles: ['student'] },
    { id: 'mentor', label: 'Mentor Hub', icon: MessageSquare, roles: ['student', 'mentor'] },
    { id: 'admin', label: 'Admin Portal', icon: Shield, roles: ['admin'] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Govt of Telangana / DEET / TASK Official Header Banner */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Govt. of Telangana Integrated Employment Portal
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300">Digital Employment Exchange of Telangana (DEET)</span>
          <span className="hidden md:inline text-slate-500">·</span>
          <span className="hidden md:inline text-slate-300">Telangana Academy for Skill and Knowledge (TASK)</span>
        </div>
        
        <div className="flex items-center gap-4 text-slate-400">
          <a 
            href="https://deet.telangana.gov.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-[11px]"
          >
            <span>DEET Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a 
            href="https://task.telangana.gov.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-[11px]"
          >
            <span>TASK Official</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-emerald-700 transition-colors">
                TS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-lg tracking-tight">AI Career Navigator</span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    Telangana
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">Smart Placement & Career Guidance System</p>
              </div>
            </button>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Student Placement Readiness Gauge */}
            {currentRole === 'student' && (
              <div 
                onClick={() => setActiveTab('dashboard')}
                className="cursor-pointer hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                title="Your calculated placement readiness score based on resume, skills, and mock interviews"
              >
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Readiness Score</span>
                  <span className="text-xs font-bold text-slate-800">
                    {readiness >= 80 ? 'Placement Ready' : 'Needs Preparation'}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  readiness >= 80 ? 'bg-emerald-600 text-white' : readiness >= 60 ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {readiness}
                </div>
              </div>
            )}

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus:outline-hidden"
              >
                <span className="text-slate-400">Role:</span>
                <span className="font-semibold capitalize text-emerald-700">{currentRole}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Switch Perspective
                  </div>
                  <button
                    onClick={() => handleRoleChange('student')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${currentRole === 'student' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'}`}
                  >
                    <span>Student (Srikanth)</span>
                    {currentRole === 'student' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                  </button>
                  <button
                    onClick={() => handleRoleChange('mentor')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${currentRole === 'mentor' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'}`}
                  >
                    <span>TPO / Mentor (Dr. Ramarao)</span>
                    {currentRole === 'mentor' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                  </button>
                  <button
                    onClick={() => handleRoleChange('admin')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${currentRole === 'admin' ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'}`}
                  >
                    <span>DEET / TASK Coordinator</span>
                    {currentRole === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Profile Avatar & Details Button */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors focus:outline-hidden"
            >
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold">
                {user.fullName ? user.fullName.charAt(0) : <User className="w-4 h-4" />}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[130px]">
                  {user.fullName || 'Student Profile'}
                </div>
                <div className="text-[10px] text-slate-500 leading-none">
                  {user.degree} · CGPA {user.cgpa}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Sub-Nav Links */}
      <nav className="border-t border-slate-100 bg-slate-50/70 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 py-1.5">
          {visibleNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors focus:outline-hidden ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {currentRole === 'student' && (
            <>
              <button
                onClick={() => setActiveTab('resumebuilder')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors focus:outline-hidden ${
                  activeTab === 'resumebuilder'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className={`w-3.5 h-3.5 ${activeTab === 'resumebuilder' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>Resume & Cover Letter</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors focus:outline-hidden ${
                  activeTab === 'portfolio'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Award className={`w-3.5 h-3.5 ${activeTab === 'portfolio' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>Portfolio</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
