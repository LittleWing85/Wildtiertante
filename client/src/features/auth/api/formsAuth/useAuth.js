// Provides error messages and variable "isSubmitting" for auth forms
// Executes submit of form data

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import formCheck from "../../../utils/formCheck.js";
import { useUser } from "../../../../context/UserContext.jsx";

export default function useAuth(submitFunction, successMessage) {
    const navigate = useNavigate();
    const mountedRef = useRef(true);

    const { setUserId } = useUser();

    const [errorMessagesFields, setErrorMessagesFields] = useState({});
    const [errorMessageAuth, setErrorMessageAuth] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(
        () => () => {
            mountedRef.current = false;
        },
        [],
    );

    async function submit(formElement) {
        if (isSubmitting) return;
        const errorsForm = formCheck(formElement);

        if (Object.keys(errorsForm).length) {
            setErrorMessagesFields(errorsForm);
            return;
        }

        setErrorMessagesFields({});
        setErrorMessageAuth(null);
        setIsSubmitting(true);

        const formData = new FormData(formElement);

        try {
            const result = await submitFunction(formData);
            setUserId(result.user_id);
            navigate(
                "/feedingTool",
                successMessage
                    ? {
                          state: { message: successMessage },
                      }
                    : undefined,
            );
        } catch (error) {
            setErrorMessageAuth(error.message);
        } finally {
            if (mountedRef.current) {
                setIsSubmitting(false);
            }
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
