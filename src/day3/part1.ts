import { executeSolution } from "../utilities/execution";

/* ========================================================================== */

type EngineSchemaRow = {
  numberIndexes: string[];
  symbolIndexes: number[];
  numbers?: number[];
};

/* ========================================================================== */

/**
 * Retrieve all the indexes for each row we need to search for symbols in
 * @param query - The query we're finding indexes for, for example: '012'
 */
function getIndexesToSearch(
  query: string,
  currentRowIndex: number
): Record<string, number[]> {
  // Make sure we don't return indexes that are outside of the matrix we're
  // looking at, either to the right or left.
  const columns = query.split("_").map((char) => parseInt(char, 10));
  const startColumn = columns.at(0);

  return {
    rows: [currentRowIndex - 1, currentRowIndex, currentRowIndex + 1],
    columns: Array(columns.length + 2)
      .fill(startColumn - 1)
      .map((c, i) => c + i),
  };
}

/* ========================================================================== */

/**
 * We add dots around the sides and at the top and bottom of the input so we
 * don't have to worry about checking if we're out of bounds.
 */
function addPaddingToInput(input: string[]): string[] {
  const maxColumnIndex = input.at(0).length - 1;
  const paddedInput = input.map((row) => `.${row}.`);

  paddedInput.unshift(".".repeat(maxColumnIndex + 2));
  paddedInput.push(".".repeat(maxColumnIndex + 2));

  return paddedInput;
}

/* ========================================================================== */

export function getSumOfPiecesInEngineSchema(input: string[]): number {
  const paddedMatrix = addPaddingToInput(input);
  const schemaMatrix = paddedMatrix.map((row) => row.split(""));
  // To we create a bit of an overview of where the numbers and the symbols
  // are located in the engine schema. We add them to separate properties.
  const engineSchemaWithNumberAndSymbolIndexes = schemaMatrix.map((row) => {
    const numberIndexes = [];
    const symbolIndexes = [];

    row.forEach((char, charIndex) => {
      const isNumber = !isNaN(parseInt(char, 10));
      const isSymbol = !isNumber && char !== ".";

      if (isSymbol) symbolIndexes.push(charIndex);
      if (isNumber) numberIndexes.push(charIndex);
    });

    return {
      numberIndexes,
      symbolIndexes,
    };
  });

  /* ------------------------------------------------------------------------ */

  // Now that we have an overview, we override the number indexes property
  // by adding together all adjacent numbers, denoted by an underscore to make
  // sure we also account for multi digit indexes.
  // e.g. ['0_1_2', '5_6_7', '66_67_68']
  return (
    engineSchemaWithNumberAndSymbolIndexes
      .map((row: EngineSchemaRow) => ({
        ...row,
        numberIndexes: row.numberIndexes.reduce(
          (numberIndexes, number, numberIndex) => {
            const previousNumber = parseInt(
              row.numberIndexes[numberIndex - 1],
              10
            );
            const previousNumberIsAdjacent =
              !isNaN(previousNumber) &&
              parseInt(number, 10) - previousNumber === 1;

            if (previousNumberIsAdjacent) {
              numberIndexes[numberIndexes.length - 1] = `${numberIndexes.at(
                -1
              )}_${number}`;
            } else {
              numberIndexes.push(number.toString());
            }

            return numberIndexes;
          },
          []
        ),
      }))

      /* -------------------------------------------------------------------- */

      // Make sure we also add the actual numbers from the engine schema
      // so we can calculate the sum later on.
      // Here we also filter out numbers that are not adjacent to a symbol.
      // e.g. [716, 55]
      .map((row: EngineSchemaRow, rowIndex) => ({
        ...row,
        numbers: row.numberIndexes.reduce(
          (numbers: number[], numberIndex: string) => {
            const numberIndexes = numberIndex.split("_");
            const startIndex = parseInt(numberIndexes.at(0), 10);
            const endIndex = parseInt(numberIndexes.at(-1), 10);
            const foundNumber = paddedMatrix[rowIndex].substring(
              startIndex,
              endIndex + 1
            );
            const { rows: rowsToSearch, columns: columnsToSearch } =
              getIndexesToSearch(numberIndex, rowIndex);
            const hasAdjacentSymbol = rowsToSearch.some((rowIndex) =>
              engineSchemaWithNumberAndSymbolIndexes[
                rowIndex
              ].symbolIndexes.some((symbolIndex) =>
                columnsToSearch.includes(symbolIndex)
              )
            );

            if (hasAdjacentSymbol) {
              numbers.push(parseInt(foundNumber, 10));
            }

            return numbers;
          },
          []
        ),
      }))

      /* -------------------------------------------------------------------- */

      // Now we have all filtered results in place, we need to add the
      // numbers together to get the total sum
      .reduce(
        (sum, row: EngineSchemaRow) =>
          sum + (row.numbers?.reduce((sum, n) => sum + n, 0) ?? 0),
        0
      )
  );
}

/* ========================================================================== */

executeSolution("./src/day3/input.txt", getSumOfPiecesInEngineSchema);
