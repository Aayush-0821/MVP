import React from "react";
import diffieHellman from "../assets/diffie-hellman.jpg";
import pigPen from "../assets/pig-pen.jpg";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-[Inter] py-12 transition-colors">
      {/* Header */}
      <header className="text-center mb-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          Game Arena
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Dive into the world of cryptography with our interactive games. Learn by playing!
        </p>
      </header>

      {/* Game Cards Grid */}
      <main className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Game Card 1 */}
        <div
          onClick={() => navigate("/quiz1")}
          className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
        >
          <div className="h-64 overflow-hidden">
            <img
              src={diffieHellman}
              alt="Diffie-Hellman Key Exchange"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
              CYBER DEFENSE PROTOCOL
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Master the art of secure key exchange. Calculate public keys and shared secrets in this interactive simulation.
            </p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
              Play Now →
            </div>
          </div>
        </div>

        {/* Game Card 2 */}
        <div
          onClick={() => navigate("/quiz2")}
          className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
        >
          <div className="h-64 overflow-hidden">
            <img
              src={pigPen}
              alt="Pig Pen Cipher"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
              Pig Pen Cipher
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Decode secret messages using the ancient Pig Pen cipher. Test your pattern recognition skills!
            </p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
              Play Now →
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Games;
