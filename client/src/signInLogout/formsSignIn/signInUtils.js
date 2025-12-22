import formCheck from "../../formCheck.js";

export function checkFormErrors(form) {
    if (!form.checkValidity()) {
        const errors = formCheck(form);
        return errors;
    }
    return {};
}

export function fetchData() {
    const response = fetch("/api/registration", {
        method: "POST",
        body: JSON.stringify(registrationData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
}
