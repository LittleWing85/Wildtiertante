//This component shows the buttons for login and logout.
// It also executes the logout.
import { Link } from "react-router-dom";

import { useUser } from "../UserContext";
import "./signInLogout.css";

export default function LoginLogoutButtons() {
    const { setUserId, userId, loading } = useUser();

    if (loading) {
        return null;
    }

    async function onLogout() {
        try {
            await fetch("/api/logout", {
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
                    <Link to="/signIn" className="navEntry">
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
