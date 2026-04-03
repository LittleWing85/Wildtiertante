// Checks in backend if user is still logged in if user navigates to path that needs authentication

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { apiClient } from "../utils/apiClient.js";

export function AuthWatcher() {
    const location = useLocation();
    const { userId, setUserId } = useUser();

    useEffect(() => {
        if (userId == null) return;
        if (!location.pathname.startsWith("/feedingTool")) return;

        async function checkUser() {
            try {
                const data = await apiClient("/api/me");
                setUserId((prev) =>
                    prev !== data.user.id ? data.user.id : prev,
                );
            } catch {
                setUserId((prev) => (prev !== null ? null : prev));
            }
        }
        checkUser();
    }, [location.pathname, setUserId, userId]);

    return null;
}
