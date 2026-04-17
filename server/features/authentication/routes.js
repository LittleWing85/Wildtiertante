import express from "express";

import { wrap } from "../../middleware/wrap.js";
import { createUser, login } from "./db.js";
import {
    authLoginLimiter,
    authRegistrationLimiter,
    authLogoutLimiter,
} from "../../middleware/rateLimit.js";

const authRouter = express.Router();

authRouter.post(
    "/registration",
    authRegistrationLimiter,
    wrap(async (request, response) => {
        const newUser = await createUser(request.body);
        const userId = newUser.user_id;
        request.session = { user_id: userId };
        return response.json({ user: { id: userId } });
    }),
);

authRouter.post(
    "/login",
    authLoginLimiter,
    wrap(async (request, response) => {
        const authenticatedUser = await login(request.body);
        const userId = authenticatedUser.user_id;
        request.session = { user_id: userId };
        return response.json({ user: { id: userId } });
    }),
);

authRouter.post(
    "/logout",
    authLogoutLimiter,
    wrap((request, response) => {
        if (!request.session?.user_id) {
            return response.json({ success: true });
        }
        request.session = null;
        return response.json({ success: true });
    }),
);

export { authRouter };
