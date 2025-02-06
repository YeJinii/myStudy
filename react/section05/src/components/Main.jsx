import "./main.css";
// JSX 주의 사항
// 1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있다. (조건문, 반복문 x)
// 2. 숫자, 문자열, 배열 값만 렌더링 된다. (boolean, undefined, null, 객체 x -> 오류를 발생시키진 않지만 렌더링 되지 않음)
// 3. 모든 태그는 닫혀있어야 한다. ( ex)<img /> )
// 4. 최상위 태그는 반드시 하나여야만 한다. (빈 태그로 묶어도 됨 -> 최종적으로 흩뿌려져 있음)
const Main = () => {

    const user = {
        name: "박예진",
        isLogin: true,
    };

    if(user.isLogin){
        return <div className="logout">로그아웃</div>
    }else{
        return <div>로그인</div>
    }
};

export default Main;