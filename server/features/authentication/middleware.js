// Checks if user is logged in for routes that require authentication

import { wrap } from "../../middleware/wrap.js";
import { findUserById } from "./db.js";
import { AuthenticationError } from "../../errors/AuthenticationError.js";

const requireAuthentication = wrap(async (request, response, next) => {
    const userId = request.session.user_id;

    if (!userId) {
        throw new AuthenticationError(
            "Du bist nicht eingeloggt. Bitte melde dich an.",
        );
    }
    const user = await findUserById(userId);
    if (!user) {
        request.session = null;
        throw new AuthenticationError("Ungültige Session.");
    }

    request.user = { id: userId };
    next();
});

export { requireAuthentication };
