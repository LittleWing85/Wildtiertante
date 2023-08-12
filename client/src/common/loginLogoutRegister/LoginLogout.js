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
                <div>
                    <NavLink to="/login">
                        <img
                            className="iconHeader"
                            src="./icons/login.png"
                            alt="icon for login"
                        />
                    </NavLink>
                </div>
            )}
            {loggedIn && (
                <div>
                    <NavLink className="iconHeader" to="/about">
                        <img
                            className="iconHeader"
                            src="./icons/logout.png"
                            alt="icon for logout"
                        />
                    </NavLink>
                </div>
            )}
        </div>
    );
}
