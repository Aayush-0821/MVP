import React from "react";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-700 dark:text-red-300 font-medium text-sm animate-pulse">
            🎯 About MVP
          </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-red-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
              Empowering Learners
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make encryption and cybersecurity education accessible,
            engaging, and effective for everyone. Learn by doing, not just reading.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="text-red-600">Mission</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              To revolutionize how people learn encryption and cybersecurity through
              interactive, gamified experiences that make complex concepts simple and fun.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-100 to-blue-100 dark:from-red-900/20 dark:to-blue-900/20 rounded-2xl p-8 hover:scale-105 transition-all shadow-lg">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Learn by Doing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interactive challenges that teach you through hands-on practice,
                not passive reading.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-red-100 dark:from-blue-900/20 dark:to-red-900/20 rounded-2xl p-8 hover:scale-105 transition-all shadow-lg">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Gamified Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Turn education into an adventure with points, streaks, and
                achievements that keep you motivated.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-blue-100 dark:from-red-900/20 dark:to-blue-900/20 rounded-2xl p-8 hover:scale-105 transition-all shadow-lg">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">For Everyone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Whether you're 13 or 113, beginner or expert, we have content
                tailored to your level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center text-gray-900 dark:text-white">
            Why Choose <span className="text-blue-600">MVP</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  ⚡
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Interactive Lessons</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Every concept comes with hands-on exercises that reinforce your
                  understanding through practice.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🎯
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Personalized Learning</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Adaptive content that adjusts to your skill level and learning pace.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  📊
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Track Progress</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Detailed analytics and insights help you understand your strengths
                  and areas for improvement.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🏆
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Earn Achievements</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Unlock badges and certificates as you master new skills and
                  complete challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-100 via-blue-100 to-red-100 dark:from-red-900/20 dark:via-blue-900/20 dark:to-red-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <div className="text-5xl font-bold text-red-600 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Active Learners</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Interactive Lessons</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <div className="text-5xl font-bold text-red-600 mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Satisfaction Rate</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <div className="text-5xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Learning Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-red-600 to-blue-600 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Join thousands of learners mastering encryption and cybersecurity through
            interactive challenges and gamified experiences.
          </p>
          <Link to="/get-started">
            <button className="px-8 py-4 bg-white text-red-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Get Started Free →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      {/* Footer removed (handled by Layout) */}
    </div>
  );
};

export default About;
