// five test scenarios: registration successful, server error,
// application error, application error without message, network error
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../UserContext";
import RegistrationForm from "../auth/formsAuth/RegistrationForm";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { vi } from "vitest";

// mocking of useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// resetting mock before each test
beforeEach(() => {
    mockNavigate.mockReset();
});

// auxiliary function: rendering, filling and sending of registration form
function testUtil() {
    render(
        <UserProvider>
            <RegistrationForm />
        </UserProvider>,
    );
    fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: "Tierheim Sonnental" },
    });
    fireEvent.change(screen.getByLabelText(/emailadresse/i), {
        target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/passwort/i), {
        target: { value: "geheim123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /absenden/i }));
}

// 1. Registration successful; tested by navigation to feedingTool
test("erfolgreiche Registrierung navigiert zum FeedingTool", async () => {
    server.use(
        http.post("/api/registration", () =>
            HttpResponse.json({ success: true }, { status: 200 }),
        ),
    );
    testUtil();
    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/feedingTool");
    });
});

// 2. Application error (backend provides own error message);
// tested by expecting text "wird bereits verwendet", navigate() is not called
test("zeigt Fehlermeldung des Backends an", async () => {
    const backendMessage = "Diese E-Mail-Adresse wird bereits verwendet.";
    server.use(
        http.post("/api/registration", () =>
            HttpResponse.json(
                {
                    error: true,
                    errorMessage: backendMessage,
                },
                { status: 200 },
            ),
        ),
    );
    testUtil();
    const msg = await screen.findByText(
        /Diese E-Mail-Adresse wird bereits verwendet/i,
    );
    expect(msg).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
});

// 3. Application error without message -> Frontend fallback text
test("zeigt Standard-Fehlermeldung, wenn kein errorMessage vorhanden ist", async () => {
    server.use(
        http.post("/api/registration", () =>
            HttpResponse.json(
                {
                    error: true, // no errorMessage provided
                },
                { status: 200 },
            ),
        ),
    );
    testUtil();
    const msg = await screen.findByText(/Diese E-Mail-Adresse.*verwendet/i);
    expect(msg).toBeInTheDocument();
});

// 4. Network error (fetch request throws error)
test("zeigt Serverfehler an, wenn Fetch-Request komplett fehlschlägt", async () => {
    server.use(
        http.post("/api/registration", () => {
            throw new Error("Network down");
        }),
    );
    testUtil();
    const msg = await screen.findByText(/serverfehler:500/i);
    expect(msg).toBeInTheDocument();
});
