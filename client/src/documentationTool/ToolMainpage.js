import { NavLink, Route, BrowserRouter } from "react-router-dom";
import WhosNext from "./WhosNext.js";
import NewLitter from "./NewLitter.js";
import LitterOverview from "./LitterOverview.js";

export default function ToolMainpage() {
    return (
        <BrowserRouter>
            <nav>
                <NavLink to="/whosNext">Who&apos;s next?</NavLink>
                <NavLink to="/newLitter">Add new Litter</NavLink>
                <NavLink to="/litterOverview">Litter overview</NavLink>
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
