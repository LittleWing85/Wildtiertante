// five test scenarios: registration successful, server error,
// application error, application error without message, network error
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "../signInLogout/formsSignIn/RegistrationForm";
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

// mocking of useDispatch
const mockDispatch = vi.fn();
vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return {
        ...actual,
        useDispatch: () => mockDispatch,
    };
});

// resetting mocks before each test
beforeEach(() => {
    mockNavigate.mockReset();
    mockDispatch.mockReset();
});

// auxiliary function: rendering, filling and sending of registration form
function testUtil() {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: "Tierheim Sonnental" },
    });
    fireEvent.change(screen.getByLabelText(/emailadresse/i), {
        target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/passwort/i), {
        target: { value: "geheim123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit data/i }));
}

// 1. Registration successful; tested by calling login reducer, navigation to feedingTool
test("erfolgreiche Registrierung navigiert zum FeedingTool", async () => {
    server.use(
        http.post("/api/registration", () =>
            HttpResponse.json({ success: true }, { status: 200 })
        )
    );
    testUtil();
    await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/feedingTool");
    });
});

// 2. Server error (500)
test("zeigt Serverfehler an, wenn API 500 zurückgibt", async () => {
    server.use(
        http.post("/api/registration", () =>
            HttpResponse.json({ error: "Server exploded" }, { status: 500 })
        )
    );
    testUtil();
    const errorText = await screen.findByText(/serverfehler:500/i);
    expect(errorText).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
});

// 3. Application error (e.g. E-Mail already in use)
test("zeigt Fehlermeldung an, wenn Backend einen application error sendet", async () => {
    server.use(
        http.post("/api/registration", () =>
            HttpResponse.json(
                {
                    error: true,
                    errorMessage:
                        "Diese E-Mail-Adresse wird bereits verwendet.",
                },
                { status: 200 }
            )
        )
    );
    testUtil();
    const msg = await screen.findByText(/wird bereits verwendet/i);
    expect(msg).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
});

// 4. Application error without message
test("zeigt Standard-Fehlermeldung, wenn error true aber keine errorMessage vorhanden", async () => {
    server.use(
        http.post("/api/registration", () =>
            HttpResponse.json(
                {
                    error: true, // no errorMessage
                },
                { status: 200 }
            )
        )
    );
    testUtil();
    const msg = await screen.findByText(/wird bereits verwendet/i); // fallback text
    expect(msg).toBeInTheDocument();
});

// 5. Network error (fetch request throws error)
test("behandelt MSW-Exceptions als Serverfehler", async () => {
    server.use(
        http.post("/api/registration", () => {
            throw new Error("Network down");
        })
    );
    testUtil();
    const msg = await screen.findByText(/serverfehler:500/i);
    expect(msg).toBeInTheDocument();
});
