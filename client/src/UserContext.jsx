import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({
    userId: null,
    setUsedId: () => {},
    loading: true,
});

export function UserProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("/api/user_id");
                data = await response.json();
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
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used inside <UserProvider>");
    }
    return context;
}
