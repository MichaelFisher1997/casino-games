// src/components/SlotMachineCard.tsx
import React from "react";
import SlotMachineGame from "./SlotMachineGame";

export default function SlotMachineCard() {
  return (
    <div
      className="
        bg-white dark:bg-gray-800 rounded-2xl shadow-lg
        p-8 max-w-xl mx-auto my-8
      "
    >
      <SlotMachineGame />
    </div>
  );
}

