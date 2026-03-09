//This file provides the utilities that Login and Registration have in common

import formCheck from "../../utils/formCheck.js";

const REGISTRATION_FIELDS = ["name", "email", "password"];
const LOGIN_FIELDS = ["email", "password"];

export function checkFormErrors(form) {
    if (!form.checkValidity()) {
        return formCheck(form);
    }
    return {};
}

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

export function submitRegistrationData(formData, path) {
    return submitAuthRequest(formData, REGISTRATION_FIELDS, path);
}

export function submitLoginData(formData, path) {
    return submitAuthRequest(formData, LOGIN_FIELDS, path);
}
