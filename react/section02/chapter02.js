function returnFalse() {
    console.log("False 함수")
    return false;
}
function returnTrue() {
    console.log("True 함수")
    return true;
}

function returnFalsy() {
    console.log("Falsy 함수")
    return undefined;
}
function returnTruthy() {
    console.log("Truthy 함수")
    return 10;
}


console.log(returnFalse() && returnTrue()); // "False 함수" false;
console.log(returnFalsy() && returnTruthy()); // "Falsy 함수" undefined;

// 단락 평가 활용 사례

function printName(person){
    // 방법 1
    // if(!person) {
    //     console.log("person에 값이 없음");
    //     return;
    // }
    // console.log(person.name);

    // 방법 2
    // console.log(person && person.name);

    // 방법 3
    const name = person && person.name;
    console.log(name || "person의 값이 없음")
}

printName();
printName({ name: "이정환" });