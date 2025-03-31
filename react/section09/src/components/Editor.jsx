import "./Editor.css";
import { useState, useRef } from "react";

const Editor= ({ onCreate }) => {

    const [content, setContent] = useState("");
    const contentRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onKeyDown = (e) => {
        if(e.keycode === 13) {
            onSubmit();
        }
    }

    const onSubmit = () => {
        // 빈 문자열일 때 
        if(content===""){
            contentRef.current.focus();
            return ;
        }

        onCreate(content);

        // 새로운 데이터를 추가하고 난 후 문자열 초기화
        setContent("");
    }

    return (
        <div className="Editor">
            <input 
                ref = {contentRef}
                value = {content}
                onKeyDown = {onKeyDown}
                onChange = {onChangeContent}
                placeholder="새로운 Todo..."
            />
            <button onClick={onSubmit}>추가</button>
        </div>
    );
};

export default Editor;