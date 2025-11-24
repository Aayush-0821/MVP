import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../lib/supabaseClient";

const InputField = ({ type = "text", value, onChange, placeholder }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A70A9] transition"
  />
);

const Login = () => {
  const navigate = useNavigate();
  const { signInWithPassword, signUpWithPassword, signInWithProvider } = useAuth();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const title = useMemo(() => (mode === "login" ? "Welcome Back" : "Create Your Account"), [mode]);
  const cta = useMemo(() => (mode === "login" ? "Login" : "Sign Up"), [mode]);
  const switchText = useMemo(() => (mode === "login" ? "New here?" : "Already registered?"), [mode]);
  const switchCta = useMemo(() => (mode === "login" ? "Sign Up" : "Login"), [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!email || !password) return setError("Please fill in email and password.");
    if (mode === "signup" && password !== confirm) return setError("Passwords do not match.");
    if (mode === "signup" && !username) return setError("Username is required.");

    try {
      setLoading(true);

      if (mode === "login") {
        const { error: signInError } = await signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate("/");
      } else {
        const { data, error: signUpError } = await signUpWithPassword({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });

        if (signUpError) throw signUpError;

        const userId = data?.user?.id;
        if (userId) {
          await supabase.from("profiles").upsert(
            {
              user_id: userId,
              email,
              full_name: fullName || null,
              username: username.toLowerCase(),
              display_name: displayName || fullName || null,
              avatar_url: avatarUrl || null,
              metadata: {},
            },
            { onConflict: "user_id" }
          );
        }

        if (data?.user?.identities?.length === 0) {
          setError("An account with this email already exists.");
        } else {
          setInfo("Verification email sent. Check inbox.");
          setMode("login");
        }
      }
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithProvider("google");
    } catch (err) {
      setError(err?.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100 dark:from-black dark:via-gray-900 dark:to-gray-800 transition-all">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-[#8FABD4]/30 dark:border-[#8FABD4]/20"
      >
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          {["login", "signup"].map((type) => (
            <button
              key={type}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                mode === type
                  ? "bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] text-white"
                  : "bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300"
              }`}
              onClick={() => setMode(type)}
            >
              {type === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-center mb-4 text-[#4A70A9] dark:text-[#8FABD4]">
          {title}
        </h2>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-4 disabled:opacity-50"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">{cta} with Google</span>
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300 dark:border-gray-700" />
          <span className="px-2 text-gray-500 text-sm">or with email</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-700" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {mode === "signup" && (
            <>
              <InputField type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              <InputField placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <InputField placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <InputField placeholder="Display Name (optional)" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              <InputField placeholder="Avatar URL (optional)" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] hover:scale-105 transition-all"
          >
            {loading ? "Please wait..." : cta}
          </button>
        </form>

        {error && <p className="text-center text-red-500 mt-3">{error}</p>}
        {info && <p className="text-center text-green-600 mt-3">{info}</p>}

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
          {switchText}
          <button
            className="ml-1 text-[#4A70A9] dark:text-[#8FABD4] hover:underline"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {switchCta}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
