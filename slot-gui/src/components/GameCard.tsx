// src/components/GameCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function GameCard({ title, emoji, path, description }: {
  title: string;
  emoji: string;
  path: string;
  description: string;
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      tabIndex={0}
      onKeyPress={e => e.key === "Enter" && navigate(path)}
      className={`
        bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700
        shadow-lg rounded-2xl px-6 py-4 w-80 flex items-center gap-4 my-4
        cursor-pointer transition-all duration-150
        hover:scale-105 hover:shadow-2xl focus:outline-none
      `}
    >
      <span className="text-4xl">{emoji}</span>
      <div>
        <div className="font-bold text-xl">{title}</div>
        <div className="text-gray-500 dark:text-gray-400 text-base">{description}</div>
      </div>
    </div>
  );
}

