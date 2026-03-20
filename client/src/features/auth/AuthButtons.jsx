// This component shows the buttons for authentication

import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./auth.css";

export default function AuthButtons() {
    const { loading, userId, logout } = useUser();

    if (loading) {
        return null;
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
                <Link to="/" onClick={logout} className="navEntry">
                    Logout
                </Link>
            )}
        </div>
    );
}
