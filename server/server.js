import express from "express";

import { clientPublicPath, clientIndexPath } from "./config/paths.js";
import { port, TRUST_PROXY } from "./config/env.js";
import { sessionMiddleware, refreshSession } from "./middleware/session.js";
import { registerRoutes } from "./routesIndex.js";
import { centralErrorHandler } from "./middleware/error.js";
import { requireCsrf } from "./middleware/csrf.js";

const app = express();

if (TRUST_PROXY !== false) {
    app.set("trust proxy", TRUST_PROXY);
}

app.use(express.json({ limit: "1mb" }));

app.use(sessionMiddleware());
app.use("/api", refreshSession);
app.use("/api", requireCsrf);

app.use(express.static(clientPublicPath));

registerRoutes(app);

app.use("/api", (request, response) => {
    console.log("404");
    return response.status(404).json({ error: "Diese Seite existiert nicht" });
});

app.get("*", (request, response) => {
    return response.sendFile(clientIndexPath);
});

app.use(centralErrorHandler);

app.listen(port, () => {
    console.log(`I'm listening on port ${port}`);
});
