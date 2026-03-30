// Checks in backend if user is still logged in if user navigates to path that needs authentication

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import apiClient from "../utils/apiClient.js";

export default function AuthWatcher() {
    const location = useLocation();
    const { userId, setUserId } = useUser();

    useEffect(() => {
        if (userId == null) return;
        if (!location.pathname.startsWith("/feedingTool")) return;

        async function checkUser() {
            try {
                const data = await apiClient("/api/user_id");
                setUserId((prev) => (prev !== data ? data : prev));
            } catch {
                setUserId((prev) => (prev !== null ? null : prev));
            }
        }
        checkUser();
    }, [location.pathname, setUserId]);

    return null;
}
