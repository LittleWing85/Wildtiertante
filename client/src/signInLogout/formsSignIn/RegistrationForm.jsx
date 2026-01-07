//This component renders the form for registration

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../UserContext.jsx";
import { checkFormErrors, submitRegistrationData } from "./signInUtils.js";
import "./formsSignIn.css";

export default function RegistrationForm() {
    const [errorMessagesForm, setErrorMessagesForm] = useState({});
    const [errorMessageRegistration, setErrorMessageRegistration] =
        useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUserId } = useUser();
    const navigate = useNavigate();

    async function onSubmitRegistrationData(event) {
        event.preventDefault();
        if (isSubmitting) return;
        setErrorMessagesForm({});
        setErrorMessageRegistration(false);

        const errorsForm = checkFormErrors(event.target);
        if (Object.keys(errorsForm).length > 0) {
            setErrorMessagesForm(errorsForm);
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
            navigate("/feedingTool");
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
                />
                {errorMessagesForm.name && (
                    <p className="inputError">{errorMessagesForm.name}</p>
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
                />
                {errorMessagesForm.email && (
                    <p className="inputError">{errorMessagesForm.email}</p>
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
                {errorMessagesForm.password && (
                    <p className="inputError">{errorMessagesForm.password}</p>
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
