// This component renders the form for login

import AuthForm from "./AuthForm.jsx";
import { LOGIN_INPUT_FIELDS } from "./authFields.js";
import { login } from "./authService.js";

export default function LoginForm() {
    return (
        <AuthForm
            inputFields={LOGIN_INPUT_FIELDS}
            submitFunction={login}
            buttonText="Einloggen"
        />
    );
}
