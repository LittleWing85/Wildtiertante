//This file provides the utilities needed for authentication

import { REGISTRATION_INPUT_FIELDS, LOGIN_INPUT_FIELDS } from "./authFields.js";
import { apiClient } from "../../../../utils/apiClient.js";

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
    return apiClient(url, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export function registration(formData) {
    const payload = buildPayload(formData, AUTH_FIELDS.registration);
    return sendAuthRequest("/api/auth/registration", payload);
}

export function login(formData) {
    const payload = buildPayload(formData, AUTH_FIELDS.login);
    return sendAuthRequest("/api/auth/login", payload);
}
