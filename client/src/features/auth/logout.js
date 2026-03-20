export async function logoutRequest() {
    await fetch("/api/auth/logout", {
        method: "POST",
    });
}
