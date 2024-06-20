import { useState } from "react";
import { addTodo } from "../todoSlices/TodoSlice";
import { useDispatch } from "react-redux";

export default function AddTodoBox(){
    const [inputTodo, setInputTodo] = useState("");
    const dispatch = useDispatch();

    function addTodoHandler(e){
        e.preventDefault();
        if(inputTodo.trim() === "") return;
        dispatch(addTodo(inputTodo));
        setInputTodo("")
    }

    return (
        <>
            <form className="bg-white relative flex rounded-xl m-auto w-5/6 dark:bg-gray-600 " onSubmit={addTodoHandler}>
                <label htmlFor="addInput"><i className="ri-add-large-fill absolute text-2xl top-2 dark:text-white cursor-pointer left-3"></i></label>
                <input id="addInput" className=" w-full border-2 dark:border-gray-300 dark:focus-within:border-gray-300 dark:border-r-0 dark:focus-within:bg-gray-900 dark:bg-gray-700 dark:text-white border-black border-r-0 text-2xl px-10 outline-none rounded-s-xl" type="text" onChange={e => setInputTodo(e.target.value)} value={inputTodo}/>
                <button className="px-3 py-2 bg-blue-700 dark:hover:bg-purple-900 dark:bg-purple-800 text-white text-xl dark:border-2 dark:border-gray-300 dark:focus-within:border-white dark:border-l-0 rounded-e-xl border-black border-2 border-l-0" type="submit">Add</button>
            </form>
        </>
    )
}