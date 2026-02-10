// This component renders "tabs" to switch between login form and registration form
// This component has an outlet to either render login or registration form

import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./auth.css";

export default function Auth() {
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
                            to="/auth/login"
                        >
                            Einloggen
                        </NavLink>
                    </div>
                    <div className="tabBarElement">
                        <NavLink className="tabText" to="/auth/registration">
                            Registrieren
                        </NavLink>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
