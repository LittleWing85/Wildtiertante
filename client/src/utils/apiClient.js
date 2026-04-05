// service for executing fetches
// checks response from backend and throws errors

import { ERROR_MESSAGES } from "../constants/errorMessages.js";

let cachedCsrfToken = null;

export async function fetchCsrfToken() {
    if (cachedCsrfToken) return cachedCsrfToken;

    const response = await fetch("/api/csrf-token", { credentials: "include" });
    const data = await response.json();
    cachedCsrfToken = data.csrfToken;
    return cachedCsrfToken;
}

export function invalidateCsrfToken() {
    cachedCsrfToken = null;
}

export async function apiClient(url, options = {}) {
    const csrfToken = await fetchCsrfToken();

    const response = await fetch(url, {
        credentials: "include",
        ...options,
        headers: {
            ...options.headers,
            "CSRF-Token": csrfToken,
        },
    });

    let data = null;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (response.status === 401) {
        invalidateCsrfToken();
    }

    if (!response.ok) {
        const error = new Error(data?.error || ERROR_MESSAGES.UNKNOWN);
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
}
