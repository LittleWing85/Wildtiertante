// This component renders the form for login

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../UserContext.jsx";
import formCheck from "./formCheck.js";
import "./formsSignIn.css";

export default function LoginForm() {
    const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState(false);
    const [inputPasswordErrorMessage, setInputPasswordErrorMessage] =
        useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUserId } = useUser();
    const navigate = useNavigate();

    async function onSubmitLogin(event) {
        event.preventDefault();

        setInputEmailErrorMessage(false);
        setInputPasswordErrorMessage(false);
        setLoginErrorMessage(false);

        if (isSubmitting) return;

        if (!event.target.checkValidity()) {
            formCheck(
                event.target,
                setInputEmailErrorMessage,
                setInputPasswordErrorMessage
            );
        }

        const formData = new FormData(event.target);
        const loginData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(loginData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data) {
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
                {inputEmailErrorMessage && (
                    <p className="inputError">
                        Bitte gib eine gültige Emailadresse an.
                    </p>
                )}
                <label htmlFor="password" className="topSpaceSmall">
                    Passwort
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                />
                {inputPasswordErrorMessage && (
                    <p className="inputError">Bitte gib dein Passwort an.</p>
                )}

                <button className="topSpace" disabled={isSubmitting}>
                    {isSubmitting ? <span className="spinner"></span> : "Login"}
                </button>
            </form>

            {loginErrorMessage && (
                <p className="errorBanner">
                    Wir konnten keinen Benutzer mit der Kombination aus diesen
                    Zugangsdaten finden.
                </p>
            )}
        </div>
    );
}
