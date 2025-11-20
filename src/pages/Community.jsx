import React from 'react';
import { Link } from 'react-router-dom';

export default function Community() {
  const discordInvite = 'https://discord.gg/your-invite-code'; // <-- replace with your real invite

  return (
    <div className="min-h-screen p-8 bg-red-50 dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 dark:bg-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Community</h1>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Join our community to discuss features, share projects, ask questions, and meet other learners.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="p-6 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-semibold mb-2">Chat on Discord</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Get real-time help, announcements, and community events.</p>
            <a
              href={discordInvite}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Join our Discord
            </a>
          </div>

          <div className="p-6 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
            <h3 className="font-semibold mb-2">Contribute</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Want to help build MVP? Share ideas, report issues, or open PRs on GitHub.</p>
            <Link to="/about" className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              Learn how to help
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-600 dark:text-gray-300">
          <strong>Note:</strong> Replace the placeholder Discord invite URL in `src/pages/Community.jsx` with your project's real invite link.
        </div>
      </div>
    </div>
  );
}
