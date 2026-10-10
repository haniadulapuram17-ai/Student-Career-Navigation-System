import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  Send, 
  Award, 
  User, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  FileText,
  Plus
} from 'lucide-react';
import { MentorFeedback } from '../types';

export const MentorPortal: React.FC = () => {
  const { 
    user, 
    currentRole, 
    mentorFeedbacks, 
    addMentorFeedback, 
    directMessages, 
    sendDirectMessage 
  } = useApp();

  const [activeMentorTab, setActiveMentorTab] = useState<'feedback' | 'messages'>('messages');
  const [chatInput, setChatInput] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState<'Resume' | 'Interview' | 'Technical Skills' | 'Overall Readiness'>('Interview');
  const [feedbackScore, setFeedbackScore] = useState(88);
  const [feedbackComments, setFeedbackComments] = useState('');
  const [feedbackActions, setFeedbackActions] = useState('Practice STAR responses for system design; Complete TASK cloud lab');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendDirectMessage('mentor-01', chatInput.trim());
    setChatInput('');
  };

  const handleQuickTemplate = (text: string) => {
    setChatInput(text);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComments.trim()) return;

    addMentorFeedback({
      mentorName: currentRole === 'mentor' ? 'Dr. K. V. S. Ramarao' : 'Prof. Placement Coordinator',
      mentorRole: 'Professor & Head of Training & Placement, JNTUH',
      studentId: user.id,
      category: feedbackCategory,
      score: feedbackScore,
      comments: feedbackComments,
      recommendedActions: feedbackActions.split(';').map(s => s.trim()).filter(Boolean)
    });

    setFeedbackSuccess(true);
    setFeedbackComments('');
    setTimeout(() => setFeedbackSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Mentorship & Training Cell
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">JNTUH & TASK Accredited Guidance</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Mentor Feedback & Direct Secure Messaging
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              1-on-1 direct communication between students and faculty mentors/TPO coordinators. Review student readiness scores and exchange personalized placement guidance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveMentorTab('messages')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeMentorTab === 'messages'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Chat ({directMessages.length})</span>
            </button>
            <button
              onClick={() => setActiveMentorTab('feedback')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeMentorTab === 'feedback'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Formal Evaluations ({mentorFeedbacks.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeMentorTab === 'messages' ? (
        /* Direct 1-on-1 Secure Messaging Interface */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Active Contact Information (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-11 h-11 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
                  KR
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Dr. K. V. S. Ramarao</h3>
                  <p className="text-[11px] text-slate-500">TPO Mentor & TASK Liaison</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Online & Available</span>
                  </span>
                </div>
              </div>

              {/* Mentee Profile Summary */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">Student Record</span>
                <div className="flex justify-between text-slate-600">
                  <span>Name:</span>
                  <span className="font-semibold text-slate-900">{user.fullName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Degree & Branch:</span>
                  <span className="font-semibold text-slate-900">{user.degree} · {user.branch.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Readiness Index:</span>
                  <span className="font-bold text-emerald-700">{user.readinessScore}/100</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Target Role:</span>
                  <span className="font-semibold text-slate-900">{user.targetRole}</span>
                </div>
              </div>

              {/* Quick Prompt Templates */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Quick Advice Prompts:
                </span>
                <div className="space-y-1.5">
                  {[
                    'Sir, could you review my latest mock interview evaluation for Tech Mahindra?',
                    'How should I explain my Agri-Market project during the technical round?',
                    'Are there specific NPTEL courses you recommend for Cloud architecture?'
                  ].map((tpl, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickTemplate(tpl)}
                      className="w-full text-left p-2 rounded-md bg-slate-50 hover:bg-emerald-50 text-[11px] text-slate-700 hover:text-emerald-900 border border-slate-200 transition-colors"
                    >
                      "{tpl}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Window (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col h-[560px] overflow-hidden">
            
            {/* Chat Header */}
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">Direct End-to-End Encrypted Advisory Channel</span>
              </div>
              <span className="text-[10px] text-slate-400">Authenticated Session</span>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3.5 bg-slate-50/30">
              {directMessages.map((msg) => {
                const isMe = currentRole === 'student' ? msg.senderRole === 'student' : msg.senderRole === 'mentor';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[11px] font-bold text-slate-700">
                        {isMe ? 'You' : msg.senderName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-xl max-w-md text-xs leading-relaxed ${
                        isMe
                          ? 'bg-emerald-600 text-white rounded-br-none shadow-2xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3.5 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message to mentor..."
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>

        </div>
      ) : (
        /* Formal Evaluations Tab */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Post Feedback Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Submit Mentor Placement Evaluation</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Official faculty assessment recorded into the student's placement dossier.
              </p>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Evaluation Category</label>
                <select
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Interview">Mock Interview Performance</option>
                  <option value="Resume">Resume & ATS Screening</option>
                  <option value="Technical Skills">Core Technical Knowledge</option>
                  <option value="Overall Readiness">Overall Placement Readiness</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700">Evaluation Score</label>
                  <span className="font-bold text-emerald-700">{feedbackScore}/100</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={feedbackScore}
                  onChange={(e) => setFeedbackScore(parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Qualitative Assessment & Remarks *
                </label>
                <textarea
                  rows={4}
                  required
                  value={feedbackComments}
                  onChange={(e) => setFeedbackComments(e.target.value)}
                  placeholder="Provide specific feedback on student's problem solving, communication clarity, and technical readiness..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Recommended Action Steps (semicolon separated)
                </label>
                <input
                  type="text"
                  value={feedbackActions}
                  onChange={(e) => setFeedbackActions(e.target.value)}
                  placeholder="e.g. Practice STAR method; Revise database indexing"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Evaluation Report</span>
              </button>

              {feedbackSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-center font-medium">
                  Evaluation published and synchronized with student's profile!
                </div>
              )}
            </form>
          </div>

          {/* Historical Feedbacks List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Evaluations History ({mentorFeedbacks.length})
            </h3>

            <div className="space-y-3.5">
              {mentorFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                        {fb.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">{fb.mentorName}</h4>
                      <p className="text-[11px] text-slate-500">{fb.mentorRole}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-extrabold text-slate-900">{fb.score}%</div>
                      <div className="text-[10px] text-slate-400">{fb.date}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    "{fb.comments}"
                  </p>

                  {fb.recommendedActions && fb.recommendedActions.length > 0 && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Action Items from Mentor:
                      </span>
                      <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                        {fb.recommendedActions.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
