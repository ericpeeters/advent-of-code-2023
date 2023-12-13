import { benchmark } from "../utilities/benchmark";
import rawInput from "./input";

/* ========================================================================== */

type ScratchCard = {
  copies: number;
  score: number;
};

/* ========================================================================== */

function getNumbersFromString(input: string): number[] {
  const numbers = input.split(" ").filter((x) => x !== "");

  return numbers.map((n) => parseInt(n, 10));
}

/* ========================================================================== */

function getCardInfo(line: string) {
  const numbersIndex = line.indexOf(": ");
  const numbers = line.substring(numbersIndex + 1, line.length);
  const [winningNumbers, cardNumbers] = numbers
    .split(" | ")
    .map(getNumbersFromString);

  return {
    winningNumbers,
    cardNumbers,
  };
}

/* ========================================================================== */

export function calculateTotalSumOfCards(
  input: string[] = rawInput.split("\n")
): number {
  const winningNumbers = input.map((line) => {
    const { winningNumbers, cardNumbers } = getCardInfo(line);

    return winningNumbers.reduce(
      (sum, winningNumber) =>
        cardNumbers.includes(winningNumber) ? sum + 1 : sum,
      0
    );
  });
  const scratchCards: ScratchCard[] = winningNumbers.map((score) => ({
    copies: 1,
    score,
  }));

  scratchCards.forEach(({ score }, i) => {
    for (let j = i + 1; j <= score + i; j++) {
      const { copies } = scratchCards[i];

      if (j === scratchCards.length) {
        break;
      }

      scratchCards[j].copies += 1 * copies;
    }
  });

  return scratchCards.reduce((sum, { copies }) => sum + copies, 0);
}

/* ========================================================================== */

benchmark(calculateTotalSumOfCards);
