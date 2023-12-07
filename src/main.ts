import { getSumOfPowers } from "./day2/solution_part2";
import inputData from "./day2/input";

const s = performance.now();

console.log(getSumOfPowers(inputData));

console.log("Operation took:", performance.now() - s);
