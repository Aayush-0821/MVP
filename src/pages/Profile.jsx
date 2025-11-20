import React from "react";

const Profile = () => {
  return (
    <div className="bg-red-50 min-h-screen flex flex-col items-center py-12 px-4 dark:bg-gray-900 dark:text-white">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-indigo-700 dark:text-white mb-6">Your Profile</h1>

      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl dark:bg-gray-800 dark:text-white">
        <div className="flex flex-col items-center space-y-4">
          {/* Flip Profile Picture */}
          <div className="relative w-32 h-32 group perspective">
            <div className="relative preserve-3d w-full h-full duration-700 group-hover:rotate-y-180">
              <div className="absolute backface-hidden w-full h-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/428/428573.png"
                  alt="Front Profile"
                  className="w-full h-full rounded-full shadow-md"
                />
              </div>
              <div className="absolute rotate-y-180 backface-hidden w-full h-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Back Profile"
                  className="w-full h-full rounded-full shadow-md"
                />
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Aarnav</h3>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
            Update Profile
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          <div className="bg-indigo-50 p-5 rounded-xl text-center shadow">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-2xl font-bold">3</h3>
            <p className="text-gray-600 dark:text-gray-300">Saved Playlists</p>
            <button className="mt-3 px-3 py-1 text-sm border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
              View Playlists
            </button>
          </div>

          <div className="bg-indigo-50 p-5 rounded-xl text-center shadow">
            <div className="text-3xl mb-2">❤️</div>
            <h3 className="text-2xl font-bold">55</h3>
            <p className="text-gray-600 dark:text-gray-300">Liked Tutorials</p>
            <button className="mt-3 px-3 py-1 text-sm border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
              View Likes
            </button>
          </div>

          <div className="bg-indigo-50 p-5 rounded-xl text-center shadow">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="text-2xl font-bold">15</h3>
            <p className="text-gray-600 dark:text-gray-300">Video Comments</p>
            <button className="mt-3 px-3 py-1 text-sm border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
              View Comments
            </button>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">
            Your XP Progress
          </h2>
          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all duration-700"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-2">Level 3 — 650 / 1000 XP</p>
        </div>

        {/* Achievements */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            Your Achievements
          </h2>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <div className="flex flex-col items-center justify-center bg-indigo-50 p-4 rounded-lg shadow w-28">
              <div className="text-3xl">🧠</div>
              <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Quiz Master
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-indigo-50 p-4 rounded-lg shadow w-28">
              <div className="text-3xl">⚡</div>
              <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Fast Learner
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow w-28 opacity-60">
              <div className="text-3xl">🔒</div>
              <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Locked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Flip Animation Utilities */}
      <style>
        {`
          .perspective { perspective: 1000px; }
          .preserve-3d { transform-style: preserve-3d; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .backface-hidden { backface-visibility: hidden; }
        `}
      </style>
    </div>
  );
};

export default Profile;
