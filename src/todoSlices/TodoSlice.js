import { createSlice, nanoid } from "@reduxjs/toolkit";

const items = JSON.parse(localStorage.getItem("todos")) || []

const initialState = {
    todos : items
}

const todoSlice = createSlice({
    name : "todo",
    initialState,
    reducers : {
        addTodo : (state, action)=>{
            let todo = {
                id : nanoid(),
                todoMsg : action.payload,
                completed : false
            }
            state.todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        removeTodo : (state, action)=>{
            state.todos = state.todos.filter((singleTodo)=>(action.payload !== singleTodo.id))
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        updateTodo: (state, action) => {
            const { todoID, todoMessage } = action.payload;
            state.todos = state.todos.map((singleTodo) =>
            singleTodo.id === todoID
                ? { ...singleTodo, todoMsg: todoMessage }
                : singleTodo
            );
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        toggleCompleted : (state, action)=>{
            state.todos = state.todos.map((singleTodo)=>(singleTodo.id === action.payload ? {...singleTodo , completed : !(singleTodo.completed)} : singleTodo))
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        clearAll : (state)=>{
            state.todos = [];
            localStorage.setItem("todos", JSON.stringify(state.todos))
        }
    }
})


export const {addTodo, removeTodo, updateTodo, toggleCompleted, clearAll} = todoSlice.actions;

export default todoSlice.reducer