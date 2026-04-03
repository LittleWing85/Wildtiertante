export function clearFieldErrorOnChange(event, setErrorMessagesInput) {
    const fieldName = event.currentTarget.name;
    setErrorMessagesInput((prev) =>
        prev[fieldName] ? { ...prev, [fieldName]: null } : prev,
    );
}
