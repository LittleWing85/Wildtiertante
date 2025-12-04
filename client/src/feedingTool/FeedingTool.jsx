//This component renders the second level nav. It also has an Outlet
// so the content chosen by a user via second level nav will be rendered.

import { Outlet, NavLink } from "react-router-dom";

export default function FeedingTool() {
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
