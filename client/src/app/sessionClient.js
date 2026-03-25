import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export default async function apiFetch(path, options = {}) {
    const response = await fetch(path, { credentials: "include", ...options });
    const data = await response.json();
    if (!response.ok) {
        if (response.status === 401) {
            sessionStorage.setItem(
                "authMessage",
                "Bitte melde dich an, um das Fütterungstool zu nutzen.",
            );
            window.location.href = "/auth/login";
        }
        throw new Error(data.error || ERROR_MESSAGES.UNKNOWN);
    }
    return data;
}
