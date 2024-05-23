// 1. Number Type
let num1 = 27;
let num2 = 1.5;
let num3 = -20;

let inf = Infinity;
let mInf = -Infinity;

// 연산이 실패했을때 반환하는 `NaN` 이 존재하기 때문에
// 불가능한 수치 연산의 경우에도 프로그램이 종료되지 않음
// → 다른 언어에 비해 연산 과정에서 안정적
let nan = NaN;

// 2. String Type
let myName = "이정환";
let myLocation = "목동";
let introduce = myName + myLocation;

let introduceText = `${myName}은 ${myLocation}에 거주합니다`;

// 3. Boolean Type
let isSwitchOn = true;
let isEmpty = false;

// 4. Null Type (아무것도 없다)
let empty = null;

// 5. Undefined Type
let none;
console.log(none);

// undefined vs. null
// undefined : 변수를 선언하고 초기화 하지 않을때 자동으로 들어가는 값
// null : 사용자가 명시적으로 할당하는 값 (이 변수에 어떠한 값도 없다를 명시적으로 표시)