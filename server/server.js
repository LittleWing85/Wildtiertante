import express from "express";
import { clientPublicPath, clientIndexPath } from "./config/paths.js";
import { port } from "./config/env.js";
import { sessionMiddleware, refreshSession } from "./middleware/session.js";
import registerRoutes from "./routes/routesIndex.js";
import centralErrorHandler from "./middleware/error.js";

const app = express();

app.use(express.json());

app.use(sessionMiddleware());
app.use(refreshSession);

app.use(express.static(clientPublicPath));

registerRoutes(app);

app.get("*", (request, response) => {
    response.sendFile(clientIndexPath);
});

app.use(centralErrorHandler);

app.listen(port, () => {
    console.log(`I'm listening on port ${port}`);
});
