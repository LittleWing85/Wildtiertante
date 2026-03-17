import { useState, useRef, useEffect } from "react";
import { submitAuthData } from "./authService.js";
import { useUser } from "../../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function useAuth(successMessage, submitType) {
    const mountedRef = useRef(true);
    const { setUserId } = useUser();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessageAuth, setErrorMessageAuth] = useState(null);

    useEffect(
        () => () => {
            mountedRef.current = false;
        },
        [],
    );

    async function submit(formData) {
        if (isSubmitting) return;

        setErrorMessageAuth(false);
        setIsSubmitting(true);

        try {
            const result = await submitAuthData(formData, submitType);
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
        } catch (error) {
            setErrorMessageAuth(error.message);
        } finally {
            if (mountedRef.current) {
                setIsSubmitting(false);
            }
        }
    }

    return { isSubmitting, submit, errorMessageAuth };
}
