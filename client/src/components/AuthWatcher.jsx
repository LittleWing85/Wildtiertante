import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import apiClient from "../utils/apiClient.js";

export default function AuthWatcher() {
    const location = useLocation();
    const { userId, setUserId } = useUser();

    useEffect(() => {
        if (!userId) return;

        const protectedPrefixes = ["/feedingTool"];
        const isProtected = protectedPrefixes.some((prefix) =>
            location.pathname.startsWith(prefix),
        );
        if (!isProtected) return;

        async function checkUser() {
            try {
                const data = await apiClient("/api/user_id");
                setUserId((prev) => (prev !== data ? data : prev));
            } catch {
                setUserId((prev) => (prev !== data ? null : prev));
            }
        }
        checkUser();
    }, [location.pathname, setUserId]);

    return null;
}
