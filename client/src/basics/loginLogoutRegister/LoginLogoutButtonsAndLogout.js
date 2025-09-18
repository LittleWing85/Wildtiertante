import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./loginLogoutRegister.css";
import { login, logout } from "./loggedinSlice.js";

export default function LoginLogoutButtonsAndLogout() {
    const dispatch = useDispatch();
    const logged = useSelector((state) => state.loggedin.value);
    const navigate = useNavigate();

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
        }).then(() => {
            navigate("/");
        });
    }

    return (
        <div>
            {!logged && (
                <div>
                    <Link to="/login">
                        <img
                            className="iconHeader"
                            src="./icons/login.png"
                            alt="icon for login"
                        />
                    </Link>
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
