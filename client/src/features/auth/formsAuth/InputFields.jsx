export default function createInputFields(fields) {
    for (var field of fields) {
        return (
            <>
                <label htmlFor={field}>{field}</label>
                <input id={field} name={field} type={field} required />
            </>
        );
    }
}
