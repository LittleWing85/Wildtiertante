//Route for documentation of feedings

import express from "express";

import { wrap } from "../../middleware/wrap.js";
import { requireAuthentication } from "../authentication/middleware.js";
import { createFeedingEntry } from "./db.js";

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

export { feedingDataRouter };
