import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { login } from "./loggedinSlice.jsx";

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
        <div>
            {message && <p className="infoBanner">{message}</p>}
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
                <Link to="/register" className="clickHere">
                    here
                </Link>{" "}
                to register!
            </p>
            {showLoginErrorMessage && (
                <p className="errorMessage">
                    Wrong credentials or you haven&apos;t registered yet.
                </p>
            )}
        </div>
    );
}
