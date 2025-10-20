// This component renders the second level nav and checks if user is logged in

import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function DocumentationTool() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/litterOverview")
            .then((response) => response.json())
            .then((data) => {
                if (!data) {
                    navigate("/");
                    alert("Please log in first to use this functionality.");
                    return;
                }
                if (data.length === 0) {
                    alert("Login successful, you have currently no animals");
                    return;
                }
                alert("Login successful");
            });
    }, [navigate]);

    return (
        <section>
            <nav className="nav2">
                <NavLink
                    className="navEntry"
                    to="/documentationTool/litterOverview"
                >
                    Litter overview
                </NavLink>
                <NavLink className="navEntry" to="/documentationTool/whosNext">
                    Who&apos;s next
                </NavLink>
                <NavLink className="navEntry" to="/documentationTool/newLitter">
                    New Litter
                </NavLink>
            </nav>

            <p>
                Here you will find a tool that supports you with organizing milk
                feedings
            </p>
            <Outlet />
        </section>
    );
}
