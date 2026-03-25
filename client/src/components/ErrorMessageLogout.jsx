import { useUser } from "../context/UserContext.jsx";

export default function ErrorMessageLogout() {
    const { errorMessageLogout } = useUser();
    return (
        <>
            {errorMessageLogout && (
                <section className="errorBanner topSpace" role="alert">
                    {errorMessageLogout}
                </section>
            )}
        </>
    );
}
