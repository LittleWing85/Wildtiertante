import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: false };

export const loggedinSlice = createSlice({
    name: "loggedin",
    initialState,
    reducers: {
        login: (state) => {
            state.value = true;
        },
        logout: (state) => {
            state.value = false;
        },
    },
});

export const { login, logout } = loggedinSlice.actions;
export default loggedinSlice.reducer;
