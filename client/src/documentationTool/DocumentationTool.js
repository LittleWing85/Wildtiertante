import { Outlet, NavLink } from "react-router-dom";

export default function DocumentationTool() {
    return (
        <section>
            <nav className="nav">
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
            <section>
                <p>
                    Here you will find a tool that supports you with organizing
                    milk feedings
                </p>
                <Outlet />
            </section>
        </section>
    );
}
