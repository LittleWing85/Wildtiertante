// provides utility route to check if user is logged in
// provides user_id of logged in user

import express from "express";

import { wrap } from "../../middleware/wrap.js";
import { findUserById } from "./db.js";

const meRouter = express.Router();

meRouter.get(
    "/",
    wrap(async (request, response) => {
        const userId = request.session?.user_id;
        if (!userId) return response.json({ user: null });
        const user = await findUserById(userId);
        if (!user) {
            request.session = null;
            return response.json({ user: null });
        }
        return response.json({ user: { id: userId } });
    }),
);

export { meRouter };
