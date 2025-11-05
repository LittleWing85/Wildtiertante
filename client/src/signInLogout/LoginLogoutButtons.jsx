//This component shows the buttons for login and logout. It also executes the logout

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./signInLogout.css";
import { login, logout } from "./loggedinSlice.js";

export default function LoginLogoutButtons() {
    const dispatch = useDispatch();
    const logged = useSelector((state) => state.loggedin.value);

    useEffect(() => {
        fetch("/api/user_id")
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    dispatch(login());
                    return;
                }
                dispatch(logout());
            });
    }, []);

    function onLogout() {
        dispatch(logout());
        fetch("/api/logout", {
            method: "POST",
        });
    }

    return (
        <div>
            {!logged && (
                <div>
                    <Link to="/signIn" className="navEntry">
                        Anmelden
                    </Link>
                </div>
            )}
            {logged && (
                <Link to="/" onClick={onLogout} className="navEntry">
                    Logout
                </Link>
            )}
        </div>
    );
}
