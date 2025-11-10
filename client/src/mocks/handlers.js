import { http, HttpResponse } from "msw";

//testing scenario: registration successful
export const handlers = [
    http.post("/api/registration", () => {
        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
