// 1. 상수 객체
// 상수 객체에 또다른 객체를 할당하는 것은 불가능 (ex: animal = { a : 1 } //error )
// 객체에 새로운 property를 추가하거나 수정, 삭제는 가능
const animal = {
    type: "고양이",
    name: "나비",
    color: "black",
  };
  
  animal.age = 2; // 추가
  animal.name = "까망이"; // 수정
  delete animal.color; // 삭제
  
  // 2. 메서드
  // -> 값이 함수인 프로퍼티를 말함
  
  const person = {
    name: "이정환",
    // 메서드 선언
    sayHi() {
      console.log("안녕!");
    },
  };
  
  person.sayHi();
  person["sayHi"]();