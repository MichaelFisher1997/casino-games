import React, { useState } from "react";
import { BlackjackGame } from "../games/BlackjackGame"; // Adjust path as needed

// Util to get SVG path for a card
function cardSvgPath(card: {rank: string, suit: string}) {
  return `/src/assets/playing-cards/${card.suit}s/${card.rank}_of_${card.suit}s.svg`
  // Adjust this if your folders are e.g. "clubs", not "clubss"
}

// Translate rank code to filename (A, 2..10, J, Q, K)
function rankFile(rank: string) {
  return rank === "10" ? "10" : rank[0].toUpperCase();
}

const SUITS = ["spades", "hearts", "diamonds", "clubs"];
const RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

export default function BlackjackGameUI() {
  const [game, setGame] = useState(() => new BlackjackGame({
    deckCount: 1,
    blackjackPayout: 1.2,
    dealerStandsSoft17: true,
  }));
  const [playerHand, setPlayerHand] = useState<any[]>([]);
  const [dealerHand, setDealerHand] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [inPlay, setInPlay] = useState(false);

  function startNewHand() {
    const player = [game.drawCard(), game.drawCard()];
    const dealer = [game.drawCard(), game.drawCard()];
    setPlayerHand(player);
    setDealerHand(dealer);
    setInPlay(true);
    setMessage("");
  }

  function hit() {
    const nextHand = [...playerHand, game.drawCard()];
    setPlayerHand(nextHand);
    const { value } = (game as any).constructor.handValue(nextHand); // hack: expose handValue for UI
    if (value > 21) {
      setMessage("Bust! You lose.");
      setInPlay(false);
    }
  }

  function stand() {
    // Dealer auto-play logic (very basic for now)
    let dHand = [...dealerHand];
    while ((game as any).constructor.dealerShouldHit(dHand, game.rules)) {
      dHand.push(game.drawCard());
    }
    setDealerHand(dHand);

    // Settle
    const playerVal = (game as any).constructor.handValue(playerHand).value;
    const dealerVal = (game as any).constructor.handValue(dHand).value;
    if (dealerVal > 21 || playerVal > dealerVal) {
      setMessage("You win!");
    } else if (playerVal < dealerVal) {
      setMessage("You lose!");
    } else {
      setMessage("Push!");
    }
    setInPlay(false);
  }

  // On mount, start a game
  React.useEffect(() => { startNewHand(); }, []);

  // Utility to render a hand
  function renderHand(hand: any[]) {
    return (
      <div className="flex gap-2">
        {hand.map((card, i) => (
          <img
            key={i}
            src={`/assets/playing-cards/${card.suit}/${card.rank}_of_${card.suit}.svg`}
            alt={`${card.rank} of ${card.suit}`}
            className="w-16 h-24 shadow-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Blackjack</h2>
      <div className="mb-4">
        <div className="font-bold">Dealer's Hand:</div>
        {renderHand(dealerHand)}
      </div>
      <div className="mb-4">
        <div className="font-bold">Your Hand:</div>
        {renderHand(playerHand)}
      </div>
      <div className="text-lg font-bold text-center mb-4">{message}</div>
      <div className="flex justify-center gap-4">
        <button className="btn btn-primary" onClick={hit} disabled={!inPlay}>Hit</button>
        <button className="btn btn-primary" onClick={stand} disabled={!inPlay}>Stand</button>
        <button className="btn btn-secondary" onClick={startNewHand}>New Game</button>
      </div>
    </div>
  );
}

