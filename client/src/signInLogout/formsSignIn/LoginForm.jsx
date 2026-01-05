// This component renders the form for login

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../UserContext.jsx";
import formCheck from "../../formCheck.js";
import "./formsSignIn.css";

export default function LoginForm() {
    const [errorMessages, setErrorMessages] = useState({});
    const [loginErrorMessage, setLoginErrorMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUserId } = useUser();
    const navigate = useNavigate();

    async function onSubmitLogin(event) {
        event.preventDefault();

        if (isSubmitting) return;

        setErrorMessages({});
        setLoginErrorMessage(false);

        if (!event.target.checkValidity()) {
            setErrorMessages(formCheck(event.target));
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData(event.target);
            const loginData = {
                email: formData.get("email"),
                password: formData.get("password"),
            };
            const response = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(loginData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data?.user_id) {
                setLoginErrorMessage(false);
                setUserId(data.user_id);
                navigate("/feedingTool");
                return;
            }

            setLoginErrorMessage(true);
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="topSpaceBig">
            <form
                className="flexVertically"
                noValidate
                onSubmit={onSubmitLogin}
            >
                <label htmlFor="email">Emailadresse</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                />
                {errorMessages.email && (
                    <p className="inputError">{errorMessages.email}</p>
                )}

                <label htmlFor="password" className="topSpaceSmall">
                    Passwort
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Passwort"
                />
                {errorMessages.password && (
                    <p className="inputError">{errorMessages.password}</p>
                )}

                <button className="topSpace" disabled={isSubmitting}>
                    {isSubmitting ? <span className="spinner"></span> : "Login"}
                </button>
            </form>

            {loginErrorMessage && (
                <p className="errorBanner">Login derzeit nicht möglich</p>
            )}
        </div>
    );
}
