import express from "express";
import { requireLogin, wrap } from "./protectedRoutesUtils.js";
import { createLitter, createIndividual } from "./protectedRoutesDb.js";

const newLitterRouter = express.Router();

newLitterRouter.post(
    "/",
    requireLogin,
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

export default newLitterRouter;
