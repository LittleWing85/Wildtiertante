//This file provides the utilities needed for authentication

import { REGISTRATION_INPUT_FIELDS, LOGIN_INPUT_FIELDS } from "./authFields.js";

const AUTH_FIELDS = {
    registration: REGISTRATION_INPUT_FIELDS.map((field) => field.name),
    login: LOGIN_INPUT_FIELDS.map((field) => field.name),
};

async function submitAuthRequest(formData, allowedFields, path) {
    const formDataObject = Object.fromEntries(
        allowedFields.map((field) => [field, formData.get(field)]),
    );

    try {
        const response = await fetch(`/api/auth/${path}`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(formDataObject),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
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

export function submitAuthData(formData, submitType) {
    return submitAuthRequest(formData, AUTH_FIELDS[submitType], submitType);
}
