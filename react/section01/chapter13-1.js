// 2. 콜백함수의 활용
function repeat(count, callback){
    for(let idx = 1; idx <= count; idx++ ){
        callback(idx);
    }
}

repeat(5, (idx) => {
    console.log(idx);
});

repeat(5, (idx) => {
    console.log(idx * 2);
});

repeat(5, (idx) => {
    console.log(idx * 3);
});