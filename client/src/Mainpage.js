import { NavLink, Route, BrowserRouter } from "react-router-dom";
import About from "./common/about/About.js";
import Buttons from "./common/loginAndRegister/Buttons.js";
import ToolMainpage from "./documentationTool/ToolMainpage.js";
import "./common/logo/logo.css";

export default function Mainpage() {
    return (
        <BrowserRouter>
            <header>
                <NavLink className="logo" to="/" exact>
                    WILDTIERTANTE
                </NavLink>
                <NavLink className="logoMobile" to="/" exact>
                    W
                </NavLink>

                <nav>
                    <NavLink className="navEntry" to="/" exact>
                        About
                    </NavLink>
                    <NavLink className="navEntry" to="/documentationTool">
                        Documentation Tool
                    </NavLink>
                </nav>
                <Buttons />
            </header>

            <div className="content">
                <section>
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
                </section>
            </div>
        </BrowserRouter>
    );
}
