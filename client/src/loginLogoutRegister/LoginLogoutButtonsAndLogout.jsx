//This component shows the buttons for login and logout. It also executes the logout.

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./loginLogoutRegister.css";
import { login, logout } from "./loggedinSlice.jsx";

export default function LoginLogoutButtonsAndLogout() {
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
    }, []); //Makes sure that user is still logged in if browser is refreshed

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
                    <Link to="/login" className="navEntry">
                        Login
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
