// This component renders the form for registration

import AuthForm from "./AuthForm.jsx";
import { REGISTRATION_INPUT_FIELDS } from "./authFields.js";

export default function RegistrationForm() {
    return (
        <AuthForm
            inputFields={REGISTRATION_INPUT_FIELDS}
            submitType="registration"
            buttonText="Registrieren"
            successMessage="Registrierung erfolgreich!"
        />
    );
}
