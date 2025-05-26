// src/pages/Games.tsx
import React from "react";
import GameCard from "../components/GameCard";

export default function Games() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Games</h2>
      <div className="flex flex-wrap gap-8">
        <GameCard
          title="Emoji Slot Machine"
          emoji="🎰"
          path="/games/slots"
          description="Try your luck with spinning emoji reels!"
        />
        {/* More games here */}
      </div>
    </div>
  );
}

