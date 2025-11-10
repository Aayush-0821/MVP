import React from "react";
import diffieHellman from "../assets/diffie-hellman.jpg";
import pigPen from "../assets/pig-pen.jpg";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-purple-50 min-h-screen flex flex-col items-center font-[Inter]">
      {/* Header */}
      <header className="text-center mt-12 mb-8 px-4">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">
          Welcome to the Games Section
        </h1>
        <p className="text-purple-700 text-base">
          Explore fun and engaging games! Click on any game to start playing.
        </p>
      </header>

      {/* Game Cards Grid */}
      <main className="flex flex-wrap justify-center gap-8 px-6 pb-16">
        {/* Game Card 1 */}
        <div
          onClick={() => navigate("/quiz1")}
          className="relative w-64 h-64 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={diffieHellman}
            alt="PinPoint Game"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-900 bg-opacity-80 opacity-0 hover:opacity-100 transition flex flex-col justify-center items-center text-center p-4">
            <h2 className="text-white text-lg font-semibold mb-2">PinPoint</h2>
            <p className="text-purple-100 text-sm">
              Test your knowledge with a series of challenging questions.
            </p>
          </div>
        </div>

        {/* Game Card 2 */}
        <div
          onClick={() => navigate("/quiz2")}
          className="relative w-64 h-64 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={pigPen}
            alt="Pig Pen Game"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-900 bg-opacity-80 opacity-0 hover:opacity-100 transition flex flex-col justify-center items-center text-center p-4">
            <h2 className="text-white text-lg font-semibold mb-2">Pig Pen</h2>
            <p className="text-purple-100 text-sm">
              Solve puzzles and navigate challenges to uncover the mystery.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-purple-600 text-sm mb-6">
        &copy; 2025 MVP Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default Games;
