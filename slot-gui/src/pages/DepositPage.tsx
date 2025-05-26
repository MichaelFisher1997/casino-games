import React, { useState } from "react";

export default function DepositPage({ playerPot, setPlayerPot }) {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  function handleDeposit(e) {
    e.preventDefault();
    const amt = Number(amount);
    if (amt <= 0 || isNaN(amt)) {
      setMessage("Please enter a valid deposit amount.");
      return;
    }
    setPlayerPot((pot) => pot + amt);   // Only increase player pot
    setAmount(0);
    setMessage(`Deposited €${amt.toFixed(2)} to your pot!`);
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Deposit Funds</h2>
      <form onSubmit={handleDeposit} className="flex flex-col gap-4">
        <input
          type="number"
          min={1}
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Amount (€)"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-500 transition-colors"
        >
          Deposit
        </button>
      </form>
      <div className="mt-4 text-green-600 text-center">{message}</div>
      <div className="mt-2 text-center text-xs text-gray-400">
        Player Pot: <span className="font-mono">€{playerPot.toFixed(2)}</span>
      </div>
    </div>
  );
}

