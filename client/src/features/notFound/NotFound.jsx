// Component for catch all route (unexisting files)

export function NotFound() {
    return (
        <section>
            <p>
                Die aufgerufene Seite existiert nicht. Vielleicht ist sie
                ungezogen, wurde gelöscht oder es hat sich ein Tippfehler in der
                Browserzeile eingeschlichen.
            </p>
        </section>
    );
}
