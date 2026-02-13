import { isProd } from "./env.js";

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET must be defined");
}

const SESSION_NAME = process.env.SESSION_NAME || "wildtiertante_session";
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_MAX_AGE = 1000 * 60 * 60 * 24 * 14; // 14 days

const sessionConfig = {
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    maxAge: SESSION_MAX_AGE,
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
};

export { sessionConfig };
