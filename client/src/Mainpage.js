import { NavLink, Route, BrowserRouter } from "react-router-dom";

import About from "./common/about/About.js";
import LoginLogoutButtons from "./common/loginLogoutRegister/LoginLogoutButtons.js";
import DocumentationTool from "./documentationTool/DocumentationTool.js";
import Information from "./information/Information.js";
import Register from "./common/loginLogoutRegister/Register.js";
import Login from "./common/loginLogoutRegister/Login.js";
import "./common/logo/logo.css";

export default function Mainpage() {
    return (
        <BrowserRouter>
            <div className="mainContainer">
                <header>
                    <div className="containerLogo">
                        <NavLink to="/" exact>
                            <img
                                className="logo"
                                src="./icons/logo.png"
                                alt="cute logo with human and racoon cuddling"
                            />
                        </NavLink>
                    </div>

                    <nav>
                        <NavLink className="navEntry" to="/" exact>
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
                        <Route path="/" exact>
                            <div>
                                <About />
                            </div>
                        </Route>
                        <Route path="/information">
                            <div>
                                <Information />
                            </div>
                        </Route>
                        <Route path="/documentationTool">
                            <div>
                                <DocumentationTool />
                            </div>
                        </Route>
                        <Route path="/register">
                            <div>
                                <Register />
                            </div>
                        </Route>
                        <Route path="/login">
                            <div>
                                <Login />
                            </div>
                        </Route>
                    </div>
                    <div className="right"></div>
                </div>
            </div>
        </BrowserRouter>
    );
}
