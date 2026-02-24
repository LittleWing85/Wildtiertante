//Route for documentation of feedings

import express from "express";

import wrap from "../../middleware/wrap.js";
import requireAuthentication from "../../middleware/requireAuthentication.js";
import { createFeedingEntry } from "./protectedRoutesDb.js";

const feedingDataRouter = express.Router();

feedingDataRouter.post(
    "/",
    requireAuthentication,
    wrap(async (request, response) => {
        const newFeedingEntry = await createFeedingEntry(
            request.body.feedingData,
        );
        response.json(newFeedingEntry);
    }),
);

export default feedingDataRouter;
