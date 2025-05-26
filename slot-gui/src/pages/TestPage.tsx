import React from "react";

export default function TestPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Emoji Poker Hand Test
      </h2>
      <div className="flex gap-2">
        <span className="text-red-500 text-2xl font-bold">A♥️</span>
        <span className="text-black text-2xl font-bold">K♠️</span>
        <span className="text-red-500 text-2xl font-bold">Q♦️</span>
        <span className="text-black text-2xl font-bold">J♣️</span>
        <span className="text-red-500 text-2xl font-bold">10♥️</span>
      </div>
    </div>
  );
}

