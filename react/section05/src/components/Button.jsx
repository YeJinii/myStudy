const Button = ({ text, color = "black", children }) => {
    // 이벤트 객체
    const onClickButton = (e) => {
        console.log(e);
        console.log(text);
    };

    console.log(color);
    return (
        <button 
            // 이벤트 핸들러 
            onClick = {onClickButton}
            // onMouseEnter={onClickButton}
            // end: 이벤트 핸들러
            style={{ color }}
        >
        {text} - {(color || "black").toUpperCase()}
        {children}
        </button>
    );
};

export default Button;