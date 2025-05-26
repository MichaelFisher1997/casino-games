import React, { useRef, useState } from "react";

function getCrashMultiplier() {
  const r = Math.random();
  if (r < 0.01) return 0; // 1% chance instant crash
  return Math.floor((1 / (1 - r)) * 0.975 * 100) / 100;
}

export default function EmojiCrashGame({
  playerPot,
  setPlayerPot,
  casinoPot,
  setCasinoPot,
}: {
  playerPot: number;
  setPlayerPot: (v: number) => void;
  casinoPot: number;
  setCasinoPot: (v: number) => void;
}) {
  const [gameState, setGameState] = useState<"idle" | "running" | "crashed" | "cashed">("idle");
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashAt, setCrashAt] = useState(0);
  const [message, setMessage] = useState("");
  const [bet, setBet] = useState(1);
  const [betLocked, setBetLocked] = useState(false);
  const intervalRef = useRef<any>(null);

  function startGame() {
    if (gameState === "running" || betLocked) return;
    if (bet < 0.01) {
      setMessage("Minimum bet is 0.01");
      return;
    }
    if (bet > playerPot) {
      setMessage("Not enough in your pot!");
      return;
    }
    if (bet > casinoPot) {
      setMessage("Casino can't cover your potential win! Lower your bet.");
      return;
    }

    // Place bet
    setPlayerPot(playerPot - bet);
    setCasinoPot(casinoPot + bet);
    setBetLocked(true);

    const crash = getCrashMultiplier();
    setCrashAt(crash);
    setMultiplier(1.0);
    setGameState("running");
    setMessage("");

    intervalRef.current = setInterval(() => {
      setMultiplier(prev => {
        const next = +(prev + 0.01).toFixed(2);
        if (next >= crash) {
          clearInterval(intervalRef.current);
          setGameState("crashed");
          setMessage(`💥 CRASHED at ${crash.toFixed(2)}x!`);
          setBetLocked(false);
        }
        return next;
      });
    }, 15);
  }

  function cashOut() {
    if (gameState !== "running") return;
    clearInterval(intervalRef.current);
    setGameState("cashed");
    setMessage(`✅ Cashed out at ${multiplier.toFixed(2)}x!`);
    const win = +(bet * multiplier).toFixed(2);
    setPlayerPot(playerPot + win);
    setCasinoPot(casinoPot - win);
    setBetLocked(false);
  }

  function resetGame() {
    clearInterval(intervalRef.current);
    setMultiplier(1.0);
    setCrashAt(0);
    setGameState("idle");
    setMessage("");
    setBetLocked(false);
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 max-w-lg mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">🚀 Emoji Crash</h2>
      <div className="text-4xl mb-2">{gameState === "crashed" ? "💥" : "🚀"}</div>
      <div className="font-mono text-4xl mb-6">
        {multiplier.toFixed(2)}<span className="text-xl">x</span>
      </div>
      <div className="mb-4 min-h-[1.5em] text-center">{message}</div>

      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-sm text-gray-700 dark:text-gray-200">
          Pot: <span className="text-green-500">€{playerPot.toFixed(2)}</span>
        </span>
        <span className="font-mono text-sm text-blue-500">
          Casino: €{casinoPot.toFixed(2)}
        </span>
        <span className="font-mono text-sm text-gray-600 dark:text-gray-300">
          RTP: 97.5%
        </span>
      </div>
      <div className="flex gap-3 mb-4 items-center">
        <label className="text-gray-700 dark:text-gray-200">Bet:</label>
        <input
          type="number"
          min={0.01}
          max={playerPot}
          step={0.01}
          value={bet}
          disabled={gameState === "running" || betLocked}
          onChange={e => setBet(Math.max(0.01, Math.min(Number(e.target.value), playerPot)))}
          className="w-24 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-base text-center focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="flex gap-3">
        {gameState === "idle" && (
          <button className="btn btn-primary" onClick={startGame}>
            Start
          </button>
        )}
        {gameState === "running" && (
          <button className="btn btn-success" onClick={cashOut}>
            Cash Out
          </button>
        )}
        {(gameState === "crashed" || gameState === "cashed") && (
          <button className="btn btn-secondary" onClick={resetGame}>
            New Game
          </button>
        )}
      </div>
      <div className="mt-6 text-gray-500 text-xs text-center">
        Cash out before the rocket 🚀 crashes!<br />
        RTP: 97.5% | House edge built-in.
      </div>
    </div>
  );
}

