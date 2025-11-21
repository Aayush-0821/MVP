import React, { useState } from "react";

const RSAGame = () => {
    const [step, setStep] = useState(1);
    const [p, setP] = useState(61);
    const [q, setQ] = useState(53);
    const [n, setN] = useState(0);
    const [phi, setPhi] = useState(0);
    const [e, setE] = useState(17);
    const [d, setD] = useState(0);
    const [message, setMessage] = useState("");
    const [encrypted, setEncrypted] = useState("");
    const [decrypted, setDecrypted] = useState("");

    const isPrime = (num) => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    };

    const gcd = (a, b) => {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    const modInverse = (a, m) => {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) return x;
        }
        return 1;
    };

    const modPow = (base, exp, mod) => {
        let result = 1;
        base = base % mod;
        while (exp > 0) {
            if (exp % 2 === 1) result = (result * base) % mod;
            exp = Math.floor(exp / 2);
            base = (base * base) % mod;
        }
        return result;
    };

    const generateKeys = () => {
        if (!isPrime(p) || !isPrime(q)) {
            alert("Both p and q must be prime numbers!");
            return;
        }
        if (p === q) {
            alert("p and q must be different!");
            return;
        }

        const calculatedN = p * q;
        const calculatedPhi = (p - 1) * (q - 1);

        if (gcd(e, calculatedPhi) !== 1) {
            alert("e must be coprime with φ(n)!");
            return;
        }

        const calculatedD = modInverse(e, calculatedPhi);

        setN(calculatedN);
        setPhi(calculatedPhi);
        setD(calculatedD);
        setStep(2);
    };

    const encryptMessage = () => {
        if (!message) {
            alert("Please enter a message!");
            return;
        }

        const messageNum = parseInt(message);
        if (isNaN(messageNum) || messageNum <= 0 || messageNum >= n) {
            alert(`Message must be a number between 1 and ${n - 1}`);
            return;
        }

        const encryptedNum = modPow(messageNum, e, n);
        setEncrypted(encryptedNum.toString());
        setStep(3);
    };

    const decryptMessage = () => {
        const encryptedNum = parseInt(encrypted);
        const decryptedNum = modPow(encryptedNum, d, n);
        setDecrypted(decryptedNum.toString());
        setStep(4);
    };

    const reset = () => {
        setStep(1);
        setMessage("");
        setEncrypted("");
        setDecrypted("");
        setN(0);
        setPhi(0);
        setD(0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        🔑 RSA Encryption Lab
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Explore the mathematics behind RSA - the encryption that secures the internet!
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-4">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                                        }`}
                                >
                                    {s}
                                </div>
                                {s < 4 && <div className={`w-12 h-1 ${step > s ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"}`} />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Labels */}
                <div className="grid grid-cols-4 gap-4 mb-8 text-center text-sm">
                    <div className={step >= 1 ? "text-purple-600 font-semibold" : "text-gray-500"}>Generate Keys</div>
                    <div className={step >= 2 ? "text-purple-600 font-semibold" : "text-gray-500"}>Encrypt</div>
                    <div className={step >= 3 ? "text-purple-600 font-semibold" : "text-gray-500"}>Decrypt</div>
                    <div className={step >= 4 ? "text-purple-600 font-semibold" : "text-gray-500"}>Verify</div>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Left Panel - Instructions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {step === 1 && "Step 1: Generate RSA Keys"}
                            {step === 2 && "Step 2: Encrypt Message"}
                            {step === 3 && "Step 3: Decrypt Message"}
                            {step === 4 && "Step 4: Verification"}
                        </h2>

                        {step === 1 && (
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Choose two prime numbers to generate your RSA key pair:
                                </p>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Prime p:
                                    </label>
                                    <input
                                        type="number"
                                        value={p}
                                        onChange={(e) => setP(parseInt(e.target.value) || 0)}
                                        className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                    />
                                    {p > 0 && (
                                        <p className={`text-sm mt-1 ${isPrime(p) ? "text-green-600" : "text-red-600"}`}>
                                            {isPrime(p) ? "✓ Prime number" : "✗ Not a prime number"}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Prime q:
                                    </label>
                                    <input
                                        type="number"
                                        value={q}
                                        onChange={(e) => setQ(parseInt(e.target.value) || 0)}
                                        className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                    />
                                    {q > 0 && (
                                        <p className={`text-sm mt-1 ${isPrime(q) ? "text-green-600" : "text-red-600"}`}>
                                            {isPrime(q) ? "✓ Prime number" : "✗ Not a prime number"}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Public exponent e:
                                    </label>
                                    <input
                                        type="number"
                                        value={e}
                                        onChange={(e) => setE(parseInt(e.target.value) || 0)}
                                        className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Common values: 3, 17, 65537</p>
                                </div>

                                <button
                                    onClick={generateKeys}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                                >
                                    🔑 Generate Keys
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Enter a number to encrypt using your public key:
                                </p>

                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Public Key:</p>
                                    <p className="font-mono text-purple-600 dark:text-purple-400">
                                        (e={e}, n={n})
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Message (number between 1 and {n - 1}):
                                    </label>
                                    <input
                                        type="number"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Enter a number..."
                                        className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                <button
                                    onClick={encryptMessage}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                                >
                                    🔒 Encrypt
                                </button>

                                <button
                                    onClick={() => setStep(1)}
                                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    ← Back
                                </button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Now decrypt the message using your private key:
                                </p>

                                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Private Key:</p>
                                    <p className="font-mono text-pink-600 dark:text-pink-400">
                                        (d={d}, n={n})
                                    </p>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Encrypted Message:</p>
                                    <p className="font-mono text-xl text-gray-900 dark:text-white">{encrypted}</p>
                                </div>

                                <button
                                    onClick={decryptMessage}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                                >
                                    🔓 Decrypt
                                </button>

                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    ← Back
                                </button>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-4">
                                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 p-6 rounded-lg">
                                    <p className="text-center text-3xl mb-4">🎉</p>
                                    <p className="text-center font-semibold text-gray-900 dark:text-white mb-4">
                                        Encryption and Decryption Successful!
                                    </p>

                                    <div className="space-y-2">
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>Original Message:</strong> <span className="font-mono">{message}</span>
                                        </p>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>Encrypted:</strong> <span className="font-mono">{encrypted}</span>
                                        </p>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>Decrypted:</strong> <span className="font-mono">{decrypted}</span>
                                        </p>
                                    </div>

                                    {message === decrypted && (
                                        <p className="text-center text-green-600 font-semibold mt-4">
                                            ✓ Messages match perfectly!
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={reset}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                                >
                                    🔄 Start Over
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Panel - Calculations */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 RSA Mathematics</h2>

                        <div className="space-y-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Key Generation:</h3>
                                <div className="space-y-1 text-sm font-mono text-gray-700 dark:text-gray-300">
                                    <p>p = {p || "?"}</p>
                                    <p>q = {q || "?"}</p>
                                    <p>n = p × q = {n || "?"}</p>
                                    <p>
                                        φ(n) = (p-1) × (q-1) = {phi || "?"}
                                    </p>
                                    <p>e = {e || "?"}</p>
                                    <p>d = {d || "?"}</p>
                                </div>
                            </div>

                            {step >= 2 && (
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Encryption Formula:</h3>
                                    <div className="text-sm font-mono text-gray-700 dark:text-gray-300">
                                        <p>
                                            C = M<sup>e</sup> mod n
                                        </p>
                                        {message && encrypted && (
                                            <p className="mt-2">
                                                {encrypted} = {message}
                                                <sup>{e}</sup> mod {n}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {step >= 3 && (
                                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Decryption Formula:</h3>
                                    <div className="text-sm font-mono text-gray-700 dark:text-gray-300">
                                        <p>
                                            M = C<sup>d</sup> mod n
                                        </p>
                                        {encrypted && decrypted && (
                                            <p className="mt-2">
                                                {decrypted} = {encrypted}
                                                <sup>{d}</sup> mod {n}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Key Concepts:</h3>
                                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <li>• Public key (e, n) can be shared with everyone</li>
                                    <li>• Private key (d, n) must be kept secret</li>
                                    <li>• Security relies on difficulty of factoring large numbers</li>
                                    <li>• Real RSA uses primes with 100+ digits!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Educational Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🎓 About RSA</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
                        <div>
                            <h3 className="font-semibold mb-2">History:</h3>
                            <p className="text-sm">
                                Invented in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman. RSA revolutionized cryptography by
                                enabling secure communication without pre-sharing secret keys.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Real-World Use:</h3>
                            <p className="text-sm">
                                RSA secures HTTPS websites, digital signatures, credit card transactions, and more. The small numbers
                                here are for learning - real RSA uses 2048+ bit keys!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RSAGame;
