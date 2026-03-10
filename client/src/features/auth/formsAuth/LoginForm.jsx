// This component renders the form for login

import AuthForm from "./AuthForm.jsx";
import { LOGIN_INPUT_FIELDS } from "./authFields.js";

export default function LoginForm() {
    return (
        <AuthForm
            inputFields={LOGIN_INPUT_FIELDS}
            submitType="login"
            buttonText="Einloggen"
        />
    );
}
