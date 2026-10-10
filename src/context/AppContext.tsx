import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UserProfile, 
  Role, 
  JobListing, 
  Application, 
  ApplicationStage, 
  NotificationItem, 
  MentorFeedback, 
  DirectMessage, 
  InterviewRecord 
} from '../types';
import { 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_JOBS, 
  INITIAL_APPLICATIONS, 
  INITIAL_MENTOR_FEEDBACK, 
  INITIAL_DIRECT_MESSAGES, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

interface AppContextType {
  user: UserProfile;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  login: (profile?: Partial<UserProfile>, role?: Role) => void;
  logout: () => void;
  register: (profile: UserProfile) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  jobs: JobListing[];
  addJob: (job: JobListing) => void;
  deleteJob: (jobId: string) => void;
  updateJob: (job: JobListing) => void;
  applications: Application[];
  applyToJob: (jobId: string) => boolean;
  updateApplicationStage: (appId: string, stage: ApplicationStage, notes?: string) => void;
  addApplication: (app: Partial<Application>) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  mentorFeedbacks: MentorFeedback[];
  addMentorFeedback: (fb: Omit<MentorFeedback, 'id' | 'date'>) => void;
  directMessages: DirectMessage[];
  sendDirectMessage: (receiverId: string, content: string) => void;
  interviewRecords: InterviewRecord[];
  addInterviewRecord: (rec: Omit<InterviewRecord, 'id' | 'date'>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  calculateReadinessScore: () => number;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'ai_career_navigator_state_v3';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = sessionStorage.getItem(`${STORAGE_KEY}_user`);
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  const [currentRole, setCurrentRole] = useState<Role>(() => {
    try {
      const saved = sessionStorage.getItem(`${STORAGE_KEY}_role`);
      return (saved as Role) || 'student';
    } catch {
      return 'student';
    }
  });

  // Must ask for fresh registration or login on each fresh entry
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(`${STORAGE_KEY}_is_logged_in`) === 'true';
    } catch {
      return false;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [jobs, setJobs] = useState<JobListing[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_jobs`);
      return saved ? JSON.parse(saved) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_apps`);
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_notifs`);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [mentorFeedbacks, setMentorFeedbacks] = useState<MentorFeedback[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_feedbacks`);
      return saved ? JSON.parse(saved) : INITIAL_MENTOR_FEEDBACK;
    } catch {
      return INITIAL_MENTOR_FEEDBACK;
    }
  });

  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_messages`);
      return saved ? JSON.parse(saved) : INITIAL_DIRECT_MESSAGES;
    } catch {
      return INITIAL_DIRECT_MESSAGES;
    }
  });

  const [interviewRecords, setInterviewRecords] = useState<InterviewRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_interviews`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(user));
      localStorage.setItem(`${STORAGE_KEY}_role`, currentRole);
      localStorage.setItem(`${STORAGE_KEY}_jobs`, JSON.stringify(jobs));
      localStorage.setItem(`${STORAGE_KEY}_apps`, JSON.stringify(applications));
      localStorage.setItem(`${STORAGE_KEY}_notifs`, JSON.stringify(notifications));
      localStorage.setItem(`${STORAGE_KEY}_feedbacks`, JSON.stringify(mentorFeedbacks));
      localStorage.setItem(`${STORAGE_KEY}_messages`, JSON.stringify(directMessages));
      localStorage.setItem(`${STORAGE_KEY}_interviews`, JSON.stringify(interviewRecords));
    } catch (e) {
      console.error('Failed to sync to local storage', e);
    }
  }, [user, currentRole, jobs, applications, notifications, mentorFeedbacks, directMessages, interviewRecords]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      // Recalculate readiness score
      const atsWeight = (updated.resumeAtsScore || 70) * 0.25;
      const skillsCount = Math.min(10, updated.skills.length);
      const skillsWeight = (skillsCount / 10) * 100 * 0.35;
      const cgpaWeight = (Math.min(10, updated.cgpa) / 10) * 100 * 0.15;
      const projectsWeight = Math.min(100, (updated.portfolioProjects?.length || 1) * 45) * 0.25;
      updated.readinessScore = Math.round(atsWeight + skillsWeight + cgpaWeight + projectsWeight);
      return updated;
    });
  };

  const calculateReadinessScore = (): number => {
    const atsScore = user.resumeAtsScore || 75;
    const skillsScore = Math.min(100, user.skills.length * 11);
    const avgInterview = interviewRecords.length > 0 
      ? Math.round(interviewRecords.reduce((acc, curr) => acc + curr.evaluation.score, 0) / interviewRecords.length)
      : 80;
    const academicScore = Math.min(100, Math.round((user.cgpa / 10) * 100));

    return Math.round((atsScore * 0.25) + (skillsScore * 0.30) + (avgInterview * 0.30) + (academicScore * 0.15));
  };

  const applyToJob = (jobId: string): boolean => {
    const existing = applications.find(a => a.jobId === jobId);
    if (existing) return false;

    const job = jobs.find(j => j.id === jobId);
    if (!job) return false;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      stage: 'submitted',
      appliedDate: new Date().toISOString().split('T')[0],
      lastUpdatedDate: new Date().toISOString().split('T')[0],
      isEmployerVerified: true,
      notificationPreferences: {
        email: true,
        inApp: true,
        sms: true
      }
    };

    setApplications(prev => [newApp, ...prev]);

    // Send in-app notification
    addNotification({
      title: `Application Submitted: ${job.company}`,
      message: `Your application for ${job.title} (${job.source}) has been registered in the recruitment tracker.`,
      type: 'application',
      actionUrl: 'recruitment'
    });

    return true;
  };

  const updateApplicationStage = (appId: string, stage: ApplicationStage, notes?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          stage,
          lastUpdatedDate: new Date().toISOString().split('T')[0],
          interviewerNotes: notes || app.interviewerNotes
        };
      }
      return app;
    }));

    const targetApp = applications.find(a => a.id === appId);
    if (targetApp) {
      addNotification({
        title: `Status Updated: ${targetApp.company}`,
        message: `Application advanced to stage: ${stage.replace('_', ' ').toUpperCase()}`,
        type: 'application',
        actionUrl: 'recruitment'
      });
    }
  };

  const addApplication = (appData: Partial<Application>) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: appData.jobId || `custom-job-${Date.now()}`,
      jobTitle: appData.jobTitle || 'Software Engineer',
      company: appData.company || 'Tech Partner',
      stage: appData.stage || 'submitted',
      appliedDate: appData.appliedDate || new Date().toISOString().split('T')[0],
      lastUpdatedDate: new Date().toISOString().split('T')[0],
      interviewDate: appData.interviewDate,
      interviewTime: appData.interviewTime,
      interviewVenue: appData.interviewVenue,
      interviewMeetingLink: appData.interviewMeetingLink,
      isEmployerVerified: true,
      notificationPreferences: { email: true, inApp: true, sms: true }
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const addJob = (newJob: JobListing) => {
    setJobs(prev => [newJob, ...prev]);
    addNotification({
      title: `New Drive Added: ${newJob.company}`,
      message: `${newJob.title} (${newJob.source}) with ${newJob.salaryRange} is now open for applications.`,
      type: 'drive',
      actionUrl: 'jobs'
    });
  };

  const deleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
  };

  const updateJob = (updated: JobListing) => {
    setJobs(prev => prev.map(j => j.id === updated.id ? updated : j));
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addMentorFeedback = (fb: Omit<MentorFeedback, 'id' | 'date'>) => {
    const newFeedback: MentorFeedback = {
      ...fb,
      id: `fb-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setMentorFeedbacks(prev => [newFeedback, ...prev]);
    addNotification({
      title: `Mentor Feedback Received`,
      message: `${fb.mentorName} posted an evaluation for ${fb.category} (${fb.score}/100).`,
      type: 'feedback',
      actionUrl: 'mentor'
    });
  };

  const sendDirectMessage = (receiverId: string, content: string) => {
    const senderName = currentRole === 'student' ? user.fullName : (currentRole === 'mentor' ? 'Dr. K. V. S. Ramarao (Mentor)' : 'Platform Administrator');
    const senderId = currentRole === 'student' ? user.id : (currentRole === 'mentor' ? 'mentor-01' : 'admin-01');

    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      senderId,
      senderName,
      senderRole: currentRole,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    setDirectMessages(prev => [...prev, newMsg]);

    // Simulated mentor reply if student sent a message
    if (currentRole === 'student') {
      setTimeout(() => {
        const replyMsg: DirectMessage = {
          id: `msg-${Date.now() + 1}`,
          senderId: 'mentor-01',
          senderName: 'Dr. K. V. S. Ramarao (TPO Mentor)',
          senderRole: 'mentor',
          receiverId: user.id,
          content: 'Thank you for your update! Make sure you practice your STAR response structure for the technical interview. I will review your latest mock interview score shortly.',
          timestamp: new Date().toISOString(),
          isRead: false
        };
        setDirectMessages(prev => [...prev, replyMsg]);
        addNotification({
          title: 'New Message from Mentor',
          message: 'Dr. K. V. S. Ramarao replied to your message.',
          type: 'system',
          actionUrl: 'mentor'
        });
      }, 2000);
    }
  };

  const addInterviewRecord = (rec: Omit<InterviewRecord, 'id' | 'date'>) => {
    const newRecord: InterviewRecord = {
      ...rec,
      id: `int-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setInterviewRecords(prev => [newRecord, ...prev]);
  };

  const login = (profile?: Partial<UserProfile>, role?: Role) => {
    if (profile) {
      setUser(prev => ({ ...prev, ...profile }));
    }
    if (role) {
      setCurrentRole(role);
    }
    setIsLoggedIn(true);
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_is_logged_in`, 'true');
      if (profile) sessionStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify({ ...user, ...profile }));
      if (role) sessionStorage.setItem(`${STORAGE_KEY}_role`, role);
    } catch {}
  };

  const logout = () => {
    setIsLoggedIn(false);
    try {
      sessionStorage.removeItem(`${STORAGE_KEY}_is_logged_in`);
      sessionStorage.removeItem(`${STORAGE_KEY}_user`);
    } catch {}
  };

  const register = (profileData: UserProfile) => {
    setUser(profileData);
    setIsLoggedIn(true);
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_is_logged_in`, 'true');
      sessionStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(profileData));
    } catch {}
  };

  const resetToDefaults = () => {
    setUser(INITIAL_STUDENT_PROFILE);
    setJobs(INITIAL_JOBS);
    setApplications(INITIAL_APPLICATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setMentorFeedbacks(INITIAL_MENTOR_FEEDBACK);
    setDirectMessages(INITIAL_DIRECT_MESSAGES);
    setInterviewRecords([]);
    setIsLoggedIn(false);
    try {
      sessionStorage.removeItem(`${STORAGE_KEY}_is_logged_in`);
      sessionStorage.removeItem(`${STORAGE_KEY}_user`);
      sessionStorage.removeItem(`${STORAGE_KEY}_role`);
    } catch {}
  };

  return (
    <AppContext.Provider
      value={{
        user,
        currentRole,
        setCurrentRole,
        isLoggedIn,
        setIsLoggedIn,
        authModalOpen,
        setAuthModalOpen,
        login,
        logout,
        register,
        activeTab,
        setActiveTab,
        jobs,
        addJob,
        deleteJob,
        updateJob,
        applications,
        applyToJob,
        updateApplicationStage,
        addApplication,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        addNotification,
        mentorFeedbacks,
        addMentorFeedback,
        directMessages,
        sendDirectMessage,
        interviewRecords,
        addInterviewRecord,
        updateProfile,
        calculateReadinessScore,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
