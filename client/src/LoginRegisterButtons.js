import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LoginPopUp from "./LoginPopUp.js";
import RegisterPopUp from "./RegisterPopUp.js";

export default function LoginRegisterButtons() {
    const [showLoginPopUp, setShowLoginPopUp] = useState(false);
    const [showRegisterPopUp, setShowRegisterPopUp] = useState(false);
    const [loggedIn, setloggedIn] = useState(false);

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
            <div className="loginregisterContainer">
                <button className="loginregister" onClick={onRegisterClick}>
                    Register
                </button>
                {!loggedIn && (
                    <button className="loginregister" onClick={onLoginClick}>
                        Login
                    </button>
                )}

                {loggedIn && (
                    <form action="/logout" method="POST">
                        <button className="loginregister">Logout</button>
                    </form>
                )}
            </div>

            <section>
                {showLoginPopUp && (
                    <LoginPopUp
                        onLoginClose={onLoginClose}
                        onLoginClick={onLoginClick}
                        toggleLoggedIn={toggleLoggedIn}
                    />
                )}
                {showRegisterPopUp && (
                    <RegisterPopUp onRegisterClose={onRegisterClose} />
                )}
            </section>
        </BrowserRouter>
    );
}
