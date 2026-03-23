// Basis for rendering auth forms

import useAuth from "./useAuth.js";
import InputFields from "../../../components/InputFields.jsx";
import clearFieldErrorOnChange from "../../utils/clearFieldErrorOnChange.js";
import Button from "../../../components/Button.jsx";

export default function AuthForm({
    inputFields,
    submitFunction,
    buttonText,
    successMessage,
}) {
    const {
        isSubmitting,
        submit,
        errorMessageAuth,
        errorMessagesFields,
        setErrorMessagesFields,
    } = useAuth(submitFunction, successMessage);

    function onSubmit(event) {
        event.preventDefault();
        submit(event.currentTarget);
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

                <Button isLoading={isSubmitting} type="submit">
                    {buttonText}
                </Button>
            </form>

            {errorMessageAuth && (
                <p className="errorBanner">{errorMessageAuth}</p>
            )}
        </div>
    );
}
