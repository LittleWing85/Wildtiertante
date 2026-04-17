// Provides user_id and logout globally

import { createContext, useContext, useEffect, useState, useRef } from "react";

import { apiClient, clearCachedCsrfToken } from "../utils/apiClient.js";
import { logoutRequest } from "../features/auth/api/logoutRequest.js";

const UserContext = createContext({
    userId: null,
    setUserId: () => {},
    logout: async () => {},
    isLoggingOut: false,
    logoutFailed: false,
});

export function UserProvider({ children }) {
    const [userId, setUserId] = useState(undefined); //undefined -> loading; null -> logged out
    const [isLoggingOut, setIsLoggingOut] = useState(false); // for good UX after logout button is clicked
    const [logoutFailed, setLogoutFailed] = useState(false);

    const authRequestIdRef = useRef(0); // to prevent race condition between outdated and current auth requests
    const logoutInFlightRef = useRef(false); // to prevent double requests for logout
    const isComponentActiveRef = useRef(true); // to prevent state updates after unmount while an async request is still in flight

    useEffect(() => {
        return () => {
            isComponentActiveRef.current = false;
        };
    }, []);

    async function refreshUser() {
        const requestId = ++authRequestIdRef.current;
        try {
            const data = await apiClient("/api/me");
            if (!isComponentActiveRef.current) return;
            if (requestId !== authRequestIdRef.current) return;
            if (!data.user) {
                setUserId(null);
                return { userId: null };
            }
            setUserId(data.user.id);
            return { userId: data.user.id };
        } catch {
            if (!isComponentActiveRef.current) return;
            if (requestId !== authRequestIdRef.current) return;
            setUserId(null);
            setLogoutFailed(false);
        }
    }

    useEffect(() => {
        refreshUser();
    }, []);

    async function logout() {
        if (logoutInFlightRef.current) return;
        logoutInFlightRef.current = true;
        setIsLoggingOut(true);
        authRequestIdRef.current += 1; // invalidates older auth requests
        try {
            await logoutRequest();
            if (!isComponentActiveRef.current) return;
            clearCachedCsrfToken();
            setLogoutFailed(false);
            setUserId(null);
        } catch {
            const result = await refreshUser();
            if (!result || result.userId === null) {
                return;
            }
            setLogoutFailed(true);
        } finally {
            logoutInFlightRef.current = false;
            if (isComponentActiveRef.current) {
                setIsLoggingOut(false);
            }
        }
    }

    return (
        <UserContext.Provider
            value={{
                userId,
                setUserId,
                logout,
                isLoggingOut,
                logoutFailed,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
