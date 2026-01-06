//This hook provides the utilities that Login and Registration have in common

import formCheck from "../../formCheck.js";

const REGISTRATION_FIELDS = ["name", "email", "password"];
const LOGIN_FIELDS = ["email", "password"];

export function checkFormErrors(form) {
    if (!form.checkValidity()) {
        const errors = formCheck(form);
        return errors;
    }
    return {};
}

export function createRegistrationDataObject(formData) {
    return createInputDataObject(formData, REGISTRATION_FIELDS);
}

function createInputDataObject(formData, fields) {
    return Object.fromEntries(
        fields.map((field) => [field, formData.get(field)])
    );
}

export function fetchData(path, registrationData) {
    const response = fetch(`/api/${path}`, {
        method: "POST",
        body: JSON.stringify(registrationData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}
