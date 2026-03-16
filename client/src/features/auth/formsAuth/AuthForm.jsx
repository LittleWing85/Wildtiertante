// This is the basis for the forms for login and registration

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../../context/UserContext.jsx";
import formCheck from "../../utils/formCheck.js";
import { submitAuthData } from "./authService.js";
import InputFields from "../../components/InputFields.jsx";
import clearFieldErrorOnChange from "../../utils/clearFieldErrorOnChange.js";
import Button from "../../components/Button.jsx";

export default function AuthForm({
    inputFields,
    submitType,
    buttonText,
    successMessage,
}) {
    const [errorMessagesFields, setErrorMessagesFields] = useState({});
    const [errorMessageAuth, setErrorMessageAuth] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const mountedRef = useRef(true);

    const { setUserId } = useUser();
    const navigate = useNavigate();

    useEffect(
        () => () => {
            mountedRef.current = false;
        },
        [],
    );

    function validateForm(form) {
        const errorsForm = formCheck(form);
        if (Object.keys(errorsForm).length > 0) {
            setErrorMessagesFields(errorsForm);
            return false;
        }
        return true;
    }

    async function handleSuccess(result) {
        setErrorMessageAuth(false);
        setUserId(result.user_id);
        navigate(
            "/feedingTool",
            successMessage
                ? {
                      state: { message: successMessage },
                  }
                : undefined,
        );
    }

    async function onSubmit(event) {
        if (isSubmitting) return;
        event.preventDefault();

        setErrorMessagesFields({});
        setErrorMessageAuth(false);

        if (!validateForm(event.currentTarget)) {
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData(event.currentTarget);
            const result = await submitAuthData(formData, submitType);
            handleSuccess(result);
        } catch (error) {
            setErrorMessageAuth(error.message);
        } finally {
            if (mountedRef.current) {
                setIsSubmitting(false);
            }
        }
    }

    return (
        <div className="topSpaceBig">
            <form className="flexVertically" noValidate onSubmit={onSubmit}>
                <InputFields
                    fields={inputFields}
                    onChange={(event) =>
                        clearFieldErrorOnChange(event, setErrorMessagesFields)
                    }
                    errors={errorMessagesFields}
                />

                <Button isSubmitting={isSubmitting}>{buttonText}</Button>
            </form>

            {errorMessageAuth && (
                <p className="errorBanner">{errorMessageAuth}</p>
            )}
        </div>
    );
}
