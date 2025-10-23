//This component renders the second level nav and checks if user is logged in

import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";

export default function FeedingTool() {
    const [currentLitters, setCurrentLitters] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/litterOverview")
            .then((response) => response.json())
            .then((data) => {
                if (!data) {
                    navigate("/login", {
                        state: {
                            message:
                                "Bitte melde dich an, um das Fütterungstool zu verwenden. ",
                        },
                    });
                    return;
                }
                setCurrentLitters(data);
            });
    }, [navigate]);

    if (!currentLitters) {
        return <p>Lade Daten...</p>;
    }

    return (
        <section>
            <nav className="nav2">
                <NavLink className="navEntry" to="/feedingTool/whosNext">
                    Who&apos;s next
                </NavLink>
                <NavLink className="navEntry" to="/feedingTool/litterOverview">
                    Litter overview
                </NavLink>
                <NavLink className="navEntry" to="/feedingTool/newLitter">
                    New Litter
                </NavLink>
            </nav>

            {currentLitters.length === 0 && (
                <p>
                    Momentan ist niemand eingetragen, der Milch oder Medikamente
                    bekommt. <Link to="/feedingTool/newLitter">Hier</Link>{" "}
                    kannst du neue Tierbabys hinzufügen. Möchtest du
                    Informationen zu Tierbabys, die du schon eingetragen hast,
                    bearbeiten, dann klicke{" "}
                    <Link to="/feedingTool/litterOverview">hier</Link>.
                </p>
            )}

            <Outlet />
        </section>
    );
}
