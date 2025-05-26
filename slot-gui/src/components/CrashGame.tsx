import React from "react";

export default function CrashGame({ playerPot, setPlayerPot, casinoPot, setCasinoPot }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🚀 Emoji Crash (Coming soon!)</h2>
      <div>Player Pot: €{playerPot.toFixed(2)}</div>
      <div>Casino Pot: €{casinoPot.toFixed(2)}</div>
      {/* Crash game UI goes here */}
    </div>
  );
}

