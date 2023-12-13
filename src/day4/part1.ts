import { benchmark } from "../utilities/benchmark";
import rawInput from "./input";

/* ========================================================================== */

function getNumbersFromString(input: string): number[] {
  const numbers = input.split(" ").filter((x) => x !== "");

  return numbers.map((n) => parseInt(n, 10));
}

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
  return input.reduce((totalScore, line) => {
    const { winningNumbers, cardNumbers } = getCardInfo(line);

    let numberOfMatches = 0;

    return (
      totalScore +
      winningNumbers.reduce((sum, winningNumber) => {
        const hasWinningNumber = cardNumbers.includes(winningNumber);

        if (!hasWinningNumber) {
          return sum;
        }

        numberOfMatches++;

        return numberOfMatches === 1 ? 1 : sum * 2;
      }, 0)
    );
  }, 0);
}

/* ========================================================================== */

benchmark(calculateTotalSumOfCards);
