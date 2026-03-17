// This is the basis for the forms for login and registration

import { useState } from "react";

import useAuth from "./useAuth.js";
import formCheck from "../../utils/formCheck.js";
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
    const { isSubmitting, submit, errorMessageAuth } = useAuth(
        successMessage,
        submitType,
    );

    function validateForm(form) {
        const errorsForm = formCheck(form);
        if (Object.keys(errorsForm).length > 0) {
            setErrorMessagesFields(errorsForm);
            return false;
        }
        return true;
    }

    function onSubmit(event) {
        event.preventDefault();

        if (!validateForm(event.currentTarget)) {
            return;
        }
        setErrorMessagesFields({});

        const formData = new FormData(event.currentTarget);

        submit(formData);
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
