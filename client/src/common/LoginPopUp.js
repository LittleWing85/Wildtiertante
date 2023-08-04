import { useState } from "react";

export default function LoginPopUp({
    onLoginClose,
    toggleLoggedIn,
    onRegisterClick,
}) {
    const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(false);

    function onSubmitLogin(event) {
        event.preventDefault();
        const loginData = {
            email: event.target.email.value,
            password: event.target.password.value,
        };
        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((foundUser) => {
                if (foundUser) {
                    setShowLoginErrorMessage(false);
                    toggleLoggedIn();
                    onLoginClose();
                    return;
                }
                setShowLoginErrorMessage(true);
            })
            .catch((error) => console.log(error));
    }

    function switchToRegistration() {
        onLoginClose();
        onRegisterClick();
    }

    return (
        <div className="popUpContainer">
            <div className="loginPopUp">
                <button className="closingButton" onClick={onLoginClose}>
                    X
                </button>
                {showLoginErrorMessage && (
                    <p className="errorMessage">
                        Wrong credentials or you haven&apos;t registered yet.
                    </p>
                )}
                <form className="flexVertically " onSubmit={onSubmitLogin}>
                    <label htmlFor="email">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                    />
                    <button>Login</button>
                </form>
                <p className="topSpace">
                    No account yet? Click{" "}
                    <span className="clickHere" onClick={switchToRegistration}>
                        here
                    </span>{" "}
                    to register!
                </p>
            </div>
        </div>
    );
}
