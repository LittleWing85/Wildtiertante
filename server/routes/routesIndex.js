// This code provides all routes to server.js

import authRouter from "./authRoutes/auth.js";
import user_idRouter from "./publicRoutes/user_id.js";

import newLitterRouter from "./protectedRoutes/newLitter.js";
import litterOverviewRouter from "./protectedRoutes/litterOverview.js";
import unfedLittersRouter from "./protectedRoutes/unfedLitters.js";
import feedingDataRouter from "./protectedRoutes/feedingData.js";
import getallFeedingsRouter from "./protectedRoutes/nextFeedings.js";

export default function registerRoutes(app) {
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
}
