import React from "react";
import SlotMachineCard from "../components/SlotMachineCard";

export default function SlotMachinePage({ playerPot, setPlayerPot, casinoPot, setCasinoPot }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <span role="img" aria-label="slot">🎰🂱</span> Emoji Slot Machine
      </h2>
      <SlotMachineCard
        playerPot={playerPot}
        setPlayerPot={setPlayerPot}
        casinoPot={casinoPot}
        setCasinoPot={setCasinoPot}
      />
    </div>
  );
}

