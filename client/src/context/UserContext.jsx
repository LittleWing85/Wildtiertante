// Provides user_id and logout globally

import { createContext, useContext, useEffect, useState } from "react";

import { apiClient } from "../utils/apiClient.js";
import { logoutRequest } from "../features/auth/api/logoutRequest.js";

const UserContext = createContext({
    userId: null,
    setUserId: () => {},
    logout: async () => {},
});

export function UserProvider({ children }) {
    const [userId, setUserId] = useState(undefined); //undefined -> loading; null -> logged out
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await apiClient("/api/me");
                setUserId(data.user.id);
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
        setIsLoggingOut(true);
        try {
            await logoutRequest();
            setUserId(null);
        } catch (error) {
            setUserId(null);
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
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
