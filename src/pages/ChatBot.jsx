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
                    className="fixed bottom-6 right-6 w-16 h-16 bg-purple-600 text-white rounded-full shadow-xl flex items-center justify-center text-3xl hover:scale-110 transition-transform z-50 cursor-pointer"
                >
                    💬
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black/10 flex justify-end items-end p-4 z-50">
                    <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden relative border border-purple-200">

                        {/* Red Close Button */}
                        <button
                            className="absolute top-3 right-4 text-xl text-red-500 hover:text-red-600 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>

                        {/* Header */}
                        <div className="p-4 bg-purple-600 text-white font-semibold border-b text-xl">
                            MVP-Bot
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto max-h-[450px] space-y-3 bg-purple-50">
                            {messages.map((msg, i) => {
                                const html = DOMPurify.sanitize(marked(msg.text));
                                return (
                                    <div
                                        key={i}
                                        className={`p-3 rounded-xl max-w-[80%] text-black shadow-sm ${
                                            msg.sender === "user"
                                                ? "ml-auto bg-purple-200"
                                                : "bg-white"
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: html }}
                                    ></div>
                                );
                            })}

                            {isTyping && (
                                <div className="p-3 rounded-xl bg-purple-100 max-w-[60%] text-black shadow-sm">
                                    <span className="animate-pulse">MVPBot is typing...</span>
                                </div>
                            )}

                            {showOptions && (
                                <div className="space-y-2 mt-4">
                                    {options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleUserMessage(opt)}
                                            className="w-full py-2 px-4 bg-purple-100 hover:bg-purple-200 rounded-xl border text-left text-black shadow-sm"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Message Input */}
                        <div className="p-3 border-t flex gap-2 bg-white">
                            <input
                                className="flex-1 p-2 border rounded-xl text-black bg-purple-50"
                                placeholder="Type a message..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 cursor-pointer"
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
