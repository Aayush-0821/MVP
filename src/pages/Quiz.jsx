import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthProvider';

// --- Quiz Data (fallback) ---
const DEFAULT_QUESTIONS = [
  {
    question: "What does 'encryption' mean in cybersecurity?",
    answers: [
      { text: "Converting data into a secret code", correct: true },
      { text: "Deleting all data", correct: false },
      { text: "Backing up data", correct: false },
      { text: "Sharing files publicly", correct: false },
    ],
  },
  {
    question: "Which of the following is a strong password?",
    answers: [
      { text: "password123", correct: false },
      { text: "qwerty", correct: false },
      { text: "H@ckMe2025!", correct: true },
      { text: "myname123", correct: false },
    ],
  },
  {
    question: "What does 'HTTPS' mean in a website URL?",
    answers: [
      { text: "HyperText Transfer Protocol Secure", correct: true },
      { text: "High Transfer Text Protocol", correct: false },
      { text: "HyperText Transmission Path", correct: false },
      { text: "Home Transfer Protocol Service", correct: false },
    ],
  },
  {
    question: "What is phishing?",
    answers: [
      { text: "Catching real fish", correct: false },
      { text: "Sending fake emails to steal information", correct: true },
      { text: "Encrypting your messages", correct: false },
      { text: "Updating your antivirus", correct: false },
    ],
  },
  {
    question: "Which of the following helps protect your computer?",
    answers: [
      { text: "Firewall", correct: true },
      { text: "Malware", correct: false },
      { text: "Spyware", correct: false },
      { text: "Phishing link", correct: false },
    ],
  },
];

export default function Quiz() {
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);

  // --- State ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const { user, initializing } = useAuth();

  // --- Leaderboard State ---
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  // Load Questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const { data: quiz, error: quizErr } = await supabase.from('quizzes').select('id').eq('slug', 'encryption-quiz').limit(1).single();
        if (quizErr || !quiz) {
          console.warn('Could not load quiz id, using default questions', quizErr?.message);
          return;
        }
        const { data: qData, error } = await supabase.from('questions').select('*').eq('quiz_id', quiz.id).order('id', { ascending: true });
        if (error) {
          console.error('Failed to load questions from DB:', error.message);
          return;
        }
        if (qData && qData.length > 0) {
          const mapped = qData.map(q => ({ question: q.question_text, answers: q.answers }));
          setQuestions(mapped);
        }
      } catch (err) {
        console.error('Error loading questions:', err);
      }
    };
    loadQuestions();
  }, []);

  // Load Leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data: lbData, error: lbError } = await supabase
          .from('leaderboard')
          .select('*')
          .limit(10);

        if (lbError) {
          console.error('Failed to fetch leaderboard:', lbError.message);
        } else {
          setLeaderboard(lbData ?? []);
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoadingLeaderboard(false);
      }
    };
    fetchLeaderboard();
  }, []);

  // --- Event Handlers ---

  const handleAnswerSelect = (answer) => {
    if (isAnswerChecked) return; // Prevent changing answer

    setSelectedAnswer(answer);
    setIsAnswerChecked(true);

    if (answer.correct) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextButton = () => {
    // Reset answer state
    setSelectedAnswer(null);
    setIsAnswerChecked(false);

    // Move to next question or show score
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setShowScore(false);
  };

  // --- Helper Functions & Variables ---

  const getButtonClass = (answer) => {
    const baseClass = "p-4 rounded-lg border-2 text-left w-full transition-all duration-200 font-medium text-gray-800 dark:text-white";

    if (!isAnswerChecked) {
      return `${baseClass} border-gray-300 hover:bg-pink-100 cursor-pointer`;
    }

    // Answer is checked
    const isCorrect = answer.correct;
    const isSelected = selectedAnswer === answer;

    if (isCorrect) {
      return `${baseClass} bg-green-100 border-green-500 text-green-800 dark:text-green-200 font-semibold`;
    }

    if (isSelected && !isCorrect) {
      return `${baseClass} bg-red-100 border-red-500 text-red-800 dark:text-red-200 font-semibold`;
    }

    // Default for unchecked, incorrect answers after selection
    return `${baseClass} border-gray-300 opacity-60 cursor-not-allowed`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = showScore ? 100 : (currentQuestionIndex / questions.length) * 100;
  const answerIcons = ["🌱", "📘", "🧠", "👑"];

  // Save result to Supabase when quiz finishes
  useEffect(() => {
    if (!showScore) return;

    const saveResult = async () => {
      try {
        const payload = {
          user_id: user?.id ?? null,
          user_email: user?.email ?? null,
          quiz: 'encryption-quiz',
          score: score,
          max_score: questions.length,
          metadata: { total_questions: questions.length }
        };
        const { error } = await supabase.from('results').insert([payload]);
        if (error) console.error('Failed to save quiz result:', error.message);
      } catch (err) {
        console.error('Error saving quiz result:', err);
      }
    };

    saveResult();
  }, [showScore, user, score, questions.length]);

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Login Required</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Please log in or sign up to take the quiz and track your progress on the leaderboard.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="/login"
              className="inline-block w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Log In
            </a>
            <a
              href="/login?mode=signup"
              className="inline-block w-full bg-white dark:bg-gray-700 text-pink-600 dark:text-pink-400 border-2 border-pink-600 dark:border-pink-400 font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">

      {/* --- Main Quiz Container --- */}
      <main className="flex flex-col items-center py-10 md:py-20 px-4 gap-8">
        <div className="app w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-10 dark:bg-gray-800 dark:text-white">

          {showScore ? (
            // --- Score View ---
            <div className="text-center fade-in">
              <h1 className="text-3xl font-bold mb-4">🎉 You scored {score} out of {questions.length}!</h1>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 my-6">
                <div
                  className="bg-pink-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `100%` }}
                ></div>
              </div>

              <button
                onClick={handlePlayAgain}
                className="w-full bg-pink-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-pink-700 transition-all text-lg shadow-lg"
              >
                Play Again
              </button>
            </div>

          ) : (
            // --- Quiz View ---
            <div className="fade-in">
              <h1 className="text-2xl md:text-3xl font-bold">
                Test Your Encryption <span className="text-pink-500">Knowledge</span>
              </h1>
              <p className="text-gray-600 mt-2 mb-4">Level up your encryption knowledge!</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 my-6">
                <div
                  className="bg-pink-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Question */}
              <div className="quiz">
                <h2 id="question" className="text-xl md:text-2xl font-semibold my-6 min-h-[4rem]">
                  {currentQuestionIndex + 1}. {currentQuestion.question}
                </h2>

                {/* Answers */}
                <div id="answer-buttons" className="grid grid-cols-1 gap-4">
                  {currentQuestion.answers.map((answer, index) => (
                    <button
                      key={index}
                      className={getButtonClass(answer)}
                      onClick={() => handleAnswerSelect(answer)}
                      disabled={isAnswerChecked}
                    >
                      <span className="mr-2">{answerIcons[index % answerIcons.length]}</span>
                      {answer.text}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                {isAnswerChecked && (
                  <button
                    id="next-btn"
                    onClick={handleNextButton}
                    className="w-full bg-pink-600 text-white font-semibold py-3 px-5 rounded-lg hover:bg-pink-700 transition-all mt-8 text-lg shadow-lg animate-pulse"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* --- Leaderboard Section --- */}
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white flex items-center gap-2">
            🏆 Leaderboard
          </h2>
          {loadingLeaderboard ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-pulse">
              Loading leaderboard...
            </div>
          ) : (
            <div className="overflow-hidden">
              {leaderboard.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No scores yet. Be the first!
                </div>
              )}
              {leaderboard.map((row, idx) => (
                <div key={idx} className={`p-4 flex justify-between items-center border-b last:border-b-0 dark:border-gray-700 transition-all hover:bg-pink-50 dark:hover:bg-pink-900/10 ${idx < 3 ? 'bg-gradient-to-r from-pink-50 to-transparent dark:from-pink-900/20' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shadow-md ${idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                      idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                        idx === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                          'bg-gradient-to-br from-pink-400 to-pink-600 text-white'
                      }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">
                        {row.username ?? row.display_name ?? row.user_email ?? 'Anonymous'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(row.latest_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{row.best_score}</div>
                    {idx === 0 && <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-1 rounded-full">👑 Leader</span>}
                    {idx === 1 && <span className="text-xs bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">🥈 2nd</span>}
                    {idx === 2 && <span className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 px-2 py-1 rounded-full">🥉 3rd</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}