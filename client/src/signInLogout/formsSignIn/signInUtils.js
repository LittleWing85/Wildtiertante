//This hook provides the utilities that Login and Registration have in common

import formCheck from "../../formCheck.js";

export function checkFormErrors(form) {
    if (!form.checkValidity()) {
        const errors = formCheck(form);
        return errors;
    }
    return {};
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
