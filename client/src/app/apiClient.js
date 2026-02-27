export default async function apiFetch(api, options = {}) {
    const response = await fetch(api, { credentials: "include", ...options });
}
