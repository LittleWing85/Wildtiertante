// This component shows the buttons for authentication

import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button.jsx";
import "./auth.css";

export default function AuthButtons() {
    const { loading, userId, logout, isLoggingOut } = useUser();
    const navigate = useNavigate();

    if (loading) {
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
            {!userId && (
                <Button onClick={handleSignIn} className="navEntry">
                    Anmelden
                </Button>
            )}
            {userId && (
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
