import { getSumOfCalibrationForDigits } from "./part1";

/* ========================================================================== */

describe("Day 1 - Part 1", () => {
  it("should be able to get the sum of calibration", () => {
    const testData = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

    expect(getSumOfCalibrationForDigits(testData)).toEqual(142);
  });
});
