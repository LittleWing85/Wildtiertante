// Provides user_id globally

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({
    userId: null,
    setUserId: () => {},
    loading: true,
});

export function UserProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <UserContext.Provider value={{ userId, setUserId, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
