import React from "react";
import BlackjackGameUI from "./BlackjackGameUI";

export default function BlackjackGameCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-xl mx-auto">
      <BlackjackGameUI />
    </div>
  );
}

