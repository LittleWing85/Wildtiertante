import express from "express";
import { requireLogin, wrap } from "./protectedRoutesUtils.js";
import { getLitters } from "./protectedRoutesDb.js";

const litterOverviewRouter = express.Router();

litterOverviewRouter.get(
    "/",
    requireLogin,
    wrap(async (request, response) => {
        const currentUser = request.session.user_id;
        const litters = await getLitters(currentUser);
        response.json(litters);
    }),
);

export default litterOverviewRouter;
