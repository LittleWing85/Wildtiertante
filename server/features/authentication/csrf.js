import express from "express";
const csrfRouter = express.Router();

csrfRouter.get("/", (request, response) => {
    response.json({ csrfToken: request.csrfToken() });
});

export { csrfRouter };
