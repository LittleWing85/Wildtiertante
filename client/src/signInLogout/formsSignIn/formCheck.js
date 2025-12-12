export default function formCheck(form) {
    const errorMessages = [];
    for (const element of form.elements) {
        if (element.tagName === "INPUT" && !element.checkValidity()) {
            const label = element.labels[0].textContent;
            if (element.validity.valueMissing) {
                const validityResult = {
                    name: element.name,
                    errorMessage: `Bitte fülle das Feld "${label}" aus.`,
                };
                errorMessages.push(validityResult);
            } else if (element.validity.typeMismatch) {
                const validityResult = {
                    name: element.name,
                    errorMessage: `Bitte prüfe deine Eingabe im Feld "${label}".`,
                };
                errorMessages.push(validityResult);
            }
        }
    }
    return errorMessages;
}
