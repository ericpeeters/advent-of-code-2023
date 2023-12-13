/**
 * Simple observer function that measures performance
 * @param cb
 * @returns
 */
export function benchmark(cb: Function): void {
  if (process.env.npm_lifecycle_event === "test") {
    return;
  }

  const start = performance.now();
  const returnValue = cb();
  const end = performance.now();

  console.log({
    output: `Output is: ${returnValue}`,
    duration: `Executed in ${end - start}ms`,
  });
}
