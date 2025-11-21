import React, { useState } from "react";

const HashGame = () => {
    const [inputText, setInputText] = useState("");
    const [selectedAlgo, setSelectedAlgo] = useState("simple");
    const [hashResult, setHashResult] = useState("");
    const [previousHashes, setPreviousHashes] = useState([]);

    // Simple hash function for demonstration
    const simpleHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16).padStart(8, "0").toUpperCase();
    };

    // MD5-like hash (simplified demonstration)
    const md5Like = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        // Simulate MD5 32-character output
        const hex = Math.abs(hash).toString(16).padStart(8, "0");
        return (hex + hex + hex + hex).substring(0, 32).toUpperCase();
    };

    // SHA-256-like hash (simplified demonstration)
    const sha256Like = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }
        // Simulate SHA-256 64-character output
        const hex = Math.abs(hash).toString(16).padStart(16, "0");
        return (hex + hex + hex + hex).substring(0, 64).toUpperCase();
    };

    const calculateHash = () => {
        if (!inputText) {
            alert("Please enter some text!");
            return;
        }

        let result = "";
        switch (selectedAlgo) {
            case "simple":
                result = simpleHash(inputText);
                break;
            case "md5":
                result = md5Like(inputText);
                break;
            case "sha256":
                result = sha256Like(inputText);
                break;
            default:
                result = simpleHash(inputText);
        }

        setHashResult(result);
        setPreviousHashes([
            { input: inputText, hash: result, algo: selectedAlgo, time: new Date().toLocaleTimeString() },
            ...previousHashes.slice(0, 4),
        ]);
    };

    const algorithms = [
        {
            id: "simple",
            name: "Simple Hash",
            description: "Basic demonstration hash",
            length: "8 characters",
            color: "from-blue-500 to-cyan-500",
        },
        {
            id: "md5",
            name: "MD5-Like",
            description: "Simulates MD5 (not for real use)",
            length: "32 characters",
            color: "from-purple-500 to-pink-500",
        },
        {
            id: "sha256",
            name: "SHA-256-Like",
            description: "Simulates SHA-256",
            length: "64 characters",
            color: "from-green-500 to-teal-500",
        },
    ];

    const demoExamples = [
        { text: "Hello World", desc: "Simple greeting" },
        { text: "Hello world", desc: "Lowercase 'w' - completely different hash!" },
        { text: "password123", desc: "Common password" },
        { text: "The quick brown fox jumps over the lazy dog", desc: "Pangram" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                        #️⃣ Hash Function Simulator
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Explore cryptographic hash functions and see how they transform any input into a fixed-size fingerprint!
                    </p>
                </div>

                {/* Info Banner */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">What are Hash Functions?</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Hash functions convert any input into a fixed-size string. They're used for password storage, data
                                integrity, blockchain, and digital signatures. Even tiny changes produce completely different hashes!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                    {/* Algorithm Selection */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Choose Algorithm</h2>
                        <div className="space-y-3">
                            {algorithms.map((algo) => (
                                <button
                                    key={algo.id}
                                    onClick={() => setSelectedAlgo(algo.id)}
                                    className={`w-full p-4 rounded-lg border-2 transition text-left ${selectedAlgo === algo.id
                                            ? `border-transparent bg-gradient-to-r ${algo.color} text-white`
                                            : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                                        }`}
                                >
                                    <h3 className="font-semibold mb-1">{algo.name}</h3>
                                    <p className={`text-sm ${selectedAlgo === algo.id ? "text-white/90" : "text-gray-500 dark:text-gray-400"}`}>
                                        {algo.description}
                                    </p>
                                    <p className={`text-xs mt-1 ${selectedAlgo === algo.id ? "text-white/80" : "text-gray-400"}`}>
                                        Output: {algo.length}
                                    </p>
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">⚠️ Note:</h3>
                            <p className="text-xs text-gray-700 dark:text-gray-300">
                                These are simplified demos for learning. Real cryptographic hashes are much more complex!
                            </p>
                        </div>
                    </div>

                    {/* Main Hash Interface */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hash Generator</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Input Text:
                                </label>
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type anything here..."
                                    className="w-full h-32 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-green-500 dark:bg-gray-700 dark:text-white resize-none font-mono"
                                />
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Character count: {inputText.length}
                                </p>
                            </div>

                            <button
                                onClick={calculateHash}
                                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                            >
                                🔨 Calculate Hash
                            </button>

                            {hashResult && (
                                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-2 border-green-500 rounded-lg">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Hash Output ({algorithms.find((a) => a.id === selectedAlgo)?.name}):
                                    </label>
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <p className="text-lg font-mono text-gray-900 dark:text-white break-all">{hashResult}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(hashResult);
                                            alert("Hash copied to clipboard!");
                                        }}
                                        className="mt-3 text-sm text-green-600 hover:text-green-700 font-semibold"
                                    >
                                        📋 Copy to clipboard
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Demo Examples */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🧪 Try These Examples</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {demoExamples.map((example, index) => (
                            <button
                                key={index}
                                onClick={() => setInputText(example.text)}
                                className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-500 transition text-left"
                            >
                                <p className="font-mono text-sm text-gray-900 dark:text-white mb-1">{example.text}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{example.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* History */}
                {previousHashes.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📜 Recent Hashes</h2>
                        <div className="space-y-3">
                            {previousHashes.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {item.algo.toUpperCase()} • {item.time}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                        <strong>Input:</strong> {item.input}
                                    </p>
                                    <p className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">
                                        <strong>Hash:</strong> {item.hash}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Educational Content */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Hash Properties</h3>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <div>
                                    <strong>Deterministic:</strong> Same input always produces same hash
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <div>
                                    <strong>Fast:</strong> Quick to calculate
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <div>
                                    <strong>Avalanche Effect:</strong> Tiny changes = completely different hash
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <div>
                                    <strong>One-Way:</strong> Impossible to reverse
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <div>
                                    <strong>Collision Resistant:</strong> Hard to find two inputs with same hash
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">💼 Real-World Uses</h3>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                                <span>🔑</span>
                                <div>
                                    <strong>Passwords:</strong> Websites store password hashes, not actual passwords
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>📦</span>
                                <div>
                                    <strong>File Integrity:</strong> Verify downloads haven't been tampered with
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>⛓️</span>
                                <div>
                                    <strong>Blockchain:</strong> Bitcoin mining uses SHA-256 hashing
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>✍️</span>
                                <div>
                                    <strong>Digital Signatures:</strong> Prove document authenticity
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>🗄️</span>
                                <div>
                                    <strong>Data Deduplication:</strong> Identify duplicate files quickly
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Fun Fact */}
                <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-500 p-6 rounded-lg">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span>🎓</span> Did You Know?
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li>• SHA-256 is so secure that even with all computers on Earth, it would take billions of years to crack!</li>
                        <li>• MD5 is now considered broken for security purposes - use SHA-256 or SHA-3 instead</li>
                        <li>• Every Bitcoin block contains a hash that miners compete to find</li>
                        <li>• Git (version control) uses SHA-1 hashes to identify commits</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HashGame;
