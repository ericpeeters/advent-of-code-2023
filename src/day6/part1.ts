import { benchmark } from "../utilities/benchmark";

import rawInput from "./input";

/* ========================================================================== */

function parseLine(line: string) {
  return line
    .split(" ")
    .filter((x) => !!x)
    .map(Number);
}

export function findMarginOfErrorToWinRaces(input = rawInput) {
  const [timeLine, distanceLine] = input.split("\n");
  const times = parseLine(timeLine.substring(5));
  const distances = parseLine(distanceLine.substring(8));

  console.log({ times, distances });
}

/* ========================================================================== */

benchmark(findMarginOfErrorToWinRaces);
