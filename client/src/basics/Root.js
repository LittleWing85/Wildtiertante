import { NavLink, Outlet } from "react-router-dom";
import LoginLogoutButtons from "./loginLogoutRegister/LoginLogoutButtons.js";

export default function Root() {
    return (
        <div className="mainContainer">
            <header>
                <div className="containerLogo">
                    <NavLink to="/">
                        <img
                            className="logo"
                            src="./icons/logo.png"
                            alt="cute logo with human and racoon cuddling"
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
                    <NavLink className="navEntry" to="/documentationTool">
                        App
                    </NavLink>
                </nav>
                <div>
                    <LoginLogoutButtons />
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
