class ValidationError extends Error {
    constructor(message = "Required fields are missing!") {
        super(message);
        this.name = "ValidationError";
        this.status = 400;
    }
}
export default ValidationError;
