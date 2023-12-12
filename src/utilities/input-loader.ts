const fs = require("fs");

export function loadRawInputFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function loadInputFile(filePath: string): string[] {
  return loadRawInputFile(filePath).split("\n");
}
