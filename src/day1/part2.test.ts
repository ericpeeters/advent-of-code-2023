import { getSumOfCalibrationIncludingWrittenNumbers } from "./part2";

/* ========================================================================== */

describe("Day 1 - Part 2", () => {
  it("should be able to get the sum of calibration including written numbers", () => {
    const testData = [
      "twone1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ];

    expect(getSumOfCalibrationIncludingWrittenNumbers(testData)).toEqual(281);
  });

  it("should be able to get the sum of calibration including written numbers", () => {
    const testData = ["eightclmbz3gphlxeightwov"];

    expect(getSumOfCalibrationIncludingWrittenNumbers(testData)).toEqual(82);
  });
});
