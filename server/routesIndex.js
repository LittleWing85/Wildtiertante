// This code provides all routes to server.js

import { authRouter } from "./features/authentication/routes.js";
import { meRouter } from "./features/authentication/me.js";
import { csrfTokenRoute } from "./middleware/csrf.js";

import { newLitterRouter } from "./features/newLitter/routes.js";
import { litterOverviewRouter } from "./features/litterOverview/routes.js";
import { unfedLittersRouter } from "./features/unfedLitters/routes.js";
import { feedingDataRouter } from "./features/feedingData/routes.js";
import { getAllFeedingsRouter } from "./features/nextFeedings/routes.js";

function registerRoutes(app) {
    // PUBLIC / UTILITY ROUTES
    app.get("/api/csrf-token", csrfTokenRoute);
    app.use("/api/me", meRouter);

    // AUTH ROUTES
    app.use("/api/auth", authRouter);

    // PROTECTED ROUTES
    app.use("/api/newLitter", newLitterRouter);
    app.use("/api/feedingData", feedingDataRouter);
    app.use("/api/litterOverview", litterOverviewRouter);
    app.use("/api/unfedLitters", unfedLittersRouter);
    app.use("/api/nextFeedings", getAllFeedingsRouter);
}
export { registerRoutes };
