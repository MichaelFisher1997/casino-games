import React, { useState } from "react";
import { BlackjackGame } from "../games/BlackjackGame";

// Type for card for TS hinting
type Card = { suit: string, rank: string };

export default function BlackjackGameUI({ playerPot, setPlayerPot, casinoPot, setCasinoPot }) {
  const [game] = useState(() => new BlackjackGame({
    deckCount: 1,
    blackjackPayout: 1.2,
    dealerStandsSoft17: true,
  }));

  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [message, setMessage] = useState("");
  const [inPlay, setInPlay] = useState(false);
  const [bet, setBet] = useState(1);
  const [showDealerHand, setShowDealerHand] = useState(false);

  // Get hand value (using logic from BlackjackGame)
  function getHandValue(hand: Card[]) {
    return (BlackjackGame as any).handValue(hand).value;
  }

  function startNewHand() {
    if (playerPot < bet) {
      setMessage("Not enough in your pot to bet!");
      return;
    }
    setPlayerHand([]);
    setDealerHand([]);
    setShowDealerHand(false);

    // Draw cards
    const player = [game.drawCard(), game.drawCard()];
    const dealer = [game.drawCard(), game.drawCard()];
    setPlayerHand(player);
    setDealerHand(dealer);

    setInPlay(true);
    setMessage("");
    setPlayerPot(playerPot - bet); // Remove bet from player pot
    setCasinoPot(casinoPot + bet); // Add bet to casino pot
  }

  function hit() {
    if (!inPlay) return;
    const nextHand = [...playerHand, game.drawCard()];
    setPlayerHand(nextHand);
    const { value } = (BlackjackGame as any).handValue(nextHand);
    if (value > 21) {
      setMessage("Bust! You lose.");
      setInPlay(false);
      setShowDealerHand(true);
    }
  }

  function stand() {
    if (!inPlay) return;
    // Dealer plays
    let dHand = [...dealerHand];
    while ((BlackjackGame as any).dealerShouldHit(dHand, game.rules)) {
      dHand.push(game.drawCard());
    }
    setDealerHand(dHand);

    const playerVal = (BlackjackGame as any).handValue(playerHand).value;
    const dealerVal = (BlackjackGame as any).handValue(dHand).value;
    setShowDealerHand(true);

    if (dealerVal > 21) {
      setMessage("Dealer busts! You win.");
      setPlayerPot(playerPot + bet * 2); // Win: get original bet + win
      setCasinoPot(casinoPot - bet * 2);
    } else if (playerVal > dealerVal) {
      setMessage("You win!");
      setPlayerPot(playerPot + bet * 2); // Win: get original bet + win
      setCasinoPot(casinoPot - bet * 2);
    } else if (playerVal < dealerVal) {
      setMessage("You lose!");
      // Lose: bet already moved to casino
    } else {
      setMessage("Push!");
      setPlayerPot(playerPot + bet); // Push: refund bet
      setCasinoPot(casinoPot - bet);
    }
    setInPlay(false);
  }

  // Show/hide dealer second card
  function renderHand(hand: Card[], hideSecondCard = false) {
    return (
      <div className="flex gap-2">
        {hand.map((card, i) =>
          hideSecondCard && i === 1
            ? (
              <img
                key={i}
                src="/assets/playing-cards/back_of_card.svg"
                alt="Hidden card"
                className="w-16 h-24"
              />
            )
            : (
              <img
                key={i}
                src={`/assets/playing-cards/${card.suit}/${card.rank}_of_${card.suit}.svg`}
                alt={`${card.rank} of ${card.suit}`}
                className="w-16 h-24"
              />
            )
        )}
      </div>
    );
  }

  // Hand values
  const playerValue = getHandValue(playerHand);
  const dealerValue = getHandValue(dealerHand);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Blackjack</h2>
      <div className="mb-2 flex justify-between items-center">
        <div>
          <span>Your Pot: <span className="font-mono">€{playerPot.toFixed(2)}</span></span>
        </div>
        <div>
          Bet:{" "}
          <input
            type="number"
            value={bet}
            min={1}
            max={playerPot}
            onChange={e => setBet(Math.max(1, Math.min(Number(e.target.value), playerPot)))}
            className="w-16 px-1 rounded bg-gray-100 dark:bg-gray-700 border ml-1"
            disabled={inPlay}
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="font-bold">
          Dealer's Hand:
          <span className="ml-2 font-mono">
            Total:{" "}
            {showDealerHand
              ? dealerValue
              : dealerHand[0]
              ? (BlackjackGame as any).handValue([dealerHand[0]]).value
              : "?"}
          </span>
        </div>
        {renderHand(dealerHand, !showDealerHand)}
      </div>
      <div className="mb-4">
        <div className="font-bold">
          Your Hand:
          <span className="ml-2 font-mono">Total: {playerValue}</span>
        </div>
        {renderHand(playerHand)}
      </div>
      <div className="text-lg font-bold text-center mb-4">{message}</div>
      <div className="flex justify-center gap-4">
        <button className="btn btn-primary" onClick={hit} disabled={!inPlay}>
          Hit
        </button>
        <button className="btn btn-primary" onClick={stand} disabled={!inPlay}>
          Stand
        </button>
        <button className="btn btn-secondary" onClick={startNewHand} disabled={inPlay || playerPot < bet}>
          New Game
        </button>
      </div>
    </div>
  );
}

