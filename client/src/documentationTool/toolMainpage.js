import { NavLink, Route, BrowserRouter } from "react-router-dom";
import NewLitter from "./NewLitter.js";
import WhosNext from "./WhosNext.js";

export default function ToolMainpage() {
    return (
        <BrowserRouter>
            <header>
                <div className="containerLogo"></div>
                <nav>
                    <menu>
                        <NavLink className="menuEntry" to="/" exact>
                            Who&apos;s next?
                        </NavLink>
                        <NavLink className="menuEntry" to="/newLitter">
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
            </header>
            <div className="wrapper">
                <div className="left-picture"></div>
                <div className="center">
                    <main className="content">
                        <section className="mainContainer">
                            <Route path="/" exact>
                                <div>
                                    <WhosNext />
                                </div>
                            </Route>
                            <Route path="/newLitter">
                                <NewLitter />
                            </Route>
                        </section>
                    </main>
                </div>
                <div className="right-picture"> </div>
            </div>
        </BrowserRouter>
    );
}
