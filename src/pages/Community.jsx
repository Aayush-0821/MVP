import React from 'react';
import { Link } from 'react-router-dom';

export default function Community() {
  const discordInvite = 'https://discord.gg/your-invite-code'; // <-- replace with your real invite

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-black dark:via-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] bg-clip-text text-transparent mb-4">
            Community
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Join our community to discuss features, share projects, ask questions, and meet other learners.
          </p>
        </div>

        {/* Community Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          {/* Discord Card */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A70A9]/5 to-[#8FABD4]/5 dark:from-[#4A70A9]/10 dark:to-[#8FABD4]/10 group-hover:from-[#4A70A9]/10 group-hover:to-[#8FABD4]/10 transition-all"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">Chat on Discord</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Get real-time help, announcements, and community events. Connect with fellow learners and share your journey.
              </p>
              <a
                href={discordInvite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] text-white rounded-xl font-semibold hover:from-[#8FABD4] hover:to-[#4A70A9] transition-all shadow-md hover:shadow-lg"
              >
                Join Discord →
              </a>
            </div>
          </div>

          {/* Contribute Card */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8FABD4]/5 to-[#4A70A9]/5 dark:from-[#8FABD4]/10 dark:to-[#4A70A9]/10 group-hover:from-[#8FABD4]/10 group-hover:to-[#4A70A9]/10 transition-all"></div>
            <div className="relative p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8FABD4] to-[#4A70A9] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">Contribute</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Want to help build MVP? Share ideas, report issues, or open PRs on GitHub. Every contribution matters!
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 text-[#4A70A9] dark:text-[#8FABD4] border-2 border-[#4A70A9]/30 dark:border-[#8FABD4]/30 rounded-xl font-semibold hover:bg-[#8FABD4]/10 dark:hover:bg-[#8FABD4]/20 transition-all shadow-md hover:shadow-lg"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white flex items-center gap-2">
            <span className="text-3xl">🌟</span>
            Community Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#8FABD4]/10 to-transparent dark:from-[#8FABD4]/20 border border-[#8FABD4]/20 dark:border-[#8FABD4]/30">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold text-black dark:text-white mb-1">Resource Sharing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Share tutorials, guides, and learning resources</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#4A70A9]/10 to-transparent dark:from-[#4A70A9]/20 border border-[#4A70A9]/20 dark:border-[#4A70A9]/30">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-semibold text-black dark:text-white mb-1">Problem Solving</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get help with challenges and debugging</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#8FABD4]/10 to-transparent dark:from-[#8FABD4]/20 border border-[#8FABD4]/20 dark:border-[#8FABD4]/30">
              <div className="text-2xl mb-2">🎉</div>
              <h3 className="font-semibold text-black dark:text-white mb-1">Events & Contests</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Participate in community challenges</p>
            </div>
          </div>
        </div>

        {/* Note */}
        {/* <div className="mt-8 p-4 bg-[#8FABD4]/10 dark:bg-[#8FABD4]/20 border border-[#8FABD4]/30 dark:border-[#8FABD4]/40 rounded-xl">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong className="text-[#4A70A9] dark:text-[#8FABD4]">Note:</strong> Replace the placeholder Discord invite URL in <code className="bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded">src/pages/Community.jsx</code> with your project's real invite link.
          </p>
        </div> */}
      </div>
    </div>
  );
}
