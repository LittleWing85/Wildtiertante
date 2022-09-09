import { NavLink, Route, BrowserRouter } from "react-router-dom";
import About from "./About.js";
import WhosNext from "./WhosNext.js";
import NewLitter from "./NewLitter.js";
import LitterOverview from "./LitterOverview.js";

export default function ToolMainpage() {
    return (
        <BrowserRouter>
            <header>
                <div className="containerLogo"></div>
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
                    <NavLink className="logo" to="/" exact>
                        WILDTIERTANTE
                    </NavLink>
                </nav>
            </header>
            <div className="wrapper">
                <div className="left-picture"></div>
                <div className="center">
                    <main className="content">
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
                    </main>
                </div>
                <div className="right-picture"> </div>
            </div>
        </BrowserRouter>
    );
}
