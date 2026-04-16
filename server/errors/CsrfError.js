import { AppError } from "./AppError.js";

class CsrfError extends AppError {
    constructor(message = "CSRF-Prüfung fehlgeschlagen!") {
        super(message, 403);
    }
}
export { CsrfError };
