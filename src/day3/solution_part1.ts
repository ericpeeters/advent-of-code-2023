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
  currentRowIndex: number,
  maxColumnIndex: number
): Record<string, number[]> {
  // Make sure we don't return indexes that are outside of the matrix we're
  // looking at, either to the right or left.
  const filterOutOfBounds = (index: number) =>
    index !== -1 && index <= maxColumnIndex;
  const [startColumn] = query.split("").map((char) => parseInt(char, 10));

  return {
    rows: [currentRowIndex - 1, currentRowIndex, currentRowIndex + 1].filter(
      filterOutOfBounds
    ),
    columns: Array(query.length + 2)
      .fill(startColumn - 1)
      .map((c, i) => c + i)
      .filter(filterOutOfBounds),
  };
}

/* ========================================================================== */

export function getSumOfPiecesInEngineSchema(data: string[]): any {
  const maxColumnIndex = data.at(0).length - 1;

  /* ------------------------------------------------------------------------ */

  const schemaMatrix = data.map((row) => row.split(""));
  // To we create a bit of an overview of where the numbers and the symbols
  // are located in the engine schema. We add them to separate properties.
  const engineSchema = schemaMatrix
    .map((row) => {
      const numberIndexes = [];
      const symbolIndexes = [];

      row.forEach((char, charIndex) => {
        const isNumber = !isNaN(Number(char));
        const isSymbol = !isNumber && char !== ".";

        if (isSymbol) symbolIndexes.push(charIndex);
        if (isNumber) numberIndexes.push(charIndex);
      });

      return {
        numberIndexes,
        symbolIndexes,
      };
    })

    /* -------------------------------------------------------------------- */

    // Now that we have an overview, we override the number indexes property
    // by adding together all adjacent numbers.
    // e.g. ['012', '567']
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
            )}${number}`;
          } else {
            numberIndexes.push(number.toString());
          }

          return numberIndexes;
        },
        []
      ),
    }));

  /* -------------------------------------------------------------------- */

  // Make sure we also add the actual numbers from the engine schema
  // so we can calculate the sum later on.
  // e.g. ['716', '55']
  return (
    engineSchema
      .map((row: EngineSchemaRow, rowIndex) => ({
        ...row,
        numbers: row.numberIndexes.reduce(
          (numbers: number[], numberIndex: string) => {
            const startIndex = parseInt(numberIndex.at(0), 10);
            const endIndex = parseInt(numberIndex.at(-1), 10);
            const columnData = schemaMatrix[rowIndex].slice(
              startIndex,
              endIndex + 1
            );
            const foundNumber = columnData.join("");
            const { rows: rowsToSearch, columns: columnsToSearch } =
              getIndexesToSearch(numberIndex, rowIndex, maxColumnIndex);
            const hasAdjacentSymbol = rowsToSearch.some((rowIndex) => {
              const { symbolIndexes } = engineSchema[rowIndex];

              return symbolIndexes.some((symbolIndex) =>
                columnsToSearch.includes(symbolIndex)
              );
            });

            if (hasAdjacentSymbol) {
              numbers.push(parseInt(foundNumber, 10));
            }

            return numbers;
          },
          []
        ),
      }))

      // /* -------------------------------------------------------------------- */

      // Now we have all filtered results in place, we need to add the
      // numbers together to get the total sum
      .reduce(
        (sum, row: EngineSchemaRow) =>
          sum + (row.numbers?.reduce((sum, n) => sum + n, 0) ?? 0),
        0
      )
  );
}
