//This component shows the buttons for login and logout.
// It also executes the logout.
import { Link } from "react-router-dom";

import { useUser } from "../UserContext";
import "./auth.css";

export default function AuthButtons() {
    const { setUserId, userId, loading } = useUser();

    if (loading) {
        return null;
    }

    async function onLogout() {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
            });
        } finally {
            setUserId(null);
        }
    }

    return (
        <div>
            {!userId && (
                <div>
                    <Link to="/auth" className="navEntry">
                        Anmelden
                    </Link>
                </div>
            )}
            {userId && (
                <Link to="/" onClick={onLogout} className="navEntry">
                    Logout
                </Link>
            )}
        </div>
    );
}
