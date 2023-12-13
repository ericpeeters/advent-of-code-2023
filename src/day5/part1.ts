import { benchmark } from "../utilities/benchmark";

import rawInput from "./input";

/* ========================================================================== */

export function getLowestLocationForSeeds(input: string = rawInput): number {
  let data: number[] = input.split("\n")[0].substring(7).split(" ").map(Number);

  input
    .split("\n\n")
    .slice(1)
    .forEach((part) => {
      const mappings = part
        .split("\n")
        .slice(1)
        .map((line) => {
          const [from, until, range] = line.split(" ").map(Number);

          return {
            from,
            until,
            range,
          };
        });

      data = data.map((value) => {
        const lowestRange = mappings.find(
          ({ until, range }) => value >= until && value < until + range
        );

        return lowestRange
          ? value - lowestRange.until + lowestRange.from
          : value;
      });
    });

  return data.reduce((lowest, loc) => Math.min(lowest, loc), Infinity);
}

/* ========================================================================== */

benchmark(getLowestLocationForSeeds);
