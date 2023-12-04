import { getSumOfCalibrationIncludingWrittenNumbers } from "./day1/solution";
import calibrationData from "./day1/data";

const s = performance.now();

// console.log(getSumOfCalibration(calibrationData));
console.log(getSumOfCalibrationIncludingWrittenNumbers(calibrationData));

console.log("Operation took:", performance.now() - s);
