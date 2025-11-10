import React, { useState } from "react";
import logo from "../assets/logo.png";
import facebook from "../assets/facebook.png";
import appleLogo from "../assets/Apple-Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const validateLogin = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" && password === "") {
      setMessage("Fill both the fields");
      setMsgColor("text-red-600");
    } else if (email !== "" && password === "") {
      setMessage("Password cannot be empty");
      setMsgColor("text-red-600");
    } else if (email === "" && password !== "") {
      setMessage("Email cannot be empty");
      setMsgColor("text-red-600");
    } else if (!emailPattern.test(email)) {
      setMessage("Invalid email format");
      setMsgColor("text-red-600");
    } else {
      setMessage("Login Successful!");
      setMsgColor("text-green-600");
    }
  };

  return (
    <div className="bg-purple-50 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>

        <h2 className="text-2xl font-bold text-center text-purple-900 mb-6">
          Login
        </h2>

        <div className="space-y-3">
          {/* Google */}
          <button className="w-full flex items-center justify-center gap-2 border border-purple-200 rounded-full py-3 hover:bg-purple-100 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-purple-800 font-medium">
              Login with Google
            </span>
          </button>

          {/* Facebook */}
          <button className="w-full flex items-center justify-center gap-2 border border-purple-200 rounded-full py-3 hover:bg-purple-100 transition">
            <img src={facebook} alt="Facebook" className="w-5 h-5" />
            <span className="text-purple-800 font-medium">
              Login with Facebook
            </span>
          </button>

          {/* Apple */}
          <button className="w-full flex items-center justify-center gap-2 border border-purple-200 rounded-full py-3 hover:bg-purple-100 transition">
            <img src={appleLogo} alt="Apple" className="w-5 h-5" />
            <span className="text-purple-800 font-medium">
              Continue with Apple
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className=" border-purple-200" />
            <span className="px-2 text-purple-500 text-sm">or</span>
            <hr className=" border-purple-200" />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-purple-300 rounded-lg text-purple-900 placeholder-purple-400 focus:ring-2 focus:ring-purple-400 outline-none"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-purple-300 rounded-lg text-purple-900 placeholder-purple-400 focus:ring-2 focus:ring-purple-400 outline-none"
          />

          {/* Button */}
          <button
            onClick={validateLogin}
            className="w-full bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition"
          >
            Login
          </button>

          {/* Message */}
          {message && (
            <p className={`text-center text-sm mt-3 ${msgColor}`}>{message}</p>
          )}
        </div>

        <p className="text-sm text-purple-700 mt-6 text-center">
          New User?
          <a href="#" className="ml-1 text-purple-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
