import express from "express";
import { wrap } from "../../middleware/wrap.js";
import { createUser, login } from "./db.js";

const authRouter = express.Router();

authRouter.post(
    "/registration",
    wrap(async (request, response) => {
        const newUser = await createUser(request.body);
        request.session.user_id = newUser.user_id;
        return response.json(newUser);
    }),
);

authRouter.post(
    "/login",
    wrap(async (request, response) => {
        const authenticatedUser = await login(request.body);
        request.session.user_id = authenticatedUser.user_id;
        return response.json({ success: true });
    }),
);

authRouter.post("/logout", (request, response) => {
    request.session = null;
    response.json({ success: true });
});

export { authRouter };
