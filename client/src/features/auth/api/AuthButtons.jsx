// This component shows the buttons for authentication

import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext.jsx";

import Button from "../../../components/Button.jsx";
import "./auth.css";

export default function AuthButtons() {
    const { userId, logout, isLoggingOut } = useUser();
    const navigate = useNavigate();

    if (userId === undefined) {
        return null;
    }

    async function handleLogout() {
        await logout();
        navigate("/");
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
