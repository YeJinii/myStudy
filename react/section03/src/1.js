// const moduleData = require("./math");

// console.log(moduleData.add(1,2));
// console.log(moduleData.sub(1,2));

// // 객체의 구조분해할당
// const {add, sub} = require("./math");

// console.log(add(1,2));
// console.log(sub(1,2));

// ESM
import { add, sub } from "./math.js"
import mul from "./math.js"
// 합치는 방법
// import mul, { add, sub } from "./math.js"

console.log(add(1,2));
console.log(sub(1,2));

console.log(mul(2,3));