import { NavLink, Route, BrowserRouter } from "react-router-dom";
import About from "./About.js";
import WhosNext from "./WhosNext.js";
import NewLitter from "./NewLitter.js";
import LitterOverview from "./LitterOverview.js";
import LoginRegisterButtons from "../LoginRegisterButtons.js";

export default function ToolMainpage() {
    return (
        <BrowserRouter>
            <header>
                <nav>
                    <menu>
                        <NavLink className="menuEntry" to="/" exact>
                            About
                        </NavLink>
                        <NavLink className="menuEntry" to="/whosNext">
                            Who&apos;s next?
                        </NavLink>
                        <NavLink className="menuEntry" to="/newLitter">
                            Add new Litter
                        </NavLink>
                        <NavLink className="menuEntry" to="/litterOverview">
                            Litter overview
                        </NavLink>
                    </menu>
                    <div>
                        <LoginRegisterButtons />
                        <NavLink className="logo" to="/" exact>
                            WILDTIERTANTE
                        </NavLink>
                        <NavLink className="logoMobile" to="/" exact>
                            W
                        </NavLink>
                    </div>
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
                            <Route path="/whosNext">
                                <div>
                                    <WhosNext />
                                </div>
                            </Route>
                            <Route path="/newLitter">
                                <NewLitter />
                            </Route>
                            <Route path="/litterOverview">
                                <LitterOverview />
                            </Route>
                        </section>
                    </div>
                </div>
                <div className="right-picture"> </div>
            </div>
        </BrowserRouter>
    );
}
