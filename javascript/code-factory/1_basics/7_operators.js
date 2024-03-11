/**
 * Operators
 * 
 * 연산자
 */

/**
 * 산술 연산자
 * 
 * 1) 덧셈
 * 2) 뺄셈
 * 3) 곱셈
 * 4) 나눗셈
 * 5) 나머지
*/
console.log(10 + 10);
console.log(10 - 10);
console.log(10 * 10);
console.log(10 / 10);
console.log(10 % 10);
console.log(10 % 3);

console.log('----------')

console.log(10 * (10 + 10));

/**
 * 증가와 감소
 */
let number = 1;

number ++;
console.log(number);

number --;
console.log(number);

console.log('----------');

/**
 * 연산자의 위치
 */
let result = 1;
console.log(result);

result = number ++;
console.log(result, number);

result = number --;
console.log(result, number);

result = ++ number;
console.log(result, number);

result = -- number;
console.log(result, number);

// 앞에 연산자 작성은 지양할 것

/**
 * 숫자 타입이 아닌 타입에 +, -를 사용하면 어떻게 될까?
 */
let sample = '99';

console.log(+sample);
console.log(typeof +sample);
        
console.log(sample);
console.log(typeof sample);