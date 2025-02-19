const Controller = ({onClickButton}) => {
    return (
        <div className="btnWrap">
            <button onClick={()=>{
                onClickButton(-100);
            }}>-100</button>
            <button onClick={()=>{
                onClickButton(-10);
            }}>-10</button>
            <button onClick={()=>{
                onClickButton(-1);
            }}>-1</button>
            <button onClick={()=>{
                onClickButton(+1);
            }}>+1</button>
            <button onClick={()=>{
                onClickButton(+10);
            }}>+10</button>
            <button onClick={()=>{
                onClickButton(+100);
            }}>+100</button>
        </div>
    );
};

export default Controller;