import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/CSS/style.css";

import logo from "../assets/logo.png";
import profileIcon from "../assets/profile_icon.jpg";
import moon from "../assets/moon.webp";
import learnByDoing from "../assets/learn-by-doing.png";
import encryptionLearning1 from "../assets/encryptionLearning1.png";
import encryptionLearning2 from "../assets/encryptionLearning2.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";

import { useAuth } from "../context/AuthProvider";

const MvpLandingPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [activeDay, setActiveDay] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const userInitial = () => {
    const name = user?.user_metadata?.full_name || user?.email || '';
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
<nav
  className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
    scrolled
      ? "bg-white/90 backdrop-blur-lg shadow-lg"
      : "bg-white/70 backdrop-blur-sm"
  }`}
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">

    {/* FLEX CONTAINER */}
    <div className="flex items-center justify-between w-full">

      {/* LEFT — LOGO ONLY */}
      <div className="flex items-center flex-shrink-0">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
            <img src={logo} alt="MVP Logo" className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            MVP
          </h1>
        </Link>
      </div>

      {/* RIGHT — ALL MENU ITEMS */}
      <div className="flex items-center gap-8">

        <Link to="/quiz">
          <button className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium">
            Quiz
          </button>
        </Link>

        {!user ? (
          <Link to="/login">
            <button className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium">
              Login
            </button>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium"
          >
            Logout
          </button>
        )}

        <Link to="/games">
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition">
            Games
          </button>
        </Link>

        <Link to="/dashboard">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold cursor-pointer hover:shadow-lg">
            {user ? userInitial() : "U"}
          </div>
        </Link>

        <img
          src={moon}
          className="w-9 h-9 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
          id="theme-toggle"
        />
      </div>

    </div>
  </div>
</nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-medium text-sm animate-pulse">
            🚀 Join 10,000+ learners worldwide
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learn by Doing
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Master encryption through interactive challenges. Learn, play, and sharpen your cyber skills in just minutes a day.
          </p>
          
          <Link to="/get-started">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Get Started Free →
            </button>
          </Link>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★★★★★</span>
              <span>1,000+ reviews</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div>Featured in TechCrunch</div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div>Editor's Choice</div>
          </div>
        </div>
      </section>

      {/* Concepts Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative w-full aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-12 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#9333ea', stopOpacity: 0.8}} />
                    <stop offset="100%" style={{stopColor: '#2563eb', stopOpacity: 0.8}} />
                  </linearGradient>
                </defs>
                {[30, 60, 90].map((r, i) => (
                  <circle 
                    key={i} 
                    cx="100" 
                    cy="100" 
                    r={r} 
                    fill="none" 
                    stroke="url(#grad1)" 
                    strokeWidth="2" 
                    opacity={1 - i * 0.3}
                  />
                ))}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <line 
                    key={i} 
                    x1="100" 
                    y1="100" 
                    x2={100 + 90 * Math.cos((angle * Math.PI) / 180)} 
                    y2={100 + 90 * Math.sin((angle * Math.PI) / 180)} 
                    stroke="url(#grad1)" 
                    strokeWidth="1" 
                    opacity="0.5" 
                  />
                ))}
              </svg>
            </div>
          </div>

          <div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Concepts<br />that <span className="text-purple-600">click</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Interactive lessons make even complex ideas easy to grasp. Instant, custom feedback accelerates your understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Learn Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Learn at<br />your <span className="text-blue-600">level</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Brush up on the basics or learn new skills. Designed for learners ages 13 to 113.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white transform hover:scale-105 hover:rotate-1 transition-all cursor-pointer relative overflow-hidden shadow-xl">
              <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                FOR YOU
              </div>
              <img src={encryptionLearning1} alt="Encryption Fundamentals" className="w-16 h-16 mt-4 mb-4 rounded-lg" />
              <p className="font-semibold">Encryption Fundamentals</p>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-tl-full"></div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 transform hover:scale-105 hover:-rotate-1 transition-all cursor-pointer shadow-lg">
              <img src={encryptionLearning2} alt="Gamified Learning" className="w-16 h-16 mb-4 rounded-lg" />
              <p className="font-semibold text-gray-800">Gamified Learning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Motivated Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between mb-8">
              {["M", "T", "W", "T", "F"].map((day, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => setActiveDay(i)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                    i <= activeDay 
                      ? 'bg-gradient-to-br from-orange-400 to-yellow-400 scale-110 shadow-lg' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}>
                    ⚡
                  </div>
                  <span className="text-xs font-medium text-gray-600">{day}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-md">
              <div className="text-4xl animate-bounce">🏆</div>
              <div>
                <p className="text-gray-600">Reach your daily</p>
                <p className="text-2xl font-bold text-orange-500">GOAL!</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Stay<br /><span className="text-orange-500">motivated</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Finish every day smarter with engaging lessons, competitive features, and daily encouragement.
            </p>
          </div>
        </div>
      </section>

      {/* Effective Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-shadow">
              <div className="text-6xl mb-4 animate-pulse">🔒</div>
              <div className="flex gap-2 items-center justify-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
          
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-purple-600">More effective.</span><br />
            <span className="text-blue-600">More fun.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            MVP's interactive approach teaches you to think, not memorize.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <img src={logo} alt="MVP Logo" className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">MVP</h3>
              </div>
              <p className="text-gray-400 text-sm">Master encryption through interactive challenges.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Courses</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Gift MVP</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Educators</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <img src={facebook} alt="Facebook" className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <img src={instagram} alt="Instagram" className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <img src={twitter} alt="Twitter" className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <img src={linkedin} alt="LinkedIn" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms of service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
              <a href="#" className="hover:text-white transition-colors">California privacy</a>
            </div>
            <div>© 2025 MVP Worldwide, Inc.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MvpLandingPage;