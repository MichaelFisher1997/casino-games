// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Games from "./pages/Games";
import SlotMachinePage from "./pages/SlotMachinePage";
import TestPage from "./pages/TestPage";
import BlackjackPage from "./pages/BlackjackPage";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: 200, width: "100%", padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/slots" element={<SlotMachinePage />} />
						<Route path="/test" element={<TestPage />} />
						<Route path="/games/blackjack" element={<BlackjackPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

