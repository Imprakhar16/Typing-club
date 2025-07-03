import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TypingTest from "./pages/TypingTest";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import "./App.css"

function App() {
  const handleSessionEnd = session => {
    const prev = JSON.parse(localStorage.getItem("typingSessions")) || [];
    const updated = [session, ...prev].slice(0, 50);
    console.log(updated)
    localStorage.setItem("typingSessions", JSON.stringify(updated));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/test"
          element={<TypingTest onSessionEnd={handleSessionEnd} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
