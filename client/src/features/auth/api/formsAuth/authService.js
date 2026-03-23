//This file provides the utilities needed for authentication

import { REGISTRATION_INPUT_FIELDS, LOGIN_INPUT_FIELDS } from "./authFields.js";

const AUTH_FIELDS = {
    registration: REGISTRATION_INPUT_FIELDS.map((field) => field.name),
    login: LOGIN_INPUT_FIELDS.map((field) => field.name),
};

function buildPayload(formData, allowedFields) {
    return Object.fromEntries(
        allowedFields.map((field) => {
            const value = formData.get(field);
            return [field, value ?? ""];
        }),
    );
}

async function sendAuthRequest(url, body) {
    try {
        const response = await fetch(url, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = {};
        }

        if (!response.ok) {
            const error = new Error(
                data.error ||
                    "Es ist ein unbekannter Fehler aufgetreten. Bitte versuche es zu einem späteren Zeitpunkt erneut.",
            );
            error.status = response.status;
            throw error;
        }

        return data;
    } catch (error) {
        if (!error.status) {
            throw new Error(
                "Der Server ist derzeit nicht erreichbar. Bitte versuche es zu einem späteren Zeitpunkt erneut.",
            );
        }
        throw error;
    }
}

export function registration(formData) {
    const payload = buildPayload(formData, AUTH_FIELDS.registration);
    return sendAuthRequest("/api/auth/registration", payload);
}

export function login(formData) {
    const payload = buildPayload(formData, AUTH_FIELDS.login);
    return sendAuthRequest("/api/auth/login", payload);
}
