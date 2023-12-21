import { benchmark } from "../utilities/benchmark";

import rawInput from "./input";

/* ========================================================================== */

function parseLine(line: string) {
  return parseInt(
    line
      .split(" ")
      .filter((x) => !!x)
      .join("")
      .split(":")[1],
    10
  );
}

export function findMarginOfErrorToWinRaces(input = rawInput) {
  const [timeLine, distanceLine] = input.split("\n");
  const time = parseLine(timeLine);
  const distance = parseLine(distanceLine);

  return new Array(time).fill(0).filter((_, index) => {
    const timeLeft = time - index;
    const raceDistance = index * timeLeft;

    return raceDistance > distance;
  }).length;
}

/* ========================================================================== */

benchmark(findMarginOfErrorToWinRaces);
