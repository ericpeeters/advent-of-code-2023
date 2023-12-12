import { benchmark } from "./benchmark";
import { loadInputFile } from "./input-loader";

/* ========================================================================== */

export function executeSolution(inputPath: string | null, fn: Function): void {
  let input: ReturnType<typeof loadInputFile> | undefined = undefined;

  if (inputPath) {
    input = loadInputFile(inputPath);
  }

  const { output, duration } = benchmark(fn)(input);

  if (process.env.npm_lifecycle_event !== "test") {
    console.log({ output, duration });
  }
}
