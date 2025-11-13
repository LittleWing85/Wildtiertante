import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import { server } from "../mocks/server";
import { http } from "msw";

describe("RegistrationForm", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test("zeigt Erfolgsmeldung nach erfolgreicher Registrierung", async () => {
        server.use(
            http.post("/api/register", () => {
                return Response.json(
                    { message: "User registered" },
                    { status: 201 }
                );
            })
        );

        render(
            <BrowserRouter>
                <RegistrationForm />
            </BrowserRouter>
        );

        // 1. Benutzer gibt Formular ein
        fireEvent.change(screen.getByLabelText(/Benutzername/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByLabelText(/E-Mail/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Passwort/i), {
            target: { value: "test1234" },
        });

        // 2. Klick auf "Registrieren"
        fireEvent.click(screen.getByRole("button", { name: /registrieren/i }));

        // 3. Warten, bis Erfolgsmeldung erscheint
        await waitFor(() =>
            expect(
                screen.getByText(/erfolgreich registriert/i)
            ).toBeInTheDocument()
        );
    });
});
