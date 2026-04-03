import csurf from "csurf";

const csrfProtection = csurf({
    cookie: false, // because we use session-cookies
    ignoreMethods: ["GET", "HEAD", "OPTIONS"],
});

export { csrfProtection };
