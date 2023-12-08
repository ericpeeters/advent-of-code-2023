import { getSumOfGearsInEngineSchema } from "./part2";

/* ========================================================================== */

describe("Day 3 - Part 2", () => {
  xit("should be able to figure out the sum of all gears added together in the engine schema", () => {
    expect(
      getSumOfGearsInEngineSchema([
        "467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598..",
      ])
    ).toEqual(4361);
  });
});
