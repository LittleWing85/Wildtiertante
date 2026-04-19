//This component renders input fields for forms according to provided information about input fields

export function InputFields({ fields, onChange, errors }) {
    return fields.map((field) => {
        const error = errors[field.id];
        return (
            <div key={field.id} className="flexVertically">
                <label htmlFor={field.id} className="topSpaceSmall">
                    {field.labelText}
                </label>
                <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required={field.required}
                    placeholder={field.placeholder}
                    aria-invalid={!!errors[field.id]}
                    aria-describedby={
                        errors[field.id] ? `${field.id}-error` : undefined
                    }
                    onChange={onChange}
                />
                {error && (
                    <p
                        id={`${field.id}-error`}
                        className="inputError"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    });
}
