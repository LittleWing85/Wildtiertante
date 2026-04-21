// Check for all kinds of forms
// Function formCheck expects an HTMLFormElement

export function formCheck(form) {
    const errorMessages = {};

    for (const element of form.elements) {
        if (element.name === "password" && element.value.length < 12) {
            errorMessages[element.id] =
                "Das Passwort muss mindestens 12 Zeichen lang sein.";
        }
        if (element.willValidate && !element.checkValidity()) {
            if (element.validity.valueMissing) {
                errorMessages[element.id] = "Dieses Feld ist erforderlich.";
            } else if (element.validity.typeMismatch) {
                errorMessages[element.id] = "Bitte prüfe deine Eingabe.";
            }
        }
    }
    return errorMessages;
}
