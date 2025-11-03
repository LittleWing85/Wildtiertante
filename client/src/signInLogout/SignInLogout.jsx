import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./signInLogout.css";

export default function SignInLogout() {
    const location = useLocation();
    const navigate = useNavigate();
    const message = location.state?.message;

    useEffect(() => {
        if (location.pathname === "/signIn" && message) {
            navigate("/signIn/login", { state: { message } });
        }
    }, [location, message, navigate]);

    return (
        <section className="sectionLoginForm">
            <div className="divLoginForm">
                {message && <p className="infoBanner">{message}</p>}
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
        </section>
    );
}
