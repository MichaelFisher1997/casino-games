// src/games/BlackjackGame.test.ts
import { BlackjackGame } from './BlackjackGame';

// Test for standard 6:5 blackjack (single deck, dealer stands soft 17)
const rtp6_5 = BlackjackGame.simulate({
  deckCount: 1,
  blackjackPayout: 1.2,        // 6:5 payout
  dealerStandsSoft17: true,
}, 100000);

console.log(`Blackjack 6:5 RTP: ${rtp6_5.rtp.toFixed(2)}% (hands: ${rtp6_5.handsPlayed})`);

// Test for standard 3:2 blackjack (should be near 99.5%)
const rtp3_2 = BlackjackGame.simulate({
  deckCount: 1,
  blackjackPayout: 1.5,        // 3:2 payout
  dealerStandsSoft17: true,
}, 100000);

console.log(`Blackjack 3:2 RTP: ${rtp3_2.rtp.toFixed(2)}% (hands: ${rtp3_2.handsPlayed})`);

