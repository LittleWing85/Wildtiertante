export default function formCheck(
    form,
    setInputEmailErrorMessage,
    setInputPasswordErrorMessage
) {
    const errorMessages = [];
    for (const element of form.elements) {
        if (element.tagName === "INPUT" && !element.checkValidity()) {
            if (element.validity.valueMissing) {
                const validityResult = {
                    name: element.name,
                    errorMessage:
                        "Bitte fülle das Feld " + element.name + " aus.",
                };
                errorMessages.push(validityResult);
            } else if (element.validity.typeMismatch) {
                const validityResult = {
                    name: element.name,
                    errorMessage:
                        "Bitte prüfe deine Eingabe im Feld " +
                        element.name +
                        ".",
                };
                errorMessages.push(validityResult);
            }
        }
    }

    const emailElement = form.email;
    const passwordElement = form.password;
    return (
        setInputEmailErrorMessage(
            emailElement.validity.valueMissing ||
                emailElement.validity.typeMismatch
        ),
        setInputPasswordErrorMessage(passwordElement.validity.valueMissing)
    );
}
