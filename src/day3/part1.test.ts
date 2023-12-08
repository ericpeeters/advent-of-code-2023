import { getSumOfPiecesInEngineSchema } from "./part1";

describe("Day 3 - Part 1", () => {
  it("should be able to figure out the sum of all numbers in the engine schema", () => {
    expect(
      getSumOfPiecesInEngineSchema([
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
