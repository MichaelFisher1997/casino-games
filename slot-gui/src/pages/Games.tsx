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
				<GameCard
				  title="Blackjack"
				  emoji="🂡"
				  path="/games/blackjack"
				  description="Classic 21 with SVG cards!"
				/>
				<GameCard
				  title="Emoji Crash"
				  emoji="🚀"
				  path="/games/crash"
				  description="Bet, ride the rocket, and cash out before it crashes!"
				/>


        {/* More games here */}
      </div>
    </div>
  );
}

