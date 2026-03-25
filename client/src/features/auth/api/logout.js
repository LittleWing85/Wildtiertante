export async function logoutRequest() {
    await fetch("/api/auth/logout", {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Logout failed");
    }
}
