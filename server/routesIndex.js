// This code provides all routes to server.js

import { authRouter } from "./features/authentication/routes.js";
import { user_idRouter } from "./routes/publicRoutes/user_id.js";

import { newLitterRouter } from "./features/newLitter/routes.js";
import { litterOverviewRouter } from "./features/litterOverview/routes.js";
import { unfedLittersRouter } from "./features/unfedLitters/routes.js";
import { feedingDataRouter } from "./features/feedingData/routes.js";
import { getAllFeedingsRouter } from "./features/nextFeedings/routes.js";

function registerRoutes(app) {
    // AUTH ROUTES
    app.use("/api/auth", authRouter);

    // PUBLIC ROUTES
    app.use("/api/user_id", user_idRouter);

    // PROTECTED ROUTES
    app.use("/api/newLitter", newLitterRouter);
    app.use("/api/feedingData", feedingDataRouter);
    app.use("/api/litterOverview", litterOverviewRouter);
    app.use("/api/unfedLitters", unfedLittersRouter);
    app.use("/api/nextFeedings", getAllFeedingsRouter);
}
export { registerRoutes };
