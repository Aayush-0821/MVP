// App.jsx (Quick fix)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MvpLandingPage from "./pages/MvpLandingPage";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Games from "./pages/Games";
import GetStarted from "./pages/GetStarted";
import Profile from "./pages/Profile";
import Quiz1 from "./pages/Quiz1";
import Dashboard from "./pages/Dashboard";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // IMPORTANT: don't overwrite className — only manage the 'dark' class
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MvpLandingPage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games" element={<Games />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz1" element={<Quiz1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
