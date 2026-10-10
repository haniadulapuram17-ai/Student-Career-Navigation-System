import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initializing server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Server API endpoints for Gemini AI analysis
app.post('/api/gemini/analyze-resume', async (req: Request, res: Response) => {
  try {
    const { resumeText, targetRole, studentDetails } = req.body;
    if (!ai) {
      // Fallback response if GEMINI_API_KEY not supplied yet
      return res.json({
        success: true,
        extracted: {
          skills: ['JavaScript', 'React', 'HTML/CSS', 'Python', 'SQL', 'Git'],
          projects: ['Student Placement Portal', 'IoT Smart Energy Monitor'],
          qualifications: studentDetails?.degree || 'B.Tech Computer Science and Engineering',
          experience: 'Academic coursework, 2-month summer internship in Web Development',
          atsScore: 78,
          strengths: ['Strong front-end fundamentals', 'Good academic CGPA', 'Relevant academic projects'],
          areasForImprovement: ['Add cloud/AWS deployment keywords', 'Quantify project impact with metrics', 'Include certifications from NPTEL/TASK'],
          matchedRoleScore: 84,
          suggestions: [
            'Add AWS or Docker skills to match modern DEET full-stack openings',
            'Highlight practical accomplishments using the XYZ formula (Accomplished [X] as measured by [Y], by doing [Z])'
          ]
        }
      });
    }

    const prompt = `Analyze this student resume for placement in Telangana tech companies (DEET & TASK recruitment drives).
Target Role: ${targetRole || 'Software Development Engineer'}
Student Degree/Branch: ${studentDetails?.degree || 'Engineering'} - ${studentDetails?.branch || 'CSE'}
Student CGPA: ${studentDetails?.cgpa || '8.2'}
Resume Text:
"""
${resumeText}
"""

Return a clean JSON object with:
- skills: array of extracted technical and soft skills
- projects: array of project titles/summaries
- qualifications: extracted degree/education summary
- experience: extracted internships, experience or academic training
- atsScore: number between 0 and 100 representing ATS compliance score
- strengths: array of 3-4 key candidate strengths
- areasForImprovement: array of 3-4 specific suggestions to boost placement readiness
- matchedRoleScore: number between 0 and 100 compatibility with target role
- suggestions: array of 2-3 actionable resume bullet improvements`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, extracted: parsed });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error analyzing resume:', errorMessage);
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

app.post('/api/gemini/skill-gap', async (req: Request, res: Response) => {
  try {
    const { currentSkills, targetJobTitle, branch } = req.body;
    if (!ai) {
      return res.json({
        success: true,
        data: {
          matchedSkills: currentSkills || ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
          missingCriticalSkills: ['Node.js & Express REST APIs', 'PostgreSQL / Database Indexing', 'Docker & Containerization'],
          missingSecondarySkills: ['Jest / Automated Testing', 'CI/CD Pipelines (GitHub Actions)', 'System Design Basics'],
          readinessPercentage: 68,
          learningRoadmap: [
            {
              week: 'Week 1-2: Backend API Engineering',
              topics: ['RESTful API architecture', 'Express middleware & error handling', 'JWT authentication'],
              courses: [
                { name: 'Server-side Development with NodeJS, Express and MongoDB (Coursera)', provider: 'Coursera', url: 'https://www.coursera.org', type: 'Course' },
                { name: 'Joy of Computing using Python / Backend (NPTEL)', provider: 'NPTEL', url: 'https://nptel.ac.in', type: 'Government Certification' }
              ],
              practicalProject: 'Build a secure REST API for student attendance with token-based authentication'
            },
            {
              week: 'Week 3-4: Relational Databases & ORMs',
              topics: ['PostgreSQL schema design', 'SQL joins, indices, and transactions', 'Prisma or Drizzle ORM'],
              courses: [
                { name: 'Database Management System (SWAYAM)', provider: 'SWAYAM', url: 'https://swayam.gov.in', type: 'Government Certification' },
                { name: 'Relational Database Course (freeCodeCamp)', provider: 'freeCodeCamp', url: 'https://www.freecodecamp.org', type: 'Free Practice' }
              ],
              practicalProject: 'Design a recruitment database schema with indexing and query benchmarking'
            },
            {
              week: 'Week 5-6: DevOps, Docker & Cloud Deployment',
              topics: ['Docker containers', 'Deploying on Cloud (AWS/GCP)', 'CI/CD pipeline basics'],
              courses: [
                { name: 'TASK DevOps & Cloud Foundations Workshop', provider: 'TASK', url: 'https://www.task.telangana.gov.in', type: 'Telangana State Program' },
                { name: 'Docker for Beginners (freeCodeCamp / YouTube)', provider: 'freeCodeCamp', url: 'https://youtube.com', type: 'Video Series' }
              ],
              practicalProject: 'Containerize full-stack application and automate build tests using GitHub Actions'
            }
          ]
        }
      });
    }

    const prompt = `Compare these student skills: ${JSON.stringify(currentSkills)} against the target job role: "${targetJobTitle}" (Branch: ${branch || 'Engineering'}).
Generate a detailed skill gap analysis and personalized roadmap aligned with Indian tech placement expectations (TCS, Infosys, Tech Mahindra, Telangana DEET & TASK recruitment drives).
Recommend reputable courses specifically highlighting Coursera, NPTEL, SWAYAM, freeCodeCamp, and TASK programs.

Return a clean JSON object with:
- matchedSkills: string[]
- missingCriticalSkills: string[]
- missingSecondarySkills: string[]
- readinessPercentage: number (0-100)
- learningRoadmap: array of roadmap milestones, each containing:
  - week: string (e.g. "Week 1-2: Backend Architecture")
  - topics: string[]
  - courses: array of objects with { name, provider, url, type }
  - practicalProject: string (actionable portfolio project)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error generating skill gap:', errorMessage);
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

app.post('/api/gemini/mock-interview-question', async (req: Request, res: Response) => {
  try {
    const { role, round, difficulty, previousQuestions } = req.body;
    if (!ai) {
      return res.json({
        success: true,
        question: round === 'hr'
          ? 'Tell me about a challenging technical project you worked on. How did you resolve team disagreements and ensure on-time delivery?'
          : 'Can you explain how indexing works in relational databases and when a composite index should be used over multiple single-column indices?',
        category: round === 'hr' ? 'Behavioral / Leadership' : 'Database & System Architecture',
        expectedPoints: [
          'Clear problem statement and candidate role',
          'Technical rationale behind architectural choices',
          'Measurable impact and lessons learned'
        ],
        codeSnippet: round === 'coding' ? 'function findLongestSubarray(arr, k) {\n  // Write your O(n) solution here\n}' : null
      });
    }

    const prompt = `Generate a realistic interview question for a campus placement / Telangana DEET & TASK recruitment drive.
Target Role: ${role || 'Full Stack Engineer'}
Round Type: ${round || 'technical'} (options: technical, hr, coding)
Difficulty: ${difficulty || 'medium'}
Previously asked: ${JSON.stringify(previousQuestions || [])}

Return a clean JSON with:
- question: string (the interviewer's spoken prompt)
- category: string
- expectedPoints: string[] (key concepts an evaluator looks for)
- codeSnippet: optional string (if coding round, provide function signature or starting code)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    return res.json({ success: true, ...JSON.parse(response.text || '{}') });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error generating question:', errorMessage);
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

app.post('/api/gemini/evaluate-answer', async (req: Request, res: Response) => {
  try {
    const { question, answer, role, round } = req.body;
    if (!ai) {
      return res.json({
        success: true,
        evaluation: {
          score: 82,
          technicalAccuracy: 85,
          communicationClarity: 80,
          confidenceTone: 82,
          grammarAndFluency: 84,
          verdict: 'Strong Answer',
          strengths: ['Identified core architectural concepts accurately', 'Good logical progression'],
          improvements: ['Could structure using the STAR method more distinctly', 'Include quantifiable metrics or benchmark numbers'],
          modelAnswer: 'A high-impact answer should first state the core definition, explain the trade-offs, and give a concrete example from a real project or coursework.',
          softSkillsFeedback: 'Tone is confident and professional. Pacing was steady.'
        }
      });
    }

    const prompt = `Evaluate this student's response in a mock campus recruitment interview.
Role: ${role || 'Software Engineer'}
Round: ${round || 'Technical'}
Interviewer Question: "${question}"
Candidate Answer: "${answer}"

Provide an honest, constructive assessment with:
- score: number (0-100 overall)
- technicalAccuracy: number (0-100)
- communicationClarity: number (0-100)
- confidenceTone: number (0-100)
- grammarAndFluency: number (0-100)
- verdict: string (e.g. "Excellent", "Strong Answer", "Needs More Depth", "Incomplete")
- strengths: string[] (what they did well)
- improvements: string[] (actionable feedback)
- modelAnswer: string (an exemplary answer demonstrating STAR framework)
- softSkillsFeedback: string (grammar, clarity, pacing, professional tone advice)

Return as clean JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    return res.json({ success: true, evaluation: JSON.parse(response.text || '{}') });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error evaluating answer:', errorMessage);
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

app.post('/api/gemini/career-counselor', async (req: Request, res: Response) => {
  try {
    const { branch, cgpa, interests, skills, graduationYear } = req.body;
    if (!ai) {
      return res.json({
        success: true,
        recommendations: [
          {
            role: 'Full Stack Web Developer (Telangana IT Corridor)',
            matchScore: 92,
            reason: 'Strong correlation with your web skills and high demand across Hyderabad IT firms and DEET registered employers.',
            demandGrowth: 'Very High (18% YoY)',
            startingSalaryRange: '₹4.5 - ₹8.5 LPA',
            keyCertifications: ['TASK Cloud Associate', 'AWS Certified Developer'],
            targetEmployers: ['Tech Mahindra', 'Infosys', 'ServiceNow Hyderabad', 'Tata Consultancy Services']
          },
          {
            role: 'Cloud & DevOps Associate',
            matchScore: 84,
            reason: 'Great synergy with engineering fundamentals and rapid cloud adoption across Telangana state e-Governance and IT parks.',
            demandGrowth: 'High (24% YoY)',
            startingSalaryRange: '₹5.0 - ₹9.0 LPA',
            keyCertifications: ['AWS Cloud Practitioner', 'Docker & Kubernetes Foundation'],
            targetEmployers: ['Wipro', 'Capgemini', 'Cognizant', 'DEET partner startups']
          }
        ]
      });
    }

    const prompt = `Act as an expert AI Career Counselor for an engineering student in Telangana.
Profile:
Branch: ${branch}
Graduation Year: ${graduationYear}
CGPA: ${cgpa}
Interests: ${interests}
Current Skills: ${JSON.stringify(skills)}

Provide 3 tailored career path options suitable for Telangana placement drives (DEET, TASK, Hyderabad tech ecosystem).
Return a JSON array of objects:
- role: string
- matchScore: number (0-100)
- reason: string
- demandGrowth: string
- startingSalaryRange: string (in INR LPA e.g. ₹4.5 - ₹8.0 LPA)
- keyCertifications: string[]
- targetEmployers: string[] (include Telangana/DEET prominent employers)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    return res.json({ success: true, recommendations: JSON.parse(response.text || '[]') });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error with career counselor:', errorMessage);
    return res.status(500).json({ success: false, error: errorMessage });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
