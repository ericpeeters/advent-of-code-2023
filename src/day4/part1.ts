import { executeSolution } from "../utilities/execution";

/* ========================================================================== */

function getNumbersFromString(input: string): number[] {
  const numbers = input.split(" ").filter((x) => x !== "");

  return numbers.map((n) => parseInt(n, 10));
}

export function calculateTotalSumOfCards(input: string[]): number {
  return input.reduce((totalScore, line) => {
    const numbersIndex = line.indexOf(": ");
    const numbers = line.substring(numbersIndex + 1, line.length);
    const [winningNumbers, cardNumbers] = numbers.split(" | ");
    const winningNumbersArray = getNumbersFromString(winningNumbers);
    const cardNumbersArray = getNumbersFromString(cardNumbers);

    let numberOfMatches = 0;

    return (
      totalScore +
      winningNumbersArray.reduce((sum, winningNumber) => {
        const hasWinningNumber = cardNumbersArray.includes(winningNumber);

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

executeSolution("./src/day4/input.txt", calculateTotalSumOfCards);
