import { AppError } from "./AppError.js";

class ValidationError extends AppError {
    constructor(message = "Bitte überprüfe deine Eingaben!") {
        super(message, 400);
    }
}
export { ValidationError };
