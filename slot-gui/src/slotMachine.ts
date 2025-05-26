// src/slotMachine.ts

export type Symbol = string;

export interface PayoutRule {
  name: string;
  check: (result: Symbol[]) => boolean;
  payout: number;
  // for RTP: probability (optional, calculated if needed)
}

export class SlotMachine {
  symbols: Symbol[];
  spinCost: number;
  payoutRules: PayoutRule[];
  balance: number;
  pot: number;

  // Game state
  lastSpin: Symbol[] = [];
  lastWin: number = 0;

  constructor({
    symbols = ["🍒", "🍋", "🍉", "🔔", "💎", "7️⃣"],
    spinCost = 0.5,
    payoutRules = defaultPayoutRules,
    balance = 5,
    pot = 100,
  } = {}) {
    this.symbols = symbols;
    this.spinCost = spinCost;
    this.payoutRules = payoutRules;
    this.balance = balance;
    this.pot = pot;
  }

  static getAllPossibleResults(symbols: Symbol[]): Symbol[][] {
    const results: Symbol[][] = [];
    for (let i = 0; i < symbols.length; i++) {
      for (let j = 0; j < symbols.length; j++) {
        for (let k = 0; k < symbols.length; k++) {
          results.push([symbols[i], symbols[j], symbols[k]]);
        }
      }
    }
    return results;
  }

  static calcRTP(
    symbols: Symbol[],
    payoutRules: PayoutRule[],
    spinCost: number
  ): number {
    // All possible results (uniform distribution)
    const allResults = SlotMachine.getAllPossibleResults(symbols);
    const n = allResults.length;
    let expectedReturn = 0;
    for (const result of allResults) {
      for (const rule of payoutRules) {
        if (rule.check(result)) {
          expectedReturn += rule.payout / n;
          break; // Only pay highest matching rule
        }
      }
    }
    return (expectedReturn / spinCost) * 100; // as percentage
  }

  spin(): { result: Symbol[]; win: number } {
    if (this.balance < this.spinCost) throw new Error("Insufficient funds");
    if (this.pot < 0) throw new Error("Pot empty!");

    this.balance -= this.spinCost;
    this.pot += this.spinCost;

    const result = [
      this.symbols[randomIdx(this.symbols.length)],
      this.symbols[randomIdx(this.symbols.length)],
      this.symbols[randomIdx(this.symbols.length)],
    ];
    this.lastSpin = result;

    let win = 0;
    for (const rule of this.payoutRules) {
      if (rule.check(result)) {
        win = Math.min(rule.payout, this.pot); // can't overdraw pot
        break;
      }
    }
    if (win > 0) {
      this.balance += win;
      this.pot -= win;
    }
    this.lastWin = win;
    return { result, win };
  }

  async autoSpin(count: number, onSpin?: (spin: { result: Symbol[]; win: number; i: number }) => void) {
    for (let i = 0; i < count; i++) {
      try {
        const spinResult = this.spin();
        if (onSpin) onSpin({ ...spinResult, i });
      } catch (e) {
        if (onSpin) onSpin({ result: this.lastSpin, win: this.lastWin, i });
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  getRTP(): number {
    return SlotMachine.calcRTP(this.symbols, this.payoutRules, this.spinCost);
  }
}

function randomIdx(max: number): number {
  return Math.floor(Math.random() * max);
}

export const defaultPayoutRules: PayoutRule[] = [
  {
    name: "Triple 7️⃣",
    check: (res) => res.every((s) => s === "7️⃣"),
    payout: 20,
  },
  {
    name: "Triple 💎",
    check: (res) => res.every((s) => s === "💎"),
    payout: 10,
  },
  {
    name: "Any other triple",
    check: (res) =>
      res[0] === res[1] && res[1] === res[2] && !["7️⃣", "💎"].includes(res[0]),
    payout: 5,
  },
  {
    name: "Any pair",
    check: (res) =>
      (res[0] === res[1] && res[1] !== res[2]) ||
      (res[0] === res[2] && res[0] !== res[1]) ||
      (res[1] === res[2] && res[0] !== res[1]),
    payout: 0.61, // <<< LOWERED!
  },
  {
    name: "No win",
    check: (_res) => true,
    payout: 0,
  },
];

