import React, { useState } from "react";

const GetStarted = () => {
  const questions = [
    {
      question: "What's your experience level with encryption?",
      options: [
        { text: "Beginner - Just starting to learn", icon: "🌱" },
        { text: "Novice - Know some basic concepts", icon: "🧙‍♂️" },
        { text: "Intermediate - Comfortable with common algorithms", icon: "🚀" },
        { text: "Advanced - Can implement encryption systems", icon: "👑" },
      ],
      quirkyMessage: "Everyone starts somewhere! Even experts were beginners once.",
    },
    {
      question: "What's your primary goal for learning encryption?",
      options: [
        { text: "Career advancement in cybersecurity", icon: "💼" },
        { text: "Personal knowledge and privacy protection", icon: "🛡️" },
        { text: "Academic studies or research", icon: "🎓" },
        { text: "Developing secure applications", icon: "💻" },
      ],
    },
    {
      question: "How do you prefer to learn complex topics?",
      options: [
        { text: "Hands-on practice and experimentation", icon: "🖐️" },
        { text: "Visual explanations and diagrams", icon: "📊" },
        { text: "Step-by-step guided tutorials", icon: "🧭" },
        { text: "Theoretical foundations first", icon: "📖" },
      ],
      quirkyMessage: "Understanding your learning style is the first step to mastery! 🧠",
    },
    {
      question: "Which encryption concept interests you most?",
      options: [
        { text: "Symmetric encryption (AES, DES)", icon: "🔑" },
        { text: "Asymmetric encryption (RSA, ECC)", icon: "🗝️" },
        { text: "Hashing algorithms (SHA, MD5)", icon: "🌀" },
        { text: "Cryptographic protocols (SSL/TLS, PGP)", icon: "🔒" },
      ],
      quirkyMessage: "Each of these is a crucial piece of the cybersecurity puzzle! 🔐",
    },
    {
      question: "How much time can you dedicate to learning each week?",
      options: [
        { text: "1-3 hours", icon: "⏰" },
        { text: "3-5 hours", icon: "⏳" },
        { text: "5-10 hours", icon: "📅" },
        { text: "10+ hours", icon: "📆" },
      ],
      quirkyMessage: "Consistency matters more than intensity when learning new skills! ⏱️",
    },
  ];

  const transitionMessages = [
    {
      title: "Great start!",
      message: "You're thinking like a cryptographer already!",
      submessage: "Fun fact: Ancient Spartans used a device called a 'scytale' to encrypt messages!",
    },
    {
      title: "Halfway there!",
      message: "You're unlocking the secrets of encryption!",
      submessage: "The Enigma machine was considered unbreakable until Alan Turing cracked it.",
    },
    {
      title: "Almost there!",
      message: "You're becoming a cipher master!",
      submessage: "‘Cipher’ comes from the Arabic word ‘sifr’, meaning ‘zero’.",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
  const [finished, setFinished] = useState(false);

  const totalQuestions = questions.length;

  const handleSelect = (index) => setSelectedOption(index);

  const handleAnswer = () => {
    if (selectedOption === null) {
      alert("Please select an option!");
      return;
    }
    setProgress(((currentQuestion + 1) / totalQuestions) * 100);

    if (currentQuestion < totalQuestions - 1) {
      setShowTransition(true);
      setTimeout(() => {
        setShowTransition(false);
        setSelectedOption(null);
        setCurrentQuestion((prev) => prev + 1);
      }, 2000);
    } else {
      setProgress(100);
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setProgress(0);
    setShowTransition(false);
    setFinished(false);
  };

  const ProgressBar = () => (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-600">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  const TransitionScreen = () => {
    const transition = transitionMessages[Math.min(currentQuestion, transitionMessages.length - 1)];
    return (
      <div className="text-center flex flex-col items-center justify-center space-y-3 mt-10">
        <div className="text-5xl">🔓</div>
        <h2 className="text-xl font-bold text-indigo-700">{transition.title}</h2>
        <p className="text-gray-600">{transition.message}</p>
        <p className="text-gray-500 text-sm">{transition.submessage}</p>
        <div className="flex space-x-3 text-2xl mt-4">
          <span>💻</span> <span>🔑</span> <span>🧠</span>
        </div>
      </div>
    );
  };

  const CompletionScreen = () => (
    <div className="text-center flex flex-col items-center justify-center mt-10 space-y-4">
      <div className="text-5xl">🏆</div>
      <h2 className="text-2xl font-semibold text-indigo-700">Quiz Complete!</h2>
      <p className="text-gray-600">Thanks for sharing your learning preferences!</p>
      <div className="bg-indigo-100 border border-indigo-300 rounded-lg p-4 text-indigo-700 max-w-md">
        <h3 className="font-semibold mb-2">🎯 Personalized Learning Path Created</h3>
        <p>Based on your answers, we’ve customized your encryption learning journey!</p>
      </div>
      <button
        onClick={restartQuiz}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Restart Quiz
      </button>
    </div>
  );

  const QuestionScreen = () => {
    const q = questions[currentQuestion];
    return (
      <div className="text-center mt-8">
        <h3 className="text-gray-500 text-sm mb-2">
          Question {currentQuestion + 1} of {totalQuestions}
        </h3>
        <h2 className="text-2xl font-semibold text-indigo-800 mb-6">{q.question}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          {q.options.map((option, i) => (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              className={`flex items-center justify-start space-x-3 border rounded-lg p-3 cursor-pointer transition
                ${selectedOption === i ? "bg-indigo-600 text-white" : "bg-white hover:bg-indigo-100 border-gray-300"}
              `}
            >
              <span className="text-xl">{option.icon}</span>
              <span className="text-sm font-medium">{option.text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleAnswer}
          className="mt-6 px-8 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {currentQuestion === totalQuestions - 1 ? "Finish" : "Submit Answer"}
        </button>

        {selectedOption !== null && q.quirkyMessage && (
          <p className="mt-4 text-green-600 text-sm">{q.quirkyMessage}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-indigo-800">
            Building a Learning Path for YOU!!
          </h1>
          <p className="text-gray-600 mt-2">Level up your encryption knowledge!</p>
        </div>

        <ProgressBar />

        <div className="mt-6">
          {finished ? (
            <CompletionScreen />
          ) : showTransition ? (
            <TransitionScreen />
          ) : (
            <QuestionScreen />
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
