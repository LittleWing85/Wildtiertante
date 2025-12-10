export default function formCheck(
    form,
    setInputEmailErrorMessage,
    setInputPasswordErrorMessage
) {
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
