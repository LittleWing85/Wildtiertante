//This hook provides the utilities that Login and Registration have in common

import formCheck from "../../featuresUtils/formCheck.js";

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
    const response = await fetch(`/api/auth/${path}`, {
        method: "POST",
        body: JSON.stringify(formDataObject),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export function submitRegistrationData(formData, path) {
    return submitAuthRequest(formData, REGISTRATION_FIELDS, path);
}

export function submitLoginData(formData, path) {
    return submitAuthRequest(formData, LOGIN_FIELDS, path);
}
