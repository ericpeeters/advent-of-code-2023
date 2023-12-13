import { benchmark } from "../utilities/benchmark";

import rawInput from "./input";

/* ========================================================================== */

type ColorAmounts = {
  red: number;
  green: number;
  blue: number;
};

/* ========================================================================== */

export function getColorAmountsForGames(games: string[]): ColorAmounts[] {
  return games
    .map((game) =>
      game
        // Split game part from data
        .split(":")[1]
        // Trim off whitespace at start or end
        .trim()
        // Replace any semicolons with commas since we want the same
        // separation sign everywhere
        .replaceAll(";", ",")
    )
    .map(
      (games) =>
        games
          .split(",")
          // First trim off any whitespace off the front and back and
          // split them into separate amount & color tuples
          .map((o) => o.trim().split(" "))
          // Create an object with the amount and color parse as a number
          .map(([amount, color]) => ({ amount: parseInt(amount, 10), color }))
          .reduce(
            (minAmounts, { amount, color }) => {
              if (minAmounts[color] > amount) {
                return minAmounts;
              }

              return {
                ...minAmounts,
                [color]: amount,
              };
            },
            { red: 0, green: 0, blue: 0 }
          ),
      {}
    );
}

export function getSumOfPowers(games: string[] = rawInput.split("\n")): number {
  const minColorAmounts = getColorAmountsForGames(games);

  return minColorAmounts.reduce((sum, colors) => {
    return sum + colors.red * colors.green * colors.blue;
  }, 0);
}

/* ========================================================================== */

benchmark(getSumOfPowers);
