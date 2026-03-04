//This component renders the form for registration

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../../context/UserContext.jsx";
import { checkFormErrors, submitRegistrationData } from "./authService.js";
import createInputFields from "./InputFields";
import "./formsAuth.css";

export default function RegistrationForm() {
    const [errorMessagesInput, setErrorMessagesInput] = useState({});
    const [errorMessageRegistration, setErrorMessageRegistration] =
        useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUserId } = useUser();
    const navigate = useNavigate();

    const NEEDED_INPUT_FIELDS = ["name", "email", "password"];
    const inputFields = createInputFields(NEEDED_INPUT_FIELDS);

    function validateForm(form) {
        const errorsForm = checkFormErrors(form);
        if (Object.keys(errorsForm).length > 0) {
            setErrorMessagesInput(errorsForm);
            return false;
        }
        return true;
    }

    async function handleRegistrationSuccess(data) {
        setUserId(data.user_id);
        navigate("/feedingTool", {
            state: { message: "Registrierung erfolgreich!" },
        });
    }

    async function onSubmitRegistrationData(event) {
        if (isSubmitting) return;
        event.preventDefault();

        setErrorMessagesInput({});
        setErrorMessageRegistration(null);

        if (!validateForm(event.currentTarget)) {
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData(event.currentTarget);
            const data = await submitRegistrationData(formData, "registration");
            handleRegistrationSuccess(data);
        } catch (error) {
            setErrorMessageRegistration(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    function onChangeClearError(event) {
        const fieldName = event.currentTarget.name;
        setErrorMessagesInput((prev) =>
            prev[fieldName] ? { ...prev, [fieldName]: null } : prev,
        );
    }

    return (
        <div className="topSpaceBig">
            <form
                className="flexVertically"
                noValidate
                onSubmit={onSubmitRegistrationData}
            >
                {inputFields}
                {/*   <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Name of your shelter"
                    aria-invalid={!!errorMessagesInput.name}
                    aria-describedby="name-error"
                    onChange={onChangeClearError}
                />
                {errorMessagesInput.name && (
                    <p id="name-error" className="inputError" role="alert">
                        {errorMessagesInput.name}
                    </p>
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
                    aria-invalid={!!errorMessagesInput.email}
                    aria-describedby="email-error"
                    onChange={onChangeClearError}
                />
                {errorMessagesInput.email && (
                    <p id="email-error" className="inputError" role="alert">
                        {errorMessagesInput.email}
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
                    aria-invalid={!!errorMessagesInput.password}
                    aria-describedby="password-error"
                    onChange={onChangeClearError}
                />
                {errorMessagesInput.password && (
                    <p id="password-error" className="inputError" role="alert">
                        {errorMessagesInput.password}
                    </p>
                )}
                */}

                <button
                    className="topSpace"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="spinner" aria-hidden="true"></span>
                    ) : (
                        "Absenden"
                    )}
                </button>
            </form>
            {errorMessageRegistration && (
                <p className="errorBanner">{errorMessageRegistration}</p>
            )}
        </div>
    );
}
