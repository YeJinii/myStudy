import './App.css'
import { useReducer } from 'react';
import { 
    Routes, 
    Route
} from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

function reducer(state, action){
    return state;
}

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/new" element={<New />}/>
                <Route path="/diary/:id" element={<Diary />}/>
                <Route path="/edit/:id" element={<Edit />}/>
                <Route path="*" element={<Notfound />}/>
            </Routes>
        </>

    )
}

export default App;
