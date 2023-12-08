import { executeSolution } from "../utilities/execution";
import { getSumOfCalibrationForDigits } from "./part1";

/* ========================================================================== */

const writtenNumberMapping: Record<string, string> = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
};

// Function for part two
export function getSumOfCalibrationIncludingWrittenNumbers(
  input: string[]
): number {
  return getSumOfCalibrationForDigits(
    input.map((line) => {
      Object.keys(writtenNumberMapping).forEach((key) => {
        line = line.replace(new RegExp(key, "g"), writtenNumberMapping[key]);
      });

      return line;
    })
  );
}

/* ========================================================================== */

executeSolution(
  "./src/day1/input.txt",
  getSumOfCalibrationIncludingWrittenNumbers
);
