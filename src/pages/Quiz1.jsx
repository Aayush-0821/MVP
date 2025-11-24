import React, { useState } from 'react';

const QUESTIONS = [
  {
    id: 1,
    question: "Which protocol is used to securely transmit data over the internet?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct: 2,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) uses encryption (TLS/SSL) to secure communications between your browser and the website."
  },
  {
    id: 2,
    question: "What is a common method used by attackers to trick users into revealing sensitive information?",
    options: ["Phishing", "Firewalling", "Encryption", "Hashing"],
    correct: 0,
    explanation: "Phishing involves sending fraudulent communications (emails, texts) that appear to come from a reputable source to steal data."
  },
  {
    id: 3,
    question: "Which of the following is a strong password practice?",
    options: ["Using 'password123'", "Using the same password everywhere", "Using a mix of chars, numbers & symbols", "Writing it on a sticky note"],
    correct: 2,
    explanation: "Strong passwords should be complex (mix of characters), unique for each account, and long to prevent brute-force attacks."
  },
  {
    id: 4,
    question: "What does 2FA stand for?",
    options: ["Two-Factor Authentication", "To For All", "Two-Fast Access", "Total File Access"],
    correct: 0,
    explanation: "2FA adds an extra layer of security by requiring two distinct forms of identification (e.g., password + code sent to phone)."
  },
  {
    id: 5,
    question: "What software is designed to block unauthorized access to a computer network?",
    options: ["Antivirus", "Firewall", "Spyware", "Malware"],
    correct: 1,
    explanation: "A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules."
  }
];

export default function Quiz1() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'

  const handleAnswer = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const nextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QUESTIONS.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
      setFeedback(null);
    } else {
      setShowScore(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            🛡️ Cyber Security Basics
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Test your knowledge on essential defense protocols and best practices.
          </p>
        </div>

        {/* Game Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {showScore ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">
                {score === QUESTIONS.length ? "🏆" : score > QUESTIONS.length / 2 ? "👏" : "📚"}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Quiz Complete!
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                You scored <span className="font-bold text-blue-600 dark:text-blue-400">{score}</span> out of {QUESTIONS.length}
              </p>
              <button
                onClick={restartGame}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                  <span>Score: {score}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {QUESTIONS[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="grid gap-4 mb-8">
                {QUESTIONS[currentQuestion].options.map((option, index) => {
                  let buttonStyle = "border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20";

                  if (isAnswered) {
                    if (index === QUESTIONS[currentQuestion].correct) {
                      buttonStyle = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                    } else if (index === selectedOption) {
                      buttonStyle = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                    } else {
                      buttonStyle = "border-gray-200 dark:border-gray-700 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${buttonStyle}`}
                    >
                      <span className="font-medium text-lg text-gray-800 dark:text-gray-200">{option}</span>
                      {isAnswered && index === QUESTIONS[currentQuestion].correct && (
                        <span className="text-green-500 text-xl">✓</span>
                      )}
                      {isAnswered && index === selectedOption && index !== QUESTIONS[currentQuestion].correct && (
                        <span className="text-red-500 text-xl">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next Button */}
              {isAnswered && (
                <div className="animate-fade-in">
                  <div className={`p-4 rounded-lg mb-6 ${feedback === 'correct'
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    }`}>
                    <p className={`font-bold mb-1 ${feedback === 'correct' ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                      }`}>
                      {feedback === 'correct' ? "Correct!" : "Incorrect"}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {QUESTIONS[currentQuestion].explanation}
                    </p>
                  </div>

                  <button
                    onClick={nextQuestion}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition shadow-md"
                  >
                    {currentQuestion + 1 === QUESTIONS.length ? "Finish Quiz" : "Next Question →"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Educational Info */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎓 Key Concepts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Phishing</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                A cybercrime where targets are contacted by email, telephone or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data.
              </p>
            </div>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg">
              <h3 className="font-bold text-cyan-800 dark:text-cyan-300 mb-2">HTTPS & Encryption</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                HTTPS (Hypertext Transfer Protocol Secure) is an extension of HTTP. It is used for secure communication over a computer network, and is widely used on the Internet.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2">Two-Factor Authentication (2FA)</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                A security process in which users provide two different authentication factors to verify themselves. This adds a second layer of security to your accounts.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Firewalls</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                A network security device that monitors incoming and outgoing network traffic and decides whether to allow or block specific traffic based on a defined set of security rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}