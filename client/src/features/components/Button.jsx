import "./button.css";

export default function Button({ isSubmitting, children }) {
    return (
        <button
            className="topSpace"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
        >
            {isSubmitting ? (
                <span className="spinner" aria-hidden="true"></span>
            ) : (
                children
            )}
        </button>
    );
}
