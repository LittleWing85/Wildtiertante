// Gets all newly arrived litters who haven't been fed yet

import express from "express";

import wrap from "../../middleware/wrap.js";
import requireAuthentication from "../../middleware/requireAuthentication.js";
import { fullJoinLittersAndFeedings } from "./protectedRoutesDb.js";

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

export default unfedLittersRouter;
