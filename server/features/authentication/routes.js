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

authRouter.post("/login", (request, response) => {
    login(request.body)
        .then((foundUser) => {
            if (foundUser) {
                request.session.user_id = foundUser.user_id;
                response.json(foundUser);
                return;
            } // note for rework: send back error messages in case of problems.
            // adjust frontend accordingly, don't just check if response is truthy

            response.json(null);
        })
        .catch((error) => {
            console.log("POST /api/login", error);
            response.status(500).json({
                error: "Something went wrong. Please try again.",
            });
        });
});

authRouter.post("/logout", (request, response) => {
    request.session = null;
    response.json({ success: true });
});

export { authRouter };
