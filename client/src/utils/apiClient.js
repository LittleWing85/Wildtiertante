// service for executing fetches
// checks response from backend and throws errors

import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export async function apiClient(url, options = {}) {
    const response = await fetch(url, {
        credentials: "include",
        ...options,
        headers: {
            ...options.headers,
        },
    });

    let data = null;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const error = new Error(data?.error || ERROR_MESSAGES.UNKNOWN);
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
}
