import { getColorAmountsForGames, getSumOfPowers } from "./part2";

/* ========================================================================== */

const testData = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];

/* ========================================================================== */

describe("day2 - part 2", () => {
  it("should be able to calculate the minimal amount of cubes for all colors", () => {
    const minAmounts = getColorAmountsForGames(testData);

    const [gameOne, gameTwo, gameThree, gameFour, gameFive] = minAmounts;

    expect(gameOne).toEqual({
      red: 4,
      green: 2,
      blue: 6,
    });

    expect(gameTwo).toEqual({
      red: 1,
      green: 3,
      blue: 4,
    });

    expect(gameThree).toEqual({
      red: 20,
      green: 13,
      blue: 6,
    });

    expect(gameFour).toEqual({
      red: 14,
      green: 3,
      blue: 15,
    });

    expect(gameFive).toEqual({
      red: 6,
      green: 3,
      blue: 2,
    });
  });

  it("should be able to calculate the power of all minimums together", () => {
    expect(getSumOfPowers(testData)).toEqual(2286);
  });
});
