import { wrap } from "../../middleware/wrap.js";
import { findUserById } from "./db.js";
import { AuthenticationError } from "../../errors/AuthenticationError.js";

const requireAuthentication = wrap(async (request, response) => {
    if (!request.session?.user_id) {
        throw new AuthenticationError(
            "Du bist nicht eingeloggt. Bitte melde dich an.",
        );
    }
    const userExists = await findUserById(request.session.user_id);
    if (!userExists) {
        request.session = null;
        throw new AuthenticationError("Ungültige Session.");
    }
});

export { requireAuthentication };
