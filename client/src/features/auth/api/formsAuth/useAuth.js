// Provides error messages and variable "isSubmitting" for auth forms
// Executes submit of form data

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { formCheck } from "../../../../utils/formCheck.js";
import { useUser } from "../../../../context/UserContext.jsx";

export function useAuth(submitFunction, successMessage) {
    const navigate = useNavigate();
    const isComponentActiveRef = useRef(true);
    const submittingRef = useRef(false);

    const { setUserId } = useUser();

    const [errorMessagesFields, setErrorMessagesFields] = useState({});
    const [errorMessageAuth, setErrorMessageAuth] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        return () => {
            isComponentActiveRef.current = false;
        };
    }, []);

    async function submit(formElement) {
        if (submittingRef.current) {
            return;
        }

        const errorsForm = formCheck(formElement);

        if (Object.keys(errorsForm).length) {
            setErrorMessagesFields(errorsForm);
            return;
        }

        submittingRef.current = true;
        setErrorMessagesFields({});
        setErrorMessageAuth(null);
        setIsSubmitting(true);

        const formData = new FormData(formElement);

        try {
            const result = await submitFunction(formData);
            if (isComponentActiveRef.current) {
                setUserId(result.user.id);
                navigate(
                    "/feedingTool",
                    successMessage
                        ? {
                              state: { message: successMessage },
                          }
                        : undefined,
                );
            }
        } catch (error) {
            if (isComponentActiveRef.current) {
                setErrorMessageAuth(error.message);
            }
        } finally {
            if (isComponentActiveRef.current) {
                setIsSubmitting(false);
            }
            submittingRef.current = false;
        }
    }

    return {
        isSubmitting,
        submit,
        errorMessageAuth,
        errorMessagesFields,
        setErrorMessagesFields,
    };
}
