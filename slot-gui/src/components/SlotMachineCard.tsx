import React from "react";
import SlotMachineGame from "./SlotMachineGame";

export default function SlotMachineCard({ playerPot, setPlayerPot, casinoPot, setCasinoPot }) {
  return (
    <div
      className="
        bg-white dark:bg-gray-800 rounded-2xl shadow-lg
        p-8 max-w-xl mx-auto my-8
      "
    >
      <SlotMachineGame
        playerPot={playerPot}
        setPlayerPot={setPlayerPot}
        casinoPot={casinoPot}
        setCasinoPot={setCasinoPot}
      />
    </div>
  );
}

