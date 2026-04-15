// service for executing fetches
// checks response from backend and throws errors

import { ERROR_MESSAGES } from "../constants/errorMessages.js";

let cachedCsrfToken = null;
let csrfTokenPromise = null;

async function fetchCsrfToken() {
    const response = await fetch("/api/csrf-token", {
        method: "GET",
        credentials: "include",
    });

    let data = null;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok || !data?.csrfToken) {
        throw new Error("CSRF-Token konnte nicht geladen werden.");
    }

    cachedCsrfToken = data.csrfToken;
    return cachedCsrfToken;
}

async function getCsrfToken() {
    if (cachedCsrfToken) {
        return cachedCsrfToken;
    }

    if (!csrfTokenPromise) {
        csrfTokenPromise = fetchCsrfToken().finally(() => {
            csrfTokenPromise = null;
        });
    }

    return csrfTokenPromise;
}

function isMutatingMethod(method = "GET") {
    const normalizedMethod = method.toUpperCase();
    return ["POST", "PUT", "PATCH", "DELETE"].includes(normalizedMethod);
}

export function clearCachedCsrfToken() {
    cachedCsrfToken = null;
}

export async function apiClient(url, options = {}) {
    const method = options.method || "GET";
    const headers = {
        ...options.headers,
    };

    if (isMutatingMethod(method)) {
        const csrfToken = await getCsrfToken();
        headers["x-csrf-token"] = csrfToken;
    }

    const response = await fetch(url, {
        credentials: "include",
        ...options,
        headers,
    });

    let data = null;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        if (response.status === 403) {
            clearCachedCsrfToken();
        }
        const error = new Error(data?.error || ERROR_MESSAGES.UNKNOWN);
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
}
