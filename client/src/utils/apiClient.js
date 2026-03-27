// service for executing fetches
// checks response from backend and throws errors

import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export default async function apiClient(url, options = {}) {
    const response = await fetch(url, { credentials: "include", ...options });

    let data;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        if (response.status === 401) {
            sessionStorage.setItem("authMessage", ERROR_MESSAGES.AUTH_REQUIRED);
            window.location.href = "/auth/login";
        }
        const error = new Error(data?.error || ERROR_MESSAGES.UNKNOWN);
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
}
