import { NavLink, Route, BrowserRouter } from "react-router-dom";

import About from "./common/about/About.js";
import LoginLogoutButtons from "./common/loginLogoutRegister/LoginLogoutButtons.js";
import MainpageTool from "./documentationTool/MainpageTool.js";
import Register from "./common/loginLogoutRegister/Register.js";
import Login from "./common/loginLogoutRegister/Login.js";
import "./common/logo/logo.css";

export default function Mainpage() {
    return (
        <BrowserRouter>
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
                    <NavLink className="navEntry" to="/documentationTool">
                        App
                    </NavLink>
                </nav>
                <div>
                    <LoginLogoutButtons />
                </div>
            </header>

            <div className="layout">
                <section className="left"></section>
                <section className="center">
                    <div className="content">
                        <div className="shadowBox">
                            <Route path="/" exact>
                                <div>
                                    <About />
                                </div>
                            </Route>
                            <Route path="/documentationTool">
                                <div>
                                    <MainpageTool />
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
                    </div>
                </section>
                <section className="right"></section>
            </div>
        </BrowserRouter>
    );
}
