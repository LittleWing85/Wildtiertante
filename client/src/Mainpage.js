import { NavLink, Route, BrowserRouter } from "react-router-dom";
import About from "./common/about/About.js";
import Buttons from "./common/loginAndRegister/Buttons.js";
import ToolMainpage from "./documentationTool/ToolMainpage.js";
import "./common/logo/logo.css";

export default function Mainpage() {
    return (
        <BrowserRouter>
            <header>
                <div className="containerLogo">
                    <NavLink className="logo" to="/" exact>
                        WILDTIERTANTE
                    </NavLink>
                    <NavLink className="logoMobile" to="/" exact>
                        W
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
                    <Buttons />
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
                                    <ToolMainpage />
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
