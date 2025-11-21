import { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi there! What brings you here today?" }
    ]);
    const [userInput, setUserInput] = useState("");
    const [showOptions, setShowOptions] = useState(true);
    const [isTyping, setIsTyping] = useState(false);

    const options = [
        "Explain MVP like I'm 12",
        "Help me build something",
        "Teach me a concept",
        "I need support",
        "Just chat with me"
    ];

    async function sendMessageToAI(message) {
        try {
            const res = await fetch(import.meta.env.VITE_OPENROUTER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "google/gemini-2.0-flash-001",
                    messages: [
                        {
                            role: "system",
                            content: "You are MVPBot, a helpful support assistant for MVP. Be friendly, concise, and helpful."
                        },
                        ...messages.map((m) => ({
                            role: m.sender === "user" ? "user" : "assistant",
                            content: m.text,
                        })),
                        { role: "user", content: message }
                    ]
                }),
            });

            const data = await res.json();
            return data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";

        } catch (error) {
            console.error(error);
            return "⚠️ Unable to connect to AI. Please try again later.";
        }
    }

    async function handleUserMessage(text) {
        const userMsg = { sender: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setShowOptions(false);
        setIsTyping(true);

        const reply = await sendMessageToAI(text);

        setIsTyping(false);
        const botMsg = { sender: "bot", text: reply };
        setMessages((prev) => [...prev, botMsg]);
    }

    async function handleSend() {
        if (!userInput.trim()) return;
        const text = userInput;
        setUserInput("");
        await handleUserMessage(text);
    }

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] text-white rounded-full shadow-xl flex items-center justify-center text-3xl hover:scale-110 transition-transform z-50 cursor-pointer"
                >
                    💬
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black/10 flex justify-end items-end p-4 z-50">
                    <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden relative border border-[#8FABD4]/30 dark:bg-gray-800 dark:border-gray-700 dark:text-white">

                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-4 text-xl text-[#4A70A9] hover:text-[#8FABD4] dark:text-[#8FABD4] dark:hover:text-[#4A70A9] cursor-pointer z-10"
                            onClick={() => setIsOpen(false)}
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>

                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] text-white font-semibold border-b text-xl">
                            MVP-Bot
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto max-h-[450px] space-y-3 bg-gradient-to-br from-[#8FABD4]/5 to-[#4A70A9]/5 dark:bg-gray-900">
                            {messages.map((msg, i) => {
                                const html = DOMPurify.sanitize(marked(msg.text));
                                return (
                                    <div
                                        key={i}
                                        className={`p-3 rounded-xl max-w-[80%] shadow-sm ${msg.sender === "user"
                                                ? "ml-auto bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] text-white"
                                                : "bg-white dark:bg-gray-700 text-black dark:text-white border border-[#8FABD4]/20 dark:border-gray-600"
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: html }}
                                    ></div>
                                );
                            })}

                            {isTyping && (
                                <div className="p-3 rounded-xl bg-[#8FABD4]/20 max-w-[60%] text-black shadow-sm dark:bg-gray-700 dark:text-white border border-[#8FABD4]/30 dark:border-gray-600">
                                    <span className="animate-pulse">MVPBot is typing...</span>
                                </div>
                            )}

                            {showOptions && (
                                <div className="space-y-2 mt-4">
                                    {options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleUserMessage(opt)}
                                            className="w-full py-2 px-4 bg-[#8FABD4]/20 hover:bg-[#8FABD4]/30 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl border border-[#8FABD4]/30 dark:border-gray-600 text-left text-black dark:text-white shadow-sm transition-colors"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Message Input */}
                        <div className="p-3 border-t border-[#8FABD4]/20 dark:border-gray-700 flex gap-2 bg-white dark:bg-gray-700">
                            <input
                                className="flex-1 p-2 border border-[#8FABD4]/30 dark:border-gray-600 rounded-xl text-black bg-[#8FABD4]/5 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-[#4A70A9] dark:focus:border-[#8FABD4]"
                                placeholder="Type a message..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="px-4 py-2 bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] text-white rounded-xl hover:from-[#8FABD4] hover:to-[#4A70A9] cursor-pointer transition-all shadow-md hover:shadow-lg"
                            >
                                Send
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
