// Function for part one
export function getSumOfCalibrationForDigits(arr: string[]): number {
  return arr.reduce((solution, str) => {
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
  arr: string[]
): number {
  const convertedArr = arr.map((str) => {
    let convertedStr = str;

    Object.keys(writtenNumberMapping).forEach((key) => {
      convertedStr = convertedStr.replace(
        new RegExp(key, "g"),
        writtenNumberMapping[key]
      );
    });

    return convertedStr;
  });

  return getSumOfCalibrationForDigits(convertedArr);
}
