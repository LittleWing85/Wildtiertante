// Provides CSRF protection by generating tokens, setting a cookie,
// and validating requests via cookie + header comparison and HMAC verification

import crypto from "crypto";

import { isProd } from "../config/env.js";
import { CsrfError } from "../errors/CsrfError.js";

const useHostPrefix = isProd;

const CSRF_COOKIE_NAME = useHostPrefix
    ? "__Host-wildtiertante_csrf"
    : "wildtiertante_csrf";
const CSRF_HEADER_NAME = "x-csrf-token";

const CSRF_SECRET = process.env.CSRF_SECRET || process.env.SESSION_SECRET;

if (!CSRF_SECRET) {
    throw new Error("CSRF_SECRET or SESSION_SECRET must be defined");
}

function getSessionBinding(request) {
    return request.session?.user_id ? String(request.session.user_id) : "guest";
}

function createCsrfToken(request) {
    const nonce = crypto.randomBytes(32).toString("hex");
    const sessionBinding = getSessionBinding(request);

    const hmac = crypto
        .createHmac("sha256", CSRF_SECRET)
        .update(`${sessionBinding}.${nonce}`)
        .digest("hex");

    return `${nonce}.${hmac}`;
}

function verifyCsrfToken(request, token) {
    if (!token || typeof token !== "string") return false;

    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [nonce, providedHmac] = parts;
    if (!nonce || !providedHmac) return false;

    const sessionBinding = getSessionBinding(request);

    const expectedHmac = crypto
        .createHmac("sha256", CSRF_SECRET)
        .update(`${sessionBinding}.${nonce}`)
        .digest("hex");

    const providedBuffer = Buffer.from(providedHmac, "hex");
    const expectedBuffer = Buffer.from(expectedHmac, "hex");

    if (providedBuffer.length !== expectedBuffer.length) return false;

    return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
}

function parseCookies(request) {
    const cookieHeader = request.headers.cookie;
    if (!cookieHeader) return {};

    return Object.fromEntries(
        cookieHeader.split(";").map((part) => {
            const [rawName, ...rawValue] = part.trim().split("=");
            return [rawName, decodeURIComponent(rawValue.join("="))];
        }),
    );
}

function setCsrfCookie(response, token) {
    response.cookie(CSRF_COOKIE_NAME, token, {
        path: "/",
        sameSite: "strict",
        secure: useHostPrefix,
        httpOnly: true,
    });
}

function csrfTokenRoute(request, response) {
    const token = createCsrfToken(request);
    setCsrfCookie(response, token);

    return response.json({ csrfToken: token });
}

function requireCsrf(request, response, next) {
    const method = request.method.toUpperCase();
    const isSafeMethod =
        method === "GET" || method === "HEAD" || method === "OPTIONS";

    if (isSafeMethod) {
        return next();
    }

    const cookies = parseCookies(request);
    const cookieToken = cookies[CSRF_COOKIE_NAME];
    const headerToken = request.get(CSRF_HEADER_NAME);

    if (!cookieToken || !headerToken) {
        throw new CsrfError();
    }

    if (cookieToken !== headerToken) {
        throw new CsrfError();
    }

    if (!verifyCsrfToken(request, headerToken)) {
        throw new CsrfError();
    }

    next();
}

export { CSRF_HEADER_NAME, csrfTokenRoute, requireCsrf };
