
import './App.css';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import Even from './components/Even';
import { useState, useEffect, useRef } from 'react';

function App() {

    const [count, setCount] = useState(0);
    const [input, setInput] = useState("");

    const isMount = useRef(false);

    // 1. 마운트 : 탄생
    useEffect(()=>{
        console.log("mount");
    },[]);

    // 2. 업데이트 : 변화, 리렌더링
    useEffect(()=>{
        // 최초 마운트 될 때는 실행 X 
        if(!isMount.current) {
            isMount.current = true;
            return;
        }
        console.log("update");
    });

    const onClickButton = (value) => {
        setCount(count + value);
    }

    return (
        <div className="App">
            <h1>Simple Counter</h1>

            <section>
                <input value={input} onChange={(e)=>{
                    setInput(e.target.value)
                }} />
            </section>

            <section>
                { count % 2 === 0 ? <Even/> : null }
                <Viewer count={count} />
            </section>

            <section>
                <Controller onClickButton={onClickButton}/>
            </section>
        </div>
    );
};

export default App;
