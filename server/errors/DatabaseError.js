import AppError from "./AppError.js";

class DatabaseError extends AppError {
    constructor(
        message = "Das hat aufgrund eines internen Fehlers nicht geklappt. Bitte versuche es später noch einmal.",
    ) {
        super(message, 503);
    }
}
export default DatabaseError;
