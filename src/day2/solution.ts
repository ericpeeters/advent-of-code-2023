type ColorAmounts = {
  red: number;
  green: number;
  blue: number;
};

const possibilities: ColorAmounts = {
  red: 12,
  green: 13,
  blue: 14,
};

function getColorAmountsForGames(games: string[]): ColorAmounts[] {
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
            (acc, { amount, color }) => ({
              ...acc,
              [color]: acc[color] + amount,
            }),
            { red: 0, green: 0, blue: 0 }
          ),
      {}
    );
}

function isPossible(game: ColorAmounts): boolean {
  return (
    game.red <= possibilities.red &&
    game.green <= possibilities.green &&
    game.blue <= possibilities.blue
  );
}

export function getSumOfPossibleGames(games: string[]): number {
  return getColorAmountsForGames(games).reduce((sum, game, index) => {
    return isPossible(game) ? sum + (index + 1) : sum;
  }, 0);
}
