import React from "react";
import BlackjackGameCard from "../components/BlackjackGameCard";

export default function BlackjackPage({ playerPot, setPlayerPot, casinoPot, setCasinoPot }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        🂡 Blackjack
      </h2>
      <BlackjackGameCard
        playerPot={playerPot}
        setPlayerPot={setPlayerPot}
        casinoPot={casinoPot}
        setCasinoPot={setCasinoPot}
      />
    </div>
  );
}

