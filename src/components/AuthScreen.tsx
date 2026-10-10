import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Check, 
  RefreshCw, 
  ArrowRight, 
  User, 
  Lock, 
  Mail, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  Building,
  CheckCircle2
} from 'lucide-react';
import { Degree, Branch, UserProfile, Role } from '../types';

const TELANGANA_COLLEGES = [
  'Jawaharlal Nehru Technological University Hyderabad (JNTUH CEH)',
  'Osmania University College of Engineering (OUCE)',
  'Chaitanya Bharathi Institute of Technology (CBIT)',
  'VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)',
  'Vasavi College of Engineering (VCE)',
  'CVR College of Engineering',
  'Gokaraju Rangaraju Institute of Engineering & Technology (GRIET)',
  'Sreenidhi Institute of Science and Technology (SNIST)',
  'Anurag University',
  'Kakatiya Institute of Technology and Science (KITS Warangal)',
  'Other Telangana University / College'
];

const DEGREES: Degree[] = ['B.Tech', 'B.E.', 'MCA', 'B.Sc', 'M.Tech', 'BBA/BCA'];

const BRANCHES: Branch[] = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Machine Learning (AI&ML)',
  'Data Science',
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Mechanical Engineering',
  'Civil Engineering'
];

export const AuthScreen: React.FC = () => {
  const { login, register } = useApp();

  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [selectedRole, setSelectedRole] = useState<Role>('student');

  // Registration Form
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    collegeName: TELANGANA_COLLEGES[0],
    degree: 'B.Tech' as Degree,
    branch: 'Computer Science & Engineering (CSE)' as Branch,
    graduationYear: 2026,
    cgpa: 8.5,
    academicDetails: '',
    targetRole: 'Graduate Engineer Trainee'
  });

  // Login Form
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginOtp, setLoginOtp] = useState('');

  // OTP Step for Registration
  const [otpStep, setOtpStep] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['4', '8', '2', '9', '1', '6']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpVerifiedSuccess, setOtpVerifiedSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const handleRegInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegForm(prev => ({
      ...prev,
      [name]: name === 'cgpa' ? parseFloat(value) || 0 : (name === 'graduationYear' ? parseInt(value) || 2026 : value)
    }));
  };

  const handleQuickFillAnanya = () => {
    setRegForm({
      fullName: 'Ananya Sharma',
      email: 'ananya.sharma@jntuh.ac.in',
      mobile: '+91 98480 22334',
      collegeName: 'Jawaharlal Nehru Technological University Hyderabad (JNTUH CEH)',
      degree: 'B.Tech',
      branch: 'Computer Science & Engineering (CSE)',
      graduationYear: 2026,
      cgpa: 8.75,
      academicDetails: 'First Class with Distinction. Winner of Telangana Smart Campus Hackathon 2025. TASK ID: TASK-HYD-2024-8849.',
      targetRole: 'Graduate Engineer Trainee'
    });
  };

  const handleStartOtpVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.email || !regForm.mobile) return;
    setOtpStep(true);
    setResendTimer(30);
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpDigits];
    updated[index] = val;
    setOtpDigits(updated);

    if (val && index < 5) {
      const nextEl = document.getElementById(`reg-otp-${index + 1}`);
      nextEl?.focus();
    }
  };

  const handleCompleteRegistration = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setOtpVerifiedSuccess(true);

      const newProfile: UserProfile = {
        id: `std_${Date.now()}`,
        fullName: regForm.fullName,
        email: regForm.email,
        mobile: regForm.mobile,
        collegeName: regForm.collegeName,
        degree: regForm.degree,
        branch: regForm.branch,
        graduationYear: regForm.graduationYear,
        cgpa: regForm.cgpa,
        academicDetails: regForm.academicDetails,
        isOtpVerified: true,
        skills: ['JavaScript', 'React', 'SQL', 'Python', 'Git', 'Data Structures & Algorithms'],
        targetRole: regForm.targetRole,
        readinessScore: 72,
        resumeFileName: `${regForm.fullName.replace(/\s+/g, '_')}_Resume_2026.pdf`,
        resumeAtsScore: 78,
        portfolioProjects: [
          {
            id: 'proj-1',
            title: 'Telangana Agri-Market Price Tracker',
            description: 'Real-time price intelligence system for local Rythu Bazaars with automated mandi price indexing.',
            technologies: ['React', 'Node.js', 'PostgreSQL'],
            highlights: ['Handled 15k+ daily price lookups', 'Integrated Telangana Open Data Portal API']
          }
        ],
        certifications: [
          {
            id: 'cert-1',
            name: 'Programming, Data Structures And Algorithms Using Python',
            issuer: 'NPTEL',
            issueDate: 'August 2025'
          }
        ]
      };

      setTimeout(() => {
        register(newProfile);
      }, 700);
    }, 800);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      {
        fullName: loginIdentifier ? loginIdentifier.split('@')[0] : 'Ananya Sharma',
        email: loginIdentifier.includes('@') ? loginIdentifier : 'ananya.sharma@jntuh.ac.in',
        readinessScore: 72
      },
      selectedRole
    );
  };

  const handleQuickLoginAs = (name: string, email: string, role: Role = 'student') => {
    login(
      {
        fullName: name,
        email: email,
        readinessScore: 72
      },
      role
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-100 flex flex-col justify-between font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 p-4 sm:p-6 lg:p-8">
      
      {/* Top Brand Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight text-slate-900">pathwise.</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
              Telangana DEET & TASK
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500">
          <span>Digital Employment Exchange of Telangana</span>
          <span>·</span>
          <span>Academic Portal</span>
        </div>
      </div>

      {/* Main Authentication Container */}
      <div className="max-w-xl w-full mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/80 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Auth Mode Tabs */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => { setAuthMode('register'); setOtpStep(false); }}
            className={`py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Student Registration
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Log In to Portal
          </button>
        </div>

        {/* Auth Body */}
        <div className="p-6 sm:p-8">
          {authMode === 'register' ? (
            !otpStep ? (
              /* Registration Form */
              <form onSubmit={handleStartOtpVerification} className="space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Create Student Account</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Register with your academic profile and verify via Mobile/Email OTP.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickFillAnanya}
                    className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Populates with Ananya Sharma sample data"
                  >
                    ⚡ Quick Fill
                  </button>
                </div>

                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={regForm.fullName}
                      onChange={handleRegInputChange}
                      placeholder="Ananya Sharma"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={regForm.email}
                      onChange={handleRegInputChange}
                      placeholder="ananya.sharma@jntuh.ac.in"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Mobile & College */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (+91) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={regForm.mobile}
                      onChange={handleRegInputChange}
                      placeholder="+91 98480 22334"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      College Name <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="collegeName"
                      value={regForm.collegeName}
                      onChange={handleRegInputChange}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 bg-white"
                    >
                      {TELANGANA_COLLEGES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Degree & Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Degree <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="degree"
                      value={regForm.degree}
                      onChange={handleRegInputChange}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 bg-white"
                    >
                      {DEGREES.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Branch / Specialization <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="branch"
                      value={regForm.branch}
                      onChange={handleRegInputChange}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 bg-white"
                    >
                      {BRANCHES.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Graduation Year, CGPA, Target Role */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Grad. Year <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="graduationYear"
                      value={regForm.graduationYear}
                      onChange={handleRegInputChange}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    >
                      <option value={2024}>2024</option>
                      <option value={2025}>2025</option>
                      <option value={2026}>2026</option>
                      <option value={2027}>2027</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      CGPA (/10) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="4.0"
                      max="10.0"
                      name="cgpa"
                      required
                      value={regForm.cgpa}
                      onChange={handleRegInputChange}
                      placeholder="8.75"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Role
                    </label>
                    <input
                      type="text"
                      name="targetRole"
                      value={regForm.targetRole}
                      onChange={handleRegInputChange}
                      placeholder="GET / Software Eng."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                {/* Academic Highlights / TASK ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Achievements & TASK Registration ID
                  </label>
                  <input
                    type="text"
                    name="academicDetails"
                    value={regForm.academicDetails}
                    onChange={handleRegInputChange}
                    placeholder="e.g. TASK-HYD-2024-8849. Winner of Telangana Smart Campus Hackathon."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verify with OTP & Complete Registration</span>
                  </button>
                </div>
              </form>
            ) : (
              /* OTP Screen */
              <div className="py-4 text-center space-y-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">Verify 6-Digit OTP</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    A secure one-time passcode was dispatched to <strong>{regForm.email}</strong> and <strong>{regForm.mobile}</strong>.
                  </p>
                </div>

                {/* 6 Digit Input Boxes */}
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`reg-otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      className="w-10 h-12 text-center text-lg font-bold rounded-xl border-2 border-slate-300 focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 bg-slate-50"
                    />
                  ))}
                </div>

                {/* Demo Helper */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 max-w-sm mx-auto flex items-center justify-between">
                  <span>Demo Code: <strong>482916</strong></span>
                  <button
                    type="button"
                    onClick={() => setOtpDigits(['4', '8', '2', '9', '1', '6'])}
                    className="text-emerald-700 hover:text-emerald-800 font-semibold text-xs cursor-pointer"
                  >
                    Auto-Fill Code
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOtpStep(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Back to Form
                  </button>
                  <button
                    type="button"
                    disabled={isVerifying || otpVerifiedSuccess}
                    onClick={handleCompleteRegistration}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : otpVerifiedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Verified! Entering Portal...</span>
                      </>
                    ) : (
                      <span>Confirm & Register</span>
                    )}
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Sign In to pathwise.</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter your registered student email or mobile number to continue.
                </p>
              </div>

              {/* Role Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Portal Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['student', 'mentor', 'admin'] as const).map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRole(r)}
                      className={`py-2 text-xs font-semibold rounded-lg capitalize border transition-all cursor-pointer ${
                        selectedRole === r
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {r === 'student' ? 'Student' : (r === 'mentor' ? 'TPO / Mentor' : 'DEET Admin')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="ananya.sharma@jntuh.ac.in"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  OTP / Access Token (Demo: 123456)
                </label>
                <input
                  type="password"
                  value={loginOtp}
                  onChange={(e) => setLoginOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP or Password"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Sign In & Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Login Presets */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block text-center">
                  Instant Test Logins:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLoginAs('Ananya Sharma', 'ananya.sharma@jntuh.ac.in', 'student')}
                    className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-medium text-left cursor-pointer"
                  >
                    <div className="font-bold">Ananya Sharma</div>
                    <div className="text-[10px] text-emerald-600">Student (B.Tech CSE · 72 Readiness)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLoginAs('Dr. K. V. S. Ramarao', 'ramarao.tpo@jntuh.ac.in', 'mentor')}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium text-left cursor-pointer"
                  >
                    <div className="font-bold">Dr. K. V. S. Ramarao</div>
                    <div className="text-[10px] text-slate-500">TPO Mentor & Faculty</div>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="max-w-xl mx-auto text-center text-xs text-slate-400 mt-6 pb-2">
        Government of Telangana · Digital Employment Exchange of Telangana (DEET) · TASK Placement Portal
      </div>

    </div>
  );
};
