import { Outlet, NavLink } from "react-router-dom";

export default function DocumentationTool() {
    return (
        <div>
            <div className="nav">
                <NavLink
                    className="navEntry"
                    to="/documentationTool/litterOverview"
                >
                    Litter overview
                </NavLink>
                <NavLink className="navEntry" to="/documentationTool/whosNext">
                    Who&apos next
                </NavLink>
                <NavLink className="navEntry" to="/documentationTool/newLitter">
                    New Litter
                </NavLink>
            </div>
            <p>
                Here you will find a tool that supports you with organizing milk
                feedings
            </p>
            <Outlet />
        </div>
    );
}
