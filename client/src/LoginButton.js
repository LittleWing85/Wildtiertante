import { useState } from "react";
import LoginPopUp from "./LoginPopUp.js";
import { BrowserRouter } from "react-router-dom";

export default function LoginButton() {
    const [showLoginPopUp, setShowLoginPopUp] = useState(false);

    function onLoginClick() {
        setShowLoginPopUp(true);
    }

    function onLogin(event) {
        console.log(event.target.email.value);
    }

    function onLoginClose() {
        setShowLoginPopUp(false);
    }

    return (
        <BrowserRouter>
            <p className="login" onClick={onLoginClick}>
                Login
            </p>

            <section>
                {showLoginPopUp && (
                    <LoginPopUp onLogin={onLogin} onLoginClose={onLoginClose} />
                )}
            </section>
        </BrowserRouter>
    );
}
