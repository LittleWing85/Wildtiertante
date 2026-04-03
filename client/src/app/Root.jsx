import { NavLink, Outlet } from "react-router-dom";

import { AuthWatcher } from "../components/AuthWatcher.jsx";
import { AuthButtons } from "../features/auth/api/AuthButtons.jsx";

export default function Root() {
    return (
        <div className="mainContainer">
            <AuthWatcher />
            <header>
                <div className="containerLogo">
                    <NavLink to="/">
                        <img
                            className="logo"
                            src="/icons/logo.jpg"
                            alt="logo with pink paw"
                        />
                    </NavLink>
                </div>
                <nav>
                    <NavLink className="navEntry" to="/">
                        About
                    </NavLink>
                    <NavLink className="navEntry" to="/information">
                        Jungtieraufzucht
                    </NavLink>
                    <NavLink className="navEntry" to="/feedingTool">
                        Fütterungstool
                    </NavLink>
                    <NavLink className="navEntry" to="/wildAnimalFound">
                        Wildtier gefunden
                    </NavLink>
                </nav>
                <div>
                    <AuthButtons />
                </div>
            </header>
            <div className="content">
                <div className="left"></div>
                <div className="center">
                    <Outlet />
                </div>

                <div className="right"></div>
            </div>
            <footer></footer>
        </div>
    );
}
