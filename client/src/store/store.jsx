import { configureStore } from "@reduxjs/toolkit";
import loggedinReducer from "../signInLogout/loggedinSlice.jsx";

export const store = configureStore({
    reducer: {
        loggedin: loggedinReducer,
    },
});
