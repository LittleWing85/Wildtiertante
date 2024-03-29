import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./loginLogoutRegister.css";
import { login, logout } from "./loggedinSlice.js";

export default function LoginLogoutButtons() {
    const dispatch = useDispatch();
    const logged = useSelector((state) => state.loggedin.value);

    //Makes sure that user is still logged in if browser is refreshed
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
                    <NavLink to="/login">
                        <img
                            className="iconHeader"
                            src="./icons/login.png"
                            alt="icon for login"
                        />
                    </NavLink>
                </div>
            )}
            {logged && (
                <div>
                    {
                        <img
                            onClick={onLogout}
                            className="iconHeader"
                            src="./icons/logout.png"
                            alt="icon for logout"
                        />
                    }
                </div>
            )}
        </div>
    );
}
