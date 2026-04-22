// Check for all kinds of forms
// Function formCheck expects an HTMLFormElement

export function formCheck(form) {
    const errorMessages = {};

    for (const element of form.elements) {
        if (element.willValidate && !element.checkValidity()) {
            if (element.validity.valueMissing) {
                errorMessages[element.id] = "Dieses Feld ist erforderlich.";
            } else if (element.validity.typeMismatch) {
                errorMessages[element.id] = "Bitte prüfe deine Eingabe.";
            } else if (element.validity.tooShort) {
                errorMessages[element.id] =
                    `Das Passwort muss mindestens ${element.minLength} Zeichen lang sein.`;
            }
        }
    }
    return errorMessages;
}
