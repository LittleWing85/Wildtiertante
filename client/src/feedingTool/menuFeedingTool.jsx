import { NavLink } from "react-router-dom";

export default function MenuFeedingTool() {
    <nav className="nav2">
        <NavLink className="navEntry" to="/feedingTool/litterOverview">
            Litter overview
        </NavLink>
        <NavLink className="navEntry" to="/feedingTool/whosNext">
            Who&apos;s next
        </NavLink>
        <NavLink className="navEntry" to="/feedingTool/newLitter">
            New Litter
        </NavLink>
    </nav>;
}
