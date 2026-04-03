import "./button.css";

export function Button({
    isLoading = false,
    onClick,
    type = "button",
    className = "topSpace",
    children,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled={isLoading}
            aria-disabled={isLoading}
        >
            {isLoading && <span className="spinner" aria-hidden="true" />}
            <span className={isLoading ? "visually-hidden" : ""}>
                {children}
            </span>
        </button>
    );
}
