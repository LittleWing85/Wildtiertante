//This component renders the second level nav and checks if the user is logged in.
//It also has an Outlet so the content chosen by a user via second level nav will be rendered.

import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function FeedingTool() {
    const navigate = useNavigate();
    const logged = useSelector((state) => state.loggedin.value);
    useEffect(() => {
        if (!logged) {
            navigate("/login", {
                state: {
                    message:
                        "Bitte melde dich an, um das Fütterungstool zu verwenden.",
                },
            });
        }
    }, [logged, navigate]);

    return (
        <section>
            <nav className="nav2">
                <NavLink className="navEntry" to="/feedingTool/whosNext">
                    Who&apos;s next
                </NavLink>
                <NavLink className="navEntry" to="/feedingTool/litterOverview">
                    Litter overview
                </NavLink>
                <NavLink className="navEntry" to="/feedingTool/newLitter">
                    New Litter
                </NavLink>
            </nav>

            <Outlet />
        </section>
    );
}
