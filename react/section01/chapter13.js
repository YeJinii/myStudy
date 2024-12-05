// 1. 콜백함수
// 콜백 : 나중에 실행되는 
// 메인함수의 인수로 실행되게 되면서 알아서 실행되는 개념
function main(value) {
    // console.log(value);
    console.log(1);
    console.log(2);
    value(); // 원하는 타이밍에 알아서 호출
    console.log("end");
}
// function sub() {
//     console.log("i am sub");
// }

// main(sub);

main(() => {
    console.log("i am sub");
});
