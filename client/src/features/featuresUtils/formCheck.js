export default function formCheck(form) {
    const errorMessages = {};

    for (const element of form.elements) {
        if (element.tagName === "INPUT" && !element.checkValidity()) {
            if (element.validity.valueMissing) {
                errorMessages[element.id] = "Dieses Feld ist erforderlich.";
            } else if (element.validity.typeMismatch) {
                errorMessages[element.id] = "Bitte prüfe deine Eingabe.";
            }
        }
    }
    return errorMessages;
}
