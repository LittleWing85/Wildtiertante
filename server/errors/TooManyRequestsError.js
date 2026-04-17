import { AppError } from "./AppError.js";

class TooManyRequestsError extends AppError {
    constructor(
        message = "Zu viele Anfragen. Bitte versuche es später erneut.",
    ) {
        super(message, 429);
    }
}

export { TooManyRequestsError };
