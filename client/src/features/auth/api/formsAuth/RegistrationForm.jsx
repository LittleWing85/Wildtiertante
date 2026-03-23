// This component renders the form for registration

import AuthForm from "./AuthForm.jsx";
import { REGISTRATION_INPUT_FIELDS } from "./authFields.js";
import { registration } from "./authService.js";

export default function RegistrationForm() {
    return (
        <AuthForm
            inputFields={REGISTRATION_INPUT_FIELDS}
            submitFunction={registration}
            buttonText="Registrieren"
            successMessage="Registrierung erfolgreich!"
        />
    );
}
