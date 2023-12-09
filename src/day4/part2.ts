import { executeSolution } from "../utilities/execution";

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

export function calculateTotalSumOfCards(input: string[]): number[] {
  const winningNumbers = input.map((line) => {
    const { winningNumbers, cardNumbers } = getCardInfo(line);
    const amountOfWinningNumbers = winningNumbers.reduce(
      (sum, winningNumber) =>
        cardNumbers.includes(winningNumber) ? sum + 1 : sum,
      0
    );

    return amountOfWinningNumbers;
  });

  return winningNumbers;
}

/* ========================================================================== */

// executeSolution("./src/day4/input.txt", calculateTotalSumOfCards);
