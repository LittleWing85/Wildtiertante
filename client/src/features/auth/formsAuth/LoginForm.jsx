// This component renders the form for login

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../../context/UserContext.jsx";
import { checkFormErrors, submitLoginData } from "./authService.js";
import InputFields from "../../components/InputFields.jsx";
import { LOGIN_INPUT_FIELDS } from "./authFields.js";
import clearFieldErrorOnChange from "../../utils/clearFieldErrorOnChange.js";
import Button from "../../components/Button.jsx";

export default function LoginForm() {
    const [errorMessagesForm, setErrorMessagesInput] = useState({});
    const [errorMessageLogin, setErrorMessageLogin] = useState(null);
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

    async function handleLoginSuccess() {
        setErrorMessageLogin(false);
        const response = await fetch("/api/user_id");
        const data = await response.json();
        setUserId(data);
        navigate("/feedingTool");
        return;
    }

    async function onSubmitLogin(event) {
        if (isSubmitting) return;
        event.preventDefault();

        setErrorMessagesInput({});
        setErrorMessageLogin(false);

        if (!validateForm(event.currentTarget)) {
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData(event.currentTarget);
            await submitLoginData(formData, "login");
            handleLoginSuccess();
        } catch (error) {
            setErrorMessageLogin(error.message);
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
                <InputFields
                    fields={LOGIN_INPUT_FIELDS}
                    onChange={(event) =>
                        clearFieldErrorOnChange(event, setErrorMessagesInput)
                    }
                    errors={errorMessagesForm}
                />

                <Button isSubmitting={isSubmitting}>Einloggen</Button>
            </form>

            {errorMessageLogin && (
                <p className="errorBanner">{errorMessageLogin}</p>
            )}
        </div>
    );
}
