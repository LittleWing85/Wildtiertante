import { rest } from "msw";

//testing scenario: registration successful
export const handlers = [
    rest.post("api/registration", (request, response, ctx) => {
        return response(ctx.status(200), ctx.json({}));
    }),
];
