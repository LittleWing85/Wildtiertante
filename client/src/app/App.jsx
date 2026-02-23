import { RouterProvider } from "react-router-dom";
import { UserProvider } from "../context/UserContext.jsx";
import { router } from "./routesIndex.jsx";

export default function App() {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}
