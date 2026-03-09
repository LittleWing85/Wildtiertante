//This component renders the form for registration

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../../context/UserContext.jsx";
import { checkFormErrors, submitRegistrationData } from "./authService.js";
import InputFields from "../../components/InputFields.jsx";
import { REGISTRATION_INPUT_FIELDS } from "./authFields.js";
import clearFieldErrorOnChange from "../../utils/clearFieldErrorOnChange.js";
import Button from "../../components/Button.jsx";

export default function RegistrationForm() {
    const [errorMessagesInput, setErrorMessagesInput] = useState({});
    const [errorMessageRegistration, setErrorMessageRegistration] =
        useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUserId } = useUser();
    const navigate = useNavigate();

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
        return;
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

    return (
        <div className="topSpaceBig">
            <form
                className="flexVertically"
                noValidate
                onSubmit={onSubmitRegistrationData}
            >
                <InputFields
                    fields={REGISTRATION_INPUT_FIELDS}
                    onChange={(event) =>
                        clearFieldErrorOnChange(event, setErrorMessagesInput)
                    }
                    errors={errorMessagesInput}
                />

                <Button isSubmitting={isSubmitting}>Registrieren</Button>
            </form>
            {errorMessageRegistration && (
                <p className="errorBanner">{errorMessageRegistration}</p>
            )}
        </div>
    );
}
