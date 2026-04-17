// This component shows the buttons for authentication

import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../../context/UserContext.jsx";

import { Button } from "../../../components/Button.jsx";
import { PROTECTED_ROUTES } from "../../../constants/PROTECTED_ROUTES.js";
import "./auth.css";

export function AuthButtons() {
    const { userId, logout, isLoggingOut } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    if (userId === undefined) {
        return null;
    }

    async function handleLogout() {
        await logout();
        const currentPathIsProtectedRoute = PROTECTED_ROUTES.some((route) =>
            location.pathname.startsWith(route),
        );
        if (currentPathIsProtectedRoute) {
            navigate("/");
        }
    }

    function handleSignIn() {
        navigate("/auth");
    }

    return (
        <div>
            {userId === null && (
                <Button onClick={handleSignIn} className="navEntry">
                    Anmelden
                </Button>
            )}
            {userId != null && (
                <Button
                    isLoading={isLoggingOut}
                    onClick={handleLogout}
                    className="navEntry"
                >
                    Ausloggen
                </Button>
            )}
        </div>
    );
}
