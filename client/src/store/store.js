import { configureStore } from "@reduxjs/toolkit";
import loggedinReducer from "../signInLogout/loggedinSlice.js";

export const store = configureStore({
    reducer: {
        loggedin: loggedinReducer,
    },
});
