import { benchmark } from "../utilities/benchmark";

/* ========================================================================== */

// Function for part one
export function getSumOfCalibrationForDigits(input: string[]): number {
  return input.reduce((solution, str) => {
    const chars = str.match(/\d/g);

    if (chars === null) {
      return solution;
    }

    let charsToAdd: string = chars[0];

    charsToAdd += chars.length > 1 ? chars[chars.length - 1] : charsToAdd;

    return solution + parseInt(charsToAdd, 10);
  }, 0);
}

/* ========================================================================== */

benchmark(getSumOfCalibrationForDigits);
