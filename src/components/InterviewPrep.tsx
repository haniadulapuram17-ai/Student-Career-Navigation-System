import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { 
  Award, 
  Mic, 
  MicOff, 
  Volume2, 
  Send, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Code, 
  Building2, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  Square
} from 'lucide-react';
import { MockInterviewQuestion, AnswerEvaluation } from '../types';

interface WebkitWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

const COMPANY_PRESETS = [
  { name: 'Tech Mahindra (Associate Full Stack)', role: 'Associate Full Stack Developer', round: 'technical' as const },
  { name: 'TCS Ninja & Digital (TCS NQT)', role: 'Software Development Trainee', round: 'coding' as const },
  { name: 'ServiceNow IDC (Cloud & Platform)', role: 'Junior Platform Engineer', round: 'technical' as const },
  { name: 'Telangana DEET Core HR Round', role: 'Campus Graduate Trainee', round: 'hr' as const },
];

export const InterviewPrep: React.FC = () => {
  const { user, addInterviewRecord, interviewRecords } = useApp();

  const [roundType, setRoundType] = useState<'technical' | 'hr' | 'coding'>('technical');
  const [targetRole, setTargetRole] = useState<string>(user.targetRole || 'Full Stack Software Engineer');
  const [difficulty, setDifficulty] = useState<string>('medium');
  const [generatingQuestion, setGeneratingQuestion] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState<MockInterviewQuestion>({
    id: 'q-init',
    question: 'How do you handle client-side state management in modern React applications, and how would you optimize components to avoid unnecessary re-renders in a heavy data dashboard?',
    category: 'React Architecture & Performance',
    expectedPoints: [
      'Component local state (useState/useReducer) vs Global state (Context/Redux/Zustand)',
      'Use of React.memo, useMemo, and useCallback to stabilize referential equality',
      'Virtualization techniques for rendering large datasets'
    ],
    round: 'technical'
  });

  const [userAnswer, setUserAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);

  // Voice Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Coding round editor state
  const [codingAnswer, setCodingAnswer] = useState(
    `function solvePlacementProblem(input: number[]): number {\n  // Write your efficient solution here\n  return 0;\n}`
  );

  useEffect(() => {
    const customWindow = window as unknown as WebkitWindow;
    const SpeechRec = customWindow.SpeechRecognition || customWindow.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript) {
            setUserAnswer(prev => (prev ? `${prev} ${transcript}` : transcript));
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch {
        setSpeechSupported(false);
      }
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Speech recognition start error', e);
      }
    }
  };

  const speakQuestion = () => {
    if (!window.speechSynthesis) return;

    if (isSpeakingQuestion) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuestion(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeakingQuestion(false);
    utterance.onerror = () => setIsSpeakingQuestion(false);
    setIsSpeakingQuestion(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleFetchNewQuestion = async (presetRole?: string, presetRound?: 'technical' | 'hr' | 'coding') => {
    const selectedRound = presetRound || roundType;
    const selectedRoleName = presetRole || targetRole;
    setGeneratingQuestion(true);
    setEvaluation(null);
    setUserAnswer('');
    window.speechSynthesis?.cancel();
    setIsSpeakingQuestion(false);

    try {
      const res = await apiService.getInterviewQuestion(selectedRoleName, selectedRound, difficulty, [currentQuestion.question]);
      if (res.success) {
        setCurrentQuestion({
          id: `q-${Date.now()}`,
          question: res.question,
          category: res.category,
          expectedPoints: res.expectedPoints,
          codeSnippet: res.codeSnippet,
          round: selectedRound
        });
        if (res.codeSnippet) {
          setCodingAnswer(res.codeSnippet);
        }
      }
    } finally {
      setGeneratingQuestion(false);
    }
  };

  const handleSubmitAnswer = async () => {
    const answerToEvaluate = roundType === 'coding' ? codingAnswer : userAnswer;
    if (!answerToEvaluate.trim()) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setEvaluating(true);
    try {
      const res = await apiService.evaluateAnswer(
        currentQuestion.question,
        answerToEvaluate,
        targetRole,
        roundType
      );
      if (res.success && res.evaluation) {
        setEvaluation(res.evaluation);
        addInterviewRecord({
          role: targetRole,
          round: roundType,
          question: currentQuestion.question,
          studentAnswer: answerToEvaluate,
          evaluation: res.evaluation
        });
      }
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                DEET & TASK AI Placement Bot
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">Real-time Speech & Coding Evaluation</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Interactive AI Mock Interviewer
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Practice Technical, HR, and Live Coding rounds with real-time voice feedback, speech fluency grading, STAR technique evaluation, and company-specific question tracks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Completed Sessions:</span>
            <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
              {interviewRecords.length}
            </span>
          </div>
        </div>

        {/* Company Quick Presets Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Company Drive Fast-Tracks:
          </span>
          <div className="flex flex-wrap gap-2">
            {COMPANY_PRESETS.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTargetRole(comp.role);
                  setRoundType(comp.round);
                  handleFetchNewQuestion(comp.role, comp.round);
                }}
                className="px-3 py-1.5 text-xs font-medium bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{comp.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Practice Terminal (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            {/* Round Type Switcher */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs">
              {(['technical', 'hr', 'coding'] as const).map(rnd => (
                <button
                  key={rnd}
                  onClick={() => {
                    setRoundType(rnd);
                    handleFetchNewQuestion(targetRole, rnd);
                  }}
                  className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors ${
                    roundType === rnd ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {rnd === 'coding' ? 'Live Coding' : `${rnd} Round`}
                </button>
              ))}
            </div>

            {/* Next Question Trigger */}
            <button
              onClick={() => handleFetchNewQuestion()}
              disabled={generatingQuestion}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${generatingQuestion ? 'animate-spin' : ''}`} />
              <span>Next Question</span>
            </button>
          </div>

          {/* Question Display Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-sm border border-emerald-200">
                {currentQuestion.category}
              </span>

              {/* Text to Speech Button */}
              <button
                onClick={speakQuestion}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  isSpeakingQuestion ? 'bg-emerald-600 text-white animate-pulse' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title="Listen to interviewer voice question"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeakingQuestion ? 'Speaking Question...' : 'Listen Question'}</span>
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900 leading-snug">
              "{currentQuestion.question}"
            </h3>

            {/* Expected Concepts */}
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 block mb-1">Key Evaluation Benchmarks:</span>
              <ul className="list-disc list-inside space-y-0.5">
                {currentQuestion.expectedPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Answer Input Area (Voice, Text, or Code) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-900">
                {roundType === 'coding' ? 'Code Editor (TypeScript / JavaScript)' : 'Your Response'}
              </div>

              {roundType !== 'coding' && speechSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {isListening ? (
                    <>
                      <Square className="w-3.5 h-3.5" />
                      <span>Stop Recording</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Voice Record Answer</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {roundType === 'coding' ? (
              <textarea
                rows={10}
                value={codingAnswer}
                onChange={(e) => setCodingAnswer(e.target.value)}
                className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-lg border border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            ) : (
              <div>
                <textarea
                  rows={6}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Speak into your microphone or type your answer here using the STAR method (Situation, Task, Action, Result)..."
                  className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800"
                />
                {isListening && (
                  <div className="flex items-center gap-2 text-xs text-rose-600 mt-1 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    <span>Microphone is active. Speak clearly into your mic...</span>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                Evaluated with Gemini AI against Telangana recruiter standards
              </span>

              <button
                onClick={handleSubmitAnswer}
                disabled={evaluating || (!userAnswer.trim() && !codingAnswer.trim())}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {evaluating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing Response...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit for AI Evaluation</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: AI Evaluation Report (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {evaluation ? (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4 animate-in fade-in duration-200">
              
              {/* Overall Score Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    AI Performance Verdict
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{evaluation.verdict}</h3>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">{evaluation.score}</span>
                  <span className="text-xs font-bold text-slate-400">/ 100</span>
                </div>
              </div>

              {/* 4 Dimension Metrics */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-500 text-[11px]">Technical Depth</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{evaluation.technicalAccuracy}%</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-500 text-[11px]">Communication Clarity</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{evaluation.communicationClarity}%</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-500 text-[11px]">Confidence & Tone</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{evaluation.confidenceTone}%</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-slate-500 text-[11px]">Grammar & Fluency</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{evaluation.grammarAndFluency}%</div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>What Went Well:</span>
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    {evaluation.strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Areas to Improve:</span>
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    {evaluation.improvements.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Soft Skills Feedback */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                <strong className="block text-slate-900 mb-0.5">Soft Skills & Delivery:</strong>
                {evaluation.softSkillsFeedback}
              </div>

              {/* Exemplary Model Answer (STAR) */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Exemplary STAR Model Answer
                </span>
                <p className="text-emerald-950 leading-relaxed">
                  {evaluation.modelAnswer}
                </p>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 space-y-3">
              <Award className="w-10 h-10 mx-auto text-slate-300" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Ready for Interview Evaluation</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Answer the question using voice or text, then click "Submit for AI Evaluation" to receive scores and STAR feedback.
                </p>
              </div>
            </div>
          )}

          {/* Historical Interview Progress */}
          {interviewRecords.length > 0 && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Interview Session History</span>
                </span>
                <span className="text-[11px] text-slate-500">{interviewRecords.length} records</span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {interviewRecords.slice().reverse().map(rec => (
                  <div key={rec.id} className="p-2 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="truncate max-w-[200px]">
                      <div className="font-semibold text-slate-800 truncate">{rec.question}</div>
                      <div className="text-[10px] text-slate-400 capitalize">{rec.round} · {rec.date}</div>
                    </div>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                      {rec.evaluation.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
