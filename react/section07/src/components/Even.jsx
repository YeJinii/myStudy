import { useEffect } from 'react';

const Even = () => {
    // 3. 언마운트 : 죽음
    useEffect(() => {
        // 클린업, 정리함수
        return () => {
            console.log("unmount");
        };
    }, []);

    return <div className="evenNum">Even Number</div>
}

export default Even;