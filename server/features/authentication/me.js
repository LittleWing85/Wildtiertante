import express from "express";

import { wrap } from "../../middleware/wrap.js";
import { requireAuthentication } from "./middleware.js";

const meRouter = express.Router();

meRouter.get(
    "/",
    requireAuthentication,
    wrap((request, response) => {
        return response.json({ user: { id: request.user.id } });
    }),
);

export { meRouter };
