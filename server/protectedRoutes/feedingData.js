//Route for documentation of feedings

import express from "express";

import wrap from "../middleware/wrap.js";
import requireLogin from "./requireLogin.js";
import { createFeedingEntry } from "./protectedRoutesDb.js";

const feedingDataRouter = express.Router();

feedingDataRouter.post(
    "/",
    requireLogin,
    wrap(async (request, response) => {
        const newFeedingEntry = await createFeedingEntry(
            request.body.feedingData,
        );
        response.json(newFeedingEntry);
    }),
);

export default feedingDataRouter;
