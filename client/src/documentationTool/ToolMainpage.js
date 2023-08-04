import { NavLink, Route, BrowserRouter } from "react-router-dom";
import WhosNext from "./WhosNext.js";
import NewLitter from "./NewLitter.js";
import LitterOverview from "./LitterOverview.js";

export default function ToolMainpage() {
    return (
        <BrowserRouter>
            <nav className="navLeft">
                <menu>
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
            </nav>

            <div>
                <section className="mainContainer">
                    <Route path="/" exact></Route>
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
        </BrowserRouter>
    );
}
