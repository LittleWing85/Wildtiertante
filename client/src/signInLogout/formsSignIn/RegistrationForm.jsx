//This component renders the form for registration

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../UserContext.jsx";
import formCheck from "./formCheck.js";
import "./formsSignIn.css";

export default function RegistrationForm() {
    const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState(false);
    const [inputPasswordErrorMessage, setInputPasswordErrorMessage] =
        useState(false);
    const [registrationErrorMessage, setRegistrationErrorMessage] =
        useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUserId } = useUser();
    const navigate = useNavigate();

    async function onSubmitRegistrationData(event) {
        event.preventDefault();

        setInputEmailErrorMessage(false);
        setInputPasswordErrorMessage(false);
        setRegistrationErrorMessage(false);

        if (isSubmitting) return;

        if (!event.target.checkValidity()) {
            formCheck(
                event.target,
                setInputEmailErrorMessage,
                setInputPasswordErrorMessage
            );
            return;
        }

        const formData = new FormData(event.target);
        const registrationData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/registration", {
                method: "POST",
                body: JSON.stringify(registrationData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.error) {
                throw {
                    type: "application",
                    text:
                        data.errorMessage ||
                        "Diese E-Mail-Adresse wird bereits verwendet.",
                };
            }

            if (!response.ok) {
                throw {
                    type: "server",
                    code: response.status,
                    text: `Serverfehler:${response.status}${response.statusText}`,
                };
            }

            setUserId(data?.user_id ?? null);
            navigate("/feedingTool");
        } catch (error) {
            console.error("Error during registration:", error);
            if (!error.type) {
                setRegistrationErrorMessage({
                    type: "network",
                    text: "Ein Netzwerkfehler ist aufgetreten. Bitte überprüfe deine Verbindung zum Internet.",
                });
            } else {
                setRegistrationErrorMessage(error);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="topSpaceBig">
            <form
                className="flexVertically"
                noValidate
                onSubmit={onSubmitRegistrationData}
            >
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Name of your shelter"
                />
                <label htmlFor="email" className="topSpaceSmall">
                    Emailadresse
                </label>
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
                    {isSubmitting ? (
                        <span className="spinner"></span>
                    ) : (
                        "Absenden"
                    )}
                </button>
            </form>
            {registrationErrorMessage && (
                <p className="errorBanner">{registrationErrorMessage.text}</p>
            )}
        </div>
    );
}
