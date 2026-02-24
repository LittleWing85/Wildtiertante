//gets all litters to provide an overview for user

import express from "express";

import { wrap } from "../../middleware/wrap.js";
import { requireAuthentication } from "../authentication/middleware.js";
import { getLitters } from "./db.js";

const litterOverviewRouter = express.Router();

litterOverviewRouter.get(
    "/",
    requireAuthentication,
    wrap(async (request, response) => {
        const currentUser = request.session.user_id;
        const litters = await getLitters(currentUser);
        response.json(litters);
    }),
);

export { litterOverviewRouter };
