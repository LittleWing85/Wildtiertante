// This component renders the form for login

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../UserContext.jsx";
import "./formsSignIn.css";

export default function LoginForm() {
    const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUserId } = useUser();
    const navigate = useNavigate();

    async function onSubmitLogin(event) {
        event.preventDefault();

        if (isSubmitting) return;

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
                setShowLoginErrorMessage(false);
                setUserId(data.user_id);
                navigate("/feedingTool");
                return;
            }

            setShowLoginErrorMessage(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="topSpaceBig">
            <form className="flexVertically" onSubmit={onSubmitLogin}>
                <label htmlFor="email">Emailadresse</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                />
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

                <button className="topSpace" disabled={isSubmitting}>
                    {isSubmitting ? <span className="spinner"></span> : "Login"}
                </button>
            </form>

            {showLoginErrorMessage && (
                <p className="errorBanner">
                    Wrong credentials or you haven&apos;t registered yet.
                </p>
            )}
        </div>
    );
}
