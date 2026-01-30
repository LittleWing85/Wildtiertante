//Route for documentation of feedings

import express from "express";
import { requireLogin, wrap } from "./protectedRoutesUtils.js";
import { createFeedingEntry } from "./protectedRoutesDb.js";

const routerFeedingData = express.Router();

routerFeedingData.post(
    "/",
    requireLogin,
    wrap(async (request, response) => {
        const newFeedingEntry = await createFeedingEntry(
            request.body.feedingData,
        );
        response.json(newFeedingEntry);
    }),
);

export default routerFeedingData;
