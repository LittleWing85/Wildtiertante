import express from "express";
import { createUser, login } from "./authDb.js";

const authRouter = express.Router();

authRouter.post("/registration", (request, response) => {
    createUser(request.body)
        .then((newUser) => {
            request.session.user_id = newUser.user_id;
            response.json(newUser);
        })
        .catch((error) => {
            console.log("POST /api/registration", error);
            if (error.constraint === "users_email_key") {
                response.status(400).json({
                    error: "E-mail already in use.",
                });
                return;
                // note for rework: send back error messages in case of problems.
            }
            response.status(500).json({
                error: "Something went wrong. Please try again later.",
            });
        });
});

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

export default authRouter;
