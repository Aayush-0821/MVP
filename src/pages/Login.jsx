import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../lib/supabaseClient";

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

  const title = useMemo(() => (mode === "login" ? "Login" : "Create Account"), [mode]);
  const cta = useMemo(() => (mode === "login" ? "Login" : "Sign Up"), [mode]);
  const switchText = useMemo(
    () => (mode === "login" ? "New here?" : "Already have an account?"),
    [mode]
  );
  const switchCta = useMemo(() => (mode === "login" ? "Create one" : "Login"), [mode]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!email || !password) {
      setError("Please fill in email and password.");
      return;
    }
    if (mode === "signup" && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (mode === "signup" && !username) {
      setError("Username is required.");
      return;
    }

    try {
      setLoading(true);

      if (mode === "login") {
        const { error: signInError } = await signInWithPassword({
          email,
          password,
        });
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
          setError("An account with this email already exists. Try logging in.");
        } else {
          setInfo("Check your email to confirm your account. Then login.");
          setMode("login");
        }
      }
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
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
    <div className="bg-purple-50 flex items-center justify-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              mode === "login"
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-700"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              mode === "signup"
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-700"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-purple-900 mb-4">{title}</h2>

        <button
          onClick={onGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-purple-200 rounded-full py-3 hover:bg-purple-100 transition mb-4 disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-purple-800 font-medium">
            {mode === "login" ? "Login" : "Sign Up"} with Google
          </span>
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-purple-200" />
          <span className="px-2 text-purple-500 text-sm">or with email</span>
          <hr className="flex-1 border-purple-200" />
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-purple-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-purple-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {mode === "signup" && (
            <>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-3 border border-purple-300 rounded-lg"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <input
                type="text"
                placeholder="Full name"
                className="w-full p-3 border border-purple-300 rounded-lg"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border border-purple-300 rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="text"
                placeholder="Display name (optional)"
                className="w-full p-3 border border-purple-300 rounded-lg"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Avatar URL (optional)"
                className="w-full p-3 border border-purple-300 rounded-lg"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-full font-medium"
          >
            {loading ? "Please wait..." : cta}
          </button>
        </form>

        {error && <p className="text-center text-red-600 mt-3">{error}</p>}
        {info && <p className="text-center text-green-600 mt-3">{info}</p>}

        <p className="text-center text-sm text-purple-700 mt-6">
          {switchText}
          <button
            className="ml-1 text-purple-600 hover:underline"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {switchCta}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
