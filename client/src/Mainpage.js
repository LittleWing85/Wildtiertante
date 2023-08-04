import { NavLink, Route, BrowserRouter } from "react-router-dom";
import About from "./common/About.js";
import LoginRegisterButtons from "./common/LoginRegisterButtons.js";
import ToolMainpage from "./documentationTool/ToolMainpage.js";

export default function Mainpage() {
    return (
        <BrowserRouter>
            <header>
                <LoginRegisterButtons />
                <nav className="navMain">
                    <menu className="menuMain">
                        <NavLink className="menuEntryMain" to="/" exact>
                            About
                        </NavLink>
                        <NavLink
                            className="menuEntryMain"
                            to="/documentationTool"
                        >
                            Documentation Tool
                        </NavLink>
                    </menu>
                    <NavLink className="logo" to="/" exact>
                        WILDTIERTANTE
                    </NavLink>
                    <NavLink className="logoMobile" to="/" exact>
                        W
                    </NavLink>
                </nav>
            </header>
            <div className="wrapper">
                <div className="left-picture"></div>
                <div className="center">
                    <div>
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
                </div>
                <div className="right-picture"> </div>
            </div>
        </BrowserRouter>
    );
}
