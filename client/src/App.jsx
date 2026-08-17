import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import History from "./pages/History";
import LearningCenter from "./pages/LearningCenter";
import Quiz from "./pages/Quiz";
import About from "./pages/About";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/history" element={<History />} />
        <Route path="/learn" element={<LearningCenter />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ThemeProvider>
  );
}