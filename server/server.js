import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieSession from "cookie-session";
import authRouter from "./authRoutes/auth.js";
import newLitterRouter from "./protectedRoutes/newLitter.js";
import litterOverviewRouter from "./protectedRoutes/litterOverview.js";
import unfedLittersRouter from "./protectedRoutes/unfedLitters.js";
import feedingDataRouter from "./protectedRoutes/feedingData.js";
import getallFeedingsRouter from "./protectedRoutes/nextFeedings.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(
    cookieSession({
        name: process.env.SESSION_NAME || "wildtiertante_session",
        secret: process.env.SESSION_SECRET || "Hello something",
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    }),
);
// refresh session expiry on each request for logged-in users
app.use((request, response, next) => {
    if (request.session?.user_id) {
        request.session._ts = Date.now();
    }
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// AUTH ROUTES
app.use("/api/auth", authRouter);

// PUBLIC ROUTES
app.get("/api/user_id", (request, response) => {
    const currentUser = request.session.user_id;
    if (currentUser) {
        response.json(currentUser);
        return;
    }
    response.json(null);
});

// PROTECTED ROUTES
app.use("/api/newLitter", newLitterRouter);
app.use("/api/feedingData", feedingDataRouter);
app.use("/api/litterOverview", litterOverviewRouter);
app.use("/api/unfedLitters", unfedLittersRouter);
app.use("/api/nextFeedings", getallFeedingsRouter);

// OTHER
// Fallback
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// Central error handler
app.use((error, request, response, next) => {
    console.error("Server error:", error);
    if (response.headersSent) return next(error);
    response.status(error.status || 500).json({
        error: error.message || "Internal Server Error",
    });
});

app.listen(process.env.PORT || 4001, function () {
    console.log("I'm listening.");
});
