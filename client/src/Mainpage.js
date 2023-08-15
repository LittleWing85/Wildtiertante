import { NavLink, Route, BrowserRouter } from "react-router-dom";

import About from "./common/about/About.js";
import LoginLogoutRegister from "./common/loginLogoutRegister/LoginLogout.js";
import ToolMainpage from "./documentationTool/ToolMainpage.js";
import Register from "./common/loginLogoutRegister/Register.js";
import Login from "./common/loginLogoutRegister/Login.js";
import "./common/logo/logo.css";

import { Counter } from "./test/Counter.js";

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
                    <LoginLogoutRegister />
                </div>
            </header>

            <div className="layout">
                <section className="left">
                    <Counter />
                </section>
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
                                    <ToolMainpage />
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
