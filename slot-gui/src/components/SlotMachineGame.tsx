// src/components/SlotMachineGame.tsx
import React, { useRef, useState } from "react";
import { SlotMachine, defaultPayoutRules } from "../slotMachine";

const machineConfig = {
  symbols: ["🍒", "🍋", "🍉", "🔔", "💎", "7️⃣"],
  spinCost: 0.5,
  payoutRules: defaultPayoutRules,
  balance: 5,
  pot: 100,
};

function randomIdx(max: number) {
  return Math.floor(Math.random() * max);
}

export default function SlotMachineGame() {
  const [reels, setReels] = useState(["🍒", "🍋", "🍉"]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(machineConfig.balance);
  const [pot, setPot] = useState(machineConfig.pot);
  const [autoCount, setAutoCount] = useState(0);

  const slotRef = useRef(new SlotMachine({ ...machineConfig }));

  function updateFromSlot() {
    setBalance(slotRef.current.balance);
    setPot(slotRef.current.pot);
  }

  function spinWithAnimation(finalSpin: () => void) {
    setSpinning(true);
    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      setReels([
        machineConfig.symbols[randomIdx(machineConfig.symbols.length)],
        machineConfig.symbols[randomIdx(machineConfig.symbols.length)],
        machineConfig.symbols[randomIdx(machineConfig.symbols.length)],
      ]);
      spins++;
      if (spins >= maxSpins) {
        clearInterval(interval);
        finalSpin();
        setSpinning(false);
      }
    }, 50);
  }

  function playRound() {
    if (spinning) return;
    setMessage("");
    spinWithAnimation(() => {
      try {
        const { result, win } = slotRef.current.spin();
        setReels(result);
        updateFromSlot();
        setMessage(
          win > 0 ? `🎉 You won €${win.toFixed(2)}!` : "No win. Try again!"
        );
      } catch (e) {
        setMessage(e instanceof Error ? e.message : "Error!");
      }
    });
  }

  async function autoSpin() {
    if (spinning || autoCount < 1) return;
    setMessage("Auto spinning...");
    setSpinning(true);

    for (let i = 0; i < autoCount; i++) {
      await new Promise<void>((resolve) => {
        spinWithAnimation(() => {
          try {
            const { result, win } = slotRef.current.spin();
            setReels(result);
            updateFromSlot();
            setMessage(
              win > 0
                ? `Spin #${i + 1}: 🎉 You won €${win.toFixed(2)}!`
                : `Spin #${i + 1}: No win.`
            );
          } catch (e) {
            setMessage(e instanceof Error ? e.message : "Error!");
          }
          resolve();
        });
      });
      if (i < autoCount - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    setSpinning(false);
  }

  function resetGame() {
    slotRef.current = new SlotMachine({ ...machineConfig });
    setReels(["🍒", "🍋", "🍉"]);
    updateFromSlot();
    setMessage("Game reset!");
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-gray-400 mb-2">
        RTP: <span className="font-semibold">{slotRef.current.getRTP().toFixed(2)}%</span>
      </div>
      <div className="mb-2 text-lg font-semibold">
        Balance: <span className="text-green-600 dark:text-green-400">€{balance.toFixed(2)}</span>
        {" | "}
        Pot: <span className="text-blue-600 dark:text-blue-400">€{pot.toFixed(2)}</span>
      </div>
      <div className="flex justify-center items-center text-6xl my-8 select-none">
        {reels.map((emoji, idx) => (
          <span key={idx} className="mx-3 drop-shadow-lg">{emoji}</span>
        ))}
      </div>
      <button
        className="bg-yellow-400 dark:bg-yellow-600 text-black dark:text-white text-2xl py-2 px-8 rounded-full shadow hover:bg-yellow-300 dark:hover:bg-yellow-500 transition-colors disabled:opacity-60"
        onClick={playRound}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
      <div className="mt-6 flex items-center gap-3">
        <input
          type="number"
          min={1}
          placeholder="Auto spins"
          value={autoCount}
          onChange={e => setAutoCount(Number(e.target.value))}
          className="w-24 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-base text-center focus:outline-none focus:ring focus:border-blue-500"
          disabled={spinning}
        />
        <button
          className="bg-blue-500 dark:bg-blue-700 text-white text-lg py-1 px-6 rounded-full shadow hover:bg-blue-400 dark:hover:bg-blue-600 transition-colors disabled:opacity-60"
          onClick={autoSpin}
          disabled={spinning || autoCount < 1}
        >
          Auto Spin
        </button>
      </div>
      <div className="mt-6 min-h-[2rem] text-lg text-center font-medium">
        {message}
      </div>
      <button
        className="mt-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-1 px-4 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        onClick={resetGame}
        disabled={spinning}
      >
        Reset Game
      </button>
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        Triple 7️⃣ = €20 | Triple 💎 = €10 | Other triple = €5 | Any pair = €0.61
      </div>
    </div>
  );
}

