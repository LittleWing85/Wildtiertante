import { rateLimit } from "express-rate-limit";

import {
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_LOGIN_MAX,
    RATE_LIMIT_REGISTRATION_MAX,
    RATE_LIMIT_LOGOUT_MAX,
    isProd,
} from "../config/env.js";

function createLimiter({ max, message }) {
    return rateLimit({
        windowMs: RATE_LIMIT_WINDOW_MS,
        limit: max,
        standardHeaders: "draft-8",
        legacyHeaders: false,
        message: { error: message },
        skipSuccessfulRequests: false,
        validate: { xForwardedForHeader: false },
    });
}

const authLoginLimiter = createLimiter({
    max: RATE_LIMIT_LOGIN_MAX,
    message:
        "Zu viele Login-Versuche. Bitte versuche es in einigen Minuten erneut.",
});

const authRegistrationLimiter = createLimiter({
    max: RATE_LIMIT_REGISTRATION_MAX,
    message:
        "Zu viele Registrierungsversuche. Bitte versuche es in einigen Minuten erneut.",
});

const authLogoutLimiter = createLimiter({
    max: RATE_LIMIT_LOGOUT_MAX,
    message:
        "Zu viele Logout-Anfragen. Bitte versuche es in einigen Minuten erneut.",
});

export { authLoginLimiter, authRegistrationLimiter, authLogoutLimiter };
