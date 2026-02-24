import { AppError } from "./AppError.js";

class AuthenticationError extends AppError {
    constructor(
        message = "Authentifizierung ist fehlgeschlagen. Bitte versuche es später erneut.",
    ) {
        super(message, 401);
    }
}

export { AuthenticationError };
