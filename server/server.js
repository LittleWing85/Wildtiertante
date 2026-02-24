import express from "express";
import { clientPublicPath, clientIndexPath } from "./config/paths.js";
import { port } from "./config/env.js";
import {
    sessionMiddleware,
    refreshSession,
} from "./middleware/session.middleware.js";
import { registerRoutes } from "./routesIndex.js";
import { centralErrorHandler } from "./middleware/error.js";

const app = express();

app.use(express.json({ limit: "1mb" }));

app.use(sessionMiddleware());
app.use("/api", refreshSession);

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
