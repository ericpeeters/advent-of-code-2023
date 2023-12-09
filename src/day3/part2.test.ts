import { getSumOfGearsInEngineSchema } from "./part2";

/* ========================================================================== */

describe("Day 3 - Part 2", () => {
  it("should be able to figure out the sum of all gears ratios added together in an engine schema", () => {
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
    ).toEqual(467835);
  });
});
