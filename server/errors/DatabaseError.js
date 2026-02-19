class DatabaseError extends Error {
    constructor(
        message = "Das hat aufgrund eines internen Fehlers nicht geklappt. Bitte versuche es später noch einmal.",
    ) {
        super(message);
        this.name = "DatabaseError";
        this.status = 503;
    }
}
export default DatabaseError;
