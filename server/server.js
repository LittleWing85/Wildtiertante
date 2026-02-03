import express from "express";
import { clientPublicPath, clientIndexPath } from "./config/paths.js";
import { sessionMiddleware, refreshSession } from "./middleware/session.js";
import authRouter from "./authRoutes/auth.js";
import user_idRouter from "./publicRoutes/user_id.js";
import newLitterRouter from "./protectedRoutes/newLitter.js";
import litterOverviewRouter from "./protectedRoutes/litterOverview.js";
import unfedLittersRouter from "./protectedRoutes/unfedLitters.js";
import feedingDataRouter from "./protectedRoutes/feedingData.js";
import getallFeedingsRouter from "./protectedRoutes/nextFeedings.js";
import centralErrorHandler from "./middleware/error.js";

const app = express();

app.use(express.static(clientPublicPath));

app.use(express.json());

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

// FALLBACK
app.get("*", (request, response) => {
    response.sendFile(clientIndexPath);
});

// ERROR HANDLER
app.use(centralErrorHandler);

app.listen(process.env.PORT || 4001, function () {
    console.log("I'm listening.");
});
