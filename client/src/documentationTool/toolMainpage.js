import { NavLink, Route, BrowserRouter } from "react-router-dom";
import NewLitter from "./NewLitter.js";
import WhosNext from "./WhosNext.js";

export default function ToolMainpage() {
    return (
        <BrowserRouter>
            <img
                className="sideImageLeft"
                src="./media/Franziskustierheim-3801.JPG"
            />
            <img
                className="sideImageRight"
                src="./media/Franziskustierheim-3390.JPG"
            />

            <header>
                <div className="containerLogo"></div>
                <nav>
                    <menu>
                        <NavLink className="menuEntry" to="/" exact>
                            Who&apos;s next?
                        </NavLink>
                        <NavLink className="menuEntry" to="/newlitter">
                            Add new Litter
                        </NavLink>
                        <NavLink className="menuEntry" to="/sdfsdf">
                            Patient overview
                        </NavLink>
                        <NavLink className="menuEntry" to="/sdfsf">
                            Edit patient data
                        </NavLink>
                    </menu>
                    <p className="logo">WILDTIERTANTE</p>
                </nav>

                <section className="mainContainer">
                    <Route path="/" exact>
                        <div>
                            <WhosNext />
                        </div>
                    </Route>
                    <Route path="/newlitter">
                        <NewLitter />
                    </Route>
                </section>
            </header>
        </BrowserRouter>
    );
}
