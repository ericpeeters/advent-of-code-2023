import { findMarginOfErrorToWinRaces } from "./part1";

/* ========================================================================== */

describe("Day 6 - Part 1", () => {
  const input = `Time:      7  15   30
    Distance:  9  40  200`;

  it("should be able to determine the margin of error to win all races", () => {
    expect(findMarginOfErrorToWinRaces(input)).toEqual(288);
  });
});
