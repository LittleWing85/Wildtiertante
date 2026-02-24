//creates a new litter

import express from "express";

import { wrap } from "../../middleware/wrap.js";
import { requireAuthentication } from "../authentication/middleware.js";
import { createLitter, createIndividual } from "./db.js";

const newLitterRouter = express.Router();

newLitterRouter.post(
    "/",
    requireAuthentication,
    wrap(async (request, response) => {
        const litterData = {
            ...request.body.litterData,
            id_associated_user: request.session.user_id,
        };
        const newLitterEntry = await createLitter(litterData);
        await Promise.all(
            (request.body.animals || []).map((individual) => {
                const data = {
                    ...individual,
                    id_associated_litter: newLitterEntry.litter_id,
                };
                return createIndividual(data);
            }),
        );
        response.json(newLitterEntry);
    }),
);

export { newLitterRouter };
