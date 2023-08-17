import { configureStore } from "@reduxjs/toolkit";
import loggedinReducer from "../common/loginLogoutRegister/loggedinSlice.js";

export const store = configureStore({
    reducer: {
        loggedin: loggedinReducer,
    },
});
