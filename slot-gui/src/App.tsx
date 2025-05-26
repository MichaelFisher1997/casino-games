// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Games from "./pages/Games";
import SlotMachinePage from "./pages/SlotMachinePage";
import BlackjackPage from "./pages/BlackjackPage";
import DepositPage from "./pages/DepositPage";
import CrashGamePage from "./pages/CrashGamePage";

export default function App() {
  // Global pots
  // Read initial values from localStorage (or defaults)
  const [playerPot, setPlayerPot] = useState(() => {
    const val = localStorage.getItem("playerPot");
    return val ? parseFloat(val) : 0;
  });
  const [casinoPot, setCasinoPot] = useState(() => {
    const val = localStorage.getItem("casinoPot");
    return val ? parseFloat(val) : 100;
  });

  // Update localStorage when pots change
  useEffect(() => {
    localStorage.setItem("playerPot", String(playerPot));
  }, [playerPot]);

  useEffect(() => {
    localStorage.setItem("casinoPot", String(casinoPot));
  }, [casinoPot]);

  // Cross-tab pot sync
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === "playerPot" && e.newValue !== null) {
        setPlayerPot(parseFloat(e.newValue));
      }
      if (e.key === "casinoPot" && e.newValue !== null) {
        setCasinoPot(parseFloat(e.newValue));
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar playerPot={playerPot} casinoPot={casinoPot} />
        <main className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 ml-56">
          {/* ml-56 pushes content right of the fixed sidebar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route
              path="/games/slots"
              element={
                <SlotMachinePage
                  playerPot={playerPot}
                  setPlayerPot={setPlayerPot}
                  casinoPot={casinoPot}
                  setCasinoPot={setCasinoPot}
                />
              }
            />
            <Route
              path="/games/blackjack"
              element={
                <BlackjackPage
                  playerPot={playerPot}
                  setPlayerPot={setPlayerPot}
                  casinoPot={casinoPot}
                  setCasinoPot={setCasinoPot}
                />
              }
            />
            <Route
              path="/deposit"
              element={
                <DepositPage
                  playerPot={playerPot}
                  setPlayerPot={setPlayerPot}
                  casinoPot={casinoPot}
                  setCasinoPot={setCasinoPot}
                />
              }
            />
            <Route
              path="/games/crash"
              element={
                <CrashGamePage
                  playerPot={playerPot}
                  setPlayerPot={setPlayerPot}
                  casinoPot={casinoPot}
                  setCasinoPot={setCasinoPot}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

