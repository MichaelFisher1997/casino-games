import React from "react";
import BlackjackGameCard from "../components/BlackjackGameCard";

export default function BlackjackPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        🂡 Blackjack
      </h2>
      <BlackjackGameCard />
    </div>
  );
}

