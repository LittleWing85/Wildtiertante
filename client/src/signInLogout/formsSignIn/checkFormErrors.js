import formCheck from "../../formCheck.js";

export default function checkFormerrors(form) {
    const errors = formCheck(form);
    return errors;
}
