import cookieSession from "cookie-session";
import { isProd } from "../config/env.js";

export function sessionMiddleware() {
    return cookieSession({
        name: process.env.SESSION_NAME || "wildtiertante_session",
        secret: process.env.SESSION_SECRET || "Hello something",
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
    });
}

// refresh session expiry on each request for logged-in users
export function refreshSession(request, response, next) {
    if (request.session?.user_id) {
        request.session._ts = Date.now();
    }
    next();
}
