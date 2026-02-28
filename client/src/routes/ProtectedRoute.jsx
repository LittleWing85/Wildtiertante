// Checks if user is logged in and, if necessary, redirects to signup

import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export default function ProtectedRoute({ children }) {
    const { userId, loading } = useUser();

    if (loading) {
        return <div>Lade...</div>;
    }

    if (userId === null) {
        return (
            <Navigate
                to="/auth/login"
                replace
                state={{
                    message:
                        "Bitte melde dich an, um das Fütterunsgtool zu verwenden.",
                }}
            />
        );
    }
    return children;
}
