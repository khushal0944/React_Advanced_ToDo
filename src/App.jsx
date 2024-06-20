import ShowTodoBox from './components/ShowTodoBox'
import AddTodoBox from './components/AddTodoBox'
import './AppStyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearAll } from './todoSlices/TodoSlice'
import { useEffect, useState } from 'react'
import { toggleTheme } from './todoSlices/themeSlice'

export default function App() {
    const allTodos = useSelector(state => state.todosStore.todos)
    const dispatch = useDispatch();
    const theme = useSelector(state => state.themeStore.theme)
    const [selected, setSelected] = useState("All")
    const [filteredTodos, setFilteredTodos] = useState(allTodos)
    const [search, setSearch] = useState('')

    useEffect(()=>{
        let todos = allTodos;
        if(selected === "All") todos = todos 
        else if(selected === "Show") todos = todos.filter((singleTodo) => singleTodo.completed)
        else if(selected === "Hide") todos = todos.filter((singleTodo) => !(singleTodo.completed))
        setFilteredTodos(todos)
    },[selected, allTodos])

    function changeTheme(){
        document.querySelector("html").classList.remove("light");
        document.querySelector("html").classList.remove("dark");
        document.querySelector("html").classList.add(theme);
        document.querySelector("#backImage").classList.remove("backImage");
        document.querySelector("#backImage").classList.remove("darkBackImage");
        document.querySelector("#backImage").classList.add(`${theme === "dark" ? "darkBackImage" : "backImage"}`);
        dispatch(toggleTheme())
    }

	return (
        <>
            <div id='backImage' className='backImage h-screen w-full flex justify-center items-center'>
                <div id="todoMainBox" className='overflow-auto rounded-xl px-1  dark:bg-[#212121] bg-[#d4d4d4] w-5/6 shadow-2xl'>
                    <h1 className='underline text-center uppercase mt-4 text-4xl font-medium dark:text-white'>ToDo List</h1>
                    <div className="flex justify-center gap-x-4 items-center text-white mt-5 ">
                        <div id="inputBox" className='bg-white border-2 dark:bg-slate-600 border-black rounded h-8 relative w-3/5'>
                            <i className="ri-search-2-line dark:text-white  left-1.5 top-1 absolute text-black" ></i>
                            <input type="search" name="search" onChange={(e) => setSearch(e.target.value)} className='dark:placeholder:text-white dark:bg-slate-600 dark:text-white text-black w-full h-full outline-none pl-8 rounded ' placeholder='Search ToDo...' />
                        </div>
                        <div id="selectBox" >
                            <select className='h-8 text-center text-lg rounded max-sm:w-24 bg-blue-500 dark:bg-purple-800 dark:hover:bg-purple-900 cursor-pointer' value={selected} onChange={(e) => setSelected(e.currentTarget.value)}>
                                <option value="All">Show All</option>
                                <option value="Hide">Hide Completed</option>
                                <option value="Show">Show Completed</option>
                            </select>
                        </div>
                        <button className='dark:bg-purple-800 bg-blue-500 w-9 max-sm:w-10 rounded-full h-9 dark:hover:bg-purple-900' onClick={changeTheme}>{theme !== "dark" ? <i className="ri-sun-fill "></i> : <i className="ri-moon-fill"></i>}</button>
                    </div>                    
                    <h1 className='text-center dark:text-white uppercase mt-5 text-3xl font-medium'>tasks : {filteredTodos.filter((singleTodo)=>{
                                return search === '' ? singleTodo : singleTodo.todoMsg.toLowerCase().includes(search); 
                            }).length}</h1>
                    <div id="showTodoBox" className='w-4/5 h-2/4 max-sm:w-11/12 overflow-y-auto'>
                        {
                            (filteredTodos) && (filteredTodos.length == 0) && <div className='flex dark:text-white text-center w-full h-full justify-center items-center'>
                                <h1 className='text-4xl font-bold'>No Todos Found</h1>
                            </div>
                        }
                        {
                            (filteredTodos) && (filteredTodos.length > 0) && (filteredTodos).filter((singleTodo)=>{
                                return search === '' ? singleTodo : singleTodo.todoMsg.toLowerCase().includes(search); 
                            }).map((singleTodo)=>(
                            <div key={singleTodo.id}>
                                <ShowTodoBox todo={singleTodo} theme={theme}/>
                            </div>
                        ))}
                    </div>
                    <div id="addTodo">
                        <AddTodoBox />
                    </div>
                    <div className='w-full flex justify-center items-center mt-2'>
                    <button className=' bg-blue-600 dark:bg-purple-800 w-32 text-center rounded-lg p-1 text-white text-2xl dark:hover:bg-purple-900 hover:bg-blue-800 ' onClick={()=> dispatch(clearAll())}>Clear All</button>
                    </div>
                </div>
            </div>
        </>
    )
}
