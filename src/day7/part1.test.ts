import { rankAndSumHands } from "./part1";

/* ========================================================================== */

describe("Day 7 - Part 1", () => {
  const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

  it("should be able to rank every hand of your set", () => {
    expect(rankAndSumHands(input)).toEqual(6440);
  });
});
