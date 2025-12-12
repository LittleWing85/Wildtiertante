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
            const errorMessages = formCheck(event.target);
            for (const element of errorMessages) {
                if (element.name === "email") {
                    setInputEmailErrorMessage(element.errorMessage);
                }
                if (element.name === "password") {
                    setInputPasswordErrorMessage(element.errorMessage);
                }
            }

            return;
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
                    <p className="inputError">{inputEmailErrorMessage}</p>
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
                {inputPasswordErrorMessage && (
                    <p className="inputError">{inputPasswordErrorMessage}</p>
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
