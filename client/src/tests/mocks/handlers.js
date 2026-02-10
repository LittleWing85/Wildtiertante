import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("/api/registration", () => {
        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
