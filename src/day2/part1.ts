import { executeSolution } from "../utilities/execution";

/* ========================================================================== */

const maxColorAmounts = {
  blue: 14,
  green: 13,
  red: 12,
} as const;

type Colors = {
  blue?: number;
  green?: number;
  red?: number;
};

function isGamePossible(colors: Colors[]): boolean {
  return colors.every(
    (c) =>
      (c.blue ?? 0) <= maxColorAmounts.blue &&
      (c.green ?? 0) <= maxColorAmounts.green &&
      (c.red ?? 0) <= maxColorAmounts.red
  );
}

export function getSumOfPossibleGames(games: string[]): number {
  const possibleGames = games
    .map((game) => {
      const [gameId, colors] = game.split(": ");

      return {
        [parseInt(gameId.toLowerCase().replace("game ", ""), 10)]: colors
          .split("; ")
          .map((c) =>
            c.split(", ").reduce((colors, colorItem) => {
              const [amount, color] = colorItem.split(" ");

              return {
                ...colors,
                [color]: parseInt(amount, 10),
              };
            }, {})
          ),
      };
    })
    .filter((games) =>
      Object.keys(games).every((g) => isGamePossible(games[g]))
    );

  return possibleGames.reduce((sum, game) => {
    const [gameId] = Object.keys(game);

    return sum + parseInt(gameId, 10);
  }, 0);
}

/* ========================================================================== */

executeSolution("./src/day2/input.txt", getSumOfPossibleGames);
