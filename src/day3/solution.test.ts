import { getSumOfPiecesInEngineSchema } from "./solution_part1";

/* ========================================================================== */

describe("day3 - part 1", () => {
  const engineSchema = [
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
  ];

  it("should be able to figure out the sum of all numbers in the engine schema", () => {
    expect(getSumOfPiecesInEngineSchema(engineSchema)).toEqual(4361);
  });
});
