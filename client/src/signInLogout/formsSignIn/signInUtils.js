//This hook provides the utilities that Login and Registration have in common

import formCheck from "../../formCheck.js";

export function checkFormErrors(form) {
    if (!form.checkValidity()) {
        const errors = formCheck(form);
        return errors;
    }
    return {};
}

export function createRegistrationDataObject(formData) {
    const registrationData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };
    console.log(registrationData);
    return registrationData;
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
