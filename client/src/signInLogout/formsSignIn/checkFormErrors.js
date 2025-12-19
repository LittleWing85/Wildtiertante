import formCheck from "../../formCheck.js";

export default function checkFormerrors(form) {
    if (!form.checkValidity()) {
        const errors = formCheck(form);
        return errors;
    }
    return {};
}
