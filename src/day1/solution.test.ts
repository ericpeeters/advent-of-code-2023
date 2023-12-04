import {
  getSumOfCalibrationForDigits,
  getSumOfCalibrationIncludingWrittenNumbers,
} from "./solution";

describe("day1", () => {
  it("should be able to get the sum of calibration", () => {
    const testData = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

    expect(getSumOfCalibrationForDigits(testData)).toEqual(142);
  });

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
    const testData = [
      "eightclmbz3gphlxeightwov",
      // "eightclmbz3twogphl4xeightwov",
    ];

    expect(getSumOfCalibrationIncludingWrittenNumbers(testData)).toEqual(82);
  });
});
