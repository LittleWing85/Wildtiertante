import express from "express";

const user_idRouter = express.Router();

user_idRouter.get("/", (request, response) => {
    const currentUser = request.session.user_id;
    if (currentUser) {
        response.json(currentUser);
        return;
    }
    response.json(null);
});

export default user_idRouter;
