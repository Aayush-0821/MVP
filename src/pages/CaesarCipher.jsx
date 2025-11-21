import React, { useState } from "react";

const CaesarCipher = () => {
    const [mode, setMode] = useState("encrypt"); // 'encrypt' or 'decrypt'
    const [inputText, setInputText] = useState("");
    const [shift, setShift] = useState(3);
    const [output, setOutput] = useState("");
    const [showHint, setShowHint] = useState(false);

    const caesarShift = (text, shiftAmount, encrypt = true) => {
        const actualShift = encrypt ? shiftAmount : -shiftAmount;
        return text
            .split("")
            .map((char) => {
                if (char.match(/[a-z]/i)) {
                    const code = char.charCodeAt(0);
                    const isUpperCase = code >= 65 && code <= 90;
                    const base = isUpperCase ? 65 : 97;
                    const shiftedCode = ((code - base + actualShift + 26) % 26) + base;
                    return String.fromCharCode(shiftedCode);
                }
                return char;
            })
            .join("");
    };

    const handleProcess = () => {
        const result = caesarShift(inputText, shift, mode === "encrypt");
        setOutput(result);
    };

    const bruteForce = () => {
        const results = [];
        for (let i = 0; i < 26; i++) {
            results.push({
                shift: i,
                text: caesarShift(inputText, i, false),
            });
        }
        return results;
    };

    const [bruteForceResults, setBruteForceResults] = useState([]);

    const handleBruteForce = () => {
        setBruteForceResults(bruteForce());
    };

    const examples = [
        { text: "HELLO WORLD", shift: 3, result: "KHOOR ZRUOG" },
        { text: "ATTACK AT DAWN", shift: 13, result: "NGGNPX NG QNJA" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        🔐 Caesar Cipher Challenge
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Crack messages encrypted with the famous Caesar cipher. Named after Julius Caesar who used it to protect military secrets!
                    </p>
                </div>

                {/* Info Card */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">How it works:</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                The Caesar Cipher shifts each letter by a fixed number of positions. For example, with shift 3:
                                A→D, B→E, C→F, etc. It's simple but historically important!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Main Interface */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {mode === "encrypt" ? "🔒 Encrypt Message" : "🔓 Decrypt Message"}
                        </h2>

                        {/* Mode Toggle */}
                        <div className="flex gap-2 mb-6">
                            <button
                                onClick={() => setMode("encrypt")}
                                className={`flex-1 py-3 rounded-lg font-semibold transition ${mode === "encrypt"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    }`}
                            >
                                Encrypt
                            </button>
                            <button
                                onClick={() => setMode("decrypt")}
                                className={`flex-1 py-3 rounded-lg font-semibold transition ${mode === "decrypt"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    }`}
                            >
                                Decrypt
                            </button>
                        </div>

                        {/* Input Text */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Your Message
                            </label>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value.toUpperCase())}
                                placeholder="Enter your message here..."
                                className="w-full h-32 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                            />
                        </div>

                        {/* Shift Value */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Shift Value: {shift}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="25"
                                value={shift}
                                onChange={(e) => setShift(parseInt(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <span>0</span>
                                <span>13 (ROT13)</span>
                                <span>25</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleProcess}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                            >
                                {mode === "encrypt" ? "🔒 Encrypt" : "🔓 Decrypt"}
                            </button>
                            <button
                                onClick={() => {
                                    setInputText("");
                                    setOutput("");
                                    setBruteForceResults([]);
                                }}
                                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                Clear
                            </button>
                        </div>

                        {/* Output */}
                        {output && (
                            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Result:
                                </label>
                                <p className="text-xl font-mono text-gray-900 dark:text-white break-all">{output}</p>
                            </div>
                        )}
                    </div>

                    {/* Brute Force Attack */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            🔨 Brute Force Attack
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Don't know the shift value? Try all 26 possibilities! This is why Caesar Cipher is not secure.
                        </p>

                        <button
                            onClick={handleBruteForce}
                            disabled={!inputText}
                            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
                        >
                            🚀 Try All Shifts
                        </button>

                        {bruteForceResults.length > 0 && (
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {bruteForceResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
                                        onClick={() => {
                                            setShift(result.shift);
                                            setOutput(result.text);
                                        }}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                Shift {result.shift}
                                            </span>
                                        </div>
                                        <p className="text-sm font-mono text-gray-900 dark:text-white truncate">
                                            {result.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Examples */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Practice Examples</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {examples.map((example, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                            >
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Example {index + 1}:</p>
                                <p className="font-mono text-gray-900 dark:text-white mb-1">
                                    <strong>Original:</strong> {example.text}
                                </p>
                                <p className="font-mono text-gray-900 dark:text-white mb-1">
                                    <strong>Shift:</strong> {example.shift}
                                </p>
                                <p className="font-mono text-gray-900 dark:text-white">
                                    <strong>Encrypted:</strong> {example.result}
                                </p>
                                <button
                                    onClick={() => {
                                        setInputText(example.text);
                                        setShift(example.shift);
                                        setMode("encrypt");
                                    }}
                                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                                >
                                    Try this example →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Educational Info */}
                <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span>🎓</span> Did You Know?
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li>• Julius Caesar used this cipher to protect military messages around 58 BC</li>
                        <li>• ROT13 (shift of 13) is still used today for hiding spoilers and puzzle solutions</li>
                        <li>• The cipher is vulnerable because there are only 25 possible keys to try!</li>
                        <li>• Modern encryption uses keys with billions of possible combinations</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CaesarCipher;
