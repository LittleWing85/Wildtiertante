import { useUser } from "../context/UserContext.jsx";

export function ErrorBannerLogout() {
    const { logoutFailed } = useUser();

    return (
        <section>
            {logoutFailed && (
                <p className="errorBanner">
                    Der Logout ist fehlgeschlagen. Bitte versuche es zu einem
                    späteren Zeitpunkt erneut.
                </p>
            )}
        </section>
    );
}
