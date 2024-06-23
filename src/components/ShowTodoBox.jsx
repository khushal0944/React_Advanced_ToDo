import { removeTodo, updateTodo, toggleCompleted } from "../todoSlices/TodoSlice";
import { useDispatch } from "react-redux";
import "../AppStyle.css"
import { useState } from "react";


export default function ShowTodoBox({todo}){
    const [isTodoEditable, setIsTodoEditable] = useState(true)
    const dispatch = useDispatch()
    const [todoMessage, setTodoMessage] = useState(todo.todoMsg);
    const [checke , setChecke] = useState(todo.completed)
    const [disableCheck, setDisableCheck] = useState(false)

    function editTodo(){
        const todoId = todo.id
        dispatch(updateTodo({todoId,todoMessage}))
        setDisableCheck(false)
        setIsTodoEditable(true)
    }

    function changeCheck(e){
        setChecke(e.currentTarget.checked)
        dispatch(toggleCompleted(todo.id))
    }

    return (
        <div id="editScroll" className="dark:divide-white divide-y divide-black divide-solid">
            <div className="w-full max-sm:w-10/12 flex justify-between p-6 items-center" >
                <div id="part1" className="flex items-center w-4/5">

                <input id={`todo-${todo.id}`} className={`check w-4 disabled:opacity-40 disabled:cursor-not-allowed min-w-4 h-4 cursor-pointer`} disabled={disableCheck} type="checkbox" defaultChecked={checke} onChange={changeCheck}/>
                {isTodoEditable ? <label
                    htmlFor={`todo-${todo.id}`}
                    className={`${checke ? 'line-through  text-[#646464] decoration--[#646464] cursor-pointer' : 'font-bold hover:line-through hover:cursor-pointer hover:text-[#646464] hover:decoration-[#646464]'} dark:text-white  ml-2 p-2`}
                    style={{
                        wordBreak:"break-word",
                        whiteSpace:"pre-wrap"
                    }}
                    >
                    {todoMessage}
                </label> : <input
                    type="text"
                    className={`border-2 dark:border-gray-300 dark:focus-within:border-gray-300 dark:focus-within:bg-gray-900 dark:bg-gray-800 dark:text-white border-blue-700 outline-none ml-3 px-2 py-1.5 rounded-lg w-9/12 ${
                        isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                    value={todoMessage}
                    onChange={(e) => setTodoMessage(e.target.value)}
                    readOnly={isTodoEditable}
                    />
                }
                </div>
                <div id="part2" className="p-1 w-1/6 flex justify-between items-center">

                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                    onClick={() => {
                        if (checke) return;
                        if (isTodoEditable) {
                            setIsTodoEditable((prev) => !prev);
                            setDisableCheck(true)
                        } else editTodo() 
                    }}
                    disabled={todo.completed}
                >
                    {isTodoEditable ? "📁" : "✏️"}
                </button>
                <button id="removeBtn" className="text-3xl" onClick={() => dispatch(removeTodo(todo.id))}>⛔</button>
                    </div>
            </div>
            <hr />
        </div>
    )
}