// Provides user_id and logout globally

import { createContext, useContext, useEffect, useState } from "react";
import { logoutRequest } from "../features/auth/api/logout.js";

const UserContext = createContext({
    userId: null,
    setUserId: () => {},
    loading: true,
    logout: async () => {},
});

export function UserProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("/api/user_id");
                const data = await response.json();
                setUserId(data);
            } catch {
                setUserId(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    async function logout() {
        if (isLoggingOut) {
            return;
        }
        try {
            setIsLoggingOut(true);
            await logoutRequest();
        } finally {
            setUserId(null);
            setIsLoggingOut(false);
        }
    }

    return (
        <UserContext.Provider
            value={{ userId, setUserId, loading, logout, isLoggingOut }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
