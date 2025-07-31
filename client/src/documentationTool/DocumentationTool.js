import { NavLink, Route, BrowserRouter } from "react-router-dom";
import WhosNext from "./WhosNext.js";
import NewLitter from "./NewLitter.js";
import LitterOverview from "./LitterOverview.js";
/*https://stackoverflow.com/questions/74991933/navigation-to-multiple-pages-using-react-router-dom
https://reactrouter.com/start/declarative/routing
https://www.robinwieruch.de/react-router-nested-routes/
https://stackoverflow.com/questions/77165891/nested-routes-in-reactjs
https://gondi-sai.medium.com/building-nested-components-with-child-routes-in-react-react-no-14-c9152db9f8cc*/
export default function DocumentationTool() {
    return (
        <BrowserRouter>
            <nav className="navSecondLevel">
                <NavLink to="/whosNext">Who&apos;s next?</NavLink>
                <NavLink to="/newLitter">Add new Litter</NavLink>
                <NavLink to="/litterOverview">Litter overview</NavLink>
            </nav>

            <div>
                <section>
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
