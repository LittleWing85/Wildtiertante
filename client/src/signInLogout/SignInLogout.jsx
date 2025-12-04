// This component renders "tabs" to switch between login form and registration form
// This component has an outlet to either render login or registration form

import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./signInLogout.css";

export default function SignInLogout() {
    const location = useLocation();
    const message = location.state?.message;

    return (
        <div className="containerLoginForm">
            <div className="LoginForm">
                {message && (
                    <p className="errorBanner topSpaceBig">{message}</p>
                )}
                <div className="tabBar">
                    <div className="tabBarElement">
                        <NavLink
                            className={({ isActive }) =>
                                "tabText" + (isActive ? " active" : "")
                            }
                            to="/signIn/login"
                        >
                            Einloggen
                        </NavLink>
                    </div>
                    <div className="tabBarElement">
                        <NavLink className="tabText" to="/signIn/registration">
                            Registrieren
                        </NavLink>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
