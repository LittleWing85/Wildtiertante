import { configureStore } from "@reduxjs/toolkit";
import loggedinReducer from "../basics/loginLogoutRegister/loggedinSlice.js";

export const store = configureStore({
    reducer: {
        loggedin: loggedinReducer,
    },
});
