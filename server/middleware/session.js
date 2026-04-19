import cookieSession from "cookie-session";
import { sessionConfig } from "../config/session.js";

export function sessionMiddleware() {
    return cookieSession(sessionConfig);
}

// refresh session expiry on each request for logged-in users
export function refreshSession(request, response, next) {
    if (request.session?.user_id) {
        request.session._ts = Date.now();
    }
    next();
}
