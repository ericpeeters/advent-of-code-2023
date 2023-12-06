import { getSumOfPossibleGames } from "./day2/solution";
import inputData from "./day2/input";

const s = performance.now();

console.log(getSumOfPossibleGames(inputData));

console.log("Operation took:", performance.now() - s);
