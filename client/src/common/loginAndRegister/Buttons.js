import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import LoginPopUp from "./popUpLogin.js";
import RegisterPopUp from "./popUpRegister.js";
import "./loginAndRegister.css";

export default function Buttons() {
    const [showLoginPopUp, setShowLoginPopUp] = useState(false);
    const [showRegisterPopUp, setShowRegisterPopUp] = useState(false);
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

    function onLoginClick() {
        setShowLoginPopUp(true);
    }
    function onLoginClose() {
        setShowLoginPopUp(false);
    }

    function onRegisterClick() {
        setShowRegisterPopUp(true);
    }
    function onRegisterClose() {
        setShowRegisterPopUp(false);
    }

    function toggleLoggedIn() {
        if (loggedIn) {
            setloggedIn(false);
            return;
        }
        setloggedIn(true);
    }

    return (
        <BrowserRouter>
            <div className="containerLoginButton">
                {loggedIn && (
                    <form action="/logout" method="POST">
                        <button className="buttonLoginRegister">Logout</button>
                    </form>
                )}
            </div>

            {!loggedIn && (
                <div className="containerLoginButton">
                    <button onClick={onLoginClick}>Login</button>
                    <button onClick={onRegisterClick}>Register</button>
                </div>
            )}

            <section>
                {showLoginPopUp && (
                    <LoginPopUp
                        onLoginClose={onLoginClose}
                        onRegisterClick={onRegisterClick}
                        toggleLoggedIn={toggleLoggedIn}
                    />
                )}
                {showRegisterPopUp && (
                    <RegisterPopUp
                        onRegisterClose={onRegisterClose}
                        toggleLoggedIn={toggleLoggedIn}
                    />
                )}
            </section>
        </BrowserRouter>
    );
}
