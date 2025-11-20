import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import learnByDoing from "../assets/learn-by-doing.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
import encryptionLearning1 from "../assets/encryptionLearning1.png";
import encryptionLearning2 from "../assets/encryptionLearning2.png";
import { useAuth } from "../context/AuthProvider";
import ChatBot from "./ChatBot.jsx";

const MvpLandingPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeDay, setActiveDay] = useState(2);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-red-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">

      {/* Hero Section */}
      <section className="pt-10 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-red-100 rounded-full text-red-700 font-medium text-sm animate-pulse">
            🚀 Join 10,000+ learners worldwide
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
            <span className="bg-linear-to-r from-red-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
              Learn by Doing
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Master encryption through interactive challenges. Learn, play, and sharpen your cyber skills in just minutes a day.
          </p>

          <Link to="/get-started">
            <button className="px-8 py-4 bg-linear-to-r from-red-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Get Started Free →
            </button>
          </Link>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★★★★★</span>
              <span>1,000+ reviews</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
            <div>Featured in TechCrunch</div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
            <div>Editor's Choice</div>
          </div>
        </div>
      </section>

      {/* Concepts Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-br from-red-600 to-blue-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative w-full aspect-square bg-linear-to-br from-red-100 to-blue-100 rounded-3xl p-12 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#9333ea', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 0.8 }} />
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
            <h2 className="text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Concepts<br />that <span className="text-red-600">click</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Interactive lessons make even complex ideas easy to grasp. Instant, custom feedback accelerates your understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Learn Section */}
      <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Learn at<br />your <span className="text-blue-600">level</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Brush up on the basics or learn new skills. Designed for learners ages 13 to 113.
            </p>
          </div>

            <div className="grid grid-cols-2 gap-4">
            <div className="bg-linear-to-br from-red-600 to-blue-600 rounded-2xl p-6 text-white transform hover:scale-105 hover:rotate-1 transition-all cursor-pointer relative overflow-hidden shadow-xl">
              <div className="absolute top-4 right-4 bg-yellow-400 text-red-900 text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                FOR YOU
              </div>
              <img src={encryptionLearning1} alt="Encryption Fundamentals" className="w-16 h-16 mt-4 mb-4 rounded-lg" />
              <p className="font-semibold">Encryption Fundamentals</p>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-tl-full"></div>
            </div>

            <div className="bg-linear-to-br from-blue-100 to-red-100 rounded-2xl p-6 transform hover:scale-105 hover:-rotate-1 transition-all cursor-pointer shadow-lg">
              <img src={encryptionLearning2} alt="Gamified Learning" className="w-16 h-16 mb-4 rounded-lg" />
              <p className="font-semibold text-gray-800 dark:text-white">Gamified Learning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Motivated Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-linear-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between mb-8">
              {["M", "T", "W", "T", "F"].map((day, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => setActiveDay(i)}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${i <= activeDay
                      ? "bg-linear-to-br from-orange-400 to-yellow-400 scale-110 shadow-lg text-white"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    ⚡
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{day}</span>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center gap-4 shadow-md">
              <div className="text-4xl animate-bounce">🏆</div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Reach your daily</p>
                <p className="text-2xl font-bold text-orange-500">GOAL!</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Stay<br />
              <span className="text-orange-500">motivated</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Finish every day smarter with engaging lessons, competitive features, and daily encouragement.
            </p>
          </div>
        </div>
      </section>

      {/* Effective Section */}
      <section className="py-20 px-6 bg-linear-to-br from-red-100 via-blue-100 to-red-100 dark:from-red-900/20 dark:via-blue-900/20 dark:to-red-900/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-shadow">
              <div className="text-6xl mb-4 animate-pulse">🔒</div>
              <div className="flex gap-2 items-center justify-center">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <div
                  className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-red-600 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>

          <h2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="text-red-600">More effective.</span>
            <br />
            <span className="text-blue-600">More fun.</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            MVP's interactive approach teaches you to think, not memorize.
          </p>
        </div>
      </section>

      <ChatBot />
    </div>
  );
};

export default MvpLandingPage;
