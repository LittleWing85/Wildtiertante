export default function formCheck(form) {
    const errorMessages = [];

    for (const element of form.elements) {
        if (element.tagName === "INPUT" && !element.checkValidity()) {
            const label = element.labels[0].textContent;

            let message = "";

            if (element.validity.valueMissing) {
                message = `Bitte fülle das Feld "${label}" aus.`;
            } else if (element.validity.typeMismatch) {
                message = `Bitte prüfe deine Eingabe im Feld "${label}".`;
            }
            errorMessages.push({
                name: element.name,
                errorMessage: message,
            });
        }
    }
    return errorMessages;
}
