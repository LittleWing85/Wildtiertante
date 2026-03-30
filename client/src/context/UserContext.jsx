// Provides user_id and logout globally

import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient.js";
import { logoutRequest } from "../features/auth/api/logout.js";

import { ERROR_MESSAGES } from "../constants/errorMessages.js";

const UserContext = createContext({
    userId: null,
    setUserId: () => {},
    logout: async () => {},
});

export function UserProvider({ children }) {
    const [userId, setUserId] = useState(undefined); //undefined -> loading; null -> logged out
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [errorMessageLogout, setErrorMessageLogout] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await apiClient("/api/user_id");
                setUserId(data);
            } catch {
                setUserId(null);
            }
        }
        fetchUser();
    }, []);

    async function logout() {
        if (isLoggingOut) {
            return;
        }
        setErrorMessageLogout(null);
        setIsLoggingOut(true);
        try {
            await logoutRequest();
            setUserId(null);
        } catch (error) {
            setErrorMessageLogout(ERROR_MESSAGES.LOGOUT);
            throw error;
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <UserContext.Provider
            value={{
                userId,
                setUserId,
                logout,
                isLoggingOut,
                errorMessageLogout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
