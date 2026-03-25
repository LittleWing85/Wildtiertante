import apiClient from "../../../utils/apiClient.js";

export async function logoutRequest() {
    return await apiClient("/api/auth/logout", { method: "POST" });
}
