// Session middleware

import cookieSession from "cookie-session";
import { sessionConfig } from "../config/session..config.js";

function sessionMiddleware() {
    return cookieSession(sessionConfig);
}

// refresh session expiry on each request for logged-in users
export function refreshSession(request, response, next) {
    if (request.session?.user_id) {
        request.session.lastActivity = Date.now();
    }
    next();
}

export { sessionMiddleware };
