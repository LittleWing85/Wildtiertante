import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function LayoutRoute({ fallback = <div>Loading...</div> }) {
    return (
        <Suspense fallback={fallback}>
            <Outlet />
        </Suspense>
    );
}
