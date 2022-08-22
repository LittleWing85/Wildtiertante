import Register from "./Register";
import Login from "./Login";

import { BrowserRouter, Route, Link } from "react-router-dom";

export default function Welcome() {
    return (
        <BrowserRouter>
            <section className="welcome">
                <header>
                    <h1>Welcome to the NO-PHP appreciation page</h1>
                    <p>
                        <img
                            src="https://miro.medium.com/max/700/1*RLGaHvtLgWxOCtxQ2lZywg.jpeg"
                            alt="Welcome!"
                        />
                    </p>
                </header>
                <Route exact path="/">
                    <Register />
                    <footer>
                        <p>
                            Already a member? <Link to="/login">Login</Link>
                        </p>
                    </footer>
                </Route>
                <Route path="/login">
                    <Login />
                    <footer>
                        <p>
                            Not a member? <Link to="/">Register</Link>
                        </p>
                    </footer>
                </Route>
            </section>
        </BrowserRouter>
    );
}
