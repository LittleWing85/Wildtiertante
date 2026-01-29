//This component renders the second level nav. It also has an Outlet
// so the content chosen by a user via second level nav will be rendered.

import { Outlet, NavLink, useLocation } from "react-router-dom";

export default function FeedingTool() {
    const location = useLocation();
    const message = location.state?.message;

    return (
        <section>
            {message && <p className="successBanner topSpaceBig">{message}</p>}
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
