import express from "express";
import { wrap } from "../../middleware/wrap.js";
import { createUser, login } from "./db.js";

const authRouter = express.Router();

authRouter.post(
    "/registration",
    wrap(async (request, response) => {
        const newUser = await createUser(request.body);
        const userId = newUser.user_id;
        request.session = { user_id: userId };
        return response.json({ user: { id: userId } });
    }),
);

authRouter.post(
    "/login",
    wrap(async (request, response) => {
        const authenticatedUser = await login(request.body);
        const userId = authenticatedUser.user_id;
        request.session = { user_id: userId };
        return response.json({ user: { id: userId } });
    }),
);

authRouter.post(
    "/logout",
    wrap((request, response) => {
        if (!request.session?.user_id) {
            return response.json({ success: true });
        }
        request.session = null;
        return response.json({ success: true });
    }),
);

export { authRouter };
