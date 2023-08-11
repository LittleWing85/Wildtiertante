import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./loginLogoutRegister.css";

export default function LoginLogoutRegister() {
    const [loggedIn, setloggedIn] = useState();

    //Makes sure that user is still logged in if browser is refreshed
    useEffect(() => {
        fetch("/api/user_id")
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setloggedIn(true);
                    return;
                }
                setloggedIn(false);
            });
    }, []);

    /*     function toggleLoggedIn() {
        if (loggedIn) {
            setloggedIn(false);
            return;
        }
        setloggedIn(true);
    }
 */
    return (
        <div>
            {!loggedIn && (
                <div className="containerLoginRegister">
                    <div>
                        <NavLink to="/login">Login</NavLink>
                    </div>
                    <div>
                        <NavLink to="/register">Register</NavLink>
                    </div>
                </div>
            )}
            {loggedIn && (
                <div className="containerLoginRegister">
                    <NavLink to="/about">Logout</NavLink>
                </div>
            )}
        </div>
    );
}
