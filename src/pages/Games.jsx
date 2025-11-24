import React, { useState } from "react";
import diffieHellman from "../assets/diffie-hellman.jpg";
import pigPen from "../assets/pig-pen.jpg";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 1,
      title: "Cyber Security Basics",
      subtitle: "Defense Protocols & Best Practices",
      description: "Test your knowledge on essential cyber security concepts like Phishing, Strong Passwords, and 2FA.",
      image: diffieHellman,
      route: "/quiz1",
      difficulty: "Beginner",
      duration: "5-10 min",
      tutorial: {
        overview: "Cyber security is the practice of protecting systems, networks, and programs from digital attacks. This quiz tests your fundamental knowledge.",
        howToPlay: [
          "Read the security scenario or question carefully",
          "Select the best course of action from the options",
          "Maintain your System Integrity (health) by answering correctly",
          "Learn from the detailed explanations for each answer",
          "Complete all questions to secure the system"
        ],
        objectives: [
          "Identify common threats like Phishing and Malware",
          "Understand the importance of Strong Passwords and 2FA",
          "Learn about Network Security protocols (HTTPS, Firewalls)"
        ],
        tips: [
          "Phishing emails often create a sense of urgency",
          "HTTPS ensures your connection is encrypted",
          "Never reuse passwords across different accounts"
        ]
      }
    },
    {
      id: 2,
      title: "Pig Pen Cipher",
      subtitle: "Ancient Symbol Cipher",
      description: "Decode secret messages using the ancient Pig Pen cipher. Test your pattern recognition skills!",
      image: pigPen,
      route: "/quiz2",
      difficulty: "Beginner",
      duration: "10-15 min",
      tutorial: {
        overview: "The Pig Pen Cipher is a geometric substitution cipher that replaces letters with symbols based on grids. Used by the Freemasons in the 18th century!",
        howToPlay: [
          "Study the cipher grid that maps letters to symbols",
          "Receive an encrypted message in symbol form",
          "Match each symbol to its corresponding letter",
          "Decode the complete message before the timer runs out",
          "Progress through increasing difficulty levels"
        ],
        objectives: [
          "Master the Pig Pen substitution patterns",
          "Develop pattern recognition and decoding speed",
          "Understand how geometric shapes can represent information"
        ],
        tips: [
          "Grid 1 (A-I) has no dots, Grid 2 (J-R) has dots",
          "X shapes are for S-Z (S-V no dots, W-Z with dots)",
          "Look for common letter patterns (THE, AND) to speed up decoding"
        ]
      }
    },
    {
      id: 3,
      title: "Caesar Cipher Challenge",
      subtitle: "Classic Shift Cipher",
      description: "Crack messages encrypted with the famous Caesar cipher. Learn the technique used by Julius Caesar himself!",
      route: "/caesar-cipher",
      difficulty: "Beginner",
      duration: "10 min",
      tutorial: {
        overview: "The Caesar Cipher shifts each letter in the alphabet by a fixed number of positions. It's a fundamental example of a substitution cipher.",
        howToPlay: [
          "Choose to Encrypt or Decrypt a message",
          "Select a 'Shift' value (the key)",
          "Observe how each letter moves forward or backward in the alphabet",
          "Use the 'Brute Force' tool to try all possible shifts instantly",
          "Analyze the results to find the meaningful message"
        ],
        objectives: [
          "Understand the mechanics of Shift Ciphers",
          "Learn why simple substitution is easy to crack (Brute Force)",
          "Explore Frequency Analysis concepts"
        ],
        tips: [
          "A shift of 13 (ROT13) is its own inverse!",
          "In English, 'E' is the most common letter - look for it",
          "Brute forcing is effective because there are only 25 possible keys"
        ]
      }
    },
    {
      id: 4,
      title: "RSA Encryption Lab",
      subtitle: "Public Key Cryptography",
      description: "Explore the mathematics behind RSA encryption. Generate key pairs and encrypt/decrypt messages.",
      route: "/rsa-game",
      difficulty: "Advanced",
      duration: "25-30 min",
      tutorial: {
        overview: "RSA is an asymmetric cryptographic algorithm using a Public Key for encryption and a Private Key for decryption. It secures most of the internet today.",
        howToPlay: [
          "Step 1: Generate Keys by choosing two prime numbers (p, q)",
          "Step 2: Calculate 'n' (modulus) and 'φ(n)'",
          "Step 3: Encrypt a numeric message using the Public Key (e, n)",
          "Step 4: Decrypt the cipher using the Private Key (d, n)",
          "Verify that the decrypted message matches the original"
        ],
        objectives: [
          "Understand Asymmetric (Public-Key) Cryptography",
          "Learn the role of Prime Numbers and Modular Arithmetic",
          "Grasp the concept of Trapdoor Functions"
        ],
        tips: [
          "The security of RSA relies on the difficulty of factoring large 'n'",
          "Public keys can be shared openly; Private keys must be secret",
          "In this lab, we use small numbers, but real RSA uses massive primes"
        ]
      }
    },
    {
      id: 5,
      title: "Hash Function Simulator",
      subtitle: "One-Way Cryptographic Functions",
      description: "Experiment with hash functions and learn how they ensure data integrity and password security.",
      route: "/hash-game",
      difficulty: "Intermediate",
      duration: "15 min",
      tutorial: {
        overview: "Hash functions convert input data into fixed-size strings. They're used for password storage, data integrity verification, and blockchain technology.",
        howToPlay: [
          "Type any text into the input field",
          "Observe the generated Hash Output",
          "Change a single character in your input",
          "Notice the 'Avalanche Effect' - the hash changes completely!",
          "Compare different algorithms (Simple, MD5-like, SHA-256-like)"
        ],
        objectives: [
          "Understand properties: Deterministic, Fast, One-Way",
          "Learn about Collision Resistance and the Avalanche Effect",
          "See how Hashing is used for Passwords and Data Integrity"
        ],
        tips: [
          "You cannot reverse a hash to get the original message",
          "Hashes are used to verify if a file has been tampered with",
          "SHA-256 is the industry standard for secure hashing"
        ]
      }
    },
    {
      id: 6,
      title: "Steganography Studio",
      subtitle: "Hidden Messages in Plain Sight",
      description: "Hide secret messages inside images and text. Learn the art of concealing information in ordinary-looking data.",
      route: "/steganography",
      difficulty: "Intermediate",
      duration: "20 min",
      tutorial: {
        overview: "Steganography is the practice of concealing a message within another non-secret message or physical object. It hides the *existence* of the secret.",
        howToPlay: [
          "Select 'Encode' to hide a message",
          "Enter your Secret Message and a Cover Text",
          "Choose a technique (Whitespace or First Letter)",
          "Generate the 'Stego Text' which looks normal but holds the secret",
          "Use 'Decode' to extract secrets from suspicious text"
        ],
        objectives: [
          "Distinguish between Steganography (hiding existence) and Cryptography (scrambling)",
          "Learn techniques like Least Significant Bit (LSB) and Text Hiding",
          "Understand how digital watermarking works"
        ],
        tips: [
          "Combine Steganography with Encryption for layered security",
          "Whitespace hiding uses invisible characters - careful with copy/paste!",
          "First Letter method requires a coherent cover sentence"
        ]
      }
    }
  ];

  const GameTutorialModal = ({ game, onClose }) => {
    if (!game) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">{game.title}</h2>
                <p className="text-blue-100">{game.subtitle}</p>
              </div>
              <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-2 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex gap-4 mt-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">📊 {game.difficulty}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">⏱️ {game.duration}</span>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Overview */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📖 Overview
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{game.tutorial.overview}</p>
            </div>

            {/* How to Play */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                🎮 How to Play
              </h3>
              <ol className="space-y-2">
                {game.tutorial.howToPlay.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Learning Objectives */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                🎯 Learning Objectives
              </h3>
              <ul className="space-y-2">
                {game.tutorial.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips & Tricks */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                💡 Tips & Tricks
              </h3>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
                <ul className="space-y-2">
                  {game.tutorial.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-yellow-500">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex gap-4 pt-4">
              {game.route ? (
                <button
                  onClick={() => navigate(game.route)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  🚀 Start Playing
                </button>
              ) : (
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-3 rounded-lg font-semibold text-center">
                  🔒 Coming Soon
                </div>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-[Inter] py-12 transition-colors">
      {/* Header */}
      <header className="text-center mb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          🎮 Crypto Game Arena
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Master cryptography through interactive games! Each game teaches real-world encryption techniques.
        </p>
      </header>

      {/* Game Cards Grid */}
      <main className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
          >
            {/* Game Image */}
            <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 relative">
              {game.image ? (
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {game.id === 3 && "🔐"}
                  {game.id === 4 && "🔑"}
                  {game.id === 5 && "#️⃣"}
                  {game.id === 6 && "🖼️"}
                </div>
              )}
              {!game.route && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                  COMING SOON
                </div>
              )}
            </div>

            {/* Game Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${game.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  game.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                  {game.difficulty}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">⏱️ {game.duration}</span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                {game.title}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">
                {game.subtitle}
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {game.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedGame(game)}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  📚 Tutorial
                </button>
                {game.route ? (
                  <button
                    onClick={() => navigate(game.route)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition group-hover:translate-x-1"
                  >
                    Play Now →
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 py-2 rounded-lg font-semibold text-sm cursor-not-allowed"
                  >
                    🔒 Locked
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Tutorial Modal */}
      {selectedGame && (
        <GameTutorialModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
};

export default Games;
