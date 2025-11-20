import React, { useState, useEffect } from 'react';

const QUESTIONS = [
  {
    id: 1,
    question: "Which protocol is used to securely transmit data over the internet?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct: 2,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) uses encryption (TLS/SSL) to secure communications."
  },
  {
    id: 2,
    question: "What is a common method used by attackers to trick users into revealing sensitive information?",
    options: ["Phishing", "Firewalling", "Encryption", "Hashing"],
    correct: 0,
    explanation: "Phishing involves sending fraudulent communications that appear to come from a reputable source."
  },
  {
    id: 3,
    question: "Which of the following is a strong password practice?",
    options: ["Using 'password123'", "Using the same password everywhere", "Using a mix of chars, numbers & symbols", "Writing it on a sticky note"],
    correct: 2,
    explanation: "Strong passwords should be complex and unique to prevent brute-force attacks."
  },
  {
    id: 4,
    question: "What does 2FA stand for?",
    options: ["Two-Factor Authentication", "To For All", "Two-Fast Access", "Total File Access"],
    correct: 0,
    explanation: "2FA adds an extra layer of security by requiring two distinct forms of identification."
  },
  {
    id: 5,
    question: "What software is designed to block unauthorized access to a computer network?",
    options: ["Antivirus", "Firewall", "Spyware", "Malware"],
    correct: 1,
    explanation: "A firewall monitors and controls incoming and outgoing network traffic based on security rules."
  }
];

// Icons
const ShieldIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const LockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const AlertTriangleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
);
const TerminalIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
);
const PlayIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3" /></svg>
);
const CheckCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);
const XCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
);
const RefreshCwIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
);

export default function Quiz1() {
  const [gameState, setGameState] = useState('start'); // start, playing, won, lost
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [streak, setStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setHealth(100);
    setStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setFeedback(null);
  };

  const handleAnswer = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const correct = QUESTIONS[currentQuestion].correct === index;

    if (correct) {
      setFeedback('correct');
      const points = 100 + (streak * 20);
      setScore(s => s + points);
      setStreak(s => s + 1);
    } else {
      setFeedback('incorrect');
      setHealth(h => Math.max(0, h - 25));
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (health <= 0) {
      setGameState('lost');
      return;
    }

    if (currentQuestion + 1 >= QUESTIONS.length) {
      setGameState('won');
    } else {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setFeedback(null);
    }
  };

  useEffect(() => {
    if (health <= 0 && isAnswered) {
      const timer = setTimeout(() => setGameState('lost'), 1500);
      return () => clearTimeout(timer);
    }
  }, [health, isAnswered]);


  return (
    <div className="min-h-screen bg-slate-950 text-cyan-50 font-mono p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* Header */}
      <div className="z-10 w-full max-w-4xl mb-8 flex justify-between items-center border-b border-cyan-900/50 pb-4">
        <div className="flex items-center gap-3">
          <ShieldIcon className="w-8 h-8 text-cyan-400" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            CYBER DEFENSE <span className="text-slate-500">PROTOCOL</span>
          </h1>
        </div>
        <div className="flex items-center gap-6 text-sm md:text-base">
          <div className="flex flex-col items-end">
            <span className="text-slate-400 text-xs uppercase tracking-widest">System Integrity</span>
            <div className="w-32 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${health > 50 ? 'bg-emerald-500' : health > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${health}%` }}
              />
            </div>
          </div>
          <div className="text-right">
            <div className="text-slate-400 text-xs uppercase tracking-widest">Score</div>
            <div className="text-xl font-bold text-cyan-400">{score}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-3xl">

        {gameState === 'start' && (
          <div className="bg-slate-900/50 backdrop-blur-md border border-cyan-900/50 rounded-2xl p-12 text-center shadow-2xl shadow-cyan-900/20">
            <div className="w-24 h-24 bg-cyan-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30 animate-pulse">
              <LockIcon className="w-12 h-12 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">System Lockdown Initiated</h2>
            <p className="text-slate-400 mb-8 text-lg max-w-lg mx-auto">
              Your network is under attack. Answer security protocols correctly to maintain firewall integrity.
              <br /><span className="text-red-400 text-sm mt-2 block">Warning: 4 failed attempts will result in a breach.</span>
            </p>
            <button
              onClick={startGame}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold tracking-wider transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer"
            >
              <PlayIcon className="w-5 h-5 fill-current" />
              INITIALIZE DEFENSE
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
            {/* Question Header */}
            <div className="bg-slate-800/50 p-6 border-b border-slate-700 flex justify-between items-center">
              <span className="text-cyan-400 font-mono text-sm">
                THREAT_LEVEL_{currentQuestion + 1}/{QUESTIONS.length}
              </span>
              <div className="flex gap-1">
                {[...Array(QUESTIONS.length)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i < currentQuestion ? 'bg-cyan-500' : i === currentQuestion ? 'bg-white animate-pulse' : 'bg-slate-700'}`}
                  />
                ))}
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed">
                {QUESTIONS[currentQuestion].question}
              </h3>

              <div className="grid gap-4">
                {QUESTIONS[currentQuestion].options.map((option, index) => {
                  let stateStyle = "border-slate-700 hover:border-cyan-500 hover:bg-slate-800/50";
                  if (isAnswered) {
                    if (index === QUESTIONS[currentQuestion].correct) {
                      stateStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                    } else if (index === selectedOption) {
                      stateStyle = "border-red-500 bg-red-500/10 text-red-400";
                    } else {
                      stateStyle = "border-slate-800 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group cursor-pointer ${stateStyle}`}
                    >
                      <span className="font-medium">{option}</span>
                      {isAnswered && index === QUESTIONS[currentQuestion].correct && <CheckCircleIcon className="w-5 h-5 text-emerald-500" />}
                      {isAnswered && index === selectedOption && index !== QUESTIONS[currentQuestion].correct && <XCircleIcon className="w-5 h-5 text-red-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer / Feedback */}
            {isAnswered && (
              <div className="bg-slate-950/50 p-6 border-t border-slate-800 flex justify-between items-center animate-in slide-in-from-bottom-4 fade-in">
                <div className="max-w-lg">
                  <p className={`font-bold mb-1 ${feedback === 'correct' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {feedback === 'correct' ? 'ACCESS GRANTED' : 'SECURITY BREACH DETECTED'}
                  </p>
                  <p className="text-slate-400 text-sm">{QUESTIONS[currentQuestion].explanation}</p>
                </div>
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 bg-slate-100 hover:bg-white text-slate-900 rounded-lg font-bold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {currentQuestion + 1 === QUESTIONS.length ? 'FINISH' : 'NEXT'}
                  <TerminalIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {gameState === 'won' && (
          <div className="bg-slate-900/50 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-12 text-center shadow-2xl shadow-emerald-900/20">
            <div className="w-24 h-24 bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
              <ShieldIcon className="w-12 h-12 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">System Secured</h2>
            <p className="text-emerald-400 mb-8 text-lg">All threats neutralized successfully.</p>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
              <div className="bg-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 text-xs uppercase">Final Score</div>
                <div className="text-2xl font-bold text-white">{score}</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 text-xs uppercase">Integrity</div>
                <div className="text-2xl font-bold text-emerald-400">{health}%</div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-all cursor-pointer"
            >
              <RefreshCwIcon className="w-5 h-5" />
              REBOOT SYSTEM
            </button>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="bg-slate-900/50 backdrop-blur-md border border-red-500/30 rounded-2xl p-12 text-center shadow-2xl shadow-red-900/20">
            <div className="w-24 h-24 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
              <AlertTriangleIcon className="w-12 h-12 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">System Compromised</h2>
            <p className="text-red-400 mb-8 text-lg">Firewall integrity critical. Breach successful.</p>

            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-all cursor-pointer"
            >
              <RefreshCwIcon className="w-5 h-5" />
              INITIATE RECOVERY
            </button>
          </div>
        )}

      </div>
    </div>
  );
}