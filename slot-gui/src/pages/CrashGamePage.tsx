// src/pages/CrashGamePage.tsx
import React from "react";
import EmojiCrashGame from "../games/EmojiCrashGame";

export default function CrashGamePage({ playerPot, setPlayerPot, casinoPot, setCasinoPot }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <span role="img" aria-label="crash">🚀</span> Crash Game
      </h2>
      <EmojiCrashGame
        playerPot={playerPot}
        setPlayerPot={setPlayerPot}
        casinoPot={casinoPot}
        setCasinoPot={setCasinoPot}
      />
    </div>
  );
}

