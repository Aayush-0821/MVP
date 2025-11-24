import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import moon from "../assets/moon.webp";
import sun from "../assets/sun.png";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { user, signOut } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await signOut();
        navigate("/");
        setIsMobileMenuOpen(false);
        setShowProfileMenu(false);
    };

    const userInitial = () => {
        const name = user?.user_metadata?.full_name || user?.email || "";
        return name ? name.charAt(0).toUpperCase() : "U";
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Quiz", path: "/quiz" },
        { name: "Community", path: "/community" },
        { name: "Games", path: "/games" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" }, // Added Contact here
    ];

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const isActiveLink = (path) => location.pathname === path;

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg transition-colors border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all">
                                <img src={logo} alt="Logo" className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] bg-clip-text text-transparent">
                                MVP
                            </h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex gap-6 lg:gap-8 text-gray-700 dark:text-gray-300 font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`relative py-2 transition-all ${isActiveLink(link.path)
                                            ? "text-[#4A70A9] dark:text-[#8FABD4] font-semibold"
                                            : "hover:text-[#4A70A9] dark:hover:text-[#8FABD4]"
                                        }`}
                                >
                                    {link.name}
                                    {isActiveLink(link.path) && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] rounded-full"></span>
                                    )}
                                </Link>
                            ))}
                            {!user && (
                                <Link
                                    to="/login"
                                    className={`relative py-2 transition-all ${
                                        isActiveLink("/login")
                                            ? "text-[#4A70A9] dark:text-[#8FABD4] font-semibold"
                                            : "hover:text-[#4A70A9] dark:hover:text-[#8FABD4]"
                                    }`}
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Desktop Right Side */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Toggle theme"
                            >
                                <img src={theme === "dark" ? sun : moon} alt="Theme" className="w-6 h-6" />
                            </button>

                            <a
                                href="https://discord.gg/your-invite-code"
                                target="_blank"
                                rel="noreferrer"
                                className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] text-white rounded-md hover:from-[#8FABD4] hover:to-[#4A70A9] transition-all text-sm font-medium shadow-md hover:shadow-lg"
                            >
                                Discord
                            </a>

                            {user && (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] text-white flex items-center justify-center cursor-pointer hover:scale-110 transition-transform font-semibold shadow-md"
                                    >
                                        {userInitial()}
                                    </button>

                                    {showProfileMenu && (
                                        <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 text-sm border border-gray-200 dark:border-gray-700">
                                            <Link
                                                to="/dashboard"
                                                className="block p-2 hover:bg-[#8FABD4]/10 dark:hover:bg-[#8FABD4]/20 rounded transition-colors"
                                                onClick={() => setShowProfileMenu(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left p-2 hover:bg-red-500 hover:text-white rounded mt-1 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mobile Controls */}
                        <div className="md:hidden flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Toggle theme"
                            >
                                <img src={theme === "dark" ? sun : moon} alt="Theme" className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor">
                                        <path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor">
                                        <path strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                                        isActiveLink(link.path)
                                            ? "bg-gradient-to-r from-[#4A70A9]/10 to-[#8FABD4]/10 dark:from-[#4A70A9]/20 dark:to-[#8FABD4]/20 text-[#4A70A9] dark:text-[#8FABD4] border-l-4 border-[#4A70A9] font-semibold"
                                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                                    onClick={closeMobileMenu}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user ? (
                                <>
                                    <div className="border-t border-gray-200 dark:border-gray-700 my-3 pt-3">
                                        <div className="flex items-center gap-3 px-4 py-2">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] text-white flex items-center justify-center text-sm font-semibold shadow-md">
                                                {userInitial()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {user?.user_metadata?.full_name || "User"}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onClick={closeMobileMenu}
                                    >
                                        📊 Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                                    >
                                        🚪 Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block px-4 py-3 rounded-lg text-center font-semibold bg-gradient-to-r from-[#4A70A9]/90 to-[#8FABD4]/90 text-white hover:from-[#4A70A9] hover:to-[#8FABD4]"
                                    onClick={closeMobileMenu}
                                >
                                    Login
                                </Link>
                            )}

                            <a
                                href="https://discord.gg/your-invite-code"
                                target="_blank"
                                rel="noreferrer"
                                className="block px-4 py-3 rounded-lg bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] text-white text-center font-medium hover:from-[#8FABD4] hover:to-[#4A70A9] transition-all shadow-md mt-3"
                            >
                                💬 Join Discord
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}
        </>
    );
};

export default Navbar;
