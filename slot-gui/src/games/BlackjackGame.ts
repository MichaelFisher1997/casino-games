// src/games/BlackjackGame.ts

type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
type Rank = 'A' | '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'J'|'Q'|'K';

export interface BlackjackRules {
  deckCount: number;           // 1 for single deck
  blackjackPayout: number;     // 1.5 for 3:2, 1.2 for 6:5, 1 for 1:1
  dealerStandsSoft17: boolean; // true = stands on all 17
}

export interface RTPResult {
  handsPlayed: number;
  totalBet: number;
  totalPayout: number;
  rtp: number;
}

export interface Card {
  suit: Suit;
  rank: Rank;
}

function makeDecks(deckCount: number): Card[] {
  const suits: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
  const ranks: Rank[] = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  let cards: Card[] = [];
  for (let i=0; i<deckCount; ++i)
    for (const suit of suits)
      for (const rank of ranks)
        cards.push({ suit, rank });
  return cards;
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Card value logic
function cardValue(card: Card): number {
  if (card.rank === 'A') return 11;
  if (['K', 'Q', 'J'].includes(card.rank)) return 10;
  return Number(card.rank);
}

function handValue(cards: Card[]): { value: number, soft: boolean } {
  let total = 0, aces = 0;
  for (const c of cards) {
    if (c.rank === 'A') aces++;
    total += cardValue(c);
  }
  while (total > 21 && aces) {
    total -= 10;
    aces--;
  }
  // soft if there is at least one Ace still counted as 11
  return { value: total, soft: aces > 0 };
}

// Player auto strategy: basic (stand 17+, hit below)
function playerShouldHit(hand: Card[], dealerCard: Card): boolean {
  const { value } = handValue(hand);
  return value < 17;
}

// Dealer logic
function dealerShouldHit(hand: Card[], rules: BlackjackRules): boolean {
  const v = handValue(hand);
  if (v.value < 17) return true;
  if (v.value === 17 && v.soft && !rules.dealerStandsSoft17) return true;
  return false;
}

export class BlackjackGame {
  rules: BlackjackRules;
  deck: Card[];
  deckIdx: number;
  constructor(rules: Partial<BlackjackRules> = {}) {
    this.rules = {
      deckCount: 1,
      blackjackPayout: 1.2,    // 6:5 default (change to 1.5 for 3:2, etc.)
      dealerStandsSoft17: true,
      ...rules,
    };
    this.deck = shuffle(makeDecks(this.rules.deckCount));
    this.deckIdx = 0;
  }

  drawCard(): Card {
    if (this.deckIdx >= this.deck.length) {
      this.deck = shuffle(makeDecks(this.rules.deckCount));
      this.deckIdx = 0;
    }
    return this.deck[this.deckIdx++];
  }

  // Play a single hand (returns payout for player on a 1-unit bet)
  playHand(): number {
    const player: Card[] = [this.drawCard(), this.drawCard()];
    const dealer: Card[] = [this.drawCard(), this.drawCard()];

    // Check player blackjack
    const playerVal = handValue(player);
    const dealerVal = handValue(dealer);

    const isPlayerBJ = (player.length === 2 && playerVal.value === 21);
    const isDealerBJ = (dealer.length === 2 && dealerVal.value === 21);

    // Blackjack payout
    if (isPlayerBJ && isDealerBJ) return 1; // push
    if (isPlayerBJ) return 1 + this.rules.blackjackPayout; // win (bet back + payout)
    if (isDealerBJ) return 0; // player loses

    // Player hits/stands
    let playerHand = [...player];
    while (playerShouldHit(playerHand, dealer[0])) {
      playerHand.push(this.drawCard());
      if (handValue(playerHand).value > 21) return 0; // bust
    }

    // Dealer hits/stands
    let dealerHand = [...dealer];
    while (dealerShouldHit(dealerHand, this.rules)) {
      dealerHand.push(this.drawCard());
    }
    const pVal = handValue(playerHand).value;
    const dVal = handValue(dealerHand).value;

    // Settle
    if (pVal > 21) return 0; // player busts
    if (dVal > 21) return 2; // dealer busts, player gets bet + win
    if (pVal > dVal) return 2; // player wins, gets bet + win
    if (pVal < dVal) return 0; // player loses
    return 1; // push
  }

  // Simulate many hands for RTP
  static simulate(rules: Partial<BlackjackRules>, nHands = 100000): RTPResult {
    let game = new BlackjackGame(rules);
    let totalBet = 0, totalPayout = 0;
    for (let i = 0; i < nHands; ++i) {
      totalBet += 1;
      totalPayout += game.playHand();
    }
    return {
      handsPlayed: nHands,
      totalBet,
      totalPayout,
      rtp: (totalPayout / totalBet) * 100,
    };
  }

  // Add static helpers for UI usage (attached after class definition below!)
}

// Attach helpers as static methods
(BlackjackGame as any).handValue = handValue;
(BlackjackGame as any).dealerShouldHit = dealerShouldHit;

