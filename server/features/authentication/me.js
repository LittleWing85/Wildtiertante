// provides utility route to check if user is logged in
// provides user_id of logged in user

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
