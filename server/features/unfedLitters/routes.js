// Gets all newly arrived litters who haven't been fed yet

import express from "express";

import { wrap } from "../../middleware/wrap.js";
import { requireAuthentication } from "../authentication/middleware.js";
import { fullJoinLittersAndFeedings } from "./db.js";

const unfedLittersRouter = express.Router();

unfedLittersRouter.get(
    "/",
    requireAuthentication,
    wrap(async (request, response) => {
        const currentUser = request.session.user_id;
        const fullJoin = await fullJoinLittersAndFeedings(currentUser);
        const unfedLitters = fullJoin.filter(function (record) {
            return record.feeding_id === null;
        });
        response.json(unfedLitters);
    }),
);

export { unfedLittersRouter };
