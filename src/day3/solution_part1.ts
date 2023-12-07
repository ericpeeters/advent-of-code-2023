type EngineSchema = {
  numberIndexes: string[];
  symbolIndexes: number[];
  numbers: string[];
};

/* ========================================================================== */

/**
 * Retrieve all the indexes for each row we need to search for symbols in
 * @param query - The query we're finding indexes for, for example: '012'
 */
function getIndexesToSearch(
  query: string,
  currentRowIndex: number,
  maxIndex: number
): Record<string, number[]> {
  // Make sure we don't return indexes that are outside of the matrix we're
  // looking at, either to the right or left.
  console.log(maxIndex);

  const filterOutOfBounds = (index: number) =>
    index !== -1 && index <= maxIndex + 1;
  const columns = query.split("").map((char) => parseInt(char, 10));
  const previousColumnIndex = columns.at(0) - 1;
  const nextColumnIndex = columns.at(-1) + 1;

  return {
    rows: [currentRowIndex - 1, currentRowIndex, currentRowIndex + 1].filter(
      filterOutOfBounds
    ),
    columns: [previousColumnIndex, ...columns, nextColumnIndex].filter(
      filterOutOfBounds
    ),
  };
}

/* ========================================================================== */

export function getSumOfPiecesInEngineSchema(data: string[]): number {
  const horizontalIndexBoundary = data.at(0)?.length - 1 ?? 0;

  /* ------------------------------------------------------------------------ */

  const schemaMatrix = data.map((row) => row.split(""));
  const engineSchema: EngineSchema[] =
    // To we create a bit of an overview of where the numbers and the symbols
    // are located in the engine schema. We add them to separate properties.
    schemaMatrix
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
      .map((row) => ({
        ...row,
        numberIndexes: row.numberIndexes.reduce(
          (numberIndexes, number, numberIndex) => {
            const previousNumber = row.numberIndexes[numberIndex - 1];
            const previousNumberIsAdjacent = number - previousNumber === 1;

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
      }))

      /* -------------------------------------------------------------------- */

      // Make sure we also add the actual numbers from the engine schema
      // so we can calculate the sum later on.
      // e.g. ['716', '55']
      .map((row, rowIndex) => ({
        ...row,
        numbers: row.numberIndexes.map((number: string[]) => {
          const startIndex = parseInt(number.at(0), 10);
          const endIndex = parseInt(number.at(-1), 10);
          const columnData = schemaMatrix[rowIndex].slice(
            startIndex,
            endIndex + 1
          );

          return columnData.join("");
        }),
      }));

  /* ------------------------------------------------------------------------ */

  // Then we can use the overview to figure out the sum of all the numbers
  // that need to be filtered that, that don't have an adjacent symbol.
  return (
    engineSchema
      .filter((row: EngineSchema, rowIndex) => {
        if (row.numberIndexes.length === 0) return false;

        return row.numberIndexes.some((numberIndex: string) => {
          const { rows: rowsToSearch, columns: columnsToSearch } =
            getIndexesToSearch(numberIndex, rowIndex, horizontalIndexBoundary);

          return rowsToSearch.some((rowToSearchIndex) =>
            engineSchema[rowToSearchIndex].symbolIndexes.some((symbolIndex) => {
              return columnsToSearch.includes(symbolIndex);
            })
          );
        });
      })

      /* -------------------------------------------------------------------- */

      // Now we have all filtered results in place, we need to add the
      // numbers together to get the total sum
      .reduce(
        (sum, row: EngineSchema) =>
          sum + row.numbers.reduce((sum, number) => sum + parseInt(number), 0),
        0
      )
  );
}
