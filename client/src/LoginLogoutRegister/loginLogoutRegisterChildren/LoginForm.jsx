// This component renders the form for login.

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { login } from "./loginLogoutRegisterChildren/loggedinSlice.js";

export default function LoginForm() {
    const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const message = location.state?.message;

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
                    dispatch(login());
                    return;
                }
                setShowLoginErrorMessage(true);
            })
            .then(() => {
                navigate("/feedingTool");
            })
            .catch((error) => console.log(error));
    }

    return (
        <section>
            {message && <p className="infoBanner">{message}</p>}
            <p className="bottomSpace">
                Noch nicht angemeldet?{" "}
                <Link to="/register" className="clickHere">
                    Hier
                </Link>{" "}
                gehts zur Registrierung!
            </p>
            <form className="flexVertically " onSubmit={onSubmitLogin}>
                <label htmlFor="email">Emailadresse</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                />
                <label htmlFor="password">Passwort</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                />

                <button>Login</button>
            </form>

            {showLoginErrorMessage && (
                <p className="errorMessage">
                    Wrong credentials or you haven&apos;t registered yet.
                </p>
            )}
        </section>
    );
}
