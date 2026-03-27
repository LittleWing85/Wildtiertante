import express from "express";

const user_idRouter = express.Router();

user_idRouter.get("/", (request, response) => {
    const currentUser = request.session.user_id;
    if (currentUser) {
        return response.json(currentUser);
    }
    return response.status(204).end();
});

export { user_idRouter };
