import { configureStore } from "@reduxjs/toolkit";
import loggedinReducer from "../basics/loginLogoutRegister/loggedinSlice.jsx";

export const store = configureStore({
    reducer: {
        loggedin: loggedinReducer,
    },
});
