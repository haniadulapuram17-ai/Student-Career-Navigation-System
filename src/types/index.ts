export type Role = 'student' | 'mentor' | 'admin';

export type Degree = 'B.Tech' | 'B.E.' | 'MCA' | 'B.Sc' | 'M.Tech' | 'BBA/BCA';

export type Branch = 
  | 'Computer Science & Engineering (CSE)'
  | 'Information Technology (IT)'
  | 'Artificial Intelligence & Machine Learning (AI&ML)'
  | 'Data Science'
  | 'Electronics & Communication Engineering (ECE)'
  | 'Electrical & Electronics Engineering (EEE)'
  | 'Mechanical Engineering'
  | 'Civil Engineering';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  collegeName: string;
  degree: Degree;
  branch: Branch;
  graduationYear: number;
  cgpa: number;
  academicDetails: string;
  isOtpVerified: boolean;
  avatarUrl?: string;
  skills: string[];
  targetRole: string;
  readinessScore: number;
  resumeUrl?: string;
  resumeFileName?: string;
  resumeAtsScore?: number;
  resumeExtractedData?: ExtractedResumeData;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioProjects?: PortfolioProject[];
  certifications?: Certification[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: 'NPTEL' | 'SWAYAM' | 'TASK' | 'Coursera' | 'freeCodeCamp' | 'AWS' | 'Other';
  issueDate: string;
  credentialUrl?: string;
}

export interface ExtractedResumeData {
  skills: string[];
  projects: string[];
  qualifications: string;
  experience: string;
  atsScore: number;
  strengths: string[];
  areasForImprovement: string[];
  matchedRoleScore: number;
  suggestions: string[];
}

export type ApplicationStage = 
  | 'submitted'
  | 'shortlisted'
  | 'round1_qualified'
  | 'technical_interview'
  | 'hr_interview'
  | 'selected'
  | 'rejected';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  logoText?: string;
  location: string;
  source: 'DEET' | 'TASK' | 'DEET & TASK Verified';
  type: 'Full-time' | 'Internship' | 'Drive';
  salaryRange: string;
  batchEligible: number[];
  eligibleBranches: string[];
  minCgpa: number;
  requiredSkills: string[];
  preferredSkills?: string[];
  description: string;
  deadline: string;
  applicationLink: string;
  openingsCount: number;
  isVerified: boolean;
  driveDate?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  stage: ApplicationStage;
  appliedDate: string;
  lastUpdatedDate: string;
  interviewDate?: string;
  interviewTime?: string;
  interviewVenue?: string;
  interviewMeetingLink?: string;
  interviewerNotes?: string;
  salaryOffered?: string;
  isEmployerVerified: boolean;
  notificationPreferences: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
  };
}

export interface SkillGapRoadmap {
  targetJobTitle: string;
  matchedSkills: string[];
  missingCriticalSkills: string[];
  missingSecondarySkills: string[];
  readinessPercentage: number;
  learningRoadmap: RoadmapMilestone[];
}

export interface RoadmapMilestone {
  week: string;
  topics: string[];
  courses: RecommendedCourse[];
  practicalProject: string;
  completed?: boolean;
}

export interface RecommendedCourse {
  name: string;
  provider: 'Coursera' | 'NPTEL' | 'SWAYAM' | 'freeCodeCamp' | 'TASK' | 'YouTube';
  url: string;
  type: string;
  duration?: string;
}

export interface MockInterviewQuestion {
  id: string;
  question: string;
  category: string;
  expectedPoints: string[];
  codeSnippet?: string | null;
  round: 'technical' | 'hr' | 'coding';
}

export interface AnswerEvaluation {
  score: number;
  technicalAccuracy: number;
  communicationClarity: number;
  confidenceTone: number;
  grammarAndFluency: number;
  verdict: string;
  strengths: string[];
  improvements: string[];
  modelAnswer: string;
  softSkillsFeedback: string;
}

export interface InterviewRecord {
  id: string;
  date: string;
  role: string;
  round: 'technical' | 'hr' | 'coding';
  question: string;
  studentAnswer: string;
  evaluation: AnswerEvaluation;
}

export interface MentorFeedback {
  id: string;
  mentorName: string;
  mentorRole: string;
  studentId: string;
  date: string;
  category: 'Resume' | 'Interview' | 'Technical Skills' | 'Overall Readiness';
  score: number;
  comments: string;
  recommendedActions: string[];
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'interview' | 'application' | 'drive' | 'feedback' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface CareerRecommendation {
  role: string;
  matchScore: number;
  reason: string;
  demandGrowth: string;
  startingSalaryRange: string;
  keyCertifications: string[];
  targetEmployers: string[];
}
