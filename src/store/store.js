import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "../todoSlices/TodoSlice";
import themeSlice from "../todoSlices/themeSlice";

export const store = configureStore({
    reducer : {
        todosStore : TodoSlice,
        themeStore : themeSlice
    }
});
