import { NavLink, Route, BrowserRouter } from "react-router-dom";
import About from "./About.js";
import LoginRegisterButtons from "./LoginRegisterButtons.js";

export default function Main() {
    return (
        <BrowserRouter>
            <header>
                <LoginRegisterButtons />
                <nav>
                    <menu>
                        <NavLink className="menuEntry" to="/" exact>
                            About
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
                        <section className="mainContainer">
                            <Route path="/" exact>
                                <div>
                                    <About />
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
