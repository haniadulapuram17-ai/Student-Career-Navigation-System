import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Check, RefreshCw } from 'lucide-react';
import { Degree, Branch } from '../types';

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

export const AuthModal: React.FC = () => {
  const { user, updateProfile, authModalOpen, setAuthModalOpen } = useApp();

  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    mobile: user.mobile || '',
    collegeName: user.collegeName || TELANGANA_COLLEGES[0],
    degree: user.degree || 'B.Tech',
    branch: user.branch || 'Computer Science & Engineering (CSE)',
    graduationYear: user.graduationYear || 2026,
    cgpa: user.cgpa || 8.5,
    academicDetails: user.academicDetails || '',
    targetRole: user.targetRole || 'Full Stack Engineer'
  });

  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['7', '4', '9', '2', '8', '1']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  if (!authModalOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cgpa' ? parseFloat(value) || 0 : (name === 'graduationYear' ? parseInt(value) || 2026 : value)
    }));
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpStep(true);
    setResendTimer(30);
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpCode];
    updated[index] = val;
    setOtpCode(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setOtpSuccess(true);
      updateProfile({
        ...formData,
        isOtpVerified: true
      });
      setTimeout(() => {
        setOtpStep(false);
        setOtpSuccess(false);
        setAuthModalOpen(false);
      }, 1200);
    }, 900);
  };

  const handleSaveWithoutOtp = () => {
    updateProfile(formData);
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {otpStep ? 'Verify Registration OTP' : 'Student Academic Registration & Profile'}
            </h2>
            <p className="text-xs text-slate-500">
              {otpStep 
                ? `6-digit authentication token sent to ${formData.email || formData.mobile}`
                : 'Registered with DEET & Telangana Academy for Skill and Knowledge (TASK)'}
            </p>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Srikanth Rao Goud"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (College / Personal) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="srikanth.goud@jntuh.ac.in"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Row 2: Mobile & College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+91 98480 22334"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College / University <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                  >
                    {TELANGANA_COLLEGES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Degree & Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
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
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                  >
                    {BRANCHES.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Graduation Year & CGPA */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Graduation Year <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                  >
                    <option value={2024}>2024 (Passed Out)</option>
                    <option value={2025}>2025 (Final Year)</option>
                    <option value={2026}>2026 (Pre-Final Year)</option>
                    <option value={2027}>2027 (Sophomore)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cumulative CGPA (out of 10) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="4.0"
                    max="10.0"
                    name="cgpa"
                    required
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    placeholder="8.65"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Job Role
                  </label>
                  <input
                    type="text"
                    name="targetRole"
                    value={formData.targetRole}
                    onChange={handleInputChange}
                    placeholder="Full Stack Developer"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Academic Highlights & Details */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Honors, Hackathons & TASK ID
                </label>
                <textarea
                  name="academicDetails"
                  rows={2}
                  value={formData.academicDetails}
                  onChange={handleInputChange}
                  placeholder="e.g. TASK Member ID: TASK-HYD-2024-8849. Winner of Telangana Smart Campus Hackathon."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleSaveWithoutOtp}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Save Profile Directly
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify with OTP & Register</span>
                </button>
              </div>
            </form>
          ) : (
            /* OTP Verification Screen */
            <div className="py-4 text-center space-y-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Enter 6-Digit Verification Code</h3>
                <p className="text-xs text-slate-500 mt-1">
                  We sent a one-time password to <span className="font-semibold text-slate-700">{formData.email}</span> and <span className="font-semibold text-slate-700">{formData.mobile}</span>
                </p>
              </div>

              {/* 6 Digit Input Boxes */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                    className="w-10 h-12 text-center text-lg font-bold rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 bg-slate-50"
                  />
                ))}
              </div>

              {/* Demo Helper */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 max-w-sm mx-auto flex items-center justify-between">
                <span>Demo Code: <strong>749281</strong></span>
                <button
                  type="button"
                  onClick={() => setOtpCode(['7', '4', '9', '2', '8', '1'])}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold text-xs"
                >
                  Fill Code
                </button>
              </div>

              {/* Resend Timer */}
              <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
                <span>Didn't receive code?</span>
                <button
                  type="button"
                  disabled={resendTimer > 0}
                  onClick={() => setResendTimer(30)}
                  className="text-emerald-700 font-medium hover:underline disabled:text-slate-400 disabled:no-underline"
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                </button>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Back to Details
                </button>
                <button
                  type="button"
                  disabled={isVerifying || otpSuccess}
                  onClick={handleVerifyOtp}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying Token...</span>
                    </>
                  ) : otpSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Verified Successfully!</span>
                    </>
                  ) : (
                    <span>Confirm & Authorize</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
