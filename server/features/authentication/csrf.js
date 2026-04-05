import express from "express";
import { csrfProtection } from "../../middleware/csrf.js";

const csrfRouter = express.Router();

csrfRouter.get("/", csrfProtection, (request, response) => {
    response.json({ csrfToken: request.csrfToken() });
});

export { csrfRouter };
