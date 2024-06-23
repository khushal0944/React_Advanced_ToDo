import { createSlice } from "@reduxjs/toolkit";

const initialTheme = JSON.parse(localStorage.getItem("theme")) || "light"


const themeSlice = createSlice({
    name : "theme",
    initialState : {
        theme : initialTheme
    },
    reducers : {
        toggleTheme : (state)=>{
            state.theme = (state.theme === "light" ? "dark" : "light")
            localStorage.setItem("theme",JSON.stringify(state.theme))
        }
    }
})

export const {toggleTheme} = themeSlice.actions

export default themeSlice.reducer;