import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthProvider';

// ==========================================
// GAME DATA AND CONFIGURATION
// ==========================================
const PIGPEN_MAP = {
    'A': '⌈', 'B': '⊓', 'C': '⌉',
    'D': '⊏', 'E': '□', 'F': '⊐',
    'G': '⌊', 'H': '⊔', 'I': '⌋',
    'J': '⌈•', 'K': '⊓•', 'L': '⌉•',
    'M': '⊏•', 'N': '□•', 'O': '⊐•',
    'P': '⌊•', 'Q': '⊔•', 'R': '⌋•',
    'S': '◁', 'T': '▷', 'U': '△', 'V': '▽',
    'W': '◁•', 'X': '▷•', 'Y': '△•', 'Z': '▽•'
};
const DIFFICULTY_CONFIG = {
    easy: { letters: 3, timeLimit: 45, basePoints: 50 },
    medium: { letters: 5, timeLimit: 35, basePoints: 100 },
    hard: { letters: 8, timeLimit: 25, basePoints: 200 }
};
const WORD_LISTS = {
    easy: ['CAT', 'DOG', 'BAT', 'HAT', 'SUN', 'MAP', 'PEN', 'BOX', 'KEY', 'BUS', 'CUP', 'BAG'],
    medium: ['APPLE', 'BRAIN', 'CLOUD', 'DREAM', 'FLAME', 'GRAPE', 'HORSE', 'LEMON', 'OCEAN', 'PIANO'],
    hard: ['ELEPHANT', 'MOUNTAIN', 'TREASURE', 'BUTTERFLY', 'UNIVERSE', 'KEYBOARD', 'PINEAPPLE']
};
const MAX_ROUNDS = 10;

// ==========================================
// HELPER FUNCTIONS
// ==========================================
function textToPigpen(text) {
    return text.toUpperCase().split('').map(char => PIGPEN_MAP[char] || char).join(' ');
}
function getRandomWord(difficulty) {
    const words = WORD_LISTS[difficulty];
    return words[Math.floor(Math.random() * words.length)];
}

// ==========================================
// MAIN REACT COMPONENT
// ==========================================
export default function PigpenCipherGame() {
    // ==========================================
    // REACT STATE
    // ==========================================
    const [screen, setScreen] = useState('difficulty');
    const [lastScreen, setLastScreen] = useState('difficulty');
    const [difficulty, setDifficulty] = useState('easy');
    const [currentRound, setCurrentRound] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [cipherSymbols, setCipherSymbols] = useState('Click Start!');
    const [userInput, setUserInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(DIFFICULTY_CONFIG.easy.timeLimit);
    const timerRef = useRef(null);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [feedback, setFeedback] = useState({ show: false, message: '', type: 'correct' });
    const { user } = useAuth();

    // ==========================================
    // DERIVED STATE
    // ==========================================
    const accuracy = currentRound === 0 ? 0 : Math.round((correctCount / currentRound) * 100);

    // ==========================================
    // GAME FLOW FUNCTIONS
    // ==========================================
    const loadNextQuestion = useCallback(() => {
        if (currentRound >= MAX_ROUNDS) {
            endGame();
            return;
        }
        setCurrentRound(prev => prev + 1);
        const newWord = getRandomWord(difficulty);
        setCurrentAnswer(newWord);
        setCipherSymbols(textToPigpen(newWord));
        setUserInput('');
        setInputDisabled(false);
        setTimeLeft(DIFFICULTY_CONFIG[difficulty].timeLimit);
    }, [currentRound, difficulty]);

    const handleWrongAnswer = useCallback((message) => {
        setScore(prev => Math.max(0, prev - 25));
        setStreak(0);
        setWrongCount(prev => prev + 1);
        setFeedback({ show: true, message, type: 'wrong' });
        setInputDisabled(true);
        setUserInput('');
        setTimeout(() => {
            setFeedback({ show: false, message: '', type: 'wrong' });
            loadNextQuestion();
        }, 3000);
    }, [loadNextQuestion]);

    const startGame = (diff) => {
        setDifficulty(diff);
        setCurrentRound(0);
        setScore(0);
        setStreak(0);
        setBestStreak(0);
        setCorrectCount(0);
        setWrongCount(0);
        setScreen('game');
        setTimeout(() => loadNextQuestion(), 100);
    };

    const handleCorrectAnswer = () => {
        const config = DIFFICULTY_CONFIG[difficulty];
        const basePoints = config.basePoints;
        const timeBonus = timeLeft * 2;
        const streakBonus = streak * 10;
        const totalPoints = basePoints + timeBonus + streakBonus;
        setScore(prev => prev + totalPoints);
        const newStreak = streak + 1;
        setStreak(newStreak);
        setCorrectCount(prev => prev + 1);
        if (newStreak > bestStreak) setBestStreak(newStreak);
        setFeedback({ show: true, message: `✓ Correct! +${totalPoints} points`, type: 'correct' });
        setInputDisabled(true);
        setUserInput('');
        setTimeout(() => {
            setFeedback({ show: false, message: '', type: 'correct' });
            loadNextQuestion();
        }, 2000);
    };

    const submitAnswer = () => {
        setTimeLeft(0); // Stop timer
        const userAnswer = userInput.trim().toUpperCase();
        if (userAnswer === currentAnswer) {
            handleCorrectAnswer();
        } else {
            handleWrongAnswer(`Wrong! The correct answer was: ${currentAnswer}`);
        }
    };

    const skipQuestion = () => {
        setTimeLeft(0); // Stop timer
        setScore(prev => Math.max(0, prev - 10));
        setStreak(0);
        setWrongCount(prev => prev + 1);
        setFeedback({ show: true, message: `Skipped! The answer was: ${currentAnswer} (-10 pts)`, type: 'wrong' });
        setInputDisabled(true);
        setUserInput('');
        setTimeout(() => {
            setFeedback({ show: false, message: '', type: 'wrong' });
            loadNextQuestion();
        }, 2500);
    };

    const endGame = () => {
        setTimeLeft(0);
        setScreen('gameover');
    };

    const restartGame = () => setScreen('difficulty');

    const toggleKey = () => {
        if (screen === 'key') {
            setScreen(lastScreen);
        } else {
            setLastScreen(screen);
            setScreen('key');
        }
    };

    // ==========================================
    // TIMER LOGIC
    // ==========================================
    const timeIsUp = useCallback(() => {
        handleWrongAnswer(`Time's up! The answer was: ${currentAnswer}`);
    }, [currentAnswer, handleWrongAnswer]);

    useEffect(() => {
        if (timeLeft > 0 && screen === 'game' && !inputDisabled) {
            timerRef.current = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && screen === 'game' && !inputDisabled) {
            timeIsUp();
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timeLeft, screen, inputDisabled, timeIsUp]);

    // ==========================================
    // EVENT LISTENERS
    // ==========================================
    const handleInputKeydown = (e) => {
        if (e.key === 'Enter' && !inputDisabled) submitAnswer();
    }

    // ==========================================
    // RENDER LOGIC
    // ==========================================

    // Save result when the player reaches the gameover screen
    useEffect(() => {
        if (screen !== 'gameover') return;
        const saveResult = async () => {
            try {
                const payload = {
                    user_id: user?.id ?? null,
                    user_email: user?.email ?? null,
                    quiz: 'pigpen-game',
                    score: score,
                    max_score: null,
                    metadata: {
                        rounds: currentRound,
                        correct: correctCount,
                        wrong: wrongCount,
                        best_streak: bestStreak,
                        difficulty
                    }
                };
                const { error } = await supabase.from('results').insert([payload]);
                if (error) console.error('Failed to save pigpen result:', error.message);
            } catch (err) {
                console.error('Error saving pigpen result:', err);
            }
        };
        saveResult();
    }, [screen]);

    const renderKeyCell = (letter, pos, hasDot = false) => {
        const borderClasses = {
            1: 'border-r-0 border-b-0', 2: 'border-b-0', 3: 'border-l-0 border-b-0',
            4: 'border-r-0', 5: 'border-none', 6: 'border-l-0',
            7: 'border-r-0 border-t-0', 8: 'border-t-0', 9: 'border-l-0 border-t-0',
        };
        return (
            <div className={`w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-800 dark:border-gray-600 flex items-center justify-center text-xl sm:text-2xl font-bold bg-white dark:bg-gray-700 text-gray-800 dark:text-white relative ${borderClasses[pos]}`}>
                {letter}
                {hasDot && <span className="absolute text-4xl text-red-600" style={{ transform: 'translate(0, -3px)' }}>•</span>}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        🔐 Pig Pen Cipher
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                        Decode the symbols and learn the ancient Freemason's cipher!
                    </p>
                </div>

                {/* INFO BANNER */}
                <div className="bg-white dark:bg-gray-800 border-l-4 border-indigo-500 p-6 rounded-lg mb-8 shadow-md">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">How it works</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                The alphabet is drawn in grids. Each letter is replaced by the lines that surround it. Dots are used to distinguish between grids.
                            </p>
                        </div>
                    </div>
                </div>

                {/* GAME CARD */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8">

                    {/* SCREEN 1: CHOOSE DIFFICULTY */}
                    {screen === 'difficulty' && (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Choose Your Difficulty Level</h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                <button
                                    className="p-6 rounded-xl border-2 border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-400 transition-all group"
                                    onClick={() => startGame('easy')}
                                >
                                    <div className="text-xl font-bold text-green-700 mb-2">EASY</div>
                                    <div className="text-sm text-green-600">3 letters • 45s</div>
                                </button>
                                <button
                                    className="p-6 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 transition-all group"
                                    onClick={() => startGame('medium')}
                                >
                                    <div className="text-xl font-bold text-blue-700 mb-2">MEDIUM</div>
                                    <div className="text-sm text-blue-600">5 letters • 35s</div>
                                </button>
                                <button
                                    className="p-6 rounded-xl border-2 border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-400 transition-all group"
                                    onClick={() => startGame('hard')}
                                >
                                    <div className="text-xl font-bold text-red-700 mb-2">HARD</div>
                                    <div className="text-sm text-red-600">8 letters • 25s</div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* SCREEN 2: GAME PLAY */}
                    {screen === 'game' && (
                        <div>
                            {/* Stats */}
                            <div className="grid grid-cols-4 gap-4 mb-8">
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-xs text-gray-500 uppercase">Round</div>
                                    <div className="text-xl font-bold text-gray-900 dark:text-white">{currentRound}/{MAX_ROUNDS}</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-xs text-gray-500 uppercase">Score</div>
                                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{score}</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-xs text-gray-500 uppercase">Streak</div>
                                    <div className="text-xl font-bold text-orange-500">{streak}</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-xs text-gray-500 uppercase">Time</div>
                                    <div className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-900 dark:text-white'}`}>
                                        {timeLeft}s
                                    </div>
                                </div>
                            </div>

                            {/* Cipher Display */}
                            <div className="bg-gray-100 dark:bg-gray-900 p-12 rounded-xl text-center mb-8 border-2 border-gray-200 dark:border-gray-700">
                                <div className="text-5xl font-bold tracking-widest text-gray-800 dark:text-white font-mono">
                                    {cipherSymbols}
                                </div>
                            </div>

                            {/* Feedback */}
                            {feedback.show && (
                                <div className={`p-4 rounded-lg text-center font-bold mb-6 ${feedback.type === 'correct'
                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                    }`}>
                                    {feedback.message}
                                </div>
                            )}

                            {/* Input */}
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    className="w-full p-4 text-xl border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:bg-gray-700 dark:text-white transition-all text-center uppercase tracking-widest"
                                    placeholder="TYPE ANSWER..."
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={handleInputKeydown}
                                    disabled={inputDisabled}
                                    autoFocus
                                />
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        className="py-3 px-6 rounded-lg font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md disabled:opacity-50"
                                        onClick={submitAnswer}
                                        disabled={inputDisabled}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className="py-3 px-6 rounded-lg font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 transition disabled:opacity-50"
                                        onClick={skipQuestion}
                                        disabled={inputDisabled}
                                    >
                                        Skip
                                    </button>
                                    <button
                                        className="py-3 px-6 rounded-lg font-bold border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 transition"
                                        onClick={toggleKey}
                                    >
                                        Show Key
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SCREEN 3: KEY */}
                    {screen === 'key' && (
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pigpen Cipher Key</h3>

                            <div className="inline-block bg-gray-100 dark:bg-gray-700 p-8 rounded-xl mb-6">
                                <div className="mb-8">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Grid 1 (A-I)</h4>
                                    <div className="inline-grid grid-cols-3 gap-0 border-4 border-gray-800 dark:border-gray-600 bg-white dark:bg-gray-800">
                                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((l, i) => renderKeyCell(l, i + 1))}
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Grid 2 (J-R)</h4>
                                    <div className="inline-grid grid-cols-3 gap-0 border-4 border-gray-800 dark:border-gray-600 bg-white dark:bg-gray-800">
                                        {['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'].map((l, i) => renderKeyCell(l, i + 1, true))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">X Shapes (S-Z)</h4>
                                    <div className="flex gap-8 justify-center text-3xl font-mono text-gray-800 dark:text-white">
                                        <div className="flex flex-col gap-2"><span>S: ◁</span><span>T: ▷</span></div>
                                        <div className="flex flex-col gap-2"><span>U: △</span><span>V: ▽</span></div>
                                        <div className="flex flex-col gap-2"><span>W: ◁•</span><span>X: ▷•</span></div>
                                        <div className="flex flex-col gap-2"><span>Y: △•</span><span>Z: ▽•</span></div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="w-full py-3 rounded-lg font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 transition"
                                onClick={toggleKey}
                            >
                                Close Key
                            </button>
                        </div>
                    )}

                    {/* SCREEN 4: GAME OVER */}
                    {screen === 'gameover' && (
                        <div className="text-center py-8">
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Game Complete!</h2>

                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                                    <div className="text-sm text-indigo-600 dark:text-indigo-400 font-bold uppercase">Final Score</div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{score}</div>
                                </div>
                                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                                    <div className="text-sm text-orange-600 dark:text-orange-400 font-bold uppercase">Best Streak</div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{bestStreak}</div>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                                    <div className="text-sm text-green-600 dark:text-green-400 font-bold uppercase">Correct</div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{correctCount}</div>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                                    <div className="text-sm text-blue-600 dark:text-blue-400 font-bold uppercase">Accuracy</div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{accuracy}%</div>
                                </div>
                            </div>

                            <button
                                className="px-8 py-4 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg hover:scale-105"
                                onClick={restartGame}
                            >
                                Play Again
                            </button>
                        </div>
                    )}

                </div>

                {/* EDUCATIONAL INFO */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎓 About Pig Pen Cipher</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                            <h3 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2">History</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                The Pigpen cipher (also known as the masonic cipher) is a geometric simple substitution cipher, which exchanges letters for symbols which are fragments of a grid. It was famously used by the Freemasons in the 18th century to keep their records private.
                            </p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                            <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Substitution Ciphers</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                This is a classic example of a monoalphabetic substitution cipher, where each letter is replaced by a corresponding symbol. While easy to learn, it is not secure against modern cryptanalysis methods like frequency analysis.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
