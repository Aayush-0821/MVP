import { BrowserRouter, Routes, Route } from "react-router-dom";
import MvpLandingPage from "./pages/MvpLandingPage";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Games from "./pages/Games";
import GetStarted from "./pages/GetStarted";
import Profile from "./pages/Profile";
import Quiz1 from "./pages/Quiz1";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Community from "./pages/Community";
import Layout from "./components/Layout";
import Quiz2 from "./pages/Quiz2";
import CaesarCipher from "./pages/CaesarCipher";
import RSAGame from "./pages/RSAGame";
import HashGame from "./pages/HashGame";
import Contact from "./pages/Contact";
import SteganographyGame from "./pages/SteganographyGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MvpLandingPage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/games" element={<Games />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz1" element={<Quiz1 />} />
          <Route path="/quiz2" element={<Quiz2 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/caesar-cipher" element={<CaesarCipher />} />
          <Route path="/rsa-game" element={<RSAGame />} />
          <Route path="/hash-game" element={<HashGame />} />
          <Route path="/steganography" element={<SteganographyGame />} />
          <Route path="/contact" element={<Contact />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
