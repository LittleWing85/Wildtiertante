import { configureStore } from "@reduxjs/toolkit";
import loggedinReducer from "../LoginLogoutRegistration/loggedinSlice.jsx";

export const store = configureStore({
    reducer: {
        loggedin: loggedinReducer,
    },
});
