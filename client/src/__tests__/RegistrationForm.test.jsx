// Successful registration is tested by: calling login reducer, navigating to feedingTool

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "../signInLogout/formsSignIn/RegistrationForm";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { vi } from "vitest";

// react-router-dom mocken
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// redux mocken (damit dispatch(login()) nicht echt Redux benötigt)
const mockDispatch = vi.fn();
vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return {
        ...actual,
        useDispatch: () => mockDispatch,
    };
});

test("erfolgreiche Registrierung navigiert zum FeedingTool", async () => {
    // 1. Endpoint für diesen Test überschreiben
    server.use(
        http.post("/api/registration", () => {
            return HttpResponse.json({ success: true }, { status: 200 });
        })
    );

    // 2. Komponente rendern
    render(<RegistrationForm />);

    // 3. Felder ausfüllen
    fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: "Tierheim Sonnental" },
    });
    fireEvent.change(screen.getByLabelText(/emailadresse/i), {
        target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/passwort/i), {
        target: { value: "geheim123" },
    });

    // 4. Abschicken
    fireEvent.click(screen.getByRole("button", { name: /submit data/i }));

    // 5. Warten, bis navigate ausgelöst wird
    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalled(); // login()
        expect(mockNavigate).toHaveBeenCalledWith("/feedingTool");
    });
});
