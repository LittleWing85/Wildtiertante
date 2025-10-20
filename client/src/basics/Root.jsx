import { NavLink, Outlet } from "react-router-dom";
import LoginLogoutButtonsAndLogout from "./loginLogoutRegister/LoginLogoutButtonsAndLogout.jsx";

export default function Root() {
    return (
        <div className="mainContainer">
            <header>
                <div className="containerLogo">
                    <NavLink to="/">
                        <img
                            className="logo"
                            src="./icons/logo.jpg"
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
                        Fütterungstool
                    </NavLink>
                    <NavLink className="navEntry" to="/wildAnimalFound">
                        Wildtier gefunden
                    </NavLink>
                </nav>
                {/*Use a callback function in nav if more styling logic is needed in the future than CSS allows. 
                For more info, see ../ImprovementsThatMightBeInterestingInTheFuture.doc*/}
                <div>
                    <LoginLogoutButtonsAndLogout />
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
