// This component renders the form for login

import { AuthForm } from "./AuthForm.jsx";
import { login } from "./authService.js";
import { LOGIN_INPUT_FIELDS } from "./authFields.js";

export function LoginForm() {
    return (
        <AuthForm
            inputFields={LOGIN_INPUT_FIELDS}
            submitFunction={login}
            buttonText="Einloggen"
        />
    );
}
