import { JobListing, UserProfile, Application, MentorFeedback, DirectMessage, NotificationItem, RecommendedCourse } from '../types';

export const INITIAL_STUDENT_PROFILE: UserProfile = {
  id: 'std_telangana_101',
  fullName: 'Ananya Sharma',
  email: 'ananya.sharma@jntuh.ac.in',
  mobile: '+91 98480 22334',
  collegeName: 'Jawaharlal Nehru Technological University Hyderabad (JNTUH CEH)',
  degree: 'B.Tech',
  branch: 'Computer Science & Engineering (CSE)',
  graduationYear: 2026,
  cgpa: 8.75,
  academicDetails: 'First Class with Distinction. Winner of Telangana Smart Campus Hackathon 2025. TASK Registered Student ID: TASK-HYD-2024-8849.',
  isOtpVerified: true,
  skills: ['JavaScript', 'React', 'SQL', 'Python', 'Git', 'HTML/CSS', 'Data Structures & Algorithms'],
  targetRole: 'Graduate Engineer Trainee',
  readinessScore: 72,
  resumeFileName: 'Ananya_Sharma_Resume_2026.pdf',
  resumeAtsScore: 78,
  githubUrl: 'https://github.com/ananya-sharma',
  linkedinUrl: 'https://linkedin.com/in/ananya-sharma',
  portfolioProjects: [
    {
      id: 'proj-1',
      title: 'Telangana Agri-Market Price Tracker',
      description: 'Real-time price intelligence system for local Rythu Bazaars with automated mandi price indexing and SMS alerts for farmers.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/srikanth-goud/rythu-market-tracker',
      highlights: ['Handled 15k+ daily price lookups', 'Integrated Telangana Open Data Portal API', '99.8% uptime on cloud deployment']
    },
    {
      id: 'proj-2',
      title: 'Automated Placement Drive Scheduler',
      description: 'Campus placement management tool supporting student slot booking, interview rounds tracking, and resume parsing.',
      technologies: ['TypeScript', 'Express', 'Gemini AI API', 'Docker'],
      githubUrl: 'https://github.com/srikanth-goud/campus-placement-portal',
      highlights: ['Reduced manual coordination by 65%', 'Built role-based dashboards for TPO and students']
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Full Stack Cloud Development with Node.js',
      issuer: 'TASK',
      issueDate: 'October 2025',
      credentialUrl: 'https://task.telangana.gov.in/verify/TASK-CERT-449'
    },
    {
      id: 'cert-2',
      name: 'Programming, Data Structures And Algorithms Using Python',
      issuer: 'NPTEL',
      issueDate: 'August 2025',
      credentialUrl: 'https://nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS88'
    },
    {
      id: 'cert-3',
      name: 'Modern Web Development with React',
      issuer: 'freeCodeCamp',
      issueDate: 'May 2025',
      credentialUrl: 'https://www.freecodecamp.org/certification/srikanth/front-end-development'
    }
  ]
};

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-deet-01',
    title: 'Associate Software Engineer (Full Stack)',
    company: 'Tech Mahindra',
    logoText: 'TM',
    location: 'HITEC City, Hyderabad',
    source: 'DEET & TASK Verified',
    type: 'Full-time',
    salaryRange: '₹4.5 - ₹6.5 LPA',
    batchEligible: [2025, 2026],
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Artificial Intelligence & Machine Learning (AI&ML)',
      'Electronics & Communication Engineering (ECE)'
    ],
    minCgpa: 7.0,
    requiredSkills: ['React', 'JavaScript', 'Node.js', 'SQL', 'Git', 'REST APIs'],
    preferredSkills: ['TypeScript', 'Docker', 'AWS'],
    description: 'Tech Mahindra Telangana Placement Drive 2026. Looking for enthusiastic junior developers to build next-generation enterprise applications at our Hyderabad Technology Centre.',
    deadline: '2026-10-25',
    applicationLink: 'https://deet.telangana.gov.in/jobs/tm-ase-2026',
    openingsCount: 120,
    isVerified: true,
    driveDate: '2026-10-30'
  },
  {
    id: 'job-task-02',
    title: 'Junior Cloud & DevOps Associate',
    company: 'ServiceNow India Development Centre',
    logoText: 'SN',
    location: 'Knowledge City, Hyderabad',
    source: 'TASK',
    type: 'Full-time',
    salaryRange: '₹8.0 - ₹12.0 LPA',
    batchEligible: [2025, 2026],
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Data Science',
      'Artificial Intelligence & Machine Learning (AI&ML)'
    ],
    minCgpa: 8.0,
    requiredSkills: ['Linux', 'Python', 'Docker', 'Git', 'Cloud Basics', 'SQL'],
    preferredSkills: ['Kubernetes', 'CI/CD Pipelines', 'JavaScript'],
    description: 'TASK Exclusive Campus Hiring for ServiceNow IDC Hyderabad. Opportunity for high-achieving students to join core infrastructure and platform engineering teams.',
    deadline: '2026-10-20',
    applicationLink: 'https://task.telangana.gov.in/placements/servicenow-cloud-2026',
    openingsCount: 45,
    isVerified: true,
    driveDate: '2026-10-28'
  },
  {
    id: 'job-deet-03',
    title: 'Frontend React Developer',
    company: 'Cyient Technologies',
    logoText: 'CY',
    location: 'Financial District, Gachibowli, Hyderabad',
    source: 'DEET',
    type: 'Full-time',
    salaryRange: '₹4.2 - ₹5.8 LPA',
    batchEligible: [2025, 2026, 2027],
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics & Communication Engineering (ECE)'
    ],
    minCgpa: 6.5,
    requiredSkills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git'],
    preferredSkills: ['TypeScript', 'Redux', 'Unit Testing'],
    description: 'Cyient is hiring Junior UI Engineers for digital engineering projects across aerospace and smart mobility sectors.',
    deadline: '2026-11-05',
    applicationLink: 'https://deet.telangana.gov.in/jobs/cyient-fe-2026',
    openingsCount: 60,
    isVerified: true,
    driveDate: '2026-11-12'
  },
  {
    id: 'job-task-04',
    title: 'Graduate Engineer Trainee (GET)',
    company: 'Tata Consultancy Services (TCS)',
    logoText: 'TCS',
    location: 'Synergypark, Gachibowli, Hyderabad / Warangal IT Hub',
    source: 'DEET & TASK Verified',
    type: 'Full-time',
    salaryRange: '₹4.0 - ₹7.2 LPA (TCS Ninja & Digital)',
    batchEligible: [2025, 2026],
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics & Communication Engineering (ECE)',
      'Electrical & Electronics Engineering (EEE)',
      'Mechanical Engineering'
    ],
    minCgpa: 6.0,
    requiredSkills: ['Data Structures & Algorithms', 'Python', 'SQL', 'C/C++', 'Problem Solving'],
    preferredSkills: ['Java', 'Web Technologies', 'Cloud Foundations'],
    description: 'TCS Telangana State-wide Placement Drive via DEET & TASK. Eligible candidates will be assessed for Ninja (3.6 LPA) and Digital (7.2 LPA) roles.',
    deadline: '2026-10-18',
    applicationLink: 'https://task.telangana.gov.in/drives/tcs-national-telangana',
    openingsCount: 350,
    isVerified: true,
    driveDate: '2026-10-24'
  },
  {
    id: 'job-deet-05',
    title: 'AI & Data Analyst Intern',
    company: 'T-Hub Incubated AI Studio',
    logoText: 'TH',
    location: 'Raidurgam, Hyderabad',
    source: 'DEET',
    type: 'Internship',
    salaryRange: '₹25,000 / month Stipend (PPO: ₹7-10 LPA)',
    batchEligible: [2026, 2027],
    eligibleBranches: [
      'Artificial Intelligence & Machine Learning (AI&ML)',
      'Data Science',
      'Computer Science & Engineering (CSE)'
    ],
    minCgpa: 7.5,
    requiredSkills: ['Python', 'SQL', 'Pandas', 'Machine Learning', 'Data Visualization'],
    preferredSkills: ['PyTorch', 'Prompt Engineering', 'FastAPI'],
    description: 'Cutting-edge Generative AI startup at T-Hub Phase 2 seeking analytical interns to evaluate fine-tuned LLM models and build analytics pipelines.',
    deadline: '2026-11-10',
    applicationLink: 'https://deet.telangana.gov.in/startups/thub-ai-analyst',
    openingsCount: 15,
    isVerified: true
  },
  {
    id: 'job-task-06',
    title: 'Embedded Systems & IoT Associate',
    company: 'Qualcomm India',
    logoText: 'QC',
    location: 'Madhapur, Hyderabad',
    source: 'TASK',
    type: 'Full-time',
    salaryRange: '₹9.5 - ₹14.0 LPA',
    batchEligible: [2025, 2026],
    eligibleBranches: [
      'Electronics & Communication Engineering (ECE)',
      'Electrical & Electronics Engineering (EEE)',
      'Computer Science & Engineering (CSE)'
    ],
    minCgpa: 8.0,
    requiredSkills: ['C/C++', 'Microcontrollers', 'RTOS', 'Linux', 'Computer Architecture'],
    preferredSkills: ['Python', 'Verilog', 'ARM Architecture'],
    description: 'TASK Premium Fast-Track drive with Qualcomm Hyderabad. Design software drivers and embedded test harnesses for next-gen wireless and 5G chipsets.',
    deadline: '2026-10-22',
    applicationLink: 'https://task.telangana.gov.in/placements/qualcomm-iot-2026',
    openingsCount: 25,
    isVerified: true,
    driveDate: '2026-10-29'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-101',
    jobId: 'job-deet-01',
    jobTitle: 'Associate Software Engineer (Full Stack)',
    company: 'Tech Mahindra',
    stage: 'technical_interview',
    appliedDate: '2026-10-01',
    lastUpdatedDate: '2026-10-08',
    interviewDate: '2026-10-14',
    interviewTime: '10:30 AM IST',
    interviewVenue: 'Virtual (Google Meet - DEET Verified Room)',
    interviewMeetingLink: 'https://meet.google.com/dee-teng-tmh',
    interviewerNotes: 'Candidate cleared Round 1 DSA assessment with 94% score. Focus technical interview on React state management and Node.js REST API security.',
    isEmployerVerified: true,
    notificationPreferences: {
      email: true,
      inApp: true,
      sms: true
    }
  },
  {
    id: 'app-102',
    jobId: 'job-task-02',
    jobTitle: 'Junior Cloud & DevOps Associate',
    company: 'ServiceNow India Development Centre',
    stage: 'round1_qualified',
    appliedDate: '2026-10-03',
    lastUpdatedDate: '2026-10-07',
    interviewDate: '2026-10-18',
    interviewTime: '02:00 PM IST',
    interviewVenue: 'ServiceNow IDC Campus, Knowledge City, Hyderabad',
    interviewerNotes: 'Online Coding Assessment cleared. Scheduled for Round 2 System & Cloud Architecture.',
    isEmployerVerified: true,
    notificationPreferences: {
      email: true,
      inApp: true,
      sms: false
    }
  },
  {
    id: 'app-103',
    jobId: 'job-task-04',
    jobTitle: 'Graduate Engineer Trainee (GET)',
    company: 'Tata Consultancy Services (TCS)',
    stage: 'shortlisted',
    appliedDate: '2026-10-05',
    lastUpdatedDate: '2026-10-07',
    interviewerNotes: 'Resume screened and approved for TCS NQT State Assessment on 24th October.',
    isEmployerVerified: true,
    notificationPreferences: {
      email: true,
      inApp: true,
      sms: true
    }
  },
  {
    id: 'app-104',
    jobId: 'job-deet-03',
    jobTitle: 'Frontend React Developer',
    company: 'Cyient Technologies',
    stage: 'submitted',
    appliedDate: '2026-10-09',
    lastUpdatedDate: '2026-10-09',
    isEmployerVerified: true,
    notificationPreferences: {
      email: true,
      inApp: true,
      sms: false
    }
  }
];

export const INITIAL_MENTOR_FEEDBACK: MentorFeedback[] = [
  {
    id: 'fb-01',
    mentorName: 'Dr. K. V. S. Ramarao',
    mentorRole: 'Professor & Head of Training & Placement, JNTUH',
    studentId: 'std_telangana_101',
    date: '2026-10-07',
    category: 'Interview',
    score: 88,
    comments: 'Srikanth demonstrated thorough knowledge in Data Structures and React component lifecycle. Pacing in verbal explanations was steady. He should practice more System Design trade-off questions for tier-1 product companies like ServiceNow.',
    recommendedActions: [
      'Practice answering using the STAR format (Situation, Task, Action, Result)',
      'Review SQL indexing and database query execution plans',
      'Complete the TASK Cloud Security foundation module'
    ]
  },
  {
    id: 'fb-02',
    mentorName: 'Ananya Deshmukh',
    mentorRole: 'Lead Software Architect & Industry Mentor (TASK)',
    studentId: 'std_telangana_101',
    date: '2026-10-02',
    category: 'Resume',
    score: 82,
    comments: 'The resume structure is clean and parsed well by ATS. The project section looks solid, but each bullet point should lead with a strong action verb and highlight measurable outcomes (e.g. latency reduced by X%, users served).',
    recommendedActions: [
      'Apply Google XYZ formula to bullet points in the Agri-Market project',
      'Highlight Docker and CI/CD skills more prominently under the skills header'
    ]
  }
];

export const INITIAL_DIRECT_MESSAGES: DirectMessage[] = [
  {
    id: 'msg-1',
    senderId: 'mentor-01',
    senderName: 'Dr. K. V. S. Ramarao (TPO Mentor)',
    senderRole: 'mentor',
    receiverId: 'std_telangana_101',
    content: 'Hello Srikanth! I saw you cleared Round 1 for Tech Mahindra and ServiceNow. How is your preparation going for the upcoming technical round on the 14th?',
    timestamp: '2026-10-08T14:30:00Z',
    isRead: true
  },
  {
    id: 'msg-2',
    senderId: 'std_telangana_101',
    senderName: 'Srikanth Rao Goud',
    senderRole: 'student',
    receiverId: 'mentor-01',
    content: 'Good afternoon, Sir! I have been revising React hooks and Node.js security practices using the AI mock interviewer tool. I had a quick question regarding how deep they will dive into system design.',
    timestamp: '2026-10-08T14:45:00Z',
    isRead: true
  },
  {
    id: 'msg-3',
    senderId: 'mentor-01',
    senderName: 'Dr. K. V. S. Ramarao (TPO Mentor)',
    senderRole: 'mentor',
    receiverId: 'std_telangana_101',
    content: 'For the Associate Full Stack role, focus primarily on client-server communication, handling REST status codes, database indexing, and caching basics. You will do great!',
    timestamp: '2026-10-08T15:10:00Z',
    isRead: false
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Interview Scheduled: Tech Mahindra',
    message: 'Your Technical Interview is confirmed for 14th Oct 2026 at 10:30 AM IST. Virtual link provided.',
    type: 'interview',
    timestamp: '2026-10-08T10:00:00Z',
    read: false,
    actionUrl: 'recruitment'
  },
  {
    id: 'notif-2',
    title: 'New TASK Exclusive Drive Announced',
    message: 'Qualcomm India Embedded Systems & IoT drive has opened for 2025/2026 batches.',
    type: 'drive',
    timestamp: '2026-10-07T16:20:00Z',
    read: false,
    actionUrl: 'jobs'
  },
  {
    id: 'notif-3',
    title: 'Round 1 Assessment Cleared: ServiceNow',
    message: 'Congratulations! Your score of 88/100 qualified you for Round 2 Technical Round.',
    type: 'application',
    timestamp: '2026-10-07T11:45:00Z',
    read: true,
    actionUrl: 'recruitment'
  },
  {
    id: 'notif-4',
    title: 'Mentor Feedback Posted',
    message: 'Dr. K. V. S. Ramarao provided feedback on your mock interview performance.',
    type: 'feedback',
    timestamp: '2026-10-07T10:15:00Z',
    read: true,
    actionUrl: 'mentor'
  }
];

export const POPULAR_COURSES: RecommendedCourse[] = [
  {
    name: 'Programming in Java (12 Weeks Certification)',
    provider: 'NPTEL',
    url: 'https://nptel.ac.in/courses/106105191',
    type: 'IIT Kharagpur Exam Certified',
    duration: '12 Weeks'
  },
  {
    name: 'Full Stack Open (Deep Dive into Modern Web Development)',
    provider: 'freeCodeCamp',
    url: 'https://fullstackopen.com/en/',
    type: 'Open Source Practical Course',
    duration: 'Self-paced'
  },
  {
    name: 'Database Management System (DBMS)',
    provider: 'SWAYAM',
    url: 'https://swayam.gov.in/explorer?searchText=DBMS',
    type: 'Govt. of India Certified',
    duration: '8 Weeks'
  },
  {
    name: 'Google Cloud Computing Foundations Certificate',
    provider: 'Coursera',
    url: 'https://www.coursera.org/learn/gcp-fundamentals',
    type: 'Industry Credential',
    duration: '4 Weeks'
  },
  {
    name: 'TASK FinTech & Cloud Computing Accelerator',
    provider: 'TASK',
    url: 'https://task.telangana.gov.in/programs',
    type: 'Telangana State Upskilling',
    duration: '6 Weeks'
  }
];

export const SAMPLE_RESUME_TEXT = `SRIKANTH RAO GOUD
Hyderabad, Telangana | +91 98480 22334 | srikanth.goud@jntuh.ac.in | linkedin.com/in/srikanth-goud | github.com/srikanth-goud

EDUCATION:
Jawaharlal Nehru Technological University Hyderabad (JNTUH CEH)
Bachelor of Technology in Computer Science and Engineering
CGPA: 8.65 / 10.0 | Expected Graduation: June 2026

TECHNICAL SKILLS:
Programming Languages: JavaScript, TypeScript, Python, C++, SQL
Web & Frameworks: React, Node.js, Express, Tailwind CSS, HTML5, CSS3, RESTful APIs
Databases & Cloud: PostgreSQL, MongoDB, Docker, Git, Linux
Core Fundamentals: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks

PROJECTS:
Telangana Agri-Market Price Tracker (Full Stack Web App) | React, Node.js, PostgreSQL, Tailwind
- Architected a live price indexing portal for 45+ Rythu Bazaars across Telangana, serving over 15,000 daily queries.
- Integrated Telangana State Open Data Portal API to compute daily moving averages and predict vegetable price trends.
- Deployed on cloud container infrastructure achieving 99.8% uptime with automated error logging.

Automated Campus Placement Scheduler | TypeScript, Express, Gemini AI, Docker
- Engineered an interactive placement drive coordination portal for 1,200+ engineering students and 30 recruiters.
- Built automated resume text extractor and applicant stage pipeline reducing TPO coordination overhead by 65%.

CERTIFICATIONS & ACHIEVEMENTS:
- Winner, Telangana Smart Campus Hackathon 2025 (1st Place among 84 engineering teams)
- NPTEL Elite Certification: Programming, Data Structures and Algorithms Using Python (IIT Madras)
- TASK Certified Cloud Associate (Telangana Academy for Skill and Knowledge)
- Solved 350+ DSA problems across LeetCode and GeeksforGeeks`;
