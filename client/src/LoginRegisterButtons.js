import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import LoginPopUp from "./LoginPopUp.js";
import RegisterPopUp from "./RegisterPopUp.js";

export default function LoginRegisterButtons() {
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
            <div className="loginregisterContainer">
                {!loggedIn && (
                    <div>
                        <button
                            className="loginregister"
                            onClick={onRegisterClick}
                        >
                            Register
                        </button>
                        <button
                            className="loginregister"
                            onClick={onLoginClick}
                        >
                            Login
                        </button>
                    </div>
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
