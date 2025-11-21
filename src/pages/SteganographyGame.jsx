import React, { useState } from "react";

const SteganographyGame = () => {
    const [mode, setMode] = useState("encode"); // 'encode' or 'decode'
    const [secretMessage, setSecretMessage] = useState("");
    const [coverText, setCoverText] = useState("");
    const [stegoText, setStegoText] = useState("");
    const [decodedMessage, setDecodedMessage] = useState("");
    const [technique, setTechnique] = useState("whitespace");

    // Whitespace steganography - hide data using invisible characters
    const encodeWhitespace = (cover, secret) => {
        const binarySecret = secret
            .split("")
            .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
            .join("");

        let result = "";
        let binaryIndex = 0;

        for (let i = 0; i < cover.length && binaryIndex < binarySecret.length; i++) {
            result += cover[i];
            if (cover[i] === " ") {
                // Use zero-width characters to encode binary
                if (binarySecret[binaryIndex] === "0") {
                    result += "\u200B"; // Zero-width space for 0
                } else {
                    result += "\u200C"; // Zero-width non-joiner for 1
                }
                binaryIndex++;
            }
        }

        result += cover.substring(result.replace(/[\u200B\u200C]/g, "").length);
        return result;
    };

    const decodeWhitespace = (stegoText) => {
        const binary = stegoText
            .split("")
            .filter((char) => char === "\u200B" || char === "\u200C")
            .map((char) => (char === "\u200B" ? "0" : "1"))
            .join("");

        let decoded = "";
        for (let i = 0; i < binary.length; i += 8) {
            const byte = binary.substring(i, i + 8);
            if (byte.length === 8) {
                decoded += String.fromCharCode(parseInt(byte, 2));
            }
        }
        return decoded;
    };

    // First letter steganography - hide message in first letters
    const encodeFirstLetter = (cover, secret) => {
        const words = cover.split(" ");
        const secretUpper = secret.toUpperCase();
        let result = "";
        let secretIndex = 0;

        for (let i = 0; i < words.length && secretIndex < secretUpper.length; i++) {
            if (words[i].length > 0) {
                const targetChar = secretUpper[secretIndex];
                // Try to use a word that starts with the target character
                words[i] = targetChar + words[i].substring(1);
                secretIndex++;
            }
            result += words[i] + " ";
        }

        return result.trim();
    };

    const decodeFirstLetter = (stegoText) => {
        const words = stegoText.split(" ");
        return words
            .map((word) => (word.length > 0 ? word[0] : ""))
            .join("")
            .toLowerCase();
    };

    const handleEncode = () => {
        if (!secretMessage || !coverText) {
            alert("Please enter both a secret message and cover text!");
            return;
        }

        if (secretMessage.length > coverText.split(" ").length && technique === "whitespace") {
            alert("Cover text needs more spaces to hide this message!");
            return;
        }

        let result = "";
        if (technique === "whitespace") {
            result = encodeWhitespace(coverText, secretMessage);
        } else {
            result = encodeFirstLetter(coverText, secretMessage);
        }

        setStegoText(result);
    };

    const handleDecode = () => {
        if (!stegoText) {
            alert("Please enter stego text to decode!");
            return;
        }

        let result = "";
        if (technique === "whitespace") {
            result = decodeWhitespace(stegoText);
        } else {
            result = decodeFirstLetter(stegoText);
        }

        setDecodedMessage(result);
    };

    const techniques = [
        {
            id: "whitespace",
            name: "Whitespace Steganography",
            description: "Hide data using invisible characters",
            icon: "👻",
        },
        {
            id: "firstletter",
            name: "First Letter Method",
            description: "Use first letters to spell message",
            icon: "🔤",
        },
    ];

    const examples = [
        {
            cover: "The weather is really nice today and everyone seems happy about it",
            secret: "HELP",
            technique: "whitespace",
        },
        {
            cover: "Send everyone coffee regularly every Thursday",
            secret: "SECRET",
            technique: "firstletter",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        🖼️ Steganography Studio
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Hide secret messages in plain sight! Unlike encryption, steganography conceals the very existence of your
                        message.
                    </p>
                </div>

                {/* Info Banner */}
                <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-lg mb-8">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🎭</span>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">What is Steganography?</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Steganography is the art of hiding information within ordinary-looking data. While encryption scrambles
                                data, steganography hides it completely. Used by spies, whistleblowers, and artists!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Technique Selection */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {techniques.map((tech) => (
                        <button
                            key={tech.id}
                            onClick={() => setTechnique(tech.id)}
                            className={`p-6 rounded-xl border-2 transition text-left ${technique === tech.id
                                    ? "border-purple-500 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20"
                                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-3xl">{tech.icon}</span>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{tech.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{tech.description}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Mode Toggle */}
                <div className="flex gap-2 mb-8 justify-center">
                    <button
                        onClick={() => setMode("encode")}
                        className={`px-8 py-3 rounded-lg font-semibold transition ${mode === "encode"
                                ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        🔒 Encode (Hide Message)
                    </button>
                    <button
                        onClick={() => setMode("decode")}
                        className={`px-8 py-3 rounded-lg font-semibold transition ${mode === "decode"
                                ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        🔓 Decode (Extract Message)
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Encode Panel */}
                    {mode === "encode" && (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📝 Input</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            🤫 Secret Message:
                                        </label>
                                        <input
                                            type="text"
                                            value={secretMessage}
                                            onChange={(e) => setSecretMessage(e.target.value)}
                                            placeholder="Your secret message..."
                                            className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            📄 Cover Text (innocent-looking text):
                                        </label>
                                        <textarea
                                            value={coverText}
                                            onChange={(e) => setCoverText(e.target.value)}
                                            placeholder="Enter normal-looking text that will hide your secret..."
                                            className="w-full h-40 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={handleEncode}
                                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                                    >
                                        🎭 Hide Message
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎁 Output (Stego Text)</h2>

                                {stegoText ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">✅ Message Hidden!</p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                                Your stego text looks normal but contains your secret message:
                                            </p>
                                            <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                                <p className="text-gray-900 dark:text-white">{stegoText}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(stegoText);
                                                alert("Stego text copied!");
                                            }}
                                            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                                        >
                                            📋 Copy Stego Text
                                        </button>

                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border-l-4 border-yellow-500">
                                            <p className="text-xs text-gray-700 dark:text-gray-300">
                                                💡 The text appears normal but contains hidden data. Share this with someone who knows to decode
                                                it!
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                        <div className="text-center">
                                            <p className="text-6xl mb-4">🎁</p>
                                            <p>Enter your inputs and click "Hide Message"</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* Decode Panel */}
                    {mode === "decode" && (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔍 Input Stego Text</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Paste the stego text here:
                                        </label>
                                        <textarea
                                            value={stegoText}
                                            onChange={(e) => setStegoText(e.target.value)}
                                            placeholder="Paste text containing hidden message..."
                                            className="w-full h-56 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white resize-none"
                                        />
                                    </div>

                                    <button
                                        onClick={handleDecode}
                                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                                    >
                                        🔓 Extract Hidden Message
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎉 Decoded Message</h2>

                                {decodedMessage ? (
                                    <div className="space-y-4">
                                        <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-2 border-green-500 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">🎊 Secret Revealed!</p>
                                            <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                                                    {decodedMessage}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(decodedMessage);
                                                alert("Message copied!");
                                            }}
                                            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                                        >
                                            📋 Copy Message
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                        <div className="text-center">
                                            <p className="text-6xl mb-4">🔍</p>
                                            <p>Paste stego text and click "Extract Hidden Message"</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Examples */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Try These Examples</h2>
                    <div className="space-y-4">
                        {examples.map((example, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-gray-200 dark:border-gray-600"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Example {index + 1}</p>
                                    <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded">
                                        {example.technique}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    <strong>Secret:</strong> {example.secret}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    <strong>Cover:</strong> {example.cover}
                                </p>
                                <button
                                    onClick={() => {
                                        setSecretMessage(example.secret);
                                        setCoverText(example.cover);
                                        setTechnique(example.technique);
                                        setMode("encode");
                                    }}
                                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                                >
                                    Load this example →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎨 Historical Uses</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                            <li>• Ancient Greeks used invisible ink made from lemon juice</li>
                            <li>• During WWII, microdots were hidden in periods of sentences</li>
                            <li>• Modern digital watermarks protect copyrighted images</li>
                            <li>• Whistleblowers use steganography to leak documents safely</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔐 Stego vs Crypto</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <span className="text-purple-500">📢</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Encryption:</strong>
                                    <p className="text-gray-700 dark:text-gray-300">Everyone knows you're hiding something</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-pink-500">🤫</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Steganography:</strong>
                                    <p className="text-gray-700 dark:text-gray-300">No one knows there's a secret</p>
                                </div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border-l-4 border-green-500">
                                <p className="text-gray-700 dark:text-gray-300">
                                    💡 <strong>Best Practice:</strong> Use both! Encrypt your message first, then hide the encrypted text
                                    with steganography for maximum security!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SteganographyGame;
