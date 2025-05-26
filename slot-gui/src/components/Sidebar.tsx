// src/components/Sidebar.tsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ playerPot, casinoPot }) {
  // Check if dark mode is enabled (persist to localStorage)
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-2 px-6 rounded-l-2xl font-bold text-lg mb-2 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav className="flex flex-col min-h-screen bg-gray-900 dark:bg-gray-800 shadow-lg w-56 justify-between fixed top-0 left-0 z-20">
      <div>
        <div className="text-white text-2xl font-bold py-6 pl-6">🥳 CrazyEmojis</div>
        <NavLink to="/" className={navLinkClass} end>
          Home
        </NavLink>
        <NavLink to="/games" className={navLinkClass}>
          Games
        </NavLink>
        <NavLink to="/deposit" className={navLinkClass}>
          Deposit
        </NavLink>
        {/* Global Pots Display */}
        <div className="mb-4 mt-6 px-4">
          <div className="font-mono text-xs text-gray-400">
            <span className="block">
              <span className="font-semibold text-green-400">Player Pot:</span> €{playerPot.toFixed(2)}
            </span>
            <span className="block">
              <span className="font-semibold text-blue-400">Casino Pot:</span> €{casinoPot.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <button
          className="flex items-center gap-2 text-gray-300 hover:text-white bg-gray-700 dark:bg-gray-600 px-4 py-2 rounded-full focus:outline-none"
          onClick={() => setDark((v) => !v)}
        >
          {dark ? (
            <>
              <span>🌙 Dark</span>
            </>
          ) : (
            <>
              <span>☀️ Light</span>
            </>
          )}
        </button>
        <div className="text-xs text-gray-500 mt-4">
          Theme: {dark ? "Dark" : "Light"}
        </div>
      </div>
    </nav>
  );
}

