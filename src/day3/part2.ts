import { executeSolution } from "../utilities/execution";

/* ========================================================================== */

type NumberMatch = {
  number: number;
  index: number;
  length: number;
  indexes?: number[];
};

/* ========================================================================== */

function getAdjacentNumberIndex(
  numberIndexes: NumberMatch[],
  index: number
): NumberMatch {
  return numberIndexes.find(({ indexes }) => indexes.includes(index));
}

function getNumberIndexes(rowWithNumbers: NumberMatch[]): NumberMatch[] {
  return rowWithNumbers.map(({ index, number, length }) => {
    let indexes: number[] = [];

    for (let j = 0; j < length; j++) {
      indexes.push(index + j);
    }

    return { number, length, index, indexes };
  });
}

/* ========================================================================== */

function getAllAdjacentNumbersIndexes(
  gearIndexes: number[],
  numberMatches: NumberMatch[]
): number[] {
  return gearIndexes
    .reduce((matches, index) => {
      const numberMatch: NumberMatch = getAdjacentNumberIndex(
        numberMatches,
        index
      );

      if (
        numberMatch !== undefined &&
        matches.every((numberIndex) => numberIndex.index !== numberMatch.index)
      ) {
        matches.push(numberMatch);
      }

      return matches;
    }, [])
    .map((numberIndex) => numberIndex.number);
}

export function getSumOfGearsInEngineSchema(engineSchema: string[]): number {
  const gearIndexes = [];
  const numbers = [];

  /* ------------------------------------------------------------------------ */

  engineSchema.forEach((row) => {
    // Retrieve all the gear symbols from the current row
    const gearMatches = [...row.matchAll(/(\*)/g)];
    const numberMatches = [...row.matchAll(/(\d+)/g)];

    // If we have an gear in this row, store the index
    gearIndexes.push(
      gearMatches.length == 0 ? [] : gearMatches.map((o) => o.index)
    );

    numbers.push(
      numberMatches.length == 0
        ? []
        : numberMatches.map(
            (match) =>
              ({
                index: match.index,
                number: parseInt(match[0]),
                length: match[0].length,
              } satisfies NumberMatch)
          )
    );
  });

  /* ------------------------------------------------------------------------ */

  return gearIndexes.reduce((sum, gears, retrieveNumberIndex) => {
    let rowGearRatioSum = gears.reduce(
      (sumOfRow: number, gearIndex: number) => {
        const currentRow = getNumberIndexes(numbers[retrieveNumberIndex]);
        const aboveRow = getNumberIndexes(
          numbers[retrieveNumberIndex - 1] || []
        );
        const belowRow = getNumberIndexes(
          numbers[retrieveNumberIndex + 1] || []
        );
        const adjacentNumbers = [
          ...getAllAdjacentNumbersIndexes(
            [gearIndex - 1, gearIndex + 1],
            currentRow
          ),
          ...getAllAdjacentNumbersIndexes(
            [gearIndex, gearIndex - 1, gearIndex + 1],
            aboveRow
          ),
          ...getAllAdjacentNumbersIndexes(
            [gearIndex, gearIndex - 1, gearIndex + 1],
            belowRow
          ),
        ];

        return adjacentNumbers.length == 2
          ? sumOfRow + adjacentNumbers[0] * adjacentNumbers[1]
          : sumOfRow;
      },
      0
    );

    return sum + rowGearRatioSum;
  }, 0);
}

/* ========================================================================== */

executeSolution("./src/day3/input.txt", getSumOfGearsInEngineSchema);
