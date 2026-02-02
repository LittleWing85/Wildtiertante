// This component renders the form for login

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../UserContext.jsx";
import { checkFormErrors, submitLoginData } from "./authService.js";
import "./formsAuth.css";

export default function LoginForm() {
    const [errorMessagesForm, setErrorMessagesForm] = useState({});
    const [errorMessageLogin, setErrorMessageLogin] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUserId } = useUser();
    const navigate = useNavigate();

    async function onSubmitLogin(event) {
        event.preventDefault();
        if (isSubmitting) return;
        setErrorMessagesForm({});
        setErrorMessageLogin(false);

        const errorsForm = checkFormErrors(event.target);
        if (Object.keys(errorsForm).length > 0) {
            setErrorMessagesForm(errorsForm);
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData(event.target);
            const data = await submitLoginData(formData, "login");

            if (data?.user_id) {
                setErrorMessageLogin(false);
                setUserId(data?.user_id ?? null);
                navigate("/feedingTool");
                return;
            }

            setErrorMessageLogin(true);
        } catch (error) {
            console.log(error);
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
                <label htmlFor="email">Emailadresse</label>
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
                    placeholder="Passwort"
                />
                {errorMessagesForm.password && (
                    <p className="inputError">{errorMessagesForm.password}</p>
                )}

                <button className="topSpace" disabled={isSubmitting}>
                    {isSubmitting ? <span className="spinner"></span> : "Login"}
                </button>
            </form>

            {errorMessageLogin && (
                <p className="errorBanner">Login derzeit nicht möglich</p>
            )}
        </div>
    );
}
