import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import moon from "../assets/moon.webp";
import sun from "../assets/sun.png";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { user, signOut } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = async () => {
        await signOut();
        navigate("/");
    };

    const userInitial = () => {
        const name = user?.user_metadata?.full_name || user?.email || "";
        return name ? name.charAt(0).toUpperCase() : "U";
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg sticky top-0 z-50">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all">
                    <img src={logo} alt="Logo" className="w-7 h-7" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    MVP
                </h1>
            </Link>

            {/* Center Navigation Links */}
            <div className="hidden md:flex gap-10 text-gray-700 dark:text-white font-medium">
                    <Link to="/quiz" className="hover:text-red-600 dark:hover:text-red-400 transition">Quiz</Link>
                    <Link to="/community" className="hover:text-red-600 dark:hover:text-red-400 transition">Community</Link>
                    <Link to="/games" className="hover:text-red-600 dark:hover:text-red-400 transition">Games</Link>
                    <Link to="/about" className="hover:text-red-600 dark:hover:text-red-400 transition">About</Link>
                {!user && (
                    <Link to="/login" className="hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition">Login</Link>
                )}
            </div>

            {/* Right side - Theme Toggle & Profile */}
            <div className="flex items-center gap-4">
                {/* Dark Mode Toggle */}

                <img
                    src={theme === "dark" ? sun : moon}
                    onClick={toggleTheme}
                    className="w-9 h-9 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
                    alt="Toggle theme"
                />

                {/* Discord / Community link */}
                <a
                    href="https://discord.gg/your-invite-code"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                    Discord
                </a>

                {/* Profile Avatar */}
                {user && (
                    <div className="relative">
                        <div
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-blue-600 text-white flex items-center justify-center cursor-pointer hover:scale-110 transition"
                        >
                            {userInitial()}
                        </div>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-xl p-3 text-sm animate-fadeIn">
                                <Link to="/dashboard" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white rounded">Dashboard</Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left p-2 hover:bg-red-500 hover:text-white dark:text-white rounded"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
