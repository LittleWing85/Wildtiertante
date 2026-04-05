import express from "express";
import { wrap } from "../../middleware/wrap.js";
import { createUser, login } from "./db.js";

const authRouter = express.Router();

authRouter.post(
    "/registration",
    wrap(async (request, response) => {
        const newUser = await createUser(request.body);
        request.session = null;
        request.session = { user_id: newUser.user_id };
        return response.json({ user_id: newUser.user_id });
    }),
);

authRouter.post(
    "/login",
    wrap(async (request, response) => {
        const authenticatedUser = await login(request.body);
        request.session = null;
        request.session = { user_id: authenticatedUser.user_id };
        return response.json({ user_id: authenticatedUser.user_id });
    }),
);

authRouter.post(
    "/logout",
    wrap((request, response) => {
        if (!request.session?.user_id) {
            return response
                .status(401)
                .json({ error: "Derzeit ist niemand eingeloggt." });
        }
        request.session.user_id = null;
        return response.json({ success: true });
    }),
);

export { authRouter };
