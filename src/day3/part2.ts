/**
 * Retrieve all the indexes for each row we need to search for symbols in
 * @param query - The query we're finding indexes for, for example: '012'
 */
function getIndexesToSearch(
  gearIndex: number,
  rowIndex: number
): Record<string, number[]> {
  return {
    rows: [rowIndex - 1, rowIndex, rowIndex + 1],
    columns: Array(3)
      .fill(gearIndex - 1)
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

const searchDirections = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

function getCellContent(
  matrix: string[],
  y: number,
  x: number,
  [adjustY, adjustX]: number[]
): string {
  return matrix[y + adjustY][x + adjustX];
}

/* ========================================================================== */

export function getSumOfGearsInEngineSchema(input: string[]): number {
  const paddedMatrix = addPaddingToInput(input);
  const schemaMatrix = paddedMatrix.map((row) => row.split(""));
  const gearIndexes = schemaMatrix
    .map((row) => row.findIndex((char) => char === "*"))
    .map((gearIndex, rowIndex) => {
      if (gearIndex === -1) return;

      const indexesToSearch = getIndexesToSearch(gearIndex, rowIndex);

      return indexesToSearch.rows.map((rowIndex) =>
        indexesToSearch.columns.map(
          (columnIndex) => schemaMatrix[rowIndex][columnIndex]
        )
      );
    })
    // Filter out all rows that don't have a gear
    .filter((g) => g !== undefined)
    // Filter out all rows that doesn't have multiple numbers surrounding
    // the gear
    .filter((g) => {
      console.log(g);

      return true;
    });

  console.log(gearIndexes);

  return 0;
}
