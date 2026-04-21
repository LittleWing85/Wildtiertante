// This component renders the form for registration

import { AuthForm } from "./AuthForm.jsx";
import { registration } from "./authService.js";
import { REGISTRATION_INPUT_FIELDS } from "./authFields.js";

export function RegistrationForm() {
    return (
        <AuthForm
            inputFields={REGISTRATION_INPUT_FIELDS}
            submitFunction={registration}
            buttonText="Registrieren"
            successMessage="Registrierung
            erfolgreich!"
        />
    );
}
