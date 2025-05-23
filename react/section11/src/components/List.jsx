import "./List.css";
import TodoItem from "./TodoItem";
import { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from "../App";

const List= () => {
    const todos = useContext(TodoStateContext);
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getFilteredData = () => {
        if(search === "") {
            return todos;
        }
        return todos.filter((todo)=>
            todo.content
            .toLowerCase()
            .includes(search.toLowerCase())
        );
    };

    const filteredTodos = getFilteredData();

    const { totalCount, doneCount, notDoneCount } = 
    useMemo(()=> {
        const totalCount = todos.length;
        const doneCount = todos.filter(
            (todo) => todo.isDone
        ).length;
        const notDoneCount = totalCount - doneCount;

        return {
            totalCount,
            doneCount,
            notDoneCount
        };
    }, [todos])
    // 의존성배열: deps에 포함된 배열의 값이 변경될때마다
    // 첫번째 인자로 전달한 콜백함수가 다시 실행됨

    // const {totalCount, doneCount, notDoneCount} = getAnalyzedData()

    return (
        <div className="List">
            <h4>Todo List 🍀</h4>

            <div className="status_board">
                <div>Total : <span className="value total">{totalCount}</span></div>
                <div>Done : <span className="value done">{doneCount}</span></div>
                <div>NotDone : <span className="value not_done">{notDoneCount}</span></div>
            </div>


            <input value={search} onChange={onChangeSearch} placeholder="검색어를 입력하세요" />
            <div className="todos_wrapper">
                {filteredTodos.map((todo) => {
                    return (
                        <TodoItem 
                            key={todo.id}
                            {...todo}  
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default List;