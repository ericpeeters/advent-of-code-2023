import { benchmark } from "../utilities/benchmark";

import rawInput from "./input";

/* ========================================================================== */

function parseLine(line: string) {
  return line
    .split(" ")
    .filter((x) => !!x)
    .map(Number)
    .filter((x) => !isNaN(x));
}

export function findMarginOfErrorToWinRaces(input = rawInput) {
  const [timeLine, distanceLine] = input.split("\n");
  const times = parseLine(timeLine);
  const distances = parseLine(distanceLine);

  const winning = times.map((time, timeIndex) => {
    return new Array(time).fill(0).filter((_, index) => {
      const timeLeft = time - index;
      const raceDistance = index * timeLeft;

      return raceDistance > distances[timeIndex];
    }).length;
  });

  return winning.filter((x) => x !== 0).reduce((a, b) => a * b);
}

/* ========================================================================== */

benchmark(findMarginOfErrorToWinRaces);
