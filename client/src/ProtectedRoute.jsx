import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

export default function ProtectedRoute({ children }) {
    const { userId, loading } = useUser();

    if (loading) {
        return null;
    }

    if (!userId) {
        return <Navigate to="/signIn/login" replace />;
    }
    return children;
}
