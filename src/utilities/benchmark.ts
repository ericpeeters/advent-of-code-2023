/**
 * Simple observer function that measures performance
 * @param cb
 * @returns
 */
export function benchmark<T = any>(
  cb: Function
): (...args: T[]) => { output: string; duration: string } {
  return (...args: T[]) => {
    const start = performance.now();
    const output = cb(...args);
    const end = performance.now();

    return {
      output: `Output is: ${output}`,
      duration: `Executed in ${end - start}ms`,
    };
  };
}
