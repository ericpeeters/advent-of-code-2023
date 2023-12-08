export function loadInputFile(filePath: string): string[] {
  const fs = require("fs");

  return fs.readFileSync(filePath, "utf8").split("\n");
}
