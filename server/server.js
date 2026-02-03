import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { sessionMiddleware, refreshSession } from "./middleware/session.js";
import authRouter from "./authRoutes/auth.js";
import user_idRouter from "./publicRoutes/user_id.js";
import newLitterRouter from "./protectedRoutes/newLitter.js";
import litterOverviewRouter from "./protectedRoutes/litterOverview.js";
import unfedLittersRouter from "./protectedRoutes/unfedLitters.js";
import feedingDataRouter from "./protectedRoutes/feedingData.js";
import getallFeedingsRouter from "./protectedRoutes/nextFeedings.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// SESSION MIDDLEWARE
app.use(sessionMiddleware());
app.use(refreshSession);

// AUTH ROUTES
app.use("/api/auth", authRouter);

// PUBLIC ROUTES
app.use("/api/user_id", user_idRouter);

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
