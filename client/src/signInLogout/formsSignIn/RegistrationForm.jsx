//This component renders the form for registration

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../UserContext.jsx";
import { checkFormErrors, submitRegistrationData } from "./authService.js";
import "./formsSignIn.css";

export default function RegistrationForm() {
    const [errorMessagesInput, setErrorMessagesInput] = useState({});
    const [errorMessageRegistration, setErrorMessageRegistration] =
        useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUserId } = useUser();
    const navigate = useNavigate();

    function clearErrorOnChange(event) {
        const fieldName = event.target.name;
        setErrorMessagesInput((prev) =>
            prev[fieldName] ? { ...prev, [fieldName]: null } : prev,
        );
    }

    async function onSubmitRegistrationData(event) {
        event.preventDefault();
        if (isSubmitting) return;
        setErrorMessagesInput({});
        setErrorMessageRegistration(false);

        const errorsForm = checkFormErrors(event.target);
        if (Object.keys(errorsForm).length > 0) {
            setErrorMessagesInput(errorsForm);
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData(event.target);
            const data = await submitRegistrationData(formData, "registration");
            if (data.error) {
                throw {
                    type: "application",
                    text:
                        data.errorMessage ||
                        "Diese E-Mail-Adresse wird bereits verwendet.",
                };
            }

            if (!data) {
                throw {
                    type: "server",
                    code: "work in progress",
                    text: "Serverfehler:work in progress",
                };
            }

            setUserId(data?.user_id ?? null);
            navigate("/feedingTool", {
                state: { message: "Registrierung erfolgreich!" },
            });
        } catch (error) {
            console.error("Error during registration:", error);
            if (!error.type) {
                setErrorMessageRegistration({
                    type: "network",
                    text: "Ein Netzwerkfehler ist aufgetreten. Bitte überprüfe deine Verbindung zum Internet.",
                });
            } else {
                setErrorMessageRegistration(error);
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
                    onChange={clearErrorOnChange}
                />
                {errorMessagesInput.name && (
                    <p className="inputError">{errorMessagesInput.name}</p>
                )}

                <label htmlFor="email" className="topSpaceSmall">
                    Emailadresse
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    onChange={clearErrorOnChange}
                />
                {errorMessagesInput.email && (
                    <p className="inputError">{errorMessagesInput.email}</p>
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
                    onChange={clearErrorOnChange}
                />
                {errorMessagesInput.password && (
                    <p className="inputError">{errorMessagesInput.password}</p>
                )}

                <button className="topSpace" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <span className="spinner"></span>
                    ) : (
                        "Absenden"
                    )}
                </button>
            </form>
            {errorMessageRegistration && (
                <p className="errorBanner">{errorMessageRegistration.text}</p>
            )}
        </div>
    );
}
