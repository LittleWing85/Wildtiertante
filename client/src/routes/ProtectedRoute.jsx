// Checks if user is logged in and, if necessary, redirects to signup

import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export default function ProtectedRoute({ children }) {
    const { userId, loading } = useUser();

    if (loading) {
        return <div>Lade...</div>;
    }

    if (!userId) {
        return (
            <Navigate
                to="/auth/login"
                replace
                state={{
                    message: ERROR_MESSAGES.AUTH_REQUIRED,
                }}
            />
        );
    }
    return children;
}
